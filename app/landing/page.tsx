import type { Metadata } from "next";
import Link from "next/link";
import { BetaNav } from "@/components/landing/BetaNav";
import { BetaHero } from "@/components/landing/BetaHero";
import { BetaSuggestions } from "@/components/landing/BetaSuggestions";
import { BetaHow } from "@/components/landing/BetaHow";
import { BetaReviews } from "@/components/landing/BetaReviews";
import { BetaSignup } from "@/components/landing/BetaSignup";
import "./landing.css";

export const metadata: Metadata = {
  title: "Zelko Beta — Skin & style analysis",
  description:
    "Join the Zelko beta for explainable skin scoring and clothing suggestions. Private, no public ranks.",
};

export default function LandingPage() {
  return (
    <main className="beta-landing min-h-screen bg-white text-neutral-900">
      <BetaNav />
      <BetaHero />
      <BetaSuggestions />
      <BetaHow />
      <BetaReviews />
      <BetaSignup />

      <footer className="border-t border-neutral-100 px-4 py-10 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-neutral-900">Zelko</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="hover:text-neutral-900">
              Main site
            </Link>
            <Link href="/upload" className="hover:text-neutral-900">
              Start report
            </Link>
            <Link href="/faq" className="hover:text-neutral-900">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-neutral-900">
              Contact
            </Link>
          </div>
          <p className="text-xs text-neutral-400">Private beta · 2026</p>
        </div>
      </footer>
    </main>
  );
}
