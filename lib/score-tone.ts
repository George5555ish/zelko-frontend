/** Shared score → color mapping for report dots / scatter. */
export function scoreToneClass(score: number, unlocked: boolean): string {
  if (!unlocked) return "bg-white/40";
  // Highest → light green; medium → blue; weakest → amber/orange
  if (score >= 75) return "bg-emerald-300";
  if (score >= 60) return "bg-sky-400";
  return "bg-amber-400";
}

export function isFeatureMeasurable(measurable: boolean | undefined): boolean {
  return measurable !== false;
}
