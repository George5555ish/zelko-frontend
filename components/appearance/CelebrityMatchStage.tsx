"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReportViewModel } from "@/lib/types/report";
import {
  buildCelebrityMatchBundle,
  CELEBRITY_CATALOG,
  featureNotesFor,
  inspiredLooksFor,
  persistCelebritySelection,
  personalityFor,
  type CelebrityMatchBundle,
  type CelebrityProfile,
} from "@/lib/celebrity-match";
import {
  celebrityImageSrc,
  fetchCelebrityMatch,
  searchCelebrities,
  selectCelebrityApi,
  type ApiCelebrity,
  type ApiMatchHit,
} from "@/lib/celebrity-api";
import { FaceAppearanceBreakdown } from "./FaceAppearanceBreakdown";
import { StyleMatchResultCard } from "./ShareMatchCard";

function toProfile(c: ApiCelebrity | CelebrityProfile): CelebrityProfile {
  return {
    id: c.id,
    name: c.name,
    vibe: c.vibe,
    tags: c.tags,
    imageSrc: celebrityImageSrc(c),
    palette: c.palette,
    hairNote: c.hairNote,
    outfitNotes: c.outfitNotes,
  };
}

/**
 * Stage 1 — celebrity style match + inspired looks.
 * Prefers /api/celebrity/match (embedding library); falls back to client seed.
 */
