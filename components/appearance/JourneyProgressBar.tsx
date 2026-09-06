"use client";

import {
  JOURNEY_FLOW_STEPS,
  journeyProgressPercent,
  journeyStepIndex,
  type JourneyFlowStepId,
} from "@/lib/appearance-index";

type Props = {
  current: JourneyFlowStepId | "complete";
  /** 0–1 progress inside the current step (e.g. photos / min). */
  withinStep?: number;
  /** Optional status line under the bar */
  detail?: string;
  variant?: "light" | "paper" | "dark";
};

export function JourneyProgressBar({
  current,
  withinStep = 0,
  detail,
  variant = "light",
}: Props) {
  const total = JOURNEY_FLOW_STEPS.length;
  const index = journeyStepIndex(current);
  const percent = journeyProgressPercent(current, withinStep);
  const currentMeta =
    current === "complete"
      ? { label: "Profile complete", shortLabel: "Done" }
      : JOURNEY_FLOW_STEPS[index];
  const stepLabel = currentMeta?.label ?? "In progress";
  const stepsLeft =
    current === "complete" ? 0 : Math.max(0, total - index - (withinStep >= 1 ? 1 : 0));

  return (
    <div
      className={`journey-progress journey-progress--${variant}`}
      role="group"
      aria-label="Appearance Index progress"
    >
      <div className="journey-progress__top">
        <p className="journey-progress__label">
          {current === "complete" ? (
            <>All steps done</>
          ) : (
            <>
              Step {Math.min(index + 1, total)} of {total}
              <span className="journey-progress__sep" aria-hidden>
                ·
              </span>
              {stepLabel}
            </>
          )}
        </p>
        <p className="journey-progress__pct" aria-hidden>
          {percent}%
        </p>
      </div>

      <div
        className="journey-progress__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-valuetext={`${percent}% — ${stepLabel}`}
      >
        <div
          className="journey-progress__fill"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ol className="journey-progress__steps">
        {JOURNEY_FLOW_STEPS.map((step, i) => {
          const done =
            current === "complete" || i < index || (i === index && withinStep >= 1);
          const active = current !== "complete" && i === index;
          return (
            <li
              key={step.id}
              className={`journey-progress__step${done ? " is-done" : ""}${active ? " is-active" : ""}`}
            >
              <span className="journey-progress__dot" aria-hidden />
              <span className="journey-progress__step-label">
                {step.shortLabel}
              </span>
            </li>
          );
        })}
      </ol>

      {(detail || stepsLeft > 0) && current !== "complete" ? (
        <p className="journey-progress__detail">
          {detail ??
            (stepsLeft === 1
              ? "1 stage left after this"
              : `${stepsLeft} stages left after this`)}
        </p>
      ) : null}
    </div>
  );
}
