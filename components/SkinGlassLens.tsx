"use client";

import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import "@/app/landing/landing.css";

const LENS_ZOOM = 3.4;

export type SkinGlassLensStop = {
  /** Lens top-left as fractions of the parent box */
  x: number;
  y: number;
  label: string;
  motion: "orbit" | "figure8" | "sweep" | "bob" | "zigzag";
};

const DEFAULT_DWELL_MS = 7000;
const DEFAULT_FADE_MS = 1200;
const DEFAULT_ENTER_DELAY_MS = 900;
const DEFAULT_GAP_MS = 1600;
/** Very slight drift while dwelling — almost still */
const PAN_RADIUS_X = 0.01;
const PAN_RADIUS_Y = 0.008;
const PAN_PERIOD_MS = 5500;

function offsetForMotion(
  motion: SkinGlassLensStop["motion"],
  t: number,
): { dx: number; dy: number } {
  const angle = t * Math.PI * 2;
  switch (motion) {
    case "orbit":
      return {
        dx: Math.cos(angle) * PAN_RADIUS_X,
        dy: Math.sin(angle) * PAN_RADIUS_Y,
      };
    case "sweep":
      return {
        dx: Math.sin(angle) * PAN_RADIUS_X * 1.15,
        dy: Math.sin(angle * 2) * PAN_RADIUS_Y * 0.4,
      };
    case "figure8":
      return {
        dx: Math.sin(angle) * PAN_RADIUS_X,
        dy: Math.sin(angle * 2) * PAN_RADIUS_Y * 0.75,
      };
    case "bob":
      return {
        dx: Math.sin(angle * 0.5) * PAN_RADIUS_X * 0.35,
        dy: Math.sin(angle) * PAN_RADIUS_Y,
      };
    case "zigzag":
      return {
        dx: Math.sin(angle) * PAN_RADIUS_X,
        dy: Math.cos(angle * 2) * PAN_RADIUS_Y * 0.8,
      };
  }
}

/** object-fit: cover + object-position mapping into a content box */
function coverLayout(
  mediaW: number,
  mediaH: number,
  boxW: number,
  boxH: number,
  posX: number,
  posY: number,
) {
  const scale = Math.max(boxW / mediaW, boxH / mediaH);
  const dw = mediaW * scale;
  const dh = mediaH * scale;
  const offsetX = (boxW - dw) * posX;
  const offsetY = (boxH - dh) * posY;
  return { scale, offsetX, offsetY };
}

function parseObjectPosition(value: string): { x: number; y: number } {
  const parts = value.trim().split(/\s+/);
  const read = (part: string | undefined, fallback: number) => {
    if (!part) return fallback;
    if (part.endsWith("%")) return Number.parseFloat(part) / 100;
    return fallback;
  };
  return { x: read(parts[0], 0.5), y: read(parts[1], 0.5) };
}

type SkinGlassLensProps = {
  active: boolean;
  /** Still image under the magnifier (MainHero) */
  imageSrc?: string;
  /**
   * When set with syncVideoRef, zoom is painted from the hero video via canvas
   * (no extra video decoder).
   */
  useVideoZoom?: boolean;
  /** Keep the zoom canvas locked to this element's frames */
  syncVideoRef?: RefObject<HTMLVideoElement | null>;
  /** Multi-stop cycle (MainHero) */
  stops?: readonly SkinGlassLensStop[];
  /** Single stop (LandingHero batches) — preferred over ephemeral `[lens]` arrays */
  stop?: SkinGlassLensStop;
  objectPosition?: string;
  className?: string;
  /** Delay before the first appearance */
  enterDelayMs?: number;
  /** How long the lens stays visible at each stop */
  dwellMs?: number;
  /** Fade out duration */
  fadeMs?: number;
  /** Pause after fade-out before the next appearance (per-lens loop) */
  gapMs?: number;
  /** When false, play once then stay hidden (batch orchestration) */
  loop?: boolean;
  /** Stay visible after enter until unmounted (video-synced batches) */
  persist?: boolean;
  /** Start visible, then fade out (outgoing batch during video crossfade) */
  exiting?: boolean;
  /**
   * Lightweight mode for many concurrent lenses: pan every frame, throttled canvas paint.
   */
  lite?: boolean;
};

