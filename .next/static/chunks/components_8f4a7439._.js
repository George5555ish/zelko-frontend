(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/LandingHero.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LandingHero",
    ()=>LandingHero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
/** Lens top-left fractions over the fullscreen hero video face */ const HERO_LENS_STOPS = [
    {
        x: 0.36,
        y: 0.12,
        label: "Skin clarity",
        motion: "orbit"
    },
    {
        x: 0.5,
        y: 0.3,
        label: "Jawline definition",
        motion: "sweep"
    },
    {
        x: 0.22,
        y: 0.5,
        label: "Eye spacing",
        motion: "bob"
    },
    {
        x: 0.4,
        y: 0.08,
        label: "Forehead tone",
        motion: "zigzag"
    },
    {
        x: 0.44,
        y: 0.36,
        label: "Lip definition",
        motion: "figure8"
    }
];
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
    } catch (e) {
    /* ignore seek before ready */ }
    void video.play().catch(()=>{});
}
function pauseAndReset(video) {
    if (!video) return;
    video.pause();
    try {
        video.currentTime = 0;
    } catch (e) {
    /* ignore */ }
}
function LandingHero() {
    _s();
    const [started, setStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeVideo, setActiveVideo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [previousVideo, setPreviousVideo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const videoRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const glowRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const activeVideoSyncRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LandingHero.useEffect": ()=>{
            const id = window.setTimeout({
                "LandingHero.useEffect.id": ()=>setStarted(true)
            }["LandingHero.useEffect.id"], 80);
            return ({
                "LandingHero.useEffect": ()=>window.clearTimeout(id)
            })["LandingHero.useEffect"];
        }
    }["LandingHero.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LandingHero.useEffect": ()=>{
            var _videoRefs_current_activeVideo;
            activeVideoSyncRef.current = (_videoRefs_current_activeVideo = videoRefs.current[activeVideo]) !== null && _videoRefs_current_activeVideo !== void 0 ? _videoRefs_current_activeVideo : null;
        }
    }["LandingHero.useEffect"], [
        activeVideo
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LandingHero.useEffect": ()=>{
            const onScroll = {
                "LandingHero.useEffect.onScroll": ()=>setScrolled(window.scrollY >= 30)
            }["LandingHero.useEffect.onScroll"];
            onScroll();
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            return ({
                "LandingHero.useEffect": ()=>window.removeEventListener("scroll", onScroll)
            })["LandingHero.useEffect"];
        }
    }["LandingHero.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LandingHero.useEffect": ()=>{
            // Initial state: only the first clip plays; others sit paused at 0
            HERO_VIDEOS.forEach({
                "LandingHero.useEffect": (_, i)=>{
                    const main = videoRefs.current[i];
                    const glow = glowRefs.current[i];
                    if (i === 0) {
                        playFromStart(main);
                        playFromStart(glow);
                    } else {
                        pauseAndReset(main);
                        pauseAndReset(glow);
                    }
                }
            }["LandingHero.useEffect"]);
        }
    }["LandingHero.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LandingHero.useEffect": ()=>{
            const id = window.setInterval({
                "LandingHero.useEffect.id": ()=>{
                    setActiveVideo({
                        "LandingHero.useEffect.id": (prev)=>{
                            setPreviousVideo(prev);
                            return (prev + 1) % HERO_VIDEOS.length;
                        }
                    }["LandingHero.useEffect.id"]);
                }
            }["LandingHero.useEffect.id"], VIDEO_INTERVAL_MS);
            return ({
                "LandingHero.useEffect": ()=>window.clearInterval(id)
            })["LandingHero.useEffect"];
        }
    }["LandingHero.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LandingHero.useEffect": ()=>{
            // Incoming clip always restarts from the beginning
            playFromStart(videoRefs.current[activeVideo]);
            playFromStart(glowRefs.current[activeVideo]);
        }
    }["LandingHero.useEffect"], [
        activeVideo
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LandingHero.useEffect": ()=>{
            if (previousVideo === null) return;
            const fadingOut = previousVideo;
            const id = window.setTimeout({
                "LandingHero.useEffect.id": ()=>{
                    // After the crossfade, stop the hidden clip and rewind it for next time
                    pauseAndReset(videoRefs.current[fadingOut]);
                    pauseAndReset(glowRefs.current[fadingOut]);
                    setPreviousVideo(null);
                }
            }["LandingHero.useEffect.id"], VIDEO_FADE_MS);
            return ({
                "LandingHero.useEffect": ()=>window.clearTimeout(id)
            })["LandingHero.useEffect"];
        }
    }["LandingHero.useEffect"], [
        previousVideo,
        activeVideo
    ]);
    const proofDelay = 180 + HEADLINE_LINES.length * 160 + 40;
    const bodyDelay = proofDelay + PROOF_LINE_WORDS.length * 90 + 80;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative min-h-[100svh] overflow-hidden bg-[var(--hero-surface)] text-neutral-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hero-video-stage absolute inset-0 z-0",
                children: [
                    HERO_VIDEOS.map((src, i)=>{
                        const isActive = i === activeVideo;
                        const isPrevious = i === previousVideo;
                        // Outgoing stays fully opaque underneath; incoming fades in on top — no see-through gap
                        const fadingIn = isActive && previousVideo !== null;
                        const opacity = fadingIn ? undefined : isActive || isPrevious ? 1 : 0;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hero-video-slide absolute inset-0 ".concat(fadingIn ? "is-fading-in" : ""),
                            style: {
                                opacity,
                                zIndex: isActive ? 2 : isPrevious ? 1 : 0
                            },
                            "aria-hidden": !isActive && !isPrevious,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hero-video-glow pointer-events-none absolute inset-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                        ref: (el)=>{
                                            glowRefs.current[i] = el;
                                        },
                                        className: "absolute inset-0 h-full w-full scale-[1.03] object-cover object-[50%_18%]",
                                        src: src,
                                        muted: true,
                                        loop: true,
                                        playsInline: true,
                                        preload: "auto"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LandingHero.tsx",
                                        lineNumber: 190,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/LandingHero.tsx",
                                    lineNumber: 189,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hero-video-mask absolute inset-0 overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                        ref: (el)=>{
                                            videoRefs.current[i] = el;
                                        },
                                        className: "absolute inset-0 h-full w-full object-cover object-[50%_18%]",
                                        src: src,
                                        muted: true,
                                        loop: true,
                                        playsInline: true,
                                        preload: "auto"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LandingHero.tsx",
                                        lineNumber: 203,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/LandingHero.tsx",
                                    lineNumber: 202,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, src, true, {
                            fileName: "[project]/components/LandingHero.tsx",
                            lineNumber: 180,
                            columnNumber: 13
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": true,
                        className: "hero-video-wash pointer-events-none absolute inset-0"
                    }, void 0, false, {
                        fileName: "[project]/components/LandingHero.tsx",
                        lineNumber: 219,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": true,
                        className: "hero-video-fringe pointer-events-none absolute inset-0"
                    }, void 0, false, {
                        fileName: "[project]/components/LandingHero.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": true,
                        className: "hero-fullscreen-vignette pointer-events-none absolute inset-0"
                    }, void 0, false, {
                        fileName: "[project]/components/LandingHero.tsx",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this),
                    SCAN_MARKERS.map((marker, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hero-word pointer-events-none absolute z-10 ".concat(started && markersVisible ? "is-in" : ""),
                            style: {
                                top: marker.top,
                                left: marker.left,
                                transitionDelay: started && markersVisible ? "".concat(980 + i * 140, "ms") : "0ms"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative size-12 rounded-full border border-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.2)] sm:size-14",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-white"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LandingHero.tsx",
                                        lineNumber: 237,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.7rem] font-medium tracking-wide text-neutral-700 drop-shadow-[0_0_6px_rgba(255,255,255,0.9)] sm:text-xs",
                                        children: marker.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/LandingHero.tsx",
                                        lineNumber: 238,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LandingHero.tsx",
                                lineNumber: 236,
                                columnNumber: 13
                            }, this)
                        }, marker.label, false, {
                            fileName: "[project]/components/LandingHero.tsx",
                            lineNumber: 224,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,color] duration-300 ".concat(scrolled ? "border-b border-neutral-200/40 bg-[color-mix(in_srgb,var(--hero-surface)_72%,transparent)] text-neutral-600 backdrop-blur-sm" : "border-b border-transparent bg-transparent text-white"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 md:px-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "hero-word flex items-center gap-2.5 ".concat(started ? "is-in" : ""),
                            style: {
                                transitionDelay: "40ms"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LogoMark, {}, void 0, false, {
                                    fileName: "[project]/components/LandingHero.tsx",
                                    lineNumber: 259,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[1.35rem] font-semibold tracking-tight",
                                    children: "Zelko"
                                }, void 0, false, {
                                    fileName: "[project]/components/LandingHero.tsx",
                                    lineNumber: 260,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/LandingHero.tsx",
                            lineNumber: 254,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "hidden items-center gap-7 text-[0.92rem] lg:flex",
                            children: NAV_LINKS.map((link, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: link.href,
                                    className: "hero-word transition ".concat(scrolled ? "hover:text-neutral-950" : "hover:text-white/80", " ").concat(started ? "is-in" : ""),
                                    style: {
                                        transitionDelay: "".concat(120 + i * 70, "ms")
                                    },
                                    children: link.label
                                }, link.href, false, {
                                    fileName: "[project]/components/LandingHero.tsx",
                                    lineNumber: 267,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/LandingHero.tsx",
                            lineNumber: 265,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/contact",
                                    className: "hero-word hidden rounded-lg border px-4 py-2 text-sm font-medium transition sm:inline-flex ".concat(scrolled ? "border-neutral-900/80 hover:bg-white/50" : "border-white/80 hover:bg-white/10", " ").concat(started ? "is-in" : ""),
                                    style: {
                                        transitionDelay: "".concat(120 + NAV_LINKS.length * 70 + 40, "ms")
                                    },
                                    children: "Contact Us"
                                }, void 0, false, {
                                    fileName: "[project]/components/LandingHero.tsx",
                                    lineNumber: 281,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    className: "hero-word text-sm font-medium transition ".concat(scrolled ? "hover:text-neutral-950" : "hover:text-white/80", " ").concat(started ? "is-in" : ""),
                                    style: {
                                        transitionDelay: "".concat(120 + NAV_LINKS.length * 70 + 110, "ms")
                                    },
                                    children: "Log in"
                                }, void 0, false, {
                                    fileName: "[project]/components/LandingHero.tsx",
                                    lineNumber: 292,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/LandingHero.tsx",
                            lineNumber: 280,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/LandingHero.tsx",
                    lineNumber: 253,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none relative z-20 flex min-h-[100svh] items-center px-6 pb-16 pt-28 md:px-10 lg:px-14",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-auto absolute left-6 top-[28%] max-w-[17rem] sm:left-10 sm:max-w-[19rem] md:left-14 lg:left-[5%] lg:max-w-[22rem]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hero-word mb-5 inline-flex w-fit items-center rounded-full border border-neutral-200/80 bg-white/85 px-3.5 py-1.5 text-xs text-neutral-600 shadow-sm backdrop-blur-sm sm:text-sm ".concat(started ? "is-in" : ""),
                                style: {
                                    transitionDelay: "60ms"
                                },
                                children: "Private, explainable analysis"
                            }, void 0, false, {
                                fileName: "[project]/components/LandingHero.tsx",
                                lineNumber: 309,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "font-[family-name:var(--font-cursive)] text-4xl font-semibold leading-[1.15] tracking-tight text-neutral-950 sm:text-5xl lg:text-[3.5rem]",
                                children: HEADLINE_LINES.map((line, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hero-word block ".concat(started ? "is-in" : ""),
                                        style: {
                                            transitionDelay: "".concat(180 + i * 160, "ms")
                                        },
                                        children: line
                                    }, line, false, {
                                        fileName: "[project]/components/LandingHero.tsx",
                                        lineNumber: 318,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/LandingHero.tsx",
                                lineNumber: 316,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-xl font-normal leading-snug tracking-tight text-neutral-400 sm:text-2xl lg:text-[1.65rem]",
                                children: PROOF_LINE_WORDS.map((word, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hero-word inline-block pr-[0.28em] last:pr-0 ".concat(started ? "is-in" : ""),
                                        style: {
                                            transitionDelay: "".concat(proofDelay + i * 90, "ms")
                                        },
                                        children: word
                                    }, "".concat(word, "-").concat(i), false, {
                                        fileName: "[project]/components/LandingHero.tsx",
                                        lineNumber: 330,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/LandingHero.tsx",
                                lineNumber: 328,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-5 max-w-[20rem] text-base leading-relaxed text-neutral-400 sm:text-lg",
                                children: BODY_WORDS.map((word, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hero-word inline-block pr-[0.28em] last:pr-0 ".concat(started ? "is-in" : ""),
                                        style: {
                                            transitionDelay: "".concat(bodyDelay + i * 35, "ms")
                                        },
                                        children: word
                                    }, "".concat(word, "-").concat(i), false, {
                                        fileName: "[project]/components/LandingHero.tsx",
                                        lineNumber: 342,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/LandingHero.tsx",
                                lineNumber: 340,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hero-word mt-7 ".concat(started ? "is-in" : ""),
                                style: {
                                    transitionDelay: "".concat(bodyDelay + BODY_WORDS.length * 35 + 60, "ms")
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/upload",
                                    className: "inline-flex items-center rounded-xl bg-[#ebe4ff] px-5 py-3 text-sm font-medium text-neutral-900 transition hover:bg-[#e0d6ff]",
                                    children: "Start your free report"
                                }, void 0, false, {
                                    fileName: "[project]/components/LandingHero.tsx",
                                    lineNumber: 358,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/LandingHero.tsx",
                                lineNumber: 352,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LandingHero.tsx",
                        lineNumber: 308,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute right-6 top-[34%] flex flex-col gap-8 sm:right-10 md:right-14 lg:right-[5%]",
                        children: STATS.map((stat, i)=>{
                            const Icon = stat.icon;
                            const baseDelay = 420 + i * 220;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hero-word hero-word-right shrink-0 text-neutral-400 ".concat(started ? "is-in" : ""),
                                        style: {
                                            transitionDelay: "".concat(baseDelay, "ms")
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {}, void 0, false, {
                                            fileName: "[project]/components/LandingHero.tsx",
                                            lineNumber: 377,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/LandingHero.tsx",
                                        lineNumber: 373,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "hero-word hero-word-right text-2xl font-semibold tracking-tight text-neutral-900 sm:text-[1.65rem] ".concat(started ? "is-in" : ""),
                                                style: {
                                                    transitionDelay: "".concat(baseDelay + 70, "ms")
                                                },
                                                children: stat.value
                                            }, void 0, false, {
                                                fileName: "[project]/components/LandingHero.tsx",
                                                lineNumber: 380,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-0.5 max-w-[9.5rem] text-sm leading-snug text-neutral-500",
                                                children: stat.label.split(" ").map((word, wi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "hero-word hero-word-right inline-block pr-[0.3em] last:pr-0 ".concat(started ? "is-in" : ""),
                                                        style: {
                                                            transitionDelay: "".concat(baseDelay + 140 + wi * 70, "ms")
                                                        },
                                                        children: word
                                                    }, "".concat(stat.value, "-").concat(word, "-").concat(wi), false, {
                                                        fileName: "[project]/components/LandingHero.tsx",
                                                        lineNumber: 388,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/LandingHero.tsx",
                                                lineNumber: 386,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LandingHero.tsx",
                                        lineNumber: 379,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, stat.value, true, {
                                fileName: "[project]/components/LandingHero.tsx",
                                lineNumber: 372,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/LandingHero.tsx",
                        lineNumber: 367,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 307,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LandingHero.tsx",
        lineNumber: 169,
        columnNumber: 5
    }, this);
}
_s(LandingHero, "bNEM14rpZPK1N0t9jmPJh8kSeD8=");
_c = LandingHero;
function LogoMark() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "22",
        height: "22",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": true,
        className: "text-[#8b7cf6]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 2.5 13.8 8.2 19.5 10 13.8 11.8 12 17.5 10.2 11.8 4.5 10 10.2 8.2 12 2.5Z",
                fill: "currentColor",
                opacity: "0.95"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 419,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M18.2 14.2 19 16.6 21.4 17.4 19 18.2 18.2 20.6 17.4 18.2 15 17.4 17.4 16.6 18.2 14.2Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 424,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6.4 15.1 7 17 8.9 17.6 7 18.2 6.4 20.1 5.8 18.2 3.9 17.6 5.8 17 6.4 15.1Z",
                fill: "currentColor",
                opacity: "0.85"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 428,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LandingHero.tsx",
        lineNumber: 411,
        columnNumber: 5
    }, this);
}
_c1 = LogoMark;
function CubeIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "28",
        height: "28",
        viewBox: "0 0 28 28",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.2",
        className: "mt-1",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14 4.5 23 9.5v9L14 23.5 5 18.5v-9L14 4.5Z"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 449,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14 14.5 23 9.5M14 14.5 5 9.5M14 14.5v9"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 450,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LandingHero.tsx",
        lineNumber: 439,
        columnNumber: 5
    }, this);
}
_c2 = CubeIcon;
function CirclesIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "28",
        height: "28",
        viewBox: "0 0 28 28",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.2",
        className: "mt-1",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "11",
                cy: "14",
                r: "6.5"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 467,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "17",
                cy: "14",
                r: "6.5"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 468,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LandingHero.tsx",
        lineNumber: 457,
        columnNumber: 5
    }, this);
}
_c3 = CirclesIcon;
function CylinderIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "28",
        height: "28",
        viewBox: "0 0 28 28",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.2",
        className: "mt-1",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "14",
                cy: "7.5",
                rx: "7",
                ry: "3"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 485,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7 7.5v13c0 1.7 3.1 3 7 3s7-1.3 7-3v-13"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 486,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7 14c0 1.7 3.1 3 7 3s7-1.3 7-3",
                opacity: "0.5"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 487,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LandingHero.tsx",
        lineNumber: 475,
        columnNumber: 5
    }, this);
}
_c4 = CylinderIcon;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "LandingHero");
__turbopack_context__.k.register(_c1, "LogoMark");
__turbopack_context__.k.register(_c2, "CubeIcon");
__turbopack_context__.k.register(_c3, "CirclesIcon");
__turbopack_context__.k.register(_c4, "CylinderIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ManifestoSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ManifestoSection",
    ()=>ManifestoSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [cardsOut, setCardsOut] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [textDark, setTextDark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ManifestoSection.useEffect": ()=>{
            const node = ref.current;
            if (!node) return;
            let textTimer;
            const observer = new IntersectionObserver({
                "ManifestoSection.useEffect": (param)=>{
                    let [entry] = param;
                    if (!entry.isIntersecting) return;
                    setCardsOut(true);
                    textTimer = window.setTimeout({
                        "ManifestoSection.useEffect": ()=>{
                            setTextDark(true);
                        }
                    }["ManifestoSection.useEffect"], LAST_CARD_DELAY_MS + CARD_FLIGHT_MS + 120);
                    observer.disconnect();
                }
            }["ManifestoSection.useEffect"], {
                threshold: 0.4
            });
            observer.observe(node);
            return ({
                "ManifestoSection.useEffect": ()=>{
                    observer.disconnect();
                    if (textTimer) window.clearTimeout(textTimer);
                }
            })["ManifestoSection.useEffect"];
        }
    }["ManifestoSection.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: ref,
        className: "relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-white px-6 py-28",
        children: [
            TAGS.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "manifesto-card absolute z-10 ".concat(cardsOut ? "is-out" : "", " ").concat(textDark ? "is-floating" : ""),
                    style: {
                        "--dx": tag.dx,
                        "--dy": tag.dy,
                        transitionDelay: "".concat(tag.delay, "ms"),
                        animationDelay: tag.floatDelay
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-2 rounded-2xl border border-neutral-100 bg-white/90 px-3.5 py-2.5 text-sm text-neutral-700 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-0 mx-auto max-w-3xl text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "manifesto-copy text-2xl leading-snug tracking-tight sm:text-3xl md:text-[2.15rem] md:leading-[1.4] ".concat(textDark ? "is-dark" : ""),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_s(ManifestoSection, "Yy8+wiNr5+QOLAWeePaCjxIV3gc=");
_c = ManifestoSection;
var _c;
__turbopack_context__.k.register(_c, "ManifestoSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/site/FeatureMarquee.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeatureMarquee",
    ()=>FeatureMarquee
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "overflow-hidden border-y border-neutral-200 bg-white py-5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "feature-marquee flex w-max gap-10 whitespace-nowrap",
            children: row.map((feature, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm uppercase tracking-[0.18em] text-neutral-400",
                    children: [
                        feature,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ml-10 text-neutral-300",
                            children: "·"
                        }, void 0, false, {
                            fileName: "[project]/components/site/FeatureMarquee.tsx",
                            lineNumber: 26,
                            columnNumber: 13
                        }, this)
                    ]
                }, "".concat(feature, "-").concat(i), true, {
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
_c = FeatureMarquee;
var _c;
__turbopack_context__.k.register(_c, "FeatureMarquee");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/site/Reveal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Reveal",
    ()=>Reveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function Reveal(param) {
    let { children, className = "", delayMs = 0 } = param;
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [inView, setInView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Reveal.useEffect": ()=>{
            const node = ref.current;
            if (!node) return;
            const observer = new IntersectionObserver({
                "Reveal.useEffect": (param)=>{
                    let [entry] = param;
                    if (entry.isIntersecting) {
                        setInView(true);
                        observer.disconnect();
                    }
                }
            }["Reveal.useEffect"], {
                threshold: 0.2
            });
            observer.observe(node);
            return ({
                "Reveal.useEffect": ()=>observer.disconnect()
            })["Reveal.useEffect"];
        }
    }["Reveal.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "hero-word ".concat(inView ? "is-in" : "", " ").concat(className),
        style: {
            transitionDelay: "".concat(delayMs, "ms")
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/site/Reveal.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_s(Reveal, "K+dCFMkCcTyPMHOI0MxAWPXS6Js=");
_c = Reveal;
var _c;
__turbopack_context__.k.register(_c, "Reveal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_8f4a7439._.js.map