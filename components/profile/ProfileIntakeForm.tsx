"use client";

import { useState } from "react";
import { saveProfile, type AuthUser } from "@/lib/auth";
import {
  ACTIVITY_LABELS,
  ACTIVITY_LEVELS,
  AGE_BAND_LABELS,
  AGE_BANDS,
  BUDGET_BANDS,
  BUDGET_LABELS,
  CLIMATE_LABELS,
  CLIMATES,
  DRESS_CODE_LABELS,
  DRESS_CODES,
  emptyProfileDraft,
  PRESENTATION_LABELS,
  PRESENTATIONS,
  WORK_SETTING_LABELS,
  WORK_SETTINGS,
  type ActivityLevel,
  type AgeBand,
  type BudgetBand,
  type Climate,
  type DressCode,
  type Presentation,
  type UserProfile,
  type WorkSetting,
} from "@/lib/profile";

function SelectField<T extends string>({
  label,
  value,
  options,
  labels,
  onChange,
  dark,
}: {
  label: string;
  value: T;
  options: readonly T[];
  labels: Record<T, string>;
  onChange: (v: T) => void;
  dark?: boolean;
}) {
  return (
    <label className="block space-y-1.5">
      <span
        className={`text-xs font-medium uppercase tracking-[0.14em] ${
          dark ? "text-white/45" : "text-neutral-500"
        }`}
      >
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className={
          dark
            ? "w-full rounded-xl border border-white/15 bg-[#12141a] px-3 py-2.5 text-sm text-white outline-none focus:border-white/35"
            : "w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none focus:border-neutral-400"
        }
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {labels[opt]}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ProfileIntakeForm({
  initial,
  onSaved,
  compact = false,
  tone = "light",
}: {
  initial?: UserProfile | null;
  onSaved: (user: AuthUser, profile: UserProfile) => void;
  compact?: boolean;
  /** Use on dark shells so text stays readable (no white-on-white inherit). */
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const draftBase = initial
    ? {
        ageBand: initial.ageBand,
        presentation: initial.presentation,
        lifestyle: { ...initial.lifestyle },
      }
    : emptyProfileDraft();

  const [ageBand, setAgeBand] = useState<AgeBand>(draftBase.ageBand);
  const [presentation, setPresentation] = useState<Presentation>(
    draftBase.presentation,
  );
  const [workSetting, setWorkSetting] = useState<WorkSetting>(
    draftBase.lifestyle.workSetting,
  );
  const [activity, setActivity] = useState<ActivityLevel>(
    draftBase.lifestyle.activity,
  );
  const [climate, setClimate] = useState<Climate>(draftBase.lifestyle.climate);
  const [dressCode, setDressCode] = useState<DressCode>(
    draftBase.lifestyle.dressCode,
  );
  const [budgetBand, setBudgetBand] = useState<BudgetBand>(
    draftBase.lifestyle.budgetBand,
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const result = await saveProfile({
        ageBand,
        presentation,
        lifestyle: {
          workSetting,
          activity,
          climate,
          dressCode,
          budgetBand,
        },
      });
      setDone(true);
      onSaved(result.user, result.profile);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save profile.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className={`space-y-4 rounded-2xl border ${
        dark
          ? "border-white/12 bg-[#1e2128] text-white"
          : "border-neutral-200 bg-white text-neutral-900"
      } ${compact ? "p-4" : "p-5 sm:p-6"}`}
    >
      <div>
        <p
          className={`text-xs uppercase tracking-[0.16em] ${
            dark ? "text-white/45" : "text-neutral-500"
          }`}
        >
          Lifestyle profile
        </p>
        <h3
          className={`mt-1 text-lg font-semibold tracking-tight ${
            dark ? "text-white" : "text-neutral-950"
          }`}
        >
          How you live & dress
        </h3>
        <p className={`mt-1 text-sm ${dark ? "text-white/50" : "text-neutral-500"}`}>
          Used for styling context and outfit stills — never for ethnicity-based
          scoring.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <SelectField
          label="Age band"
          value={ageBand}
          options={AGE_BANDS}
          labels={AGE_BAND_LABELS}
          onChange={setAgeBand}
          dark={dark}
        />
        <SelectField
          label="Presentation"
          value={presentation}
          options={PRESENTATIONS}
          labels={PRESENTATION_LABELS}
          onChange={setPresentation}
          dark={dark}
        />
        <SelectField
          label="Work setting"
          value={workSetting}
          options={WORK_SETTINGS}
          labels={WORK_SETTING_LABELS}
          onChange={setWorkSetting}
          dark={dark}
        />
        <SelectField
          label="Activity"
          value={activity}
          options={ACTIVITY_LEVELS}
          labels={ACTIVITY_LABELS}
          onChange={setActivity}
          dark={dark}
        />
        <SelectField
          label="Climate"
          value={climate}
          options={CLIMATES}
          labels={CLIMATE_LABELS}
          onChange={setClimate}
          dark={dark}
        />
        <SelectField
          label="Dress code"
          value={dressCode}
          options={DRESS_CODES}
          labels={DRESS_CODE_LABELS}
          onChange={setDressCode}
          dark={dark}
        />
        <SelectField
          label="Budget"
          value={budgetBand}
          options={BUDGET_BANDS}
          labels={BUDGET_LABELS}
          onChange={setBudgetBand}
          dark={dark}
        />
      </div>

      {error ? (
        <p
          className={`text-sm ${dark ? "text-rose-300" : "text-red-600"}`}
          role="alert"
        >
          {error}
        </p>
      ) : null}
      {done ? (
        <p
          className={`text-sm ${dark ? "text-emerald-300" : "text-emerald-700"}`}
        >
          Profile saved.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className={`cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium transition disabled:opacity-60 ${
          dark
            ? "bg-white text-neutral-950 hover:bg-white/90"
            : "bg-neutral-950 text-white hover:bg-neutral-800"
        }`}
      >
        {busy ? "Saving…" : initial ? "Update profile" : "Save profile"}
      </button>
    </form>
  );
}
