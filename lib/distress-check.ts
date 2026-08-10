/**
 * STUB — lightweight distress-language check for optional upload free-text.
 *
 * TODO(replace): Swap this keyword/pattern stub for a more robust classifier
 * (or moderated LLM safety pass) before production. Keep the return shape stable
 * so call sites only need a boolean + optional matched pattern for logging.
 *
 * Intent: catch genuine emotional distress / hopelessness / harsh self-attack,
 * NOT ordinary feature requests like "I want clearer skin" or "fix my jawline".
 */

export interface DistressCheckResult {
  flagged: boolean;
  /** Debug-only — never show to the user or echo in UI copy. */
  matchedPattern?: string;
}

const DISTRESS_PATTERNS: { id: string; re: RegExp }[] = [
  {
    id: "hopelessness",
    re: /\b(want to die|kill myself|end (it|my life)|no reason to (live|go on)|better off dead)\b/i,
  },
  {
    id: "self_harm",
    re: /\b(self[- ]?harm|cut(ting)? myself|hurt myself)\b/i,
  },
  {
    id: "severe_self_attack",
    re: /\b(i('m| am) (worthless|disgusting|unlovable|a (monster|failure|freak))|hate (myself|my (face|body|life|existence)))\b/i,
  },
  {
    id: "despair",
    re: /\b(nothing will (ever )?help|i('ll| will) never (be|look) (ok|okay|good|enough)|give up on (myself|life))\b/i,
  },
  {
    id: "crisis_help_seek",
    re: /\b(can'?t (go|keep) (on|going)|don'?t want to (be here|exist)|everyone (hates|would be better without) me)\b/i,
  },
];

/**
 * Returns whether `text` should block beauty scoring / recommendation personalization.
 * Empty / null notes are never flagged.
 */
export function checkDistressLanguage(
  text: string | null | undefined,
): DistressCheckResult {
  if (!text?.trim()) return { flagged: false };

  const normalized = text.replace(/\s+/g, " ").trim();

  for (const { id, re } of DISTRESS_PATTERNS) {
    if (re.test(normalized)) {
      return { flagged: true, matchedPattern: id };
    }
  }

  return { flagged: false };
}
