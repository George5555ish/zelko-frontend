module.exports = [
"[project]/lib/site-nav.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SITE_NAV",
    ()=>SITE_NAV,
    "SITE_NAV_AUTH",
    ()=>SITE_NAV_AUTH,
    "SITE_NAV_GUEST",
    ()=>SITE_NAV_GUEST,
    "navForAuth",
    ()=>navForAuth
]);
const SITE_NAV_GUEST = [
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
const SITE_NAV_AUTH = [
    {
        label: "Dashboard",
        href: "/dashboard"
    },
    {
        label: "Assess",
        href: "/upload"
    },
    {
        label: "Tracking",
        href: "/tracking"
    },
    {
        label: "Pricing",
        href: "/pricing"
    }
];
const SITE_NAV = SITE_NAV_GUEST;
function navForAuth(isAuthed) {
    return isAuthed ? SITE_NAV_AUTH : SITE_NAV_GUEST;
}
}),
"[project]/components/site/SiteFooter.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteFooter",
    ()=>SiteFooter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$nav$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/site-nav.ts [app-ssr] (ecmascript)");
;
;
;
function SiteFooter() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "border-t border-neutral-200 bg-[var(--hero-surface)] px-6 py-16 md:px-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.2fr_1fr_1fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-[family-name:var(--font-cursive)] text-3xl text-neutral-950",
                                children: "Zelko"
                            }, void 0, false, {
                                fileName: "[project]/components/site/SiteFooter.tsx",
                                lineNumber: 9,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 max-w-sm text-sm leading-relaxed text-neutral-500",
                                children: "Assess measurable features. Act on ranked recommendations. Prove cause-linked change — privately."
                            }, void 0, false, {
                                fileName: "[project]/components/site/SiteFooter.tsx",
                                lineNumber: 12,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs uppercase tracking-[0.18em] text-neutral-400",
                                children: "Navigate"
                            }, void 0, false, {
                                fileName: "[project]/components/site/SiteFooter.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-4 space-y-2.5",
                                children: [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$nav$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE_NAV"].map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs uppercase tracking-[0.18em] text-neutral-400",
                                children: "Product"
                            }, void 0, false, {
                                fileName: "[project]/components/site/SiteFooter.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-4 space-y-2.5 text-sm text-neutral-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Assess → Act → Prove"
                                    }, void 0, false, {
                                        fileName: "[project]/components/site/SiteFooter.tsx",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "8 measurable features"
                                    }, void 0, false, {
                                        fileName: "[project]/components/site/SiteFooter.tsx",
                                        lineNumber: 56,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Photos deleted by default"
                                    }, void 0, false, {
                                        fileName: "[project]/components/site/SiteFooter.tsx",
                                        lineNumber: 57,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/privacy",
                                            className: "transition hover:text-neutral-950",
                                            children: "Privacy Policy"
                                        }, void 0, false, {
                                            fileName: "[project]/components/site/SiteFooter.tsx",
                                            lineNumber: 64,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/site/SiteFooter.tsx",
                                        lineNumber: 63,
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto mt-14 flex max-w-7xl flex-col gap-2 border-t border-neutral-200/80 pt-6 text-xs text-neutral-400 sm:flex-row sm:justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "© ",
                            new Date().getFullYear(),
                            " Zelko. All rights reserved."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/site/SiteFooter.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "No percentiles. No unmeasurable traits. Explainable only."
                    }, void 0, false, {
                        fileName: "[project]/components/site/SiteFooter.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/site/SiteFooter.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/site/SiteFooter.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Client auth helpers — token in localStorage, API via Next /api rewrite. */ __turbopack_context__.s([
    "AUTH_TOKEN_KEY",
    ()=>AUTH_TOKEN_KEY,
    "accountPortraitUrl",
    ()=>accountPortraitUrl,
    "analyzeTargetLook",
    ()=>analyzeTargetLook,
    "cancelProSubscription",
    ()=>cancelProSubscription,
    "deleteMyReport",
    ()=>deleteMyReport,
    "devUnlockPro",
    ()=>devUnlockPro,
    "ensureStandardizedPortrait",
    ()=>ensureStandardizedPortrait,
    "fetchMe",
    ()=>fetchMe,
    "fetchMyReports",
    ()=>fetchMyReports,
    "fetchOutfitStills",
    ()=>fetchOutfitStills,
    "fetchProfile",
    ()=>fetchProfile,
    "fetchTargetLookReport",
    ()=>fetchTargetLookReport,
    "generateOutfitStill",
    ()=>generateOutfitStill,
    "getAuthToken",
    ()=>getAuthToken,
    "linkReportToAccount",
    ()=>linkReportToAccount,
    "loginAccount",
    ()=>loginAccount,
    "portraitUrl",
    ()=>portraitUrl,
    "registerAccount",
    ()=>registerAccount,
    "saveProfile",
    ()=>saveProfile,
    "setAuthToken",
    ()=>setAuthToken,
    "startProCheckout",
    ()=>startProCheckout
]);
const AUTH_TOKEN_KEY = "zelko.authToken";
function getAuthToken() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
function setAuthToken(token) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function authHeaders() {
    const token = getAuthToken();
    return token ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    } : {
        "Content-Type": "application/json"
    };
}
async function registerAccount(input) {
    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok) {
        throw new Error(data?.error ?? "Registration failed.");
    }
    if (!data?.token || !data.user) {
        throw new Error("Invalid registration response.");
    }
    setAuthToken(data.token);
    return data;
}
async function loginAccount(input) {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok) {
        throw new Error(data?.error ?? "Login failed.");
    }
    if (!data?.token || !data.user) {
        throw new Error("Invalid login response.");
    }
    setAuthToken(data.token);
    return data;
}
async function linkReportToAccount(reportId) {
    const res = await fetch("/api/auth/link-report", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
            reportId
        })
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok || !data?.user) {
        throw new Error(data?.error ?? "Could not link report.");
    }
    return data.user;
}
async function fetchMe() {
    const token = getAuthToken();
    if (!token) return null;
    const res = await fetch("/api/auth/me", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        cache: "no-store"
    });
    if (res.status === 401) {
        setAuthToken(null);
        return null;
    }
    if (!res.ok) return null;
    const data = await res.json();
    return data.user;
}
async function fetchMyReports() {
    const token = getAuthToken();
    if (!token) throw new Error("Sign in required.");
    const res = await fetch("/api/reports", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        cache: "no-store"
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok || !data?.user || !data.reports) {
        throw new Error(data?.error ?? "Failed to load reports.");
    }
    return {
        user: data.user,
        reports: data.reports
    };
}
async function deleteMyReport(reportId) {
    const token = getAuthToken();
    if (!token) throw new Error("Sign in required.");
    const res = await fetch(`/api/reports/${reportId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok) {
        throw new Error(data?.error ?? "Failed to delete report.");
    }
}
async function startProCheckout(input) {
    const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(input ?? {})
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok) {
        return {
            url: null,
            error: data?.error ?? "Checkout failed.",
            devUnlock: data?.devUnlock
        };
    }
    return {
        url: data?.url ?? null,
        alreadyPro: data?.alreadyPro,
        devUnlock: data?.devUnlock
    };
}
async function cancelProSubscription() {
    const res = await fetch("/api/billing/cancel", {
        method: "POST",
        headers: authHeaders(),
        body: "{}"
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok || !data?.user) {
        throw new Error(data?.error ?? "Could not cancel subscription.");
    }
    return {
        user: data.user,
        message: data.message ?? "Subscription canceled.",
        immediate: data.immediate,
        currentPeriodEnd: data.currentPeriodEnd ?? data.user.currentPeriodEnd
    };
}
async function devUnlockPro() {
    const res = await fetch("/api/billing/dev-unlock", {
        method: "POST",
        headers: authHeaders(),
        body: "{}"
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok || !data?.user) {
        throw new Error(data?.error ?? "Dev unlock failed.");
    }
    return data.user;
}
function portraitUrl(portraitFileId) {
    if (!portraitFileId) return null;
    return `/api/files/${portraitFileId}`;
}
function accountPortraitUrl(report) {
    if (!report) return null;
    return portraitUrl(report.standardizedPortraitFileId) ?? portraitUrl(report.portraitFileId);
}
async function ensureStandardizedPortrait(reportId) {
    const res = await fetch(`/api/reports/${reportId}/standardized-portrait`, {
        method: "POST",
        headers: authHeaders()
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok || !data?.report) {
        throw new Error(data?.error ?? "Could not generate standardized portrait.");
    }
    return data.report;
}
async function fetchProfile() {
    const token = getAuthToken();
    if (!token) throw new Error("Sign in required.");
    const res = await fetch("/api/profile", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        cache: "no-store"
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok || !data?.user) {
        throw new Error(data?.error ?? "Failed to load profile.");
    }
    return {
        user: data.user,
        profile: data.profile ?? null,
        profileComplete: data.profileComplete === true,
        outfitStillCount: data.outfitStillCount ?? 0
    };
}
async function saveProfile(profile) {
    const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({
            profile
        })
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok || !data?.user || !data.profile) {
        throw new Error(data?.error ?? "Failed to save profile.");
    }
    return {
        user: data.user,
        profile: data.profile
    };
}
async function fetchTargetLookReport(baselineReportId) {
    const token = getAuthToken();
    if (!token) return null;
    const res = await fetch(`/api/reports/${baselineReportId}/target-look`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        cache: "no-store"
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.report;
}
async function analyzeTargetLook(input) {
    const res = await fetch("/api/analyze/target-look", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(input)
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok || !data?.report) {
        throw new Error(data?.error ?? "Target-look analysis failed.");
    }
    return {
        report: data.report,
        recommendations: data.recommendations ?? []
    };
}
async function fetchOutfitStills(baselineReportId) {
    const token = getAuthToken();
    if (!token) throw new Error("Sign in required.");
    const res = await fetch(`/api/outfits?baselineReportId=${encodeURIComponent(baselineReportId)}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        cache: "no-store"
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok || !data?.user) {
        throw new Error(data?.error ?? "Failed to load outfits.");
    }
    return {
        stills: data.stills ?? [],
        cap: data.cap ?? 1,
        used: data.used ?? 0,
        remaining: data.remaining ?? 0,
        user: data.user
    };
}
async function generateOutfitStill(baselineReportId) {
    const res = await fetch("/api/outfits/generate", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
            baselineReportId
        })
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok || !data?.still || !data.user) {
        const err = new Error(data?.error ?? "Outfit generation failed.");
        err.needsPro = data?.needsPro === true || res.status === 402;
        throw err;
    }
    return {
        still: data.still,
        recommendation: data.recommendation ?? null,
        user: data.user,
        cap: data.cap ?? 1,
        used: data.used ?? 0,
        remaining: data.remaining ?? 0,
        needsPro: data.needsPro
    };
}
}),
"[project]/lib/use-auth-user.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthUser",
    ()=>useAuthUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-ssr] (ecmascript)");
