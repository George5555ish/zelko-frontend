import { getAuthToken } from "@/lib/auth";
import type { CelebrityProfile } from "@/lib/celebrity-match";

export type ApiCelebrity = CelebrityProfile & {
  region?: string;
  photoReady?: boolean;
  updates?: Array<{
    id: string;
    title: string;
    note: string;
    imageSrc?: string;
    postedAt: string;
  }>;
};

export type ApiMatchHit = {
  celebrityId: string;
  percent: number;
  similarity: number;
  reason: string;
  celebrity: ApiCelebrity;
};

export type CelebrityMatchResponse = {
  reportId: string;
  portraitFileId: string;
  embeddingModel: string;
  matches: ApiMatchHit[];
  selectedCelebrityId: string;
  selected: ApiCelebrity | null;
  updatedNote: string | null;
  persisted: boolean;
};

function authHeaders(): HeadersInit {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function fetchCelebrityMatch(input: {
  reportId: string;
  selectedCelebrityId?: string | null;
  forceRecompute?: boolean;
}): Promise<CelebrityMatchResponse | null> {
  try {
    const res = await fetch("/api/celebrity/match", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        reportId: input.reportId,
        selectedCelebrityId: input.selectedCelebrityId ?? undefined,
        forceRecompute: input.forceRecompute === true,
      }),
    });
    if (!res.ok) return null;
    return (await res.json()) as CelebrityMatchResponse;
  } catch {
    return null;
  }
}

export async function searchCelebrities(input?: {
  q?: string;
  limit?: number;
}): Promise<ApiCelebrity[]> {
  try {
    const params = new URLSearchParams();
    if (input?.q) params.set("q", input.q);
    params.set("limit", String(input?.limit ?? 60));
    const res = await fetch(`/api/celebrity?${params.toString()}`, {
      headers: authHeaders(),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { celebrities?: ApiCelebrity[] };
    return data.celebrities ?? [];
  } catch {
    return [];
  }
}

export async function selectCelebrityApi(
  reportId: string,
  celebrityId: string,
): Promise<ApiCelebrity | null> {
  try {
    const res = await fetch("/api/celebrity/select", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ reportId, celebrityId }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { celebrity?: ApiCelebrity };
    return data.celebrity ?? null;
  } catch {
    return null;
  }
}

export function celebrityImageSrc(c: {
  imageSrc?: string;
  photoReady?: boolean;
}): string {
  if (c.imageSrc && (c.photoReady !== false || c.imageSrc.includes("_pending"))) {
    return c.imageSrc;
  }
  if (c.imageSrc) return c.imageSrc;
  return "/celebrities/_pending.svg";
}
