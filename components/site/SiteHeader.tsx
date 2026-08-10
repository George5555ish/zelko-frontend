"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE_NAV } from "@/lib/site-nav";
import {
  MenuToggleButton,
  MobileNavSheet,
} from "@/components/site/MobileNavSheet";

export function SiteHeader({
  variant = "solid",
}: {
  variant?: "solid" | "overlay";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [started, setStarted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setStarted(true), 40);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const frosted =
    variant === "solid" || scrolled
      ? "border-b border-neutral-200/40 bg-[color-mix(in_srgb,var(--hero-surface)_78%,transparent)] backdrop-blur-sm"
      : "border-b border-transparent bg-transparent";

  const overlayLight = variant === "overlay" && !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${frosted}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 sm:px-6 sm:py-5 md:px-10">
          <Link
            href="/"
            className={`hero-word flex items-center gap-2.5 ${started ? "is-in" : ""}`}
            style={{ transitionDelay: "40ms" }}
          >
            <LogoMark />
            <span
              className={`text-[1.25rem] font-semibold tracking-tight sm:text-[1.35rem] ${
                overlayLight ? "text-white" : "text-neutral-950"
              }`}
            >
              Zelko
            </span>
          </Link>

          <nav
            className={`hidden items-center gap-7 text-[0.92rem] lg:flex ${
              overlayLight ? "text-white/85" : "text-neutral-700"
            }`}
          >
            {SITE_NAV.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hero-word transition ${
                  overlayLight ? "hover:text-white" : "hover:text-neutral-950"
                } ${started ? "is-in" : ""}`}
                style={{ transitionDelay: `${120 + i * 70}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <Link
              href="/contact"
              className={`hero-word hidden rounded-lg border px-4 py-2 text-sm font-medium transition lg:inline-flex ${
                overlayLight
                  ? "border-white/80 text-white hover:bg-white/10"
                  : "border-neutral-900/80 text-neutral-900 hover:bg-white/50"
              } ${started ? "is-in" : ""}`}
              style={{ transitionDelay: `${120 + SITE_NAV.length * 70 + 40}ms` }}
            >
              Contact Us
            </Link>
            <Link
              href="/login"
              className={`hero-word hidden text-sm font-medium transition sm:inline ${
                overlayLight
                  ? "text-white/90 hover:text-white"
                  : "text-neutral-800 hover:text-neutral-950"
              } ${started ? "is-in" : ""}`}
              style={{
                transitionDelay: `${120 + SITE_NAV.length * 70 + 110}ms`,
              }}
            >
              Log in
            </Link>
            <MenuToggleButton
              open={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              light={overlayLight}
            />
          </div>
        </div>
      </header>

      <MobileNavSheet
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={SITE_NAV}
        extras={
          <div className="flex gap-3">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-neutral-900/70 px-4 py-3 text-sm font-medium text-neutral-900"
            >
              Contact
            </Link>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white"
            >
              Log in
            </Link>
          </div>
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
      className="text-[#8b7cf6]"
    >
      <path
        d="M12 2.5 13.8 8.2 19.5 10 13.8 11.8 12 17.5 10.2 11.8 4.5 10 10.2 8.2 12 2.5Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M18.2 14.2 19 16.6 21.4 17.4 19 18.2 18.2 20.6 17.4 18.2 15 17.4 17.4 16.6 18.2 14.2Z"
        fill="currentColor"
      />
      <path
        d="M6.4 15.1 7 17 8.9 17.6 7 18.2 6.4 20.1 5.8 18.2 3.9 17.6 5.8 17 6.4 15.1Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}
