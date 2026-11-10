"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

type Attr = {
  id: string;
  name: string;
  imageSrc: string;
  photoReady: boolean;
  sourceUrl: string | null;
  commonsTitle: string | null;
  credit: string | null;
  artist: string | null;
  license: string | null;
  licenseUrl: string | null;
  note?: string;
};

export default function CelebrityCreditsPage() {
  const [entries, setEntries] = useState<Attr[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/celebrities/attribution.json", {
          cache: "no-store",
        });
        if (!res.ok) {
          setError("Attribution file not found yet. Run npm run fetch:commons.");
          return;
        }
        const data = (await res.json()) as Attr[];
        setEntries(Array.isArray(data) ? data : []);
      } catch {
        setError("Could not load attribution.");
      }
    })();
  }, []);

  const ready = entries.filter((e) => e.photoReady);

  return (
    <main className="min-h-screen bg-[#fdfbf7] text-[#4a3f3b]">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-5 pb-20 pt-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8958e]">
          Photo credits
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-cursive)] text-4xl">
          Celebrity reference photos
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#8a7a74]">
          Style-match portraits are sourced from Wikimedia Commons under
          licenses that allow commercial use (CC BY, CC BY-SA, CC0, or public
          domain). NonCommercial images are excluded. {ready.length} of{" "}
          {entries.length || 50} photos are currently ready.
        </p>

        {error ? (
          <p className="mt-8 rounded-xl border border-[#c8958e]/40 bg-white px-4 py-3 text-sm">
            {error}
          </p>
        ) : (
          <ul className="mt-10 space-y-4">
            {entries.map((e) => (
              <li
                key={e.id}
                className="flex gap-4 rounded-2xl border border-[rgba(74,63,59,0.1)] bg-white/80 p-3 shadow-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={e.imageSrc}
                  alt=""
                  className="h-20 w-16 shrink-0 rounded-lg object-cover bg-[#efe8e0]"
                />
                <div className="min-w-0 text-sm">
                  <p className="font-semibold">{e.name}</p>
                  {e.photoReady ? (
                    <>
                      <p className="mt-1 text-[#8a7a74]">
                        {e.credit || e.artist || "Credit on Commons file page"}
                      </p>
                      <p className="mt-1 text-xs text-[#8a7a74]">
                        License:{" "}
                        {e.licenseUrl ? (
                          <a
                            href={e.licenseUrl}
                            className="text-[#b07a74] underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {e.license ?? "View license"}
                          </a>
                        ) : (
                          e.license ?? "—"
                        )}
                        {e.sourceUrl ? (
                          <>
                            {" · "}
                            <a
                              href={e.sourceUrl}
                              className="text-[#b07a74] underline"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Wikimedia Commons
                            </a>
                          </>
                        ) : null}
                      </p>
                      {e.commonsTitle ? (
                        <p className="mt-0.5 truncate text-xs text-[#9a7f74]">
                          {e.commonsTitle}
                        </p>
                      ) : null}
                    </>
                  ) : (
                    <p className="mt-1 text-xs text-[#9a7f74]">
                      {e.note ?? "Photo pending — not used in match display yet."}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-10 text-sm text-[#8a7a74]">
          <Link href="/" className="text-[#b07a74] underline">
            Back home
          </Link>
        </p>
      </div>
      <SiteFooter />
    </main>
  );
}
