(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/MainHero.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MainHero",
    ()=>MainHero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
const STATS = [
    {
        value: "8",
        label: "measured features"
    },
    {
        value: "Always",
        label: "shows confidence"
    },
    {
        value: "Free",
        label: "overall score"
    }
];
const HERO_IMAGE = "/woman3.png";
/** Portrait cutout (transparent PNG); frame aspect matches subject crop */ const HERO_ASPECT = "4 / 5";
function MainHero() {
    _s();
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [started, setStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MainHero.useEffect": ()=>{
            const id = window.setTimeout({
                "MainHero.useEffect.id": ()=>setStarted(true)
            }["MainHero.useEffect.id"], 60);
            return ({
                "MainHero.useEffect": ()=>window.clearTimeout(id)
            })["MainHero.useEffect"];
        }
    }["MainHero.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MainHero.useEffect": ()=>{
            const onScroll = {
                "MainHero.useEffect.onScroll": ()=>setScrolled(window.scrollY >= 40)
            }["MainHero.useEffect.onScroll"];
            onScroll();
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            return ({
                "MainHero.useEffect": ()=>window.removeEventListener("scroll", onScroll)
            })["MainHero.useEffect"];
        }
    }["MainHero.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "pb-6 md:pb-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,color] duration-300 ".concat(scrolled ? "border-b border-neutral-200/50 bg-white/85 text-neutral-500 backdrop-blur-md" : "border-b border-transparent bg-transparent text-white"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 md:px-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/main",
                            className: "flex items-center gap-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LogoMark, {}, void 0, false, {
                                    fileName: "[project]/components/MainHero.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[1.35rem] font-semibold tracking-tight",
                                    children: "Zelko"
                                }, void 0, false, {
                                    fileName: "[project]/components/MainHero.tsx",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/MainHero.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "hidden items-center gap-7 text-[0.92rem] lg:flex",
                            children: NAV_LINKS.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: link.href,
                                    className: "transition ".concat(scrolled ? "hover:text-neutral-950" : "hover:text-white/80"),
                                    children: link.label
                                }, link.href, false, {
                                    fileName: "[project]/components/MainHero.tsx",
                                    lineNumber: 58,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/MainHero.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/contact",
                                    className: "hidden rounded-lg border px-4 py-2 text-sm font-medium transition sm:inline-flex ".concat(scrolled ? "border-neutral-900/80 hover:bg-neutral-50" : "border-white/80 hover:bg-white/10"),
                                    children: "Contact Us"
                                }, void 0, false, {
                                    fileName: "[project]/components/MainHero.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    className: "text-sm font-medium transition ".concat(scrolled ? "hover:text-neutral-950" : "hover:text-white/80"),
                                    children: "Log in"
                                }, void 0, false, {
                                    fileName: "[project]/components/MainHero.tsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/MainHero.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/MainHero.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/MainHero.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "beta-hero-panel relative min-h-[88svh] overflow-hidden rounded-b-[2rem] px-6 pb-12 pt-28 text-white md:rounded-b-[2.5rem] md:px-10 md:pb-16 md:pt-32 lg:px-14",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": true,
                        className: "beta-hero-lines pointer-events-none absolute inset-0"
                    }, void 0, false, {
                        fileName: "[project]/components/MainHero.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute inset-x-0 top-[52%] z-[5] flex -translate-y-1/2 justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative h-[70vh] max-h-[78vh] w-auto max-w-[min(92vw,28rem)] ".concat(started ? "opacity-100" : "opacity-0"),
                            style: {
                                aspectRatio: HERO_ASPECT,
                                transition: "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                                transitionDelay: "180ms"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: HERO_IMAGE,
                                    alt: "",
                                    className: "absolute inset-0 h-full w-full object-cover object-center drop-shadow-[0_28px_50px_rgba(40,20,80,0.28)]",
                                    draggable: false
                                }, void 0, false, {
                                    fileName: "[project]/components/MainHero.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkinGlassLens, {
                                    active: started,
                                    imageSrc: HERO_IMAGE
                                }, void 0, false, {
                                    fileName: "[project]/components/MainHero.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/MainHero.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/MainHero.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 mx-auto grid min-h-[calc(88svh-7rem)] max-w-7xl items-center gap-8 lg:grid-cols-[1fr_minmax(14rem,20rem)_1fr] lg:gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "order-2 max-w-md lg:order-1 lg:justify-self-start",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-word mb-5 inline-flex w-fit items-center rounded-full border border-white/35 bg-white/15 px-3.5 py-1.5 text-xs text-white/90 backdrop-blur-sm sm:text-sm ".concat(started ? "is-in" : ""),
                                        children: "Private, explainable analysis"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MainHero.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "hero-word font-[family-name:var(--font-cursive)] text-4xl leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.15rem] ".concat(started ? "is-in" : ""),
                                        style: {
                                            transitionDelay: "120ms"
                                        },
                                        children: [
                                            "Know exactly",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/components/MainHero.tsx",
                                                lineNumber: 140,
                                                columnNumber: 15
                                            }, this),
                                            "what to change."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/MainHero.tsx",
                                        lineNumber: 133,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "hero-word mt-4 text-xl font-normal leading-snug text-white/75 sm:text-2xl ".concat(started ? "is-in" : ""),
                                        style: {
                                            transitionDelay: "220ms"
                                        },
                                        children: "And prove it worked."
                                    }, void 0, false, {
                                        fileName: "[project]/components/MainHero.tsx",
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "hero-word mt-5 max-w-sm text-base leading-relaxed text-white/70 ".concat(started ? "is-in" : ""),
                                        style: {
                                            transitionDelay: "320ms"
                                        },
                                        children: "Every score comes with the reason behind it — no guessing, no percentile, just what's measurable and what to do next."
                                    }, void 0, false, {
                                        fileName: "[project]/components/MainHero.tsx",
                                        lineNumber: 153,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-word mt-8 ".concat(started ? "is-in" : ""),
                                        style: {
                                            transitionDelay: "420ms"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/upload",
                                            className: "inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-white/90",
                                            children: "Start your free report"
                                        }, void 0, false, {
                                            fileName: "[project]/components/MainHero.tsx",
                                            lineNumber: 167,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/MainHero.tsx",
                                        lineNumber: 163,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MainHero.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "order-1 hidden lg:order-2 lg:block",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/components/MainHero.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "order-3 flex flex-col gap-7 lg:justify-self-end lg:pl-4",
                                children: STATS.map((stat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-word hero-word-right ".concat(started ? "is-in" : ""),
                                        style: {
                                            transitionDelay: "".concat(360 + i * 100, "ms")
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-semibold tracking-tight text-white sm:text-[1.65rem]",
                                                children: stat.value
                                            }, void 0, false, {
                                                fileName: "[project]/components/MainHero.tsx",
                                                lineNumber: 187,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 max-w-[9.5rem] text-sm leading-snug text-white/65",
                                                children: stat.label
                                            }, void 0, false, {
                                                fileName: "[project]/components/MainHero.tsx",
                                                lineNumber: 190,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, stat.label, true, {
                                        fileName: "[project]/components/MainHero.tsx",
                                        lineNumber: 182,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/MainHero.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MainHero.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MainHero.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MainHero.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(MainHero, "t2IByInilhjQV7x59VXwiu+QO3E=");
_c = MainHero;
const LENS_ZOOM = 3.4;
const LENS_STOPS = [
    // Lens top-left so the glass center sits on each woman3 feature
    {
        x: 0.42,
        y: 0.28,
        label: "Skin clarity",
        motion: "orbit"
    },
    {
        x: 0.46,
        y: 0.14,
        label: "Forehead tone",
        motion: "sweep"
    },
    {
        x: 0.44,
        y: 0.72,
        label: "Dress style",
        motion: "figure8"
    },
    {
        x: 0.22,
        y: 0.32,
        label: "Hair shape",
        motion: "zigzag"
    },
    {
        x: 0.48,
        y: 0.4,
        label: "Lip definition",
        motion: "bob"
    }
];
/** Visible dwell — includes local pan time around each region */ const DWELL_MS = 7000;
const FADE_MS = 1200;
const ENTER_DELAY_MS = 900;
const PAN_RADIUS_X = 0.045;
const PAN_RADIUS_Y = 0.038;
const PAN_PERIOD_MS = 4500;
function offsetForMotion(motion, t) {
    const angle = t * Math.PI * 2;
    switch(motion){
        case "orbit":
            // Soft clockwise ellipse
            return {
                dx: Math.cos(angle) * PAN_RADIUS_X,
                dy: Math.sin(angle) * PAN_RADIUS_Y
            };
        case "sweep":
            // Slow horizontal arc with a gentle lift
            return {
                dx: Math.sin(angle) * PAN_RADIUS_X * 1.35,
                dy: Math.sin(angle * 2) * PAN_RADIUS_Y * 0.45
            };
        case "figure8":
            // Lemniscate — crosses through the center
            return {
                dx: Math.sin(angle) * PAN_RADIUS_X * 1.15,
                dy: Math.sin(angle * 2) * PAN_RADIUS_Y * 0.85
            };
        case "bob":
            // Mostly vertical pulse with a slight sway
            return {
                dx: Math.sin(angle * 0.5) * PAN_RADIUS_X * 0.4,
                dy: Math.sin(angle) * PAN_RADIUS_Y * 1.25
            };
        case "zigzag":
            // Diagonal back-and-forth
            return {
                dx: Math.sin(angle) * PAN_RADIUS_X * 1.1,
                dy: Math.cos(angle * 2) * PAN_RADIUS_Y * 0.9
            };
    }
}
function SkinGlassLens(param) {
    let { active, imageSrc } = param;
    _s1();
    const lensRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const zoomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [label, setLabel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(LENS_STOPS[0].label);
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SkinGlassLens.useEffect": ()=>{
            if (!active) return;
            const id = window.setTimeout({
                "SkinGlassLens.useEffect.id": ()=>setReady(true)
            }["SkinGlassLens.useEffect.id"], 80);
            return ({
                "SkinGlassLens.useEffect": ()=>window.clearTimeout(id)
            })["SkinGlassLens.useEffect"];
        }
    }["SkinGlassLens.useEffect"], [
        active
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SkinGlassLens.useEffect": ()=>{
            if (!ready) return;
            const lens = lensRef.current;
            const zoom = zoomRef.current;
            const parent = lens === null || lens === void 0 ? void 0 : lens.parentElement;
            if (!lens || !zoom || !parent) return;
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            let cancelled = false;
            let fadeTimer = 0;
            let dwellTimer = 0;
            let raf = 0;
            let stopIndex = 0;
            const placeAt = {
                "SkinGlassLens.useEffect.placeAt": (xFrac, yFrac)=>{
                    const pw = parent.clientWidth;
                    const ph = parent.clientHeight;
                    const size = lens.offsetWidth;
                    const left = xFrac * pw;
                    const top = yFrac * ph;
                    const cx = left + size / 2;
                    const cy = top + size / 2;
                    lens.style.left = "".concat(left, "px");
                    lens.style.top = "".concat(top, "px");
                    zoom.style.width = "".concat(pw * LENS_ZOOM, "px");
                    zoom.style.height = "".concat(ph * LENS_ZOOM, "px");
                    zoom.style.left = "".concat(size / 2 - cx * LENS_ZOOM, "px");
                    zoom.style.top = "".concat(size / 2 - cy * LENS_ZOOM, "px");
                }
            }["SkinGlassLens.useEffect.placeAt"];
            const stopPan = {
                "SkinGlassLens.useEffect.stopPan": ()=>{
                    if (raf) {
                        window.cancelAnimationFrame(raf);
                        raf = 0;
                    }
                }
            }["SkinGlassLens.useEffect.stopPan"];
            const startPan = {
                "SkinGlassLens.useEffect.startPan": (stop)=>{
                    stopPan();
                    if (reduced) {
                        placeAt(stop.x, stop.y);
                        return;
                    }
                    const origin = performance.now();
                    const tick = {
                        "SkinGlassLens.useEffect.startPan.tick": (now)=>{
                            if (cancelled) return;
                            const t = (now - origin) % PAN_PERIOD_MS / PAN_PERIOD_MS;
                            const { dx, dy } = offsetForMotion(stop.motion, t);
                            placeAt(stop.x + dx, stop.y + dy);
                            raf = window.requestAnimationFrame(tick);
                        }
                    }["SkinGlassLens.useEffect.startPan.tick"];
                    raf = window.requestAnimationFrame(tick);
                }
            }["SkinGlassLens.useEffect.startPan"];
            const showStop = {
                "SkinGlassLens.useEffect.showStop": (index)=>{
                    if (cancelled) return;
                    const stop = LENS_STOPS[index];
                    placeAt(stop.x, stop.y);
                    setLabel(stop.label);
                    setVisible(true);
                    startPan(stop);
                    if (reduced) return;
                    dwellTimer = window.setTimeout({
                        "SkinGlassLens.useEffect.showStop": ()=>{
                            if (cancelled) return;
                            stopPan();
                            placeAt(stop.x, stop.y);
                            setVisible(false);
                            fadeTimer = window.setTimeout({
                                "SkinGlassLens.useEffect.showStop": ()=>{
                                    if (cancelled) return;
                                    stopIndex = (index + 1) % LENS_STOPS.length;
                                    showStop(stopIndex);
                                }
                            }["SkinGlassLens.useEffect.showStop"], FADE_MS);
                        }
                    }["SkinGlassLens.useEffect.showStop"], DWELL_MS);
                }
            }["SkinGlassLens.useEffect.showStop"];
            placeAt(LENS_STOPS[0].x, LENS_STOPS[0].y);
            setLabel(LENS_STOPS[0].label);
            fadeTimer = window.setTimeout({
                "SkinGlassLens.useEffect": ()=>showStop(0)
            }["SkinGlassLens.useEffect"], ENTER_DELAY_MS);
            const onResize = {
                "SkinGlassLens.useEffect.onResize": ()=>{
                    const stop = LENS_STOPS[stopIndex];
                    placeAt(stop.x, stop.y);
                }
            }["SkinGlassLens.useEffect.onResize"];
            window.addEventListener("resize", onResize);
            return ({
                "SkinGlassLens.useEffect": ()=>{
                    cancelled = true;
                    stopPan();
                    window.clearTimeout(fadeTimer);
                    window.clearTimeout(dwellTimer);
                    window.removeEventListener("resize", onResize);
                }
            })["SkinGlassLens.useEffect"];
        }
    }["SkinGlassLens.useEffect"], [
        ready
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: lensRef,
        className: "skin-glass-lens pointer-events-none absolute z-20 ".concat(active && visible ? "is-active" : ""),
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "skin-glass-lens__ring",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "skin-glass-lens__zoom",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            ref: zoomRef,
                            src: imageSrc,
                            alt: "",
                            className: "skin-glass-lens__zoom-img",
                            draggable: false
                        }, void 0, false, {
                            fileName: "[project]/components/MainHero.tsx",
                            lineNumber: 399,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/MainHero.tsx",
                        lineNumber: 397,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "skin-glass-lens__glare"
                    }, void 0, false, {
                        fileName: "[project]/components/MainHero.tsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MainHero.tsx",
                lineNumber: 396,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "skin-glass-lens__label",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/MainHero.tsx",
                lineNumber: 409,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MainHero.tsx",
        lineNumber: 389,
        columnNumber: 5
    }, this);
}
_s1(SkinGlassLens, "wvJLLg1dM4HwLfeHpFjlvUkzP2Y=");
_c1 = SkinGlassLens;
function LogoMark() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "22",
        height: "22",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": true,
        className: "text-[#ebe4ff]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 2.5 13.8 8.2 19.5 10 13.8 11.8 12 17.5 10.2 11.8 4.5 10 10.2 8.2 12 2.5Z",
                fill: "currentColor",
                opacity: "0.95"
            }, void 0, false, {
                fileName: "[project]/components/MainHero.tsx",
                lineNumber: 424,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M18.2 14.2 19 16.6 21.4 17.4 19 18.2 18.2 20.6 17.4 18.2 15 17.4 17.4 16.6 18.2 14.2Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/MainHero.tsx",
                lineNumber: 429,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6.4 15.1 7 17 8.9 17.6 7 18.2 6.4 20.1 5.8 18.2 3.9 17.6 5.8 17 6.4 15.1Z",
                fill: "currentColor",
                opacity: "0.85"
            }, void 0, false, {
                fileName: "[project]/components/MainHero.tsx",
                lineNumber: 433,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MainHero.tsx",
        lineNumber: 416,
        columnNumber: 5
    }, this);
}
_c2 = LogoMark;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "MainHero");
__turbopack_context__.k.register(_c1, "SkinGlassLens");
__turbopack_context__.k.register(_c2, "LogoMark");
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

//# sourceMappingURL=components_4b2426a6._.js.map