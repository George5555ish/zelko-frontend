import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-neutral-900">
      <SiteHeader variant="solid" />
      <PageHero
        eyebrow="Contact"
        title="Open line."
        description="Questions about access, privacy, or partnerships — send a note. We read every message."
      />

      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="space-y-6 text-sm text-neutral-500">
              <p>
                Prefer email?{" "}
                <a
                  href="mailto:hello@zelko.app"
                  className="font-medium text-neutral-800 underline-offset-4 hover:underline"
                >
                  hello@zelko.app
                </a>
              </p>
              <p>
                For paid access inquiries, include how you plan to use tracking
                (personal vs team) so we can point you to the right path.
              </p>
            </div>
          </Reveal>

          <Reveal delayMs={100}>
            <form className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.16em] text-neutral-400">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-[var(--hero-surface)] px-4 py-3 text-sm outline-none ring-neutral-900 focus:ring-1"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.16em] text-neutral-400">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-[var(--hero-surface)] px-4 py-3 text-sm outline-none ring-neutral-900 focus:ring-1"
                  placeholder="you@example.com"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.16em] text-neutral-400">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="mt-2 w-full resize-y rounded-xl border border-neutral-200 bg-[var(--hero-surface)] px-4 py-3 text-sm outline-none ring-neutral-900 focus:ring-1"
                  placeholder="How can we help?"
                />
              </label>
              <button
                type="submit"
                className="rounded-xl bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Send message
              </button>
              <p className="text-xs text-neutral-400">
                Form submit is a stub for now — wire to your inbox when ready.
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
