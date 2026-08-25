"use client";

import Link from "next/link";
import { useAuthUser } from "@/lib/use-auth-user";

/** Shown on marketing home when Pro has paid but never uploaded a report. */
export function ProNeedsReportBanner() {
  const { user, ready, isAuthed } = useAuthUser();
  if (!ready || !isAuthed || !user?.isPro) return null;
  const hasReport = (user.reportIds?.length ?? 0) > 0;
  if (hasReport) return null;

  return (
    <div className="relative z-30 border-b border-amber-200/80 bg-amber-50 px-5 py-3 text-amber-950 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <p className="text-sm leading-snug">
          <span className="font-semibold">Pro is active</span> — upload your
          first assessment to unlock progress, streaks, and your action
          checklist. Tracking stays locked until then.
        </p>
        <Link
          href="/upload"
          className="inline-flex shrink-0 rounded-xl bg-neutral-950 px-4 py-2 text-sm font-medium text-white"
        >
          Upload first report
        </Link>
      </div>
    </div>
  );
}
