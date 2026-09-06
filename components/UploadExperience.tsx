"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PhotoUpload } from "@/components/PhotoUpload";
import { acceptedUploadConsent } from "@/lib/consent";
import "@/components/report/report-dash.css";
import "@/app/upload/upload.css";
import "@/app/journey-progress.css";

export function UploadExperience() {
  const consent = acceptedUploadConsent();

  return (
    <main className="upload-page report-dash relative min-h-svh overflow-x-clip text-white">
      <div aria-hidden className="report-dash__bg" />
      <SiteHeader variant="dark" />

      <section className="upload-stage relative z-10">
        <div className="upload-stage-inner">
          <div className="upload-stage-card">
            <div className="upload-stage-card-body">
              <PhotoUpload consent={consent} />
              <p className="mt-3 text-center text-[11px] leading-relaxed text-white/40">
                By uploading you agree to how we handle photos under our{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-white/70 underline-offset-2 hover:text-white hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
