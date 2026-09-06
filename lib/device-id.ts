/** Stable browser device id for beta generation abuse limits. */

const STORAGE_KEY = "zelko.deviceId";

function randomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `dev_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

export function getOrCreateDeviceId(): string {
  if (typeof window === "undefined") return "";
  try {
    const existing = localStorage.getItem(STORAGE_KEY)?.trim();
    if (existing && existing.length >= 8) return existing;
    const next = randomId();
    localStorage.setItem(STORAGE_KEY, next);
    return next;
  } catch {
    return randomId();
  }
}

export function deviceAuthHeaders(
  extra?: HeadersInit,
): Record<string, string> {
  const base: Record<string, string> = {};
  if (extra) {
    const h = new Headers(extra);
    h.forEach((v, k) => {
      base[k] = v;
    });
  }
  const id = getOrCreateDeviceId();
  if (id) base["X-Zelko-Device-Id"] = id;
  return base;
}
