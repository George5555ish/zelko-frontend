/**
 * Upload privacy defaults — PRODUCT.md:
 * Analyze → report → delete extras by default.
 * Tracking / training remain off unless the product later exposes settings.
 * Full conditions live on /privacy.
 */

export interface UploadConsent {
  /** User proceeds under Privacy Policy terms (analysis allowed). */
  analysisAcknowledged: boolean;
  /** Default false: delete source photos after report. */
  retainForTracking: boolean;
  /** Default false: never train without explicit separate permission. */
  allowTraining: boolean;
  acceptedAt: string;
}

export const CONSENT_STORAGE_KEY = "zelko.uploadConsent";

/** Defaults applied when the user starts an upload (no consent gate). */
export function acceptedUploadConsent(): UploadConsent {
  return {
    analysisAcknowledged: true,
    retainForTracking: false,
    allowTraining: false,
    acceptedAt: new Date().toISOString(),
  };
}

export function defaultConsentDraft(): Omit<UploadConsent, "acceptedAt"> {
  return {
    analysisAcknowledged: true,
    retainForTracking: false,
    allowTraining: false,
  };
}

export function readStoredConsent(): UploadConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as UploadConsent;
    if (!parsed?.analysisAcknowledged || !parsed.acceptedAt) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeStoredConsent(consent: UploadConsent): void {
  sessionStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
}

export function clearStoredConsent(): void {
  sessionStorage.removeItem(CONSENT_STORAGE_KEY);
}
