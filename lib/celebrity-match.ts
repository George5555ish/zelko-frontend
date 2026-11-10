/**
 * Celebrity style match — stable, deterministic ranking for the product pivot.
 * Facial scoring UI is parked; this becomes the primary home experience.
 */

export interface CelebrityProfile {
  id: string;
  name: string;
  vibe: string;
  tags: string[];
  /** Reference portrait path (real photo when photoReady / asset ingested). */
  imageSrc: string;
  palette: string[];
  hairNote: string;
  outfitNotes: string[];
}

export interface CelebrityMatchResult {
  celebrity: CelebrityProfile;
  percent: number;
  reason: string;
}

export interface InspiredLook {
  id: string;
  title: string;
  vibe: string;
  outfit: string;
  hair: string;
  palette: string[];
  wearability: string;
  imageSrc: string;
  /** Script-style share line, e.g. "Inspired soft chic look" */
  shareLabel: string;
  keywords: string[];
}

export interface PersonalityStyle {
  id: string;
  label: string;
  note: string;
}

export interface FeatureObservation {
  key: string;
  label: string;
  note: string;
  /** Structural / typically surgical — show professional-advice disclaimer. */
  structural?: boolean;
}

export interface CelebrityMatchBundle {
  seed: string;
  matches: CelebrityMatchResult[];
  selectedId: string;
  inspiredLooks: InspiredLook[];
  personality: PersonalityStyle;
  featureNotes: FeatureObservation[];
  updatedNote: string | null;
}

/** Curated women-focused celebrity style anchors (names as style references). */
export const CELEBRITY_CATALOG: CelebrityProfile[] = [
  {
    id: "zendaya",
    name: "Zendaya",
    vibe: "High-contrast glam with clean structure",
    tags: ["bold", "structured", "red-carpet"],
    imageSrc: "/celebrities/zendaya.jpg",
    palette: ["#0f0f0f", "#c4a484", "#f5f0ea", "#8b1e3f"],
    hairNote: "Sleek parting or soft waves that keep the face open",
    outfitNotes: [
      "Column dresses and sharp tailoring",
      "High-contrast neutrals with one deep accent",
    ],
  },
  {
    id: "emma-stone",
    name: "Emma Stone",
    vibe: "Soft polish with warm, approachable ease",
    tags: ["soft", "approachable", "classic"],
    imageSrc: "/celebrities/emma-stone.jpg",
    palette: ["#f2e6d8", "#b56b4a", "#2c3e50", "#e8d5c4"],
    hairNote: "Loose waves or a soft side part",
    outfitNotes: [
      "Fluid midi dresses and soft knits",
      "Warm neutrals and peachy accents",
    ],
  },
  {
    id: "rihanna",
    name: "Rihanna",
    vibe: "Bold silhouette and high-impact color",
    tags: ["bold", "high-contrast", "fashion-forward"],
    imageSrc: "/celebrities/rihanna.jpg",
    palette: ["#111111", "#f5f5f5", "#c41e3a", "#d4af37"],
    hairNote: "Statement shape or sleek pulled-back finish",
    outfitNotes: [
      "Architectural cuts and strong shoulders",
      "Black/white base with a saturated pop",
    ],
  },
  {
    id: "blake-lively",
    name: "Blake Lively",
    vibe: "Romantic volume with polished everyday glam",
    tags: ["romantic", "polished", "feminine"],
    imageSrc: "/celebrities/blake-lively.jpg",
    palette: ["#1a2744", "#c9a66b", "#f7efe6", "#5c4033"],
    hairNote: "Full waves and face-framing length",
    outfitNotes: [
      "Fitted waists with flowing skirts",
      "Navy, camel, and soft metallics",
    ],
  },
  {
    id: "zendaya-street",
    name: "Ayo Edebiri",
    vibe: "Clean and structured with quiet wit",
    tags: ["clean", "structured", "smart"],
    imageSrc: "/celebrities/ayo-edebiri.jpg",
    palette: ["#1c1c1c", "#ece7df", "#6b7c8a", "#8b5a2b"],
    hairNote: "Neat texture that stays intentional",
    outfitNotes: [
      "Tailored trousers and crisp layers",
      "Muted earth tones and soft contrast",
    ],
  },
  {
    id: "sydney-sweeney",
    name: "Sydney Sweeney",
    vibe: "Soft glam with classic Hollywood ease",
    tags: ["soft", "glam", "classic"],
    imageSrc: "/celebrities/sydney-sweeney.jpg",
    palette: ["#f4ebe3", "#2b2b2b", "#9c6b4a", "#d8c3b0"],
    hairNote: "Soft volume and a gentle face frame",
    outfitNotes: [
      "Figure-skimming knits and clean denim",
      "Cream, chocolate, and soft rose",
    ],
  },
  {
    id: "jennifer-lawrence",
    name: "Jennifer Lawrence",
    vibe: "Effortless ease with athletic polish",
    tags: ["casual", "effortless", "sporty-chic"],
    imageSrc: "/celebrities/jennifer-lawrence.jpg",
    palette: ["#2f2f2f", "#d9d2c5", "#5a6b5d", "#a67c52"],
    hairNote: "Low-effort texture, off the face for day",
    outfitNotes: [
      "Relaxed blazers over simple tees",
      "Olive, sand, and soft charcoal",
    ],
  },
  {
    id: "lupita",
    name: "Lupita Nyong'o",
    vibe: "Sculptural color and refined drama",
    tags: ["bold", "color", "sculptural"],
    imageSrc: "/celebrities/lupita.jpg",
    palette: ["#0d1b2a", "#e76f51", "#f4f1de", "#2a9d8f"],
    hairNote: "Shape-forward styles that read intentional",
    outfitNotes: [
      "Clean silhouettes with saturated color",
      "Jewel tones against soft neutrals",
    ],
  },
];

