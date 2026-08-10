"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ConsentGate } from "@/components/ConsentGate";
import { PhotoUpload } from "@/components/PhotoUpload";
import {
  clearStoredConsent,
  readStoredConsent,
  type UploadConsent,
} from "@/lib/consent";

export function UploadExperience() {
  const [consent, setConsent] = useState<UploadConsent | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setConsent(readStoredConsent());
    setHydrated(true);
  }, []);

  return (
    <main className="upload-page bg-[var(--background)] text-neutral-900">
      <SiteHeader variant="solid" />

      <section className="upload-stage">
        <div className="upload-stage-portrait" aria-hidden>
          <Image
            src="/upload/hero.png"
            alt=""
            fill
            priority
            className="object-cover object-[38%_8%]"
            sizes="(max-width: 900px) 100vw, 70vw"
          />
          <div className="upload-stage-portrait-fade" />
        </div>

        <div className="upload-stage-inner">
          <div className="upload-stage-card">
            {consent && (
              <div className="mb-3 max-w-md rounded-2xl border border-neutral-200/80 bg-white/85 px-3.5 py-2.5 text-sm text-neutral-600 shadow-sm backdrop-blur-sm">
                <p>
                  Retention:{" "}
                  <span className="font-medium text-neutral-900">
                    {consent.retainForTracking
                      ? "Keep for tracking"
                      : "Delete after report"}
                  </span>
                  {" · "}
                  Training:{" "}
                  <span className="font-medium text-neutral-900">
                    {consent.allowTraining ? "Allowed" : "Not allowed"}
                  </span>
                </p>
                <button
                  type="button"
                  className="mt-1.5 text-xs font-medium text-[var(--accent)] underline-offset-2 hover:underline"
                  onClick={() => {
                    clearStoredConsent();
                    setConsent(null);
                  }}
                >
                  Edit consent
                </button>
              </div>
            )}

            <div className="upload-stage-card-body">
              {!hydrated ? (
                <div className="h-[20rem] animate-pulse rounded-3xl border border-neutral-200 bg-white/70" />
              ) : consent ? (
                <PhotoUpload consent={consent} />
              ) : (
                <ConsentGate onAccepted={setConsent} />
              )}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
