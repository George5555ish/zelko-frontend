module.exports = [
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
"[project]/lib/appearance-index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Appearance Index — staged pillars + style preference schema.
 * Stage cycle: collect → reveal → next (not batch-then-one-report).
 */ __turbopack_context__.s([
    "BOTTOM_PREFERENCES",
    ()=>BOTTOM_PREFERENCES,
    "FAVORITE_COLORS",
    ()=>FAVORITE_COLORS,
    "GROOMING_FEATURE_KEYS",
    ()=>GROOMING_FEATURE_KEYS,
    "JOURNEY_FLOW_STEPS",
    ()=>JOURNEY_FLOW_STEPS,
    "SILHOUETTE_PREFERENCES",
    ()=>SILHOUETTE_PREFERENCES,
    "STAGE_LABELS",
    ()=>STAGE_LABELS,
    "STRUCTURE_FEATURE_KEYS",
    ()=>STRUCTURE_FEATURE_KEYS,
    "STYLE_BUDGETS",
    ()=>STYLE_BUDGETS,
    "STYLE_VIBES",
    ()=>STYLE_VIBES,
    "appearanceStageToFlowStep",
    ()=>appearanceStageToFlowStep,
    "buildStyleProfileSummary",
    ()=>buildStyleProfileSummary,
    "computePillarsFromFeatures",
    ()=>computePillarsFromFeatures,
    "isLookInFlight",
    ()=>isLookInFlight,
    "isLookSettled",
    ()=>isLookSettled,
    "journeyProgressPercent",
    ()=>journeyProgressPercent,
    "journeyStepIndex",
    ()=>journeyStepIndex
]);
const STRUCTURE_FEATURE_KEYS = [
    "face_symmetry",
    "facial_proportions",
    "eye_spacing",
    "jawline_definition",
    "eyebrow_shape"
];
const GROOMING_FEATURE_KEYS = [
    "skin_clarity",
    "grooming_signal"
];
const FAVORITE_COLORS = [
    {
        id: "black",
        label: "Black",
        hex: "#1a1a1a"
    },
    {
        id: "navy",
        label: "Navy",
        hex: "#1e3a5f"
    },
    {
        id: "beige",
        label: "Beige",
        hex: "#c4b09a"
    },
    {
        id: "white",
        label: "White",
        hex: "#f5f5f5"
    },
    {
        id: "red",
        label: "Red",
        hex: "#b91c1c"
    },
    {
        id: "pink",
        label: "Pink",
        hex: "#e8a0bf"
    },
    {
        id: "green",
        label: "Green",
        hex: "#3d6b4f"
    },
    {
        id: "blue",
        label: "Blue",
        hex: "#3b82c4"
    }
];
const BOTTOM_PREFERENCES = [
    {
        id: "dresses",
        label: "Dresses",
        hint: "One-piece looks"
    },
    {
        id: "jeans",
        label: "Jeans",
        hint: "Denim everyday"
    },
    {
        id: "skirts",
        label: "Skirts",
        hint: "Flow or pencil"
    },
    {
        id: "trousers",
        label: "Trousers",
        hint: "Tailored pants"
    }
];
const SILHOUETTE_PREFERENCES = [
    {
        id: "fitted",
        label: "Fitted",
        hint: "Close to the body"
    },
    {
        id: "relaxed",
        label: "Relaxed",
        hint: "Easy, soft lines"
    },
    {
        id: "oversized",
        label: "Oversized",
        hint: "Roomy layers"
    }
];
const STYLE_VIBES = [
    {
        id: "casual",
        label: "Casual",
        hint: "Weekend easy"
    },
    {
        id: "polished",
        label: "Polished",
        hint: "Clean & put-together"
    },
    {
        id: "street",
        label: "Street",
        hint: "Edge & attitude"
    },
    {
        id: "classic",
        label: "Classic",
        hint: "Timeless basics"
    }
];
const STYLE_BUDGETS = [
    {
        id: "low",
        label: "Budget-friendly",
        hint: "Keep it affordable"
    },
    {
        id: "mid",
        label: "Mid-range",
        hint: "Quality when it counts"
    },
    {
        id: "flexible",
        label: "Flexible",
        hint: "Spend for the right piece"
    }
];
function isLookSettled(status) {
    return status === "ready" || status === "failed";
}
function isLookInFlight(status) {
    return status === "pending" || status === "generating_garment" || status === "garment_ready" || status === "generating_pose" || status === "generating_tryon";
}
function avgMeasurable(features, keys) {
    const packets = [];
    for (const k of keys){
        const p = features[k];
        if (p && p.measurable !== false) packets.push(p);
    }
    if (packets.length === 0) {
        return {
            score: null,
            confidence: "Low",
            measurable: false
        };
    }
    const score = Math.round(packets.reduce((a, p)=>a + p.score, 0) / packets.length);
    const highs = packets.filter((p)=>p.confidence === "High").length;
    const lows = packets.filter((p)=>p.confidence === "Low").length;
    const confidence = highs >= packets.length / 2 ? "High" : lows >= packets.length / 2 ? "Low" : "Medium";
    return {
        score,
        confidence,
        measurable: true
    };
}
function structureTips(features, score) {
    const tips = [];
    if (score == null) {
        return [
            "Upload a clearer frontal face photo so structure can be measured."
        ];
    }
    if (features.jawline_definition?.score < 70) {
        tips.push("Lighting from slightly above can sharpen how the jawline reads on camera.");
    }
    if (features.face_symmetry?.score < 70) {
        tips.push("Face the camera square-on — slight turns exaggerate asymmetry in photos.");
    }
    if (features.eyebrow_shape?.score < 70) {
        tips.push("Even brow grooming usually lifts how the upper face reads.");
    }
    if (tips.length === 0) {
        tips.push("Strong structure read — keep framing consistent when you recheck.");
    }
    return tips.slice(0, 3);
}
function groomingTips(features, score) {
    const tips = [];
    if (score == null) {
        return [
            "Grooming needs a clearer face crop — soft front light helps skin + hair reads."
        ];
    }
    if (features.skin_clarity?.measurable === false) {
        tips.push("Skin clarity was hard to read — try even daylight next time.");
    } else if (features.skin_clarity?.score < 70) {
        tips.push("A simple consistent skincare routine usually moves this pillar fastest.");
    }
    if (features.grooming_signal?.measurable === false) {
        tips.push(features.grooming_signal?.gateNote ?? "Outfit/hair signal wasn’t clear enough — a mid-chest crop helps.");
    } else if (features.grooming_signal?.score < 70) {
        tips.push("Hair finish and collar/neckline grooming often lift this score quickly.");
    }
    if (tips.length === 0) {
        tips.push("Grooming looks intentional — maintain the same finish on rechecks.");
    }
    return tips.slice(0, 3);
}
function computePillarsFromFeatures(features) {
    const structureAvg = avgMeasurable(features, STRUCTURE_FEATURE_KEYS);
    const groomingAvg = avgMeasurable(features, GROOMING_FEATURE_KEYS);
    return {
        structure: {
            key: "structure",
            label: "Structure",
            score: structureAvg.score,
            confidence: structureAvg.confidence,
            featureKeys: STRUCTURE_FEATURE_KEYS,
            tips: structureTips(features, structureAvg.score),
            measurable: structureAvg.measurable
        },
        grooming: {
            key: "grooming",
            label: "Grooming",
            score: groomingAvg.score,
            confidence: groomingAvg.confidence,
            featureKeys: GROOMING_FEATURE_KEYS,
            tips: groomingTips(features, groomingAvg.score),
            measurable: groomingAvg.measurable
        },
        style: null
    };
}
function buildStyleProfileSummary(prefs) {
    const color = FAVORITE_COLORS.find((c)=>c.id === prefs.favoriteColor)?.label ?? prefs.favoriteColor;
    const bottom = BOTTOM_PREFERENCES.find((b)=>b.id === prefs.bottomPreference)?.label ?? prefs.bottomPreference;
    const sil = SILHOUETTE_PREFERENCES.find((s)=>s.id === prefs.silhouette)?.label ?? prefs.silhouette;
    const vibe = STYLE_VIBES.find((v)=>v.id === prefs.vibe)?.label ?? prefs.vibe;
    const budget = STYLE_BUDGETS.find((b)=>b.id === prefs.budget)?.label ?? prefs.budget;
    return {
        preferences: prefs,
        detectedSignals: [],
        summary: `You lean ${vibe.toLowerCase()} with a ${sil.toLowerCase()} silhouette, favoring ${bottom.toLowerCase()} and ${color.toLowerCase()} tones — ${budget.toLowerCase()} spend.`,
        estimateNote: "Full-body measurements and outfit vision signals will refine this profile — preferences below are from your answers."
    };
}
const STAGE_LABELS = {
    face_reveal: "Face & Grooming",
    style_collect: "Style preferences",
    style_reveal: "Style Profile",
    prescription_reveal: "Your looks",
    complete: "Profile complete"
};
const JOURNEY_FLOW_STEPS = [
    {
        id: "upload",
        label: "Upload photos",
        shortLabel: "Upload"
    },
    {
        id: "face_reveal",
        label: "Face & Grooming",
        shortLabel: "Face"
    },
    {
        id: "style_collect",
        label: "Style preferences",
        shortLabel: "Prefs"
    },
    {
        id: "style_reveal",
        label: "Style Profile",
        shortLabel: "Style"
    },
    {
        id: "prescription_reveal",
        label: "Prescribed looks",
        shortLabel: "Looks"
    }
];
function journeyStepIndex(step) {
    if (step === "complete") return JOURNEY_FLOW_STEPS.length;
    return JOURNEY_FLOW_STEPS.findIndex((s)=>s.id === step);
}
function journeyProgressPercent(current, withinStep = 0) {
    const total = JOURNEY_FLOW_STEPS.length;
    if (current === "complete") return 100;
    const index = journeyStepIndex(current);
    if (index < 0) return 0;
    const clamped = Math.min(1, Math.max(0, withinStep));
    return Math.round((index + clamped) / total * 100);
}
function appearanceStageToFlowStep(stage) {
    if (stage === "complete") return "complete";
    return stage;
}
}),
"[project]/lib/types/report.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Feature keys from PRODUCT.md scoring rubric.
 * Photo quality gates the pipeline; remaining features are scored post-acceptance.
 */ __turbopack_context__.s([
    "FEATURE_CONFIDENCE_TIER",
    ()=>FEATURE_CONFIDENCE_TIER,
    "FEATURE_KEYS",
    ()=>FEATURE_KEYS,
    "FEATURE_LABELS",
    ()=>FEATURE_LABELS,
    "SCORED_APPEARANCE_KEYS",
    ()=>SCORED_APPEARANCE_KEYS
]);
const FEATURE_KEYS = [
    "face_symmetry",
    "facial_proportions",
    "skin_clarity",
    "jawline_definition",
    "eyebrow_shape",
    "eye_spacing",
    "grooming_signal",
    "photo_quality"
];
const SCORED_APPEARANCE_KEYS = FEATURE_KEYS.filter((k)=>k !== "photo_quality");
const FEATURE_LABELS = {
    face_symmetry: "Face symmetry",
    facial_proportions: "Facial proportions",
    skin_clarity: "Skin clarity",
    jawline_definition: "Jawline definition",
    eyebrow_shape: "Eyebrow shape",
    eye_spacing: "Eye spacing",
    grooming_signal: "Grooming signal",
    photo_quality: "Photo quality"
};
const FEATURE_CONFIDENCE_TIER = {
    face_symmetry: "High",
    facial_proportions: "Medium",
    skin_clarity: "Medium-high",
    jawline_definition: "Medium",
    eyebrow_shape: "Medium-high",
    eye_spacing: "High",
    grooming_signal: "Low-medium",
    photo_quality: "High"
};
}),
"[project]/lib/object-cover-map.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Map a normalized image-space point (0–1) into CSS percent of a box
 * that displays the image with object-fit: cover and object-position.
 */ __turbopack_context__.s([
    "mapNormToCoverPercent",
    ()=>mapNormToCoverPercent
]);
function mapNormToCoverPercent(nx, ny, imgW, imgH, boxW, boxH, objectPosX = 0.5, objectPosY = 0.18) {
    if (imgW <= 0 || imgH <= 0 || boxW <= 0 || boxH <= 0) {
        return {
            left: nx * 100,
            top: ny * 100
        };
    }
    const scale = Math.max(boxW / imgW, boxH / imgH);
    const drawnW = imgW * scale;
    const drawnH = imgH * scale;
    const offsetX = (boxW - drawnW) * objectPosX;
    const offsetY = (boxH - drawnH) * objectPosY;
    const px = nx * drawnW + offsetX;
    const py = ny * drawnH + offsetY;
    return {
        left: px / boxW * 100,
        top: py / boxH * 100
    };
}
}),
"[project]/lib/feature-mutability.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FEATURE_MUTABILITY",
    ()=>FEATURE_MUTABILITY,
    "MUTABILITY_HINTS",
    ()=>MUTABILITY_HINTS,
    "MUTABILITY_LABELS",
    ()=>MUTABILITY_LABELS,
    "featureMutability",
    ()=>featureMutability,
    "isChecklistEligibleFeature",
    ()=>isChecklistEligibleFeature
]);
const FEATURE_MUTABILITY = {
    skin_clarity: "actionable",
    grooming_signal: "actionable",
    eyebrow_shape: "actionable",
    photo_quality: "actionable",
    face_symmetry: "photo_sensitive",
    facial_proportions: "photo_sensitive",
    jawline_definition: "photo_sensitive",
    eye_spacing: "structural"
};
const MUTABILITY_LABELS = {
    actionable: "You can act on this",
    photo_sensitive: "Check photo conditions first",
    structural: "Mostly fixed"
};
const MUTABILITY_HINTS = {
    actionable: "Habits and grooming can move this score when you re-check under the same light.",
    photo_sensitive: "Lighting and angle often drive this read — re-shoot cleanly before treating it as fixed anatomy.",
    structural: "This is largely structural. We won’t put it on your weekly checklist — use it for styling and reference-look context."
};
function featureMutability(feature) {
    return FEATURE_MUTABILITY[feature];
}
function isChecklistEligibleFeature(feature) {
    return FEATURE_MUTABILITY[feature] === "actionable";
}
}),
"[project]/lib/recommendations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RECOMMENDATION_LOOKUP",
    ()=>RECOMMENDATION_LOOKUP,
    "checklistRecommendationsForScore",
    ()=>checklistRecommendationsForScore,
    "recommendationsForScore",
    ()=>recommendationsForScore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/feature-mutability.ts [app-ssr] (ecmascript)");
