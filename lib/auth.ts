/** Client auth helpers — token in localStorage, API via Next /api rewrite. */

export const AUTH_TOKEN_KEY = "zelko.authToken";

export interface AuthUser {
  id: string;
  email: string;
  reportIds: string[];
  createdAt: string;
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

export async function registerAccount(input: {
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

export function portraitUrl(portraitFileId: string | null | undefined): string | null {
  if (!portraitFileId) return null;
  return `/api/files/${portraitFileId}`;
}
