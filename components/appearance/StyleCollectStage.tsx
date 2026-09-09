"use client";

import { useState } from "react";
import {
  StylePrefsForm,
  stylePrefsComplete,
} from "./StylePrefsForm";
import type { StylePreferences } from "@/lib/appearance-index";

export function StyleCollectStage({
  onSubmit,
  saving,
  error,
}: {
  onSubmit: (prefs: StylePreferences) => void;
  saving: boolean;
  error: string | null;
}) {
  const [prefs, setPrefs] = useState<Partial<StylePreferences>>({});
  const ready = stylePrefsComplete(prefs);

  return (
    <section className="ai-reveal">
      <div className="ai-reveal__intro">
        <p className="ai-reveal__eyebrow">Stage 2 · Style preferences</p>
        <h2>What do you actually wear?</h2>
        <p>
          Quick visual picks — who we’re dressing, favorite color, bottoms,
          silhouette, vibe, and budget. These answers shape your Style Profile
          and shoppable looks.
        </p>
      </div>

      <StylePrefsForm value={prefs} onChange={setPrefs} />

      {error ? <p className="ai-error">{error}</p> : null}

      <div className="ai-reveal__cta">
        <button
          type="button"
          className="ai-btn"
          disabled={!ready || saving}
          onClick={() => {
            if (stylePrefsComplete(prefs)) onSubmit(prefs);
          }}
        >
          {saving ? "Saving…" : "See my Style Profile"}
        </button>
        <p className="ai-reveal__note">
          Full-body upload for height/build estimates will plug in here next —
          any estimates will be labeled as AI estimates, not measurements.
        </p>
      </div>
    </section>
  );
}
