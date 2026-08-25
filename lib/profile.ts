/**
 * User lifestyle / demographics — styling context only (mirrors backend).
 * Never collect ethnicity/race.
 */

export const AGE_BANDS = ["18-24", "25-34", "35-44", "45-54", "55+"] as const;
export type AgeBand = (typeof AGE_BANDS)[number];

export const PRESENTATIONS = [
  "masculine",
  "feminine",
  "androgynous",
  "prefer_not",
] as const;
export type Presentation = (typeof PRESENTATIONS)[number];

export const WORK_SETTINGS = [
  "office",
  "remote",
  "creative",
  "trades",
  "student",
  "other",
] as const;
export type WorkSetting = (typeof WORK_SETTINGS)[number];

export const ACTIVITY_LEVELS = ["low", "moderate", "high"] as const;
export type ActivityLevel = (typeof ACTIVITY_LEVELS)[number];

export const CLIMATES = ["cool", "temperate", "warm", "varied"] as const;
export type Climate = (typeof CLIMATES)[number];

export const DRESS_CODES = [
  "casual",
  "smart_casual",
  "business",
  "uniform",
  "mixed",
] as const;
export type DressCode = (typeof DRESS_CODES)[number];

export const BUDGET_BANDS = ["low", "mid", "flexible"] as const;
export type BudgetBand = (typeof BUDGET_BANDS)[number];

export interface LifestyleProfile {
  workSetting: WorkSetting;
  activity: ActivityLevel;
  climate: Climate;
  dressCode: DressCode;
  budgetBand: BudgetBand;
}

export interface UserProfile {
  ageBand: AgeBand;
  presentation: Presentation;
  lifestyle: LifestyleProfile;
  updatedAt: string;
}

export const AGE_BAND_LABELS: Record<AgeBand, string> = {
  "18-24": "18–24",
  "25-34": "25–34",
  "35-44": "35–44",
  "45-54": "45–54",
  "55+": "55+",
};

export const PRESENTATION_LABELS: Record<Presentation, string> = {
  masculine: "Masculine",
  feminine: "Feminine",
  androgynous: "Androgynous",
  prefer_not: "Prefer not to say",
};

export const WORK_SETTING_LABELS: Record<WorkSetting, string> = {
  office: "Office",
  remote: "Remote",
  creative: "Creative",
  trades: "Trades / on-site",
  student: "Student",
  other: "Other",
};

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  low: "Low",
  moderate: "Moderate",
  high: "High",
};

export const CLIMATE_LABELS: Record<Climate, string> = {
  cool: "Cool",
  temperate: "Temperate",
  warm: "Warm",
  varied: "Varied",
};

export const DRESS_CODE_LABELS: Record<DressCode, string> = {
  casual: "Casual",
  smart_casual: "Smart casual",
  business: "Business",
  uniform: "Uniform",
  mixed: "Mixed",
};

export const BUDGET_LABELS: Record<BudgetBand, string> = {
  low: "Budget-conscious",
  mid: "Mid-range",
  flexible: "Flexible",
};

export function emptyProfileDraft(): Omit<UserProfile, "updatedAt"> {
  return {
    ageBand: "25-34",
    presentation: "prefer_not",
    lifestyle: {
      workSetting: "office",
      activity: "moderate",
      climate: "temperate",
      dressCode: "smart_casual",
      budgetBand: "mid",
    },
  };
}
