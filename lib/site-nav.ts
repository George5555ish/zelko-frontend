export type SiteNavLink = { label: string; href: string };

/** Marketing / guest navigation */
export const SITE_NAV_GUEST: readonly SiteNavLink[] = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Your report", href: "/your-report" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
] as const;

/** Signed-in product navigation */
export const SITE_NAV_AUTH: readonly SiteNavLink[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Assess", href: "/upload" },
  { label: "Tracking", href: "/tracking" },
  { label: "Pricing", href: "/pricing" },
] as const;

/** @deprecated Prefer SITE_NAV_GUEST / navForAuth() */
export const SITE_NAV = SITE_NAV_GUEST;

export function navForAuth(isAuthed: boolean): readonly SiteNavLink[] {
  return isAuthed ? SITE_NAV_AUTH : SITE_NAV_GUEST;
}
