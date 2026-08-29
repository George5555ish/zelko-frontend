"use client";

import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PhotoUpload } from "@/components/PhotoUpload";
import { acceptedUploadConsent } from "@/lib/consent";
import "@/app/upload/upload.css";

export function UploadExperience() {
  const consent = acceptedUploadConsent();

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
            <div className="upload-stage-card-body">
              <PhotoUpload consent={consent} />
              <p className="mt-2 text-center text-[11px] leading-relaxed text-neutral-400">
                By uploading you agree to how we handle photos under our{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-neutral-600 underline-offset-2 hover:text-neutral-900 hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
