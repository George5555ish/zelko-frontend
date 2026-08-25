"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MenuToggleButton,
  MobileNavSheet,
} from "@/components/site/MobileNavSheet";
import { setAuthToken } from "@/lib/auth";
import { navForAuth } from "@/lib/site-nav";
import { useAuthUser } from "@/lib/use-auth-user";

/**
 * Floating pill navbar — glassmorphic, shrinks on scroll (Qoves-style).
 */
export function GlassPillNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthed } = useAuthUser();
  const navLinks = navForAuth(isAuthed);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? "px-3 pt-3 sm:px-5 sm:pt-4" : "px-0 pt-0"
        }`}
      >
        <header
          className={`pointer-events-auto flex w-full items-center justify-between gap-3 text-white transition-[max-width,padding,background-color,backdrop-filter,border-radius,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled
              ? "max-w-3xl rounded-full border border-white/15 bg-[#1a1c20]/72 px-4 py-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:px-5 sm:py-2.5"
              : "max-w-none rounded-none border border-transparent bg-transparent px-5 py-4 backdrop-blur-none sm:px-8 sm:py-5 md:px-10"
          }`}
        >
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <LogoMark />
            <span className="sr-only">Zelko</span>
          </Link>

          <nav
            className={`hidden items-center text-[0.9rem] text-white/75 lg:flex ${
              scrolled ? "gap-5" : "gap-7"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthed && user?.isPro ? (
              <span className="hidden rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white sm:inline">
                Pro
              </span>
            ) : null}
            <Link
              href={isAuthed ? "/dashboard" : "/login"}
              className="hidden text-sm text-white/75 transition hover:text-white sm:inline"
            >
              {isAuthed ? "Dashboard" : "Log in"}
            </Link>
            <Link
              href="/upload"
              className={`hidden rounded-full text-sm font-semibold text-[#1a1e24] transition hover:bg-white/92 sm:inline-flex ${
                scrolled
                  ? "bg-white px-3.5 py-1.5"
                  : "bg-white px-4 py-2 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]"
              }`}
            >
              Start free report
            </Link>
            <MenuToggleButton
              open={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              light
            />
          </div>
        </header>
      </div>

      <MobileNavSheet
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
        extras={
          isAuthed ? (
            <div className="flex flex-col gap-3">
              <Link
                href="/upload"
                onClick={() => setMenuOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-xl bg-neutral-950 px-5 py-3.5 text-sm font-semibold text-white"
              >
                New assessment
              </Link>
              <div className="flex gap-3">
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-neutral-900/70 px-4 py-3 text-sm font-medium text-neutral-900"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setAuthToken(null);
                    window.location.href = "/";
                  }}
                  className="inline-flex flex-1 cursor-pointer items-center justify-center rounded-xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/upload"
                onClick={() => setMenuOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-xl bg-neutral-950 px-5 py-3.5 text-sm font-semibold text-white"
              >
                Start your free report
              </Link>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-xl border border-neutral-900/70 px-4 py-3 text-sm font-medium text-neutral-900"
              >
                Log in
              </Link>
            </div>
          )
        }
      />
    </>
  );
}

function LogoMark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-white"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8.2 14.5 12 7.5l3.8 7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
