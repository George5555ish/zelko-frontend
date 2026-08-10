import Link from "next/link";
import { SITE_NAV } from "@/lib/site-nav";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-[var(--hero-surface)] px-6 py-16 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-[family-name:var(--font-cursive)] text-3xl text-neutral-950">
            Zelko
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-500">
            Assess measurable features. Act on ranked recommendations. Prove
            cause-linked change — privately.
          </p>
          <Link
            href="/upload"
            className="mt-6 inline-flex rounded-xl bg-[#ebe4ff] px-5 py-3 text-sm font-medium text-neutral-900 transition hover:bg-[#e0d6ff]"
          >
            Start your free report
          </Link>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
            Navigate
          </p>
          <ul className="mt-4 space-y-2.5">
            {SITE_NAV.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-neutral-700 transition hover:text-neutral-950"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/upload"
                className="text-sm text-neutral-700 transition hover:text-neutral-950"
              >
                Upload
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
            Product
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-neutral-700">
            <li>Assess → Act → Prove</li>
            <li>8 measurable features</li>
            <li>Photos deleted by default</li>
            <li>
              <Link href="/contact" className="transition hover:text-neutral-950">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-2 border-t border-neutral-200/80 pt-6 text-xs text-neutral-400 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Zelko. All rights reserved.</p>
        <p>No percentiles. No unmeasurable traits. Explainable only.</p>
      </div>
    </footer>
  );
}
