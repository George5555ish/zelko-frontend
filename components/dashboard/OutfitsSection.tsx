"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuthToken } from "@/lib/auth";
import type { AppearanceJourneyView, JourneyLook } from "@/lib/appearance-index";

/**
 * Placeholder shoppable eBay card — Browse API wiring comes later.
 * Shows journey look descriptions as search prompts so the dashboard
 * already has a home for affiliate listings.
 */
export function EbayLooksCard({
  reportId,
  looks,
}: {
  reportId: string | null;
  looks: JourneyLook[];
}) {
  const readyLooks = looks.filter((l) => l.status === "ready");
  const prompts: Array<
    Pick<JourneyLook, "id" | "index" | "label" | "recommendedStyle">
  > =
    readyLooks.length > 0
      ? readyLooks
      : [
          {
            id: "placeholder",
            index: 0,
            label: "Signature look",
            recommendedStyle: "casual midi dress neutrals",
          },
        ];

  return (
    <section className="account-dash__card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
            eBay matches
          </p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight text-white">
            Shoppable looks
          </h2>
          <p className="mt-1 max-w-xl text-sm text-white/50">
            Affiliate listings matched to your prescribed outfits. Links stay
            free — live Browse API results land here next.
          </p>
        </div>
        {reportId ? (
          <Link
            href={`/appearance/${reportId}`}
            className="shrink-0 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/10"
          >
            Open style journey
          </Link>
        ) : null}
      </div>

      <ul className="mt-5 grid gap-3 sm:grid-cols-1">
        {prompts.slice(0, 1).map((look, i) => {
          const query = encodeURIComponent(
            (look.recommendedStyle || look.label || "outfit").slice(0, 80),
          );
          const href = `https://www.ebay.com/sch/i.html?_nkw=${query}`;
          return (
            <li
              key={look.id || `ebay-${i}`}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">
                {look.label}
              </p>
              <p className="mt-2 text-sm font-medium text-white/85 line-clamp-3">
                {look.recommendedStyle || "Style match coming soon"}
              </p>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mt-4 inline-flex text-xs font-semibold text-white/70 underline-offset-4 hover:text-white hover:underline"
              >
                Search on eBay →
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function JourneyLooksGallery({
  reportId,
}: {
  reportId: string;
}) {
  const [looks, setLooks] = useState<JourneyLook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const token = getAuthToken();
        const res = await fetch(`/api/appearance/${reportId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          cache: "no-store",
        });
        const data = (await res.json()) as {
          journey?: AppearanceJourneyView;
          error?: string;
        };
        if (!res.ok || !data.journey) {
          if (!cancelled) {
            setLooks([]);
            setError(data.error ?? null);
          }
          return;
        }
        if (!cancelled) {
          setLooks(data.journey.looks ?? []);
        }
      } catch {
        if (!cancelled) setError("Could not load prescribed looks.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reportId]);

  const ready = looks.filter((l) => l.status === "ready" && l.fileId);

  return (
    <>
      <section className="account-dash__card p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
              Prescribed looks
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-white">
              From your appearance journey
            </h2>
            <p className="mt-1 text-sm text-white/50">
              The three style stills generated after your Face + Style reveal.
            </p>
          </div>
          <Link
            href={`/appearance/${reportId}`}
            className="text-xs font-semibold text-white/70 underline-offset-4 hover:underline"
          >
            {ready.length ? "Regenerate in journey →" : "Generate looks →"}
          </Link>
        </div>

        {loading ? (
          <p className="mt-5 text-sm text-white/45">Loading looks…</p>
        ) : error ? (
          <p className="mt-5 text-sm text-amber-200/90">{error}</p>
        ) : ready.length === 0 ? (
          <p className="mt-5 text-sm text-white/45">
            No prescribed looks yet. Finish the style journey to generate them.
          </p>
        ) : (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {ready.map((look) => (
              <article
                key={look.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/api/files/${look.fileId}`}
                  alt={look.label}
                  className="aspect-[3/4] w-full object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-white">
                    {look.label}
                  </h3>
                  {look.recommendedStyle ? (
                    <p className="mt-1 text-xs leading-relaxed text-white/50 line-clamp-3">
                      {look.recommendedStyle}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <EbayLooksCard reportId={reportId} looks={looks} />
    </>
  );
}