const STORAGE_KEY = "zelko-celebrity-match-v1";

function fnv1a(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function matchSeedForReport(report: {
  id: string;
  portraitFileId?: string | null;
  standardizedPortraitFileId?: string | null;
}): string {
  return [
    report.id,
    report.standardizedPortraitFileId ?? "",
    report.portraitFileId ?? "",
  ].join(":");
}

function loadPersisted(seed: string): {
  selectedId: string | null;
  priorTop: string[] | null;
} {
  if (typeof window === "undefined") {
    return { selectedId: null, priorTop: null };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { selectedId: null, priorTop: null };
    const all = JSON.parse(raw) as Record<
      string,
      { selectedId?: string; priorTop?: string[] }
    >;
    const entry = all[seed];
    return {
      selectedId: entry?.selectedId ?? null,
      priorTop: entry?.priorTop ?? null,
    };
  } catch {
    return { selectedId: null, priorTop: null };
  }
}

export function persistCelebritySelection(
  seed: string,
  selectedId: string,
  priorTop: string[],
) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const all = raw
      ? (JSON.parse(raw) as Record<
          string,
          { selectedId: string; priorTop: string[] }
        >)
      : {};
    all[seed] = { selectedId, priorTop };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    /* ignore quota */
  }
}

/** Top 3 only; percentages stay at or under 60%. */
export function rankCelebrityMatches(seed: string): CelebrityMatchResult[] {
  const rand = mulberry32(fnv1a(seed));
  const scored = CELEBRITY_CATALOG.map((celebrity) => {
    const base = 48 + rand() * 12;
    const jitter = (fnv1a(`${seed}:${celebrity.id}`) % 500) / 100;
    return {
      celebrity,
      percent: Math.round(Math.min(60, Math.max(38, base - jitter))),
      reason: celebrity.vibe,
    };
  });
  return scored.sort((a, b) => b.percent - a.percent).slice(0, 3);
}

export function inspiredLooksFor(
  celebrity: CelebrityProfile,
  seed: string,
): InspiredLook[] {
  const rand = mulberry32(fnv1a(`${seed}:looks:${celebrity.id}`));
  const bases: InspiredLook[] = [
    {
      id: `${celebrity.id}-soft-chic`,
      title: "Soft Chic",
      vibe: celebrity.vibe,
      outfit: celebrity.outfitNotes[0] ?? "Clean separates with a soft top",
      hair: "Effortless waves",
      palette: celebrity.palette.slice(0, 3),
      wearability: "Neutral tones that still feel finished.",
      imageSrc: "/woman1.png",
      shareLabel: "Inspired soft chic look",
      keywords: ["Soft tones", "Effortless hair", "Feminine elegance"],
    },
    {
      id: `${celebrity.id}-modern-romantic`,
      title: "Modern Romantic",
      vibe: "Romantic take on the same anchor",
      outfit:
        celebrity.outfitNotes[1] ??
        "Soft denim, a good knit, and a structured bag",
      hair: "Soft face-framing texture",
      palette: [...celebrity.palette].reverse().slice(0, 3),
      wearability: "Blush and satin energy, still wearable.",
      imageSrc: "/woman2.png",
      shareLabel: "Inspired modern romantic look",
      keywords: ["Blush tones", "Soft volume", "Romantic polish"],
    },
    {
      id: `${celebrity.id}-polished-minimal`,
      title: "Polished Minimal",
      vibe: "Same silhouette language, cleaner finish",
      outfit: "One decisive piece — dress or tailored set — in a lead palette color",
      hair: celebrity.hairNote,
      palette: celebrity.palette,
      wearability: "Sharp neutrals with quiet confidence.",
      imageSrc: "/woman3.png",
      shareLabel: "Inspired polished minimal look",
      keywords: ["Clean lines", "Quiet contrast", "Timeless polish"],
    },
  ];
  const order = bases
    .map((look, i) => ({ look, w: rand() + i * 0.01 }))
    .sort((a, b) => a.w - b.w)
    .map((x) => x.look);
  return order.slice(0, 3);
}

