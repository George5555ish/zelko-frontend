"use client";

import { useCallback, useEffect, useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import type { ReportViewModel } from "@/lib/types/report";
import {
  appearanceStageToFlowStep,
  type AppearanceJourneyView,
  type AppearanceStage,
  type StylePreferences,
} from "@/lib/appearance-index";
import { fetchMe, getAuthToken, type AuthUser } from "@/lib/auth";
import { useAuthUser } from "@/lib/use-auth-user";
import { FaceGroomingReveal } from "./FaceGroomingReveal";
import { StyleCollectStage } from "./StyleCollectStage";
import { StyleProfileReveal } from "./StyleProfileReveal";
import { LooksReveal } from "./LooksReveal";
import { JourneyProPitch } from "./JourneyProPitch";
import { JourneyProgressBar } from "./JourneyProgressBar";
import { AppearanceAuthGate } from "./AppearanceAuthGate";
import "@/components/report/report-dash.css";
import "@/app/appearance/appearance.css";
import "@/app/journey-progress.css";

function needsAuthForStage(stage: AppearanceStage): boolean {
  return stage !== "face_reveal";
}

export function AppearanceJourney({ report }: { report: ReportViewModel }) {
  const { user, ready: authReady, isAuthed } = useAuthUser();
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [journey, setJourney] = useState<AppearanceJourneyView | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [prefsError, setPrefsError] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [pendingAdvance, setPendingAdvance] =
    useState<AppearanceStage | null>(null);

  const signedIn = isAuthed || Boolean(authUser);

  const authHeaders = useCallback((): HeadersInit => {
    const token = getAuthToken();
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }, []);

  useEffect(() => {
    if (user) setAuthUser(user);
  }, [user]);

  // Return from Stripe Checkout on this page.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const q = new URLSearchParams(window.location.search).get("checkout");
    if (q !== "success" && q !== "cancel") return;

    const url = new URL(window.location.href);
    url.searchParams.delete("checkout");
    window.history.replaceState({}, "", url.pathname);

    if (q === "cancel") return;

    void (async () => {
      for (let i = 0; i < 6; i++) {
        const me = await fetchMe();
        if (me?.isPro) {
          setAuthUser(me);
          return;
        }
        await new Promise((r) => setTimeout(r, 1000));
      }
    })();
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/appearance/${report.id}`, {
          headers: authHeaders(),
          cache: "no-store",
        });
        const data = (await res.json()) as {
          journey?: AppearanceJourneyView;
          error?: string;
        };
        if (!res.ok || !data.journey) {
          if (!cancelled) {
            setLoadError(data.error ?? "Could not load appearance journey.");
          }
          return;
        }
        if (!cancelled) setJourney(data.journey);
      } catch {
        if (!cancelled) setLoadError("Could not load appearance journey.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [authHeaders, report.id]);

  // Past face reveal without a session → hard gate.
  useEffect(() => {
    if (!authReady || !journey) return;
    if (!signedIn && needsAuthForStage(journey.stage)) {
      setAuthOpen(true);
    }
  }, [authReady, journey, signedIn]);

  const advance = useCallback(
    async (stage: AppearanceStage) => {
      // Never hit the API without a session — open the prompt instead.
      if (!getAuthToken()) {
        setPendingAdvance(stage);
        setAuthOpen(true);
        setPrefsError(null);
        return;
      }

      setSaving(true);
      setPrefsError(null);
      try {
        const res = await fetch(`/api/appearance/${report.id}/advance`, {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify({ stage }),
        });
        const raw = await res.text();
        let data: {
          journey?: AppearanceJourneyView;
          error?: string;
        } = {};
        try {
          data = raw ? (JSON.parse(raw) as typeof data) : {};
        } catch {
          data = {};
        }

        if (res.status === 401) {
          setPendingAdvance(stage);
          setAuthOpen(true);
          setPrefsError(null);
          return;
        }
        if (!res.ok || !data.journey) {
          setPrefsError(data.error ?? "Could not continue.");
          return;
        }
        setJourney(data.journey);
        setPendingAdvance(null);
      } finally {
        setSaving(false);
      }
    },
    [authHeaders, report.id],
  );

  const submitPrefs = useCallback(
    async (preferences: StylePreferences) => {
      if (!getAuthToken()) {
        setAuthOpen(true);
        return;
      }

      setSaving(true);
      setPrefsError(null);
      try {
        const res = await fetch(
          `/api/appearance/${report.id}/style-preferences`,
          {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify({ preferences }),
          },
        );
        const raw = await res.text();
        let data: {
          journey?: AppearanceJourneyView;
          error?: string;
        } = {};
        try {
          data = raw ? (JSON.parse(raw) as typeof data) : {};
        } catch {
          data = {};
        }

        if (res.status === 401) {
          setAuthOpen(true);
          return;
        }
        if (!res.ok || !data.journey) {
          setPrefsError(data.error ?? "Could not save preferences.");
          return;
        }
        setJourney(data.journey);
      } finally {
        setSaving(false);
      }
    },
    [authHeaders, report.id],
  );

  const onContinueFromFace = useCallback(() => {
    // Always gate on the real token — don't rely on async session state alone.
    if (!getAuthToken()) {
      setPendingAdvance("style_collect");
      setAuthOpen(true);
      return;
    }
    void advance("style_collect");
  }, [advance]);

  const onAuthed = useCallback(
    (next: AuthUser) => {
      setAuthUser(next);
      setAuthOpen(false);
      const target = pendingAdvance ?? "style_collect";
      setPendingAdvance(null);
      void (async () => {
        let stageNow: AppearanceStage = "face_reveal";
        try {
          const res = await fetch(`/api/appearance/${report.id}`, {
            headers: {
              "Content-Type": "application/json",
              ...(getAuthToken()
                ? { Authorization: `Bearer ${getAuthToken()}` }
                : {}),
            },
            cache: "no-store",
          });
          const data = (await res.json()) as {
            journey?: AppearanceJourneyView;
          };
          if (data.journey) {
            setJourney(data.journey);
            stageNow = data.journey.stage;
          }
        } catch {
          /* continue */
        }
        if (stageNow === "face_reveal") {
          await advance(target);
        }
      })();
    },
    [advance, pendingAdvance, report.id],
  );

  const stage = journey?.stage ?? "face_reveal";
  const flowStep = appearanceStageToFlowStep(stage);
  const lockedPastFace = authReady && !signedIn && needsAuthForStage(stage);

  return (
    <main className="ai-page">
      <SiteHeader variant="dark" />

      <div className="ai-shell pt-20 sm:pt-24">
        <JourneyProgressBar
          current={flowStep}
          withinStep={flowStep === "complete" ? 1 : 0.35}
          variant="dark"
          detail={
            flowStep === "complete"
              ? undefined
              : flowStep === "face_reveal"
                ? "Upload done · reviewing Structure & Grooming"
                : flowStep === "style_collect"
                  ? "Pick your visual style preferences"
                  : flowStep === "style_reveal"
                    ? "Style Profile ready — looks are next"
                    : "Almost done — prescribed looks"
          }
        />

        {loadError ? (
          <p className="ai-error">{loadError}</p>
        ) : !journey || !authReady ? (
          <p className="ai-loading">Loading your Appearance Index…</p>
        ) : lockedPastFace ? (
          <section className="ai-reveal">
            <div className="ai-reveal__intro">
              <p className="ai-reveal__eyebrow">Account required</p>
              <h2>Sign in to continue your style profile</h2>
              <p>
                Face &amp; Grooming stay free to view. Style preferences and
                prescribed looks need a free account so we can save them to your
                dashboard.
              </p>
            </div>
            <div className="ai-reveal__cta">
              <button
                type="button"
                className="ai-btn"
                onClick={() => setAuthOpen(true)}
              >
                Create account / sign in
              </button>
            </div>
          </section>
        ) : stage === "face_reveal" ? (
          <FaceGroomingReveal
            report={report}
            pillars={journey.pillars}
            onContinue={onContinueFromFace}
            continueLabel={
              signedIn
                ? "Continue to style profile"
                : "Continue — create free account"
            }
            continueNote={
              signedIn
                ? "Next: visual style choices, then prescribed looks."
                : "Next: a free account, then visual style choices and prescribed looks."
            }
          />
        ) : stage === "style_collect" ? (
          <StyleCollectStage
            onSubmit={(p) => void submitPrefs(p)}
            saving={saving}
            error={prefsError}
          />
        ) : stage === "style_reveal" ? (
          <StyleProfileReveal
            journey={journey}
            onContinue={() => void advance("prescription_reveal")}
          />
        ) : stage === "prescription_reveal" ? (
          <LooksReveal
            reportId={report.id}
            portraitFileId={report.portraitFileId ?? null}
            journey={journey}
            onJourneyUpdate={setJourney}
            onFinish={() => void advance("complete")}
          />
        ) : (
          <JourneyProPitch
            reportId={report.id}
            user={authUser ?? user}
            onUserUpdate={(u) => setAuthUser(u)}
          />
        )}

        {prefsError && stage === "face_reveal" ? (
          <p className="ai-error mt-4">{prefsError}</p>
        ) : null}
      </div>

      <AppearanceAuthGate
        reportId={report.id}
        open={authOpen}
        dismissible={stage === "face_reveal"}
        onDismiss={
          stage === "face_reveal"
            ? () => {
                setAuthOpen(false);
                setPendingAdvance(null);
              }
            : undefined
        }
        onAuthed={onAuthed}
      />
    </main>
  );
}
