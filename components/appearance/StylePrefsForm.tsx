"use client";

import {
  CLOTHING_PRESENTATIONS,
  FAVORITE_COLORS,
  SILHOUETTE_PREFERENCES,
  STYLE_BUDGETS,
  STYLE_VIBES,
  bottomsForPresentation,
  type BottomPreferenceId,
  type ClothingPresentationId,
  type FavoriteColorId,
  type SilhouettePreferenceId,
  type StyleBudgetId,
  type StylePreferences,
  type StyleVibeId,
} from "@/lib/appearance-index";
import {
  DressIllustration,
  JeansIllustration,
  SilhouetteIllustration,
  SkirtIllustration,
  TrousersIllustration,
} from "./StyleIllustrations";

type Props = {
  value: Partial<StylePreferences>;
  onChange: (next: Partial<StylePreferences>) => void;
};

function bottomArt(id: BottomPreferenceId) {
  const cls = "h-16 w-14 text-current";
  switch (id) {
    case "dresses":
      return <DressIllustration className={cls} />;
    case "jeans":
      return <JeansIllustration className={cls} />;
    case "skirts":
      return <SkirtIllustration className={cls} />;
    case "trousers":
      return <TrousersIllustration className={cls} />;
  }
}

export function StylePrefsForm({ value, onChange }: Props) {
  const bottomOptions = bottomsForPresentation(value.presentation);

  function setPresentation(presentation: ClothingPresentationId) {
    const allowed = bottomsForPresentation(presentation).map((b) => b.id);
    const bottomOk =
      value.bottomPreference && allowed.includes(value.bottomPreference);
    onChange({
      ...value,
      presentation,
      bottomPreference: bottomOk ? value.bottomPreference : undefined,
    });
  }

  return (
    <div className="style-prefs">
      <fieldset className="style-prefs__block">
        <legend className="style-prefs__legend">Who are we dressing?</legend>
        <p className="style-prefs__hint">
          This picks men’s or women’s clothing for your prescribed look and shop
          links.
        </p>
        <div className="style-prefs__chips">
          {CLOTHING_PRESENTATIONS.map((opt) => {
            const selected = value.presentation === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                className={`style-prefs__chip${selected ? " is-selected" : ""}`}
                aria-pressed={selected}
                onClick={() => setPresentation(opt.id)}
              >
                <strong>{opt.label}</strong>
                <span>{opt.hint}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="style-prefs__block">
        <legend className="style-prefs__legend">Favorite color</legend>
        <p className="style-prefs__hint">Pick the tone you reach for most.</p>
        <div className="style-prefs__swatches">
          {FAVORITE_COLORS.map((c) => {
            const selected = value.favoriteColor === c.id;
            return (
              <button
                key={c.id}
                type="button"
                className={`style-prefs__swatch${selected ? " is-selected" : ""}`}
                style={{ background: c.hex }}
                aria-pressed={selected}
                aria-label={c.label}
                onClick={() =>
                  onChange({
                    ...value,
                    favoriteColor: c.id as FavoriteColorId,
                  })
                }
              >
                <span className="style-prefs__swatch-label">{c.label}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="style-prefs__block">
        <legend className="style-prefs__legend">What do you prefer?</legend>
        <p className="style-prefs__hint">
          {value.presentation === "masculine"
            ? "Jeans or trousers — tap the look that feels like you."
            : "Dresses, jeans, or something else — tap the look that feels like you."}
        </p>
        <div className="style-prefs__cards">
          {bottomOptions.map((opt) => {
            const selected = value.bottomPreference === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                className={`style-prefs__card${selected ? " is-selected" : ""}`}
                aria-pressed={selected}
                onClick={() =>
                  onChange({
                    ...value,
                    bottomPreference: opt.id as BottomPreferenceId,
                  })
                }
              >
                <span className="style-prefs__card-art" aria-hidden>
                  {bottomArt(opt.id)}
                </span>
                <span className="style-prefs__card-label">{opt.label}</span>
                <span className="style-prefs__card-hint">{opt.hint}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="style-prefs__block">
        <legend className="style-prefs__legend">Silhouette</legend>
        <p className="style-prefs__hint">How do clothes usually sit on you?</p>
        <div className="style-prefs__cards style-prefs__cards--3">
          {SILHOUETTE_PREFERENCES.map((opt) => {
            const selected = value.silhouette === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                className={`style-prefs__card${selected ? " is-selected" : ""}`}
                aria-pressed={selected}
                onClick={() =>
                  onChange({
                    ...value,
                    silhouette: opt.id as SilhouettePreferenceId,
                  })
                }
              >
                <span className="style-prefs__card-art" aria-hidden>
                  <SilhouetteIllustration
                    variant={opt.id}
                    className="h-16 w-14 text-current"
                  />
                </span>
                <span className="style-prefs__card-label">{opt.label}</span>
                <span className="style-prefs__card-hint">{opt.hint}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="style-prefs__block">
        <legend className="style-prefs__legend">Overall vibe</legend>
        <p className="style-prefs__hint">The energy you want your looks to send.</p>
        <div className="style-prefs__chips">
          {STYLE_VIBES.map((opt) => {
            const selected = value.vibe === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                className={`style-prefs__chip${selected ? " is-selected" : ""}`}
                aria-pressed={selected}
                onClick={() =>
                  onChange({ ...value, vibe: opt.id as StyleVibeId })
                }
              >
                <strong>{opt.label}</strong>
                <span>{opt.hint}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="style-prefs__block">
        <legend className="style-prefs__legend">Budget for pieces</legend>
        <p className="style-prefs__hint">
          Used later for shoppable looks — not a judgment.
        </p>
        <div className="style-prefs__chips">
          {STYLE_BUDGETS.map((opt) => {
            const selected = value.budget === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                className={`style-prefs__chip${selected ? " is-selected" : ""}`}
                aria-pressed={selected}
                onClick={() =>
                  onChange({ ...value, budget: opt.id as StyleBudgetId })
                }
              >
                <strong>{opt.label}</strong>
                <span>{opt.hint}</span>
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

export function stylePrefsComplete(
  value: Partial<StylePreferences>,
): value is StylePreferences {
  return Boolean(
    value.presentation &&
      value.favoriteColor &&
      value.bottomPreference &&
      value.silhouette &&
      value.vibe &&
      value.budget,
  );
}
