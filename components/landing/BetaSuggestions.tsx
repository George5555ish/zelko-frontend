import Image from "next/image";
import Link from "next/link";

const SKIN_CARDS = [
  {
    tag: "# Skin clarity",
    title: "Even tone starts with lighting and routine",
    body: "If texture reads uneven, we suggest gentler cleansing and a consistent moisturizer — then re-check under the same light.",
    tone: "bg-[#f7ece6]",
  },
  {
    tag: "# Hydration",
    title: "Dehydration shows up as dull mid-face zones",
    body: "Beta reports flag low-clarity regions and pair them with low-effort care steps, never a diagnosis.",
    tone: "bg-[#efe8f8]",
  },
] as const;

const CLOTHING_CARDS = [
  {
    tag: "# Color match",
    title: "Clothes that flatter your undertone",
    body: "From your scan we suggest a short palette — cool neutrals, warm earth, or soft contrast — so outfits support the face, not fight it.",
    tone: "bg-[#e8eef8]",
  },
  {
    tag: "# Silhouette",
    title: "Neckline and structure for your proportions",
    body: "Open necklines, clean shoulders, or softer collars — ranked by effort so style changes feel doable this week.",
    tone: "bg-[#f3ebe4]",
  },
] as const;

export function BetaSuggestions() {
  return (
    <section id="suggestions" className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.15fr] lg:items-start">
        <div id="about" className="lg:sticky lg:top-28">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            More than a score
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            Zelko is skin guidance and clothing direction — in one private loop.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-500">
            The beta unlocks explainable feature scores plus paired suggestions:
            what to do for your skin, and how to dress so those features read
            stronger. Assess → act → prove, without comparing you to strangers.
          </p>
          <Link
            href="#beta"
            className="mt-8 inline-flex text-sm font-medium text-neutral-900 underline-offset-4 hover:underline"
          >
            Request early access →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-[1.5rem] bg-[#f4ebe3] p-6 sm:col-span-2 sm:p-8">
            <p className="text-lg leading-relaxed text-neutral-800 sm:text-xl">
              “Beautiful skin isn’t cover-model cosmetics — it’s regular,
              competent care that suits you. Style should do the same: quiet
              choices that fit your features.”
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.16em] text-neutral-400">
              Beta belief
            </p>
          </article>

          {SKIN_CARDS.map((card) => (
            <SuggestionCard key={card.title} {...card} kind="Skin" />
          ))}

          <div className="relative min-h-[16rem] overflow-hidden rounded-[1.5rem] sm:row-span-2 sm:min-h-full">
            <Image
              src="/woman1.png"
              alt=""
              fill
              className="object-cover object-[35%_15%]"
              sizes="(max-width: 640px) 100vw, 280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-800">
              # Natural texture
            </p>
          </div>

          {CLOTHING_CARDS.map((card) => (
            <SuggestionCard key={card.title} {...card} kind="Clothing" />
          ))}

          <article className="flex flex-col justify-between rounded-[1.5rem] bg-neutral-950 p-6 text-white sm:col-span-2 sm:flex-row sm:items-end sm:p-8">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                In every free report
              </p>
              <h3 className="mt-3 max-w-md text-2xl font-semibold tracking-tight">
                Overall score + your strongest features — always.
              </h3>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55 sm:mt-0 sm:text-right">
              Paid beta unlocks full breakdown, confidence labels, and both skin
              and clothing recommendation sets.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function SuggestionCard({
  tag,
  title,
  body,
  tone,
  kind,
}: {
  tag: string;
  title: string;
  body: string;
  tone: string;
  kind: "Skin" | "Clothing";
}) {
  return (
    <article className={`flex flex-col rounded-[1.5rem] p-5 ${tone}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
          {tag}
        </span>
        <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-600">
          {kind}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-neutral-950">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{body}</p>
    </article>
  );
}
