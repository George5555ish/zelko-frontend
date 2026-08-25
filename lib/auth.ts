/** Client auth helpers — token in localStorage, API via Next /api rewrite. */

export const AUTH_TOKEN_KEY = "zelko.authToken";

export interface AuthUser {
  id: string;
  email: string;
  firstName?: string | null;
  reportIds: string[];
  createdAt: string;
  isPro: boolean;
  proSince: string | null;
  cancelAtPeriodEnd?: boolean;
  currentPeriodEnd?: string | null;
  profile?: import("@/lib/profile").UserProfile | null;
  profileComplete?: boolean;
  outfitStillCount?: number;
}

export interface AuthResponse {
  token: string;
  expiresAt: string;
  user: AuthUser;
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAuthToken(token: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
    else localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

function authHeaders(): HeadersInit {
  const token = getAuthToken();
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export async function registerAccount(input: {
  firstName: string;
  email: string;
  password: string;
  reportId?: string;
}): Promise<AuthResponse> {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = (await res.json().catch(() => null)) as
    | (AuthResponse & { error?: string })
    | null;
  if (!res.ok) {
    throw new Error(data?.error ?? "Registration failed.");
  }
  if (!data?.token || !data.user) {
    throw new Error("Invalid registration response.");
  }
  setAuthToken(data.token);
  return data;
}

export async function loginAccount(input: {
  email: string;
  password: string;
  reportId?: string;
}): Promise<AuthResponse> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = (await res.json().catch(() => null)) as
    | (AuthResponse & { error?: string })
    | null;
  if (!res.ok) {
    throw new Error(data?.error ?? "Login failed.");
  }
  if (!data?.token || !data.user) {
    throw new Error("Invalid login response.");
  }
  setAuthToken(data.token);
  return data;
}

export async function linkReportToAccount(reportId: string): Promise<AuthUser> {
  const res = await fetch("/api/auth/link-report", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ reportId }),
  });
  const data = (await res.json().catch(() => null)) as {
    user?: AuthUser;
    error?: string;
  } | null;
  if (!res.ok || !data?.user) {
    throw new Error(data?.error ?? "Could not link report.");
  }
  return data.user;
}

export async function fetchMe(): Promise<AuthUser | null> {
  const token = getAuthToken();
  if (!token) return null;
  const res = await fetch("/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (res.status === 401) {
    setAuthToken(null);
    return null;
  }
  if (!res.ok) return null;
  const data = (await res.json()) as { user: AuthUser };
  return data.user;
}

