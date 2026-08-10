import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export default function ReportNotFound() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-neutral-900">
      <SiteHeader variant="solid" />
      <section className="mx-auto max-w-xl px-6 pb-24 pt-36 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
          Report
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-cursive)] text-5xl text-neutral-950">
          Not found.
        </h1>
        <p className="mt-4 text-sm text-neutral-500">
          That report id doesn’t exist or is no longer available.
        </p>
        <Link
          href="/upload"
          className="mt-8 inline-flex rounded-xl bg-neutral-950 px-5 py-3 text-sm font-medium text-white"
        >
          Start a new report
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
