/** Accurate data-handling statement — matches current product behavior. */

export function PrivacyDataStatement({
  tone = "light",
  compact = false,
}: {
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  const muted = tone === "dark" ? "text-white/55" : "text-neutral-500";
  const strong = tone === "dark" ? "text-white/85" : "text-neutral-800";
  const border =
    tone === "dark" ? "border-white/10 bg-white/5" : "border-neutral-200 bg-white";

  return (
    <aside
      className={`rounded-2xl border px-4 py-3 text-sm leading-relaxed ${border} ${muted}`}
    >
      <p className={`font-medium ${strong}`}>How we handle your photos</p>
      <ul className={`mt-2 list-disc space-y-1.5 pl-4 ${compact ? "" : ""}`}>
        <li>
          We do <span className={strong}>not</span> use your photos to train AI
          models unless you separately opt in on the consent screen (off by
          default).
        </li>
        <li>
          Extra upload photos are deleted after analysis by default. We keep a{" "}
          <span className={strong}>portrait copy for your report display</span>{" "}
          so scores stay tied to the face you measured. Opt in to retain sources
          only if you want paid tracking comparisons.
        </li>
        <li>
          If you upload a <span className={strong}>reference look</span> photo,
          we retain it to run the toward-your-look comparison and outfit stills
          until you delete the linked report.
        </li>
        <li>
          Outfit stills are generative previews (fal.ai). They are not medical
          advice and are capped (1 free / more on Pro).
        </li>
        <li>
          We do <span className={strong}>not</span> sell or share your photos
          with third parties for advertising. Stripe processes payment details;
          we do not store card numbers.
        </li>
        <li>
          You can delete a linked report (and its stored files) from your
          account at any time.
        </li>
      </ul>
    </aside>
  );
}
