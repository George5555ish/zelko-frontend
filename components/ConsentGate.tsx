"use client";

import { useState } from "react";
import {
  defaultConsentDraft,
  type UploadConsent,
  writeStoredConsent,
} from "@/lib/consent";

export function ConsentGate({
  onAccepted,
}: {
  onAccepted: (consent: UploadConsent) => void;
}) {
  const [draft, setDraft] = useState(defaultConsentDraft);
  const [error, setError] = useState<string | null>(null);

  function toggle<K extends keyof typeof draft>(key: K) {
    setDraft((prev) => ({ ...prev, [key]: !prev[key] }));
    setError(null);
  }

  function submit() {
    if (!draft.analysisAcknowledged) {
      setError("Confirm analysis consent to continue.");
      return;
    }

    const consent: UploadConsent = {
      ...draft,
      acceptedAt: new Date().toISOString(),
    };
    writeStoredConsent(consent);
    onAccepted(consent);
  }

  return (
    <div className="rounded-3xl border border-neutral-200/70 bg-white/75 p-4 shadow-[0_20px_60px_-40px_rgba(40,20,80,0.45)] backdrop-blur-md sm:p-5">
      <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">
        Privacy first
      </p>
      <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-neutral-950 sm:text-xl">
        Consent before processing
      </h2>
      <p className="mt-1.5 text-[13px] leading-snug text-neutral-500">
        Analyze → report → delete by default. Tracking and training are opt-in.
      </p>

      <ul className="mt-4 space-y-2">
        <ConsentRow
          required
          checked={draft.analysisAcknowledged}
          onChange={() => toggle("analysisAcknowledged")}
          title="Run analysis on my photos"
          body="Landmarks and measurable features for your report."
        />
        <ConsentRow
          checked={draft.retainForTracking}
          onChange={() => toggle("retainForTracking")}
          title="Retain photos for tracking"
          body="Keep sources for paid change comparisons. Off by default."
        />
        <ConsentRow
          checked={draft.allowTraining}
          onChange={() => toggle("allowTraining")}
          title="Allow training on my images"
          body="Never used for training unless you opt in."
        />
      </ul>

      {error && (
        <p className="mt-3 rounded-xl bg-[var(--danger-soft)] px-3 py-2 text-sm text-[var(--danger)]">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={submit}
        className="mt-4 w-full rounded-2xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
      >
        Continue to upload
      </button>

      <p className="mt-2 text-center text-[11px] text-neutral-400">
        You can change retention later before analysis completes.
      </p>
    </div>
  );
}

function ConsentRow({
  checked,
  onChange,
  title,
  body,
  required,
}: {
  checked: boolean;
  onChange: () => void;
  title: string;
  body: string;
  required?: boolean;
}) {
  return (
    <li>
      <label className="flex cursor-pointer gap-2.5 rounded-2xl border border-neutral-200/90 bg-[var(--hero-surface)]/60 px-3 py-2.5 transition hover:border-neutral-300">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="mt-0.5 size-4 shrink-0 rounded border-neutral-300 accent-[var(--accent)]"
        />
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-1.5 text-[13px] font-semibold text-neutral-950">
            {title}
            {required ? (
              <span className="rounded-full bg-[var(--accent-soft)] px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--accent)]">
                Required
              </span>
            ) : (
              <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                Optional
              </span>
            )}
          </span>
          <span className="mt-0.5 block text-[12px] leading-snug text-neutral-500">
            {body}
          </span>
        </span>
      </label>
    </li>
  );
}
