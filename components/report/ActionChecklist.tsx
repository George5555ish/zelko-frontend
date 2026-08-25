"use client";

import { useCallback, useEffect, useState } from "react";
import {
  fetchChecklist,
  setChecklistItemDone,
  type ChecklistView,
} from "@/lib/checklist";
import { FEATURE_LABELS } from "@/lib/types/report";

export function ActionChecklist({
  reportId,
  highlight,
}: {
  reportId: string;
  /** Emphasize after Stripe return. */
  highlight?: boolean;
}) {
  const [checklist, setChecklist] = useState<ChecklistView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchChecklist(reportId);
      setChecklist(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load checklist.");
    } finally {
      setLoading(false);
    }
  }, [reportId]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!highlight) return;
    const el = document.getElementById("action-checklist");
    if (!el) return;
    const id = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
    return () => window.clearTimeout(id);
  }, [highlight, checklist]);

  async function toggle(itemId: string, completed: boolean) {
    setBusyId(itemId);
    setError(null);
    try {
      const updated = await setChecklistItemDone(reportId, itemId, completed);
      setChecklist(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setBusyId(null);
    }
  }

  if (loading) {
    return (
      <section
        id="action-checklist"
        className="report-glass rounded-3xl px-5 py-6 md:px-6"
      >
        <p className="text-sm text-white/50">Loading your action checklist…</p>
      </section>
    );
  }

  if (!checklist) {
    return null;
  }

  return (
    <section
      id="action-checklist"
      className={`report-glass rounded-3xl px-5 py-6 text-white md:px-6 ${
        highlight ? "ring-2 ring-white/40" : ""
      }`}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/45">
            This week
          </p>
          <h2 className="mt-1 text-xl font-semibold text-white">
            Your action checklist
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
            Only changeable levers — skin, grooming, brows, and photo setup.
            Structural reads stay on the report as context, not weekly chores.
          </p>
        </div>
        <p className="text-sm tabular-nums text-white/60">
          {checklist.completedCount}/{checklist.totalCount} done
        </p>
      </div>

      {error ? (
        <p className="mt-3 text-sm text-rose-300" role="alert">
          {error}
        </p>
      ) : null}

      <ul className="mt-5 space-y-3">
        {checklist.items.map((item) => (
          <li
            key={item.id}
            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <input
              type="checkbox"
              checked={item.completed}
              disabled={busyId === item.id}
              onChange={(e) => void toggle(item.id, e.target.checked)}
              className="mt-1 size-4 cursor-pointer rounded border-white/30 bg-transparent accent-white"
              aria-label={`Mark done: ${item.action}`}
            />
            <div className="min-w-0 flex-1">
              <p
                className={`text-sm font-medium ${
                  item.completed
                    ? "text-white/40 line-through"
                    : "text-white/90"
                }`}
              >
                {item.action}
              </p>
              <p className="mt-1 text-xs text-white/40">
                {FEATURE_LABELS[item.featureKey] ?? item.featureKey}
                {" · "}
                {item.effort} effort
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
