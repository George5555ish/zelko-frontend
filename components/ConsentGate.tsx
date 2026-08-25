"use client";

import { useState } from "react";
import {
  defaultConsentDraft,
  type UploadConsent,
  writeStoredConsent,
} from "@/lib/consent";
import { PrivacyDataStatement } from "@/components/site/PrivacyDataStatement";

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
    <div className="upload-glass px-5 py-6 text-center sm:px-7 sm:py-8">
      <p className="upload-eyebrow">Privacy first</p>
      <h2 className="mt-2 font-[family-name:var(--font-cursive)] text-3xl leading-tight tracking-tight text-neutral-950 sm:text-[2.15rem]">
        Consent before the ritual.
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-neutral-500">
        Analyze → report → delete extras by default. A portrait stays for
        display. Tracking and training stay opt-in.
      </p>

      <ul className="mt-6 space-y-2.5 text-left">
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
          body="Never used for training unless you opt in. Off by default."
        />
      </ul>

      <div className="mt-5 text-left">
        <PrivacyDataStatement tone="light" compact />
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-[var(--danger-soft)] px-3 py-2 text-sm text-[var(--danger)]">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={submit}
        className="mt-6 w-full rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
      >
        Continue to upload
      </button>

      <p className="mt-3 text-center text-[11px] text-neutral-400">
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
      <label className="upload-glass-inset flex cursor-pointer gap-3 px-3.5 py-3 transition hover:bg-white/35">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="mt-0.5 size-4 shrink-0 rounded border-neutral-300 accent-[var(--accent)]"
        />
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-neutral-950">
            {title}
            {required ? (
              <span className="ml-1.5 text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                Required
              </span>
            ) : null}
          </span>
          <span className="mt-0.5 block text-[12px] leading-snug text-neutral-500">
            {body}
          </span>
        </span>
      </label>
    </li>
  );
}
