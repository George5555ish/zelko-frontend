module.exports = [
"[project]/components/SkinGlassLens.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SkinGlassLens",
    ()=>SkinGlassLens
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const LENS_ZOOM = 3.4;
const DEFAULT_DWELL_MS = 7000;
const DEFAULT_FADE_MS = 1200;
const DEFAULT_ENTER_DELAY_MS = 900;
const DEFAULT_GAP_MS = 1600;
/** Very slight drift while dwelling — almost still */ const PAN_RADIUS_X = 0.01;
const PAN_RADIUS_Y = 0.008;
const PAN_PERIOD_MS = 5500;
function offsetForMotion(motion, t) {
    const angle = t * Math.PI * 2;
    switch(motion){
        case "orbit":
            return {
                dx: Math.cos(angle) * PAN_RADIUS_X,
                dy: Math.sin(angle) * PAN_RADIUS_Y
            };
        case "sweep":
            return {
                dx: Math.sin(angle) * PAN_RADIUS_X * 1.15,
                dy: Math.sin(angle * 2) * PAN_RADIUS_Y * 0.4
            };
        case "figure8":
            return {
                dx: Math.sin(angle) * PAN_RADIUS_X,
                dy: Math.sin(angle * 2) * PAN_RADIUS_Y * 0.75
            };
        case "bob":
            return {
                dx: Math.sin(angle * 0.5) * PAN_RADIUS_X * 0.35,
                dy: Math.sin(angle) * PAN_RADIUS_Y
            };
        case "zigzag":
            return {
                dx: Math.sin(angle) * PAN_RADIUS_X,
                dy: Math.cos(angle * 2) * PAN_RADIUS_Y * 0.8
            };
    }
}
/** object-fit: cover + object-position mapping into a content box */ function coverLayout(mediaW, mediaH, boxW, boxH, posX, posY) {
    const scale = Math.max(boxW / mediaW, boxH / mediaH);
    const dw = mediaW * scale;
    const dh = mediaH * scale;
    const offsetX = (boxW - dw) * posX;
    const offsetY = (boxH - dh) * posY;
    return {
        scale,
        offsetX,
        offsetY
    };
}
function parseObjectPosition(value) {
    const parts = value.trim().split(/\s+/);
    const read = (part, fallback)=>{
        if (!part) return fallback;
        if (part.endsWith("%")) return Number.parseFloat(part) / 100;
        return fallback;
    };
    return {
        x: read(parts[0], 0.5),
        y: read(parts[1], 0.5)
    };
}
function SkinGlassLens({ active, imageSrc, useVideoZoom = false, syncVideoRef, stops: stopsProp, stop, objectPosition = "50% 50%", className = "", enterDelayMs = DEFAULT_ENTER_DELAY_MS, dwellMs = DEFAULT_DWELL_MS, fadeMs = DEFAULT_FADE_MS, gapMs = DEFAULT_GAP_MS, loop = true, persist = false, exiting = false, lite = false }) {
    const stops = stopsProp ?? (stop ? [
        stop
    ] : []);
    const stopKey = stops.map((s)=>`${s.label}:${s.x}:${s.y}:${s.motion}`).join("|");
    const lensRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const zoomImgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const syncVideoRefStable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(syncVideoRef);
    syncVideoRefStable.current = syncVideoRef;
    const stopsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(stops);
    stopsRef.current = stops;
    const posRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        x: stops[0]?.x ?? 0,
        y: stops[0]?.y ?? 0
    });
    const objectPos = parseObjectPosition(objectPosition);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [label, setLabel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(stops[0]?.label ?? "");
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(exiting);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!active || stops.length === 0) return;
        if (exiting) {
            setReady(true);
            return;
        }
        const id = window.setTimeout(()=>setReady(true), 80);
        return ()=>window.clearTimeout(id);
    }, [
        active,
        stops.length,
        exiting
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
        const ctx = canvas?.getContext("2d", {
            alpha: false
        }) ?? null;
        const paintCanvas = ()=>{
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
            const { scale, offsetX, offsetY } = coverLayout(source.videoWidth || source.clientWidth, source.videoHeight || source.clientHeight, pw, ph, objectPos.x, objectPos.y);
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
            } catch  {
            /* video frame not ready */ }
        };
        const moveLens = (xFrac, yFrac)=>{
            posRef.current = {
                x: xFrac,
                y: yFrac
            };
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
        const placeAt = (xFrac, yFrac)=>{
            moveLens(xFrac, yFrac);
            if (useVideoZoom) paintCanvas();
        };
        const stopPan = ()=>{
            if (raf) {
                window.cancelAnimationFrame(raf);
                window.clearTimeout(raf);
                raf = 0;
            }
        };
        const startPan = (stop)=>{
            stopPan();
            placeAt(stop.x, stop.y);
            if (reduced) return;
            const origin = performance.now();
            let lastPaint = 0;
            // Lite: pan every frame, paint canvas ~12fps to stay cheap
            const paintEveryMs = lite ? 80 : 0;
            const tick = (now)=>{
                if (cancelled) return;
                const t = (now - origin) % PAN_PERIOD_MS / PAN_PERIOD_MS;
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
        const showStop = (index)=>{
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
            dwellTimer = window.setTimeout(()=>{
                if (cancelled) return;
                stopPan();
                placeAt(current.x, current.y);
                setVisible(false);
                fadeTimer = window.setTimeout(()=>{
                    if (cancelled) return;
                    if (!loop) return;
                    if (list.length === 1) {
                        fadeTimer = window.setTimeout(()=>{
                            if (cancelled) return;
                            showStop(0);
                        }, gapMs);
                    } else {
                        stopIndex = (index + 1) % list.length;
                        const pause = index === list.length - 1 ? gapMs : 0;
                        if (pause > 0) {
                            fadeTimer = window.setTimeout(()=>{
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
            fadeTimer = window.setTimeout(()=>{
                if (cancelled) return;
                setVisible(false);
            }, 40);
        } else {
            fadeTimer = window.setTimeout(()=>showStop(0), enterDelayMs);
        }
        const onResize = ()=>{
            const list = stopsRef.current;
            const current = list[stopIndex] ?? list[0];
            if (current) placeAt(current.x, current.y);
        };
        window.addEventListener("resize", onResize);
        return ()=>{
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
        objectPos.y
    ]);
    if (stops.length === 0) return null;
    const transitionMs = `${fadeMs}ms`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: lensRef,
        className: `skin-glass-lens pointer-events-none absolute z-20 ${active && visible ? "is-active" : ""} ${className}`.trim(),
        style: {
            transitionProperty: "opacity, transform",
            transitionDuration: `${transitionMs}, ${transitionMs}`,
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1), cubic-bezier(0.22, 1, 0.36, 1)",
            opacity: active && visible ? 1 : 0
        },
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "skin-glass-lens__ring",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "skin-glass-lens__zoom",
                        children: useVideoZoom ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                            ref: canvasRef,
                            className: "skin-glass-lens__zoom-canvas"
                        }, void 0, false, {
                            fileName: "[project]/components/SkinGlassLens.tsx",
                            lineNumber: 410,
                            columnNumber: 13
                        }, this) : // eslint-disable-next-line @next/next/no-img-element
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            ref: zoomImgRef,
                            src: imageSrc,
                            alt: "",
                            className: "skin-glass-lens__zoom-img",
                            style: {
                                objectPosition
                            },
                            draggable: false
                        }, void 0, false, {
                            fileName: "[project]/components/SkinGlassLens.tsx",
                            lineNumber: 416,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/SkinGlassLens.tsx",
                        lineNumber: 408,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "skin-glass-lens__glare"
                    }, void 0, false, {
                        fileName: "[project]/components/SkinGlassLens.tsx",
                        lineNumber: 426,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/SkinGlassLens.tsx",
                lineNumber: 407,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "skin-glass-lens__label",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/SkinGlassLens.tsx",
                lineNumber: 428,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/SkinGlassLens.tsx",
        lineNumber: 393,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/LandingHero.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LandingHero",
    ()=>LandingHero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SkinGlassLens$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SkinGlassLens.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const NAV_LINKS = [
    {
        label: "How it works",
        href: "/how-it-works"
    },
    {
        label: "Your report",
        href: "/your-report"
    },
    {
        label: "Pricing",
        href: "/pricing"
    },
    {
        label: "FAQ",
        href: "/faq"
    }
];
const HEADLINE_LINES = [
    "Know exactly",
    "what to change."
];
const PROOF_LINE_WORDS = [
    "And",
    "prove",
    "it",
    "worked."
];
const BODY_WORDS = [
    "Every",
    "score",
    "comes",
    "with",
    "the",
    "reason",
    "behind",
    "it",
    "—",
    "no",
    "guessing,",
    "no",
    "percentile,",
    "just",
    "what's",
    "measurable",
    "and",
    "what",
    "to",
    "do",
    "next."
];
const STATS = [
    {
        value: "8",
        label: "measured features",
        icon: CubeIcon
    },
    {
        value: "Always",
        label: "shows confidence",
        icon: CirclesIcon
    },
    {
        value: "Free",
        label: "overall score",
        icon: CylinderIcon
    }
];
/**
 * Smaller batches (2 at a time) keep pan smooth.
 * Timing is independent of the hero video crossfade.
 */ const LENS_BATCHES = [
    [
        // Skin clarity sits on the mid-cheek / jaw area; jawline sits lower on the face
        {
            x: 0.52,
            y: 0.28,
            label: "Skin clarity",
            motion: "orbit"
        },
        {
            x: 0.48,
            y: 0.7,
            label: "Jawline definition",
            motion: "sweep"
        }
    ],
    [
        {
            x: 0.5,
            y: 0.38,
            label: "Eye spacing",
            motion: "bob"
        },
        {
            x: 0.5,
            y: 0.22,
            label: "Forehead tone",
            motion: "zigzag"
        }
    ],
    [
        {
            x: 0.5,
            y: 0.6,
            label: "Lip definition",
            motion: "figure8"
        },
        {
            x: 0.72,
            y: 0.36,
            label: "Cheek volume",
            motion: "orbit"
        }
    ]
];
/**
 * Landmark dots in small batches (2 each), timed like the glasses
 */ const LANDMARK_BATCHES = [
    [
        {
            id: "forehead",
            x: 0.525,
            y: 0.25
        },
        {
            id: "eye",
            x: 0.525,
            y: 0.41
        }
    ],
    [
        {
            id: "skin",
            x: 0.545,
            y: 0.31
        },
        {
            id: "cheek",
            x: 0.745,
            y: 0.39
        }
    ],
    [
        {
            id: "lip",
            x: 0.525,
            y: 0.63
        },
        {
            id: "jaw",
            x: 0.505,
            y: 0.73
        }
    ]
];
/** Clear one-after-another pop-in within a batch */ const BATCH_STAGGER_MS = 700;
const BATCH_DWELL_MS = 3800;
const BATCH_FADE_MS = 900;
/** Pause after a batch fades out before the next pops in */ const BATCH_GAP_MS = 3000;
const BATCH_ENTER_BASE_MS = 0;
/** Wait after page start before the first glass batch */ const BATCH_START_DELAY_MS = 3000;
/** Hard stop — no more glasses after this from first appear */ const LENSES_MAX_MS = 30_000;
/** Landmark batch timing */ const LM_START_DELAY_MS = 900;
const LM_STAGGER_MS = 450;
const LM_DWELL_MS = 2400;
const LM_FADE_MS = 700;
const LM_GAP_MS = 1400;
const HERO_VIDEOS = [
    "/output.mp4",
    "/output2.mp4"
];
/** Each clip stays up for this long, then we crossfade to the next */ const VIDEO_INTERVAL_MS = 4000;
/** Crossfade length — incoming fades over the outgoing (no empty gap) */ const VIDEO_FADE_MS = 1000;
function playFromStart(video) {
    if (!video) return;
    try {
        video.currentTime = 0;
    } catch  {
    /* ignore seek before ready */ }
    void video.play().catch(()=>{});
}
function pauseAndReset(video) {
    if (!video) return;
    video.pause();
    try {
        video.currentTime = 0;
    } catch  {
    /* ignore */ }
}
function LandingHero() {
    const [started, setStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeVideo, setActiveVideo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [previousVideo, setPreviousVideo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lensBatch, setLensBatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [lensesReady, setLensesReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lensesDone, setLensesDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [landmarkBatch, setLandmarkBatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [landmarksReady, setLandmarksReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [landmarksVisible, setLandmarksVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [landmarksDone, setLandmarksDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const videoRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const glowRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const activeVideoSyncRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const videoStageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const copyLayerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const parallaxRaf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const id = window.setTimeout(()=>setStarted(true), 80);
        return ()=>window.clearTimeout(id);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!started) return;
        const landmarksId = window.setTimeout(()=>{
            setLandmarksReady(true);
            setLandmarksVisible(true);
        }, LM_START_DELAY_MS);
        const lensesId = window.setTimeout(()=>setLensesReady(true), BATCH_START_DELAY_MS);
        return ()=>{
            window.clearTimeout(landmarksId);
            window.clearTimeout(lensesId);
        };
    }, [
        started
    ]);
    // Landmark batches: show 2 dots → fade → next batch → stop after last
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!landmarksReady || landmarksDone) return;
        const batch = LANDMARK_BATCHES[landmarkBatch] ?? LANDMARK_BATCHES[0];
        const lastEnter = (batch.length - 1) * LM_STAGGER_MS;
        const hideAt = lastEnter + LM_DWELL_MS;
        const advanceAt = hideAt + LM_FADE_MS + LM_GAP_MS;
        const hideId = window.setTimeout(()=>setLandmarksVisible(false), hideAt);
        const advanceId = window.setTimeout(()=>{
            if (landmarkBatch >= LANDMARK_BATCHES.length - 1) {
                setLandmarksDone(true);
                return;
            }
            setLandmarkBatch((prev)=>prev + 1);
            setLandmarksVisible(true);
        }, advanceAt);
        return ()=>{
            window.clearTimeout(hideId);
            window.clearTimeout(advanceId);
        };
    }, [
        landmarksReady,
        landmarksDone,
        landmarkBatch
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!lensesReady || lensesDone) return;
        const id = window.setTimeout(()=>setLensesDone(true), LENSES_MAX_MS);
        return ()=>window.clearTimeout(id);
    }, [
        lensesReady,
        lensesDone
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        activeVideoSyncRef.current = videoRefs.current[activeVideo] ?? null;
    }, [
        activeVideo
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const applyParallax = ()=>{
            const y = window.scrollY;
            setScrolled(y >= 30);
            const video = videoStageRef.current;
            const copy = copyLayerRef.current;
            if (video) {
                video.style.transform = `translate3d(0, ${y * 0.32}px, 0)`;
            }
            if (copy) {
                copy.style.transform = `translate3d(0, ${y * -0.1}px, 0)`;
            }
            parallaxRaf.current = 0;
        };
        const onScroll = ()=>{
            if (parallaxRaf.current) return;
            parallaxRaf.current = window.requestAnimationFrame(applyParallax);
        };
        applyParallax();
        window.addEventListener("scroll", onScroll, {
            passive: true
        });
        return ()=>{
            window.removeEventListener("scroll", onScroll);
            if (parallaxRaf.current) window.cancelAnimationFrame(parallaxRaf.current);
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Initial state: only the first clip plays; others sit paused at 0
        HERO_VIDEOS.forEach((_, i)=>{
            const main = videoRefs.current[i];
            if (i === 0) {
                playFromStart(main);
                playFromStart(glowRefs.current[i]);
            } else {
                pauseAndReset(main);
            }
        });
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const id = window.setInterval(()=>{
            setActiveVideo((prev)=>{
                setPreviousVideo(prev);
                return (prev + 1) % HERO_VIDEOS.length;
            });
        }, VIDEO_INTERVAL_MS);
        return ()=>window.clearInterval(id);
    }, []);
    // Advance through batches once (no infinite loop), then stop
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!lensesReady || lensesDone) return;
        const batch = LENS_BATCHES[lensBatch] ?? LENS_BATCHES[0];
        const lastEnter = BATCH_ENTER_BASE_MS + (batch.length - 1) * BATCH_STAGGER_MS;
        const cycleMs = lastEnter + BATCH_DWELL_MS + BATCH_FADE_MS + BATCH_GAP_MS;
        const id = window.setTimeout(()=>{
            setLensBatch((prev)=>{
                if (prev >= LENS_BATCHES.length - 1) {
                    setLensesDone(true);
                    return prev;
                }
                return prev + 1;
            });
        }, cycleMs);
        return ()=>window.clearTimeout(id);
    }, [
        lensesReady,
        lensesDone,
        lensBatch
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Incoming clip always restarts from the beginning
        playFromStart(videoRefs.current[activeVideo]);
        playFromStart(glowRefs.current[activeVideo]);
    }, [
        activeVideo
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (previousVideo === null) return;
        const fadingOut = previousVideo;
        const id = window.setTimeout(()=>{
            pauseAndReset(videoRefs.current[fadingOut]);
            setPreviousVideo(null);
        }, VIDEO_FADE_MS);
        return ()=>window.clearTimeout(id);
    }, [
        previousVideo,
        activeVideo
    ]);
    const proofDelay = 180 + HEADLINE_LINES.length * 160 + 40;
    const bodyDelay = proofDelay + PROOF_LINE_WORDS.length * 90 + 80;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative min-h-[100svh] overflow-hidden bg-[var(--hero-surface)] text-neutral-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: videoStageRef,
                className: "hero-video-stage absolute inset-0 z-0 will-change-transform",
                style: {
                    transform: "translate3d(0, 0, 0)"
                },
                children: [
                    HERO_VIDEOS.map((src, i)=>{
                        const isActive = i === activeVideo;
                        const isPrevious = i === previousVideo;
                        // Outgoing stays fully opaque underneath; incoming fades in on top — no see-through gap
                        const fadingIn = isActive && previousVideo !== null;
                        const opacity = fadingIn ? undefined : isActive || isPrevious ? 1 : 0;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `hero-video-slide absolute inset-0 ${fadingIn ? "is-fading-in" : ""}`,
                            style: {
                                opacity,
                                zIndex: isActive ? 2 : isPrevious ? 1 : 0
                            },
                            "aria-hidden": !isActive && !isPrevious,
                            children: [
                                isActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hero-video-glow pointer-events-none absolute inset-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                        ref: (el)=>{
                                            glowRefs.current[i] = el;
                                        },
                                        className: "absolute inset-0 h-full w-full scale-[1.03] object-cover object-[50%_18%]",
                                        src: src,
                                        muted: true,
                                        loop: true,
                                        playsInline: true,
                                        preload: "metadata"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LandingHero.tsx",
                                        lineNumber: 336,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/LandingHero.tsx",
                                    lineNumber: 335,
                                    columnNumber: 17
                                }, this) : null,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hero-video-mask absolute inset-0 overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                        ref: (el)=>{
                                            videoRefs.current[i] = el;
                                        },
                                        className: "absolute inset-0 h-full w-full object-cover object-[50%_18%]",
                                        src: src,
                                        muted: true,
                                        loop: true,
                                        playsInline: true,
                                        preload: isActive || isPrevious ? "auto" : "metadata"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LandingHero.tsx",
                                        lineNumber: 350,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/LandingHero.tsx",
                                    lineNumber: 349,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, src, true, {
                            fileName: "[project]/components/LandingHero.tsx",
                            lineNumber: 325,
                            columnNumber: 13
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": true,
                        className: "hero-video-wash pointer-events-none absolute inset-0"
                    }, void 0, false, {
                        fileName: "[project]/components/LandingHero.tsx",
                        lineNumber: 366,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": true,
                        className: "hero-video-fringe pointer-events-none absolute inset-0"
                    }, void 0, false, {
                        fileName: "[project]/components/LandingHero.tsx",
                        lineNumber: 367,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": true,
                        className: "hero-fullscreen-vignette pointer-events-none absolute inset-0"
                    }, void 0, false, {
                        fileName: "[project]/components/LandingHero.tsx",
                        lineNumber: 368,
                        columnNumber: 9
                    }, this),
                    landmarksReady && !landmarksDone && (LANDMARK_BATCHES[landmarkBatch] ?? []).map((mark, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `hero-landmark pointer-events-none ${landmarksVisible ? "is-on" : ""}`,
                            style: {
                                left: `${mark.x * 100}%`,
                                top: `${mark.y * 100}%`,
                                transitionDelay: landmarksVisible ? `${i * LM_STAGGER_MS}ms` : "0ms",
                                animationDelay: `${i * LM_STAGGER_MS}ms`
                            },
                            "aria-hidden": true
                        }, `${landmarkBatch}-${mark.id}`, false, {
                            fileName: "[project]/components/LandingHero.tsx",
                            lineNumber: 373,
                            columnNumber: 13
                        }, this)),
                    lensesReady && !lensesDone && (LENS_BATCHES[lensBatch] ?? []).map((lens, i)=>{
                        const batchLen = LENS_BATCHES[lensBatch]?.length ?? 1;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SkinGlassLens$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SkinGlassLens"], {
                            active: true,
                            useVideoZoom: true,
                            syncVideoRef: activeVideoSyncRef,
                            stop: lens,
                            objectPosition: "50% 18%",
                            className: "skin-glass-lens--field",
                            enterDelayMs: BATCH_ENTER_BASE_MS + i * BATCH_STAGGER_MS,
                            dwellMs: BATCH_DWELL_MS + (batchLen - 1 - i) * BATCH_STAGGER_MS,
                            fadeMs: BATCH_FADE_MS,
                            loop: false,
                            lite: true
                        }, `${lensBatch}-${lens.label}`, false, {
                            fileName: "[project]/components/LandingHero.tsx",
                            lineNumber: 395,
                            columnNumber: 15
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 312,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: `fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,color] duration-300 ${scrolled ? "border-b border-neutral-200/40 bg-[color-mix(in_srgb,var(--hero-surface)_72%,transparent)] text-neutral-600 backdrop-blur-sm" : "border-b border-transparent bg-transparent text-white"}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 md:px-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: `hero-word flex items-center gap-2.5 ${started ? "is-in" : ""}`,
                            style: {
                                transitionDelay: "40ms"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LogoMark, {}, void 0, false, {
                                    fileName: "[project]/components/LandingHero.tsx",
                                    lineNumber: 428,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[1.35rem] font-semibold tracking-tight",
                                    children: "Zelko"
                                }, void 0, false, {
                                    fileName: "[project]/components/LandingHero.tsx",
                                    lineNumber: 429,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/LandingHero.tsx",
                            lineNumber: 423,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "hidden items-center gap-7 text-[0.92rem] lg:flex",
                            children: NAV_LINKS.map((link, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: link.href,
                                    className: `hero-word transition ${scrolled ? "hover:text-neutral-950" : "hover:text-white/80"} ${started ? "is-in" : ""}`,
                                    style: {
                                        transitionDelay: `${120 + i * 70}ms`
                                    },
                                    children: link.label
                                }, link.href, false, {
                                    fileName: "[project]/components/LandingHero.tsx",
                                    lineNumber: 436,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/LandingHero.tsx",
                            lineNumber: 434,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/contact",
                                    className: `hero-word hidden rounded-lg border px-4 py-2 text-sm font-medium transition sm:inline-flex ${scrolled ? "border-neutral-900/80 hover:bg-white/50" : "border-white/80 hover:bg-white/10"} ${started ? "is-in" : ""}`,
                                    style: {
                                        transitionDelay: `${120 + NAV_LINKS.length * 70 + 40}ms`
                                    },
                                    children: "Contact Us"
                                }, void 0, false, {
                                    fileName: "[project]/components/LandingHero.tsx",
                                    lineNumber: 450,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    className: `hero-word text-sm font-medium transition ${scrolled ? "hover:text-neutral-950" : "hover:text-white/80"} ${started ? "is-in" : ""}`,
                                    style: {
                                        transitionDelay: `${120 + NAV_LINKS.length * 70 + 110}ms`
                                    },
                                    children: "Log in"
                                }, void 0, false, {
                                    fileName: "[project]/components/LandingHero.tsx",
                                    lineNumber: 461,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/LandingHero.tsx",
                            lineNumber: 449,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/LandingHero.tsx",
                    lineNumber: 422,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 415,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: copyLayerRef,
                className: "pointer-events-none relative z-20 flex min-h-[100svh] items-center px-6 pb-16 pt-28 will-change-transform md:px-10 lg:px-14",
                style: {
                    transform: "translate3d(0, 0, 0)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-auto absolute left-6 top-[28%] max-w-[17rem] sm:left-10 sm:max-w-[19rem] md:left-14 lg:left-[5%] lg:max-w-[22rem]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `hero-word mb-5 inline-flex w-fit items-center rounded-full border border-neutral-200/80 bg-white/85 px-3.5 py-1.5 text-xs text-neutral-600 shadow-sm backdrop-blur-sm sm:text-sm ${started ? "is-in" : ""}`,
                                style: {
                                    transitionDelay: "60ms"
                                },
                                children: "Private, explainable analysis"
                            }, void 0, false, {
                                fileName: "[project]/components/LandingHero.tsx",
                                lineNumber: 482,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "font-[family-name:var(--font-cursive)] text-4xl font-semibold leading-[1.15] tracking-tight text-neutral-950 sm:text-5xl lg:text-[3.5rem]",
                                children: HEADLINE_LINES.map((line, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `hero-word block ${started ? "is-in" : ""}`,
                                        style: {
                                            transitionDelay: `${180 + i * 160}ms`
                                        },
                                        children: line
                                    }, line, false, {
                                        fileName: "[project]/components/LandingHero.tsx",
                                        lineNumber: 491,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/LandingHero.tsx",
                                lineNumber: 489,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-xl font-normal leading-snug tracking-tight text-neutral-400 sm:text-2xl lg:text-[1.65rem]",
                                children: PROOF_LINE_WORDS.map((word, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `hero-word inline-block pr-[0.28em] last:pr-0 ${started ? "is-in" : ""}`,
                                        style: {
                                            transitionDelay: `${proofDelay + i * 90}ms`
                                        },
                                        children: word
                                    }, `${word}-${i}`, false, {
                                        fileName: "[project]/components/LandingHero.tsx",
                                        lineNumber: 503,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/LandingHero.tsx",
                                lineNumber: 501,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-5 max-w-[20rem] text-base leading-relaxed text-neutral-400 sm:text-lg",
                                children: BODY_WORDS.map((word, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `hero-word inline-block pr-[0.28em] last:pr-0 ${started ? "is-in" : ""}`,
                                        style: {
                                            transitionDelay: `${bodyDelay + i * 35}ms`
                                        },
                                        children: word
                                    }, `${word}-${i}`, false, {
                                        fileName: "[project]/components/LandingHero.tsx",
                                        lineNumber: 515,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/LandingHero.tsx",
                                lineNumber: 513,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `hero-word mt-7 ${started ? "is-in" : ""}`,
                                style: {
                                    transitionDelay: `${bodyDelay + BODY_WORDS.length * 35 + 60}ms`
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/upload",
                                    className: "inline-flex items-center rounded-xl bg-[#ebe4ff] px-5 py-3 text-sm font-medium text-neutral-900 transition hover:bg-[#e0d6ff]",
                                    children: "Start your free report"
                                }, void 0, false, {
                                    fileName: "[project]/components/LandingHero.tsx",
                                    lineNumber: 531,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/LandingHero.tsx",
                                lineNumber: 525,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LandingHero.tsx",
                        lineNumber: 481,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute right-6 top-[34%] flex flex-col gap-8 sm:right-10 md:right-14 lg:right-[5%]",
                        children: STATS.map((stat, i)=>{
                            const Icon = stat.icon;
                            const baseDelay = 420 + i * 220;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `hero-word hero-word-right shrink-0 text-neutral-400 ${started ? "is-in" : ""}`,
                                        style: {
                                            transitionDelay: `${baseDelay}ms`
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {}, void 0, false, {
                                            fileName: "[project]/components/LandingHero.tsx",
                                            lineNumber: 550,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/LandingHero.tsx",
                                        lineNumber: 546,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `hero-word hero-word-right text-2xl font-semibold tracking-tight text-neutral-900 sm:text-[1.65rem] ${started ? "is-in" : ""}`,
                                                style: {
                                                    transitionDelay: `${baseDelay + 70}ms`
                                                },
                                                children: stat.value
                                            }, void 0, false, {
                                                fileName: "[project]/components/LandingHero.tsx",
                                                lineNumber: 553,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-0.5 max-w-[9.5rem] text-sm leading-snug text-neutral-500",
                                                children: stat.label.split(" ").map((word, wi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `hero-word hero-word-right inline-block pr-[0.3em] last:pr-0 ${started ? "is-in" : ""}`,
                                                        style: {
                                                            transitionDelay: `${baseDelay + 140 + wi * 70}ms`
                                                        },
                                                        children: word
                                                    }, `${stat.value}-${word}-${wi}`, false, {
                                                        fileName: "[project]/components/LandingHero.tsx",
                                                        lineNumber: 561,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/LandingHero.tsx",
                                                lineNumber: 559,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LandingHero.tsx",
                                        lineNumber: 552,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, stat.value, true, {
                                fileName: "[project]/components/LandingHero.tsx",
                                lineNumber: 545,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/LandingHero.tsx",
                        lineNumber: 540,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 476,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LandingHero.tsx",
        lineNumber: 310,
        columnNumber: 5
    }, this);
}
function LogoMark() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "22",
        height: "22",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": true,
        className: "text-[#8b7cf6]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 2.5 13.8 8.2 19.5 10 13.8 11.8 12 17.5 10.2 11.8 4.5 10 10.2 8.2 12 2.5Z",
                fill: "currentColor",
                opacity: "0.95"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 592,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M18.2 14.2 19 16.6 21.4 17.4 19 18.2 18.2 20.6 17.4 18.2 15 17.4 17.4 16.6 18.2 14.2Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 597,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6.4 15.1 7 17 8.9 17.6 7 18.2 6.4 20.1 5.8 18.2 3.9 17.6 5.8 17 6.4 15.1Z",
                fill: "currentColor",
                opacity: "0.85"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 601,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LandingHero.tsx",
        lineNumber: 584,
        columnNumber: 5
    }, this);
}
function CubeIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "28",
        height: "28",
        viewBox: "0 0 28 28",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.2",
        className: "mt-1",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14 4.5 23 9.5v9L14 23.5 5 18.5v-9L14 4.5Z"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 622,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14 14.5 23 9.5M14 14.5 5 9.5M14 14.5v9"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 623,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LandingHero.tsx",
        lineNumber: 612,
        columnNumber: 5
    }, this);
}
function CirclesIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "28",
        height: "28",
        viewBox: "0 0 28 28",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.2",
        className: "mt-1",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "11",
                cy: "14",
                r: "6.5"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 640,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "17",
                cy: "14",
                r: "6.5"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 641,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LandingHero.tsx",
        lineNumber: 630,
        columnNumber: 5
    }, this);
}
function CylinderIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "28",
        height: "28",
        viewBox: "0 0 28 28",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.2",
        className: "mt-1",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "14",
                cy: "7.5",
                rx: "7",
                ry: "3"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 658,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7 7.5v13c0 1.7 3.1 3 7 3s7-1.3 7-3v-13"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 659,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7 14c0 1.7 3.1 3 7 3s7-1.3 7-3",
                opacity: "0.5"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 660,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LandingHero.tsx",
        lineNumber: 648,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/ManifestoSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ManifestoSection",
    ()=>ManifestoSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const COPY_LEAD = "Zelko helps you understand and care for your skin like never before. Get insights and tips backed by AI and real science";
const COPY_EMPHASIS = "for your healthiest, happiest skin";
/** Cards start stacked at center, then fly out to these offsets from center. */ const TAGS = [
    {
        label: "Beautiful",
        icon: "🌸",
        dx: "-11rem",
        dy: "-5.5rem",
        delay: 0,
        floatDelay: "0s"
    },
    {
        label: "Healthy",
        icon: "💗",
        dx: "10rem",
        dy: "-5rem",
        delay: 80,
        floatDelay: "0.4s"
    },
    {
        label: "Confident",
        icon: "⭐",
        dx: "-13rem",
        dy: "0.5rem",
        delay: 160,
        floatDelay: "0.8s"
    },
    {
        label: "Glowing",
        icon: "✨",
        dx: "-2rem",
        dy: "6.5rem",
        delay: 240,
        floatDelay: "1.2s"
    },
    {
        label: "Happy",
        icon: "😊",
        dx: "11rem",
        dy: "5.5rem",
        delay: 320,
        floatDelay: "1.6s"
    }
];
const CARD_FLIGHT_MS = 900;
const LAST_CARD_DELAY_MS = 320;
function ManifestoSection() {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [cardsOut, setCardsOut] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [textDark, setTextDark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const node = ref.current;
        if (!node) return;
        let textTimer;
        const observer = new IntersectionObserver(([entry])=>{
            if (!entry.isIntersecting) return;
            setCardsOut(true);
            textTimer = window.setTimeout(()=>{
                setTextDark(true);
            }, LAST_CARD_DELAY_MS + CARD_FLIGHT_MS + 120);
            observer.disconnect();
        }, {
            threshold: 0.4
        });
        observer.observe(node);
        return ()=>{
            observer.disconnect();
            if (textTimer) window.clearTimeout(textTimer);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: ref,
        className: "relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-white px-6 py-28",
        children: [
            TAGS.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `manifesto-card absolute z-10 ${cardsOut ? "is-out" : ""} ${textDark ? "is-floating" : ""}`,
                    style: {
                        "--dx": tag.dx,
                        "--dy": tag.dy,
                        transitionDelay: `${tag.delay}ms`,
                        animationDelay: tag.floatDelay
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-2 rounded-2xl border border-neutral-100 bg-white/90 px-3.5 py-2.5 text-sm text-neutral-700 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": true,
                                className: "text-base leading-none",
                                children: tag.icon
                            }, void 0, false, {
                                fileName: "[project]/components/ManifestoSection.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this),
                            tag.label
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ManifestoSection.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, this)
                }, tag.label, false, {
                    fileName: "[project]/components/ManifestoSection.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-0 mx-auto max-w-3xl text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: `manifesto-copy text-2xl leading-snug tracking-tight sm:text-3xl md:text-[2.15rem] md:leading-[1.4] ${textDark ? "is-dark" : ""}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "manifesto-copy-lead",
                            children: [
                                COPY_LEAD,
                                " "
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ManifestoSection.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "manifesto-copy-emphasis",
                            children: COPY_EMPHASIS
                        }, void 0, false, {
                            fileName: "[project]/components/ManifestoSection.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ManifestoSection.tsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ManifestoSection.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ManifestoSection.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/site/FeatureMarquee.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeatureMarquee",
    ()=>FeatureMarquee
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
const FEATURES = [
    "Face symmetry",
    "Facial proportions",
    "Skin clarity",
    "Jawline definition",
    "Eyebrow shape",
    "Eye spacing",
    "Grooming signal",
    "Photo quality"
];
function FeatureMarquee() {
    const row = [
        ...FEATURES,
        ...FEATURES
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "overflow-hidden border-y border-neutral-200 bg-white py-5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "feature-marquee flex w-max gap-10 whitespace-nowrap",
            children: row.map((feature, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm uppercase tracking-[0.18em] text-neutral-400",
                    children: [
                        feature,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ml-10 text-neutral-300",
                            children: "·"
                        }, void 0, false, {
                            fileName: "[project]/components/site/FeatureMarquee.tsx",
                            lineNumber: 26,
                            columnNumber: 13
                        }, this)
                    ]
                }, `${feature}-${i}`, true, {
                    fileName: "[project]/components/site/FeatureMarquee.tsx",
                    lineNumber: 21,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/site/FeatureMarquee.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/site/FeatureMarquee.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/site/Reveal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Reveal",
    ()=>Reveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function Reveal({ children, className = "", delayMs = 0 }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [inView, setInView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const node = ref.current;
        if (!node) return;
        const observer = new IntersectionObserver(([entry])=>{
            if (entry.isIntersecting) {
                setInView(true);
                observer.disconnect();
            }
        }, {
            threshold: 0.2
        });
        observer.observe(node);
        return ()=>observer.disconnect();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: `hero-word ${inView ? "is-in" : ""} ${className}`,
        style: {
            transitionDelay: `${delayMs}ms`
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/site/Reveal.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=components_9084a780._.js.map