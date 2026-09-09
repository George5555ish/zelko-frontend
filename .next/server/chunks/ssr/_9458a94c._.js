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
"[project]/lib/mediapipe.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Client-side MediaPipe Face Landmarker.
 * The task model returns 478 points (468 face mesh + 10 iris). We keep the
 * classic 468-point mesh per PRODUCT.md.
 *
 * Also tries 90° rotations when the first pass fails — phone photos often
 * arrive sideways without usable EXIF.
 */ __turbopack_context__.s([
    "extractFaceLandmarks",
    ()=>extractFaceLandmarks,
    "extractFaceLandmarksFromFile",
    ()=>extractFaceLandmarksFromFile
]);
const FACE_MESH_COUNT = 468;
/** MediaPipe eye outer corners — used to score “how upright” a detection is. */ const LEFT_EYE_OUTER = 33;
const RIGHT_EYE_OUTER = 263;
/** Forehead / chin — reject 180° flips that still have level eyes. */ const FOREHEAD = 10;
const CHIN = 152;
const NOSE_TIP = 1;
let faceLandmarkerPromise = null;
async function getFaceLandmarker() {
    if (!faceLandmarkerPromise) {
        faceLandmarkerPromise = (async ()=>{
            const { FaceLandmarker, FilesetResolver } = await __turbopack_context__.A("[project]/node_modules/@mediapipe/tasks-vision/vision_bundle.mjs [app-ssr] (ecmascript, async loader)");
            // MUST match installed @mediapipe/tasks-vision version (package.json).
            // Mismatched CDN wasm (e.g. 0.10.18 vs 0.10.35) often returns empty faces.
            const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm");
            const baseOptions = {
                modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task"
            };
            const shared = {
                runningMode: "IMAGE",
                numFaces: 2,
                minFaceDetectionConfidence: 0.3,
                minFacePresenceConfidence: 0.3,
                minTrackingConfidence: 0.3,
                outputFaceBlendshapes: false,
                outputFacialTransformationMatrixes: false
            };
            // CPU first — GPU can "succeed" then return empty landmark sets on some GPUs.
            try {
                const cpu = await FaceLandmarker.createFromOptions(vision, {
                    ...shared,
                    baseOptions: {
                        ...baseOptions,
                        delegate: "CPU"
                    }
                });
                console.info("[MediaPipe] FaceLandmarker ready (CPU)");
                return cpu;
            } catch (cpuErr) {
                console.warn("[MediaPipe] CPU delegate failed, trying GPU", cpuErr);
                const gpu = await FaceLandmarker.createFromOptions(vision, {
                    ...shared,
                    baseOptions: {
                        ...baseOptions,
                        delegate: "GPU"
                    }
                });
                console.info("[MediaPipe] FaceLandmarker ready (GPU)");
                return gpu;
            }
        })().catch((err)=>{
            faceLandmarkerPromise = null;
            throw err;
        });
    }
    return faceLandmarkerPromise;
}
/** Absolute roll (degrees) from eye line — 0 is level. */ function eyeLineRollAbs(landmarks) {
    const L = landmarks[LEFT_EYE_OUTER];
    const R = landmarks[RIGHT_EYE_OUTER];
    if (!L || !R) return 90;
    return Math.abs(Math.atan2(R.y - L.y, R.x - L.x) * (180 / Math.PI));
}
function eyeSpan(landmarks) {
    const L = landmarks[LEFT_EYE_OUTER];
    const R = landmarks[RIGHT_EYE_OUTER];
    if (!L || !R) return 0;
    return Math.hypot(R.x - L.x, R.y - L.y);
}
/**
 * How anatomically upright the face is in image space (y grows downward).
 * Positive ⇒ chin below eyes / forehead above eyes. Near-zero or negative
 * means the mesh was fit on an upside-down (or near-inverted) frame — the
 * common failure mode when we only scored eye-line roll.
 */ function faceUprightness(landmarks) {
    const L = landmarks[LEFT_EYE_OUTER];
    const R = landmarks[RIGHT_EYE_OUTER];
    const chin = landmarks[CHIN];
    const forehead = landmarks[FOREHEAD];
    const nose = landmarks[NOSE_TIP];
    if (!L || !R || !chin || !forehead) return -1;
    const eyeY = (L.y + R.y) / 2;
    // Chin should sit below the eyes; forehead above.
    let score = chin.y - eyeY + (eyeY - forehead.y);
    if (nose) {
        // Nose tip should also sit below the eye line on an upright face.
        score += Math.max(-0.05, nose.y - eyeY);
    }
    return score;
}
function isFaceUpright(landmarks) {
    return faceUprightness(landmarks) >= 0.04;
}
/** Rank candidates: upright anatomy first, then size, then level eyes. */ function compareFaceCandidates(a, b) {
    const aUp = isFaceUpright(a.landmarks);
    const bUp = isFaceUpright(b.landmarks);
    if (aUp !== bUp) return aUp ? -1 : 1;
    const uprightDiff = faceUprightness(b.landmarks) - faceUprightness(a.landmarks);
    if (Math.abs(uprightDiff) > 0.02) return uprightDiff;
    const spanDiff = b.span - a.span;
    if (Math.abs(spanDiff) > 0.03) return spanDiff;
    const rollDiff = a.roll - b.roll;
    if (Math.abs(rollDiff) > 8) return rollDiff;
    // Prefer fewer quarter-turns when scores tie (avoid gratuitous 180° flips).
    return a.quarters - b.quarters;
}
function toCanvas(source) {
    if (source instanceof HTMLCanvasElement) return source;
    const canvas = document.createElement("canvas");
    canvas.width = source.width;
    canvas.height = source.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not create canvas.");
    // Opaque backdrop — transparent cutouts otherwise confuse MediaPipe.
    ctx.fillStyle = "#d4d0cc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(source, 0, 0);
    return canvas;
}
/**
 * Rotate clockwise by quarter-turns. MediaPipe Face Landmarker is unreliable
 * on raw ImageBitmap in some browsers — always detect from a canvas.
 */ function drawRotated(source, quarterTurns) {
    const src = toCanvas(source);
    const w = src.width;
    const h = src.height;
    const turns = (quarterTurns % 4 + 4) % 4;
    if (turns === 0) return src;
    const canvas = document.createElement("canvas");
    if (turns % 2 === 0) {
        canvas.width = w;
        canvas.height = h;
    } else {
        canvas.width = h;
        canvas.height = w;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not create canvas for rotation.");
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(turns * Math.PI / 2);
    ctx.drawImage(src, -w / 2, -h / 2);
    return canvas;
}
function canvasToJpegFile(canvas, originalName, suffix = "oriented") {
    return new Promise((resolve, reject)=>{
        canvas.toBlob((blob)=>{
            if (!blob) {
                reject(new Error("Failed to encode rotated image."));
                return;
            }
            const base = originalName.replace(/\.[^.]+$/, "") || "photo";
            resolve(new File([
                blob
            ], `${base}-${suffix}.jpg`, {
                type: "image/jpeg"
            }));
        }, "image/jpeg", 0.92);
    });
}
async function fileToBitmap(file) {
    // Force raw pixels — EXIF "from-image" can disagree with how WebPs are
    // stored and fight our manual 90°/180° search (double-rotate → upside down).
    try {
        return await createImageBitmap(file, {
            imageOrientation: "none"
        });
    } catch  {
        try {
            return await createImageBitmap(file);
        } catch  {
        /* fall through */ }
    }
    const url = URL.createObjectURL(file);
    try {
        const img = await new Promise((resolve, reject)=>{
            const el = new Image();
            el.onload = ()=>resolve(el);
            el.onerror = ()=>reject(new Error("Could not decode image."));
            el.decoding = "async";
            el.src = url;
        });
        await img.decode().catch(()=>undefined);
        try {
            return await createImageBitmap(img, {
                imageOrientation: "none"
            });
        } catch  {
            return await createImageBitmap(img);
        }
    } finally{
        URL.revokeObjectURL(url);
    }
}
/**
 * MediaPipe is unreliable on transparent PNGs (cutouts). Paint onto an opaque
 * neutral backdrop, then for ultra-wide / ultra-tall canvases crop toward a
 * portrait window so the face isn't a tiny strip after downscale.
 */ function prepareCanvasForFaceDetect(source) {
    const w = source.width;
    const h = source.height;
    const aspect = w / Math.max(1, h);
    let sx = 0;
    let sy = 0;
    let sw = w;
    let sh = h;
    // Ultra-wide cutouts (common studio PNGs): keep a portrait window on center.
    if (aspect > 1.35) {
        const targetAspect = 3 / 4;
        sw = Math.min(w, Math.round(h * targetAspect * 1.15));
        sh = h;
        sx = Math.max(0, Math.round((w - sw) / 2));
    } else if (aspect < 0.55) {
        // Ultra-tall: keep upper-body band where faces usually sit.
        const targetAspect = 3 / 4;
        sh = Math.min(h, Math.round(w / targetAspect));
        sw = w;
        sy = Math.max(0, Math.round(h * 0.08));
        if (sy + sh > h) sy = Math.max(0, h - sh);
    }
    const maxEdge = 1600;
    const scale = Math.min(1, maxEdge / Math.max(sw, sh));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(sw * scale));
    canvas.height = Math.max(1, Math.round(sh * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not create detection canvas.");
    // Opaque fill — transparent pixels become soft gray, not checker noise.
    ctx.fillStyle = "#d4d0cc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(source, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    return canvas;
}
/** Downscale / flatten / reframe before MediaPipe. */ async function bitmapForDetection(bitmap) {
    const prepared = prepareCanvasForFaceDetect(bitmap);
    const changed = prepared.width !== bitmap.width || prepared.height !== bitmap.height;
    return {
        source: prepared,
        scaled: changed
    };
}
function landmarksFromDetect(landmarker, canvas) {
    const result = landmarker.detect(canvas);
    const raw = result.faceLandmarks[0] ?? null;
    if (!raw) {
        console.info("[MediaPipe] detect: no face", {
            w: canvas.width,
            h: canvas.height,
            faces: result.faceLandmarks.length
        });
        return null;
    }
    return raw.slice(0, FACE_MESH_COUNT).map((p)=>({
            x: p.x,
            y: p.y,
            z: p.z ?? 0
        }));
}
/** Re-draw onto a solid backdrop (helps transparent cutouts / noisy studio mats). */ function withBackdrop(source, color) {
    const canvas = document.createElement("canvas");
    canvas.width = source.width;
    canvas.height = source.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return source;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(source, 0, 0);
    return canvas;
}
async function extractFaceLandmarks(image) {
    const landmarker = await getFaceLandmarker();
    const canvas = toCanvas(image);
    let landmarks = landmarksFromDetect(landmarker, canvas);
    if (landmarks) return landmarks;
    // Retry on alternate backdrops — cutouts / checker mats confuse the detector.
    for (const color of [
        "#f0eeea",
        "#2a2a2a",
        "#ffffff"
    ]){
        landmarks = landmarksFromDetect(landmarker, withBackdrop(canvas, color));
        if (landmarks) return landmarks;
    }
    return null;
}
/**
 * Crop a region and upscale so small faces in full-body shots become
 * large enough for MediaPipe (normalized landmarks stay relative to crop).
 */ function cropAndUpscale(source, sx, sy, sw, sh, minSide = 720) {
    const canvas = document.createElement("canvas");
    const scale = Math.max(1, minSide / Math.min(sw, sh));
    canvas.width = Math.max(1, Math.round(sw * scale));
    canvas.height = Math.max(1, Math.round(sh * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not create canvas for face crop.");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(source, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    return canvas;
}
/** Upper-body / face crops for fashion & full-length reference photos. */ function faceSearchCrops(width, height) {
    const crops = [];
    const push = (cx, cy, fracW, fracH, label)=>{
        const sw = Math.min(width, Math.max(64, width * fracW));
        const sh = Math.min(height, Math.max(64, height * fracH));
        const sx = Math.max(0, Math.min(width - sw, cx - sw / 2));
        const sy = Math.max(0, Math.min(height - sh, cy - sh / 2));
        crops.push({
            sx,
            sy,
            sw,
            sh,
            label
        });
    };
    push(width * 0.5, height * 0.18, 0.55, 0.32, "upper-tight");
    push(width * 0.5, height * 0.2, 0.7, 0.4, "upper-mid");
    push(width * 0.5, height * 0.22, 0.85, 0.48, "upper-wide");
    push(width * 0.5, height * 0.15, 0.42, 0.28, "head-zoom");
    push(width * 0.5, height * 0.45, 0.85, 0.75, "center-face");
    push(width * 0.5, height * 0.4, 1, 0.7, "center-wide");
    push(width * 0.42, height * 0.18, 0.5, 0.34, "upper-left");
    push(width * 0.58, height * 0.18, 0.5, 0.34, "upper-right");
    return crops;
}
async function extractFaceLandmarksFromFile(file) {
    const rawBitmap = await fileToBitmap(file);
    const { source: prepared } = await bitmapForDetection(rawBitmap);
    try {
        const candidates = [];
        // Always try every orientation — sideways phone WebPs often have no EXIF.
        const turns = [
            0,
            1,
            3,
            2
        ];
        for (const q of turns){
            const canvas = drawRotated(prepared, q);
            let landmarks = null;
            try {
                landmarks = await extractFaceLandmarks(canvas);
            } catch (err) {
                console.warn("[MediaPipe] detect failed for q" + q, err);
                continue;
            }
            if (!landmarks || landmarks.length < 100) continue;
            candidates.push({
                landmarks,
                quarters: q,
                canvas,
                roll: eyeLineRollAbs(landmarks),
                span: eyeSpan(landmarks),
                fromCrop: false,
                label: `full-q${q}`
            });
        }
        // Prefer anatomically upright full-frame hits (chin below eyes), then
        // level eyes / larger face. Eye-roll alone used to accept 180° flips.
        const bestFull = candidates.length ? [
            ...candidates
        ].sort(compareFaceCandidates)[0] : null;
        // Crops only on the best upright orientation (never on sideways pixels).
        const baseForCrop = bestFull?.canvas ?? drawRotated(prepared, 0);
        const needsCrop = !bestFull || bestFull.span < 0.08 || bestFull.roll > 35 || !isFaceUpright(bestFull.landmarks);
        if (needsCrop) {
            const w = baseForCrop.width;
            const h = baseForCrop.height;
            const cropQuarters = bestFull?.quarters ?? 0;
            for (const region of faceSearchCrops(w, h)){
                const crop = cropAndUpscale(baseForCrop, region.sx, region.sy, region.sw, region.sh);
                let landmarks = null;
                try {
                    landmarks = await extractFaceLandmarks(crop);
                } catch (err) {
                    console.warn("[MediaPipe] crop detect failed", region.label, err);
                    continue;
                }
                if (!landmarks || landmarks.length < 100) continue;
                const span = eyeSpan(landmarks);
                const roll = eyeLineRollAbs(landmarks);
                candidates.push({
                    landmarks,
                    quarters: cropQuarters,
                    canvas: crop,
                    roll,
                    span,
                    fromCrop: true,
                    label: region.label
                });
                if (span > 0.18 && roll < 30 && isFaceUpright(landmarks)) {
                    break;
                }
            }
            // If no full-frame hit, also try crops on other orientations.
            if (!bestFull) {
                for (const q of turns){
                    if (q === 0) continue;
                    const oriented = drawRotated(prepared, q);
                    for (const region of faceSearchCrops(oriented.width, oriented.height).slice(0, 4)){
                        const crop = cropAndUpscale(oriented, region.sx, region.sy, region.sw, region.sh);
                        let landmarks = null;
                        try {
                            landmarks = await extractFaceLandmarks(crop);
                        } catch  {
                            continue;
                        }
                        if (!landmarks || landmarks.length < 100) continue;
                        candidates.push({
                            landmarks,
                            quarters: q,
                            canvas: crop,
                            roll: eyeLineRollAbs(landmarks),
                            span: eyeSpan(landmarks),
                            fromCrop: true,
                            label: `q${q}-${region.label}`
                        });
                    }
                }
            }
        }
        if (candidates.length === 0) {
            console.info("[MediaPipe] no face in any orientation", {
                width: prepared.width,
                height: prepared.height,
                type: file.type,
                name: file.name
            });
            return {
                landmarks: null,
                fileForUpload: file,
                previewUrl: null,
                rotationQuarters: 0
            };
        }
        candidates.sort(compareFaceCandidates);
        const best = candidates[0];
        console.info("[MediaPipe] chose face pass", {
            label: best.label,
            fromCrop: best.fromCrop,
            quarters: best.quarters,
            roll: Math.round(best.roll),
            eyeSpan: Number(best.span.toFixed(3)),
            upright: Number(faceUprightness(best.landmarks).toFixed(3)),
            tried: candidates.length
        });
        // Always re-encode so preview is upright, opaque, and matches landmarks
        // (transparent / ultra-wide cutouts otherwise break detection + display).
        let canvasOut = best.canvas;
        let landmarksOut = best.landmarks;
        let quartersOut = best.quarters;
        if (best.fromCrop && bestFull && bestFull.span >= 0.08 && bestFull.roll <= 35 && isFaceUpright(bestFull.landmarks)) {
            canvasOut = bestFull.canvas;
            landmarksOut = bestFull.landmarks;
            quartersOut = bestFull.quarters;
        }
        const suffix = best.fromCrop && canvasOut === best.canvas ? "face-crop" : quartersOut ? "oriented" : "normalized";
        const fileForUpload = await canvasToJpegFile(canvasOut, file.name, suffix);
        const previewUrl = URL.createObjectURL(fileForUpload);
        return {
            landmarks: landmarksOut,
            fileForUpload,
            previewUrl,
            rotationQuarters: quartersOut
        };
    } finally{
        try {
            rawBitmap.close();
        } catch  {
        /* already closed */ }
    }
}
}),
"[project]/lib/distress-check.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    if (!text?.trim()) return {
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
}),
"[project]/lib/personalization.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
const PRIORITY_FEATURE_KEYS = PRIORITY_FEATURE_OPTIONS.map((o)=>o.key);
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
}),
"[project]/lib/landmark-quality.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Client-side landmark quality for upload gating + report portrait pick.
 *
 * Accept only when the mesh can actually drive scores and overlay dots:
 * full Face Mesh, face filling the frame, at least one clear eye, nose,
 * jawline anchors, and not a hard profile / extreme turn.
 */ __turbopack_context__.s([
    "MIN_PORTRAIT_LANDMARK_SCORE",
    ()=>MIN_PORTRAIT_LANDMARK_SCORE,
    "assessLandmarkQuality",
    ()=>assessLandmarkQuality,
    "pickBestPortraitSlot",
    ()=>pickBestPortraitSlot
]);
const LEFT_EYE_OUTER = 33;
const RIGHT_EYE_OUTER = 263;
const NOSE_TIP = 1;
const LEFT_CHEEK = 234;
const RIGHT_CHEEK = 454;
const FOREHEAD = 10;
const CHIN = 152;
const LEFT_JAW = 172;
const RIGHT_JAW = 397;
const MIN_PORTRAIT_LANDMARK_SCORE = 62;
function pt(landmarks, i) {
    const p = landmarks[i];
    if (!p || typeof p.x !== "number" || typeof p.y !== "number") return null;
    return p;
}
function inFrame(p, pad = 0.02) {
    return p.x >= pad && p.x <= 1 - pad && p.y >= pad && p.y <= 1 - pad;
}
function dist(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}
function assessLandmarkQuality(landmarks) {
    if (!landmarks || landmarks.length < 100) return null;
    const meshCount = landmarks.length;
    const le = pt(landmarks, LEFT_EYE_OUTER);
    const re = pt(landmarks, RIGHT_EYE_OUTER);
    const nose = pt(landmarks, NOSE_TIP);
    const leftCheek = pt(landmarks, LEFT_CHEEK);
    const rightCheek = pt(landmarks, RIGHT_CHEEK);
    const fore = pt(landmarks, FOREHEAD);
    const chin = pt(landmarks, CHIN);
    const leftJaw = pt(landmarks, LEFT_JAW);
    const rightJaw = pt(landmarks, RIGHT_JAW);
    const leftEyeOk = Boolean(le && inFrame(le, 0.015));
    const rightEyeOk = Boolean(re && inFrame(re, 0.015));
    const oneEyeVisible = leftEyeOk || rightEyeOk;
    const bothEyesVisible = Boolean(leftEyeOk && rightEyeOk && le && re && dist(le, re) > 0.05);
    const noseVisible = Boolean(nose && inFrame(nose, 0.02));
    const jawVisible = Boolean(chin && inFrame(chin, 0.02) && (leftJaw && inFrame(leftJaw, 0.02) || rightJaw && inFrame(rightJaw, 0.02)));
    const eyeSpan = le && re ? dist(le, re) : leftEyeOk || rightEyeOk ? 0.06 : 0;
    const rollAbs = le && re ? Math.abs(Math.atan2(re.y - le.y, re.x - le.x) * (180 / Math.PI)) : 45;
    let yawProxy = 0;
    if (leftCheek && rightCheek && nose) {
        const midX = (leftCheek.x + rightCheek.x) / 2;
        const faceW = dist(leftCheek, rightCheek) || 1;
        yawProxy = (nose.x - midX) / faceW * 100;
    }
    const faceSpan = fore && chin ? dist(fore, chin) : leftCheek && rightCheek ? dist(leftCheek, rightCheek) : 0;
    let score = 0;
    if (meshCount >= 400) score += 22;
    else if (meshCount >= 200) score += 8;
    if (eyeSpan >= 0.14) score += 26;
    else if (eyeSpan >= 0.1) score += 20;
    else if (eyeSpan >= 0.07) score += 12;
    else if (eyeSpan >= 0.05) score += 6;
    if (faceSpan >= 0.28) score += 10;
    else if (faceSpan >= 0.2) score += 6;
    if (rollAbs <= 12) score += 14;
    else if (rollAbs <= 22) score += 8;
    else if (rollAbs <= 32) score += 3;
    const absYaw = Math.abs(yawProxy);
    if (absYaw <= 14) score += 14;
    else if (absYaw <= 24) score += 8;
    else if (absYaw <= 34) score += 3;
    if (bothEyesVisible && noseVisible && jawVisible) score += 14;
    else if (oneEyeVisible && noseVisible && jawVisible) score += 8;
    else if (oneEyeVisible && noseVisible) score += 4;
    score = Math.round(Math.min(100, Math.max(0, score)));
    let rejectReason = null;
    if (meshCount < 400) {
        rejectReason = "Face mesh incomplete — use a clearer close-up looking toward the camera.";
    } else if (!oneEyeVisible) {
        rejectReason = "Need at least one clear eye in frame — face the camera more directly.";
    } else if (!noseVisible) {
        rejectReason = "Nose not visible enough — center your face in the shot.";
    } else if (!jawVisible) {
        rejectReason = "Jawline not visible enough — show chin and jaw, not a cropped forehead.";
    } else if (eyeSpan < 0.07 && faceSpan < 0.2) {
        rejectReason = "Face too small in frame — move closer so your face fills more of the photo.";
    } else if (absYaw > 36) {
        rejectReason = "Face turned too far sideways — we need a more frontal shot for landmarks.";
    } else if (rollAbs > 38) {
        rejectReason = "Head tilted too far — keep your head more level.";
    } else if (score < MIN_PORTRAIT_LANDMARK_SCORE) {
        rejectReason = "Face landmarks too weak — try a clearer, well-lit frontal selfie.";
    }
    const usableForPortrait = rejectReason === null;
    return {
        score,
        eyeSpan,
        yawProxy,
        rollAbs,
        meshCount,
        oneEyeVisible,
        bothEyesVisible,
        noseVisible,
        jawVisible,
        usableForPortrait,
        rejectReason
    };
}
function pickBestPortraitSlot(slots) {
    if (slots.length === 0) return null;
    return [
        ...slots
    ].sort((a, b)=>{
        const sa = a.landmarkScore ?? assessLandmarkQuality(a.landmarks)?.score ?? 0;
        const sb = b.landmarkScore ?? assessLandmarkQuality(b.landmarks)?.score ?? 0;
        return sb - sa;
    })[0];
}
}),
"[project]/components/upload/PhotoExamplesGuide.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PhotoExamplesGuide",
    ()=>PhotoExamplesGuide
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const GOOD_EXAMPLES = [
    {
        src: "/upload/examples/good-1.png",
        alt: "Clear close-up portrait"
    },
    {
        src: "/upload/examples/good-2.png",
        alt: "Well-lit face at a slight angle"
    },
    {
        src: "/upload/examples/good-3.png",
        alt: "Neutral expression close-up"
    },
    {
        src: "/upload/examples/good-4.png",
        alt: "Face filling the frame"
    }
];
const BAD_EXAMPLES = [
    {
        src: "/upload/examples/bad-distant.png",
        alt: "Distant full-body shot"
    },
    {
        src: "/upload/examples/bad-group.png",
        alt: "Group photo with multiple faces"
    },
    {
        src: "/upload/examples/bad-covered.png",
        alt: "Face covered by sunglasses"
    }
];
function PhotoExamplesGuide() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "upload-photo-guide",
        "aria-label": "Photo selection guidance",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GuideRow, {
                tone: "good",
                title: "Good photo examples",
                description: "Close-ups facing the camera — eye, nose, and jawline visible.",
                images: GOOD_EXAMPLES
            }, void 0, false, {
                fileName: "[project]/components/upload/PhotoExamplesGuide.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GuideRow, {
                tone: "bad",
                title: "Bad photo examples",
                description: "Profiles, tiny faces, covered features, groups, or extreme tilts.",
                images: BAD_EXAMPLES
            }, void 0, false, {
                fileName: "[project]/components/upload/PhotoExamplesGuide.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/upload/PhotoExamplesGuide.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
function GuideRow({ tone, title, description, images }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `upload-photo-guide-row upload-photo-guide-row--${tone}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "upload-photo-guide-heading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "upload-photo-guide-icon",
                        "aria-hidden": true,
                        children: tone === "good" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            viewBox: "0 0 20 20",
                            fill: "none",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M5 10.5l3.2 3.2L15 6.8",
                                stroke: "currentColor",
                                strokeWidth: "2.2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round"
                            }, void 0, false, {
                                fileName: "[project]/components/upload/PhotoExamplesGuide.tsx",
                                lineNumber: 50,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/upload/PhotoExamplesGuide.tsx",
                            lineNumber: 49,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            viewBox: "0 0 20 20",
                            fill: "none",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M6.5 6.5l7 7M13.5 6.5l-7 7",
                                stroke: "currentColor",
                                strokeWidth: "2.2",
                                strokeLinecap: "round"
                            }, void 0, false, {
                                fileName: "[project]/components/upload/PhotoExamplesGuide.tsx",
                                lineNumber: 60,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/upload/PhotoExamplesGuide.tsx",
                            lineNumber: 59,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/upload/PhotoExamplesGuide.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "upload-photo-guide-title",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/upload/PhotoExamplesGuide.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "upload-photo-guide-desc",
                                children: description
                            }, void 0, false, {
                                fileName: "[project]/components/upload/PhotoExamplesGuide.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/upload/PhotoExamplesGuide.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/upload/PhotoExamplesGuide.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "upload-photo-guide-scroller",
                role: "list",
                children: images.map((img)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "upload-photo-guide-thumb",
                        role: "listitem",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: img.src,
                            alt: img.alt,
                            loading: "lazy"
                        }, void 0, false, {
                            fileName: "[project]/components/upload/PhotoExamplesGuide.tsx",
                            lineNumber: 79,
                            columnNumber: 13
                        }, this)
                    }, img.src, false, {
                        fileName: "[project]/components/upload/PhotoExamplesGuide.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/upload/PhotoExamplesGuide.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/upload/PhotoExamplesGuide.tsx",
        lineNumber: 45,
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
    "CLOTHING_PRESENTATIONS",
    ()=>CLOTHING_PRESENTATIONS,
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
    "bottomsForPresentation",
    ()=>bottomsForPresentation,
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
const CLOTHING_PRESENTATIONS = [
    {
        id: "masculine",
        label: "Men",
        hint: "Men’s clothing & fits"
    },
    {
        id: "feminine",
        label: "Women",
        hint: "Women’s clothing & fits"
    },
    {
        id: "androgynous",
        label: "Either",
        hint: "More unisex looks"
    }
];
function bottomsForPresentation(presentation) {
    if (presentation === "masculine") {
        return BOTTOM_PREFERENCES.filter((b)=>b.id === "jeans" || b.id === "trousers");
    }
    return BOTTOM_PREFERENCES;
}
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
    const wardrobeLabel = prefs.presentation === "masculine" ? "Men's" : prefs.presentation === "androgynous" ? "Unisex" : "Women's";
    const color = FAVORITE_COLORS.find((c)=>c.id === prefs.favoriteColor)?.label ?? prefs.favoriteColor;
    const bottom = BOTTOM_PREFERENCES.find((b)=>b.id === prefs.bottomPreference)?.label ?? prefs.bottomPreference;
    const sil = SILHOUETTE_PREFERENCES.find((s)=>s.id === prefs.silhouette)?.label ?? prefs.silhouette;
    const vibe = STYLE_VIBES.find((v)=>v.id === prefs.vibe)?.label ?? prefs.vibe;
    const budget = STYLE_BUDGETS.find((b)=>b.id === prefs.budget)?.label ?? prefs.budget;
    return {
        preferences: prefs,
        detectedSignals: [],
        summary: `${wardrobeLabel} wardrobe — you lean ${vibe.toLowerCase()} with a ${sil.toLowerCase()} silhouette, favoring ${bottom.toLowerCase()} and ${color.toLowerCase()} tones — ${budget.toLowerCase()} spend.`,
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
"[project]/components/PhotoUpload.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PhotoUpload",
    ()=>PhotoUpload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mediapipe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mediapipe.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$distress$2d$check$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/distress-check.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$personalization$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/personalization.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$landmark$2d$quality$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/landmark-quality.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$upload$2f$PhotoExamplesGuide$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/upload/PhotoExamplesGuide.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$JourneyProgressBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/JourneyProgressBar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/use-auth-user.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
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
const MIN_PHOTOS = 3;
const MAX_PHOTOS = 5;
const FREE_REPORT_CAP = 5;
function makeId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} b`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} kb`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} mb`;
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
function PhotoUpload({ consent }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user, isAuthed, ready: authReady } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthUser"])();
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [slots, setSlots] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dragging, setDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [uploadingBatch, setUploadingBatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [analyzing, setAnalyzing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [priorityFeatures, setPriorityFeatures] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [userNote, setUserNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [supportMode, setSupportMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [carouselIndex, setCarouselIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [approvalToast, setApprovalToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [proLimitOpen, setProLimitOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [proBusy, setProBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [proError, setProError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [reportUsed, setReportUsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const approvalShownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const freeReportsUsed = isAuthed ? reportUsed ?? user?.reportIds?.length ?? 0 : null;
    const atFreeReportLimit = Boolean(isAuthed) && !user?.isPro && freeReportsUsed != null && freeReportsUsed >= FREE_REPORT_CAP;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!authReady || !isAuthed || user?.isPro) {
            setReportUsed(null);
            return;
        }
        void (async ()=>{
            try {
                const { reports } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchMyReports"])();
                const baselines = reports.filter((r)=>r.kind !== "target_look");
                setReportUsed(baselines.length);
            } catch  {
                setReportUsed(user?.reportIds?.length ?? 0);
            }
        })();
    }, [
        authReady,
        isAuthed,
        user?.isPro,
        user?.reportIds
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (atFreeReportLimit) setProLimitOpen(true);
    }, [
        atFreeReportLimit
    ]);
    const openProCheckout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setProError(null);
        setProBusy(true);
        try {
            const checkout = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startProCheckout"])({
                successPath: "/upload?checkout=success",
                cancelPath: "/upload?checkout=cancel"
            });
            if (checkout.alreadyPro) {
                setProLimitOpen(false);
                setReportUsed(null);
                return;
            }
            if (checkout.url) {
                window.location.href = checkout.url;
                return;
            }
            if (checkout.devUnlock) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["devUnlockPro"])();
                setProLimitOpen(false);
                setReportUsed(null);
                window.location.reload();
                return;
            }
            setProError(checkout.error ?? "Checkout unavailable right now.");
        } catch (err) {
            setProError(err instanceof Error ? err.message : "Checkout failed.");
        } finally{
            setProBusy(false);
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (slots.length === 0) {
            setCarouselIndex(0);
            return;
        }
        setCarouselIndex((i)=>Math.min(i, slots.length - 1));
    }, [
        slots.length
    ]);
    const allApproved = slots.length >= MIN_PHOTOS && slots.every((s)=>s.status === "accepted") && !uploadingBatch;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!allApproved) {
            if (slots.some((s)=>s.status !== "accepted")) {
                approvalShownRef.current = false;
                setApprovalToast(false);
            }
            return;
        }
        if (approvalShownRef.current) return;
        approvalShownRef.current = true;
        setApprovalToast(true);
        const hide = window.setTimeout(()=>setApprovalToast(false), 6500);
        return ()=>window.clearTimeout(hide);
    }, [
        allApproved,
        slots
    ]);
    const updateSlot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id, patch)=>{
        setSlots((prev)=>prev.map((s)=>s.id === id ? {
                    ...s,
                    ...patch
                } : s));
    }, []);
    const togglePriority = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((key)=>{
        setPriorityFeatures((prev)=>prev.includes(key) ? prev.filter((k)=>k !== key) : [
                ...prev,
                key
            ]);
    }, []);
    const processFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (slot)=>{
        updateSlot(slot.id, {
            status: "quality-check-pending"
        });
        try {
            let landmarks = null;
            let landmarkScore = null;
            let fileForUpload = slot.file;
            try {
                const extracted = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mediapipe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractFaceLandmarksFromFile"])(slot.file);
                landmarks = extracted.landmarks;
                const quality = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$landmark$2d$quality$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assessLandmarkQuality"])(landmarks);
                landmarkScore = quality?.score ?? null;
                fileForUpload = extracted.fileForUpload;
                if (extracted.previewUrl) {
                    URL.revokeObjectURL(slot.previewUrl);
                    updateSlot(slot.id, {
                        file: fileForUpload,
                        previewUrl: extracted.previewUrl
                    });
                }
                if (!quality?.usableForPortrait) {
                    updateSlot(slot.id, {
                        status: "rejected",
                        rejectReason: quality?.rejectReason ?? (landmarks ? "Face mesh too weak — use a closer frontal photo with an eye, nose, and jawline visible." : "No face detected in this photo — try a clearer frontal selfie (avoid heavy cutouts if possible)."),
                        landmarks,
                        landmarkScore
                    });
                    return;
                }
            } catch (err) {
                console.warn("[MediaPipe] face mesh required for upload", err);
                updateSlot(slot.id, {
                    status: "rejected",
                    rejectReason: "Could not read face landmarks — try a clearer frontal selfie (JPG/PNG).",
                    landmarks: null,
                    landmarkScore: null
                });
                return;
            }
            updateSlot(slot.id, {
                status: "uploading",
                landmarks,
                landmarkScore,
                file: fileForUpload
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
                body: formData
            });
            const raw = await res.text();
            let data = {};
            try {
                data = raw ? JSON.parse(raw) : {};
            } catch  {
                updateSlot(slot.id, {
                    status: "rejected",
                    rejectReason: `Upload failed (${res.status}). Try again.`,
                    landmarks,
                    landmarkScore
                });
                return;
            }
            if (!res.ok || !data.fileId) {
                updateSlot(slot.id, {
                    status: "rejected",
                    rejectReason: data.error || data.reasons?.[0] || `Photo did not pass the quality gate (${res.status}).`,
                    landmarks,
                    landmarkScore
                });
                return;
            }
            updateSlot(slot.id, {
                status: "accepted",
                fileId: data.fileId,
                landmarks,
                landmarkScore
            });
        } catch (err) {
            updateSlot(slot.id, {
                status: "rejected",
                rejectReason: err instanceof Error ? err.message : "Unexpected upload error."
            });
        }
    }, [
        consent.allowTraining,
        consent.retainForTracking,
        updateSlot
    ]);
    const addFiles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((fileList)=>{
        if (!fileList?.length) return;
        setError(null);
        const incoming = Array.from(fileList).filter((f)=>[
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/webp"
            ].includes(f.type));
        setSlots((prev)=>{
            const room = MAX_PHOTOS - prev.length;
            if (room <= 0) {
                setError(`Maximum ${MAX_PHOTOS} photos.`);
                return prev;
            }
            const toAdd = incoming.slice(0, room).map((file)=>({
                    id: makeId(),
                    file,
                    previewUrl: URL.createObjectURL(file),
                    status: "idle"
                }));
            if (incoming.length > room) {
                setError(`Only ${room} more photo(s) allowed (max ${MAX_PHOTOS}).`);
            }
            return [
                ...prev,
                ...toAdd
            ];
        });
    }, []);
    const removeSlot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setSlots((prev)=>{
            const target = prev.find((s)=>s.id === id);
            if (target) URL.revokeObjectURL(target.previewUrl);
            return prev.filter((s)=>s.id !== id);
        });
    }, []);
    const uploadPending = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        const pending = slots.filter((s)=>s.status === "idle");
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
    }, [
        processFile,
        slots
    ]);
    const runAnalysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (atFreeReportLimit) {
            setProLimitOpen(true);
            return;
        }
        const accepted = slots.filter((s)=>s.status === "accepted" && s.fileId);
        if (accepted.length < MIN_PHOTOS) {
            setError(`Need at least ${MIN_PHOTOS} accepted photos to analyze.`);
            return;
        }
        const portrait = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$landmark$2d$quality$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pickBestPortraitSlot"])(accepted);
        const portraitQuality = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$landmark$2d$quality$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assessLandmarkQuality"])(portrait?.landmarks);
        if (!portrait || !portraitQuality?.usableForPortrait || !portrait.landmarks || portrait.landmarks.length < 400) {
            setError("Need at least one clear frontal face photo with a strong face mesh — add a closer, upright shot looking at the camera.");
            return;
        }
        // Portrait first: analyze keeps fileIds[0] as the report face (and
        // deletes the rest when not retaining for tracking).
        const fileIds = [
            portrait.fileId,
            ...accepted.filter((s)=>s.id !== portrait.id).map((s)=>s.fileId)
        ];
        const note = userNote.trim().slice(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$personalization$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["USER_NOTE_MAX_LENGTH"]);
        // Client-side distress stub — never feed flagged text into prioritization.
        // TODO(replace): same stub as backend; swap for a stronger check later.
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$distress$2d$check$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["checkDistressLanguage"])(note).flagged) {
            setSupportMode(true);
            setError(null);
            return;
        }
        setError(null);
        setAnalyzing(true);
        try {
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
            const res = await fetch("/api/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...token ? {
                        Authorization: `Bearer ${token}`
                    } : {}
                },
                body: JSON.stringify({
                    fileIds,
                    retainForTracking: consent.retainForTracking,
                    allowTraining: consent.allowTraining,
                    priorityFeatures,
                    userNote: note.length > 0 ? note : null,
                    landmarks: portrait.landmarks,
                    portraitFileId: portrait.fileId
                })
            });
            const raw = await res.text();
            let data = {};
            try {
                data = raw ? JSON.parse(raw) : {};
            } catch  {
                setError(res.ok ? "Analysis returned an unexpected response." : res.status === 500 || res.status === 502 || res.status === 504 ? "Analysis timed out on the way back. Check your dashboard — the report may still have been created." : `Analysis failed (${res.status}). Try again in a moment.`);
                return;
            }
            if (res.status === 402 || data.code === "REPORT_LIMIT" || data.needsPro) {
                if (typeof data.used === "number") setReportUsed(data.used);
                setProLimitOpen(true);
                return;
            }
            if (res.status === 429) {
                setError(data.error ?? "Re-analysis is limited to once per week. Try again after the cooldown.");
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
            setError(err instanceof Error ? err.message : "Unexpected analysis error.");
        } finally{
            setAnalyzing(false);
        }
    }, [
        atFreeReportLimit,
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
    const acceptedSlots = slots.filter((s)=>s.status === "accepted" && s.fileId);
    const bestPortrait = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$landmark$2d$quality$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pickBestPortraitSlot"])(acceptedSlots);
    const hasPortraitMesh = Boolean(bestPortrait) && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$landmark$2d$quality$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assessLandmarkQuality"])(bestPortrait?.landmarks)?.usableForPortrait ?? false);
    const readyToAnalyze = acceptedCount >= MIN_PHOTOS && !hasIdle && hasPortraitMesh;
    if (supportMode) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SupportPauseCard, {}, void 0, false, {
            fileName: "[project]/components/PhotoUpload.tsx",
            lineNumber: 510,
            columnNumber: 12
        }, this);
    }
    const activeSlot = slots[carouselIndex] ?? null;
    const checking = slots.some((s)=>s.status === "quality-check-pending" || s.status === "uploading");
    let uploadWithin = Math.min(0.88, acceptedCount / MIN_PHOTOS);
    if (analyzing) uploadWithin = 0.96;
    else if (checking) {
        uploadWithin = Math.max(uploadWithin * 0.7, Math.min(0.45, slots.length / MIN_PHOTOS * 0.4));
    }
    const stagesLeft = 4; // face, prefs, style reveal, looks
    const uploadDetail = analyzing ? "Analyzing face mesh — Face & Grooming reveal is next" : acceptedCount >= MIN_PHOTOS ? `Ready to analyze · ${stagesLeft} stages after this` : acceptedCount === 0 ? `Add ${MIN_PHOTOS}–${MAX_PHOTOS} photos · ${stagesLeft} stages after upload` : `${acceptedCount} of ${MIN_PHOTOS} accepted · ${Math.max(0, MIN_PHOTOS - acceptedCount)} more needed`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "upload-glass px-3.5 py-3 text-left sm:px-4 sm:py-3.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$JourneyProgressBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JourneyProgressBar"], {
                current: "upload",
                withinStep: uploadWithin,
                detail: uploadDetail,
                variant: "dark"
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 537,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "upload-layout",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "upload-layout-copy",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "upload-eyebrow",
                                children: "Appearance report"
                            }, void 0, false, {
                                fileName: "[project]/components/PhotoUpload.tsx",
                                lineNumber: 545,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-1 font-[family-name:var(--font-cursive)] text-[1.65rem] leading-tight tracking-tight text-white sm:text-[1.85rem]",
                                children: "Place your portraits."
                            }, void 0, false, {
                                fileName: "[project]/components/PhotoUpload.tsx",
                                lineNumber: 546,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 max-w-md text-[13px] leading-snug text-white/50",
                                children: [
                                    MIN_PHOTOS,
                                    "–",
                                    MAX_PHOTOS,
                                    " clear face photos. Each needs a readable face mesh (eye, nose, jawline) so scores can be measured — not just accepted."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PhotoUpload.tsx",
                                lineNumber: 549,
                                columnNumber: 11
                            }, this),
                            isAuthed && !user?.isPro && freeReportsUsed != null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs text-white/45",
                                children: [
                                    "Free reports: ",
                                    Math.min(freeReportsUsed, FREE_REPORT_CAP),
                                    " /",
                                    " ",
                                    FREE_REPORT_CAP,
                                    atFreeReportLimit ? " — limit reached" : ` · ${Math.max(0, FREE_REPORT_CAP - freeReportsUsed)} left`
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PhotoUpload.tsx",
                                lineNumber: 556,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `upload-glass-inset mt-3 flex cursor-pointer items-center gap-3 px-3 py-2.5 transition ${dragging ? "ring-2 ring-white/30" : ""} ${!canAddMore ? "cursor-not-allowed opacity-55" : "hover:bg-white/8"}`,
                                onClick: ()=>canAddMore && inputRef.current?.click(),
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
                                        e.preventDefault();
                                        if (canAddMore) inputRef.current?.click();
                                    }
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FileStackGraphic, {}, void 0, false, {
                                        fileName: "[project]/components/PhotoUpload.tsx",
                                        lineNumber: 589,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-white/80",
                                                children: [
                                                    "Drop portraits or",
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-white underline underline-offset-2",
                                                        children: "browse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/PhotoUpload.tsx",
                                                        lineNumber: 593,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/PhotoUpload.tsx",
                                                lineNumber: 591,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-0.5 text-xs text-white/40",
                                                children: [
                                                    "JPG, PNG, WEBP",
                                                    canAddMore ? ` · ${MIN_PHOTOS}–${MAX_PHOTOS} photos` : " · max reached"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/PhotoUpload.tsx",
                                                lineNumber: 597,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/PhotoUpload.tsx",
                                        lineNumber: 590,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                        lineNumber: 604,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PhotoUpload.tsx",
                                lineNumber: 565,
                                columnNumber: 11
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 rounded-xl border border-red-400/25 bg-red-500/10 px-3 py-2 text-sm text-red-200",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/components/PhotoUpload.tsx",
                                lineNumber: 619,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PersonalizationFields, {
                                priorityFeatures: priorityFeatures,
                                onToggle: togglePriority,
                                userNote: userNote,
                                onNoteChange: setUserNote
                            }, void 0, false, {
                                fileName: "[project]/components/PhotoUpload.tsx",
                                lineNumber: 624,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        disabled: uploadingBatch || !hasIdle,
                                        onClick: ()=>void uploadPending(),
                                        className: "inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UploadIcon, {}, void 0, false, {
                                                fileName: "[project]/components/PhotoUpload.tsx",
                                                lineNumber: 638,
                                                columnNumber: 15
                                            }, this),
                                            uploadingBatch ? "Uploading…" : "Upload files"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/PhotoUpload.tsx",
                                        lineNumber: 632,
                                        columnNumber: 13
                                    }, this),
                                    readyToAnalyze ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        disabled: analyzing,
                                        onClick: ()=>void runAnalysis(),
                                        className: "inline-flex flex-1 items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none",
                                        children: analyzing ? "Generating…" : atFreeReportLimit ? "Limit reached — unlock Pro" : "Generate report"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PhotoUpload.tsx",
                                        lineNumber: 643,
                                        columnNumber: 15
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PhotoUpload.tsx",
                                lineNumber: 631,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs text-white/40",
                                children: [
                                    acceptedCount,
                                    " of ",
                                    MIN_PHOTOS,
                                    "–",
                                    MAX_PHOTOS,
                                    " accepted",
                                    consent.retainForTracking ? " · photos retained for tracking" : " · photos deleted after report",
                                    acceptedCount >= MIN_PHOTOS && !hasPortraitMesh ? " — need one clearer frontal face for the report" : readyToAnalyze ? " — ready for analysis" : ""
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PhotoUpload.tsx",
                                lineNumber: 658,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 544,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "upload-layout-media",
                        children: slots.length > 0 && activeSlot ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "upload-carousel",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "upload-carousel-track upload-glass-inset relative overflow-hidden !p-0",
                                    children: [
                                        slots.map((slot, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `upload-carousel-slide ${i === carouselIndex ? "is-active" : ""}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: slot.previewUrl,
                                                        alt: ""
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/PhotoUpload.tsx",
                                                        lineNumber: 683,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "upload-carousel-veil"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/PhotoUpload.tsx",
                                                        lineNumber: 684,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "upload-carousel-meta",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] uppercase tracking-[0.18em] text-white/55",
                                                                children: [
                                                                    "Frame ",
                                                                    i + 1,
                                                                    " of ",
                                                                    slots.length,
                                                                    " ·",
                                                                    " ",
                                                                    fileKindLabel(slot.file),
                                                                    slot.id === bestPortrait?.id && hasPortraitMesh ? " · Report face" : ""
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/PhotoUpload.tsx",
                                                                lineNumber: 686,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-0.5 truncate text-sm font-semibold text-white",
                                                                children: slot.file.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/PhotoUpload.tsx",
                                                                lineNumber: 693,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-0.5 text-xs text-white/65",
                                                                children: [
                                                                    formatBytes(slot.file.size),
                                                                    " ·",
                                                                    " ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusLabel, {
                                                                        slot: slot,
                                                                        isReportPortrait: slot.id === bestPortrait?.id && hasPortraitMesh
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/PhotoUpload.tsx",
                                                                        lineNumber: 698,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/PhotoUpload.tsx",
                                                                lineNumber: 696,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/PhotoUpload.tsx",
                                                        lineNumber: 685,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, slot.id, true, {
                                                fileName: "[project]/components/PhotoUpload.tsx",
                                                lineNumber: 676,
                                                columnNumber: 19
                                            }, this)),
                                        slots.length > 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "upload-carousel-nav upload-carousel-nav--prev",
                                                    "aria-label": "Previous photo",
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        setCarouselIndex((i)=>(i - 1 + slots.length) % slots.length);
                                                    },
                                                    children: "‹"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/PhotoUpload.tsx",
                                                    lineNumber: 711,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "upload-carousel-nav upload-carousel-nav--next",
                                                    "aria-label": "Next photo",
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        setCarouselIndex((i)=>(i + 1) % slots.length);
                                                    },
                                                    children: "›"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/PhotoUpload.tsx",
                                                    lineNumber: 724,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/PhotoUpload.tsx",
                                    lineNumber: 674,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2 flex items-center justify-between gap-3",
                                    children: [
                                        slots.length > 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "upload-carousel-dots !mt-0",
                                            role: "tablist",
                                            "aria-label": "Photos",
                                            children: slots.map((slot, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    role: "tab",
                                                    "aria-selected": i === carouselIndex,
                                                    "aria-label": `Show photo ${i + 1}`,
                                                    className: `upload-carousel-dot ${i === carouselIndex ? "is-active" : ""}`,
                                                    onClick: ()=>setCarouselIndex(i)
                                                }, slot.id, false, {
                                                    fileName: "[project]/components/PhotoUpload.tsx",
                                                    lineNumber: 747,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/PhotoUpload.tsx",
                                            lineNumber: 741,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-white/45",
                                            children: [
                                                acceptedCount,
                                                " accepted"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/PhotoUpload.tsx",
                                            lineNumber: 761,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>removeSlot(activeSlot.id),
                                            className: "rounded-full border border-white/20 bg-white/8 px-3 py-1.5 text-xs font-medium text-white/75 transition hover:bg-white/15 hover:text-white",
                                            children: "Remove"
                                        }, void 0, false, {
                                            fileName: "[project]/components/PhotoUpload.tsx",
                                            lineNumber: 765,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/PhotoUpload.tsx",
                                    lineNumber: 739,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/PhotoUpload.tsx",
                            lineNumber: 673,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "upload-media-empty upload-glass-inset flex h-full min-h-[16rem] flex-col items-center justify-center px-4 py-5 text-center sm:min-h-[22rem]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium text-white/80",
                                    children: "Preview appears here"
                                }, void 0, false, {
                                    fileName: "[project]/components/PhotoUpload.tsx",
                                    lineNumber: 776,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 max-w-[14rem] text-xs leading-relaxed text-white/40",
                                    children: [
                                        "Add ",
                                        MIN_PHOTOS,
                                        "–",
                                        MAX_PHOTOS,
                                        " portraits to review frames side by side with your upload controls."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/PhotoUpload.tsx",
                                    lineNumber: 779,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/PhotoUpload.tsx",
                            lineNumber: 775,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 671,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 543,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$upload$2f$PhotoExamplesGuide$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PhotoExamplesGuide"], {}, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 788,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `upload-toast ${approvalToast ? "is-visible" : ""}`,
                role: "status",
                "aria-live": "polite",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "upload-toast-card",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "upload-toast-dot",
                            "aria-hidden": true
                        }, void 0, false, {
                            fileName: "[project]/components/PhotoUpload.tsx",
                            lineNumber: 796,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold text-white",
                                    children: "Approved — generate your report"
                                }, void 0, false, {
                                    fileName: "[project]/components/PhotoUpload.tsx",
                                    lineNumber: 798,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-0.5 text-xs leading-relaxed text-white/50",
                                    children: [
                                        "All ",
                                        acceptedCount,
                                        " photos passed quality checks. You’re ready to continue."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/PhotoUpload.tsx",
                                    lineNumber: 801,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/PhotoUpload.tsx",
                            lineNumber: 797,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "shrink-0 rounded-full px-2 py-1 text-xs text-white/40 transition hover:text-white",
                            "aria-label": "Dismiss",
                            onClick: ()=>setApprovalToast(false),
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/components/PhotoUpload.tsx",
                            lineNumber: 806,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/PhotoUpload.tsx",
                    lineNumber: 795,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 790,
                columnNumber: 7
            }, this),
            proLimitOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": "Dismiss",
                        className: "absolute inset-0 bg-[#0a0414]/70 backdrop-blur-sm",
                        onClick: ()=>setProLimitOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 819,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        role: "dialog",
                        "aria-modal": true,
                        "aria-labelledby": "report-limit-title",
                        className: "relative z-10 w-full max-w-md rounded-3xl border border-white/12 bg-[#141018] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)] sm:p-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setProLimitOpen(false),
                                className: "absolute right-4 top-4 rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/50 transition hover:bg-white/10 hover:text-white",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/components/PhotoUpload.tsx",
                                lineNumber: 831,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs uppercase tracking-[0.18em] text-white/45",
                                children: "Free limit reached"
                            }, void 0, false, {
                                fileName: "[project]/components/PhotoUpload.tsx",
                                lineNumber: 838,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "report-limit-title",
                                className: "mt-2 text-2xl font-semibold text-white",
                                children: [
                                    "You’ve used all ",
                                    FREE_REPORT_CAP,
                                    " free reports"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PhotoUpload.tsx",
                                lineNumber: 841,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-sm leading-relaxed text-white/55",
                                children: "Subscribe to Pro for unlimited appearance scans, weekly rechecks, and restocked looks."
                            }, void 0, false, {
                                fileName: "[project]/components/PhotoUpload.tsx",
                                lineNumber: 847,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        disabled: proBusy,
                                        onClick: ()=>void openProCheckout(),
                                        className: "inline-flex flex-1 items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-white/90 disabled:opacity-60",
                                        children: proBusy ? "Opening checkout…" : "Unlock Pro — £9.99/mo"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PhotoUpload.tsx",
                                        lineNumber: 852,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/dashboard",
                                        className: "inline-flex flex-1 items-center justify-center rounded-full border border-white/20 bg-white/8 px-4 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/12",
                                        children: "View past reports"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PhotoUpload.tsx",
                                        lineNumber: 860,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PhotoUpload.tsx",
                                lineNumber: 851,
                                columnNumber: 13
                            }, this),
                            proError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-sm text-amber-200/90",
                                children: proError
                            }, void 0, false, {
                                fileName: "[project]/components/PhotoUpload.tsx",
                                lineNumber: 868,
                                columnNumber: 15
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 825,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 818,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/PhotoUpload.tsx",
        lineNumber: 536,
        columnNumber: 5
    }, this);
}
function PersonalizationFields({ priorityFeatures, onToggle, userNote, onNoteChange }) {
    const remaining = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$personalization$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["USER_NOTE_MAX_LENGTH"] - userNote.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "upload-glass-inset mt-2.5 px-2.5 py-2.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-end justify-between gap-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "upload-eyebrow",
                            children: "Optional focus"
                        }, void 0, false, {
                            fileName: "[project]/components/PhotoUpload.tsx",
                            lineNumber: 894,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-0.5 text-[13px] font-medium text-white",
                            children: "What are you most curious about?"
                        }, void 0, false, {
                            fileName: "[project]/components/PhotoUpload.tsx",
                            lineNumber: 895,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/PhotoUpload.tsx",
                    lineNumber: 893,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 892,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 flex flex-wrap gap-1.5",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$personalization$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRIORITY_FEATURE_OPTIONS"].map(({ key, label })=>{
                    const selected = priorityFeatures.includes(key);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-pressed": selected,
                        onClick: ()=>onToggle(key),
                        className: `rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition ${selected ? "border-white/50 bg-white text-neutral-950" : "border-white/20 bg-white/5 text-white/65 hover:bg-white/10 hover:text-white"}`,
                        children: label
                    }, key, false, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 905,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 901,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "mt-2 block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "sr-only",
                        children: "Anything else you'd like us to focus on?"
                    }, void 0, false, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 923,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: userNote,
                        onChange: (e)=>onNoteChange(e.target.value.slice(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$personalization$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["USER_NOTE_MAX_LENGTH"])),
                        rows: 1,
                        maxLength: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$personalization$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["USER_NOTE_MAX_LENGTH"],
                        placeholder: "Anything else you'd like us to focus on?",
                        className: "w-full resize-none rounded-xl border border-white/15 bg-black/25 px-3 py-1.5 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/35 focus:ring-1 focus:ring-white/20"
                    }, void 0, false, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 924,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mt-0.5 block text-right text-[10px] text-white/35",
                        children: [
                            remaining,
                            " left"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 934,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 922,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/PhotoUpload.tsx",
        lineNumber: 891,
        columnNumber: 5
    }, this);
}
function SupportPauseCard() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "upload-glass px-5 py-6 text-center sm:px-7 sm:py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "upload-eyebrow",
                children: "Pause"
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 945,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "mt-2 font-[family-name:var(--font-cursive)] text-2xl tracking-tight text-white sm:text-3xl",
                children: "We're glad you reached out — let's take this gently."
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 946,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55",
                children: "Zelko is built for appearance feedback, not emotional support. If you're carrying something heavy right now, please talk with someone who can help. We won't run a beauty report for this session."
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 949,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mx-auto mt-5 max-w-sm space-y-2 text-left text-sm text-white/75",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "https://www.iasp.info/suicidalthoughts/",
                            target: "_blank",
                            rel: "noreferrer",
                            className: "font-medium text-white underline-offset-2 hover:underline",
                            children: "IASP — resources for suicidal thoughts"
                        }, void 0, false, {
                            fileName: "[project]/components/PhotoUpload.tsx",
                            lineNumber: 956,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 955,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "https://findahelpline.com/",
                            target: "_blank",
                            rel: "noreferrer",
                            className: "font-medium text-white underline-offset-2 hover:underline",
                            children: "Find a Helpline — local support by country"
                        }, void 0, false, {
                            fileName: "[project]/components/PhotoUpload.tsx",
                            lineNumber: 966,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 965,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 954,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-5 text-xs leading-relaxed text-white/40",
                children: "If you're in immediate danger, contact local emergency services."
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 976,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/PhotoUpload.tsx",
        lineNumber: 944,
        columnNumber: 5
    }, this);
}
function StatusLabel({ slot, isReportPortrait = false }) {
    if (slot.status === "uploading") return "Uploading…";
    if (slot.status === "quality-check-pending") return "Quality check…";
    if (slot.status === "accepted") {
        const mesh = typeof slot.landmarkScore === "number" ? ` · mesh ${slot.landmarkScore}` : "";
        if (isReportPortrait) return `Accepted · report face${mesh}`;
        return `Accepted${mesh}`;
    }
    if (slot.status === "rejected") {
        return slot.rejectReason ? `Rejected — ${slot.rejectReason}` : "Rejected";
    }
    return null;
}
function UploadIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        className: "size-4",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 16V4m0 0l-4 4m4-4l4 4",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 1016,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 1021,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/PhotoUpload.tsx",
        lineNumber: 1008,
        columnNumber: 5
    }, this);
}
function FileStackGraphic() {
    const labels = [
        "JPEG",
        "JPG",
        "PNG"
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-12 w-[4.5rem] shrink-0",
        "aria-hidden": true,
        children: labels.map((label, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 h-12 w-9 overflow-hidden rounded-md border border-white/25 bg-[#2a2e36] shadow-md",
                style: {
                    left: `${i * 14}px`,
                    transform: `rotate(${(i - 1) * 8}deg)`,
                    zIndex: i + 1
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white/15 px-0.5 py-0.5 text-center text-[6px] font-bold tracking-wide text-white/80",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 1040,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-[calc(100%-14px)] items-center justify-center bg-[#1c1f25]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            viewBox: "0 0 24 24",
                            className: "size-4 text-white/35",
                            fill: "currentColor",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M5 5h14a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1zm2 10l3-4 2 2.5L15 9l4 6H7z"
                            }, void 0, false, {
                                fileName: "[project]/components/PhotoUpload.tsx",
                                lineNumber: 1049,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/PhotoUpload.tsx",
                            lineNumber: 1044,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/PhotoUpload.tsx",
                        lineNumber: 1043,
                        columnNumber: 11
                    }, this)
                ]
            }, label, true, {
                fileName: "[project]/components/PhotoUpload.tsx",
                lineNumber: 1031,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/PhotoUpload.tsx",
        lineNumber: 1029,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/consent.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Upload privacy defaults — PRODUCT.md:
 * Analyze → report → delete extras by default.
 * Tracking / training remain off unless the product later exposes settings.
 * Full conditions live on /privacy.
 */ __turbopack_context__.s([
    "CONSENT_STORAGE_KEY",
    ()=>CONSENT_STORAGE_KEY,
    "acceptedUploadConsent",
    ()=>acceptedUploadConsent,
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
function acceptedUploadConsent() {
    return {
        analysisAcknowledged: true,
        retainForTracking: false,
        allowTraining: false,
        acceptedAt: new Date().toISOString()
    };
}
function defaultConsentDraft() {
    return {
        analysisAcknowledged: true,
        retainForTracking: false,
        allowTraining: false
    };
}
function readStoredConsent() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
function writeStoredConsent(consent) {
    sessionStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
}
function clearStoredConsent() {
    sessionStorage.removeItem(CONSENT_STORAGE_KEY);
}
}),
"[project]/components/UploadExperience.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UploadExperience",
    ()=>UploadExperience
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$SiteHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/site/SiteHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PhotoUpload$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/PhotoUpload.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$consent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/consent.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function UploadExperience() {
    const consent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$consent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["acceptedUploadConsent"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "upload-page report-dash relative min-h-svh overflow-x-clip text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": true,
                className: "report-dash__bg"
            }, void 0, false, {
                fileName: "[project]/components/UploadExperience.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$SiteHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SiteHeader"], {
                variant: "dark"
            }, void 0, false, {
                fileName: "[project]/components/UploadExperience.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "upload-stage relative z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "upload-stage-inner",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "upload-stage-card",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "upload-stage-card-body",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PhotoUpload$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PhotoUpload"], {
                                    consent: consent
                                }, void 0, false, {
                                    fileName: "[project]/components/UploadExperience.tsx",
                                    lineNumber: 23,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 text-center text-[11px] leading-relaxed text-white/40",
                                    children: [
                                        "By uploading you agree to how we handle photos under our",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/privacy",
                                            className: "font-medium text-white/70 underline-offset-2 hover:text-white hover:underline",
                                            children: "Privacy Policy"
                                        }, void 0, false, {
                                            fileName: "[project]/components/UploadExperience.tsx",
                                            lineNumber: 26,
                                            columnNumber: 17
                                        }, this),
                                        "."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/UploadExperience.tsx",
                                    lineNumber: 24,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/UploadExperience.tsx",
                            lineNumber: 22,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/UploadExperience.tsx",
                        lineNumber: 21,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/UploadExperience.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/UploadExperience.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/UploadExperience.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_9458a94c._.js.map