;
const RECOMMENDATION_LOOKUP = {
    skin_clarity: {
        if_score: "below_70",
        observed_signal: [
            "texture_unevenness",
            "redness_detected"
        ],
        recommendations: [
            {
                action: "Consistent skincare routine",
                effort: "low",
                confidence: "high"
            },
            {
                action: "Reduce harsh overhead lighting in future photos",
                effort: "low",
                confidence: "high"
            },
            {
                action: "Dermatologist consult if persistent",
                effort: "medium",
                confidence: "medium"
            }
        ]
    },
    face_symmetry: {
        if_score: "below_70",
        observed_signal: [
            "mirror_pair_deviation"
        ],
        recommendations: [
            {
                action: "Re-shoot with face centered and camera at eye level",
                effort: "low",
                confidence: "high"
            },
            {
                action: "Check for uneven lighting that exaggerates asymmetry",
                effort: "low",
                confidence: "high"
            }
        ]
    },
    facial_proportions: {
        if_score: "below_70",
        observed_signal: [
            "thirds_ratio_drift"
        ],
        recommendations: [
            {
                action: "Use a straight-on angle; avoid wide-angle close-ups",
                effort: "low",
                confidence: "high"
            },
            {
                action: "Keep chin level — tilt changes perceived proportions",
                effort: "low",
                confidence: "medium"
            }
        ]
    },
    jawline_definition: {
        if_score: "below_70",
        observed_signal: [
            "low_edge_contrast"
        ],
        recommendations: [
            {
                action: "Side lighting to increase jaw contour contrast in photos",
                effort: "low",
                confidence: "high"
            },
            {
                action: "Reduce soft frontal fill that flattens the jaw edge",
                effort: "low",
                confidence: "medium"
            }
        ]
    },
    eyebrow_shape: {
        if_score: "below_70",
        observed_signal: [
            "arch_asymmetry",
            "thickness_mismatch"
        ],
        recommendations: [
            {
                action: "Groom brows to match arch height across both sides",
                effort: "low",
                confidence: "high"
            },
            {
                action: "Avoid over-plucking the outer third",
                effort: "low",
                confidence: "medium"
            }
        ]
    },
    eye_spacing: {
        if_score: "below_70",
        observed_signal: [
            "inter_eye_ratio_outlier"
        ],
        recommendations: [
            {
                action: "Confirm the camera is centered — off-axis shots can skew spacing reads",
                effort: "low",
                confidence: "high"
            },
            {
                action: "This spacing read is largely structural. We won’t put it on your weekly checklist — use it for styling and reference-look context.",
                effort: "low",
                confidence: "high"
            }
        ]
    },
    grooming_signal: {
        if_score: "below_70",
        observed_signal: [
            "visible_stubble_unevenness",
            "brow_untidiness"
        ],
        recommendations: [
            {
                action: "Clean up edges (neckline, brows) before the next shoot",
                effort: "low",
                confidence: "high"
            },
            {
                action: "Keep a consistent grooming schedule for tracking photos",
                effort: "medium",
                confidence: "medium"
            }
        ]
    },
    photo_quality: {
        if_score: "below_70",
        observed_signal: [
            "soft_focus",
            "uneven_lighting"
        ],
        recommendations: [
            {
                action: "Reshoot in even daylight facing a window",
                effort: "low",
                confidence: "high"
            },
            {
                action: "Hold the camera steady; avoid digital zoom",
                effort: "low",
                confidence: "high"
            }
        ]
    }
};
function withMutability(feature, rec) {
    const mutability = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["featureMutability"])(feature);
    return {
        ...rec,
        mutability,
        checklistEligible: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isChecklistEligibleFeature"])(feature)
    };
}
function recommendationsForScore(feature, score) {
    if (score >= 70) return [];
    const mutability = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["featureMutability"])(feature);
    const raw = RECOMMENDATION_LOOKUP[feature]?.recommendations ?? [];
    if (mutability === "structural") {
        // Prefer the structural context note; keep a single framing check first if present.
        const tagged = raw.map((r)=>withMutability(feature, r));
        return tagged.map((r)=>({
                ...r,
                checklistEligible: false
            }));
    }
    return raw.map((r)=>withMutability(feature, r));
}
function checklistRecommendationsForScore(feature, score) {
    return recommendationsForScore(feature, score).filter((r)=>r.checklistEligible);
}
}),
"[project]/lib/score-tone.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Shared score → color mapping for report dots / scatter. */ __turbopack_context__.s([
    "isFeatureMeasurable",
    ()=>isFeatureMeasurable,
    "scoreToneClass",
    ()=>scoreToneClass
]);
function scoreToneClass(score, unlocked) {
    if (!unlocked) return "bg-white/40";
    // Highest → light green; medium → blue; weakest → amber/orange
    if (score >= 75) return "bg-emerald-300";
    if (score >= 60) return "bg-sky-400";
    return "bg-amber-400";
}
function isFeatureMeasurable(measurable) {
    return measurable !== false;
}
}),
"[project]/components/report/InteractivePortrait.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InteractivePortrait",
    ()=>InteractivePortrait
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$object$2d$cover$2d$map$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/object-cover-map.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/recommendations.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/feature-mutability.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/score-tone.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/types/report.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const OBJECT_POS_X = 0.5;
const OBJECT_POS_Y = 0.18;
const POPOVER_W = 188;
const POPOVER_H = 168;
const POPOVER_GAP = 14;
const FALLBACK_OVERLAYS = [
    {
        id: "brow_l",
        feature: "eyebrow_shape",
        x: 0.38,
        y: 0.28
    },
    {
        id: "brow_r",
        feature: "eyebrow_shape",
        x: 0.62,
        y: 0.28
    },
    {
        id: "eye_l",
        feature: "eye_spacing",
        x: 0.37,
        y: 0.36
    },
    {
        id: "eye_r",
        feature: "eye_spacing",
        x: 0.63,
        y: 0.36
    },
    {
        id: "cheek_l",
        feature: "skin_clarity",
        x: 0.3,
        y: 0.48
    },
    {
        id: "cheek_r",
        feature: "skin_clarity",
        x: 0.7,
        y: 0.48
    },
    {
        id: "nose",
        feature: "facial_proportions",
        x: 0.5,
        y: 0.5
    },
    {
        id: "sym_l",
        feature: "face_symmetry",
        x: 0.28,
        y: 0.52
    },
    {
        id: "sym_r",
        feature: "face_symmetry",
        x: 0.72,
        y: 0.52
    },
    {
        id: "jaw_l",
        feature: "jawline_definition",
        x: 0.34,
        y: 0.72
    },
    {
        id: "jaw_r",
        feature: "jawline_definition",
        x: 0.66,
        y: 0.72
    },
    {
        id: "chin",
        feature: "jawline_definition",
        x: 0.5,
        y: 0.82
    }
];
function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
}
/** Place a compact card beside the dot, flipped to stay on the portrait. */ function popoverOrigin(leftPct, topPct, boxW, boxH) {
    const cx = leftPct / 100 * boxW;
    const cy = topPct / 100 * boxH;
    const placeRight = leftPct < 52;
    let left = placeRight ? cx + POPOVER_GAP : cx - POPOVER_GAP - POPOVER_W;
    let top = cy - POPOVER_H / 2;
    left = clamp(left, 8, Math.max(8, boxW - POPOVER_W - 8));
    top = clamp(top, 8, Math.max(8, boxH - POPOVER_H - 8));
    return {
        left,
        top,
        placeRight
    };
}
function InteractivePortrait({ report, faceSrc, usingUserPortrait, isUnlocked, topFeature, size = "default", openOnHover = false }) {
    const boxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const imgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [boxSize, setBoxSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        w: 0,
        h: 0
    });
    const [imgSize, setImgSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        w: 0,
        h: 0
    });
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const overlays = (report.featureOverlays?.length > 0 ? report.featureOverlays : FALLBACK_OVERLAYS).filter((d)=>d.feature !== "grooming_signal");
    const measure = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const box = boxRef.current;
        const img = imgRef.current;
        if (box) {
            const r = box.getBoundingClientRect();
            setBoxSize({
                w: r.width,
                h: r.height
            });
        }
        if (img && img.naturalWidth > 0) {
            setImgSize({
                w: img.naturalWidth,
                h: img.naturalHeight
            });
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        measure();
        const box = boxRef.current;
        if (!box || typeof ResizeObserver === "undefined") return;
        const ro = new ResizeObserver(()=>measure());
        ro.observe(box);
        return ()=>ro.disconnect();
    }, [
        measure,
        faceSrc
    ]);
    const selectedDot = overlays.find((d)=>d.id === selectedId) ?? null;
    const selectedScore = selectedDot ? report.features[selectedDot.feature] : null;
    const selectedPos = selectedDot ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$object$2d$cover$2d$map$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapNormToCoverPercent"])(selectedDot.x, selectedDot.y, imgSize.w || 1, imgSize.h || 1, boxSize.w || 1, boxSize.h || 1, OBJECT_POS_X, OBJECT_POS_Y) : null;
    const pop = selectedPos && boxSize.w > 0 ? popoverOrigin(selectedPos.left, selectedPos.top, boxSize.w, boxSize.h) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: size === "hero" ? "relative mx-auto w-full max-w-none" : "relative mx-auto w-full max-w-md lg:max-w-none",
        children: [
            "      ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: boxRef,
                className: "report-glass relative aspect-[3/4] overflow-hidden rounded-[2rem]",
                onClick: (e)=>{
                    if (e.target === e.currentTarget) setSelectedId(null);
                },
                onMouseLeave: ()=>{
                    if (openOnHover) setSelectedId(null);
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        ref: imgRef,
                        src: faceSrc,
                        alt: "",
                        className: "absolute inset-0 h-full w-full object-cover object-[50%_18%] opacity-90",
                        onLoad: measure,
                        onClick: ()=>setSelectedId(null)
                    }, void 0, false, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30",
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, this),
                    !usingUserPortrait && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-white/55 backdrop-blur-sm",
                        children: "Demo portrait"
                    }, void 0, false, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 175,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-black/35 px-2.5 py-1 text-[10px] text-white/50 backdrop-blur-sm",
                        children: openOnHover ? "Hover a point" : "Tap a point"
                    }, void 0, false, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this),
                    overlays.map((dot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OverlayDot, {
                            dot: dot,
                            score: report.features[dot.feature],
                            unlocked: isUnlocked(dot.feature),
                            active: selectedId === dot.id,
                            imgSize: imgSize,
                            boxSize: boxSize,
                            openOnHover: openOnHover,
                            onSelect: ()=>setSelectedId((prev)=>prev === dot.id ? null : dot.id),
                            onHoverOpen: ()=>setSelectedId(dot.id)
                        }, dot.id, false, {
                            fileName: "[project]/components/report/InteractivePortrait.tsx",
                            lineNumber: 185,
                            columnNumber: 11
                        }, this)),
                    isUnlocked(topFeature) && !selectedDot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute left-3 top-12 z-10 report-glass-chip rounded-2xl px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] uppercase tracking-[0.14em] text-white/45",
                                children: "Strongest"
                            }, void 0, false, {
                                fileName: "[project]/components/report/InteractivePortrait.tsx",
                                lineNumber: 203,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold text-white",
                                children: [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][topFeature],
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/70",
                                        children: report.features[topFeature].score
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                                        lineNumber: 208,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/InteractivePortrait.tsx",
                                lineNumber: 206,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 202,
                        columnNumber: 11
                    }, this),
                    selectedDot && selectedScore && pop && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureBreakdownCard, {
                        feature: selectedDot.feature,
                        packet: selectedScore,
                        unlocked: isUnlocked(selectedDot.feature),
                        placeRight: pop.placeRight,
                        style: {
                            left: pop.left,
                            top: pop.top
                        },
                        onClose: ()=>setSelectedId(null)
                    }, void 0, false, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 216,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/InteractivePortrait.tsx",
                lineNumber: 150,
                columnNumber: 12
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/report/InteractivePortrait.tsx",
        lineNumber: 144,
        columnNumber: 5
    }, this);
}
function OverlayDot({ dot, score, unlocked, active, imgSize, boxSize, openOnHover, onSelect, onHoverOpen }) {
    const pos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$object$2d$cover$2d$map$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapNormToCoverPercent"])(dot.x, dot.y, imgSize.w || 1, imgSize.h || 1, boxSize.w || 1, boxSize.h || 1, OBJECT_POS_X, OBJECT_POS_Y);
    const tone = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFeatureMeasurable"])(score.measurable) ? "bg-white/35" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scoreToneClass"])(score.score, unlocked);
    function onKeyDown(e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        "aria-label": `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][dot.feature]} — ${openOnHover ? "hover" : "tap"} for breakdown`,
        "aria-pressed": active,
        onClick: (e)=>{
            e.stopPropagation();
            onSelect();
        },
        onMouseEnter: ()=>{
            if (openOnHover) onHoverOpen();
        },
        onKeyDown: onKeyDown,
        className: `report-face-dot absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 ${active ? "report-face-dot--active" : ""}`,
        style: {
            left: `${pos.left}%`,
            top: `${pos.top}%`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `report-face-dot__core ${tone}`
            }, void 0, false, {
                fileName: "[project]/components/report/InteractivePortrait.tsx",
                lineNumber: 291,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `report-face-dot__ring ${tone}`,
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/components/report/InteractivePortrait.tsx",
                lineNumber: 292,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/report/InteractivePortrait.tsx",
        lineNumber: 274,
        columnNumber: 5
    }, this);
}
function FeatureBreakdownCard({ feature, packet, unlocked, placeRight, style, onClose }) {
    const measurable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFeatureMeasurable"])(packet.measurable);
    const mutability = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FEATURE_MUTABILITY"][feature];
    const tip = unlocked && measurable ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["recommendationsForScore"])(feature, packet.score)[0]?.action : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "dialog",
        "aria-label": `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][feature]} breakdown`,
        className: `report-face-popover absolute z-30 report-glass-chip rounded-xl px-3 py-2.5 ${placeRight ? "report-face-popover--from-left" : "report-face-popover--from-right"}`,
        style: {
            left: style.left,
            top: style.top,
            width: POPOVER_W
        },
        onClick: (e)=>e.stopPropagation(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[9px] uppercase tracking-[0.14em] text-white/45",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MUTABILITY_LABELS"][mutability]
                            }, void 0, false, {
                                fileName: "[project]/components/report/InteractivePortrait.tsx",
                                lineNumber: 337,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-0.5 truncate text-[13px] font-semibold text-white",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][feature]
                            }, void 0, false, {
                                fileName: "[project]/components/report/InteractivePortrait.tsx",
                                lineNumber: 340,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 336,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onClose,
                        className: "cursor-pointer rounded-full px-1.5 py-0.5 text-[10px] text-white/50 transition hover:bg-white/10 hover:text-white",
                        "aria-label": "Close breakdown",
                        children: "✕"
                    }, void 0, false, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 344,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/InteractivePortrait.tsx",
                lineNumber: 335,
                columnNumber: 7
            }, this),
            !measurable ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-amber-300/90",
                        children: "Not measured"
                    }, void 0, false, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 356,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 line-clamp-4 text-[11px] leading-snug text-white/75",
                        children: packet.gateNote ?? packet.observedSignal
                    }, void 0, false, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 359,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true) : unlocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1.5 flex flex-wrap items-baseline gap-x-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xl font-semibold tracking-tight text-white",
                                children: [
                                    packet.score,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-0.5 text-[11px] font-normal text-white/35",
                                        children: "/100"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                                        lineNumber: 368,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/InteractivePortrait.tsx",
                                lineNumber: 366,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.1em] text-white/55",
                                children: packet.confidence
                            }, void 0, false, {
                                fileName: "[project]/components/report/InteractivePortrait.tsx",
                                lineNumber: 372,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 365,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1.5 line-clamp-3 text-[11px] leading-snug text-white/75",
                        children: packet.observedSignal
                    }, void 0, false, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 376,
                        columnNumber: 11
                    }, this),
                    tip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1.5 border-t border-white/10 pt-1.5 text-[10px] leading-snug text-white/55",
                        children: [
                            "Tip: ",
                            tip
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 380,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1.5 text-[11px] leading-snug text-white/55",
                children: "Locked on free — unlock to see this region's score and signal."
            }, void 0, false, {
                fileName: "[project]/components/report/InteractivePortrait.tsx",
                lineNumber: 386,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/report/InteractivePortrait.tsx",
        lineNumber: 320,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/appearance/FaceGroomingReveal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FaceGroomingReveal",
    ()=>FaceGroomingReveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/types/report.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$InteractivePortrait$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/report/InteractivePortrait.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/score-tone.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function PillarCard({ pillar, features, delay = 0 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "ai-pillar report-glass",
        style: {
            animationDelay: `${delay}ms`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "ai-pillar__head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: pillar.label
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-pillar__conf",
                        children: [
                            pillar.confidence,
                            " confidence"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "ai-pillar__score",
                children: pillar.measurable && pillar.score != null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: (pillar.score / 10).toFixed(1)
                        }, void 0, false, {
                            fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                            lineNumber: 36,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                            children: "/10"
                        }, void 0, false, {
                            fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                            lineNumber: 37,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ai-pillar__na",
                    children: "Not measured"
                }, void 0, false, {
                    fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                    lineNumber: 40,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "ai-pillar__features",
                children: pillar.featureKeys.map((key)=>{
                    const packet = features[key];
                    if (!packet) return null;
                    const ok = packet.measurable !== false;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][key]
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                                lineNumber: 50,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: ok ? Math.round(packet.score) : "—"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                                lineNumber: 51,
                                columnNumber: 15
                            }, this)
                        ]
                    }, key, true, {
                        fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                        lineNumber: 49,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "ai-pillar__tips",
                children: pillar.tips.map((tip)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: tip
                    }, tip, false, {
                        fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
function FaceGroomingReveal({ report, pillars, onContinue, continueLabel = "Continue to style profile", continueNote = "Next: a few visual style choices (and later, a full-body photo)." }) {
    // Landmarks were measured on the real upload — never swap in the AI avatar here.
    const portraitId = report.portraitFileId;
    const faceSrc = portraitId ? `/api/files/${portraitId}` : "/woman1.png";
    const usingUserPortrait = Boolean(portraitId);
    const topFeature = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const ranked = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SCORED_APPEARANCE_KEYS"]
        ].filter((k)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFeatureMeasurable"])(report.features[k]?.measurable)).sort((a, b)=>(report.features[b]?.score ?? 0) - (report.features[a]?.score ?? 0));
        return ranked[0] ?? "face_symmetry";
    }, [
        report.features
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "ai-reveal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-reveal__intro",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-reveal__eyebrow",
                        children: "Stage 1 · Face & Grooming Index"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Your first reveal"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Two separate pillars — structure from your face mesh, grooming from skin and finish. Hover the landmark dots for feature details."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-reveal__grid",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ai-reveal__portrait-wrap",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$InteractivePortrait$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InteractivePortrait"], {
                            report: report,
                            faceSrc: faceSrc,
                            usingUserPortrait: usingUserPortrait,
                            isUnlocked: ()=>true,
                            topFeature: topFeature,
                            openOnHover: true
                        }, void 0, false, {
                            fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ai-reveal__pillars",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PillarCard, {
                                pillar: pillars.structure,
                                features: report.features,
                                delay: 80
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PillarCard, {
                                pillar: pillars.grooming,
                                features: report.features,
                                delay: 200
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-reveal__cta",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "ai-btn",
                        onClick: onContinue,
                        children: continueLabel
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-reveal__note",
                        children: continueNote
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/appearance/StyleIllustrations.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DressIllustration",
    ()=>DressIllustration,
    "JeansIllustration",
    ()=>JeansIllustration,
    "SilhouetteIllustration",
    ()=>SilhouetteIllustration,
    "SkirtIllustration",
    ()=>SkirtIllustration,
    "TrousersIllustration",
    ()=>TrousersIllustration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
function DressIllustration({ className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 80 96",
        fill: "none",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M28 14c0-6 5-10 12-10s12 4 12 10v6l8 4-4 14h-32l-4-14 8-4v-6z",
                fill: "currentColor",
                opacity: "0.85"
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleIllustrations.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M24 38h32l10 48H14L24 38z",
                fill: "currentColor",
                opacity: "0.55"
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleIllustrations.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "40",
                cy: "10",
                r: "5",
                fill: "currentColor",
                opacity: "0.9"
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleIllustrations.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/StyleIllustrations.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
function JeansIllustration({ className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 80 96",
        fill: "none",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M26 18h28v10l4 4v54H42V52h-4v34H22V32l4-4V18z",
                fill: "currentColor",
                opacity: "0.7"
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleIllustrations.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M30 28h20",
                stroke: "currentColor",
                strokeWidth: "2",
                opacity: "0.4"
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleIllustrations.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M40 32v20",
                stroke: "currentColor",
                strokeWidth: "2",
                opacity: "0.35"
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleIllustrations.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "40",
                cy: "12",
                r: "5",
                fill: "currentColor",
                opacity: "0.85"
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleIllustrations.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/StyleIllustrations.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
function SkirtIllustration({ className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 80 96",
        fill: "none",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "40",
                cy: "12",
                r: "5",
                fill: "currentColor",
                opacity: "0.85"
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleIllustrations.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M30 18h20v16H30z",
                fill: "currentColor",
                opacity: "0.75"
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleIllustrations.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M28 34h24l14 46H14L28 34z",
                fill: "currentColor",
                opacity: "0.5"
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleIllustrations.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/StyleIllustrations.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
function TrousersIllustration({ className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 80 96",
        fill: "none",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "40",
                cy: "12",
                r: "5",
                fill: "currentColor",
                opacity: "0.85"
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleIllustrations.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M28 18h24v12l3 4v52H42V48h-4v38H25V34l3-4V18z",
                fill: "currentColor",
                opacity: "0.65"
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleIllustrations.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/StyleIllustrations.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
function SilhouetteIllustration({ variant, className = "" }) {
    const width = variant === "fitted" ? 22 : variant === "relaxed" ? 30 : 40;
    const x = 40 - width / 2;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 80 96",
        fill: "none",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "40",
                cy: "14",
                r: "8",
                fill: "currentColor",
                opacity: "0.8"
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleIllustrations.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: x,
                y: "26",
                width: width,
                height: "52",
                rx: variant === "fitted" ? 6 : 10,
                fill: "currentColor",
                opacity: "0.55"
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleIllustrations.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/StyleIllustrations.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/appearance/StylePrefsForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StylePrefsForm",
    ()=>StylePrefsForm,
    "stylePrefsComplete",
    ()=>stylePrefsComplete
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/appearance-index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleIllustrations$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/StyleIllustrations.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function bottomArt(id) {
    const cls = "h-16 w-14 text-current";
    switch(id){
        case "dresses":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleIllustrations$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DressIllustration"], {
                className: cls
            }, void 0, false, {
                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                lineNumber: 33,
                columnNumber: 14
            }, this);
        case "jeans":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleIllustrations$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JeansIllustration"], {
                className: cls
            }, void 0, false, {
                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                lineNumber: 35,
                columnNumber: 14
            }, this);
        case "skirts":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleIllustrations$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SkirtIllustration"], {
                className: cls
            }, void 0, false, {
                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                lineNumber: 37,
                columnNumber: 14
            }, this);
        case "trousers":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleIllustrations$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrousersIllustration"], {
                className: cls
            }, void 0, false, {
                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                lineNumber: 39,
                columnNumber: 14
            }, this);
    }
}
function StylePrefsForm({ value, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "style-prefs",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                className: "style-prefs__block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                        className: "style-prefs__legend",
                        children: "Favorite color"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "style-prefs__hint",
                        children: "Pick the tone you reach for most."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "style-prefs__swatches",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FAVORITE_COLORS"].map((c)=>{
                            const selected = value.favoriteColor === c.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: `style-prefs__swatch${selected ? " is-selected" : ""}`,
                                style: {
                                    background: c.hex
                                },
                                "aria-pressed": selected,
                                "aria-label": c.label,
                                onClick: ()=>onChange({
                                        ...value,
                                        favoriteColor: c.id
                                    }),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "style-prefs__swatch-label",
                                    children: c.label
                                }, void 0, false, {
                                    fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                    lineNumber: 67,
                                    columnNumber: 17
                                }, this)
                            }, c.id, false, {
                                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                lineNumber: 53,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                className: "style-prefs__block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                        className: "style-prefs__legend",
                        children: "What do you prefer?"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "style-prefs__hint",
                        children: "Dresses, jeans, or something else — tap the look that feels like you."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "style-prefs__cards",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BOTTOM_PREFERENCES"].map((opt)=>{
                            const selected = value.bottomPreference === opt.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: `style-prefs__card${selected ? " is-selected" : ""}`,
                                "aria-pressed": selected,
                                onClick: ()=>onChange({
                                        ...value,
                                        bottomPreference: opt.id
                                    }),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "style-prefs__card-art",
                                        "aria-hidden": true,
                                        children: bottomArt(opt.id)
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 95,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "style-prefs__card-label",
                                        children: opt.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 98,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "style-prefs__card-hint",
                                        children: opt.hint
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 99,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, opt.id, true, {
                                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                lineNumber: 83,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                className: "style-prefs__block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                        className: "style-prefs__legend",
                        children: "Silhouette"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "style-prefs__hint",
                        children: "How do clothes usually sit on you?"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "style-prefs__cards style-prefs__cards--3",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SILHOUETTE_PREFERENCES"].map((opt)=>{
                            const selected = value.silhouette === opt.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: `style-prefs__card${selected ? " is-selected" : ""}`,
                                "aria-pressed": selected,
                                onClick: ()=>onChange({
                                        ...value,
                                        silhouette: opt.id
                                    }),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "style-prefs__card-art",
                                        "aria-hidden": true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleIllustrations$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SilhouetteIllustration"], {
                                            variant: opt.id,
                                            className: "h-16 w-14 text-current"
                                        }, void 0, false, {
                                            fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                            lineNumber: 126,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 125,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "style-prefs__card-label",
                                        children: opt.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 131,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "style-prefs__card-hint",
                                        children: opt.hint
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 132,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, opt.id, true, {
                                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                lineNumber: 113,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                className: "style-prefs__block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                        className: "style-prefs__legend",
                        children: "Overall vibe"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "style-prefs__hint",
                        children: "The energy you want your looks to send."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "style-prefs__chips",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STYLE_VIBES"].map((opt)=>{
                            const selected = value.vibe === opt.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: `style-prefs__chip${selected ? " is-selected" : ""}`,
                                "aria-pressed": selected,
                                onClick: ()=>onChange({
                                        ...value,
                                        vibe: opt.id
                                    }),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: opt.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 155,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: opt.hint
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 156,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, opt.id, true, {
                                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                lineNumber: 146,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                className: "style-prefs__block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                        className: "style-prefs__legend",
                        children: "Budget for pieces"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "style-prefs__hint",
                        children: "Used later for shoppable looks — not a judgment."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "style-prefs__chips",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STYLE_BUDGETS"].map((opt)=>{
                            const selected = value.budget === opt.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: `style-prefs__chip${selected ? " is-selected" : ""}`,
                                "aria-pressed": selected,
                                onClick: ()=>onChange({
                                        ...value,
                                        budget: opt.id
                                    }),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: opt.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 181,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: opt.hint
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 182,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, opt.id, true, {
                                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                lineNumber: 172,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
function stylePrefsComplete(value) {
    return Boolean(value.favoriteColor && value.bottomPreference && value.silhouette && value.vibe && value.budget);
}
}),
"[project]/components/appearance/StyleCollectStage.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StyleCollectStage",
    ()=>StyleCollectStage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StylePrefsForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/StylePrefsForm.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function StyleCollectStage({ onSubmit, saving, error }) {
    const [prefs, setPrefs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const ready = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StylePrefsForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stylePrefsComplete"])(prefs);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "ai-reveal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-reveal__intro",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-reveal__eyebrow",
                        children: "Stage 2 · Style preferences"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleCollectStage.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "What do you actually wear?"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleCollectStage.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Quick visual picks — favorite color, dresses vs jeans, silhouette, vibe, and budget. Full-body photo analysis comes next; these answers already shape your Style Profile."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleCollectStage.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/StyleCollectStage.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StylePrefsForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StylePrefsForm"], {
                value: prefs,
                onChange: setPrefs
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleCollectStage.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "ai-error",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleCollectStage.tsx",
                lineNumber: 36,
                columnNumber: 16
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-reveal__cta",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "ai-btn",
                        disabled: !ready || saving,
                        onClick: ()=>{
                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StylePrefsForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stylePrefsComplete"])(prefs)) onSubmit(prefs);
                        },
                        children: saving ? "Saving…" : "See my Style Profile"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleCollectStage.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-reveal__note",
                        children: "Full-body upload for height/build estimates will plug in here next — any estimates will be labeled as AI estimates, not measurements."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleCollectStage.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/StyleCollectStage.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/StyleCollectStage.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/appearance/StyleProfileReveal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StyleProfileReveal",
    ()=>StyleProfileReveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/appearance-index.ts [app-ssr] (ecmascript)");
"use client";
;
;
function StyleProfileReveal({ journey, onContinue }) {
    const profile = journey.styleProfile;
    const prefs = profile?.preferences ?? journey.stylePreferences;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "ai-reveal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-reveal__intro",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-reveal__eyebrow",
                        children: "Stage 2 · Style Profile"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Your style read"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Built from your answers. Vision signals from a full-body photo will refine this later."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                className: "ai-style-card report-glass",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-style-card__summary",
                        children: profile?.summary ?? "Style preferences saved."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    profile?.estimateNote ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-style-card__estimate",
                        children: profile.estimateNote
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this) : null,
                    prefs ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                        className: "ai-style-card__grid",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: "Color"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 44,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ai-style-card__dot",
                                                style: {
                                                    background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FAVORITE_COLORS"].find((c)=>c.id === prefs.favoriteColor)?.hex ?? "#888"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                                lineNumber: 46,
                                                columnNumber: 17
                                            }, this),
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FAVORITE_COLORS"].find((c)=>c.id === prefs.favoriteColor)?.label
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 45,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: "Prefer"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 61,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BOTTOM_PREFERENCES"].find((b)=>b.id === prefs.bottomPreference)?.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 62,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                lineNumber: 60,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: "Silhouette"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 71,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SILHOUETTE_PREFERENCES"].find((s)=>s.id === prefs.silhouette)?.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 72,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: "Vibe"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 80,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STYLE_VIBES"].find((v)=>v.id === prefs.vibe)?.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 81,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: "Budget"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STYLE_BUDGETS"].find((b)=>b.id === prefs.budget)?.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-reveal__cta",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "ai-btn",
                        onClick: onContinue,
                        children: "Generate my looks"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-reveal__note",
                        children: "Next: three outfit stills using your face — styled from these preferences."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/appearance/LooksReveal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LooksReveal",
    ()=>LooksReveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/appearance-index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const LOOK_SLOTS = [
    0
];
const LOOK_COUNT = LOOK_SLOTS.length;
function authHeaders() {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    return {
        "Content-Type": "application/json",
        ...token ? {
            Authorization: `Bearer ${token}`
        } : {}
    };
}
function labelFor(_index) {
    return "Your prescribed look";
}
function phaseFromStatus(status) {
    if (status === "ready") return "ready";
    if (status === "failed") return "failed";
    if (status === "generating_garment") return "garment";
    if (status === "garment_ready") return "garment_ready";
    if (status === "generating_pose") return "pose";
    if (status === "generating_tryon") return "tryon";
    return "waiting";
}
function phaseLabel(phase) {
    switch(phase){
        case "garment":
            return "Generating garment…";
        case "garment_ready":
            return "Garment generated";
        case "pose":
            return "Creating fashion pose…";
        case "tryon":
            return "Styling look via virtual try-on…";
        case "ready":
            return "Ready";
        case "failed":
            return "Couldn’t generate";
        default:
            return "Waiting…";
    }
}
function isBusyPhase(phase) {
    return phase === "garment" || phase === "garment_ready" || phase === "pose" || phase === "tryon";
}
function seedLooks(from) {
    return LOOK_SLOTS.map((index)=>{
        const existing = from?.[index];
        if (existing) {
            const phase = phaseFromStatus(existing.status);
            return {
                ...existing,
                phase,
                error: phase === "failed" && existing.error ? friendlyGenError(0, existing.error) : existing.error
            };
        }
        return {
            id: `look-${index}`,
            index,
            label: labelFor(index),
            status: "pending",
            fileId: null,
            recommendedStyle: "",
            error: null,
            phase: "waiting"
        };
    });
}
function mergeLook(looks, next) {
    const copy = [
        ...looks
    ];
    while(copy.length < LOOK_COUNT){
        copy.push({
            id: `look-${copy.length}`,
            index: copy.length,
            label: labelFor(copy.length),
            status: "pending",
            fileId: null,
            recommendedStyle: "",
            error: null,
            phase: "waiting"
        });
    }
    if (next.index >= 0 && next.index < LOOK_COUNT) {
        copy[next.index] = next;
    }
    return copy.slice(0, LOOK_COUNT);
}
function sleep(ms) {
    return new Promise((r)=>setTimeout(r, ms));
}
function isGatewayTimeout(status, raw) {
    const text = raw.replace(/\s+/g, " ").trim();
    return status === 502 || status === 504 || status === 408 || /^Internal\s/i.test(text) || text.startsWith("<!DOCTYPE") || text.includes("Unexpected token") || /timed?\s*out/i.test(text) || /took too long/i.test(text) || /socket hang up/i.test(text) || /ECONNRESET/i.test(text);
}
async function fetchJourney(reportId) {
    try {
        const res = await fetch(`/api/appearance/${reportId}`, {
            headers: authHeaders(),
            cache: "no-store"
        });
        const data = await res.json();
        return data.journey ?? null;
    } catch  {
        return null;
    }
}
/** Poll until this look is ready/failed; stream intermediate phases to the UI. */ async function pollLookUntilSettled(reportId, lookIndex, opts) {
    const maxMs = opts.maxMs ?? 360_000;
    const intervalMs = opts.intervalMs ?? 1500;
    const started = Date.now();
    while(Date.now() - started < maxMs){
        if (opts.signal.aborted) return null;
        const journey = await fetchJourney(reportId);
        const look = journey?.looks?.[lookIndex];
        if (look) {
            opts.onUpdate(look);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isLookSettled"])(look.status)) return look;
        }
        await sleep(intervalMs);
    }
    return null;
}
async function postGenerateLook(reportId, lookIndex, signal) {
    const res = await fetch(`/api/appearance/${reportId}/looks/generate`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
            lookIndex
        }),
        signal
    });
    const raw = await res.text();
    let data = {};
    try {
        data = raw ? JSON.parse(raw) : {};
    } catch  {
        data = {};
    }
    return {
        ok: res.ok || res.status === 202,
        status: res.status,
        journey: data.journey,
        look: data.look,
        error: data.error,
        raw
    };
}
function toUiLook(look) {
    const phase = phaseFromStatus(look.status);
    return {
        ...look,
        phase,
        error: phase === "failed" && look.error ? friendlyGenError(0, look.error) : look.error
    };
}
function ebaySearchHref(style) {
    const query = encodeURIComponent((style || "outfit").slice(0, 80));
    return `https://www.ebay.com/sch/i.html?_nkw=${query}`;
}
function buildEbayShopLinks(recommendedStyle, prefs) {
    const full = recommendedStyle.trim() || (prefs ? `${prefs.vibe} ${prefs.silhouette} ${prefs.bottomPreference}` : "women outfit");
    const links = [
        {
            id: "full",
            label: "Full look",
            query: full,
            href: ebaySearchHref(full)
        }
    ];
    if (prefs) {
        const colorBottom = `${prefs.favoriteColor} ${prefs.bottomPreference}`;
        links.push({
            id: "piece",
            label: "Main piece",
            query: colorBottom,
            href: ebaySearchHref(colorBottom)
        });
        links.push({
            id: "silhouette",
            label: "Silhouette",
            query: `${prefs.silhouette} ${prefs.bottomPreference} ${prefs.vibe}`,
            href: ebaySearchHref(`${prefs.silhouette} ${prefs.bottomPreference} ${prefs.vibe}`)
        });
    }
    return links;
}
/** Approximate hotspots on the after still — coaching upgrades, not landmark locks. */ function buildUpgradeHotspots(pillars, prefs, recommendedStyle) {
    const spots = [];
    const faceTip = pillars.grooming.tips[0] ?? pillars.structure.tips[0] ?? "Keep grooming consistent so rechecks measure real change.";
    spots.push({
        id: "face",
        region: "face",
        top: "18%",
        left: "52%",
        title: "Face & grooming",
        tip: faceTip
    });
    const structureTip = pillars.structure.tips[0];
    if (structureTip && structureTip !== faceTip) {
        spots.push({
            id: "framing",
            region: "face",
            top: "28%",
            left: "78%",
            title: "Framing",
            tip: structureTip
        });
    }
    const outfitLine = recommendedStyle.trim() || (prefs ? `${prefs.vibe} ${prefs.silhouette} ${prefs.bottomPreference}` : "Your prescribed outfit");
    spots.push({
        id: "outfit",
        region: "outfit",
        top: "48%",
        left: "28%",
        title: "Outfit match",
        tip: `This look is dialed to your style profile: ${outfitLine}. Shop close matches on eBay next.`
    });
    if (prefs) {
        spots.push({
            id: "silhouette",
            region: "silhouette",
            top: "72%",
            left: "62%",
            title: `${prefs.silhouette} silhouette`,
            tip: `You chose ${prefs.silhouette} + ${prefs.bottomPreference}. Keep this shape when shopping so the prescription stays coherent.`
        });
    }
    return spots.slice(0, 4);
}
function LooksReveal({ reportId, portraitFileId, journey, onJourneyUpdate, onFinish }) {
    const [looks, setLooks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>seedLooks(journey.looks));
    const [retryingIndex, setRetryingIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeHotspot, setActiveHotspot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [shopOpen, setShopOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [shopLinkId, setShopLinkId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("full");
    const onJourneyUpdateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(onJourneyUpdate);
    const prefsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(journey.looks);
    const retryAbortRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const applyLookUpdate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((look)=>{
        setLooks((prev)=>mergeLook(prev, toUiLook(look)));
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        onJourneyUpdateRef.current = onJourneyUpdate;
    }, [
        onJourneyUpdate
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        prefsRef.current = journey.looks;
    }, [
        journey.looks
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (journey.looks?.length) {
            setLooks((prev)=>{
                const next = seedLooks(journey.looks);
                return next.map((s, i)=>{
                    const was = prev[i];
                    if ((s.phase === "waiting" || isBusyPhase(s.phase)) && was && isBusyPhase(was.phase) && s.phase === "waiting") {
                        return was;
                    }
                    return s;
                });
            });
        }
    }, [
        journey.looks
    ]);
    const retryLook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (lookIndex)=>{
        if (retryingIndex != null) return;
        retryAbortRef.current?.abort();
        const ac = new AbortController();
        retryAbortRef.current = ac;
        setRetryingIndex(lookIndex);
        const prev = looks[lookIndex];
        setLooks((cur)=>mergeLook(cur, {
                ...prev ?? {
                    id: `look-${lookIndex}`,
                    index: lookIndex,
                    label: labelFor(lookIndex),
                    recommendedStyle: "",
                    status: "pending",
                    fileId: null,
                    error: null,
                    phase: "waiting"
                },
                status: prev?.garmentFileId ? "generating_pose" : "generating_garment",
                fileId: null,
                error: null,
                phase: prev?.garmentFileId ? "pose" : "garment",
                garmentFileId: prev?.garmentFileId ?? null
            }));
        try {
            const posted = await postGenerateLook(reportId, lookIndex, ac.signal);
            if (ac.signal.aborted) return;
            if (posted.journey) onJourneyUpdateRef.current(posted.journey);
            if (posted.look) applyLookUpdate(posted.look);
            if (posted.look && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isLookSettled"])(posted.look.status)) {
                return;
            }
            const settled = await pollLookUntilSettled(reportId, lookIndex, {
                signal: ac.signal,
                onUpdate: applyLookUpdate
            });
            if (ac.signal.aborted) return;
            if (settled) {
                applyLookUpdate(settled);
                const refreshed = await fetchJourney(reportId);
                if (refreshed) onJourneyUpdateRef.current(refreshed);
            } else {
                applyLookUpdate({
                    id: prev?.id ?? `look-${lookIndex}`,
                    index: lookIndex,
                    label: labelFor(lookIndex),
                    status: "failed",
                    fileId: null,
                    garmentFileId: prev?.garmentFileId ?? null,
                    recommendedStyle: prev?.recommendedStyle ?? "",
                    error: "Timed out waiting for this look."
                });
            }
        } catch (err) {
            if (ac.signal.aborted) return;
            applyLookUpdate({
                id: prev?.id ?? `look-${lookIndex}`,
                index: lookIndex,
                label: labelFor(lookIndex),
                status: "failed",
                fileId: null,
                garmentFileId: prev?.garmentFileId ?? null,
                recommendedStyle: prev?.recommendedStyle ?? "",
                error: friendlyGenError(0, err instanceof Error ? err.message : "Retry failed.")
            });
        } finally{
            if (!ac.signal.aborted) {
                setRetryingIndex(null);
            }
        }
    }, [
        applyLookUpdate,
        looks,
        reportId,
        retryingIndex
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const ac = new AbortController();
        const initial = seedLooks(prefsRef.current);
        setLooks(initial);
        void (async ()=>{
            for (const lookIndex of LOOK_SLOTS){
                if (ac.signal.aborted) return;
                const latest = await fetchJourney(reportId);
                if (ac.signal.aborted) return;
                const existing = latest?.looks?.[lookIndex];
                if (existing?.status === "ready" && existing.fileId) {
                    applyLookUpdate(existing);
                    if (latest) onJourneyUpdateRef.current(latest);
                    continue;
                }
                if (existing?.status === "failed") {
                    applyLookUpdate(existing);
                    if (latest) onJourneyUpdateRef.current(latest);
                    continue;
                }
                setLooks((prev)=>mergeLook(prev, {
                        ...prev[lookIndex] ?? {
                            id: `look-${lookIndex}`,
                            index: lookIndex,
                            label: labelFor(lookIndex),
                            recommendedStyle: existing?.recommendedStyle ?? "",
                            garmentFileId: existing?.garmentFileId ?? null
                        },
                        status: existing?.status ?? "generating_garment",
                        fileId: null,
                        error: null,
                        phase: existing ? phaseFromStatus(existing.status) : "garment"
                    }));
                try {
                    const posted = await postGenerateLook(reportId, lookIndex, ac.signal);
                    if (ac.signal.aborted) return;
                    if (posted.journey) onJourneyUpdateRef.current(posted.journey);
                    if (posted.look) applyLookUpdate(posted.look);
                    if (posted.look && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isLookSettled"])(posted.look.status)) {
                        continue;
                    }
                    if (!posted.ok && posted.status !== 202 && !isGatewayTimeout(posted.status, posted.raw)) {
                        console.warn("[LooksReveal] generate returned", posted.status, posted.raw.slice(0, 200));
                    }
                    const settled = await pollLookUntilSettled(reportId, lookIndex, {
                        signal: ac.signal,
                        onUpdate: applyLookUpdate
                    });
                    if (ac.signal.aborted) return;
                    if (settled) {
                        applyLookUpdate(settled);
                        const refreshed = await fetchJourney(reportId);
                        if (refreshed) onJourneyUpdateRef.current(refreshed);
                    } else {
                        applyLookUpdate({
                            id: `look-${lookIndex}`,
                            index: lookIndex,
                            label: labelFor(lookIndex),
                            status: "failed",
                            fileId: null,
                            garmentFileId: existing?.garmentFileId ?? null,
                            recommendedStyle: initial[lookIndex]?.recommendedStyle ?? "",
                            error: "Timed out waiting for this look."
                        });
                    }
                } catch (err) {
                    if (ac.signal.aborted) return;
                    const settled = await pollLookUntilSettled(reportId, lookIndex, {
                        signal: ac.signal,
                        onUpdate: applyLookUpdate,
                        maxMs: 180_000
                    });
                    if (ac.signal.aborted) return;
                    if (settled) {
                        applyLookUpdate(settled);
                        const refreshed = await fetchJourney(reportId);
                        if (refreshed) onJourneyUpdateRef.current(refreshed);
                    } else {
                        applyLookUpdate({
                            id: `look-${lookIndex}`,
                            index: lookIndex,
                            label: labelFor(lookIndex),
                            status: "failed",
                            fileId: null,
                            garmentFileId: existing?.garmentFileId ?? null,
                            recommendedStyle: "",
                            error: friendlyGenError(0, err instanceof Error ? err.message : "Generation failed.")
                        });
                    }
                }
            }
            if (ac.signal.aborted) return;
            const refreshed = await fetchJourney(reportId);
            if (refreshed) onJourneyUpdateRef.current(refreshed);
        })();
        return ()=>{
            ac.abort();
            retryAbortRef.current?.abort();
        };
    }, [
        reportId,
        applyLookUpdate
    ]);
    const look = looks[0] ?? null;
    const ready = Boolean(look?.phase === "ready" && look.fileId);
    const failed = look?.phase === "failed" && retryingIndex == null;
    const loading = look != null && (isBusyPhase(look.phase) || retryingIndex === look.index);
    const allSettled = looks.length === LOOK_COUNT && looks.every((l)=>l.phase === "ready" || l.phase === "failed");
    const youSrc = portraitFileId ? `/api/files/${portraitFileId}` : null;
    const hotspots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>buildUpgradeHotspots(journey.pillars, journey.stylePreferences, look?.recommendedStyle ?? ""), [
        journey.pillars,
        journey.stylePreferences,
        look?.recommendedStyle
    ]);
    const ebayLinks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>buildEbayShopLinks(look?.recommendedStyle ?? "", journey.stylePreferences), [
        look?.recommendedStyle,
        journey.stylePreferences
    ]);
    const activeShopLink = ebayLinks.find((l)=>l.id === shopLinkId) ?? ebayLinks[0] ?? null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!shopOpen) return;
        const onKey = (e)=>{
            if (e.key === "Escape") setShopOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return ()=>window.removeEventListener("keydown", onKey);
    }, [
        shopOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "ai-reveal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-reveal__intro",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-reveal__eyebrow",
                        children: "Stage 3 · Prescription"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 672,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Before & after"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 673,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Your photo versus one prescribed look. Hover the markers on the after still for upgrades tied to your profile.",
                            loading && look ? ` ${phaseLabel(look.phase)}` : ready ? " Ready." : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 674,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/LooksReveal.tsx",
                lineNumber: 671,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-ba",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "ai-ba__panel report-glass",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ai-ba__media",
                                children: [
                                    youSrc ? // eslint-disable-next-line @next/next/no-img-element
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: youSrc,
                                        alt: "Before — your photo",
                                        className: "ai-look-card__img"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 690,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ai-look-card__pulse",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "ai-look-card__pulse-label",
                                            children: "Your photo"
                                        }, void 0, false, {
                                            fileName: "[project]/components/appearance/LooksReveal.tsx",
                                            lineNumber: 693,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 692,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ai-ba__badge",
                                        children: "Before"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 696,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 687,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ai-ba__caption",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "Original"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 699,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Baseline selfie for comparison."
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 700,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 698,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 686,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: `ai-ba__panel report-glass${loading ? " is-loading" : ""}${failed ? " is-failed" : ""}${ready ? " is-ready" : ""}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ai-ba__media",
                                children: [
                                    ready && look?.fileId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: `/api/files/${look.fileId}`,
                                                alt: "After — prescribed look",
                                                className: "ai-look-card__img"
                                            }, void 0, false, {
                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                lineNumber: 711,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ai-ba__hotspots",
                                                "aria-label": "Upgrade highlights",
                                                children: hotspots.map((spot)=>{
                                                    const open = activeHotspot === spot.id;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: `ai-ba__hotspot ai-ba__hotspot--${spot.region}${open ? " is-open" : ""}`,
                                                        style: {
                                                            top: spot.top,
                                                            left: spot.left
                                                        },
                                                        "aria-expanded": open,
                                                        "aria-describedby": `hotspot-tip-${spot.id}`,
                                                        onMouseEnter: ()=>setActiveHotspot(spot.id),
                                                        onMouseLeave: ()=>setActiveHotspot(null),
                                                        onFocus: ()=>setActiveHotspot(spot.id),
                                                        onBlur: ()=>setActiveHotspot(null),
                                                        onClick: ()=>setActiveHotspot((cur)=>cur === spot.id ? null : spot.id),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ai-ba__hotspot-dot",
                                                                "aria-hidden": true
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                                lineNumber: 737,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                id: `hotspot-tip-${spot.id}`,
                                                                className: "ai-ba__hotspot-tip",
                                                                role: "tooltip",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        children: spot.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                                        lineNumber: 743,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: spot.tip
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                                        lineNumber: 744,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                                lineNumber: 738,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, spot.id, true, {
                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                        lineNumber: 720,
                                                        columnNumber: 23
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                lineNumber: 716,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true) : look?.garmentFileId && (look.phase === "garment_ready" || look.phase === "pose" || look.phase === "tryon" || look.phase === "failed") ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ai-look-card__garment-stage",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: `/api/files/${look.garmentFileId}`,
                                                alt: "",
                                                className: "ai-look-card__garment-thumb"
                                            }, void 0, false, {
                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                lineNumber: 758,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ai-look-card__pulse ai-look-card__pulse--overlay",
                                                "aria-hidden": true,
                                                children: [
                                                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ai-look-card__pulse-ring"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                        lineNumber: 767,
                                                        columnNumber: 30
                                                    }, this) : null,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "ai-look-card__pulse-label",
                                                        children: retryingIndex != null ? "Retrying…" : look ? phaseLabel(look.phase) : "Waiting…"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                        lineNumber: 768,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                lineNumber: 763,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 756,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ai-look-card__pulse",
                                        "aria-hidden": true,
                                        children: [
                                            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ai-look-card__pulse-ring"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                        lineNumber: 781,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ai-look-card__pulse-ring ai-look-card__pulse-ring--delay"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                        lineNumber: 782,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "ai-look-card__pulse-label",
                                                children: look ? phaseLabel(look.phase) : "Waiting…"
                                            }, void 0, false, {
                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                lineNumber: 785,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 778,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ai-ba__badge ai-ba__badge--after",
                                        children: "After"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 790,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 707,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ai-ba__caption",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: look?.label ?? "Prescribed look"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 793,
                                        columnNumber: 13
                                    }, this),
                                    look?.recommendedStyle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: look.recommendedStyle
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 794,
                                        columnNumber: 39
                                    }, this) : null,
                                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "ai-look-card__stage",
                                        children: retryingIndex != null && look?.garmentFileId ? "Garment saved · retrying pose + try-on…" : look?.phase === "tryon" ? "Pose ready · styling via virtual try-on…" : look?.phase === "pose" ? "Garment ready · creating a fashion pose…" : phaseLabel(look?.phase ?? "waiting")
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 796,
                                        columnNumber: 15
                                    }, this) : null,
                                    failed && look?.error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "ai-look-card__error",
                                        children: look.error
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 807,
                                        columnNumber: 15
                                    }, this) : null,
                                    failed && retryingIndex == null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "ai-look-card__retry",
                                        onClick: ()=>void retryLook(0),
                                        children: look?.garmentFileId ? "Retry pose + try-on" : "Retry look"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 810,
                                        columnNumber: 15
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 792,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 704,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "ai-ba__shop report-glass",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "ai-ba__shop-eyebrow",
                                children: "Shop the look"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 822,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "Check eBay prices"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 823,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Browse live listings that match this outfit prescription. Affiliate links stay free."
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 824,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: `ai-ba__shop-cta${ready ? "" : " is-disabled"}`,
                                disabled: !ready,
                                onClick: ()=>{
                                    setShopLinkId(ebayLinks[0]?.id ?? "full");
                                    setShopOpen(true);
                                },
                                children: ready ? "Browse eBay prices →" : "Available when look is ready"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 828,
                                columnNumber: 11
                            }, this),
                            look?.recommendedStyle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "ai-ba__shop-query",
                                children: look.recommendedStyle
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 840,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 821,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/LooksReveal.tsx",
                lineNumber: 685,
                columnNumber: 7
            }, this),
            shopOpen && activeShopLink ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EbayShopModal, {
                links: ebayLinks,
                activeId: activeShopLink.id,
                onSelect: setShopLinkId,
                onClose: ()=>setShopOpen(false)
            }, void 0, false, {
                fileName: "[project]/components/appearance/LooksReveal.tsx",
                lineNumber: 846,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-reveal__cta",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "ai-btn",
                    onClick: onFinish,
                    disabled: !allSettled && !ready,
                    children: allSettled || ready ? "Finish this pass" : "Continue while look finishes"
                }, void 0, false, {
                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                    lineNumber: 855,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/appearance/LooksReveal.tsx",
                lineNumber: 854,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/LooksReveal.tsx",
        lineNumber: 670,
        columnNumber: 5
    }, this);
}
function EbayShopModal({ links, activeId, onSelect, onClose }) {
    const active = links.find((l)=>l.id === activeId) ?? links[0];
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const ac = new AbortController();
        setLoading(true);
        setError(null);
        setItems([]);
        void (async ()=>{
            try {
                const qs = new URLSearchParams({
                    q: active.query,
                    limit: "12"
                });
                const res = await fetch(`/api/ebay/search?${qs}`, {
                    headers: authHeaders(),
                    signal: ac.signal,
                    cache: "no-store"
                });
                const raw = await res.text();
                let data = {};
                try {
                    data = raw ? JSON.parse(raw) : {};
                } catch  {
                    data = {};
                }
                if (ac.signal.aborted) return;
                if (!res.ok) {
                    setError(data.error || `Search failed (${res.status}).`);
                    setItems([]);
                    return;
                }
                setItems(Array.isArray(data.items) ? data.items : []);
            } catch (err) {
                if (ac.signal.aborted) return;
                setError(err instanceof Error ? err.message : "Couldn’t load eBay listings.");
                setItems([]);
            } finally{
                if (!ac.signal.aborted) setLoading(false);
            }
        })();
        return ()=>ac.abort();
    }, [
        active.query
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ai-ebay-modal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "ai-ebay-modal__backdrop",
                "aria-label": "Close eBay shop",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/components/appearance/LooksReveal.tsx",
                lineNumber: 934,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "dialog",
                "aria-modal": true,
                "aria-labelledby": "ai-ebay-modal-title",
                className: "ai-ebay-modal__panel report-glass",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "ai-ebay-modal__header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "ai-ebay-modal__eyebrow",
                                        children: "eBay"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 948,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        id: "ai-ebay-modal-title",
                                        children: "Shop this look"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 949,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 947,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "ai-ebay-modal__close",
                                onClick: onClose,
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 951,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 946,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ai-ebay-modal__tabs",
                        role: "tablist",
                        "aria-label": "Search queries",
                        children: links.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                role: "tab",
                                "aria-selected": link.id === active.id,
                                className: `ai-ebay-modal__tab${link.id === active.id ? " is-active" : ""}`,
                                onClick: ()=>onSelect(link.id),
                                children: link.label
                            }, link.id, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 962,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 960,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ai-ebay-modal__toolbar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "ai-ebay-modal__query",
                                children: active.query
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 976,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                className: "ai-ebay-modal__open",
                                href: active.href,
                                target: "_blank",
                                rel: "noopener noreferrer sponsored",
                                children: "Open search on eBay"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 977,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 975,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ai-ebay-modal__results",
                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "ai-ebay-modal__status",
                            children: "Searching live listings…"
                        }, void 0, false, {
                            fileName: "[project]/components/appearance/LooksReveal.tsx",
                            lineNumber: 989,
                            columnNumber: 13
                        }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ai-ebay-modal__status ai-ebay-modal__status--error",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                                    lineNumber: 992,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: active.href,
                                    target: "_blank",
                                    rel: "noopener noreferrer sponsored",
                                    children: "Open this search on eBay →"
                                }, void 0, false, {
                                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                                    lineNumber: 993,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/appearance/LooksReveal.tsx",
                            lineNumber: 991,
                            columnNumber: 13
                        }, this) : items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ai-ebay-modal__status",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "No listings matched this query."
                                }, void 0, false, {
                                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                                    lineNumber: 1003,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: active.href,
                                    target: "_blank",
                                    rel: "noopener noreferrer sponsored",
                                    children: "Try the full eBay search →"
                                }, void 0, false, {
                                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                                    lineNumber: 1004,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/appearance/LooksReveal.tsx",
                            lineNumber: 1002,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "ai-ebay-modal__grid",
                            children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        className: "ai-ebay-modal__card",
                                        href: item.shopUrl,
                                        target: "_blank",
                                        rel: "noopener noreferrer sponsored",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ai-ebay-modal__card-media",
                                                children: item.imageUrl ? // eslint-disable-next-line @next/next/no-img-element
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: item.imageUrl,
                                                    alt: ""
                                                }, void 0, false, {
                                                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                    lineNumber: 1025,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ai-ebay-modal__card-placeholder"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                    lineNumber: 1027,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                lineNumber: 1022,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ai-ebay-modal__card-body",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "ai-ebay-modal__card-title",
                                                        children: item.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                        lineNumber: 1031,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "ai-ebay-modal__card-price",
                                                        children: formatEbayPrice(item.price, item.currency)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                        lineNumber: 1032,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                lineNumber: 1030,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 1016,
                                        columnNumber: 19
                                    }, this)
                                }, item.id, false, {
                                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                                    lineNumber: 1015,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/appearance/LooksReveal.tsx",
                            lineNumber: 1013,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 987,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/LooksReveal.tsx",
                lineNumber: 940,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/LooksReveal.tsx",
        lineNumber: 933,
        columnNumber: 5
    }, this);
}
function formatEbayPrice(price, currency) {
    if (price == null) return "See price on eBay";
    try {
        return new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: currency || "USD",
            maximumFractionDigits: 2
        }).format(price);
    } catch  {
        return `${currency} ${price.toFixed(2)}`;
    }
}
function friendlyGenError(status, raw) {
    const text = raw.replace(/\s+/g, " ").trim();
    if (isGatewayTimeout(status, text)) {
        return "Still working on this look — hang tight, or retry if it stalls.";
    }
    if (status === 422 || /failed \(422\)/i.test(text)) {
        return "The image model rejected this request (invalid inputs). Check backend logs for the prompt + fal detail.";
    }
    if (status === 503 || /not configured/i.test(text)) {
        return "Outfit generation isn’t configured (missing FAL_KEY).";
    }
    const cleaned = text.replace(/^Outfit generation failed \(\d+\):\s*/i, "").replace(/^\{.*\}$/, "Generation failed — see backend logs.");
    return cleaned.slice(0, 160) || "Generation failed.";
}
}),
"[project]/components/appearance/JourneyProgressBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JourneyProgressBar",
    ()=>JourneyProgressBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/appearance-index.ts [app-ssr] (ecmascript)");
"use client";
;
;
function JourneyProgressBar({ current, withinStep = 0, detail, variant = "light" }) {
    const total = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JOURNEY_FLOW_STEPS"].length;
    const index = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["journeyStepIndex"])(current);
    const percent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["journeyProgressPercent"])(current, withinStep);
    const currentMeta = current === "complete" ? {
        label: "Profile complete",
        shortLabel: "Done"
    } : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JOURNEY_FLOW_STEPS"][index];
    const stepLabel = currentMeta?.label ?? "In progress";
    const stepsLeft = current === "complete" ? 0 : Math.max(0, total - index - (withinStep >= 1 ? 1 : 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `journey-progress journey-progress--${variant}`,
        role: "group",
        "aria-label": "Appearance Index progress",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "journey-progress__top",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "journey-progress__label",
                        children: current === "complete" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: "All steps done"
                        }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                "Step ",
                                Math.min(index + 1, total),
                                " of ",
                                total,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "journey-progress__sep",
                                    "aria-hidden": true,
                                    children: "·"
                                }, void 0, false, {
                                    fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                                    lineNumber: 49,
                                    columnNumber: 15
                                }, this),
                                stepLabel
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "journey-progress__pct",
                        "aria-hidden": true,
                        children: [
                            percent,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "journey-progress__track",
                role: "progressbar",
                "aria-valuemin": 0,
                "aria-valuemax": 100,
                "aria-valuenow": percent,
                "aria-valuetext": `${percent}% — ${stepLabel}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "journey-progress__fill",
                    style: {
                        width: `${percent}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                className: "journey-progress__steps",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JOURNEY_FLOW_STEPS"].map((step, i)=>{
                    const done = current === "complete" || i < index || i === index && withinStep >= 1;
                    const active = current !== "complete" && i === index;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: `journey-progress__step${done ? " is-done" : ""}${active ? " is-active" : ""}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "journey-progress__dot",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                                lineNumber: 85,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "journey-progress__step-label",
                                children: step.shortLabel
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                                lineNumber: 86,
                                columnNumber: 15
                            }, this)
                        ]
                    }, step.id, true, {
                        fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                        lineNumber: 81,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            (detail || stepsLeft > 0) && current !== "complete" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "journey-progress__detail",
                children: detail ?? (stepsLeft === 1 ? "1 stage left after this" : `${stepsLeft} stages left after this`)
            }, void 0, false, {
                fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                lineNumber: 95,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/appearance/AppearanceAuthGate.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppearanceAuthGate",
    ()=>AppearanceAuthGate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function AppearanceAuthGate({ reportId, open, onAuthed, onDismiss, dismissible = false }) {
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [firstName, setFirstName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("register");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    if (!open || !mounted) return null;
    async function onSubmit(e) {
        e.preventDefault();
        setError(null);
        setBusy(true);
        try {
            const result = mode === "register" ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerAccount"])({
                firstName,
                email,
                password,
                reportId
            }) : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loginAccount"])({
                email,
                password,
                reportId
            });
            onAuthed(result.user);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        } finally{
            setBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center",
        children: [
            dismissible ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": "Dismiss",
                className: "absolute inset-0 bg-[#0a0414]/75 backdrop-blur-sm",
                onClick: onDismiss
            }, void 0, false, {
                fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-[#0a0414]/75 backdrop-blur-sm"
            }, void 0, false, {
                fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "dialog",
                "aria-modal": true,
                "aria-labelledby": "appearance-auth-title",
                className: "report-glass relative z-10 w-full max-w-md rounded-3xl p-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)] sm:p-8",
                children: [
                    dismissible && onDismiss ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onDismiss,
                        className: "absolute right-4 top-4 rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/50 transition hover:bg-white/10 hover:text-white",
                        children: "Close"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: onSubmit,
                        className: "pt-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs uppercase tracking-[0.18em] text-white/45",
                                children: "Free account"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "appearance-auth-title",
                                className: "mt-2 text-2xl font-semibold text-white",
                                children: "Save this pass & unlock your style profile"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-sm leading-relaxed text-white/55",
                                children: "Your Face & Grooming reveal is ready. Create a free account to set style preferences and generate prescribed looks — and keep this report on your dashboard."
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this),
                            mode === "register" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "mt-5 block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-white/45",
                                        children: "First name"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                        lineNumber: 105,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        required: true,
                                        value: firstName,
                                        onChange: (e)=>setFirstName(e.target.value),
                                        className: "mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white/35",
                                        autoComplete: "given-name"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                        lineNumber: 106,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: `block ${mode === "register" ? "mt-3" : "mt-5"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-white/45",
                                        children: "Email"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                        lineNumber: 117,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        required: true,
                                        type: "email",
                                        value: email,
                                        onChange: (e)=>setEmail(e.target.value),
                                        className: "mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white/35",
                                        autoComplete: "email"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                        lineNumber: 118,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "mt-3 block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-white/45",
                                        children: "Password"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                        lineNumber: 129,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        required: true,
                                        type: "password",
                                        minLength: 8,
                                        value: password,
                                        onChange: (e)=>setPassword(e.target.value),
                                        className: "mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white/35",
                                        autoComplete: mode === "register" ? "new-password" : "current-password"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                        lineNumber: 130,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-sm text-amber-200/90",
                                role: "alert",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                lineNumber: 144,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: busy,
                                className: "mt-5 w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/90 disabled:opacity-60",
                                children: busy ? "Working…" : mode === "register" ? "Create account & continue" : "Sign in & continue"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-3 w-full text-center text-xs text-white/50 underline-offset-4 hover:text-white/80 hover:underline",
                                onClick: ()=>{
                                    setMode((m)=>m === "register" ? "login" : "register");
                                    setError(null);
                                },
                                children: mode === "register" ? "Already have an account? Sign in" : "Need an account? Create one"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this), document.body);
}
}),
"[project]/components/appearance/AppearanceJourney.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppearanceJourney",
    ()=>AppearanceJourney
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$SiteHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/site/SiteHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/appearance-index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/use-auth-user.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$FaceGroomingReveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/FaceGroomingReveal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleCollectStage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/StyleCollectStage.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleProfileReveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/StyleProfileReveal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$LooksReveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/LooksReveal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$JourneyProgressBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/JourneyProgressBar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$AppearanceAuthGate$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/AppearanceAuthGate.tsx [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
;
function needsAuthForStage(stage) {
    return stage !== "face_reveal";
}
function AppearanceJourney({ report }) {
    const { user, ready: authReady, isAuthed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthUser"])();
    const [authUser, setAuthUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [journey, setJourney] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadError, setLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [prefsError, setPrefsError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [authOpen, setAuthOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingAdvance, setPendingAdvance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const signedIn = isAuthed || Boolean(authUser);
    const authHeaders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
        return {
            "Content-Type": "application/json",
            ...token ? {
                Authorization: `Bearer ${token}`
            } : {}
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (user) setAuthUser(user);
    }, [
        user
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        (async ()=>{
            try {
                const res = await fetch(`/api/appearance/${report.id}`, {
                    headers: authHeaders(),
                    cache: "no-store"
                });
                const data = await res.json();
                if (!res.ok || !data.journey) {
                    if (!cancelled) {
                        setLoadError(data.error ?? "Could not load appearance journey.");
                    }
                    return;
                }
                if (!cancelled) setJourney(data.journey);
            } catch  {
                if (!cancelled) setLoadError("Could not load appearance journey.");
            }
        })();
        return ()=>{
            cancelled = true;
        };
    }, [
        authHeaders,
        report.id
    ]);
    // Past face reveal without a session → hard gate.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!authReady || !journey) return;
        if (!signedIn && needsAuthForStage(journey.stage)) {
            setAuthOpen(true);
        }
    }, [
        authReady,
        journey,
        signedIn
    ]);
    const advance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (stage)=>{
        // Never hit the API without a session — open the prompt instead.
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])()) {
            setPendingAdvance(stage);
            setAuthOpen(true);
            setPrefsError(null);
            return;
        }
        setSaving(true);
        setPrefsError(null);
        try {
            const res = await fetch(`/api/appearance/${report.id}/advance`, {
                method: "POST",
                headers: authHeaders(),
                body: JSON.stringify({
                    stage
                })
            });
            const raw = await res.text();
            let data = {};
            try {
                data = raw ? JSON.parse(raw) : {};
            } catch  {
                data = {};
            }
            if (res.status === 401) {
                setPendingAdvance(stage);
                setAuthOpen(true);
                setPrefsError(null);
                return;
            }
            if (!res.ok || !data.journey) {
                setPrefsError(data.error ?? "Could not continue.");
                return;
            }
            setJourney(data.journey);
            setPendingAdvance(null);
        } finally{
            setSaving(false);
        }
    }, [
        authHeaders,
        report.id
    ]);
    const submitPrefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (preferences)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])()) {
            setAuthOpen(true);
            return;
        }
        setSaving(true);
        setPrefsError(null);
        try {
            const res = await fetch(`/api/appearance/${report.id}/style-preferences`, {
                method: "POST",
                headers: authHeaders(),
                body: JSON.stringify({
                    preferences
                })
            });
            const raw = await res.text();
            let data = {};
            try {
                data = raw ? JSON.parse(raw) : {};
            } catch  {
                data = {};
            }
            if (res.status === 401) {
                setAuthOpen(true);
                return;
            }
            if (!res.ok || !data.journey) {
                setPrefsError(data.error ?? "Could not save preferences.");
                return;
            }
            setJourney(data.journey);
        } finally{
            setSaving(false);
        }
    }, [
        authHeaders,
        report.id
    ]);
    const onContinueFromFace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        // Always gate on the real token — don't rely on async session state alone.
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])()) {
            setPendingAdvance("style_collect");
            setAuthOpen(true);
            return;
        }
        void advance("style_collect");
    }, [
        advance
    ]);
    const onAuthed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((next)=>{
        setAuthUser(next);
        setAuthOpen(false);
        const target = pendingAdvance ?? "style_collect";
        setPendingAdvance(null);
        void (async ()=>{
            let stageNow = "face_reveal";
            try {
                const res = await fetch(`/api/appearance/${report.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])() ? {
                            Authorization: `Bearer ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])()}`
                        } : {}
                    },
                    cache: "no-store"
                });
                const data = await res.json();
                if (data.journey) {
                    setJourney(data.journey);
                    stageNow = data.journey.stage;
                }
            } catch  {
            /* continue */ }
            if (stageNow === "face_reveal") {
                await advance(target);
            }
        })();
    }, [
        advance,
        pendingAdvance,
        report.id
    ]);
    const stage = journey?.stage ?? "face_reveal";
    const flowStep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appearanceStageToFlowStep"])(stage);
    const lockedPastFace = authReady && !signedIn && needsAuthForStage(stage);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "ai-page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$SiteHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SiteHeader"], {
                variant: "dark"
            }, void 0, false, {
                fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                lineNumber: 235,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-shell pt-20 sm:pt-24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$JourneyProgressBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JourneyProgressBar"], {
                        current: flowStep,
                        withinStep: flowStep === "complete" ? 1 : 0.35,
                        variant: "dark",
                        detail: flowStep === "complete" ? undefined : flowStep === "face_reveal" ? "Upload done · reviewing Structure & Grooming" : flowStep === "style_collect" ? "Pick your visual style preferences" : flowStep === "style_reveal" ? "Style Profile ready — looks are next" : "Almost done — prescribed looks"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this),
                    loadError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-error",
                        children: loadError
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 256,
                        columnNumber: 11
                    }, this) : !journey || !authReady ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-loading",
                        children: "Loading your Appearance Index…"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 258,
                        columnNumber: 11
                    }, this) : lockedPastFace ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "ai-reveal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ai-reveal__intro",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "ai-reveal__eyebrow",
                                        children: "Account required"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                        lineNumber: 262,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Sign in to continue your style profile"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                        lineNumber: 263,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Face & Grooming stay free to view. Style preferences and prescribed looks need a free account so we can save them to your dashboard."
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                        lineNumber: 264,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                lineNumber: 261,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ai-reveal__cta",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "ai-btn",
                                    onClick: ()=>setAuthOpen(true),
                                    children: "Create account / sign in"
                                }, void 0, false, {
                                    fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                    lineNumber: 271,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                lineNumber: 270,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 260,
                        columnNumber: 11
                    }, this) : stage === "face_reveal" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$FaceGroomingReveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaceGroomingReveal"], {
                        report: report,
                        pillars: journey.pillars,
                        onContinue: onContinueFromFace,
                        continueLabel: signedIn ? "Continue to style profile" : "Continue — create free account",
                        continueNote: signedIn ? "Next: visual style choices, then prescribed looks." : "Next: a free account, then visual style choices and prescribed looks."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 281,
                        columnNumber: 11
                    }, this) : stage === "style_collect" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleCollectStage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StyleCollectStage"], {
                        onSubmit: (p)=>void submitPrefs(p),
                        saving: saving,
                        error: prefsError
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 297,
                        columnNumber: 11
                    }, this) : stage === "style_reveal" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleProfileReveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StyleProfileReveal"], {
                        journey: journey,
                        onContinue: ()=>void advance("prescription_reveal")
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 303,
                        columnNumber: 11
                    }, this) : stage === "prescription_reveal" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$LooksReveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LooksReveal"], {
                        reportId: report.id,
                        portraitFileId: report.portraitFileId ?? null,
                        journey: journey,
                        onJourneyUpdate: setJourney,
                        onFinish: ()=>void advance("complete")
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 308,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "ai-reveal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ai-reveal__intro",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "ai-reveal__eyebrow",
                                        children: "Appearance Profile"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                        lineNumber: 318,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "First pass complete"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                        lineNumber: 319,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "You’ve finished the free Appearance Profile cycle. Classic feature detail stays available on the full report; Pro will unlock ongoing rechecks and restocked looks after this moment."
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                        lineNumber: 320,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                lineNumber: 317,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ai-reveal__cta ai-reveal__cta--row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        className: "ai-btn",
                                        href: `/report/${report.id}`,
                                        children: "Open full feature report"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                        lineNumber: 327,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        className: "ai-btn ai-btn--ghost",
                                        href: "/dashboard",
                                        children: "Go to dashboard"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                        lineNumber: 330,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                lineNumber: 326,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 316,
                        columnNumber: 11
                    }, this),
                    prefsError && stage === "face_reveal" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-error mt-4",
                        children: prefsError
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 338,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$AppearanceAuthGate$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AppearanceAuthGate"], {
                reportId: report.id,
                open: authOpen,
                dismissible: stage === "face_reveal",
                onDismiss: stage === "face_reveal" ? ()=>{
                    setAuthOpen(false);
                    setPendingAdvance(null);
                } : undefined,
                onAuthed: onAuthed
            }, void 0, false, {
                fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                lineNumber: 342,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
        lineNumber: 234,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_cf8d44a9._.js.map