export async function fetchMyReports(): Promise<{
  user: AuthUser;
  reports: import("@/lib/types/report").ReportViewModel[];
}> {
  const token = getAuthToken();
  if (!token) throw new Error("Sign in required.");
  const res = await fetch("/api/reports", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const data = (await res.json().catch(() => null)) as {
    user?: AuthUser;
    reports?: import("@/lib/types/report").ReportViewModel[];
    error?: string;
  } | null;
  if (!res.ok || !data?.user || !data.reports) {
    throw new Error(data?.error ?? "Failed to load reports.");
  }
  return { user: data.user, reports: data.reports };
}

export async function deleteMyReport(reportId: string): Promise<void> {
  const token = getAuthToken();
  if (!token) throw new Error("Sign in required.");
  const res = await fetch(`/api/reports/${reportId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = (await res.json().catch(() => null)) as { error?: string } | null;
  if (!res.ok) {
    throw new Error(data?.error ?? "Failed to delete report.");
  }
}

export async function startProCheckout(input?: {
  successPath?: string;
  cancelPath?: string;
}): Promise<{ url: string | null; alreadyPro?: boolean; error?: string; devUnlock?: boolean }> {
  const res = await fetch("/api/billing/checkout", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(input ?? {}),
  });
  const data = (await res.json().catch(() => null)) as {
    url?: string | null;
    alreadyPro?: boolean;
    error?: string;
    configured?: boolean;
    devUnlock?: boolean;
  } | null;
  if (!res.ok) {
    return {
      url: null,
      error: data?.error ?? "Checkout failed.",
      devUnlock: data?.devUnlock,
    };
  }
  return {
    url: data?.url ?? null,
    alreadyPro: data?.alreadyPro,
    devUnlock: data?.devUnlock,
  };
}

export async function cancelProSubscription(): Promise<{
  user: AuthUser;
  message: string;
  immediate?: boolean;
  currentPeriodEnd?: string | null;
}> {
  const res = await fetch("/api/billing/cancel", {
    method: "POST",
    headers: authHeaders(),
    body: "{}",
  });
  const data = (await res.json().catch(() => null)) as {
    user?: AuthUser;
    message?: string;
    error?: string;
    immediate?: boolean;
    currentPeriodEnd?: string | null;
  } | null;
  if (!res.ok || !data?.user) {
    throw new Error(data?.error ?? "Could not cancel subscription.");
  }
  return {
    user: data.user,
    message: data.message ?? "Subscription canceled.",
    immediate: data.immediate,
    currentPeriodEnd: data.currentPeriodEnd ?? data.user.currentPeriodEnd,
  };
}

export async function devUnlockPro(): Promise<AuthUser> {
  const res = await fetch("/api/billing/dev-unlock", {
    method: "POST",
    headers: authHeaders(),
    body: "{}",
  });
  const data = (await res.json().catch(() => null)) as {
    user?: AuthUser;
    error?: string;
  } | null;
  if (!res.ok || !data?.user) {
    throw new Error(data?.error ?? "Dev unlock failed.");
  }
  return data.user;
}

export function portraitUrl(portraitFileId: string | null | undefined): string | null {
  if (!portraitFileId) return null;
  return `/api/files/${portraitFileId}`;
}

/** Prefer AI standardized clinical avatar; fall back to source portrait. */
export function accountPortraitUrl(report: {
  standardizedPortraitFileId?: string | null;
  portraitFileId?: string | null;
} | null): string | null {
  if (!report) return null;
  return (
    portraitUrl(report.standardizedPortraitFileId) ??
    portraitUrl(report.portraitFileId)
  );
}

export async function ensureStandardizedPortrait(
  reportId: string,
): Promise<import("@/lib/types/report").ReportViewModel> {
  const res = await fetch(`/api/reports/${reportId}/standardized-portrait`, {
    method: "POST",
    headers: authHeaders(),
  });
  const data = (await res.json().catch(() => null)) as {
    report?: import("@/lib/types/report").ReportViewModel;
    error?: string;
  } | null;
  if (!res.ok || !data?.report) {
    throw new Error(data?.error ?? "Could not generate standardized portrait.");
  }
  return data.report;
}

export async function fetchProfile(): Promise<{
  user: AuthUser;
  profile: import("@/lib/profile").UserProfile | null;
  profileComplete: boolean;
  outfitStillCount: number;
}> {
  const token = getAuthToken();
  if (!token) throw new Error("Sign in required.");
  const res = await fetch("/api/profile", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const data = (await res.json().catch(() => null)) as {
    user?: AuthUser;
    profile?: import("@/lib/profile").UserProfile | null;
    profileComplete?: boolean;
    outfitStillCount?: number;
    error?: string;
  } | null;
  if (!res.ok || !data?.user) {
    throw new Error(data?.error ?? "Failed to load profile.");
  }
  return {
    user: data.user,
    profile: data.profile ?? null,
    profileComplete: data.profileComplete === true,
    outfitStillCount: data.outfitStillCount ?? 0,
  };
}

export async function saveProfile(
  profile: Omit<import("@/lib/profile").UserProfile, "updatedAt">,
): Promise<{
  user: AuthUser;
  profile: import("@/lib/profile").UserProfile;
}> {
  const res = await fetch("/api/profile", {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ profile }),
  });
  const data = (await res.json().catch(() => null)) as {
    user?: AuthUser;
    profile?: import("@/lib/profile").UserProfile;
    error?: string;
  } | null;
  if (!res.ok || !data?.user || !data.profile) {
    throw new Error(data?.error ?? "Failed to save profile.");
  }
  return { user: data.user, profile: data.profile };
}

export async function fetchTargetLookReport(
  baselineReportId: string,
): Promise<import("@/lib/types/report").ReportViewModel | null> {
  const token = getAuthToken();
  if (!token) return null;
  const res = await fetch(`/api/reports/${baselineReportId}/target-look`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    report: import("@/lib/types/report").ReportViewModel | null;
  };
  return data.report;
}

export async function analyzeTargetLook(input: {
  baselineReportId: string;
  referenceFileId: string;
  referenceLandmarks?: unknown;
}): Promise<{
  report: import("@/lib/types/report").ReportViewModel;
  recommendations: {
    feature: string;
    action: string;
    effort: string;
    confidence: string;
  }[];
}> {
  const res = await fetch("/api/analyze/target-look", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  const data = (await res.json().catch(() => null)) as {
    report?: import("@/lib/types/report").ReportViewModel;
    recommendations?: {
      feature: string;
      action: string;
      effort: string;
      confidence: string;
    }[];
    error?: string;
  } | null;
  if (!res.ok || !data?.report) {
    throw new Error(data?.error ?? "Target-look analysis failed.");
  }
  return {
    report: data.report,
    recommendations: data.recommendations ?? [],
  };
}

export async function fetchOutfitStills(baselineReportId: string): Promise<{
  stills: {
    id: string;
    fileId: string;
    createdAt: string;
    promptMeta?: {
      dressCode?: string;
      workSetting?: string;
      presentation?: string;
      focusFeatures?: string[];
      eyeColor?: string;
      hairColor?: string;
      complementaryColors?: string[];
      recommendedStyle?: string;
      rationale?: string;
    };
  }[];
  cap: number;
  used: number;
  remaining: number;
  user: AuthUser;
}> {
  const token = getAuthToken();
  if (!token) throw new Error("Sign in required.");
  const res = await fetch(
    `/api/outfits?baselineReportId=${encodeURIComponent(baselineReportId)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );
  const data = (await res.json().catch(() => null)) as {
    stills?: {
      id: string;
      fileId: string;
      createdAt: string;
      promptMeta?: {
        dressCode?: string;
        workSetting?: string;
        presentation?: string;
        focusFeatures?: string[];
        eyeColor?: string;
        hairColor?: string;
        complementaryColors?: string[];
        recommendedStyle?: string;
        rationale?: string;
      };
    }[];
    cap?: number;
    used?: number;
    remaining?: number;
    user?: AuthUser;
    error?: string;
  } | null;
  if (!res.ok || !data?.user) {
    throw new Error(data?.error ?? "Failed to load outfits.");
  }
  return {
    stills: data.stills ?? [],
    cap: data.cap ?? 1,
    used: data.used ?? 0,
    remaining: data.remaining ?? 0,
    user: data.user,
  };
}

export async function generateOutfitStill(baselineReportId: string): Promise<{
  still: {
    id: string;
    fileId: string;
    createdAt: string;
    promptMeta?: {
      eyeColor?: string;
      hairColor?: string;
      complementaryColors?: string[];
      recommendedStyle?: string;
      rationale?: string;
    };
  };
  recommendation: {
    eyeColor: string;
    hairColor: string;
    undertone: string;
    complementaryColors: string[];
    recommendedStyle: string;
    rationale: string;
  } | null;
  user: AuthUser;
  cap: number;
  used: number;
  remaining: number;
  needsPro?: boolean;
}> {
  const res = await fetch("/api/outfits/generate", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ baselineReportId }),
  });
  const data = (await res.json().catch(() => null)) as {
    still?: {
      id: string;
      fileId: string;
      createdAt: string;
      promptMeta?: {
        eyeColor?: string;
        hairColor?: string;
        complementaryColors?: string[];
        recommendedStyle?: string;
        rationale?: string;
      };
    };
    recommendation?: {
      eyeColor: string;
      hairColor: string;
      undertone: string;
      complementaryColors: string[];
      recommendedStyle: string;
      rationale: string;
    };
    user?: AuthUser;
    cap?: number;
    used?: number;
    remaining?: number;
    needsPro?: boolean;
    error?: string;
  } | null;
  if (!res.ok || !data?.still || !data.user) {
    const err = new Error(data?.error ?? "Outfit generation failed.") as Error & {
      needsPro?: boolean;
    };
    err.needsPro = data?.needsPro === true || res.status === 402;
    throw err;
  }
  return {
    still: data.still,
    recommendation: data.recommendation ?? null,
    user: data.user,
    cap: data.cap ?? 1,
    used: data.used ?? 0,
    remaining: data.remaining ?? 0,
    needsPro: data.needsPro,
  };
}

