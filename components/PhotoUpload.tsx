"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { extractFaceLandmarksFromFile, type LandmarkPoint } from "@/lib/mediapipe";
import type { UploadConsent } from "@/lib/consent";
import { checkDistressLanguage } from "@/lib/distress-check";
import { getAuthToken } from "@/lib/auth";
import {
  PRIORITY_FEATURE_OPTIONS,
  USER_NOTE_MAX_LENGTH,
  type PriorityFeatureKey,
} from "@/lib/personalization";
import {
  assessLandmarkQuality,
  pickBestPortraitSlot,
} from "@/lib/landmark-quality";
import { PhotoExamplesGuide } from "@/components/upload/PhotoExamplesGuide";
import { JourneyProgressBar } from "@/components/appearance/JourneyProgressBar";

export type UploadSlotStatus =
  | "idle"
  | "uploading"
  | "quality-check-pending"
  | "accepted"
  | "rejected";

export interface UploadSlot {
  id: string;
  file: File;
  previewUrl: string;
  status: UploadSlotStatus;
  fileId?: string;
  rejectReason?: string;
  landmarks?: LandmarkPoint[] | null;
  /** 0–100 MediaPipe mesh quality; used to pick the report portrait */
  landmarkScore?: number | null;
}

const MIN_PHOTOS = 3;
const MAX_PHOTOS = 5;

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} b`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} kb`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} mb`;
}

function fileKindLabel(file: File): "JPEG" | "JPG" | "PNG" | "WEBP" {
  const name = file.name.toLowerCase();
  if (name.endsWith(".jpg")) return "JPG";
  if (name.endsWith(".jpeg")) return "JPEG";
  if (name.endsWith(".png")) return "PNG";
  if (name.endsWith(".webp") || file.type === "image/webp") return "WEBP";
  if (file.type === "image/png") return "PNG";
  return "JPEG";
}

export function PhotoUpload({ consent }: { consent: UploadConsent }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [slots, setSlots] = useState<UploadSlot[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploadingBatch, setUploadingBatch] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [priorityFeatures, setPriorityFeatures] = useState<
    PriorityFeatureKey[]
  >([]);
  const [userNote, setUserNote] = useState("");
  const [supportMode, setSupportMode] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [approvalToast, setApprovalToast] = useState(false);
  const approvalShownRef = useRef(false);

  useEffect(() => {
    if (slots.length === 0) {
      setCarouselIndex(0);
      return;
    }
    setCarouselIndex((i) => Math.min(i, slots.length - 1));
  }, [slots.length]);

  const allApproved =
    slots.length >= MIN_PHOTOS &&
    slots.every((s) => s.status === "accepted") &&
    !uploadingBatch;

  useEffect(() => {
    if (!allApproved) {
      if (slots.some((s) => s.status !== "accepted")) {
        approvalShownRef.current = false;
        setApprovalToast(false);
      }
      return;
    }
    if (approvalShownRef.current) return;
    approvalShownRef.current = true;
    setApprovalToast(true);
    const hide = window.setTimeout(() => setApprovalToast(false), 6500);
    return () => window.clearTimeout(hide);
  }, [allApproved, slots]);

  const updateSlot = useCallback((id: string, patch: Partial<UploadSlot>) => {
    setSlots((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }, []);

  const togglePriority = useCallback((key: PriorityFeatureKey) => {
    setPriorityFeatures((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  }, []);

  const processFile = useCallback(
    async (slot: UploadSlot) => {
      updateSlot(slot.id, { status: "quality-check-pending" });

      try {
        let landmarks: LandmarkPoint[] | null = null;
        let landmarkScore: number | null = null;
        let fileForUpload = slot.file;
        try {
          const extracted = await extractFaceLandmarksFromFile(slot.file);
          landmarks = extracted.landmarks;
          const quality = assessLandmarkQuality(landmarks);
          landmarkScore = quality?.score ?? null;
          fileForUpload = extracted.fileForUpload;
          if (extracted.previewUrl) {
            URL.revokeObjectURL(slot.previewUrl);
            updateSlot(slot.id, {
              file: fileForUpload,
              previewUrl: extracted.previewUrl,
            });
          }

          if (!quality?.usableForPortrait) {
            updateSlot(slot.id, {
              status: "rejected",
              rejectReason:
                quality?.rejectReason ??
                (landmarks
                  ? "Face mesh too weak — use a closer frontal photo with an eye, nose, and jawline visible."
                  : "No face detected in this photo — try a clearer frontal selfie (avoid heavy cutouts if possible)."),
              landmarks,
              landmarkScore,
            });
            return;
          }
        } catch (err) {
          console.warn("[MediaPipe] face mesh required for upload", err);
          updateSlot(slot.id, {
            status: "rejected",
            rejectReason:
              "Could not read face landmarks — try a clearer frontal selfie (JPG/PNG).",
            landmarks: null,
            landmarkScore: null,
          });
          return;
        }

        updateSlot(slot.id, {
          status: "uploading",
          landmarks,
          landmarkScore,
          file: fileForUpload,
        });

        const formData = new FormData();
        formData.append("file", fileForUpload);
        formData.append("retainForTracking", String(consent.retainForTracking));
        formData.append("allowTraining", String(consent.allowTraining));
        if (landmarks && landmarks.length >= 100) {
          formData.append("landmarks", JSON.stringify(landmarks));
        }

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const raw = await res.text();
        let data: {
          fileId?: string;
          error?: string;
          reasons?: string[];
        } = {};
        try {
          data = raw ? (JSON.parse(raw) as typeof data) : {};
        } catch {
          updateSlot(slot.id, {
            status: "rejected",
            rejectReason: `Upload failed (${res.status}). Try again.`,
            landmarks,
            landmarkScore,
          });
          return;
        }

        if (!res.ok || !data.fileId) {
          updateSlot(slot.id, {
            status: "rejected",
            rejectReason:
              data.error ||
              data.reasons?.[0] ||
              `Photo did not pass the quality gate (${res.status}).`,
            landmarks,
            landmarkScore,
          });
          return;
        }

        updateSlot(slot.id, {
          status: "accepted",
          fileId: data.fileId,
          landmarks,
          landmarkScore,
        });
      } catch (err) {
        updateSlot(slot.id, {
          status: "rejected",
          rejectReason:
            err instanceof Error ? err.message : "Unexpected upload error.",
        });
      }
    },
    [consent.allowTraining, consent.retainForTracking, updateSlot],
  );

  const addFiles = useCallback((fileList: FileList | null) => {
    if (!fileList?.length) return;
    setError(null);

    const incoming = Array.from(fileList).filter((f) =>
      ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(f.type),
    );

    setSlots((prev) => {
      const room = MAX_PHOTOS - prev.length;
      if (room <= 0) {
        setError(`Maximum ${MAX_PHOTOS} photos.`);
        return prev;
      }

      const toAdd = incoming.slice(0, room).map((file) => ({
        id: makeId(),
        file,
        previewUrl: URL.createObjectURL(file),
        status: "idle" as const,
      }));

      if (incoming.length > room) {
        setError(`Only ${room} more photo(s) allowed (max ${MAX_PHOTOS}).`);
      }

      return [...prev, ...toAdd];
    });
  }, []);

  const removeSlot = useCallback((id: string) => {
    setSlots((prev) => {
      const target = prev.find((s) => s.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((s) => s.id !== id);
    });
  }, []);

  const uploadPending = useCallback(async () => {
    const pending = slots.filter((s) => s.status === "idle");
    if (pending.length === 0) {
      setError("Add at least one image before uploading.");
      return;
    }

    setError(null);
    setUploadingBatch(true);
    try {
      for (const slot of pending) {
        await processFile(slot);
      }
    } finally {
      setUploadingBatch(false);
    }
  }, [processFile, slots]);

  const runAnalysis = useCallback(async () => {
    const accepted = slots.filter((s) => s.status === "accepted" && s.fileId);

    if (accepted.length < MIN_PHOTOS) {
      setError(`Need at least ${MIN_PHOTOS} accepted photos to analyze.`);
      return;
    }

    const portrait = pickBestPortraitSlot(accepted);
    const portraitQuality = assessLandmarkQuality(portrait?.landmarks);
    if (
      !portrait ||
      !portraitQuality?.usableForPortrait ||
      !portrait.landmarks ||
      portrait.landmarks.length < 400
    ) {
      setError(
        "Need at least one clear frontal face photo with a strong face mesh — add a closer, upright shot looking at the camera.",
      );
      return;
    }

    // Portrait first: analyze keeps fileIds[0] as the report face (and
    // deletes the rest when not retaining for tracking).
    const fileIds = [
      portrait.fileId as string,
      ...accepted
        .filter((s) => s.id !== portrait.id)
        .map((s) => s.fileId as string),
    ];

    const note = userNote.trim().slice(0, USER_NOTE_MAX_LENGTH);
    // Client-side distress stub — never feed flagged text into prioritization.
    // TODO(replace): same stub as backend; swap for a stronger check later.
    if (checkDistressLanguage(note).flagged) {
      setSupportMode(true);
      setError(null);
      return;
    }

    setError(null);
    setAnalyzing(true);
    try {
      const token = getAuthToken();
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          fileIds,
          retainForTracking: consent.retainForTracking,
          allowTraining: consent.allowTraining,
          priorityFeatures,
          userNote: note.length > 0 ? note : null,
          landmarks: portrait.landmarks,
          portraitFileId: portrait.fileId,
        }),
      });
      const raw = await res.text();
      let data: {
        report?: { id: string };
        supportRequired?: boolean;
        error?: string;
        nextEligibleAt?: string;
      } = {};
      try {
        data = raw ? (JSON.parse(raw) as typeof data) : {};
      } catch {
        setError(
          res.ok
            ? "Analysis returned an unexpected response."
            : `Analysis failed (${res.status}). Try again in a moment.`,
        );
        return;
      }

      if (res.status === 429) {
        setError(
          data.error ??
            "Re-analysis is limited to once per week. Try again after the cooldown.",
        );
        return;
      }

      if (data.supportRequired) {
        setSupportMode(true);
        return;
      }

      if (!res.ok || !data.report?.id) {
        setError(data.error ?? "Analysis failed.");
        return;
      }
      // Staged Appearance Index: reveal Stage 1 before prompting Stage 2.
      router.push(`/appearance/${data.report.id}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unexpected analysis error.",
      );
    } finally {
      setAnalyzing(false);
    }
  }, [
    consent.allowTraining,
    consent.retainForTracking,
    priorityFeatures,
    router,
    slots,
    userNote,
  ]);

  const acceptedCount = slots.filter((s) => s.status === "accepted").length;
  const canAddMore = slots.length < MAX_PHOTOS;
  const hasIdle = slots.some((s) => s.status === "idle");
  const acceptedSlots = slots.filter(
    (s) => s.status === "accepted" && s.fileId,
  );
  const bestPortrait = pickBestPortraitSlot(acceptedSlots);
  const hasPortraitMesh =
    Boolean(bestPortrait) &&
    (assessLandmarkQuality(bestPortrait?.landmarks)?.usableForPortrait ??
      false);
  const readyToAnalyze =
    acceptedCount >= MIN_PHOTOS && !hasIdle && hasPortraitMesh;

  if (supportMode) {
    return <SupportPauseCard />;
  }

  const activeSlot = slots[carouselIndex] ?? null;
  const checking = slots.some(
    (s) =>
      s.status === "quality-check-pending" || s.status === "uploading",
  );
  let uploadWithin = Math.min(0.88, acceptedCount / MIN_PHOTOS);
  if (analyzing) uploadWithin = 0.96;
  else if (checking) {
    uploadWithin = Math.max(
      uploadWithin * 0.7,
      Math.min(0.45, (slots.length / MIN_PHOTOS) * 0.4),
    );
  }
  const stagesLeft = 4; // face, prefs, style reveal, looks
  const uploadDetail = analyzing
    ? "Analyzing face mesh — Face & Grooming reveal is next"
    : acceptedCount >= MIN_PHOTOS
      ? `Ready to analyze · ${stagesLeft} stages after this`
      : acceptedCount === 0
        ? `Add ${MIN_PHOTOS}–${MAX_PHOTOS} photos · ${stagesLeft} stages after upload`
        : `${acceptedCount} of ${MIN_PHOTOS} accepted · ${Math.max(0, MIN_PHOTOS - acceptedCount)} more needed`;

  return (
    <div className="upload-glass px-3.5 py-3 text-left sm:px-4 sm:py-3.5">
      <JourneyProgressBar
        current="upload"
        withinStep={uploadWithin}
        detail={uploadDetail}
        variant="dark"
      />
      <div className="upload-layout">
        <div className="upload-layout-copy">
          <p className="upload-eyebrow">Appearance report</p>
          <h2 className="mt-1 font-[family-name:var(--font-cursive)] text-[1.65rem] leading-tight tracking-tight text-white sm:text-[1.85rem]">
            Place your portraits.
          </h2>
          <p className="mt-1 max-w-md text-[13px] leading-snug text-white/50">
            {MIN_PHOTOS}–{MAX_PHOTOS} clear face photos. Each needs a readable
            face mesh (eye, nose, jawline) so scores can be measured — not just
            accepted.
          </p>

          <div
            className={`upload-glass-inset mt-3 flex cursor-pointer items-center gap-3 px-3 py-2.5 transition ${
              dragging ? "ring-2 ring-white/30" : ""
            } ${!canAddMore ? "cursor-not-allowed opacity-55" : "hover:bg-white/8"}`}
            onClick={() => canAddMore && inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              if (canAddMore) setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              if (canAddMore) addFiles(e.dataTransfer.files);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (canAddMore) inputRef.current?.click();
              }
            }}
          >
            <FileStackGraphic />
            <div className="min-w-0">
              <p className="text-sm text-white/80">
                Drop portraits or{" "}
                <span className="font-semibold text-white underline underline-offset-2">
                  browse
                </span>
              </p>
              <p className="mt-0.5 text-xs text-white/40">
                JPG, PNG, WEBP
                {canAddMore
                  ? ` · ${MIN_PHOTOS}–${MAX_PHOTOS} photos`
                  : " · max reached"}
              </p>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              disabled={!canAddMore}
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </div>

          {error && (
            <p className="mt-3 rounded-xl border border-red-400/25 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </p>
          )}

          <PersonalizationFields
            priorityFeatures={priorityFeatures}
            onToggle={togglePriority}
            userNote={userNote}
            onNoteChange={setUserNote}
          />

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={uploadingBatch || !hasIdle}
              onClick={() => void uploadPending()}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
            >
              <UploadIcon />
              {uploadingBatch ? "Uploading…" : "Upload files"}
            </button>

            {readyToAnalyze ? (
              <button
                type="button"
                disabled={analyzing}
                onClick={() => void runAnalysis()}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
              >
                {analyzing ? "Generating…" : "Generate report"}
              </button>
            ) : null}
          </div>

          <p className="mt-2 text-xs text-white/40">
            {acceptedCount} of {MIN_PHOTOS}–{MAX_PHOTOS} accepted
            {consent.retainForTracking
              ? " · photos retained for tracking"
              : " · photos deleted after report"}
            {acceptedCount >= MIN_PHOTOS && !hasPortraitMesh
              ? " — need one clearer frontal face for the report"
              : readyToAnalyze
                ? " — ready for analysis"
                : ""}
          </p>
        </div>

        <div className="upload-layout-media">
          {slots.length > 0 && activeSlot ? (
            <div className="upload-carousel">
              <div className="upload-carousel-track upload-glass-inset relative overflow-hidden !p-0">
                {slots.map((slot, i) => (
                  <div
                    key={slot.id}
                    className={`upload-carousel-slide ${
                      i === carouselIndex ? "is-active" : ""
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={slot.previewUrl} alt="" />
                    <div className="upload-carousel-veil" />
                    <div className="upload-carousel-meta">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-white/55">
                        Frame {i + 1} of {slots.length} ·{" "}
                        {fileKindLabel(slot.file)}
                        {slot.id === bestPortrait?.id && hasPortraitMesh
                          ? " · Report face"
                          : ""}
                      </p>
                      <p className="mt-0.5 truncate text-sm font-semibold text-white">
                        {slot.file.name}
                      </p>
                      <p className="mt-0.5 text-xs text-white/65">
                        {formatBytes(slot.file.size)} ·{" "}
                        <StatusLabel
                          slot={slot}
                          isReportPortrait={
                            slot.id === bestPortrait?.id && hasPortraitMesh
                          }
                        />
                      </p>
                    </div>
                  </div>
                ))}

                {slots.length > 1 ? (
                  <>
                    <button
                      type="button"
                      className="upload-carousel-nav upload-carousel-nav--prev"
                      aria-label="Previous photo"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCarouselIndex(
                          (i) => (i - 1 + slots.length) % slots.length,
                        );
                      }}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className="upload-carousel-nav upload-carousel-nav--next"
                      aria-label="Next photo"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCarouselIndex((i) => (i + 1) % slots.length);
                      }}
                    >
                      ›
                    </button>
                  </>
                ) : null}
              </div>

              <div className="mt-2 flex items-center justify-between gap-3">
                {slots.length > 1 ? (
                  <div
                    className="upload-carousel-dots !mt-0"
                    role="tablist"
                    aria-label="Photos"
                  >
                    {slots.map((slot, i) => (
                      <button
                        key={slot.id}
                        type="button"
                        role="tab"
                        aria-selected={i === carouselIndex}
                        aria-label={`Show photo ${i + 1}`}
                        className={`upload-carousel-dot ${
                          i === carouselIndex ? "is-active" : ""
                        }`}
                        onClick={() => setCarouselIndex(i)}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-white/45">
                    {acceptedCount} accepted
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => removeSlot(activeSlot.id)}
                  className="rounded-full border border-white/20 bg-white/8 px-3 py-1.5 text-xs font-medium text-white/75 transition hover:bg-white/15 hover:text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div className="upload-media-empty upload-glass-inset flex h-full min-h-[16rem] flex-col items-center justify-center px-4 py-5 text-center sm:min-h-[22rem]">
              <p className="text-sm font-medium text-white/80">
                Preview appears here
              </p>
              <p className="mt-1 max-w-[14rem] text-xs leading-relaxed text-white/40">
                Add {MIN_PHOTOS}–{MAX_PHOTOS} portraits to review frames side by
                side with your upload controls.
              </p>
            </div>
          )}
        </div>
      </div>

      <PhotoExamplesGuide />

      <div
        className={`upload-toast ${approvalToast ? "is-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        <div className="upload-toast-card">
          <span className="upload-toast-dot" aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white">
              Approved — generate your report
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-white/50">
              All {acceptedCount} photos passed quality checks. You’re ready to
              continue.
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-full px-2 py-1 text-xs text-white/40 transition hover:text-white"
            aria-label="Dismiss"
            onClick={() => setApprovalToast(false)}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

function PersonalizationFields({
  priorityFeatures,
  onToggle,
  userNote,
  onNoteChange,
}: {
  priorityFeatures: PriorityFeatureKey[];
  onToggle: (key: PriorityFeatureKey) => void;
  userNote: string;
  onNoteChange: (value: string) => void;
}) {
  const remaining = USER_NOTE_MAX_LENGTH - userNote.length;

  return (
    <div className="upload-glass-inset mt-2.5 px-2.5 py-2.5">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="upload-eyebrow">Optional focus</p>
          <p className="mt-0.5 text-[13px] font-medium text-white">
            What are you most curious about?
          </p>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {PRIORITY_FEATURE_OPTIONS.map(({ key, label }) => {
          const selected = priorityFeatures.includes(key);
          return (
            <button
              key={key}
              type="button"
              aria-pressed={selected}
              onClick={() => onToggle(key)}
              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition ${
                selected
                  ? "border-white/50 bg-white text-neutral-950"
                  : "border-white/20 bg-white/5 text-white/65 hover:bg-white/10 hover:text-white"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <label className="mt-2 block">
        <span className="sr-only">Anything else you&apos;d like us to focus on?</span>
        <textarea
          value={userNote}
          onChange={(e) =>
            onNoteChange(e.target.value.slice(0, USER_NOTE_MAX_LENGTH))
          }
          rows={1}
          maxLength={USER_NOTE_MAX_LENGTH}
          placeholder="Anything else you'd like us to focus on?"
          className="w-full resize-none rounded-xl border border-white/15 bg-black/25 px-3 py-1.5 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/35 focus:ring-1 focus:ring-white/20"
        />
        <span className="mt-0.5 block text-right text-[10px] text-white/35">
          {remaining} left
        </span>
      </label>
    </div>
  );
}

function SupportPauseCard() {
  return (
    <div className="upload-glass px-5 py-6 text-center sm:px-7 sm:py-8">
      <p className="upload-eyebrow">Pause</p>
      <h2 className="mt-2 font-[family-name:var(--font-cursive)] text-2xl tracking-tight text-white sm:text-3xl">
        We&apos;re glad you reached out — let&apos;s take this gently.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55">
        Zelko is built for appearance feedback, not emotional support. If
        you&apos;re carrying something heavy right now, please talk with someone
        who can help. We won&apos;t run a beauty report for this session.
      </p>
      <ul className="mx-auto mt-5 max-w-sm space-y-2 text-left text-sm text-white/75">
        <li>
          <a
            href="https://www.iasp.info/suicidalthoughts/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-white underline-offset-2 hover:underline"
          >
            IASP — resources for suicidal thoughts
          </a>
        </li>
        <li>
          <a
            href="https://findahelpline.com/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-white underline-offset-2 hover:underline"
          >
            Find a Helpline — local support by country
          </a>
        </li>
      </ul>
      <p className="mt-5 text-xs leading-relaxed text-white/40">
        If you&apos;re in immediate danger, contact local emergency services.
      </p>
    </div>
  );
}

function StatusLabel({
  slot,
  isReportPortrait = false,
}: {
  slot: UploadSlot;
  isReportPortrait?: boolean;
}) {
  if (slot.status === "uploading") return "Uploading…";
  if (slot.status === "quality-check-pending") return "Quality check…";
  if (slot.status === "accepted") {
    const mesh =
      typeof slot.landmarkScore === "number"
        ? ` · mesh ${slot.landmarkScore}`
        : "";
    if (isReportPortrait) return `Accepted · report face${mesh}`;
    return `Accepted${mesh}`;
  }
  if (slot.status === "rejected") {
    return slot.rejectReason ? `Rejected — ${slot.rejectReason}` : "Rejected";
  }
  return null;
}

function UploadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path
        d="M12 16V4m0 0l-4 4m4-4l4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" />
    </svg>
  );
}

function FileStackGraphic() {
  const labels = ["JPEG", "JPG", "PNG"] as const;
  return (
    <div className="relative h-12 w-[4.5rem] shrink-0" aria-hidden>
      {labels.map((label, i) => (
        <div
          key={label}
          className="absolute top-0 h-12 w-9 overflow-hidden rounded-md border border-white/25 bg-[#2a2e36] shadow-md"
          style={{
            left: `${i * 14}px`,
            transform: `rotate(${(i - 1) * 8}deg)`,
            zIndex: i + 1,
          }}
        >
          <div className="bg-white/15 px-0.5 py-0.5 text-center text-[6px] font-bold tracking-wide text-white/80">
            {label}
          </div>
          <div className="flex h-[calc(100%-14px)] items-center justify-center bg-[#1c1f25]">
            <svg
              viewBox="0 0 24 24"
              className="size-4 text-white/35"
              fill="currentColor"
            >
              <path d="M5 5h14a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1zm2 10l3-4 2 2.5L15 9l4 6H7z" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
