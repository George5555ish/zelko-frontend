"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { setAuthToken } from "@/lib/auth";
import { useAuthUser } from "@/lib/use-auth-user";

const NAV_LEFT = [
  { label: "How it works", href: "#how" },
  { label: "Skin & style", href: "#suggestions" },
  { label: "About beta", href: "#about" },
  { label: "Reviews", href: "#reviews" },
] as const;

const NAV_LEFT_AUTH = [
  { label: "Assess", href: "/upload" },
  { label: "Tracking", href: "/tracking" },
  { label: "Pricing", href: "/pricing" },
  { label: "Account", href: "/login" },
] as const;

export function BetaNav() {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthed } = useAuthUser();
  const links = isAuthed ? NAV_LEFT_AUTH : NAV_LEFT;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,color] duration-300 ${
        scrolled
          ? "border-b border-neutral-200/50 bg-white/85 text-neutral-500 backdrop-blur-md"
          : "border-b border-transparent bg-transparent text-white"
      }`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 md:px-8">
        <nav className="hidden items-center gap-5 text-[0.82rem] tracking-wide lg:flex">
          {links.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.href}
                href={link.href}
                className={`transition ${
                  scrolled ? "hover:text-neutral-900" : "hover:text-white/80"
                }`}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`transition ${
                  scrolled ? "hover:text-neutral-900" : "hover:text-white/80"
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <Link
          href="/landing"
          className="justify-self-center text-center text-[1.55rem] font-semibold tracking-tight"
        >
          Zelko
        </Link>

        <div className="flex items-center justify-end gap-3 text-[0.82rem] sm:gap-4">
          {isAuthed ? (
            <>
              <Link
                href="/login"
                className={`transition ${
                  scrolled ? "hover:text-neutral-900" : "hover:text-white/80"
                }`}
              >
                Account
              </Link>
              <button
                type="button"
                onClick={() => {
                  setAuthToken(null);
                  window.location.href = "/";
                }}
                className={`cursor-pointer transition ${
                  scrolled ? "hover:text-neutral-900" : "hover:text-white/80"
                }`}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <span
                className={`hidden text-xs tracking-[0.14em] sm:inline ${
                  scrolled ? "text-neutral-400" : "text-white/70"
                }`}
              >
                EN
              </span>
              <Link
                href="/login"
                className={`transition ${
                  scrolled ? "hover:text-neutral-900" : "hover:text-white/80"
                }`}
              >
                Log in
              </Link>
              <Link
                href="#beta"
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  scrolled
                    ? "bg-[#ebe4ff] text-neutral-900 hover:bg-[#e0d6ff]"
                    : "bg-white/95 text-neutral-900 hover:bg-white"
                }`}
              >
                Join beta
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
