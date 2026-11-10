const GOOD_EXAMPLES = [
  { src: "/upload/examples/good-1.png", alt: "Clear close-up portrait" },
  { src: "/upload/examples/good-2.png", alt: "Well-lit face at a slight angle" },
  { src: "/upload/examples/good-3.png", alt: "Neutral expression close-up" },
  { src: "/upload/examples/good-4.png", alt: "Face filling the frame" },
] as const;

const BAD_EXAMPLES = [
  { src: "/upload/examples/bad-group.png", alt: "Group photo with multiple faces" },
  { src: "/upload/examples/bad-covered.png", alt: "Face covered by sunglasses" },
  { src: "/upload/examples/bad-distant.png", alt: "Tiny distant face (hard to match)" },
] as const;

export function PhotoExamplesGuide() {
  return (
    <div className="upload-photo-guide" aria-label="Photo selection guidance">
      <GuideRow
        tone="good"
        title="Good for basic match"
        description="Clear face or upper-body shots facing the camera — eyes and jawline visible."
        images={GOOD_EXAMPLES}
      />
      <div className="upload-photo-guide-row upload-photo-guide-row--good">
        <div className="upload-photo-guide-heading">
          <span className="upload-photo-guide-icon" aria-hidden>
            <svg viewBox="0 0 20 20" fill="none">
              <path
                d="M5 10.5l3.2 3.2L15 6.8"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="upload-photo-guide-title">Full profile set</p>
            <p className="upload-photo-guide-desc">
              For the gated full appearance profile: 2 head-to-toe full-body
              photos plus 2 half-body / upper-body photos. Keep posture natural
              and the whole silhouette readable.
            </p>
          </div>
        </div>
      </div>
      <GuideRow
        tone="bad"
        title="Harder to match"
        description="Groups, covered faces, heavy filters, or tiny distant faces."
        images={BAD_EXAMPLES}
      />
    </div>
  );
}

function GuideRow({
  tone,
  title,
  description,
  images,
}: {
  tone: "good" | "bad";
  title: string;
  description: string;
  images: readonly { src: string; alt: string }[];
}) {
  return (
    <div className={`upload-photo-guide-row upload-photo-guide-row--${tone}`}>
      <div className="upload-photo-guide-heading">
        <span className="upload-photo-guide-icon" aria-hidden>
          {tone === "good" ? (
            <svg viewBox="0 0 20 20" fill="none">
              <path
                d="M5 10.5l3.2 3.2L15 6.8"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="none">
              <path
                d="M6.5 6.5l7 7M13.5 6.5l-7 7"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>
        <div className="min-w-0">
          <p className="upload-photo-guide-title">{title}</p>
          <p className="upload-photo-guide-desc">{description}</p>
        </div>
      </div>

      <div className="upload-photo-guide-scroller" role="list">
        {images.map((img) => (
          <div key={img.src} className="upload-photo-guide-thumb" role="listitem">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
