"use client";

import { useEffect, useState } from "react";
import { fetchMe, type AuthUser } from "@/lib/auth";

/** Lightweight session hook for nav / chrome. */
export function useAuthUser() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void fetchMe()
      .then((me) => {
        if (!cancelled) setUser(me);
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { user, ready, isAuthed: Boolean(user) };
}
