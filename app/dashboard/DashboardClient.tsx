"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchMe,
  setAuthToken,
  type AuthUser,
} from "@/lib/auth";
import { AccountDashboard } from "@/components/AccountDashboard";
import { useDashboardTheme } from "@/hooks/useDashboardTheme";
import "@/components/account-dash.css";

export default function DashboardClient() {
  const router = useRouter();
  const { theme, toggleTheme } = useDashboardTheme();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const me = await fetchMe();
      if (!me) {
        router.replace("/login?next=/dashboard");
        return;
      }
      setUser(me);
      setLoading(false);
    })();
  }, [router]);

  if (loading || !user) {
    return (
      <main
        className="dash-page flex min-h-screen items-center justify-center"
        data-theme={theme}
      >
        <p className="text-sm opacity-50">Loading dashboard…</p>
      </main>
    );
  }

  return (
    <main className="dash-page relative min-h-screen overflow-hidden" data-theme={theme}>
      <div aria-hidden className="dash-page__glow pointer-events-none absolute inset-0" />
      <div className="relative z-10 px-4 pb-16 pt-6 sm:px-6 md:px-10">
        <div className="mx-auto mb-5 flex max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight"
            style={{ color: "var(--dash-page-fg)" }}
          >
            Zelko
          </Link>
          <p
            className="text-xs uppercase tracking-[0.16em]"
            style={{ color: "var(--dash-page-muted)" }}
          >
            Dashboard
          </p>
        </div>
        <AccountDashboard
          user={user}
          theme={theme}
          onToggleTheme={toggleTheme}
          onUserChange={setUser}
          onSignOut={() => {
            setAuthToken(null);
            router.replace("/login");
          }}
        />
      </div>
    </main>
  );
}
