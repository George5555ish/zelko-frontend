/**
 * Privacy consent — PRODUCT.md:
 * Default analyze → report → delete source photos.
 * Opt-in to retain for tracking. Separate opt-in for training.
 */

export interface UploadConsent {
  /** Required: user understands analysis will run on their photos. */
  analysisAcknowledged: boolean;
  /** Default false: delete source photos after report. */
  retainForTracking: boolean;
  /** Default false: never train without explicit separate permission. */
  allowTraining: boolean;
  acceptedAt: string;
}

export const CONSENT_STORAGE_KEY = "zelko.uploadConsent";

export function defaultConsentDraft(): Omit<UploadConsent, "acceptedAt"> {
  return {
    analysisAcknowledged: false,
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
