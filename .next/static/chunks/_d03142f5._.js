(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/site-nav.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SITE_NAV",
    ()=>SITE_NAV
]);
const SITE_NAV = [
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/site/SiteHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteHeader",
    ()=>SiteHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$nav$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/site-nav.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function SiteHeader(param) {
    let { variant = "solid" } = param;
    _s();
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [started, setStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            const id = window.setTimeout({
                "SiteHeader.useEffect.id": ()=>setStarted(true)
            }["SiteHeader.useEffect.id"], 40);
            return ({
                "SiteHeader.useEffect": ()=>window.clearTimeout(id)
            })["SiteHeader.useEffect"];
        }
    }["SiteHeader.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            const onScroll = {
                "SiteHeader.useEffect.onScroll": ()=>setScrolled(window.scrollY >= 30)
            }["SiteHeader.useEffect.onScroll"];
            onScroll();
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            return ({
                "SiteHeader.useEffect": ()=>window.removeEventListener("scroll", onScroll)
            })["SiteHeader.useEffect"];
        }
    }["SiteHeader.useEffect"], []);
    const frosted = variant === "solid" || scrolled ? "border-b border-neutral-200/40 bg-[color-mix(in_srgb,var(--hero-surface)_78%,transparent)] backdrop-blur-sm" : "border-b border-transparent bg-transparent";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ".concat(frosted),
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
                            fileName: "[project]/components/site/SiteHeader.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[1.35rem] font-semibold tracking-tight text-neutral-950",
                            children: "Zelko"
                        }, void 0, false, {
                            fileName: "[project]/components/site/SiteHeader.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/site/SiteHeader.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "hidden items-center gap-7 text-[0.92rem] text-neutral-700 lg:flex",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$nav$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_NAV"].map((link, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: link.href,
                            className: "hero-word transition hover:text-neutral-950 ".concat(started ? "is-in" : ""),
                            style: {
                                transitionDelay: "".concat(120 + i * 70, "ms")
                            },
                            children: link.label
                        }, link.href, false, {
                            fileName: "[project]/components/site/SiteHeader.tsx",
                            lineNumber: 50,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/site/SiteHeader.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/contact",
                            className: "hero-word hidden rounded-lg border border-neutral-900/80 px-4 py-2 text-sm font-medium transition hover:bg-white/50 sm:inline-flex ".concat(started ? "is-in" : ""),
                            style: {
                                transitionDelay: "".concat(120 + __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$nav$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_NAV"].length * 70 + 40, "ms")
                            },
                            children: "Contact Us"
                        }, void 0, false, {
                            fileName: "[project]/components/site/SiteHeader.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/login",
                            className: "hero-word text-sm font-medium text-neutral-800 transition hover:text-neutral-950 ".concat(started ? "is-in" : ""),
                            style: {
                                transitionDelay: "".concat(120 + __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$nav$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_NAV"].length * 70 + 110, "ms")
                            },
                            children: "Log in"
                        }, void 0, false, {
                            fileName: "[project]/components/site/SiteHeader.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/site/SiteHeader.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/site/SiteHeader.tsx",
            lineNumber: 36,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/site/SiteHeader.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(SiteHeader, "t2IByInilhjQV7x59VXwiu+QO3E=");
_c = SiteHeader;
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
                fileName: "[project]/components/site/SiteHeader.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M18.2 14.2 19 16.6 21.4 17.4 19 18.2 18.2 20.6 17.4 18.2 15 17.4 17.4 16.6 18.2 14.2Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/site/SiteHeader.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6.4 15.1 7 17 8.9 17.6 7 18.2 6.4 20.1 5.8 18.2 3.9 17.6 5.8 17 6.4 15.1Z",
                fill: "currentColor",
                opacity: "0.85"
            }, void 0, false, {
                fileName: "[project]/components/site/SiteHeader.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/site/SiteHeader.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_c1 = LogoMark;
var _c, _c1;
__turbopack_context__.k.register(_c, "SiteHeader");
__turbopack_context__.k.register(_c1, "LogoMark");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/site/SiteFooter.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteFooter",
    ()=>SiteFooter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$nav$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/site-nav.ts [app-client] (ecmascript)");
;
;
;
function SiteFooter() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "border-t border-neutral-200 bg-[var(--hero-surface)] px-6 py-16 md:px-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.2fr_1fr_1fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-[family-name:var(--font-cursive)] text-3xl text-neutral-950",
                                children: "Zelko"
                            }, void 0, false, {
                                fileName: "[project]/components/site/SiteFooter.tsx",
                                lineNumber: 9,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 max-w-sm text-sm leading-relaxed text-neutral-500",
                                children: "Assess measurable features. Act on ranked recommendations. Prove cause-linked change — privately."
                            }, void 0, false, {
                                fileName: "[project]/components/site/SiteFooter.tsx",
                                lineNumber: 12,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/upload",
                                className: "mt-6 inline-flex rounded-xl bg-[#ebe4ff] px-5 py-3 text-sm font-medium text-neutral-900 transition hover:bg-[#e0d6ff]",
                                children: "Start your free report"
                            }, void 0, false, {
                                fileName: "[project]/components/site/SiteFooter.tsx",
                                lineNumber: 16,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/site/SiteFooter.tsx",
                        lineNumber: 8,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs uppercase tracking-[0.18em] text-neutral-400",
                                children: "Navigate"
                            }, void 0, false, {
                                fileName: "[project]/components/site/SiteFooter.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-4 space-y-2.5",
                                children: [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$nav$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_NAV"].map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: link.href,
                                                className: "text-sm text-neutral-700 transition hover:text-neutral-950",
                                                children: link.label
                                            }, void 0, false, {
                                                fileName: "[project]/components/site/SiteFooter.tsx",
                                                lineNumber: 31,
                                                columnNumber: 17
                                            }, this)
                                        }, link.href, false, {
                                            fileName: "[project]/components/site/SiteFooter.tsx",
                                            lineNumber: 30,
                                            columnNumber: 15
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/upload",
                                            className: "text-sm text-neutral-700 transition hover:text-neutral-950",
                                            children: "Upload"
                                        }, void 0, false, {
                                            fileName: "[project]/components/site/SiteFooter.tsx",
                                            lineNumber: 40,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/site/SiteFooter.tsx",
                                        lineNumber: 39,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/site/SiteFooter.tsx",
                                lineNumber: 28,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/site/SiteFooter.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs uppercase tracking-[0.18em] text-neutral-400",
                                children: "Product"
                            }, void 0, false, {
                                fileName: "[project]/components/site/SiteFooter.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-4 space-y-2.5 text-sm text-neutral-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Assess → Act → Prove"
                                    }, void 0, false, {
                                        fileName: "[project]/components/site/SiteFooter.tsx",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "8 measurable features"
                                    }, void 0, false, {
                                        fileName: "[project]/components/site/SiteFooter.tsx",
                                        lineNumber: 56,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Photos deleted by default"
                                    }, void 0, false, {
                                        fileName: "[project]/components/site/SiteFooter.tsx",
                                        lineNumber: 57,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/contact",
                                            className: "transition hover:text-neutral-950",
                                            children: "Contact"
                                        }, void 0, false, {
                                            fileName: "[project]/components/site/SiteFooter.tsx",
                                            lineNumber: 59,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/site/SiteFooter.tsx",
                                        lineNumber: 58,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/site/SiteFooter.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/site/SiteFooter.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/site/SiteFooter.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto mt-14 flex max-w-7xl flex-col gap-2 border-t border-neutral-200/80 pt-6 text-xs text-neutral-400 sm:flex-row sm:justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "© ",
                            new Date().getFullYear(),
                            " Zelko. All rights reserved."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/site/SiteFooter.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "No percentiles. No unmeasurable traits. Explainable only."
                    }, void 0, false, {
                        fileName: "[project]/components/site/SiteFooter.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/site/SiteFooter.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/site/SiteFooter.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
_c = SiteFooter;
var _c;
__turbopack_context__.k.register(_c, "SiteFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/consent.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Privacy consent — PRODUCT.md:
 * Default analyze → report → delete source photos.
 * Opt-in to retain for tracking. Separate opt-in for training.
 */ __turbopack_context__.s([
    "CONSENT_STORAGE_KEY",
    ()=>CONSENT_STORAGE_KEY,
    "clearStoredConsent",
    ()=>clearStoredConsent,
    "defaultConsentDraft",
    ()=>defaultConsentDraft,
    "readStoredConsent",
    ()=>readStoredConsent,
    "writeStoredConsent",
    ()=>writeStoredConsent
]);
const CONSENT_STORAGE_KEY = "zelko.uploadConsent";
function defaultConsentDraft() {
    return {
        analysisAcknowledged: false,
        retainForTracking: false,
        allowTraining: false
    };
}
function readStoredConsent() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = sessionStorage.getItem(CONSENT_STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!(parsed === null || parsed === void 0 ? void 0 : parsed.analysisAcknowledged) || !parsed.acceptedAt) return null;
        return parsed;
    } catch (e) {
        return null;
    }
}
function writeStoredConsent(consent) {
    sessionStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
}
function clearStoredConsent() {
    sessionStorage.removeItem(CONSENT_STORAGE_KEY);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ConsentGate.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConsentGate",
    ()=>ConsentGate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$consent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/consent.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ConsentGate(param) {
    let { onAccepted } = param;
    _s();
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$consent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultConsentDraft"]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    function toggle(key) {
        setDraft((prev)=>({
                ...prev,
                [key]: !prev[key]
            }));
        setError(null);
    }
    function submit() {
        if (!draft.analysisAcknowledged) {
            setError("Confirm analysis consent to continue.");
            return;
        }
        const consent = {
            ...draft,
            acceptedAt: new Date().toISOString()
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$consent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeStoredConsent"])(consent);
        onAccepted(consent);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-3xl border border-neutral-200/70 bg-white/75 p-4 shadow-[0_20px_60px_-40px_rgba(40,20,80,0.45)] backdrop-blur-md sm:p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px] uppercase tracking-[0.2em] text-neutral-400",
                children: "Privacy first"
            }, void 0, false, {
                fileName: "[project]/components/ConsentGate.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "mt-1.5 text-lg font-semibold tracking-tight text-neutral-950 sm:text-xl",
                children: "Consent before processing"
            }, void 0, false, {
                fileName: "[project]/components/ConsentGate.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1.5 text-[13px] leading-snug text-neutral-500",
                children: "Analyze → report → delete by default. Tracking and training are opt-in."
            }, void 0, false, {
                fileName: "[project]/components/ConsentGate.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-4 space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ConsentRow, {
                        required: true,
                        checked: draft.analysisAcknowledged,
                        onChange: ()=>toggle("analysisAcknowledged"),
                        title: "Run analysis on my photos",
                        body: "Landmarks and measurable features for your report."
                    }, void 0, false, {
                        fileName: "[project]/components/ConsentGate.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ConsentRow, {
                        checked: draft.retainForTracking,
                        onChange: ()=>toggle("retainForTracking"),
                        title: "Retain photos for tracking",
                        body: "Keep sources for paid change comparisons. Off by default."
                    }, void 0, false, {
                        fileName: "[project]/components/ConsentGate.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ConsentRow, {
                        checked: draft.allowTraining,
                        onChange: ()=>toggle("allowTraining"),
                        title: "Allow training on my images",
                        body: "Never used for training unless you opt in."
                    }, void 0, false, {
                        fileName: "[project]/components/ConsentGate.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ConsentGate.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 rounded-xl bg-[var(--danger-soft)] px-3 py-2 text-sm text-[var(--danger)]",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/ConsentGate.tsx",
                lineNumber: 72,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: submit,
                className: "mt-4 w-full rounded-2xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-95",
                children: "Continue to upload"
            }, void 0, false, {
                fileName: "[project]/components/ConsentGate.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-center text-[11px] text-neutral-400",
                children: "You can change retention later before analysis completes."
            }, void 0, false, {
                fileName: "[project]/components/ConsentGate.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ConsentGate.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(ConsentGate, "l0chal9M+e14GB8nBUaS+A9obuY=");
_c = ConsentGate;
function ConsentRow(param) {
    let { checked, onChange, title, body, required } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex cursor-pointer gap-2.5 rounded-2xl border border-neutral-200/90 bg-[var(--hero-surface)]/60 px-3 py-2.5 transition hover:border-neutral-300",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "checkbox",
                    checked: checked,
                    onChange: onChange,
                    className: "mt-0.5 size-4 shrink-0 rounded border-neutral-300 accent-[var(--accent)]"
                }, void 0, false, {
                    fileName: "[project]/components/ConsentGate.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "min-w-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex flex-wrap items-center gap-1.5 text-[13px] font-semibold text-neutral-950",
                            children: [
                                title,
                                required ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "rounded-full bg-[var(--accent-soft)] px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--accent)]",
                                    children: "Required"
                                }, void 0, false, {
                                    fileName: "[project]/components/ConsentGate.tsx",
                                    lineNumber: 118,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-400",
                                    children: "Optional"
                                }, void 0, false, {
                                    fileName: "[project]/components/ConsentGate.tsx",
                                    lineNumber: 122,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ConsentGate.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "mt-0.5 block text-[12px] leading-snug text-neutral-500",
                            children: body
                        }, void 0, false, {
                            fileName: "[project]/components/ConsentGate.tsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ConsentGate.tsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ConsentGate.tsx",
            lineNumber: 107,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ConsentGate.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
}
_c1 = ConsentRow;
var _c, _c1;
__turbopack_context__.k.register(_c, "ConsentGate");
__turbopack_context__.k.register(_c1, "ConsentRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/mediapipe.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Client-side MediaPipe Face Landmarker.
 * The task model returns 478 points (468 face mesh + 10 iris). We keep the
 * classic 468-point mesh per PRODUCT.md and log that array to the console.
 */ __turbopack_context__.s([
    "extractFaceLandmarks",
    ()=>extractFaceLandmarks,
    "extractFaceLandmarksFromFile",
    ()=>extractFaceLandmarksFromFile
]);
const FACE_MESH_COUNT = 468;
let faceLandmarkerPromise = null;
async function getFaceLandmarker() {
    if (!faceLandmarkerPromise) {
        faceLandmarkerPromise = (async ()=>{
            const { FaceLandmarker, FilesetResolver } = await __turbopack_context__.A("[project]/node_modules/@mediapipe/tasks-vision/vision_bundle.mjs [app-client] (ecmascript, async loader)");
            const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm");
            const baseOptions = {
                modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task"
            };
            const shared = {
                runningMode: "IMAGE",
                numFaces: 1,
                outputFaceBlendshapes: false,
                outputFacialTransformationMatrixes: false
            };
            try {
                return await FaceLandmarker.createFromOptions(vision, {
                    ...shared,
                    baseOptions: {
                        ...baseOptions,
                        delegate: "GPU"
                    }
                });
            } catch (e) {
                return FaceLandmarker.createFromOptions(vision, {
                    ...shared,
                    baseOptions: {
                        ...baseOptions,
                        delegate: "CPU"
                    }
                });
            }
        })();
    }
    return faceLandmarkerPromise;
}
async function extractFaceLandmarks(image) {
    const landmarker = await getFaceLandmarker();
    const result = landmarker.detect(image);
    var _result_faceLandmarks_;
    const raw = (_result_faceLandmarks_ = result.faceLandmarks[0]) !== null && _result_faceLandmarks_ !== void 0 ? _result_faceLandmarks_ : null;
    const landmarks = raw ? raw.slice(0, FACE_MESH_COUNT) : null;
    var _raw_length, _landmarks_length;
    console.log("[MediaPipe] face landmark output (468-point mesh):", {
        faceCount: result.faceLandmarks.length,
        rawLandmarkCount: (_raw_length = raw === null || raw === void 0 ? void 0 : raw.length) !== null && _raw_length !== void 0 ? _raw_length : 0,
        landmarkCount: (_landmarks_length = landmarks === null || landmarks === void 0 ? void 0 : landmarks.length) !== null && _landmarks_length !== void 0 ? _landmarks_length : 0,
        landmarks
    });
    return landmarks;
}
async function extractFaceLandmarksFromFile(file) {
    const bitmap = await createImageBitmap(file);
    try {
        return await extractFaceLandmarks(bitmap);
    } finally{
        bitmap.close();
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/distress-check.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * STUB — lightweight distress-language check for optional upload free-text.
 *
 * TODO(replace): Swap this keyword/pattern stub for a more robust classifier
 * (or moderated LLM safety pass) before production. Keep the return shape stable
 * so call sites only need a boolean + optional matched pattern for logging.
 *
 * Intent: catch genuine emotional distress / hopelessness / harsh self-attack,
 * NOT ordinary feature requests like "I want clearer skin" or "fix my jawline".
 */ __turbopack_context__.s([
    "checkDistressLanguage",
    ()=>checkDistressLanguage
]);
const DISTRESS_PATTERNS = [
    {
        id: "hopelessness",
        re: /\b(want to die|kill myself|end (it|my life)|no reason to (live|go on)|better off dead)\b/i
    },
    {
        id: "self_harm",
        re: /\b(self[- ]?harm|cut(ting)? myself|hurt myself)\b/i
    },
    {
        id: "severe_self_attack",
        re: /\b(i('m| am) (worthless|disgusting|unlovable|a (monster|failure|freak))|hate (myself|my (face|body|life|existence)))\b/i
    },
    {
        id: "despair",
        re: /\b(nothing will (ever )?help|i('ll| will) never (be|look) (ok|okay|good|enough)|give up on (myself|life))\b/i
    },
    {
        id: "crisis_help_seek",
        re: /\b(can'?t (go|keep) (on|going)|don'?t want to (be here|exist)|everyone (hates|would be better without) me)\b/i
    }
];
function checkDistressLanguage(text) {
    if (!(text === null || text === void 0 ? void 0 : text.trim())) return {
        flagged: false
    };
    const normalized = text.replace(/\s+/g, " ").trim();
    for (const { id, re } of DISTRESS_PATTERNS){
        if (re.test(normalized)) {
            return {
                flagged: true,
                matchedPattern: id
            };
        }
    }
    return {
        flagged: false
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/personalization.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Optional upload personalization — priority tags only (not photo_quality).
 * Photo quality remains an internal gate per PRODUCT.md; users don't "opt into" it.
 */ __turbopack_context__.s([
    "PRIORITY_FEATURE_KEYS",
    ()=>PRIORITY_FEATURE_KEYS,
    "PRIORITY_FEATURE_OPTIONS",
    ()=>PRIORITY_FEATURE_OPTIONS,
    "USER_NOTE_MAX_LENGTH",
    ()=>USER_NOTE_MAX_LENGTH,
    "isPriorityFeatureKey",
    ()=>isPriorityFeatureKey,
    "sanitizePriorityFeatures",
    ()=>sanitizePriorityFeatures,
    "sanitizeUserNote",
    ()=>sanitizeUserNote
]);
const PRIORITY_FEATURE_OPTIONS = [
    {
        key: "face_symmetry",
        label: "Face symmetry"
    },
    {
        key: "facial_proportions",
        label: "Facial proportions"
    },
    {
        key: "skin_clarity",
        label: "Skin clarity"
    },
    {
        key: "jawline_definition",
        label: "Jawline definition"
    },
    {
        key: "eyebrow_shape",
        label: "Eyebrow shape"
    },
    {
        key: "eye_spacing",
        label: "Eye spacing"
    },
    {
        key: "grooming_signal",
        label: "Grooming"
    }
];
const PRIORITY_FEATURE_KEYS = PRIORITY_FEATURE_OPTIONS.map(_c = (o)=>o.key);
_c1 = PRIORITY_FEATURE_KEYS;
const USER_NOTE_MAX_LENGTH = 300;
function isPriorityFeatureKey(value) {
    return typeof value === "string" && PRIORITY_FEATURE_KEYS.includes(value);
}
function sanitizePriorityFeatures(input) {
    if (!Array.isArray(input)) return [];
    const seen = new Set();
    for (const item of input){
        if (isPriorityFeatureKey(item)) seen.add(item);
    }
    return [
        ...seen
    ];
}
function sanitizeUserNote(input) {
    if (typeof input !== "string") return null;
    const trimmed = input.trim().slice(0, USER_NOTE_MAX_LENGTH);
    return trimmed.length > 0 ? trimmed : null;
}
var _c, _c1;
__turbopack_context__.k.register(_c, "PRIORITY_FEATURE_KEYS$PRIORITY_FEATURE_OPTIONS.map");
__turbopack_context__.k.register(_c1, "PRIORITY_FEATURE_KEYS");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/PhotoUpload.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PhotoUpload",
    ()=>PhotoUpload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mediapipe$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mediapipe.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$distress$2d$check$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/distress-check.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$personalization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/personalization.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const MIN_PHOTOS = 3;
const MAX_PHOTOS = 5;
async function stubQualityCheck(_file) {
    void _file;
    await new Promise((r)=>setTimeout(r, 400));
    return {
        accepted: true
    };
}
function makeId() {
    return "".concat(Date.now(), "-").concat(Math.random().toString(36).slice(2, 9));
}
function formatBytes(bytes) {
    if (bytes < 1024) return "".concat(bytes, " b");
    if (bytes < 1024 * 1024) return "".concat((bytes / 1024).toFixed(2), " kb");
    return "".concat((bytes / (1024 * 1024)).toFixed(2), " mb");
}
function fileKindLabel(file) {
    const name = file.name.toLowerCase();
    if (name.endsWith(".jpg")) return "JPG";
    if (name.endsWith(".jpeg")) return "JPEG";
    if (name.endsWith(".png")) return "PNG";
    if (name.endsWith(".webp") || file.type === "image/webp") return "WEBP";
    if (file.type === "image/png") return "PNG";
    return "JPEG";
}
function PhotoUpload(param) {
    let { consent } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [slots, setSlots] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dragging, setDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [uploadingBatch, setUploadingBatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [analyzing, setAnalyzing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [priorityFeatures, setPriorityFeatures] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [userNote, setUserNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [supportMode, setSupportMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const updateSlot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PhotoUpload.useCallback[updateSlot]": (id, patch)=>{
            setSlots({
                "PhotoUpload.useCallback[updateSlot]": (prev)=>prev.map({
                        "PhotoUpload.useCallback[updateSlot]": (s)=>s.id === id ? {
                                ...s,
                                ...patch
                            } : s
                    }["PhotoUpload.useCallback[updateSlot]"])
            }["PhotoUpload.useCallback[updateSlot]"]);
        }
    }["PhotoUpload.useCallback[updateSlot]"], []);
    const togglePriority = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PhotoUpload.useCallback[togglePriority]": (key)=>{
            setPriorityFeatures({
                "PhotoUpload.useCallback[togglePriority]": (prev)=>prev.includes(key) ? prev.filter({
                        "PhotoUpload.useCallback[togglePriority]": (k)=>k !== key
                    }["PhotoUpload.useCallback[togglePriority]"]) : [
                        ...prev,
                        key
                    ]
            }["PhotoUpload.useCallback[togglePriority]"]);
        }
    }["PhotoUpload.useCallback[togglePriority]"], []);
    const processFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PhotoUpload.useCallback[processFile]": async (slot)=>{
            updateSlot(slot.id, {
                status: "uploading"
            });
            try {
                const formData = new FormData();
                formData.append("file", slot.file);
                formData.append("retainForTracking", String(consent.retainForTracking));
                formData.append("allowTraining", String(consent.allowTraining));
                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData
                });
                const data = await res.json();
                if (!res.ok || !data.fileId) {
                    var _data_error;
                    updateSlot(slot.id, {
                        status: "rejected",
                        rejectReason: (_data_error = data.error) !== null && _data_error !== void 0 ? _data_error : "Upload failed."
                    });
                    return;
                }
                updateSlot(slot.id, {
                    status: "quality-check-pending",
                    fileId: data.fileId
                });
                let landmarks = null;
                try {
                    landmarks = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mediapipe$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractFaceLandmarksFromFile"])(slot.file);
                } catch (err) {
                    console.error("[MediaPipe] landmark extraction failed:", err);
                }
                const quality = await stubQualityCheck(slot.file);
                if (quality.accepted) {
                    updateSlot(slot.id, {
                        status: "accepted",
                        landmarks
                    });
                } else {
                    updateSlot(slot.id, {
                        status: "rejected",
                        rejectReason: quality.reason,
                        landmarks
                    });
                }
            } catch (err) {
                updateSlot(slot.id, {
                    status: "rejected",
                    rejectReason: err instanceof Error ? err.message : "Unexpected upload error."
                });
            }
        }
    }["PhotoUpload.useCallback[processFile]"], [
        consent.allowTraining,
        consent.retainForTracking,
        updateSlot
    ]);
    const addFiles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PhotoUpload.useCallback[addFiles]": (fileList)=>{
            if (!(fileList === null || fileList === void 0 ? void 0 : fileList.length)) return;
            setError(null);
            const incoming = Array.from(fileList).filter({
                "PhotoUpload.useCallback[addFiles].incoming": (f)=>[
                        "image/jpeg",
                        "image/jpg",
                        "image/png",
                        "image/webp"
                    ].includes(f.type)
            }["PhotoUpload.useCallback[addFiles].incoming"]);
            setSlots({
                "PhotoUpload.useCallback[addFiles]": (prev)=>{
                    const room = MAX_PHOTOS - prev.length;
                    if (room <= 0) {
                        setError("Maximum ".concat(MAX_PHOTOS, " photos."));
                        return prev;
                    }
                    const toAdd = incoming.slice(0, room).map({
                        "PhotoUpload.useCallback[addFiles].toAdd": (file)=>({
                                id: makeId(),
                                file,
                                previewUrl: URL.createObjectURL(file),
                                status: "idle"
                            })
                    }["PhotoUpload.useCallback[addFiles].toAdd"]);
                    if (incoming.length > room) {
                        setError("Only ".concat(room, " more photo(s) allowed (max ").concat(MAX_PHOTOS, ")."));
                    }
                    return [
                        ...prev,
                        ...toAdd
                    ];
                }
            }["PhotoUpload.useCallback[addFiles]"]);
        }
    }["PhotoUpload.useCallback[addFiles]"], []);
    const removeSlot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PhotoUpload.useCallback[removeSlot]": (id)=>{
            setSlots({
                "PhotoUpload.useCallback[removeSlot]": (prev)=>{
                    const target = prev.find({
                        "PhotoUpload.useCallback[removeSlot].target": (s)=>s.id === id
                    }["PhotoUpload.useCallback[removeSlot].target"]);
                    if (target) URL.revokeObjectURL(target.previewUrl);
                    return prev.filter({
                        "PhotoUpload.useCallback[removeSlot]": (s)=>s.id !== id
                    }["PhotoUpload.useCallback[removeSlot]"]);
                }
            }["PhotoUpload.useCallback[removeSlot]"]);
        }
    }["PhotoUpload.useCallback[removeSlot]"], []);
    const uploadPending = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PhotoUpload.useCallback[uploadPending]": async ()=>{
            const pending = slots.filter({
                "PhotoUpload.useCallback[uploadPending].pending": (s)=>s.status === "idle"
            }["PhotoUpload.useCallback[uploadPending].pending"]);
            if (pending.length === 0) {
                setError("Add at least one image before uploading.");
                return;
            }
            setError(null);
            setUploadingBatch(true);
            try {
                for (const slot of pending){
                    await processFile(slot);
                }
            } finally{
                setUploadingBatch(false);
            }
        }
    }["PhotoUpload.useCallback[uploadPending]"], [
        processFile,
        slots
    ]);
    const runAnalysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PhotoUpload.useCallback[runAnalysis]": async ()=>{
            var _accepted_;
            const accepted = slots.filter({
                "PhotoUpload.useCallback[runAnalysis].accepted": (s)=>s.status === "accepted" && s.fileId
            }["PhotoUpload.useCallback[runAnalysis].accepted"]);
            const fileIds = accepted.map({
                "PhotoUpload.useCallback[runAnalysis].fileIds": (s)=>s.fileId
            }["PhotoUpload.useCallback[runAnalysis].fileIds"]);
            if (fileIds.length < MIN_PHOTOS) {
                setError("Need at least ".concat(MIN_PHOTOS, " accepted photos to analyze."));
                return;
            }
            const note = userNote.trim().slice(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$personalization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_NOTE_MAX_LENGTH"]);
            // Client-side distress stub — never feed flagged text into prioritization.
            // TODO(replace): same stub as backend; swap for a stronger check later.
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$distress$2d$check$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkDistressLanguage"])(note).flagged) {
                setSupportMode(true);
                setError(null);
                return;
            }
            var _accepted__landmarks;
            // Portrait landmarks = first accepted photo (same as portraitFileId).
            const portraitLandmarks = (_accepted__landmarks = (_accepted_ = accepted[0]) === null || _accepted_ === void 0 ? void 0 : _accepted_.landmarks) !== null && _accepted__landmarks !== void 0 ? _accepted__landmarks : null;
            setError(null);
            setAnalyzing(true);
            try {
                var _data_report;
                const res = await fetch("/api/analyze", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        fileIds,
                        retainForTracking: consent.retainForTracking,
                        allowTraining: consent.allowTraining,
                        priorityFeatures,
                        userNote: note.length > 0 ? note : null,
                        landmarks: portraitLandmarks
                    })
                });
                const data = await res.json();
                if (data.supportRequired) {
                    setSupportMode(true);
                    return;
                }
                if (!res.ok || !((_data_report = data.report) === null || _data_report === void 0 ? void 0 : _data_report.id)) {
                    var _data_error;
                    setError((_data_error = data.error) !== null && _data_error !== void 0 ? _data_error : "Analysis failed.");
                    return;
                }
                // Generic navigation only — never echo userNote in confirmation copy.
                router.push("/report/".concat(data.report.id));
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unexpected analysis error.");
            } finally{
                setAnalyzing(false);
            }
        }
    }["PhotoUpload.useCallback[runAnalysis]"], [
        consent.allowTraining,
        consent.retainForTracking,
        priorityFeatures,
        router,
        slots,
        userNote
    ]);
    const acceptedCount = slots.filter((s)=>s.status === "accepted").length;
    const canAddMore = slots.length < MAX_PHOTOS;
    const hasIdle = slots.some((s)=>s.status === "idle");
    const readyToAnalyze = acceptedCount >= MIN_PHOTOS && !hasIdle;
    if (supportMode) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SupportPauseCard, {}, void 0, false, {
            fileName: "[project]/components/PhotoUpload.tsx",
            lineNumber: 276,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-3xl border border-neutral-200/70 bg-white/75 p-4 shadow-[0_20px_60px_-40px_rgba(40,20,80,0.45)] backdrop-blur-md sm:p-5 md:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-semibold tracking-tight text-neutral-950 sm:text-xl",
                children: "Upload Images"
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 281,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-5 py-8 transition ".concat(dragging ? "border-[var(--accent)] bg-[var(--accent-soft)]/50" : "border-neutral-300 bg-white/80 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]/30", " ").concat(!canAddMore ? "cursor-not-allowed opacity-60" : ""),
                onClick: ()=>{
                    var _inputRef_current;
                    return canAddMore && ((_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.click());
                },
                onDragOver: (e)=>{
                    e.preventDefault();
                    if (canAddMore) setDragging(true);
                },
                onDragLeave: ()=>setDragging(false),
                onDrop: (e)=>{
                    e.preventDefault();
                    setDragging(false);
                    if (canAddMore) addFiles(e.dataTransfer.files);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (e)=>{
                    if (e.key === "Enter" || e.key === " ") {
                        var _inputRef_current;
                        e.preventDefault();
                        if (canAddMore) (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.click();
                    }
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FileStackGraphic, {}, void 0, false, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 311,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-sm text-neutral-700",
                        children: [
                            "Drag and drop or",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-[var(--accent)] underline underline-offset-2",
                                children: "Browse computer"
                            }, void 0, false, {
                                fileName: "[project]/components/PhotoUpload.tsx",
                                lineNumber: 314,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 312,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs text-neutral-400",
                        children: [
                            "Allowed Formats: JPG, JPEG, PNG",
                            canAddMore ? " · ".concat(MIN_PHOTOS, "–").concat(MAX_PHOTOS, " photos") : " · max reached"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 318,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: inputRef,
                        type: "file",
                        accept: "image/jpeg,image/png,image/webp",
                        multiple: true,
                        className: "hidden",
                        disabled: !canAddMore,
                        onChange: (e)=>{
                            addFiles(e.target.files);
                            e.target.value = "";
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 322,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 285,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-4 rounded-xl bg-[var(--danger-soft)] px-3 py-2 text-sm text-[var(--danger)]",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 337,
                columnNumber: 9
            }, this),
            slots.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-semibold text-neutral-950",
                        children: [
                            "Selected files (",
                            slots.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 344,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "mt-3 space-y-2.5",
                        children: slots.map((slot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-center gap-3 rounded-2xl bg-[var(--accent-soft)]/55 px-3.5 py-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "truncate text-sm font-semibold text-neutral-950",
                                                children: slot.file.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/PhotoUpload.tsx",
                                                lineNumber: 354,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-neutral-500",
                                                children: [
                                                    formatBytes(slot.file.size),
                                                    slot.status !== "idle" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            " · ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusLabel, {
                                                                slot: slot
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/PhotoUpload.tsx",
                                                                lineNumber: 362,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true) : null
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/PhotoUpload.tsx",
                                                lineNumber: 357,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/PhotoUpload.tsx",
                                        lineNumber: 353,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)] sm:inline",
                                        children: fileKindLabel(slot.file)
                                    }, void 0, false, {
                                        fileName: "[project]/components/PhotoUpload.tsx",
                                        lineNumber: 367,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>removeSlot(slot.id),
                                        className: "flex size-8 shrink-0 items-center justify-center rounded-full text-red-500 transition hover:bg-white/70",
                                        "aria-label": "Remove ".concat(slot.file.name),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            viewBox: "0 0 24 24",
                                            className: "size-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2.2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M6 6l12 12M18 6L6 18",
                                                strokeLinecap: "round"
                                            }, void 0, false, {
                                                fileName: "[project]/components/PhotoUpload.tsx",
                                                lineNumber: 383,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/PhotoUpload.tsx",
                                            lineNumber: 376,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/PhotoUpload.tsx",
                                        lineNumber: 370,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, slot.id, true, {
                                fileName: "[project]/components/PhotoUpload.tsx",
                                lineNumber: 349,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 347,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 343,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PersonalizationFields, {
                priorityFeatures: priorityFeatures,
                onToggle: togglePriority,
                userNote: userNote,
                onNoteChange: setUserNote
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 392,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                disabled: uploadingBatch || !hasIdle,
                onClick: ()=>void uploadPending(),
                className: "mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UploadIcon, {}, void 0, false, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 405,
                        columnNumber: 9
                    }, this),
                    uploadingBatch ? "Uploading…" : "Upload Files"
                ]
            }, void 0, true, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 399,
                columnNumber: 7
            }, this),
            readyToAnalyze && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                disabled: analyzing,
                onClick: ()=>void runAnalysis(),
                className: "mt-3 w-full rounded-2xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50",
                children: analyzing ? "Generating report…" : "Generate free report"
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 410,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 text-center text-xs text-neutral-400",
                children: [
                    acceptedCount,
                    " of ",
                    MIN_PHOTOS,
                    "–",
                    MAX_PHOTOS,
                    " accepted",
                    consent.retainForTracking ? " · photos retained for tracking" : " · photos deleted after report",
                    readyToAnalyze ? " — ready for analysis" : ""
                ]
            }, void 0, true, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 420,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/PhotoUpload.tsx",
        lineNumber: 280,
        columnNumber: 5
    }, this);
}
_s(PhotoUpload, "hSF4YH+f67aKvLObWJ+bGkZBlMA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PhotoUpload;
function PersonalizationFields(param) {
    let { priorityFeatures, onToggle, userNote, onNoteChange } = param;
    const remaining = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$personalization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_NOTE_MAX_LENGTH"] - userNote.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-5 rounded-2xl border border-neutral-200/80 bg-[var(--hero-surface)]/50 px-3.5 py-3.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px] uppercase tracking-[0.18em] text-neutral-400",
                children: "Optional focus"
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 446,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-sm font-medium text-neutral-900",
                children: "What are you most curious about?"
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 449,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-[12px] leading-snug text-neutral-500",
                children: "Tap any that matter — we'll prioritize those recommendations. Scores stay the same either way."
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 452,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex flex-wrap gap-2",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$personalization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRIORITY_FEATURE_OPTIONS"].map((param)=>{
                    let { key, label } = param;
                    const selected = priorityFeatures.includes(key);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-pressed": selected,
                        onClick: ()=>onToggle(key),
                        className: "rounded-full border px-3 py-1.5 text-[12px] font-medium transition ".concat(selected ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]" : "border-neutral-200 bg-white/80 text-neutral-600 hover:border-neutral-300"),
                        children: label
                    }, key, false, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 461,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 457,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "mt-4 block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "sr-only",
                        children: "Anything else you'd like us to focus on?"
                    }, void 0, false, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 479,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: userNote,
                        onChange: (e)=>onNoteChange(e.target.value.slice(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$personalization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_NOTE_MAX_LENGTH"])),
                        rows: 2,
                        maxLength: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$personalization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_NOTE_MAX_LENGTH"],
                        placeholder: "Anything else you'd like us to focus on?",
                        className: "w-full resize-none rounded-xl border border-neutral-200 bg-white/90 px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
                    }, void 0, false, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 480,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mt-1 block text-right text-[11px] text-neutral-400",
                        children: [
                            remaining,
                            " left"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 490,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 478,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/PhotoUpload.tsx",
        lineNumber: 445,
        columnNumber: 5
    }, this);
}
_c1 = PersonalizationFields;
function SupportPauseCard() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-3xl border border-neutral-200/70 bg-white/90 p-5 shadow-[0_20px_60px_-40px_rgba(40,20,80,0.45)] backdrop-blur-md sm:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px] uppercase tracking-[0.18em] text-neutral-400",
                children: "Pause"
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 501,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "mt-2 text-xl font-semibold tracking-tight text-neutral-950",
                children: "We're glad you reached out — let's take this gently."
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 504,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 text-sm leading-relaxed text-neutral-600",
                children: "Zelko is built for appearance feedback, not emotional support. If you're carrying something heavy right now, please talk with someone who can help. We won't run a beauty report for this session."
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 507,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-5 space-y-2 text-sm text-neutral-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "https://www.iasp.info/suicidalthoughts/",
                            target: "_blank",
                            rel: "noreferrer",
                            className: "font-medium text-[var(--accent)] underline-offset-2 hover:underline",
                            children: "IASP — resources for suicidal thoughts"
                        }, void 0, false, {
                            fileName: "[project]/components/PhotoUpload.tsx",
                            lineNumber: 514,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 513,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "https://findahelpline.com/",
                            target: "_blank",
                            rel: "noreferrer",
                            className: "font-medium text-[var(--accent)] underline-offset-2 hover:underline",
                            children: "Find a Helpline — local support by country"
                        }, void 0, false, {
                            fileName: "[project]/components/PhotoUpload.tsx",
                            lineNumber: 524,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 523,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 512,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-5 text-xs leading-relaxed text-neutral-400",
                children: "If you're in immediate danger, contact local emergency services."
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 534,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/PhotoUpload.tsx",
        lineNumber: 500,
        columnNumber: 5
    }, this);
}
_c2 = SupportPauseCard;
function StatusLabel(param) {
    let { slot } = param;
    if (slot.status === "uploading") return "Uploading…";
    if (slot.status === "quality-check-pending") return "Quality check…";
    if (slot.status === "accepted") return "Accepted";
    if (slot.status === "rejected") {
        return slot.rejectReason ? "Rejected — ".concat(slot.rejectReason) : "Rejected";
    }
    return null;
}
_c3 = StatusLabel;
function UploadIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        className: "size-4",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 16V4m0 0l-4 4m4-4l4 4",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 561,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 566,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/PhotoUpload.tsx",
        lineNumber: 553,
        columnNumber: 5
    }, this);
}
_c4 = UploadIcon;
function FileStackGraphic() {
    const labels = [
        "JPEG",
        "JPG",
        "PNG"
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-16 w-24",
        "aria-hidden": true,
        children: labels.map((label, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 h-16 w-12 overflow-hidden rounded-md border border-white bg-white shadow-md",
                style: {
                    left: "".concat(i * 18, "px"),
                    transform: "rotate(".concat((i - 1) * 8, "deg)"),
                    zIndex: i + 1
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-[var(--accent)] px-1 py-0.5 text-center text-[7px] font-bold tracking-wide text-white",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 585,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-[calc(100%-16px)] items-center justify-center bg-neutral-50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            viewBox: "0 0 24 24",
                            className: "size-5 text-neutral-300",
                            fill: "currentColor",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M5 5h14a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1zm2 10l3-4 2 2.5L15 9l4 6H7z"
                            }, void 0, false, {
                                fileName: "[project]/components/PhotoUpload.tsx",
                                lineNumber: 594,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/PhotoUpload.tsx",
                            lineNumber: 589,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 588,
                        columnNumber: 11
                    }, this)
                ]
            }, label, true, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 576,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/PhotoUpload.tsx",
        lineNumber: 574,
        columnNumber: 5
    }, this);
}
_c5 = FileStackGraphic;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "PhotoUpload");
__turbopack_context__.k.register(_c1, "PersonalizationFields");
__turbopack_context__.k.register(_c2, "SupportPauseCard");
__turbopack_context__.k.register(_c3, "StatusLabel");
__turbopack_context__.k.register(_c4, "UploadIcon");
__turbopack_context__.k.register(_c5, "FileStackGraphic");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/UploadExperience.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UploadExperience",
    ()=>UploadExperience
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$SiteHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/site/SiteHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$SiteFooter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/site/SiteFooter.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConsentGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ConsentGate.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PhotoUpload$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/PhotoUpload.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$consent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/consent.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function UploadExperience() {
    _s();
    const [consent, setConsent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hydrated, setHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UploadExperience.useEffect": ()=>{
            setConsent((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$consent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStoredConsent"])());
            setHydrated(true);
        }
    }["UploadExperience.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "upload-page bg-[var(--background)] text-neutral-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$SiteHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SiteHeader"], {
                variant: "solid"
            }, void 0, false, {
                fileName: "[project]/components/UploadExperience.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "upload-stage",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "upload-stage-portrait",
                        "aria-hidden": true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/upload/hero.png",
                                alt: "",
                                fill: true,
                                priority: true,
                                className: "object-cover object-[38%_8%]",
                                sizes: "(max-width: 900px) 100vw, 70vw"
                            }, void 0, false, {
                                fileName: "[project]/components/UploadExperience.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "upload-stage-portrait-fade"
                            }, void 0, false, {
                                fileName: "[project]/components/UploadExperience.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/UploadExperience.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "upload-stage-inner",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "upload-stage-card",
                            children: [
                                consent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-3 max-w-md rounded-2xl border border-neutral-200/80 bg-white/85 px-3.5 py-2.5 text-sm text-neutral-600 shadow-sm backdrop-blur-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                "Retention:",
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-neutral-900",
                                                    children: consent.retainForTracking ? "Keep for tracking" : "Delete after report"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/UploadExperience.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 19
                                                }, this),
                                                " · ",
                                                "Training:",
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-neutral-900",
                                                    children: consent.allowTraining ? "Allowed" : "Not allowed"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/UploadExperience.tsx",
                                                    lineNumber: 54,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/UploadExperience.tsx",
                                            lineNumber: 45,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "mt-1.5 text-xs font-medium text-[var(--accent)] underline-offset-2 hover:underline",
                                            onClick: ()=>{
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$consent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearStoredConsent"])();
                                                setConsent(null);
                                            },
                                            children: "Edit consent"
                                        }, void 0, false, {
                                            fileName: "[project]/components/UploadExperience.tsx",
                                            lineNumber: 58,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/UploadExperience.tsx",
                                    lineNumber: 44,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "upload-stage-card-body",
                                    children: !hydrated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-[20rem] animate-pulse rounded-3xl border border-neutral-200 bg-white/70"
                                    }, void 0, false, {
                                        fileName: "[project]/components/UploadExperience.tsx",
                                        lineNumber: 73,
                                        columnNumber: 17
                                    }, this) : consent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PhotoUpload$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PhotoUpload"], {
                                        consent: consent
                                    }, void 0, false, {
                                        fileName: "[project]/components/UploadExperience.tsx",
                                        lineNumber: 75,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConsentGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConsentGate"], {
                                        onAccepted: setConsent
                                    }, void 0, false, {
                                        fileName: "[project]/components/UploadExperience.tsx",
                                        lineNumber: 77,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/UploadExperience.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/UploadExperience.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/UploadExperience.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/UploadExperience.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$SiteFooter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SiteFooter"], {}, void 0, false, {
                fileName: "[project]/components/UploadExperience.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/UploadExperience.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(UploadExperience, "YHBcedTYOtqqldQJPnEmJLA1Esw=");
_c = UploadExperience;
var _c;
__turbopack_context__.k.register(_c, "UploadExperience");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_d03142f5._.js.map