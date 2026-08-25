"use client";

import { useCallback, useEffect, useState } from "react";

export type DashboardTheme = "light" | "dark";

const STORAGE_KEY = "zelko.dashboardTheme";

export function useDashboardTheme() {
  const [theme, setThemeState] = useState<DashboardTheme>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") {
        setThemeState(stored);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const setTheme = useCallback((next: DashboardTheme) => {
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: DashboardTheme = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return { theme, setTheme, toggleTheme, ready };
}
