import Image from "next/image";
import Link from "next/link";

/**
 * Landing section for Toward your look — reference diff + roadmap.
 * Editorial light break after the dark report previews (not another window chrome row).
 */
export function TowardYourLookSection() {
  return (
    <section
      id="toward-your-look"
      className="relative overflow-hidden bg-[#e6e4df] px-5 py-20 text-neutral-900 sm:px-8 md:px-10 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_10%_0%,rgba(255,255,255,0.55),transparent_55%),radial-gradient(ellipse_50%_40%_at_95%_85%,rgba(90,100,110,0.08),transparent_50%)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:gap-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                Toward your look
              </p>
              <h2 className="mt-3 max-w-xl font-[family-name:var(--font-cursive)] text-4xl leading-[1.08] tracking-tight text-neutral-950 sm:text-5xl">
                Diff against the look you want.
              </h2>
            </div>
            <div className="max-w-md lg:justify-self-end">
              <p className="text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
                Upload a reference photo. We compare you side by side — feature
                alignment, not attractiveness or ethnicity — then map a Pro
                roadmap from where you are to where you&apos;re headed.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/dashboard?mode=target"
                  className="inline-flex rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  Try toward your look
                </Link>
                <Link
                  href="/upload"
                  className="text-sm font-medium text-neutral-600 underline-offset-4 transition hover:text-neutral-950 hover:underline"
                >
                  Start free pass
                </Link>
              </div>
            </div>
          </div>

          <figure className="relative overflow-hidden rounded-[1.5rem] bg-neutral-900 shadow-[0_32px_90px_-40px_rgba(20,22,28,0.55)] sm:rounded-[1.75rem]">
            <div className="relative aspect-[16/11] w-full sm:aspect-[16/9]">
              <Image
                src="/landing/toward-your-look.png"
                alt="Toward your look comparison: you and reference portraits beside feature alignment scores"
                fill
                sizes="(min-width: 1280px) 80rem, 100vw"
                className="object-cover object-top"
                priority={false}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/55 via-transparent to-transparent"
              />
            </div>

            <figcaption className="absolute inset-x-0 bottom-0 grid gap-3 p-5 sm:grid-cols-3 sm:gap-6 sm:p-7">
              {[
                {
                  label: "Side by side",
                  detail: "You vs reference portraits",
                },
                {
                  label: "Feature bars",
                  detail: "Alignment, not attractiveness",
                },
                {
                  label: "Pro roadmap",
                  detail: "Ordered steps to close gaps",
                },
              ].map((item) => (
                <div key={item.label} className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-white/90">
                    {item.detail}
                  </p>
                </div>
              ))}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