export function CelebrityMatchStage({
  report,
  fullProfileUnlocked = false,
  onContinue,
  continueLabel = "Continue to style preferences",
  onRecalculate,
}: {
  report: ReportViewModel;
  fullProfileUnlocked?: boolean;
  onContinue: () => void;
  continueLabel?: string;
  onRecalculate?: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [apiMatches, setApiMatches] = useState<ApiMatchHit[] | null>(null);
  const [apiUpdatedNote, setApiUpdatedNote] = useState<string | null>(null);
  const [apiSelected, setApiSelected] = useState<CelebrityProfile | null>(null);
  const [library, setLibrary] = useState<CelebrityProfile[]>(CELEBRITY_CATALOG);
  const [matchLoading, setMatchLoading] = useState(true);

  const fallback: CelebrityMatchBundle = useMemo(
    () => buildCelebrityMatchBundle(report, selectedId),
    [report, selectedId],
  );

  useEffect(() => {
    let cancelled = false;
    setMatchLoading(true);
    void (async () => {
      const data = await fetchCelebrityMatch({
        reportId: report.id,
      });
      if (cancelled) return;
      if (data?.matches?.length) {
        setApiMatches(data.matches);
        setApiUpdatedNote(data.updatedNote);
        if (data.selected) {
          const profile = toProfile(data.selected);
          setApiSelected(profile);
          setSelectedId((prev) => prev ?? profile.id);
        }
      } else {
        setApiMatches(null);
        setApiUpdatedNote(null);
      }
      setMatchLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [report.id, report.portraitFileId]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const rows = await searchCelebrities({ limit: 80 });
      if (cancelled || !rows.length) return;
      setLibrary(rows.map(toProfile));
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const matches = useMemo(() => {
    if (apiMatches?.length) {
      return apiMatches.map((m) => ({
        celebrity: toProfile(m.celebrity),
        percent: m.percent,
        reason: m.reason,
      }));
    }
    return fallback.matches;
  }, [apiMatches, fallback.matches]);

  const selected =
    apiSelected && (!selectedId || apiSelected.id === selectedId)
      ? apiSelected
      : matches.find((m) => m.celebrity.id === (selectedId || fallback.selectedId))
          ?.celebrity ||
        library.find((c) => c.id === selectedId) ||
        matches[0]?.celebrity ||
        CELEBRITY_CATALOG[0]!;

  const selectedPercent =
    matches.find((m) => m.celebrity.id === selected.id)?.percent ??
    matches[0]?.percent ??
    52;

  const seed = fallback.seed;
  const inspiredLooks = inspiredLooksFor(selected, seed);
  const leadLook = inspiredLooks[0];
  const shareLabel = leadLook?.shareLabel ?? "Inspired soft chic look";
  const keywords = leadLook?.keywords ?? [
    "Soft tones",
    "Effortless hair",
    "Feminine elegance",
  ];
  const lookLine = leadLook?.outfit ?? selected.outfitNotes[0]!;
  const updatedNote = apiUpdatedNote ?? fallback.updatedNote;

  const personality = personalityFor(selected, seed);
  const featureNotes = featureNotesFor(seed);

  const filtered = library.filter((c) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.tags.some((t) => t.includes(q)) ||
      c.vibe.toLowerCase().includes(q)
    );
  });

  async function chooseCelebrity(c: CelebrityProfile) {
    setSelectedId(c.id);
    setApiSelected(c);
    persistCelebritySelection(
      seed,
      c.id,
      matches.map((m) => m.celebrity.id),
    );
    await selectCelebrityApi(report.id, c.id);
    setPickerOpen(false);
  }

  async function shareOrCopy() {
    const text = `I'm a ${selectedPercent}% style match with ${selected.name} — ${shareLabel}. ${lookLine}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "My style match", text });
        return;
      }
    } catch {
      /* fall through */
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  const portraitSrc = report.portraitFileId
    ? `/api/files/${report.portraitFileId}`
    : "/woman1.png";

  return (
    <section className="ai-reveal celeb-match">
      <header className="celeb-match__brand">
        <p className="celeb-match__brand-mark">Lumière</p>
        <p className="celeb-match__brand-sub">Beauty Match</p>
      </header>

      {matchLoading ? (
        <p className="celeb-match__update">Finding your style anchors…</p>
      ) : null}
      {updatedNote ? (
        <p className="celeb-match__update">{updatedNote}</p>
      ) : null}

      <div className="celeb-match__hero">
        <StyleMatchResultCard
          className="celeb-match__result-card"
          userSrc={portraitSrc}
          celebrity={selected}
          percent={selectedPercent}
          lookLine={lookLine}
          shareLabel={shareLabel}
          keywords={keywords}
        />

        <div className="celeb-match__hero-right">
          <FaceAppearanceBreakdown report={report} portraitSrc={portraitSrc} />

          <aside className="celeb-match__hook">
            <p className="celeb-match__label">Your style anchor</p>
            <h2 className="celeb-match__hook-title">
              Wanna dress like {selected.name}?
            </h2>
            <p className="celeb-match__hook-lead">
              Get personalized style like {selected.name.split(" ")[0]} — wearable
              outfits, hair direction, and palette picks shaped around your match.
            </p>
            <p className="celeb-match__hero-vibe">{selected.vibe}</p>
            <div className="celeb-match__hook-actions">
              <button
                type="button"
                className="celeb-match__btn"
                onClick={() => {
                  document
                    .getElementById("celeb-inspired-looks")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                See looks inspired by {selected.name.split(" ")[0]}
              </button>
              <button
                type="button"
                className="celeb-match__btn celeb-match__btn--ghost"
                onClick={() => {
                  persistCelebritySelection(
                    seed,
                    selected.id,
                    matches.map((m) => m.celebrity.id),
                  );
                  void selectCelebrityApi(report.id, selected.id);
                  onContinue();
                }}
              >
                Personalize my style
              </button>
            </div>
            <div className="celeb-match__hero-actions">
              <button
                type="button"
                className="celeb-match__btn celeb-match__btn--ghost"
                onClick={() => setPickerOpen((v) => !v)}
              >
                Choose a different celebrity
              </button>
              {onRecalculate ? (
                <button
                  type="button"
                  className="celeb-match__btn celeb-match__btn--ghost"
                  onClick={onRecalculate}
                >
                  Recalculate
                </button>
              ) : null}
              <button
                type="button"
                className="celeb-match__btn celeb-match__btn--ghost"
                onClick={() => void shareOrCopy()}
              >
                {copied ? "Copied" : "Share / copy card"}
              </button>
            </div>
            <p className="celeb-match__note">
              Photos from Wikimedia Commons —{" "}
              <a href="/credits/celebrities" className="celeb-match__credit-a">
                view credits
              </a>
            </p>
          </aside>
        </div>
      </div>

      <div className="celeb-match__divider" aria-hidden="true">
        <span />
        <svg viewBox="0 0 24 24" width="14" height="14">
          <path
            d="M12 2l1.4 6.1L20 12l-6.6 1.9L12 22l-1.4-8.1L4 12l6.6-1.9L12 2z"
            fill="currentColor"
          />
        </svg>
        <span />
      </div>

      <aside className="celeb-match__rank">
        <p className="celeb-match__label">Top 3 pairings</p>
        <ul>
          {matches.map((m, index) => (
            <li key={m.celebrity.id}>
              <button
                type="button"
                className={
                  m.celebrity.id === selected.id ? "is-selected" : undefined
                }
                onClick={() => void chooseCelebrity(m.celebrity)}
              >
                <span className="celeb-match__rank-index">{index + 1}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.celebrity.imageSrc}
                  alt=""
                  className="celeb-match__rank-sketch"
                />
                <span className="celeb-match__rank-copy">
                  <span>{m.celebrity.name}</span>
                  <small>{m.celebrity.vibe}</small>
                </span>
                <strong>{m.percent}%</strong>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {pickerOpen ? (
        <div className="celeb-match__picker">
          <div className="celeb-match__picker-head">
            <p className="celeb-match__label">Search the celebrity library</p>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Hollywood & K-pop style anchors…"
              aria-label="Search celebrities"
            />
          </div>
          <ul className="celeb-match__picker-list">
            {filtered.map((c) => (
              <li key={c.id}>
                <button type="button" onClick={() => void chooseCelebrity(c)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.imageSrc} alt="" />
                  <span>
                    <span>{c.name}</span>
                    <small>{c.vibe}</small>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="celeb-match__updates">
        <p className="celeb-match__label">Latest from {selected.name}</p>
        <div className="celeb-match__updates-card">
          <p>
            New outfits and looks from your style anchor will show up here —
            check back as the library refreshes.
          </p>
        </div>
      </div>

      <div className="celeb-match__looks" id="celeb-inspired-looks">
        <div className="celeb-match__looks-intro">
          <p className="celeb-match__label">Inspired looks</p>
          <h3>Wearable directions from {selected.name}</h3>
        </div>
        <div className="celeb-match__look-grid">
          {inspiredLooks.map((look) => (
            <article key={look.id} className="celeb-match__look">
              <div className="celeb-match__look-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={look.imageSrc} alt="" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selected.imageSrc}
                  alt=""
                  className="celeb-match__look-thumb"
                />
              </div>
              <h4>{look.title}</h4>
              <p>{look.hair}</p>
              <p className="celeb-match__look-wear">{look.wearability}</p>
            </article>
          ))}
        </div>
      </div>

      {fullProfileUnlocked ? (
        <div className="celeb-match__profile">
          <p className="celeb-match__label">Full appearance profile</p>
          <h3>{personality.label}</h3>
          <p>{personality.note}</p>
          <ul className="celeb-match__features">
            {featureNotes.map((f) => (
              <li key={f.key}>
                <strong>{f.label}</strong>
                <span>{f.note}</span>
                {f.structural ? (
                  <em>
                    Typically structural / surgical — seek professional advice.
                  </em>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="celeb-match__gate">
          <p className="celeb-match__label">Full appearance profile</p>
          <h3>Unlock with 4 photos</h3>
          <p>
            Add 2 head-to-toe full-body photos and 2 half-body / upper-body
            photos to unlock light feature notes, personality-style match, and
            richer fit context.
          </p>
          <p className="celeb-match__note" style={{ marginTop: "0.75rem" }}>
            Later upgrades: full skin analysis, unlimited inspired looks,
            extra matches, and watermark-free share cards.
          </p>
        </div>
      )}

      <div className="celeb-match__cta">
        <button
          type="button"
          className="celeb-match__btn"
          onClick={() => {
            persistCelebritySelection(
              seed,
              selected.id,
              matches.map((m) => m.celebrity.id),
            );
            void selectCelebrityApi(report.id, selected.id);
            onContinue();
          }}
        >
          {continueLabel}
        </button>
        <p className="celeb-match__note">
          Next: a few taste preferences so inspired looks stay personal.
        </p>
      </div>
    </section>
  );
}
