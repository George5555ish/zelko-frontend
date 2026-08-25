import Image from "next/image";
import Link from "next/link";

/**
 * Landing section for Toward your look — reference diff + roadmap.
 */
export function TowardYourLookSection() {
  return (
    <section
      id="toward-your-look"
      className="relative overflow-hidden bg-[#12141a] px-5 py-20 text-white sm:px-8 md:px-10 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_80%_20%,rgba(255,255,255,0.05),transparent_55%),radial-gradient(ellipse_50%_40%_at_10%_90%,rgba(148,163,184,0.07),transparent_50%)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-14">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              Toward your look
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-cursive)] text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl">
              Diff against the look you want.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50 sm:text-[15px]">
              Upload a reference photo. We compare you side by side — feature
              alignment, not attractiveness or ethnicity — then map a Pro
              roadmap from where you are to where you&apos;re headed.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-white/55">
              {[
                "You vs reference portraits at a glance",
                "Per-feature alignment bars with real scores",
                "Pro roadmap: ordered steps to close the gaps",
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-white/35" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dashboard?mode=target"
                className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/90"
              >
                Try toward your look
              </Link>
              <Link
                href="/upload"
                className="inline-flex rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                Start free report
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.35rem] border border-white/12 bg-[#0c0d10] shadow-[0_28px_80px_-24px_rgba(0,0,0,0.7)] ring-1 ring-white/5">
            <div className="flex items-center gap-1.5 border-b border-white/8 px-3.5 py-2.5">
              <span className="size-1.5 rounded-full bg-white/20" />
              <span className="size-1.5 rounded-full bg-white/20" />
              <span className="size-1.5 rounded-full bg-white/20" />
              <span className="ml-2 text-[10px] uppercase tracking-[0.14em] text-white/30">
                Feature alignment
              </span>
            </div>
            <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
              <Image
                src="/landing/toward-your-look.png"
                alt="Toward your look comparison: you and reference portraits beside feature alignment scores"
                fill
                sizes="(min-width: 1024px) 40rem, 100vw"
                className="object-cover object-top"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