export function personalityFor(
  celebrity: CelebrityProfile,
  seed: string,
): PersonalityStyle {
  const options: PersonalityStyle[] = [
    {
      id: "clean-structured",
      label: "Clean and structured",
      note: "Your photos read intentional and composed — tailoring and clear lines will feel natural.",
    },
    {
      id: "soft-approachable",
      label: "Soft and approachable",
      note: "Warm, easy presentation — fluid fabrics and gentle contrast suit you.",
    },
    {
      id: "bold-contrast",
      label: "Bold and high-contrast",
      note: "Strong presence in frame — lean into decisive color and silhouette.",
    },
  ];
  const idx = fnv1a(`${seed}:persona:${celebrity.id}`) % options.length;
  if (celebrity.tags.includes("bold")) return options[2]!;
  if (celebrity.tags.includes("soft") || celebrity.tags.includes("approachable"))
    return options[1]!;
  if (celebrity.tags.includes("structured") || celebrity.tags.includes("clean"))
    return options[0]!;
  return options[idx]!;
}

export function featureNotesFor(seed: string): FeatureObservation[] {
  const pool: FeatureObservation[] = [
    {
      key: "eyes",
      label: "Eyes",
      note: "Eye shape reads clearly in frame — soft emphasis along the outer corner keeps focus here.",
    },
    {
      key: "brows",
      label: "Brows",
      note: "Brow line frames the upper face cleanly; a light tidy edge is usually enough.",
    },
    {
      key: "nose",
      label: "Nose",
      note: "Bridge and tip read in balance with the mid-face in these photos.",
      structural: true,
    },
    {
      key: "lips",
      label: "Lips",
      note: "Lip shape supports soft or defined finishes — match product intensity to the look.",
    },
    {
      key: "face_shape",
      label: "Face shape",
      note: "Overall silhouette gives a clear frame for necklines and hair length.",
      structural: true,
    },
    {
      key: "hair",
      label: "Hair",
      note: "Hair framing that keeps the forehead and temples open helps your lead features stay visible.",
    },
  ];
  const start = fnv1a(`${seed}:features`) % pool.length;
  return [0, 1, 2, 3, 4, 5].map((i) => pool[(start + i) % pool.length]!);
}

export function buildCelebrityMatchBundle(
  report: {
    id: string;
    portraitFileId?: string | null;
    standardizedPortraitFileId?: string | null;
  },
  selectedIdOverride?: string | null,
): CelebrityMatchBundle {
  const seed = matchSeedForReport(report);
  const matches = rankCelebrityMatches(seed);
  const persisted = loadPersisted(seed);
  const selectedId =
    selectedIdOverride ||
    persisted.selectedId ||
    matches[0]?.celebrity.id ||
    CELEBRITY_CATALOG[0]!.id;

  const selected =
    CELEBRITY_CATALOG.find((c) => c.id === selectedId) ||
    matches[0]!.celebrity;

  const topIds = matches.map((m) => m.celebrity.id);
  let updatedNote: string | null = null;
  if (
    persisted.priorTop &&
    persisted.priorTop.length > 0 &&
    persisted.priorTop[0] !== topIds[0]
  ) {
    updatedNote = "Match updated slightly based on new photos.";
  } else if (
    persisted.priorTop &&
    persisted.priorTop.join(",") !== topIds.join(",")
  ) {
    updatedNote = "Match order shifted slightly — your anchor can stay the same.";
  }

  return {
    seed,
    matches,
    selectedId: selected.id,
    inspiredLooks: inspiredLooksFor(selected, seed),
    personality: personalityFor(selected, seed),
    featureNotes: featureNotesFor(seed),
    updatedNote,
  };
}

export function getCelebrityById(id: string): CelebrityProfile | undefined {
  return CELEBRITY_CATALOG.find((c) => c.id === id);
}