export function SkinGlassLens({
  active,
  imageSrc,
  useVideoZoom = false,
  syncVideoRef,
  stops: stopsProp,
  stop,
  objectPosition = "50% 50%",
  className = "",
  enterDelayMs = DEFAULT_ENTER_DELAY_MS,
  dwellMs = DEFAULT_DWELL_MS,
  fadeMs = DEFAULT_FADE_MS,
  gapMs = DEFAULT_GAP_MS,
  loop = true,
  persist = false,
  exiting = false,
  lite = false,
}: SkinGlassLensProps) {
  const stops = stopsProp ?? (stop ? [stop] : []);
  const stopKey = stops.map((s) => `${s.label}:${s.x}:${s.y}:${s.motion}`).join("|");
  const lensRef = useRef<HTMLDivElement>(null);
  const zoomImgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const syncVideoRefStable = useRef(syncVideoRef);
  syncVideoRefStable.current = syncVideoRef;
  const stopsRef = useRef(stops);
  stopsRef.current = stops;
  const posRef = useRef({ x: stops[0]?.x ?? 0, y: stops[0]?.y ?? 0 });
  const objectPos = parseObjectPosition(objectPosition);
  const [ready, setReady] = useState(false);
  const [label, setLabel] = useState(stops[0]?.label ?? "");
  const [visible, setVisible] = useState(exiting);

  useEffect(() => {
    if (!active || stops.length === 0) return;
    if (exiting) {
      setReady(true);
      return;
    }
    const id = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(id);
  }, [active, stops.length, exiting]);

  useEffect(() => {
    if (!ready || stops.length === 0) return;

    const lens = lensRef.current;
    const parent = lens?.parentElement;
    const img = zoomImgRef.current;
    const canvas = canvasRef.current;
    if (!lens || !parent) return;
    if (useVideoZoom && !canvas) return;
    if (!useVideoZoom && !img) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let fadeTimer = 0;
    let dwellTimer = 0;
    let raf = 0;
    let stopIndex = 0;
    const ctx = canvas?.getContext("2d", { alpha: false }) ?? null;

    const paintCanvas = () => {
      if (!canvas || !ctx) return;
      const source = syncVideoRefStable.current?.current;
      if (!source || source.readyState < 2) return;

      const pw = parent.clientWidth;
      const ph = parent.clientHeight;
      const size = lens.offsetWidth;
      if (size < 2 || pw < 2 || ph < 2) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const pixel = Math.max(1, Math.round(size * dpr));
      if (canvas.width !== pixel || canvas.height !== pixel) {
        canvas.width = pixel;
        canvas.height = pixel;
      }

      const { scale, offsetX, offsetY } = coverLayout(
        source.videoWidth || source.clientWidth,
        source.videoHeight || source.clientHeight,
        pw,
        ph,
        objectPos.x,
        objectPos.y,
      );

      const { x: xFrac, y: yFrac } = posRef.current;
      const cx = xFrac * pw + size / 2;
      const cy = yFrac * ph + size / 2;
      const view = size / LENS_ZOOM;
      const left = cx - view / 2;
      const top = cy - view / 2;

      const sx = (left - offsetX) / scale;
      const sy = (top - offsetY) / scale;
      const sw = view / scale;
      const sh = view / scale;

      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, pixel, pixel);
      try {
        ctx.drawImage(source, sx, sy, sw, sh, 0, 0, pixel, pixel);
      } catch {
        /* video frame not ready */
      }
    };

    const moveLens = (xFrac: number, yFrac: number) => {
      posRef.current = { x: xFrac, y: yFrac };
      const pw = parent.clientWidth;
      const ph = parent.clientHeight;
      const size = lens.offsetWidth;
      const left = xFrac * pw;
      const top = yFrac * ph;

      lens.style.left = `${left}px`;
      lens.style.top = `${top}px`;

      if (img) {
        const cx = left + size / 2;
        const cy = top + size / 2;
        img.style.width = `${pw * LENS_ZOOM}px`;
        img.style.height = `${ph * LENS_ZOOM}px`;
        img.style.left = `${size / 2 - cx * LENS_ZOOM}px`;
        img.style.top = `${size / 2 - cy * LENS_ZOOM}px`;
      }
    };

    const placeAt = (xFrac: number, yFrac: number) => {
      moveLens(xFrac, yFrac);
      if (useVideoZoom) paintCanvas();
    };

    const stopPan = () => {
      if (raf) {
        window.cancelAnimationFrame(raf);
        window.clearTimeout(raf);
        raf = 0;
      }
    };

    const startPan = (stop: SkinGlassLensStop) => {
      stopPan();
      placeAt(stop.x, stop.y);
      if (reduced) return;

      const origin = performance.now();
      let lastPaint = 0;
      // Lite: pan every frame, paint canvas ~12fps to stay cheap
      const paintEveryMs = lite ? 80 : 0;

      const tick = (now: number) => {
        if (cancelled) return;
        const t = ((now - origin) % PAN_PERIOD_MS) / PAN_PERIOD_MS;
        const { dx, dy } = offsetForMotion(stop.motion, t);
        if (paintEveryMs > 0) {
          moveLens(stop.x + dx, stop.y + dy);
          if (now - lastPaint >= paintEveryMs) {
            paintCanvas();
            lastPaint = now;
          }
        } else {
          placeAt(stop.x + dx, stop.y + dy);
        }
        raf = window.requestAnimationFrame(tick);
      };
      raf = window.requestAnimationFrame(tick);
    };

    const showStop = (index: number) => {
      if (cancelled) return;
      const list = stopsRef.current;
      const current = list[index];
      if (!current) return;
      placeAt(current.x, current.y);
      setLabel(current.label);
      setVisible(true);
      startPan(current);

      if (reduced) return;
      if (persist) return;

      dwellTimer = window.setTimeout(() => {
        if (cancelled) return;
        stopPan();
        placeAt(current.x, current.y);
        setVisible(false);
        fadeTimer = window.setTimeout(() => {
          if (cancelled) return;
          if (!loop) return;

          if (list.length === 1) {
            fadeTimer = window.setTimeout(() => {
              if (cancelled) return;
              showStop(0);
            }, gapMs);
          } else {
            stopIndex = (index + 1) % list.length;
            const pause = index === list.length - 1 ? gapMs : 0;
            if (pause > 0) {
              fadeTimer = window.setTimeout(() => {
                if (cancelled) return;
                showStop(stopIndex);
              }, pause);
            } else {
              showStop(stopIndex);
            }
          }
        }, fadeMs);
      }, dwellMs);
    };

    const first = stopsRef.current[0];
    if (!first) return;
    placeAt(first.x, first.y);
    setLabel(first.label);

    if (exiting) {
      setVisible(true);
      placeAt(first.x, first.y);
      fadeTimer = window.setTimeout(() => {
        if (cancelled) return;
        setVisible(false);
      }, 40);
    } else {
      fadeTimer = window.setTimeout(() => showStop(0), enterDelayMs);
    }

    const onResize = () => {
      const list = stopsRef.current;
      const current = list[stopIndex] ?? list[0];
      if (current) placeAt(current.x, current.y);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      stopPan();
      window.clearTimeout(fadeTimer);
      window.clearTimeout(dwellTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [
    ready,
    stopKey,
    enterDelayMs,
    dwellMs,
    fadeMs,
    gapMs,
    loop,
    persist,
    exiting,
    useVideoZoom,
    lite,
    objectPos.x,
    objectPos.y,
  ]);

  if (stops.length === 0) return null;

  const transitionMs = `${fadeMs}ms`;

  return (
    <div
      ref={lensRef}
      className={`skin-glass-lens pointer-events-none absolute z-20 ${
        active && visible ? "is-active" : ""
      } ${className}`.trim()}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: `${transitionMs}, ${transitionMs}`,
        transitionTimingFunction:
          "cubic-bezier(0.22, 1, 0.36, 1), cubic-bezier(0.22, 1, 0.36, 1)",
        opacity: active && visible ? 1 : 0,
      }}
      aria-hidden
    >
      <div className="skin-glass-lens__ring">
        <div className="skin-glass-lens__zoom">
          {useVideoZoom ? (
            <canvas
              ref={canvasRef}
              className="skin-glass-lens__zoom-canvas"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={zoomImgRef}
              src={imageSrc}
              alt=""
              className="skin-glass-lens__zoom-img"
              style={{ objectPosition }}
              draggable={false}
            />
          )}
        </div>
        <span className="skin-glass-lens__glare" />
      </div>
      <span className="skin-glass-lens__label">{label}</span>
    </div>
  );
}
