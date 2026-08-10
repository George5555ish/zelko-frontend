"use client";

import Link from "next/link";
import { useEffect, useId, useRef, type ReactNode } from "react";

export type MobileNavLink = { label: string; href: string };

/**
 * Full-viewport glass nav sheet for < lg breakpoints.
 * Staggered link entrance; locks body scroll while open.
 */
export function MobileNavSheet({
  open,
  onClose,
  links,
  extras,
}: {
  open: boolean;
  onClose: () => void;
  links: readonly MobileNavLink[];
  /** Optional trailing actions (Contact, Log in, CTA). */
  extras?: ReactNode;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="nav-sheet fixed inset-0 z-[60] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="nav-sheet__backdrop absolute inset-0 cursor-pointer border-0 bg-neutral-950/25"
        aria-label="Close menu"
        onClick={onClose}
      />

      <div className="nav-sheet__panel absolute inset-x-3 top-3 bottom-3 flex flex-col overflow-hidden rounded-[1.75rem] border border-white/40 bg-white/55 shadow-[0_24px_80px_rgba(20,12,40,0.18)] backdrop-blur-2xl sm:inset-x-5 sm:top-4 sm:bottom-4">
        <div className="flex items-center justify-between px-5 pb-2 pt-5">
          <p
            id={titleId}
            className="nav-sheet__item text-xs uppercase tracking-[0.2em] text-neutral-500"
            style={{ animationDelay: "40ms" }}
          >
            Menu
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="nav-sheet__item flex size-10 cursor-pointer items-center justify-center rounded-full border border-neutral-200/80 bg-white/70 text-neutral-800 transition hover:bg-white"
            style={{ animationDelay: "60ms" }}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center gap-1 px-5 pb-6">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="nav-sheet__item rounded-2xl px-3 py-3.5 text-2xl font-semibold tracking-tight text-neutral-950 transition hover:bg-white/50 sm:text-3xl"
              style={{ animationDelay: `${120 + i * 70}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {extras && (
          <div
            className="nav-sheet__item border-t border-neutral-200/60 px-5 py-5"
            style={{ animationDelay: `${120 + links.length * 70 + 40}ms` }}
          >
            {extras}
          </div>
        )}
      </div>
    </div>
  );
}

export function MenuToggleButton({
  open,
  onClick,
  light,
}: {
  open: boolean;
  onClick: () => void;
  /** When true, icon is light (for dark hero / unscrolled overlay). */
  light?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      className={`relative flex size-10 cursor-pointer items-center justify-center rounded-full border transition lg:hidden ${
        light
          ? "border-white/35 bg-white/10 text-white hover:bg-white/20"
          : "border-neutral-200/80 bg-white/70 text-neutral-900 hover:bg-white"
      }`}
    >
      <span className="sr-only">{open ? "Close" : "Menu"}</span>
      <span
        className={`absolute h-[1.5px] w-4 rounded-full transition duration-300 ${
          light ? "bg-white" : "bg-neutral-900"
        } ${open ? "translate-y-0 rotate-45" : "-translate-y-[3.5px]"}`}
      />
      <span
        className={`absolute h-[1.5px] w-4 rounded-full transition duration-300 ${
          light ? "bg-white" : "bg-neutral-900"
        } ${open ? "opacity-0" : "opacity-100"}`}
      />
      <span
        className={`absolute h-[1.5px] w-4 rounded-full transition duration-300 ${
          light ? "bg-white" : "bg-neutral-900"
        } ${open ? "translate-y-0 -rotate-45" : "translate-y-[3.5px]"}`}
      />
    </button>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
