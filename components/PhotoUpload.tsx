"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { extractFaceLandmarksFromFile, type LandmarkPoint } from "@/lib/mediapipe";
import type { UploadConsent } from "@/lib/consent";
import { checkDistressLanguage } from "@/lib/distress-check";
import {
  PRIORITY_FEATURE_OPTIONS,
  USER_NOTE_MAX_LENGTH,
  type PriorityFeatureKey,
} from "@/lib/personalization";

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
}

const MIN_PHOTOS = 3;
const MAX_PHOTOS = 5;

async function stubQualityCheck(_file: File): Promise<
  { accepted: true } | { accepted: false; reason: string }
> {
  void _file;
  await new Promise((r) => setTimeout(r, 400));
  return { accepted: true };
}

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
      updateSlot(slot.id, { status: "uploading" });

      try {
        const formData = new FormData();
        formData.append("file", slot.file);
        formData.append("retainForTracking", String(consent.retainForTracking));
        formData.append("allowTraining", String(consent.allowTraining));

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = (await res.json()) as { fileId?: string; error?: string };

        if (!res.ok || !data.fileId) {
          updateSlot(slot.id, {
            status: "rejected",
            rejectReason: data.error ?? "Upload failed.",
          });
          return;
        }

        updateSlot(slot.id, {
          status: "quality-check-pending",
          fileId: data.fileId,
        });

        let landmarks: LandmarkPoint[] | null = null;
        try {
          landmarks = await extractFaceLandmarksFromFile(slot.file);
        } catch (err) {
          console.error("[MediaPipe] landmark extraction failed:", err);
        }

        const quality = await stubQualityCheck(slot.file);

        if (quality.accepted) {
          updateSlot(slot.id, { status: "accepted", landmarks });
        } else {
          updateSlot(slot.id, {
            status: "rejected",
            rejectReason: quality.reason,
            landmarks,
          });
        }
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
    const fileIds = accepted.map((s) => s.fileId as string);

    if (fileIds.length < MIN_PHOTOS) {
      setError(`Need at least ${MIN_PHOTOS} accepted photos to analyze.`);
      return;
    }

    const note = userNote.trim().slice(0, USER_NOTE_MAX_LENGTH);
    // Client-side distress stub — never feed flagged text into prioritization.
    // TODO(replace): same stub as backend; swap for a stronger check later.
    if (checkDistressLanguage(note).flagged) {
      setSupportMode(true);
      setError(null);
      return;
    }

    // Portrait landmarks = first accepted photo (same as portraitFileId).
    const portraitLandmarks = accepted[0]?.landmarks ?? null;

    setError(null);
    setAnalyzing(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileIds,
          retainForTracking: consent.retainForTracking,
          allowTraining: consent.allowTraining,
          priorityFeatures,
          userNote: note.length > 0 ? note : null,
          landmarks: portraitLandmarks,
        }),
      });
      const data = (await res.json()) as {
        report?: { id: string };
        supportRequired?: boolean;
        error?: string;
      };

      if (data.supportRequired) {
        setSupportMode(true);
        return;
      }

      if (!res.ok || !data.report?.id) {
        setError(data.error ?? "Analysis failed.");
        return;
      }
      // Generic navigation only — never echo userNote in confirmation copy.
      router.push(`/report/${data.report.id}`);
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
  const readyToAnalyze = acceptedCount >= MIN_PHOTOS && !hasIdle;

  if (supportMode) {
    return <SupportPauseCard />;
  }

  return (
    <div className="rounded-3xl border border-neutral-200/70 bg-white/75 p-4 shadow-[0_20px_60px_-40px_rgba(40,20,80,0.45)] backdrop-blur-md sm:p-5 md:p-6">
      <h2 className="text-lg font-semibold tracking-tight text-neutral-950 sm:text-xl">
        Upload Images
      </h2>

      <div
        className={`mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-5 py-8 transition ${
          dragging
            ? "border-[var(--accent)] bg-[var(--accent-soft)]/50"
            : "border-neutral-300 bg-white/80 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]/30"
        } ${!canAddMore ? "cursor-not-allowed opacity-60" : ""}`}
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
        <p className="mt-4 text-sm text-neutral-700">
          Drag and drop or{" "}
          <span className="font-semibold text-[var(--accent)] underline underline-offset-2">
            Browse computer
          </span>
        </p>
        <p className="mt-2 text-xs text-neutral-400">
          Allowed Formats: JPG, JPEG, PNG
          {canAddMore ? ` · ${MIN_PHOTOS}–${MAX_PHOTOS} photos` : " · max reached"}
        </p>
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
        <p className="mt-4 rounded-xl bg-[var(--danger-soft)] px-3 py-2 text-sm text-[var(--danger)]">
          {error}
        </p>
      )}

      {slots.length > 0 && (
        <div className="mt-5">
          <h3 className="text-sm font-semibold text-neutral-950">
            Selected files ({slots.length})
          </h3>
          <ul className="mt-3 space-y-2.5">
            {slots.map((slot) => (
              <li
                key={slot.id}
                className="flex items-center gap-3 rounded-2xl bg-[var(--accent-soft)]/55 px-3.5 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-neutral-950">
                    {slot.file.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {formatBytes(slot.file.size)}
                    {slot.status !== "idle" ? (
                      <>
                        {" · "}
                        <StatusLabel slot={slot} />
                      </>
                    ) : null}
                  </p>
                </div>
                <span className="hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)] sm:inline">
                  {fileKindLabel(slot.file)}
                </span>
                <button
                  type="button"
                  onClick={() => removeSlot(slot.id)}
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-red-500 transition hover:bg-white/70"
                  aria-label={`Remove ${slot.file.name}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <PersonalizationFields
        priorityFeatures={priorityFeatures}
        onToggle={togglePriority}
        userNote={userNote}
        onNoteChange={setUserNote}
      />

      <button
        type="button"
        disabled={uploadingBatch || !hasIdle}
        onClick={() => void uploadPending()}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <UploadIcon />
        {uploadingBatch ? "Uploading…" : "Upload Files"}
      </button>

      {readyToAnalyze && (
        <button
          type="button"
          disabled={analyzing}
          onClick={() => void runAnalysis()}
          className="mt-3 w-full rounded-2xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {analyzing ? "Generating report…" : "Generate free report"}
        </button>
      )}

      <p className="mt-3 text-center text-xs text-neutral-400">
        {acceptedCount} of {MIN_PHOTOS}–{MAX_PHOTOS} accepted
        {consent.retainForTracking
          ? " · photos retained for tracking"
          : " · photos deleted after report"}
        {readyToAnalyze ? " — ready for analysis" : ""}
      </p>
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
    <div className="mt-5 rounded-2xl border border-neutral-200/80 bg-[var(--hero-surface)]/50 px-3.5 py-3.5">
      <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">
        Optional focus
      </p>
      <p className="mt-1 text-sm font-medium text-neutral-900">
        What are you most curious about?
      </p>
      <p className="mt-1 text-[12px] leading-snug text-neutral-500">
        Tap any that matter — we&apos;ll prioritize those recommendations. Scores
        stay the same either way.
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {PRIORITY_FEATURE_OPTIONS.map(({ key, label }) => {
          const selected = priorityFeatures.includes(key);
          return (
            <button
              key={key}
              type="button"
              aria-pressed={selected}
              onClick={() => onToggle(key)}
              className={`rounded-full border px-3 py-1.5 text-[12px] font-medium transition ${
                selected
                  ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "border-neutral-200 bg-white/80 text-neutral-600 hover:border-neutral-300"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <label className="mt-4 block">
        <span className="sr-only">Anything else you&apos;d like us to focus on?</span>
        <textarea
          value={userNote}
          onChange={(e) =>
            onNoteChange(e.target.value.slice(0, USER_NOTE_MAX_LENGTH))
          }
          rows={2}
          maxLength={USER_NOTE_MAX_LENGTH}
          placeholder="Anything else you'd like us to focus on?"
          className="w-full resize-none rounded-xl border border-neutral-200 bg-white/90 px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
        />
        <span className="mt-1 block text-right text-[11px] text-neutral-400">
          {remaining} left
        </span>
      </label>
    </div>
  );
}

function SupportPauseCard() {
  return (
    <div className="rounded-3xl border border-neutral-200/70 bg-white/90 p-5 shadow-[0_20px_60px_-40px_rgba(40,20,80,0.45)] backdrop-blur-md sm:p-6">
      <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">
        Pause
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-neutral-950">
        We&apos;re glad you reached out — let&apos;s take this gently.
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">
        Zelko is built for appearance feedback, not emotional support. If
        you&apos;re carrying something heavy right now, please talk with someone
        who can help. We won&apos;t run a beauty report for this session.
      </p>
      <ul className="mt-5 space-y-2 text-sm text-neutral-700">
        <li>
          <a
            href="https://www.iasp.info/suicidalthoughts/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
          >
            IASP — resources for suicidal thoughts
          </a>
        </li>
        <li>
          <a
            href="https://findahelpline.com/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
          >
            Find a Helpline — local support by country
          </a>
        </li>
      </ul>
      <p className="mt-5 text-xs leading-relaxed text-neutral-400">
        If you&apos;re in immediate danger, contact local emergency services.
      </p>
    </div>
  );
}

function StatusLabel({ slot }: { slot: UploadSlot }) {
  if (slot.status === "uploading") return "Uploading…";
  if (slot.status === "quality-check-pending") return "Quality check…";
  if (slot.status === "accepted") return "Accepted";
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
    <div className="relative h-16 w-24" aria-hidden>
      {labels.map((label, i) => (
        <div
          key={label}
          className="absolute top-0 h-16 w-12 overflow-hidden rounded-md border border-white bg-white shadow-md"
          style={{
            left: `${i * 18}px`,
            transform: `rotate(${(i - 1) * 8}deg)`,
            zIndex: i + 1,
          }}
        >
          <div className="bg-[var(--accent)] px-1 py-0.5 text-center text-[7px] font-bold tracking-wide text-white">
            {label}
          </div>
          <div className="flex h-[calc(100%-16px)] items-center justify-center bg-neutral-50">
            <svg
              viewBox="0 0 24 24"
              className="size-5 text-neutral-300"
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