"use client";
;
;
function useAuthUser() {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchMe"])().then((me)=>{
            if (!cancelled) setUser(me);
        }).finally(()=>{
            if (!cancelled) setReady(true);
        });
        return ()=>{
            cancelled = true;
        };
    }, []);
    return {
        user,
        ready,
        isAuthed: Boolean(user)
    };
}
}),
"[project]/components/site/MobileNavSheet.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MenuToggleButton",
    ()=>MenuToggleButton,
    "MobileNavSheet",
    ()=>MobileNavSheet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function MobileNavSheet({ open, onClose, links, extras }) {
    const titleId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const closeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeRef.current?.focus();
        const onKey = (e)=>{
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return ()=>{
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [
        open,
        onClose
    ]);
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "nav-sheet fixed inset-0 z-[60] lg:hidden",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": titleId,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "nav-sheet__backdrop absolute inset-0 cursor-pointer border-0 bg-neutral-950/25",
                "aria-label": "Close menu",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/components/site/MobileNavSheet.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "nav-sheet__panel absolute inset-x-3 top-3 bottom-3 flex flex-col overflow-hidden rounded-[1.75rem] border border-white/40 bg-white/55 shadow-[0_24px_80px_rgba(20,12,40,0.18)] backdrop-blur-2xl sm:inset-x-5 sm:top-4 sm:bottom-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-5 pb-2 pt-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                id: titleId,
                                className: "nav-sheet__item text-xs uppercase tracking-[0.2em] text-neutral-500",
                                style: {
                                    animationDelay: "40ms"
                                },
                                children: "Menu"
                            }, void 0, false, {
                                fileName: "[project]/components/site/MobileNavSheet.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                ref: closeRef,
                                type: "button",
                                onClick: onClose,
                                className: "nav-sheet__item flex size-10 cursor-pointer items-center justify-center rounded-full border border-neutral-200/80 bg-white/70 text-neutral-800 transition hover:bg-white",
                                style: {
                                    animationDelay: "60ms"
                                },
                                "aria-label": "Close menu",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CloseIcon, {}, void 0, false, {
                                    fileName: "[project]/components/site/MobileNavSheet.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/site/MobileNavSheet.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/site/MobileNavSheet.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex flex-1 flex-col justify-center gap-1 px-5 pb-6",
                        children: links.map((link, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: link.href,
                                onClick: onClose,
                                className: "nav-sheet__item rounded-2xl px-3 py-3.5 text-2xl font-semibold tracking-tight text-neutral-950 transition hover:bg-white/50 sm:text-3xl",
                                style: {
                                    animationDelay: `${120 + i * 70}ms`
                                },
                                children: link.label
                            }, link.href, false, {
                                fileName: "[project]/components/site/MobileNavSheet.tsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/site/MobileNavSheet.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    extras && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "nav-sheet__item border-t border-neutral-200/60 px-5 py-5",
                        style: {
                            animationDelay: `${120 + links.length * 70 + 40}ms`
                        },
                        children: extras
                    }, void 0, false, {
                        fileName: "[project]/components/site/MobileNavSheet.tsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/site/MobileNavSheet.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/site/MobileNavSheet.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
function MenuToggleButton({ open, onClick, light }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        "aria-expanded": open,
        "aria-label": open ? "Close menu" : "Open menu",
        className: `relative flex size-10 cursor-pointer items-center justify-center rounded-full border transition lg:hidden ${light ? "border-white/35 bg-white/10 text-white hover:bg-white/20" : "border-neutral-200/80 bg-white/70 text-neutral-900 hover:bg-white"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: open ? "Close" : "Menu"
            }, void 0, false, {
                fileName: "[project]/components/site/MobileNavSheet.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `absolute h-[1.5px] w-4 rounded-full transition duration-300 ${light ? "bg-white" : "bg-neutral-900"} ${open ? "translate-y-0 rotate-45" : "-translate-y-[3.5px]"}`
            }, void 0, false, {
                fileName: "[project]/components/site/MobileNavSheet.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `absolute h-[1.5px] w-4 rounded-full transition duration-300 ${light ? "bg-white" : "bg-neutral-900"} ${open ? "opacity-0" : "opacity-100"}`
            }, void 0, false, {
                fileName: "[project]/components/site/MobileNavSheet.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `absolute h-[1.5px] w-4 rounded-full transition duration-300 ${light ? "bg-white" : "bg-neutral-900"} ${open ? "translate-y-0 -rotate-45" : "translate-y-[3.5px]"}`
            }, void 0, false, {
                fileName: "[project]/components/site/MobileNavSheet.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/site/MobileNavSheet.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, this);
}
function CloseIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        className: "size-4",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M6 6l12 12M18 6L6 18",
            strokeLinecap: "round"
        }, void 0, false, {
            fileName: "[project]/components/site/MobileNavSheet.tsx",
            lineNumber: 158,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/site/MobileNavSheet.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/site/SiteHeader.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteHeader",
    ()=>SiteHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$nav$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/site-nav.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/use-auth-user.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$MobileNavSheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/site/MobileNavSheet.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function SiteHeader({ variant = "solid" }) {
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [started, setStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { user, isAuthed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthUser"])();
    const links = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$nav$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navForAuth"])(isAuthed);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const id = window.setTimeout(()=>setStarted(true), 40);
        return ()=>window.clearTimeout(id);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onScroll = ()=>setScrolled(window.scrollY >= 30);
        onScroll();
        window.addEventListener("scroll", onScroll, {
            passive: true
        });
        return ()=>window.removeEventListener("scroll", onScroll);
    }, []);
    const isDark = variant === "dark";
    const frosted = isDark ? scrolled ? "border-b border-white/10 bg-[#1a1c20]/85 backdrop-blur-md" : "border-b border-transparent bg-transparent" : variant === "solid" || scrolled ? "border-b border-neutral-200/40 bg-[color-mix(in_srgb,var(--hero-surface)_78%,transparent)] backdrop-blur-sm" : "border-b border-transparent bg-transparent";
    const overlayLight = variant === "overlay" && !scrolled || isDark;
    function signOut() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setAuthToken"])(null);
        window.location.href = "/";
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: `fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${frosted}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 sm:px-6 sm:py-5 md:px-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: `hero-word flex items-center gap-2.5 ${started ? "is-in" : ""}`,
                            style: {
                                transitionDelay: "40ms"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LogoMark, {}, void 0, false, {
                                    fileName: "[project]/components/site/SiteHeader.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `text-[1.25rem] font-semibold tracking-tight sm:text-[1.35rem] ${overlayLight ? "text-white" : "text-neutral-950"}`,
                                    children: "Zelko"
                                }, void 0, false, {
                                    fileName: "[project]/components/site/SiteHeader.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/site/SiteHeader.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: `hidden items-center gap-7 text-[0.92rem] lg:flex ${overlayLight ? "text-white/85" : "text-neutral-700"}`,
                            children: links.map((link, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: link.href,
                                    className: `hero-word transition ${overlayLight ? "hover:text-white" : "hover:text-neutral-950"} ${started ? "is-in" : ""}`,
                                    style: {
                                        transitionDelay: `${120 + i * 70}ms`
                                    },
                                    children: link.label
                                }, link.href, false, {
                                    fileName: "[project]/components/site/SiteHeader.tsx",
                                    lineNumber: 80,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/site/SiteHeader.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2.5 sm:gap-4",
                            children: [
                                isAuthed && user?.isPro ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `hidden rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] sm:inline ${overlayLight ? "bg-white/15 text-white" : "bg-neutral-950 text-white"}`,
                                    children: "Pro"
                                }, void 0, false, {
                                    fileName: "[project]/components/site/SiteHeader.tsx",
                                    lineNumber: 95,
                                    columnNumber: 15
                                }, this) : null,
                                !isAuthed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/contact",
                                    className: `hero-word hidden rounded-lg border px-4 py-2 text-sm font-medium transition lg:inline-flex ${overlayLight ? "border-white/80 text-white hover:bg-white/10" : "border-neutral-900/80 text-neutral-900 hover:bg-white/50"} ${started ? "is-in" : ""}`,
                                    style: {
                                        transitionDelay: `${120 + links.length * 70 + 40}ms`
                                    },
                                    children: "Contact Us"
                                }, void 0, false, {
                                    fileName: "[project]/components/site/SiteHeader.tsx",
                                    lineNumber: 107,
                                    columnNumber: 15
                                }, this) : null,
                                isAuthed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/dashboard",
                                    className: `hero-word hidden text-sm font-medium transition sm:inline ${overlayLight ? "text-white/90 hover:text-white" : "text-neutral-800 hover:text-neutral-950"} ${started ? "is-in" : ""}`,
                                    style: {
                                        transitionDelay: `${120 + links.length * 70 + 110}ms`
                                    },
                                    children: "Dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/components/site/SiteHeader.tsx",
                                    lineNumber: 123,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    className: `hero-word hidden text-sm font-medium transition sm:inline ${overlayLight ? "text-white/90 hover:text-white" : "text-neutral-800 hover:text-neutral-950"} ${started ? "is-in" : ""}`,
                                    style: {
                                        transitionDelay: `${120 + links.length * 70 + 110}ms`
                                    },
                                    children: "Log in"
                                }, void 0, false, {
                                    fileName: "[project]/components/site/SiteHeader.tsx",
                                    lineNumber: 137,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$MobileNavSheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuToggleButton"], {
                                    open: menuOpen,
                                    onClick: ()=>setMenuOpen((v)=>!v),
                                    light: overlayLight
                                }, void 0, false, {
                                    fileName: "[project]/components/site/SiteHeader.tsx",
                                    lineNumber: 152,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/site/SiteHeader.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/site/SiteHeader.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/site/SiteHeader.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$MobileNavSheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobileNavSheet"], {
                open: menuOpen,
                onClose: ()=>setMenuOpen(false),
                links: links,
                extras: isAuthed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/upload",
                            onClick: ()=>setMenuOpen(false),
                            className: "inline-flex w-full items-center justify-center rounded-xl bg-[#ebe4ff] px-5 py-3.5 text-sm font-semibold text-neutral-900",
                            children: "New assessment"
                        }, void 0, false, {
                            fileName: "[project]/components/site/SiteHeader.tsx",
                            lineNumber: 168,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/dashboard",
                                    onClick: ()=>setMenuOpen(false),
                                    className: "inline-flex flex-1 items-center justify-center rounded-xl border border-neutral-900/70 px-4 py-3 text-sm font-medium text-neutral-900",
                                    children: "Dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/components/site/SiteHeader.tsx",
                                    lineNumber: 176,
                                    columnNumber: 17
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setMenuOpen(false);
                                        signOut();
                                    },
                                    className: "inline-flex flex-1 cursor-pointer items-center justify-center rounded-xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white",
                                    children: "Sign out"
                                }, void 0, false, {
                                    fileName: "[project]/components/site/SiteHeader.tsx",
                                    lineNumber: 183,
                                    columnNumber: 17
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/site/SiteHeader.tsx",
                            lineNumber: 175,
                            columnNumber: 15
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/site/SiteHeader.tsx",
                    lineNumber: 167,
                    columnNumber: 13
                }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/contact",
                            onClick: ()=>setMenuOpen(false),
                            className: "inline-flex flex-1 items-center justify-center rounded-xl border border-neutral-900/70 px-4 py-3 text-sm font-medium text-neutral-900",
                            children: "Contact"
                        }, void 0, false, {
                            fileName: "[project]/components/site/SiteHeader.tsx",
                            lineNumber: 197,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/login",
                            onClick: ()=>setMenuOpen(false),
                            className: "inline-flex flex-1 items-center justify-center rounded-xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white",
                            children: "Log in"
                        }, void 0, false, {
                            fileName: "[project]/components/site/SiteHeader.tsx",
                            lineNumber: 204,
                            columnNumber: 15
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/site/SiteHeader.tsx",
                    lineNumber: 196,
                    columnNumber: 13
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/components/site/SiteHeader.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
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
                fileName: "[project]/components/site/SiteHeader.tsx",
                lineNumber: 229,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M18.2 14.2 19 16.6 21.4 17.4 19 18.2 18.2 20.6 17.4 18.2 15 17.4 17.4 16.6 18.2 14.2Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/site/SiteHeader.tsx",
                lineNumber: 234,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6.4 15.1 7 17 8.9 17.6 7 18.2 6.4 20.1 5.8 18.2 3.9 17.6 5.8 17 6.4 15.1Z",
                fill: "currentColor",
                opacity: "0.85"
            }, void 0, false, {
                fileName: "[project]/components/site/SiteHeader.tsx",
                lineNumber: 238,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/site/SiteHeader.tsx",
        lineNumber: 221,
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
"[project]/components/site/PageHero.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageHero",
    ()=>PageHero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$Reveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/site/Reveal.tsx [app-ssr] (ecmascript)");
;
;
;
function PageHero({ eyebrow, title, description, cta }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative overflow-hidden px-6 pb-16 pt-32 md:px-10 md:pb-20 md:pt-36",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": true,
                className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,#f6f3ff_0%,transparent_55%)]"
            }, void 0, false, {
                fileName: "[project]/components/site/PageHero.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mx-auto max-w-4xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$Reveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Reveal"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs uppercase tracking-[0.2em] text-neutral-400",
                            children: eyebrow
                        }, void 0, false, {
                            fileName: "[project]/components/site/PageHero.tsx",
                            lineNumber: 23,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/site/PageHero.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$Reveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Reveal"], {
                        delayMs: 80,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "mt-4 font-[family-name:var(--font-cursive)] text-5xl leading-[1.1] text-neutral-950 sm:text-6xl md:text-7xl",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/components/site/PageHero.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/site/PageHero.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$Reveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Reveal"], {
                        delayMs: 160,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500",
                            children: description
                        }, void 0, false, {
                            fileName: "[project]/components/site/PageHero.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/site/PageHero.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    cta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$Reveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Reveal"], {
                        delayMs: 240,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: cta.href,
                            className: "mt-8 inline-flex rounded-xl bg-[#ebe4ff] px-5 py-3 text-sm font-medium text-neutral-900 transition hover:bg-[#e0d6ff]",
                            children: cta.label
                        }, void 0, false, {
                            fileName: "[project]/components/site/PageHero.tsx",
                            lineNumber: 39,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/site/PageHero.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/site/PageHero.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/site/PageHero.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/site/PrivacyDataStatement.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PrivacyDataStatement",
    ()=>PrivacyDataStatement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
;
;
function PrivacyDataStatement({ tone = "light", compact = false }) {
    const muted = tone === "dark" ? "text-white/55" : "text-neutral-500";
    const strong = tone === "dark" ? "text-white/85" : "text-neutral-800";
    const border = tone === "dark" ? "border-white/10 bg-white/5" : "border-neutral-200 bg-white";
    const link = tone === "dark" ? "text-white underline-offset-2 hover:underline" : "text-neutral-900 underline-offset-2 hover:underline";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: `rounded-2xl border px-4 py-3 text-sm leading-relaxed ${border} ${muted}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `font-medium ${strong}`,
                children: "How we handle your photos"
            }, void 0, false, {
                fileName: "[project]/components/site/PrivacyDataStatement.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: `mt-2 list-disc space-y-1.5 pl-4 ${compact ? "" : ""}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: [
                            "We do ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: strong,
                                children: "not"
                            }, void 0, false, {
                                fileName: "[project]/components/site/PrivacyDataStatement.tsx",
                                lineNumber: 28,
                                columnNumber: 17
                            }, this),
                            " use your photos to train AI models unless you separately and explicitly allow it (off by default)."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/site/PrivacyDataStatement.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: [
                            "Extra upload photos are deleted after analysis by default. We keep a",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: strong,
                                children: "portrait copy for your report display"
                            }, void 0, false, {
                                fileName: "[project]/components/site/PrivacyDataStatement.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this),
                            " ",
                            "so scores stay tied to the face you measured. Sources are retained only when needed for paid tracking."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/site/PrivacyDataStatement.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: [
                            "If you upload a ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: strong,
                                children: "reference look"
                            }, void 0, false, {
                                fileName: "[project]/components/site/PrivacyDataStatement.tsx",
                                lineNumber: 38,
                                columnNumber: 27
                            }, this),
                            " photo, we retain it to run the toward-your-look comparison and outfit stills until you delete the linked report."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/site/PrivacyDataStatement.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: "Outfit stills are generative previews (fal.ai). They are not medical advice and are capped (1 free / more on Pro)."
                    }, void 0, false, {
                        fileName: "[project]/components/site/PrivacyDataStatement.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: [
                            "We do ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: strong,
                                children: "not"
                            }, void 0, false, {
                                fileName: "[project]/components/site/PrivacyDataStatement.tsx",
                                lineNumber: 47,
                                columnNumber: 17
                            }, this),
                            " sell or share your photos with third parties for advertising. Stripe processes payment details; we do not store card numbers."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/site/PrivacyDataStatement.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: "You can delete a linked report (and its stored files) from your account at any time."
                    }, void 0, false, {
                        fileName: "[project]/components/site/PrivacyDataStatement.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/site/PrivacyDataStatement.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3",
                children: [
                    "Full terms:",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/privacy",
                        className: `font-medium ${link}`,
                        children: "Privacy Policy"
                    }, void 0, false, {
                        fileName: "[project]/components/site/PrivacyDataStatement.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/components/site/PrivacyDataStatement.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/site/PrivacyDataStatement.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/pricing/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PricingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$SiteFooter$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/site/SiteFooter.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$SiteHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/site/SiteHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$PageHero$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/site/PageHero.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$Reveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/site/Reveal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$PrivacyDataStatement$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/site/PrivacyDataStatement.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
const FREE = [
    "Overall composite score (always)",
    "Top 1–2 strongest features, named and scored",
    "Photo quality gate before analysis"
];
const PAID = [
    "Full per-feature breakdown",
    "Confidence labels on every score",
    "All paired recommendations",
    "Re-upload tracking with normalized comparison",
    "Lighting/angle consistency checks before comparing"
];
function PricingPage() {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [signedIn, setSignedIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setSignedIn(Boolean((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])()));
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchMe"])().then(setUser);
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const q = undefined;
    }, []);
    const unlock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setMessage(null);
        setBusy(true);
        try {
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])()) {
                window.location.href = "/login?next=/pricing";
                return;
            }
            const me = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchMe"])();
            setUser(me);
            if (me?.isPro) {
                setMessage("You already have Pro.");
                return;
            }
            const checkout = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startProCheckout"])({
                successPath: "/pricing?checkout=success",
                cancelPath: "/pricing?checkout=cancel"
            });
            if (checkout.alreadyPro) {
                setUser(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchMe"])());
                setMessage("You already have Pro.");
                return;
            }
            if (checkout.url) {
                window.location.href = checkout.url;
                return;
            }
            if (checkout.devUnlock) {
                const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["devUnlockPro"])();
                setUser(updated);
                setMessage("Dev Pro unlock applied.");
                return;
            }
            setMessage(checkout.error ?? "Stripe is not configured. Set STRIPE_SECRET_KEY and STRIPE_PRICE_ID.");
        } catch (err) {
            setMessage(err instanceof Error ? err.message : "Checkout failed.");
        } finally{
            setBusy(false);
        }
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-[var(--background)] text-neutral-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$SiteHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SiteHeader"], {
                variant: "solid"
            }, void 0, false, {
                fileName: "[project]/app/pricing/page.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$PageHero$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageHero"], {
                eyebrow: "Pricing",
                title: "Start free. Go deeper when it matters.",
                description: "Free proves the system. Paid unlocks the full explainable breakdown and weekly tracking — without public ranks or percentiles."
            }, void 0, false, {
                fileName: "[project]/app/pricing/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "px-6 pb-24 md:px-10",
                children: [
                    message ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mx-auto mb-8 max-w-7xl rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700",
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/app/pricing/page.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto grid max-w-7xl gap-6 lg:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$Reveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Reveal"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-8 md:p-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs uppercase tracking-[0.18em] text-neutral-400",
                                            children: "Free"
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/page.tsx",
                                            lineNumber: 127,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "mt-3 font-[family-name:var(--font-cursive)] text-5xl text-neutral-950",
                                            children: "Free"
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/page.tsx",
                                            lineNumber: 130,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-3xl font-semibold tracking-tight text-neutral-950",
                                            children: [
                                                "£0",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2 text-base font-normal text-neutral-500",
                                                    children: "GBP"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/page.tsx",
                                                    lineNumber: 135,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/pricing/page.tsx",
                                            lineNumber: 133,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-3 text-neutral-500",
                                            children: "Your overall score and strongest features — enough to see the loop without a wall."
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/page.tsx",
                                            lineNumber: 139,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "mt-8 flex-1 space-y-3",
                                            children: FREE.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "border-b border-neutral-100 pb-3 text-sm text-neutral-700",
                                                    children: item
                                                }, item, false, {
                                                    fileName: "[project]/app/pricing/page.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/page.tsx",
                                            lineNumber: 143,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/upload",
                                            className: "mt-10 inline-flex w-fit rounded-xl bg-[#ebe4ff] px-5 py-3 text-sm font-medium text-neutral-900 transition hover:bg-[#e0d6ff]",
                                            children: "Start your free report"
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/page.tsx",
                                            lineNumber: 153,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/pricing/page.tsx",
                                    lineNumber: 126,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/pricing/page.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$Reveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Reveal"], {
                                delayMs: 120,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-full flex-col rounded-3xl border border-neutral-900 bg-neutral-950 p-8 text-white md:p-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs uppercase tracking-[0.18em] text-neutral-400",
                                            children: "Pro"
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/page.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "mt-3 font-[family-name:var(--font-cursive)] text-5xl",
                                            children: "£9.99"
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/page.tsx",
                                            lineNumber: 167,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-sm text-neutral-400",
                                            children: "GBP / month · billed via Stripe"
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/page.tsx",
                                            lineNumber: 170,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-8 border-t border-white/10 pt-8",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-semibold tracking-tight text-white",
                                                    children: "Full clarity"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/page.tsx",
                                                    lineNumber: 174,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-neutral-400",
                                                    children: "Every feature, every confidence label, every recommendation — plus private progress tracking."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/page.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "mt-6 space-y-3",
                                                    children: PAID.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: "border-b border-white/10 pb-3 text-sm text-neutral-200",
                                                            children: item
                                                        }, item, false, {
                                                            fileName: "[project]/app/pricing/page.tsx",
                                                            lineNumber: 183,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/page.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/pricing/page.tsx",
                                            lineNumber: 173,
                                            columnNumber: 15
                                        }, this),
                                        user?.isPro ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-10 space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/tracking",
                                                    className: "inline-flex w-fit rounded-xl bg-white px-5 py-3 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200",
                                                    children: "Open tracking"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/pricing/page.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-neutral-400",
                                                    children: [
                                                        user.cancelAtPeriodEnd && user.currentPeriodEnd ? `Canceling — Pro ends ${new Date(user.currentPeriodEnd).toLocaleDateString("en-GB")}.` : "Manage or cancel anytime from your Account page.",
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/login",
                                                            className: "text-neutral-200 underline-offset-4 hover:underline",
                                                            children: "Go to Account"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/pricing/page.tsx",
                                                            lineNumber: 204,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/pricing/page.tsx",
                                                    lineNumber: 200,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/pricing/page.tsx",
                                            lineNumber: 193,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            disabled: busy,
                                            onClick: ()=>void unlock(),
                                            className: "mt-10 inline-flex w-fit cursor-pointer rounded-xl bg-white px-5 py-3 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200 disabled:opacity-60",
                                            children: busy ? "Starting…" : signedIn ? "Unlock Pro — £9.99/mo" : "Sign in to unlock Pro"
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/page.tsx",
                                            lineNumber: 213,
                                            columnNumber: 17
                                        }, this),
                                        !signedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/login?next=/pricing",
                                            className: "mt-3 text-sm text-neutral-400 underline-offset-4 hover:underline",
                                            children: "Sign in / create account first"
                                        }, void 0, false, {
                                            fileName: "[project]/app/pricing/page.tsx",
                                            lineNumber: 227,
                                            columnNumber: 17
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/pricing/page.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/pricing/page.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/pricing/page.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$Reveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Reveal"], {
                        delayMs: 200,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto mt-12 max-w-3xl space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$PrivacyDataStatement$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PrivacyDataStatement"], {
                                    tone: "light"
                                }, void 0, false, {
                                    fileName: "[project]/app/pricing/page.tsx",
                                    lineNumber: 240,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-center text-sm leading-relaxed text-neutral-500",
                                    children: "Locked features show their name with a blurred score — depth without a dump. Re-analysis is capped at once per week to avoid compulsive checking. Extra upload photos are deleted by default after analysis; a portrait is kept for report display."
                                }, void 0, false, {
                                    fileName: "[project]/app/pricing/page.tsx",
                                    lineNumber: 241,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/pricing/page.tsx",
                            lineNumber: 239,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/pricing/page.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/pricing/page.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$SiteFooter$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SiteFooter"], {}, void 0, false, {
                fileName: "[project]/app/pricing/page.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/pricing/page.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_5c0ba19b._.js.map