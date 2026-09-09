"use client";

import {
  BOTTOM_PREFERENCES,
  CLOTHING_PRESENTATIONS,
  FAVORITE_COLORS,
  SILHOUETTE_PREFERENCES,
  STYLE_BUDGETS,
  STYLE_VIBES,
  type AppearanceJourneyView,
} from "@/lib/appearance-index";

export function StyleProfileReveal({
  journey,
  onContinue,
}: {
  journey: AppearanceJourneyView;
  onContinue: () => void;
}) {
  const profile = journey.styleProfile;
  const prefs = profile?.preferences ?? journey.stylePreferences;

  return (
    <section className="ai-reveal">
      <div className="ai-reveal__intro">
        <p className="ai-reveal__eyebrow">Stage 2 · Style Profile</p>
        <h2>Your style read</h2>
        <p>
          Built from your answers. Vision signals from a full-body photo will
          refine this later.
        </p>
      </div>

      <article className="ai-style-card report-glass">
        <p className="ai-style-card__summary">
          {profile?.summary ?? "Style preferences saved."}
        </p>
        {profile?.estimateNote ? (
          <p className="ai-style-card__estimate">{profile.estimateNote}</p>
        ) : null}

        {prefs ? (
          <dl className="ai-style-card__grid">
            <div>
              <dt>Dressing</dt>
              <dd>
                {
                  CLOTHING_PRESENTATIONS.find(
                    (p) => p.id === prefs.presentation,
                  )?.label ?? "Women"
                }
              </dd>
            </div>
            <div>
              <dt>Color</dt>
              <dd>
                <span
                  className="ai-style-card__dot"
                  style={{
                    background:
                      FAVORITE_COLORS.find((c) => c.id === prefs.favoriteColor)
                        ?.hex ?? "#888",
                  }}
                />
                {
                  FAVORITE_COLORS.find((c) => c.id === prefs.favoriteColor)
                    ?.label
                }
              </dd>
            </div>
            <div>
              <dt>Prefer</dt>
              <dd>
                {
                  BOTTOM_PREFERENCES.find(
                    (b) => b.id === prefs.bottomPreference,
                  )?.label
                }
              </dd>
            </div>
            <div>
              <dt>Silhouette</dt>
              <dd>
                {
                  SILHOUETTE_PREFERENCES.find((s) => s.id === prefs.silhouette)
                    ?.label
                }
              </dd>
            </div>
            <div>
              <dt>Vibe</dt>
              <dd>
                {STYLE_VIBES.find((v) => v.id === prefs.vibe)?.label}
              </dd>
            </div>
            <div>
              <dt>Budget</dt>
              <dd>
                {STYLE_BUDGETS.find((b) => b.id === prefs.budget)?.label}
              </dd>
            </div>
          </dl>
        ) : null}
      </article>

      <div className="ai-reveal__cta">
        <button type="button" className="ai-btn" onClick={onContinue}>
          Generate my looks
        </button>
        <p className="ai-reveal__note">
          Next: three outfit stills using your face — styled from these
          preferences.
        </p>
      </div>
    </section>
  );
}
