module.exports = [
"[project]/lib/device-id.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Stable browser device id for beta generation abuse limits. */ __turbopack_context__.s([
    "deviceAuthHeaders",
    ()=>deviceAuthHeaders,
    "getOrCreateDeviceId",
    ()=>getOrCreateDeviceId
]);
const STORAGE_KEY = "zelko.deviceId";
function randomId() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
    }
    return `dev_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}
function getOrCreateDeviceId() {
    if ("TURBOPACK compile-time truthy", 1) return "";
    //TURBOPACK unreachable
    ;
}
function deviceAuthHeaders(extra) {
    const base = {};
    if (extra) {
        const h = new Headers(extra);
        h.forEach((v, k)=>{
            base[k] = v;
        });
    }
    const id = getOrCreateDeviceId();
    if (id) base["X-Zelko-Device-Id"] = id;
    return base;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$device$2d$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/device-id.ts [app-ssr] (ecmascript)");
;
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$device$2d$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deviceAuthHeaders"])({
        "Content-Type": "application/json",
        ...token ? {
            Authorization: `Bearer ${token}`
        } : {}
    });
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
];

//# sourceMappingURL=_44c48c6b._.js.map