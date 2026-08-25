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
import "@/app/upload/upload.css";

export function UploadExperience() {
  const [consent, setConsent] = useState<UploadConsent | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setConsent(readStoredConsent());
    setHydrated(true);
  }, []);

  return (
    <main className="upload-page text-neutral-900">
      <SiteHeader variant="solid" />

      <section className="upload-stage">
        <div className="upload-stage-portrait" aria-hidden>
          <Image
            src="/upload/hero.png"
            alt=""
            fill
            priority
            className="object-cover object-[42%_12%]"
            sizes="100vw"
          />
          <div className="upload-stage-portrait-fade" />
        </div>

        <div className="upload-stage-inner">
          <div className="upload-stage-card">
            {consent && (
              <div className="upload-glass mb-4 px-4 py-3 text-center text-sm text-neutral-600">
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
                <div className="upload-glass h-[22rem] animate-pulse" />
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
