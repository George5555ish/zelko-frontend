import Image from "next/image";
import { Reveal } from "@/components/site/Reveal";

export function VersusSection() {
  return (
    <section className="relative isolate min-h-[70vh] overflow-hidden bg-black text-white md:min-h-[78vh]">
      <Image
        src="/woman1.png"
        alt=""
        fill
        priority={false}
        className="object-cover object-[18%_center] md:object-left"
        sizes="100vw"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/55 to-black md:from-transparent md:via-black/50 md:to-black"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent md:hidden"
      />

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl items-end px-6 py-16 md:min-h-[78vh] md:items-center md:justify-end md:px-10 md:py-24">
        <div className="w-full max-w-xl md:text-right">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">
              No public ranks
            </p>
          </Reveal>
          <Reveal delayMs={90}>
            <h2 className="mt-5 font-[family-name:var(--font-cursive)] text-[2.65rem] leading-[1.08] text-white sm:text-5xl md:text-6xl">
              It&apos;s not you versus everyone,
              <br />
              it&apos;s you versus you.
            </h2>
          </Reveal>
          <Reveal delayMs={170}>
            <p className="mt-6 text-base leading-relaxed text-white/55 md:ml-auto md:max-w-md">
              Zelko never percentiles you against strangers. Progress is private
              — measured against your own baseline, not a crowd.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
