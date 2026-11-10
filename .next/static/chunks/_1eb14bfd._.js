(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/device-id.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    return "dev_".concat(Math.random().toString(36).slice(2)).concat(Date.now().toString(36));
}
function getOrCreateDeviceId() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        var _localStorage_getItem;
        const existing = (_localStorage_getItem = localStorage.getItem(STORAGE_KEY)) === null || _localStorage_getItem === void 0 ? void 0 : _localStorage_getItem.trim();
        if (existing && existing.length >= 8) return existing;
        const next = randomId();
        localStorage.setItem(STORAGE_KEY, next);
        return next;
    } catch (e) {
        return randomId();
    }
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$device$2d$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/device-id.ts [app-client] (ecmascript)");
;
const AUTH_TOKEN_KEY = "zelko.authToken";
function getAuthToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch (e) {
        return null;
    }
}
function setAuthToken(token) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
        else localStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (e) {
    /* ignore */ }
}
function authHeaders() {
    const token = getAuthToken();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$device$2d$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deviceAuthHeaders"])({
        "Content-Type": "application/json",
        ...token ? {
            Authorization: "Bearer ".concat(token)
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
        var _data_error;
        throw new Error((_data_error = data === null || data === void 0 ? void 0 : data.error) !== null && _data_error !== void 0 ? _data_error : "Registration failed.");
    }
    if (!(data === null || data === void 0 ? void 0 : data.token) || !data.user) {
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
        var _data_error;
        throw new Error((_data_error = data === null || data === void 0 ? void 0 : data.error) !== null && _data_error !== void 0 ? _data_error : "Login failed.");
    }
    if (!(data === null || data === void 0 ? void 0 : data.token) || !data.user) {
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
    if (!res.ok || !(data === null || data === void 0 ? void 0 : data.user)) {
        var _data_error;
        throw new Error((_data_error = data === null || data === void 0 ? void 0 : data.error) !== null && _data_error !== void 0 ? _data_error : "Could not link report.");
    }
    return data.user;
}
async function fetchMe() {
    const token = getAuthToken();
    if (!token) return null;
    const res = await fetch("/api/auth/me", {
        headers: {
            Authorization: "Bearer ".concat(token)
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
            Authorization: "Bearer ".concat(token)
        },
        cache: "no-store"
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok || !(data === null || data === void 0 ? void 0 : data.user) || !data.reports) {
        var _data_error;
        throw new Error((_data_error = data === null || data === void 0 ? void 0 : data.error) !== null && _data_error !== void 0 ? _data_error : "Failed to load reports.");
    }
    return {
        user: data.user,
        reports: data.reports
    };
}
async function deleteMyReport(reportId) {
    const token = getAuthToken();
    if (!token) throw new Error("Sign in required.");
    const res = await fetch("/api/reports/".concat(reportId), {
        method: "DELETE",
        headers: {
            Authorization: "Bearer ".concat(token)
        }
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok) {
        var _data_error;
        throw new Error((_data_error = data === null || data === void 0 ? void 0 : data.error) !== null && _data_error !== void 0 ? _data_error : "Failed to delete report.");
    }
}
async function startProCheckout(input) {
    const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(input !== null && input !== void 0 ? input : {})
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok) {
        var _data_error;
        return {
            url: null,
            error: (_data_error = data === null || data === void 0 ? void 0 : data.error) !== null && _data_error !== void 0 ? _data_error : "Checkout failed.",
            devUnlock: data === null || data === void 0 ? void 0 : data.devUnlock
        };
    }
    var _data_url;
    return {
        url: (_data_url = data === null || data === void 0 ? void 0 : data.url) !== null && _data_url !== void 0 ? _data_url : null,
        alreadyPro: data === null || data === void 0 ? void 0 : data.alreadyPro,
        devUnlock: data === null || data === void 0 ? void 0 : data.devUnlock
    };
}
async function cancelProSubscription() {
    const res = await fetch("/api/billing/cancel", {
        method: "POST",
        headers: authHeaders(),
        body: "{}"
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok || !(data === null || data === void 0 ? void 0 : data.user)) {
        var _data_error;
        throw new Error((_data_error = data === null || data === void 0 ? void 0 : data.error) !== null && _data_error !== void 0 ? _data_error : "Could not cancel subscription.");
    }
    var _data_message, _data_currentPeriodEnd;
    return {
        user: data.user,
        message: (_data_message = data.message) !== null && _data_message !== void 0 ? _data_message : "Subscription canceled.",
        immediate: data.immediate,
        currentPeriodEnd: (_data_currentPeriodEnd = data.currentPeriodEnd) !== null && _data_currentPeriodEnd !== void 0 ? _data_currentPeriodEnd : data.user.currentPeriodEnd
    };
}
async function devUnlockPro() {
    const res = await fetch("/api/billing/dev-unlock", {
        method: "POST",
        headers: authHeaders(),
        body: "{}"
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok || !(data === null || data === void 0 ? void 0 : data.user)) {
        var _data_error;
        throw new Error((_data_error = data === null || data === void 0 ? void 0 : data.error) !== null && _data_error !== void 0 ? _data_error : "Dev unlock failed.");
    }
    return data.user;
}
function portraitUrl(portraitFileId) {
    if (!portraitFileId) return null;
    return "/api/files/".concat(portraitFileId);
}
function accountPortraitUrl(report) {
    if (!report) return null;
    var _portraitUrl;
    return (_portraitUrl = portraitUrl(report.standardizedPortraitFileId)) !== null && _portraitUrl !== void 0 ? _portraitUrl : portraitUrl(report.portraitFileId);
}
async function ensureStandardizedPortrait(reportId) {
    const res = await fetch("/api/reports/".concat(reportId, "/standardized-portrait"), {
        method: "POST",
        headers: authHeaders()
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok || !(data === null || data === void 0 ? void 0 : data.report)) {
        var _data_error;
        throw new Error((_data_error = data === null || data === void 0 ? void 0 : data.error) !== null && _data_error !== void 0 ? _data_error : "Could not generate standardized portrait.");
    }
    return data.report;
}
async function fetchProfile() {
    const token = getAuthToken();
    if (!token) throw new Error("Sign in required.");
    const res = await fetch("/api/profile", {
        headers: {
            Authorization: "Bearer ".concat(token)
        },
        cache: "no-store"
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok || !(data === null || data === void 0 ? void 0 : data.user)) {
        var _data_error;
        throw new Error((_data_error = data === null || data === void 0 ? void 0 : data.error) !== null && _data_error !== void 0 ? _data_error : "Failed to load profile.");
    }
    var _data_profile, _data_outfitStillCount;
    return {
        user: data.user,
        profile: (_data_profile = data.profile) !== null && _data_profile !== void 0 ? _data_profile : null,
        profileComplete: data.profileComplete === true,
        outfitStillCount: (_data_outfitStillCount = data.outfitStillCount) !== null && _data_outfitStillCount !== void 0 ? _data_outfitStillCount : 0
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
    if (!res.ok || !(data === null || data === void 0 ? void 0 : data.user) || !data.profile) {
        var _data_error;
        throw new Error((_data_error = data === null || data === void 0 ? void 0 : data.error) !== null && _data_error !== void 0 ? _data_error : "Failed to save profile.");
    }
    return {
        user: data.user,
        profile: data.profile
    };
}
async function fetchTargetLookReport(baselineReportId) {
    const token = getAuthToken();
    if (!token) return null;
    const res = await fetch("/api/reports/".concat(baselineReportId, "/target-look"), {
        headers: {
            Authorization: "Bearer ".concat(token)
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
    if (!res.ok || !(data === null || data === void 0 ? void 0 : data.report)) {
        var _data_error;
        throw new Error((_data_error = data === null || data === void 0 ? void 0 : data.error) !== null && _data_error !== void 0 ? _data_error : "Target-look analysis failed.");
    }
    var _data_recommendations;
    return {
        report: data.report,
        recommendations: (_data_recommendations = data.recommendations) !== null && _data_recommendations !== void 0 ? _data_recommendations : []
    };
}
async function fetchOutfitStills(baselineReportId) {
    const token = getAuthToken();
    if (!token) throw new Error("Sign in required.");
    const res = await fetch("/api/outfits?baselineReportId=".concat(encodeURIComponent(baselineReportId)), {
        headers: {
            Authorization: "Bearer ".concat(token)
        },
        cache: "no-store"
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok || !(data === null || data === void 0 ? void 0 : data.user)) {
        var _data_error;
        throw new Error((_data_error = data === null || data === void 0 ? void 0 : data.error) !== null && _data_error !== void 0 ? _data_error : "Failed to load outfits.");
    }
    var _data_stills, _data_cap, _data_used, _data_remaining;
    return {
        stills: (_data_stills = data.stills) !== null && _data_stills !== void 0 ? _data_stills : [],
        cap: (_data_cap = data.cap) !== null && _data_cap !== void 0 ? _data_cap : 1,
        used: (_data_used = data.used) !== null && _data_used !== void 0 ? _data_used : 0,
        remaining: (_data_remaining = data.remaining) !== null && _data_remaining !== void 0 ? _data_remaining : 0,
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
    if (!res.ok || !(data === null || data === void 0 ? void 0 : data.still) || !data.user) {
        var _data_error;
        const err = new Error((_data_error = data === null || data === void 0 ? void 0 : data.error) !== null && _data_error !== void 0 ? _data_error : "Outfit generation failed.");
        err.needsPro = (data === null || data === void 0 ? void 0 : data.needsPro) === true || res.status === 402;
        throw err;
    }
    var _data_recommendation, _data_cap, _data_used, _data_remaining;
    return {
        still: data.still,
        recommendation: (_data_recommendation = data.recommendation) !== null && _data_recommendation !== void 0 ? _data_recommendation : null,
        user: data.user,
        cap: (_data_cap = data.cap) !== null && _data_cap !== void 0 ? _data_cap : 1,
        used: (_data_used = data.used) !== null && _data_used !== void 0 ? _data_used : 0,
        remaining: (_data_remaining = data.remaining) !== null && _data_remaining !== void 0 ? _data_remaining : 0,
        needsPro: data.needsPro
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/site-nav.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/use-auth-user.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthUser",
    ()=>useAuthUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useAuthUser() {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAuthUser.useEffect": ()=>{
            let cancelled = false;
            void (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchMe"])().then({
                "useAuthUser.useEffect": (me)=>{
                    if (!cancelled) setUser(me);
                }
            }["useAuthUser.useEffect"]).finally({
                "useAuthUser.useEffect": ()=>{
                    if (!cancelled) setReady(true);
                }
            }["useAuthUser.useEffect"]);
            return ({
                "useAuthUser.useEffect": ()=>{
                    cancelled = true;
                }
            })["useAuthUser.useEffect"];
        }
    }["useAuthUser.useEffect"], []);
    return {
        user,
        ready,
        isAuthed: Boolean(user)
    };
}
_s(useAuthUser, "+Sxn/2xyjgQ+mofZRrejyh4YHrk=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/site/MobileNavSheet.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MenuToggleButton",
    ()=>MenuToggleButton,
    "MobileNavSheet",
    ()=>MobileNavSheet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function MobileNavSheet(param) {
    let { open, onClose, links, extras } = param;
    _s();
    const titleId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const closeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MobileNavSheet.useEffect": ()=>{
            var _closeRef_current;
            if (!open) return;
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            (_closeRef_current = closeRef.current) === null || _closeRef_current === void 0 ? void 0 : _closeRef_current.focus();
            const onKey = {
                "MobileNavSheet.useEffect.onKey": (e)=>{
                    if (e.key === "Escape") onClose();
                }
            }["MobileNavSheet.useEffect.onKey"];
            window.addEventListener("keydown", onKey);
            return ({
                "MobileNavSheet.useEffect": ()=>{
                    document.body.style.overflow = prev;
                    window.removeEventListener("keydown", onKey);
                }
            })["MobileNavSheet.useEffect"];
        }
    }["MobileNavSheet.useEffect"], [
        open,
        onClose
    ]);
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "nav-sheet fixed inset-0 z-[60] lg:hidden",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": titleId,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "nav-sheet__backdrop absolute inset-0 cursor-pointer border-0 bg-neutral-950/25",
                "aria-label": "Close menu",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/components/site/MobileNavSheet.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "nav-sheet__panel absolute inset-x-3 top-3 bottom-3 flex flex-col overflow-hidden rounded-[1.75rem] border border-white/40 bg-white/55 shadow-[0_24px_80px_rgba(20,12,40,0.18)] backdrop-blur-2xl sm:inset-x-5 sm:top-4 sm:bottom-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-5 pb-2 pt-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                ref: closeRef,
                                type: "button",
                                onClick: onClose,
                                className: "nav-sheet__item flex size-10 cursor-pointer items-center justify-center rounded-full border border-neutral-200/80 bg-white/70 text-neutral-800 transition hover:bg-white",
                                style: {
                                    animationDelay: "60ms"
                                },
                                "aria-label": "Close menu",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CloseIcon, {}, void 0, false, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex flex-1 flex-col justify-center gap-1 px-5 pb-6",
                        children: links.map((link, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: link.href,
                                onClick: onClose,
                                className: "nav-sheet__item rounded-2xl px-3 py-3.5 text-2xl font-semibold tracking-tight text-neutral-950 transition hover:bg-white/50 sm:text-3xl",
                                style: {
                                    animationDelay: "".concat(120 + i * 70, "ms")
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
                    extras && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "nav-sheet__item border-t border-neutral-200/60 px-5 py-5",
                        style: {
                            animationDelay: "".concat(120 + links.length * 70 + 40, "ms")
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
_s(MobileNavSheet, "ql6Lh72VWmhQ+0SX8OkfwcMieNY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]
    ];
});
_c = MobileNavSheet;
function MenuToggleButton(param) {
    let { open, onClick, light } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        "aria-expanded": open,
        "aria-label": open ? "Close menu" : "Open menu",
        className: "relative flex size-10 cursor-pointer items-center justify-center rounded-full border transition lg:hidden ".concat(light ? "border-white/35 bg-white/10 text-white hover:bg-white/20" : "border-neutral-200/80 bg-white/70 text-neutral-900 hover:bg-white"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: open ? "Close" : "Menu"
            }, void 0, false, {
                fileName: "[project]/components/site/MobileNavSheet.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute h-[1.5px] w-4 rounded-full transition duration-300 ".concat(light ? "bg-white" : "bg-neutral-900", " ").concat(open ? "translate-y-0 rotate-45" : "-translate-y-[3.5px]")
            }, void 0, false, {
                fileName: "[project]/components/site/MobileNavSheet.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute h-[1.5px] w-4 rounded-full transition duration-300 ".concat(light ? "bg-white" : "bg-neutral-900", " ").concat(open ? "opacity-0" : "opacity-100")
            }, void 0, false, {
                fileName: "[project]/components/site/MobileNavSheet.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute h-[1.5px] w-4 rounded-full transition duration-300 ".concat(light ? "bg-white" : "bg-neutral-900", " ").concat(open ? "translate-y-0 -rotate-45" : "translate-y-[3.5px]")
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
_c1 = MenuToggleButton;
function CloseIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        className: "size-4",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
_c2 = CloseIcon;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "MobileNavSheet");
__turbopack_context__.k.register(_c1, "MenuToggleButton");
__turbopack_context__.k.register(_c2, "CloseIcon");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$nav$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/site-nav.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/use-auth-user.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$MobileNavSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/site/MobileNavSheet.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function SiteHeader(param) {
    let { variant = "solid" } = param;
    _s();
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [started, setStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { user, isAuthed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthUser"])();
    const links = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$nav$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navForAuth"])(isAuthed);
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
    const isDark = variant === "dark";
    const frosted = isDark ? scrolled ? "border-b border-white/10 bg-[#1a1c20]/85 backdrop-blur-md" : "border-b border-transparent bg-transparent" : variant === "solid" || scrolled ? "border-b border-neutral-200/40 bg-[color-mix(in_srgb,var(--hero-surface)_78%,transparent)] backdrop-blur-sm" : "border-b border-transparent bg-transparent";
    const overlayLight = variant === "overlay" && !scrolled || isDark;
    function signOut() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAuthToken"])(null);
        window.location.href = "/";
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ".concat(frosted),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 sm:px-6 sm:py-5 md:px-10",
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
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[1.25rem] font-semibold tracking-tight sm:text-[1.35rem] ".concat(overlayLight ? "text-white" : "text-neutral-950"),
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "hidden items-center gap-7 text-[0.92rem] lg:flex ".concat(overlayLight ? "text-white/85" : "text-neutral-700"),
                            children: links.map((link, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: link.href,
                                    className: "hero-word transition ".concat(overlayLight ? "hover:text-white" : "hover:text-neutral-950", " ").concat(started ? "is-in" : ""),
                                    style: {
                                        transitionDelay: "".concat(120 + i * 70, "ms")
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2.5 sm:gap-4",
                            children: [
                                isAuthed && (user === null || user === void 0 ? void 0 : user.isPro) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] sm:inline ".concat(overlayLight ? "bg-white/15 text-white" : "bg-neutral-950 text-white"),
                                    children: "Pro"
                                }, void 0, false, {
                                    fileName: "[project]/components/site/SiteHeader.tsx",
                                    lineNumber: 95,
                                    columnNumber: 15
                                }, this) : null,
                                !isAuthed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/contact",
                                    className: "hero-word hidden rounded-lg border px-4 py-2 text-sm font-medium transition lg:inline-flex ".concat(overlayLight ? "border-white/80 text-white hover:bg-white/10" : "border-neutral-900/80 text-neutral-900 hover:bg-white/50", " ").concat(started ? "is-in" : ""),
                                    style: {
                                        transitionDelay: "".concat(120 + links.length * 70 + 40, "ms")
                                    },
                                    children: "Contact Us"
                                }, void 0, false, {
                                    fileName: "[project]/components/site/SiteHeader.tsx",
                                    lineNumber: 107,
                                    columnNumber: 15
                                }, this) : null,
                                isAuthed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/dashboard",
                                    className: "hero-word hidden text-sm font-medium transition sm:inline ".concat(overlayLight ? "text-white/90 hover:text-white" : "text-neutral-800 hover:text-neutral-950", " ").concat(started ? "is-in" : ""),
                                    style: {
                                        transitionDelay: "".concat(120 + links.length * 70 + 110, "ms")
                                    },
                                    children: "Dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/components/site/SiteHeader.tsx",
                                    lineNumber: 123,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    className: "hero-word hidden text-sm font-medium transition sm:inline ".concat(overlayLight ? "text-white/90 hover:text-white" : "text-neutral-800 hover:text-neutral-950", " ").concat(started ? "is-in" : ""),
                                    style: {
                                        transitionDelay: "".concat(120 + links.length * 70 + 110, "ms")
                                    },
                                    children: "Log in"
                                }, void 0, false, {
                                    fileName: "[project]/components/site/SiteHeader.tsx",
                                    lineNumber: 137,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$MobileNavSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuToggleButton"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$MobileNavSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileNavSheet"], {
                open: menuOpen,
                onClose: ()=>setMenuOpen(false),
                links: links,
                extras: isAuthed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/upload",
                            onClick: ()=>setMenuOpen(false),
                            className: "inline-flex w-full items-center justify-center rounded-xl bg-[#ebe4ff] px-5 py-3.5 text-sm font-semibold text-neutral-900",
                            children: "New assessment"
                        }, void 0, false, {
                            fileName: "[project]/components/site/SiteHeader.tsx",
                            lineNumber: 168,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/dashboard",
                                    onClick: ()=>setMenuOpen(false),
                                    className: "inline-flex flex-1 items-center justify-center rounded-xl border border-neutral-900/70 px-4 py-3 text-sm font-medium text-neutral-900",
                                    children: "Dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/components/site/SiteHeader.tsx",
                                    lineNumber: 176,
                                    columnNumber: 17
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/contact",
                            onClick: ()=>setMenuOpen(false),
                            className: "inline-flex flex-1 items-center justify-center rounded-xl border border-neutral-900/70 px-4 py-3 text-sm font-medium text-neutral-900",
                            children: "Contact"
                        }, void 0, false, {
                            fileName: "[project]/components/site/SiteHeader.tsx",
                            lineNumber: 197,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
_s(SiteHeader, "2dmyVFJcrV6Rw4WlRIBl1dQ46l0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthUser"]
    ];
});
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
                lineNumber: 229,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M18.2 14.2 19 16.6 21.4 17.4 19 18.2 18.2 20.6 17.4 18.2 15 17.4 17.4 16.6 18.2 14.2Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/site/SiteHeader.tsx",
                lineNumber: 234,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
_c1 = LogoMark;
var _c, _c1;
__turbopack_context__.k.register(_c, "SiteHeader");
__turbopack_context__.k.register(_c1, "LogoMark");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/appearance-index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    var _features_jawline_definition, _features_face_symmetry, _features_eyebrow_shape;
    const tips = [];
    if (score == null) {
        return [
            "Upload a clearer frontal face photo so structure can be measured."
        ];
    }
    if (((_features_jawline_definition = features.jawline_definition) === null || _features_jawline_definition === void 0 ? void 0 : _features_jawline_definition.score) < 70) {
        tips.push("Lighting from slightly above can sharpen how the jawline reads on camera.");
    }
    if (((_features_face_symmetry = features.face_symmetry) === null || _features_face_symmetry === void 0 ? void 0 : _features_face_symmetry.score) < 70) {
        tips.push("Face the camera square-on — slight turns exaggerate asymmetry in photos.");
    }
    if (((_features_eyebrow_shape = features.eyebrow_shape) === null || _features_eyebrow_shape === void 0 ? void 0 : _features_eyebrow_shape.score) < 70) {
        tips.push("Even brow grooming usually lifts how the upper face reads.");
    }
    if (tips.length === 0) {
        tips.push("Strong structure read — keep framing consistent when you recheck.");
    }
    return tips.slice(0, 3);
}
function groomingTips(features, score) {
    var _features_skin_clarity, _features_skin_clarity1, _features_grooming_signal, _features_grooming_signal1;
    const tips = [];
    if (score == null) {
        return [
            "Grooming needs a clearer face crop — soft front light helps skin + hair reads."
        ];
    }
    if (((_features_skin_clarity = features.skin_clarity) === null || _features_skin_clarity === void 0 ? void 0 : _features_skin_clarity.measurable) === false) {
        tips.push("Skin clarity was hard to read — try even daylight next time.");
    } else if (((_features_skin_clarity1 = features.skin_clarity) === null || _features_skin_clarity1 === void 0 ? void 0 : _features_skin_clarity1.score) < 70) {
        tips.push("A simple consistent skincare routine usually moves this pillar fastest.");
    }
    if (((_features_grooming_signal = features.grooming_signal) === null || _features_grooming_signal === void 0 ? void 0 : _features_grooming_signal.measurable) === false) {
        var _features_grooming_signal2;
        var _features_grooming_signal_gateNote;
        tips.push((_features_grooming_signal_gateNote = (_features_grooming_signal2 = features.grooming_signal) === null || _features_grooming_signal2 === void 0 ? void 0 : _features_grooming_signal2.gateNote) !== null && _features_grooming_signal_gateNote !== void 0 ? _features_grooming_signal_gateNote : "Outfit/hair signal wasn’t clear enough — a mid-chest crop helps.");
    } else if (((_features_grooming_signal1 = features.grooming_signal) === null || _features_grooming_signal1 === void 0 ? void 0 : _features_grooming_signal1.score) < 70) {
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
    var _FAVORITE_COLORS_find, _BOTTOM_PREFERENCES_find, _SILHOUETTE_PREFERENCES_find, _STYLE_VIBES_find, _STYLE_BUDGETS_find;
    const wardrobeLabel = prefs.presentation === "masculine" ? "Men's" : prefs.presentation === "androgynous" ? "Unisex" : "Women's";
    var _FAVORITE_COLORS_find_label;
    const color = (_FAVORITE_COLORS_find_label = (_FAVORITE_COLORS_find = FAVORITE_COLORS.find((c)=>c.id === prefs.favoriteColor)) === null || _FAVORITE_COLORS_find === void 0 ? void 0 : _FAVORITE_COLORS_find.label) !== null && _FAVORITE_COLORS_find_label !== void 0 ? _FAVORITE_COLORS_find_label : prefs.favoriteColor;
    var _BOTTOM_PREFERENCES_find_label;
    const bottom = (_BOTTOM_PREFERENCES_find_label = (_BOTTOM_PREFERENCES_find = BOTTOM_PREFERENCES.find((b)=>b.id === prefs.bottomPreference)) === null || _BOTTOM_PREFERENCES_find === void 0 ? void 0 : _BOTTOM_PREFERENCES_find.label) !== null && _BOTTOM_PREFERENCES_find_label !== void 0 ? _BOTTOM_PREFERENCES_find_label : prefs.bottomPreference;
    var _SILHOUETTE_PREFERENCES_find_label;
    const sil = (_SILHOUETTE_PREFERENCES_find_label = (_SILHOUETTE_PREFERENCES_find = SILHOUETTE_PREFERENCES.find((s)=>s.id === prefs.silhouette)) === null || _SILHOUETTE_PREFERENCES_find === void 0 ? void 0 : _SILHOUETTE_PREFERENCES_find.label) !== null && _SILHOUETTE_PREFERENCES_find_label !== void 0 ? _SILHOUETTE_PREFERENCES_find_label : prefs.silhouette;
    var _STYLE_VIBES_find_label;
    const vibe = (_STYLE_VIBES_find_label = (_STYLE_VIBES_find = STYLE_VIBES.find((v)=>v.id === prefs.vibe)) === null || _STYLE_VIBES_find === void 0 ? void 0 : _STYLE_VIBES_find.label) !== null && _STYLE_VIBES_find_label !== void 0 ? _STYLE_VIBES_find_label : prefs.vibe;
    var _STYLE_BUDGETS_find_label;
    const budget = (_STYLE_BUDGETS_find_label = (_STYLE_BUDGETS_find = STYLE_BUDGETS.find((b)=>b.id === prefs.budget)) === null || _STYLE_BUDGETS_find === void 0 ? void 0 : _STYLE_BUDGETS_find.label) !== null && _STYLE_BUDGETS_find_label !== void 0 ? _STYLE_BUDGETS_find_label : prefs.budget;
    return {
        preferences: prefs,
        detectedSignals: [],
        summary: "".concat(wardrobeLabel, " wardrobe — you lean ").concat(vibe.toLowerCase(), " with a ").concat(sil.toLowerCase(), " silhouette, favoring ").concat(bottom.toLowerCase(), " and ").concat(color.toLowerCase(), " tones — ").concat(budget.toLowerCase(), " spend."),
        estimateNote: "Full-body measurements and outfit vision signals will refine this profile — preferences below are from your answers."
    };
}
const STAGE_LABELS = {
    face_reveal: "Celebrity match",
    style_collect: "Style preferences",
    style_reveal: "Style Profile",
    prescription_reveal: "Inspired looks",
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
        label: "Celebrity match",
        shortLabel: "Match"
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
        label: "Inspired looks",
        shortLabel: "Looks"
    }
];
function journeyStepIndex(step) {
    if (step === "complete") return JOURNEY_FLOW_STEPS.length;
    return JOURNEY_FLOW_STEPS.findIndex((s)=>s.id === step);
}
function journeyProgressPercent(current) {
    let withinStep = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/celebrity-match.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Celebrity style match — stable, deterministic ranking for the product pivot.
 * Facial scoring UI is parked; this becomes the primary home experience.
 */ __turbopack_context__.s([
    "CELEBRITY_CATALOG",
    ()=>CELEBRITY_CATALOG,
    "buildCelebrityMatchBundle",
    ()=>buildCelebrityMatchBundle,
    "featureNotesFor",
    ()=>featureNotesFor,
    "getCelebrityById",
    ()=>getCelebrityById,
    "inspiredLooksFor",
    ()=>inspiredLooksFor,
    "matchSeedForReport",
    ()=>matchSeedForReport,
    "persistCelebritySelection",
    ()=>persistCelebritySelection,
    "personalityFor",
    ()=>personalityFor,
    "rankCelebrityMatches",
    ()=>rankCelebrityMatches
]);
const CELEBRITY_CATALOG = [
    {
        id: "zendaya",
        name: "Zendaya",
        vibe: "High-contrast glam with clean structure",
        tags: [
            "bold",
            "structured",
            "red-carpet"
        ],
        imageSrc: "/celebrities/zendaya.jpg",
        palette: [
            "#0f0f0f",
            "#c4a484",
            "#f5f0ea",
            "#8b1e3f"
        ],
        hairNote: "Sleek parting or soft waves that keep the face open",
        outfitNotes: [
            "Column dresses and sharp tailoring",
            "High-contrast neutrals with one deep accent"
        ]
    },
    {
        id: "emma-stone",
        name: "Emma Stone",
        vibe: "Soft polish with warm, approachable ease",
        tags: [
            "soft",
            "approachable",
            "classic"
        ],
        imageSrc: "/celebrities/emma-stone.jpg",
        palette: [
            "#f2e6d8",
            "#b56b4a",
            "#2c3e50",
            "#e8d5c4"
        ],
        hairNote: "Loose waves or a soft side part",
        outfitNotes: [
            "Fluid midi dresses and soft knits",
            "Warm neutrals and peachy accents"
        ]
    },
    {
        id: "rihanna",
        name: "Rihanna",
        vibe: "Bold silhouette and high-impact color",
        tags: [
            "bold",
            "high-contrast",
            "fashion-forward"
        ],
        imageSrc: "/celebrities/rihanna.jpg",
        palette: [
            "#111111",
            "#f5f5f5",
            "#c41e3a",
            "#d4af37"
        ],
        hairNote: "Statement shape or sleek pulled-back finish",
        outfitNotes: [
            "Architectural cuts and strong shoulders",
            "Black/white base with a saturated pop"
        ]
    },
    {
        id: "blake-lively",
        name: "Blake Lively",
        vibe: "Romantic volume with polished everyday glam",
        tags: [
            "romantic",
            "polished",
            "feminine"
        ],
        imageSrc: "/celebrities/blake-lively.jpg",
        palette: [
            "#1a2744",
            "#c9a66b",
            "#f7efe6",
            "#5c4033"
        ],
        hairNote: "Full waves and face-framing length",
        outfitNotes: [
            "Fitted waists with flowing skirts",
            "Navy, camel, and soft metallics"
        ]
    },
    {
        id: "zendaya-street",
        name: "Ayo Edebiri",
        vibe: "Clean and structured with quiet wit",
        tags: [
            "clean",
            "structured",
            "smart"
        ],
        imageSrc: "/celebrities/ayo-edebiri.jpg",
        palette: [
            "#1c1c1c",
            "#ece7df",
            "#6b7c8a",
            "#8b5a2b"
        ],
        hairNote: "Neat texture that stays intentional",
        outfitNotes: [
            "Tailored trousers and crisp layers",
            "Muted earth tones and soft contrast"
        ]
    },
    {
        id: "sydney-sweeney",
        name: "Sydney Sweeney",
        vibe: "Soft glam with classic Hollywood ease",
        tags: [
            "soft",
            "glam",
            "classic"
        ],
        imageSrc: "/celebrities/sydney-sweeney.jpg",
        palette: [
            "#f4ebe3",
            "#2b2b2b",
            "#9c6b4a",
            "#d8c3b0"
        ],
        hairNote: "Soft volume and a gentle face frame",
        outfitNotes: [
            "Figure-skimming knits and clean denim",
            "Cream, chocolate, and soft rose"
        ]
    },
    {
        id: "jennifer-lawrence",
        name: "Jennifer Lawrence",
        vibe: "Effortless ease with athletic polish",
        tags: [
            "casual",
            "effortless",
            "sporty-chic"
        ],
        imageSrc: "/celebrities/jennifer-lawrence.jpg",
        palette: [
            "#2f2f2f",
            "#d9d2c5",
            "#5a6b5d",
            "#a67c52"
        ],
        hairNote: "Low-effort texture, off the face for day",
        outfitNotes: [
            "Relaxed blazers over simple tees",
            "Olive, sand, and soft charcoal"
        ]
    },
    {
        id: "lupita",
        name: "Lupita Nyong'o",
        vibe: "Sculptural color and refined drama",
        tags: [
            "bold",
            "color",
            "sculptural"
        ],
        imageSrc: "/celebrities/lupita.jpg",
        palette: [
            "#0d1b2a",
            "#e76f51",
            "#f4f1de",
            "#2a9d8f"
        ],
        hairNote: "Shape-forward styles that read intentional",
        outfitNotes: [
            "Clean silhouettes with saturated color",
            "Jewel tones against soft neutrals"
        ]
    }
];
const STORAGE_KEY = "zelko-celebrity-match-v1";
function fnv1a(input) {
    let h = 2166136261;
    for(let i = 0; i < input.length; i++){
        h ^= input.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}
function mulberry32(seed) {
    return function next() {
        let t = seed += 0x6d2b79f5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
function matchSeedForReport(report) {
    var _report_standardizedPortraitFileId, _report_portraitFileId;
    return [
        report.id,
        (_report_standardizedPortraitFileId = report.standardizedPortraitFileId) !== null && _report_standardizedPortraitFileId !== void 0 ? _report_standardizedPortraitFileId : "",
        (_report_portraitFileId = report.portraitFileId) !== null && _report_portraitFileId !== void 0 ? _report_portraitFileId : ""
    ].join(":");
}
function loadPersisted(seed) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return {
            selectedId: null,
            priorTop: null
        };
        const all = JSON.parse(raw);
        const entry = all[seed];
        var _entry_selectedId, _entry_priorTop;
        return {
            selectedId: (_entry_selectedId = entry === null || entry === void 0 ? void 0 : entry.selectedId) !== null && _entry_selectedId !== void 0 ? _entry_selectedId : null,
            priorTop: (_entry_priorTop = entry === null || entry === void 0 ? void 0 : entry.priorTop) !== null && _entry_priorTop !== void 0 ? _entry_priorTop : null
        };
    } catch (e) {
        return {
            selectedId: null,
            priorTop: null
        };
    }
}
function persistCelebritySelection(seed, selectedId, priorTop) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const all = raw ? JSON.parse(raw) : {};
        all[seed] = {
            selectedId,
            priorTop
        };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch (e) {
    /* ignore quota */ }
}
function rankCelebrityMatches(seed) {
    const rand = mulberry32(fnv1a(seed));
    const scored = CELEBRITY_CATALOG.map((celebrity)=>{
        const base = 48 + rand() * 12;
        const jitter = fnv1a("".concat(seed, ":").concat(celebrity.id)) % 500 / 100;
        return {
            celebrity,
            percent: Math.round(Math.min(60, Math.max(38, base - jitter))),
            reason: celebrity.vibe
        };
    });
    return scored.sort((a, b)=>b.percent - a.percent).slice(0, 3);
}
function inspiredLooksFor(celebrity, seed) {
    const rand = mulberry32(fnv1a("".concat(seed, ":looks:").concat(celebrity.id)));
    var _celebrity_outfitNotes_, _celebrity_outfitNotes_1;
    const bases = [
        {
            id: "".concat(celebrity.id, "-soft-chic"),
            title: "Soft Chic",
            vibe: celebrity.vibe,
            outfit: (_celebrity_outfitNotes_ = celebrity.outfitNotes[0]) !== null && _celebrity_outfitNotes_ !== void 0 ? _celebrity_outfitNotes_ : "Clean separates with a soft top",
            hair: "Effortless waves",
            palette: celebrity.palette.slice(0, 3),
            wearability: "Neutral tones that still feel finished.",
            imageSrc: "/woman1.png",
            shareLabel: "Inspired soft chic look",
            keywords: [
                "Soft tones",
                "Effortless hair",
                "Feminine elegance"
            ]
        },
        {
            id: "".concat(celebrity.id, "-modern-romantic"),
            title: "Modern Romantic",
            vibe: "Romantic take on the same anchor",
            outfit: (_celebrity_outfitNotes_1 = celebrity.outfitNotes[1]) !== null && _celebrity_outfitNotes_1 !== void 0 ? _celebrity_outfitNotes_1 : "Soft denim, a good knit, and a structured bag",
            hair: "Soft face-framing texture",
            palette: [
                ...celebrity.palette
            ].reverse().slice(0, 3),
            wearability: "Blush and satin energy, still wearable.",
            imageSrc: "/woman2.png",
            shareLabel: "Inspired modern romantic look",
            keywords: [
                "Blush tones",
                "Soft volume",
                "Romantic polish"
            ]
        },
        {
            id: "".concat(celebrity.id, "-polished-minimal"),
            title: "Polished Minimal",
            vibe: "Same silhouette language, cleaner finish",
            outfit: "One decisive piece — dress or tailored set — in a lead palette color",
            hair: celebrity.hairNote,
            palette: celebrity.palette,
            wearability: "Sharp neutrals with quiet confidence.",
            imageSrc: "/woman3.png",
            shareLabel: "Inspired polished minimal look",
            keywords: [
                "Clean lines",
                "Quiet contrast",
                "Timeless polish"
            ]
        }
    ];
    const order = bases.map((look, i)=>({
            look,
            w: rand() + i * 0.01
        })).sort((a, b)=>a.w - b.w).map((x)=>x.look);
    return order.slice(0, 3);
}
function personalityFor(celebrity, seed) {
    const options = [
        {
            id: "clean-structured",
            label: "Clean and structured",
            note: "Your photos read intentional and composed — tailoring and clear lines will feel natural."
        },
        {
            id: "soft-approachable",
            label: "Soft and approachable",
            note: "Warm, easy presentation — fluid fabrics and gentle contrast suit you."
        },
        {
            id: "bold-contrast",
            label: "Bold and high-contrast",
            note: "Strong presence in frame — lean into decisive color and silhouette."
        }
    ];
    const idx = fnv1a("".concat(seed, ":persona:").concat(celebrity.id)) % options.length;
    if (celebrity.tags.includes("bold")) return options[2];
    if (celebrity.tags.includes("soft") || celebrity.tags.includes("approachable")) return options[1];
    if (celebrity.tags.includes("structured") || celebrity.tags.includes("clean")) return options[0];
    return options[idx];
}
function featureNotesFor(seed) {
    const pool = [
        {
            key: "eyes",
            label: "Eyes",
            note: "Eye shape reads clearly in frame — soft emphasis along the outer corner keeps focus here."
        },
        {
            key: "brows",
            label: "Brows",
            note: "Brow line frames the upper face cleanly; a light tidy edge is usually enough."
        },
        {
            key: "nose",
            label: "Nose",
            note: "Bridge and tip read in balance with the mid-face in these photos.",
            structural: true
        },
        {
            key: "lips",
            label: "Lips",
            note: "Lip shape supports soft or defined finishes — match product intensity to the look."
        },
        {
            key: "face_shape",
            label: "Face shape",
            note: "Overall silhouette gives a clear frame for necklines and hair length.",
            structural: true
        },
        {
            key: "hair",
            label: "Hair",
            note: "Hair framing that keeps the forehead and temples open helps your lead features stay visible."
        }
    ];
    const start = fnv1a("".concat(seed, ":features")) % pool.length;
    return [
        0,
        1,
        2,
        3,
        4,
        5
    ].map((i)=>pool[(start + i) % pool.length]);
}
function buildCelebrityMatchBundle(report, selectedIdOverride) {
    var _matches_;
    const seed = matchSeedForReport(report);
    const matches = rankCelebrityMatches(seed);
    const persisted = loadPersisted(seed);
    const selectedId = selectedIdOverride || persisted.selectedId || ((_matches_ = matches[0]) === null || _matches_ === void 0 ? void 0 : _matches_.celebrity.id) || CELEBRITY_CATALOG[0].id;
    const selected = CELEBRITY_CATALOG.find((c)=>c.id === selectedId) || matches[0].celebrity;
    const topIds = matches.map((m)=>m.celebrity.id);
    let updatedNote = null;
    if (persisted.priorTop && persisted.priorTop.length > 0 && persisted.priorTop[0] !== topIds[0]) {
        updatedNote = "Match updated slightly based on new photos.";
    } else if (persisted.priorTop && persisted.priorTop.join(",") !== topIds.join(",")) {
        updatedNote = "Match order shifted slightly — your anchor can stay the same.";
    }
    return {
        seed,
        matches,
        selectedId: selected.id,
        inspiredLooks: inspiredLooksFor(selected, seed),
        personality: personalityFor(selected, seed),
        featureNotes: featureNotesFor(seed),
        updatedNote
    };
}
function getCelebrityById(id) {
    return CELEBRITY_CATALOG.find((c)=>c.id === id);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/appearance/ShareMatchCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShareMatchCard",
    ()=>ShareMatchCard,
    "StyleMatchResultCard",
    ()=>StyleMatchResultCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function LeafMark(param) {
    let { className } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 64 80",
        "aria-hidden": "true",
        fill: "none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M32 4C18 18 10 34 12 52c1.5 12 10 22 20 24 10-2 18.5-12 20-24 2-18-6-34-20-48Z",
                fill: "currentColor",
                opacity: "0.55"
            }, void 0, false, {
                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M32 10c-1 14-1 28 0 50",
                stroke: "currentColor",
                strokeWidth: "1.4",
                strokeLinecap: "round",
                opacity: "0.7"
            }, void 0, false, {
                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M32 28c-6 4-10 10-12 16M32 40c6 3 10 8 12 14",
                stroke: "currentColor",
                strokeWidth: "1.1",
                strokeLinecap: "round",
                opacity: "0.55"
            }, void 0, false, {
                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = LeafMark;
function Sparkle(param) {
    let { className } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 24 24",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 2l1.35 6.2L20 12l-6.65 1.8L12 22l-1.35-8.2L4 12l6.65-1.8L12 2z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/appearance/ShareMatchCard.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c1 = Sparkle;
function Heart(param) {
    let { className } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 24 24",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 20.4S4.5 15.7 4.5 10.2A3.9 3.9 0 0 1 12 7.2a3.9 3.9 0 0 1 7.5 3C19.5 15.7 12 20.4 12 20.4z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/appearance/ShareMatchCard.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_c2 = Heart;
function Crown(param) {
    let { className } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 24 16",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M2.5 13.5 5 5.5l3.5 4L12 3.5l3.5 6 3.5-4 2.5 8H2.5Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/appearance/ShareMatchCard.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_c3 = Crown;
function StyleMatchResultCard(param) {
    let { userSrc, celebrity, percent, shareLabel = "Inspired soft chic look", keywords = [
        "Soft tones",
        "Effortless hair",
        "Feminine elegance"
    ], className } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: [
            "celeb-share__card",
            className
        ].filter(Boolean).join(" "),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LeafMark, {
                className: "celeb-share__corner celeb-share__corner--tl"
            }, void 0, false, {
                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LeafMark, {
                className: "celeb-share__corner celeb-share__corner--tr"
            }, void 0, false, {
                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LeafMark, {
                className: "celeb-share__corner celeb-share__corner--bl"
            }, void 0, false, {
                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LeafMark, {
                className: "celeb-share__corner celeb-share__corner--br"
            }, void 0, false, {
                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "celeb-share__top",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Heart, {
                        className: "celeb-share__heart"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "Your Style Match"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "celeb-share__eyebrow",
                        children: "Celebrity beauty style result"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "celeb-share__divider",
                        "aria-hidden": "true",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sparkle, {
                                className: "celeb-share__sparkle"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "celeb-share__faces",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "celeb-share__frame",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: userSrc,
                            alt: "You",
                            className: "celeb-share__you"
                        }, void 0, false, {
                            fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                            lineNumber: 112,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "celeb-share__badge",
                        "aria-label": "".concat(percent, " percent style match"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "celeb-share__rays",
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "celeb-share__badge-inner",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Style"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                                        lineNumber: 121,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: [
                                            percent,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                        children: "Match"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                                        lineNumber: 123,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Heart, {
                                        className: "celeb-share__badge-heart"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                                        lineNumber: 124,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "celeb-share__frame celeb-share__frame--celeb",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: celebrity.imageSrc,
                                alt: "".concat(celebrity.name, " pencil sketch"),
                                className: "celeb-share__celeb"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "celeb-share__celeb-tag",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Crown, {
                                        className: "celeb-share__crown"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, this),
                                    celebrity.name
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "celeb-share__footer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "celeb-share__script",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LeafMark, {
                                className: "celeb-share__script-leaf"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: shareLabel
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "celeb-share__keywords",
                        children: keywords.join(" • ")
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "celeb-share__divider celeb-share__divider--heart",
                        "aria-hidden": "true",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Heart, {
                                className: "celeb-share__sparkle"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "celeb-share__pill",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sparkle, {
                                className: "celeb-share__pill-sparkle"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this),
                            "Your beauty. Your style. Perfectly you.",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sparkle, {
                                className: "celeb-share__pill-sparkle"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "celeb-share__brand",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LeafMark, {
                                className: "celeb-share__brand-leaf"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this),
                            "Beauty Style App",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LeafMark, {
                                className: "celeb-share__brand-leaf celeb-share__brand-leaf--flip"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, this);
}
_c4 = StyleMatchResultCard;
function ShareMatchCard(param) {
    let { userSrc, celebrity, percent, lookLine, shareLabel = "Inspired soft chic look", keywords = [
        "Soft tones",
        "Effortless hair",
        "Feminine elegance"
    ], showShareButton = true } = param;
    _s();
    const cardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    async function shareOrCopy() {
        const text = "I'm a ".concat(percent, "% style match with ").concat(celebrity.name, " — ").concat(shareLabel, ". ").concat(lookLine);
        try {
            if (navigator.share) {
                await navigator.share({
                    title: "My style match",
                    text
                });
                return;
            }
        } catch (e) {
        /* fall through to clipboard */ }
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            window.setTimeout(()=>setCopied(false), 2000);
        } catch (e) {
        /* ignore */ }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "celeb-share",
        ref: cardRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StyleMatchResultCard, {
                userSrc: userSrc,
                celebrity: celebrity,
                percent: percent,
                lookLine: lookLine,
                shareLabel: shareLabel,
                keywords: keywords
            }, void 0, false, {
                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this),
            showShareButton ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "celeb-match__btn celeb-match__btn--ghost",
                onClick: ()=>void shareOrCopy(),
                children: copied ? "Copied" : "Share / copy card"
            }, void 0, false, {
                fileName: "[project]/components/appearance/ShareMatchCard.tsx",
                lineNumber: 216,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/ShareMatchCard.tsx",
        lineNumber: 206,
        columnNumber: 5
    }, this);
}
_s(ShareMatchCard, "eNaXTK4qVqsgVEcUQI9vHa4LkfE=");
_c5 = ShareMatchCard;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "LeafMark");
__turbopack_context__.k.register(_c1, "Sparkle");
__turbopack_context__.k.register(_c2, "Heart");
__turbopack_context__.k.register(_c3, "Crown");
__turbopack_context__.k.register(_c4, "StyleMatchResultCard");
__turbopack_context__.k.register(_c5, "ShareMatchCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/appearance/CelebrityMatchStage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CelebrityMatchStage",
    ()=>CelebrityMatchStage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$celebrity$2d$match$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/celebrity-match.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$ShareMatchCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/ShareMatchCard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function CelebrityMatchStage(param) {
    let { report, fullProfileUnlocked = false, onContinue, continueLabel = "Continue to style preferences", onRecalculate } = param;
    var _bundle_matches_find, _bundle_matches_find1, _bundle_matches_;
    _s();
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pickerOpen, setPickerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const bundle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CelebrityMatchStage.useMemo[bundle]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$celebrity$2d$match$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildCelebrityMatchBundle"])(report, selectedId)
    }["CelebrityMatchStage.useMemo[bundle]"], [
        report,
        selectedId
    ]);
    const selected = ((_bundle_matches_find = bundle.matches.find((m)=>m.celebrity.id === bundle.selectedId)) === null || _bundle_matches_find === void 0 ? void 0 : _bundle_matches_find.celebrity) || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$celebrity$2d$match$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CELEBRITY_CATALOG"].find((c)=>c.id === bundle.selectedId) || bundle.matches[0].celebrity;
    var _bundle_matches_find_percent, _ref;
    const selectedPercent = (_ref = (_bundle_matches_find_percent = (_bundle_matches_find1 = bundle.matches.find((m)=>m.celebrity.id === selected.id)) === null || _bundle_matches_find1 === void 0 ? void 0 : _bundle_matches_find1.percent) !== null && _bundle_matches_find_percent !== void 0 ? _bundle_matches_find_percent : (_bundle_matches_ = bundle.matches[0]) === null || _bundle_matches_ === void 0 ? void 0 : _bundle_matches_.percent) !== null && _ref !== void 0 ? _ref : 52;
    const leadLook = bundle.inspiredLooks[0];
    var _leadLook_shareLabel;
    const shareLabel = (_leadLook_shareLabel = leadLook === null || leadLook === void 0 ? void 0 : leadLook.shareLabel) !== null && _leadLook_shareLabel !== void 0 ? _leadLook_shareLabel : "Inspired soft chic look";
    var _leadLook_keywords;
    const keywords = (_leadLook_keywords = leadLook === null || leadLook === void 0 ? void 0 : leadLook.keywords) !== null && _leadLook_keywords !== void 0 ? _leadLook_keywords : [
        "Soft tones",
        "Effortless hair",
        "Feminine elegance"
    ];
    var _leadLook_outfit;
    const lookLine = (_leadLook_outfit = leadLook === null || leadLook === void 0 ? void 0 : leadLook.outfit) !== null && _leadLook_outfit !== void 0 ? _leadLook_outfit : selected.outfitNotes[0];
    const filtered = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$celebrity$2d$match$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CELEBRITY_CATALOG"].filter((c)=>{
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return c.name.toLowerCase().includes(q) || c.tags.some((t)=>t.includes(q)) || c.vibe.toLowerCase().includes(q);
    });
    function chooseCelebrity(c) {
        setSelectedId(c.id);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$celebrity$2d$match$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persistCelebritySelection"])(bundle.seed, c.id, bundle.matches.map((m)=>m.celebrity.id));
        setPickerOpen(false);
    }
    async function shareOrCopy() {
        const text = "I'm a ".concat(selectedPercent, "% style match with ").concat(selected.name, " — ").concat(shareLabel, ". ").concat(lookLine);
        try {
            if (navigator.share) {
                await navigator.share({
                    title: "My style match",
                    text
                });
                return;
            }
        } catch (e) {
        /* fall through to clipboard */ }
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            window.setTimeout(()=>setCopied(false), 2000);
        } catch (e) {
        /* ignore */ }
    }
    const portraitSrc = report.portraitFileId ? "/api/files/".concat(report.portraitFileId) : "/woman1.png";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "ai-reveal celeb-match",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "celeb-match__brand",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "celeb-match__brand-mark",
                        children: "Lumière"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "celeb-match__brand-sub",
                        children: "Beauty Match"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            bundle.updatedNote ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "celeb-match__update",
                children: bundle.updatedNote
            }, void 0, false, {
                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "celeb-match__hero",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$ShareMatchCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StyleMatchResultCard"], {
                        className: "celeb-match__result-card",
                        userSrc: portraitSrc,
                        celebrity: selected,
                        percent: selectedPercent,
                        lookLine: lookLine,
                        shareLabel: shareLabel,
                        keywords: keywords
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "celeb-match__hero-copy",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "celeb-match__hero-vibe",
                                children: selected.vibe
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "celeb-match__hero-actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "celeb-match__btn celeb-match__btn--ghost",
                                        onClick: ()=>setPickerOpen((v)=>!v),
                                        children: "Choose a different celebrity"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                        lineNumber: 128,
                                        columnNumber: 13
                                    }, this),
                                    onRecalculate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "celeb-match__btn celeb-match__btn--ghost",
                                        onClick: onRecalculate,
                                        children: "Recalculate"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                        lineNumber: 136,
                                        columnNumber: 15
                                    }, this) : null,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "celeb-match__btn celeb-match__btn--ghost",
                                        onClick: ()=>void shareOrCopy(),
                                        children: copied ? "Copied" : "Share / copy card"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "celeb-match__divider",
                "aria-hidden": "true",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        viewBox: "0 0 24 24",
                        width: "14",
                        height: "14",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M12 2l1.4 6.1L20 12l-6.6 1.9L12 22l-1.4-8.1L4 12l6.6-1.9L12 2z",
                            fill: "currentColor"
                        }, void 0, false, {
                            fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "celeb-match__rank",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "celeb-match__label",
                        children: "Top 3 pairings"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        children: bundle.matches.map((m, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: m.celebrity.id === selected.id ? "is-selected" : undefined,
                                    onClick: ()=>chooseCelebrity(m.celebrity),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "celeb-match__rank-index",
                                            children: index + 1
                                        }, void 0, false, {
                                            fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                            lineNumber: 178,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: m.celebrity.imageSrc,
                                            alt: "",
                                            className: "celeb-match__rank-sketch"
                                        }, void 0, false, {
                                            fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                            lineNumber: 180,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "celeb-match__rank-copy",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: m.celebrity.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                    children: m.celebrity.vibe
                                                }, void 0, false, {
                                                    fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                            lineNumber: 185,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: [
                                                m.percent,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                            lineNumber: 189,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                    lineNumber: 171,
                                    columnNumber: 15
                                }, this)
                            }, m.celebrity.id, false, {
                                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                lineNumber: 170,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this),
            pickerOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "celeb-match__picker",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "celeb-match__picker-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "celeb-match__label",
                                children: "Search or pick a style anchor"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                lineNumber: 199,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "search",
                                value: query,
                                onChange: (e)=>setQuery(e.target.value),
                                placeholder: "Search celebrities…",
                                "aria-label": "Search celebrities"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                lineNumber: 200,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 198,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "celeb-match__picker-list",
                        children: filtered.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>chooseCelebrity(c),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: c.imageSrc,
                                            alt: ""
                                        }, void 0, false, {
                                            fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                            lineNumber: 213,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: c.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                    children: c.vibe
                                                }, void 0, false, {
                                                    fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                                    lineNumber: 216,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                            lineNumber: 214,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                    lineNumber: 211,
                                    columnNumber: 17
                                }, this)
                            }, c.id, false, {
                                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                lineNumber: 210,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 208,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                lineNumber: 197,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "celeb-match__looks",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "celeb-match__looks-intro",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "celeb-match__label",
                                children: "Inspired looks"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                lineNumber: 227,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: [
                                    "Wearable directions from ",
                                    selected.name
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                lineNumber: 228,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "celeb-match__look-grid",
                        children: bundle.inspiredLooks.map((look)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: "celeb-match__look",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "celeb-match__look-media",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: look.imageSrc,
                                                alt: ""
                                            }, void 0, false, {
                                                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                                lineNumber: 235,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: selected.imageSrc,
                                                alt: "",
                                                className: "celeb-match__look-thumb"
                                            }, void 0, false, {
                                                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                                lineNumber: 237,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                        lineNumber: 233,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        children: look.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                        lineNumber: 243,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: look.hair
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                        lineNumber: 244,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "celeb-match__look-wear",
                                        children: look.wearability
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                        lineNumber: 245,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, look.id, true, {
                                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                lineNumber: 232,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, this),
            fullProfileUnlocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "celeb-match__profile",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "celeb-match__label",
                        children: "Full appearance profile"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 253,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: bundle.personality.label
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 254,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: bundle.personality.note
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 255,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "celeb-match__features",
                        children: bundle.featureNotes.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: f.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                        lineNumber: 259,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: f.note
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                        lineNumber: 260,
                                        columnNumber: 17
                                    }, this),
                                    f.structural ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                        children: "Typically structural / surgical — seek professional advice."
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                        lineNumber: 262,
                                        columnNumber: 19
                                    }, this) : null
                                ]
                            }, f.key, true, {
                                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                                lineNumber: 258,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 256,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                lineNumber: 252,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "celeb-match__gate",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "celeb-match__label",
                        children: "Full appearance profile"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 272,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "Unlock with 4 photos"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 273,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Add 2 head-to-toe full-body photos and 2 half-body / upper-body photos to unlock light feature notes, personality-style match, and richer fit context."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 274,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                lineNumber: 271,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "celeb-match__cta",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "celeb-match__btn",
                        onClick: ()=>{
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$celebrity$2d$match$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persistCelebritySelection"])(bundle.seed, selected.id, bundle.matches.map((m)=>m.celebrity.id));
                            onContinue();
                        },
                        children: continueLabel
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 283,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "celeb-match__note",
                        children: "Next: a few taste preferences so inspired looks stay personal."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                        lineNumber: 297,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
                lineNumber: 282,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/CelebrityMatchStage.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_s(CelebrityMatchStage, "wQxnLgMUse3JTkZZn5joEloQh7M=");
_c = CelebrityMatchStage;
var _c;
__turbopack_context__.k.register(_c, "CelebrityMatchStage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/appearance/StyleIllustrations.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function DressIllustration(param) {
    let { className = "" } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 80 96",
        fill: "none",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M28 14c0-6 5-10 12-10s12 4 12 10v6l8 4-4 14h-32l-4-14 8-4v-6z",
                fill: "currentColor",
                opacity: "0.85"
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleIllustrations.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M24 38h32l10 48H14L24 38z",
                fill: "currentColor",
                opacity: "0.55"
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleIllustrations.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
_c = DressIllustration;
function JeansIllustration(param) {
    let { className = "" } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 80 96",
        fill: "none",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M26 18h28v10l4 4v54H42V52h-4v34H22V32l4-4V18z",
                fill: "currentColor",
                opacity: "0.7"
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleIllustrations.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M30 28h20",
                stroke: "currentColor",
                strokeWidth: "2",
                opacity: "0.4"
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleIllustrations.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M40 32v20",
                stroke: "currentColor",
                strokeWidth: "2",
                opacity: "0.35"
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleIllustrations.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
_c1 = JeansIllustration;
function SkirtIllustration(param) {
    let { className = "" } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 80 96",
        fill: "none",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M30 18h20v16H30z",
                fill: "currentColor",
                opacity: "0.75"
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleIllustrations.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
_c2 = SkirtIllustration;
function TrousersIllustration(param) {
    let { className = "" } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 80 96",
        fill: "none",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
_c3 = TrousersIllustration;
function SilhouetteIllustration(param) {
    let { variant, className = "" } = param;
    const width = variant === "fitted" ? 22 : variant === "relaxed" ? 30 : 40;
    const x = 40 - width / 2;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 80 96",
        fill: "none",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
_c4 = SilhouetteIllustration;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "DressIllustration");
__turbopack_context__.k.register(_c1, "JeansIllustration");
__turbopack_context__.k.register(_c2, "SkirtIllustration");
__turbopack_context__.k.register(_c3, "TrousersIllustration");
__turbopack_context__.k.register(_c4, "SilhouetteIllustration");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/appearance/StylePrefsForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StylePrefsForm",
    ()=>StylePrefsForm,
    "stylePrefsComplete",
    ()=>stylePrefsComplete
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/appearance-index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleIllustrations$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/StyleIllustrations.tsx [app-client] (ecmascript)");
"use client";
;
;
;
function bottomArt(id) {
    const cls = "h-16 w-14 text-current";
    switch(id){
        case "dresses":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleIllustrations$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DressIllustration"], {
                className: cls
            }, void 0, false, {
                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                lineNumber: 35,
                columnNumber: 14
            }, this);
        case "jeans":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleIllustrations$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JeansIllustration"], {
                className: cls
            }, void 0, false, {
                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                lineNumber: 37,
                columnNumber: 14
            }, this);
        case "skirts":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleIllustrations$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkirtIllustration"], {
                className: cls
            }, void 0, false, {
                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                lineNumber: 39,
                columnNumber: 14
            }, this);
        case "trousers":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleIllustrations$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrousersIllustration"], {
                className: cls
            }, void 0, false, {
                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                lineNumber: 41,
                columnNumber: 14
            }, this);
    }
}
function StylePrefsForm(param) {
    let { value, onChange } = param;
    const bottomOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bottomsForPresentation"])(value.presentation);
    function setPresentation(presentation) {
        const allowed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bottomsForPresentation"])(presentation).map((b)=>b.id);
        const bottomOk = value.bottomPreference && allowed.includes(value.bottomPreference);
        onChange({
            ...value,
            presentation,
            bottomPreference: bottomOk ? value.bottomPreference : undefined
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "style-prefs",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                className: "style-prefs__block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                        className: "style-prefs__legend",
                        children: "Who are we dressing?"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "style-prefs__hint",
                        children: "This picks men’s or women’s clothing for your prescribed look and shop links."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "style-prefs__chips",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLOTHING_PRESENTATIONS"].map((opt)=>{
                            const selected = value.presentation === opt.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "style-prefs__chip".concat(selected ? " is-selected" : ""),
                                "aria-pressed": selected,
                                onClick: ()=>setPresentation(opt.id),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: opt.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 78,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: opt.hint
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 79,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, opt.id, true, {
                                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                lineNumber: 71,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                className: "style-prefs__block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                        className: "style-prefs__legend",
                        children: "Favorite color"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "style-prefs__hint",
                        children: "Pick the tone you reach for most."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "style-prefs__swatches",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FAVORITE_COLORS"].map((c)=>{
                            const selected = value.favoriteColor === c.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "style-prefs__swatch".concat(selected ? " is-selected" : ""),
                                style: {
                                    background: c.hex
                                },
                                "aria-pressed": selected,
                                "aria-label": c.label,
                                onClick: ()=>onChange({
                                        ...value,
                                        favoriteColor: c.id
                                    }),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "style-prefs__swatch-label",
                                    children: c.label
                                }, void 0, false, {
                                    fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                    lineNumber: 107,
                                    columnNumber: 17
                                }, this)
                            }, c.id, false, {
                                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                lineNumber: 93,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                className: "style-prefs__block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                        className: "style-prefs__legend",
                        children: "What do you prefer?"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "style-prefs__hint",
                        children: value.presentation === "masculine" ? "Jeans or trousers — tap the look that feels like you." : "Dresses, jeans, or something else — tap the look that feels like you."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "style-prefs__cards",
                        children: bottomOptions.map((opt)=>{
                            const selected = value.bottomPreference === opt.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "style-prefs__card".concat(selected ? " is-selected" : ""),
                                "aria-pressed": selected,
                                onClick: ()=>onChange({
                                        ...value,
                                        bottomPreference: opt.id
                                    }),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "style-prefs__card-art",
                                        "aria-hidden": true,
                                        children: bottomArt(opt.id)
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 137,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "style-prefs__card-label",
                                        children: opt.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 140,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "style-prefs__card-hint",
                                        children: opt.hint
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 141,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, opt.id, true, {
                                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                lineNumber: 125,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                className: "style-prefs__block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                        className: "style-prefs__legend",
                        children: "Silhouette"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "style-prefs__hint",
                        children: "How do clothes usually sit on you?"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "style-prefs__cards style-prefs__cards--3",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SILHOUETTE_PREFERENCES"].map((opt)=>{
                            const selected = value.silhouette === opt.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "style-prefs__card".concat(selected ? " is-selected" : ""),
                                "aria-pressed": selected,
                                onClick: ()=>onChange({
                                        ...value,
                                        silhouette: opt.id
                                    }),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "style-prefs__card-art",
                                        "aria-hidden": true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleIllustrations$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SilhouetteIllustration"], {
                                            variant: opt.id,
                                            className: "h-16 w-14 text-current"
                                        }, void 0, false, {
                                            fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                            lineNumber: 168,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 167,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "style-prefs__card-label",
                                        children: opt.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 173,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "style-prefs__card-hint",
                                        children: opt.hint
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 174,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, opt.id, true, {
                                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                lineNumber: 155,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                className: "style-prefs__block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                        className: "style-prefs__legend",
                        children: "Overall vibe"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "style-prefs__hint",
                        children: "The energy you want your looks to send."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "style-prefs__chips",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLE_VIBES"].map((opt)=>{
                            const selected = value.vibe === opt.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "style-prefs__chip".concat(selected ? " is-selected" : ""),
                                "aria-pressed": selected,
                                onClick: ()=>onChange({
                                        ...value,
                                        vibe: opt.id
                                    }),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: opt.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 197,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: opt.hint
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 198,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, opt.id, true, {
                                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                lineNumber: 188,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                className: "style-prefs__block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                        className: "style-prefs__legend",
                        children: "Budget for pieces"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "style-prefs__hint",
                        children: "Used later for shoppable looks — not a judgment."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "style-prefs__chips",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLE_BUDGETS"].map((opt)=>{
                            const selected = value.budget === opt.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "style-prefs__chip".concat(selected ? " is-selected" : ""),
                                "aria-pressed": selected,
                                onClick: ()=>onChange({
                                        ...value,
                                        budget: opt.id
                                    }),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: opt.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 223,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: opt.hint
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                        lineNumber: 224,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, opt.id, true, {
                                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                                lineNumber: 214,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/StylePrefsForm.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/StylePrefsForm.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_c = StylePrefsForm;
function stylePrefsComplete(value) {
    return Boolean(value.presentation && value.favoriteColor && value.bottomPreference && value.silhouette && value.vibe && value.budget);
}
var _c;
__turbopack_context__.k.register(_c, "StylePrefsForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/appearance/StyleCollectStage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StyleCollectStage",
    ()=>StyleCollectStage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StylePrefsForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/StylePrefsForm.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function StyleCollectStage(param) {
    let { onSubmit, saving, error } = param;
    _s();
    const [prefs, setPrefs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const ready = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StylePrefsForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stylePrefsComplete"])(prefs);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "ai-reveal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-reveal__intro",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-reveal__eyebrow",
                        children: "Stage 2 · Style preferences"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleCollectStage.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "What do you actually wear?"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleCollectStage.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Quick visual picks — who we’re dressing, favorite color, bottoms, silhouette, vibe, and budget. These answers shape your Style Profile and shoppable looks."
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StylePrefsForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StylePrefsForm"], {
                value: prefs,
                onChange: setPrefs
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleCollectStage.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "ai-error",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/appearance/StyleCollectStage.tsx",
                lineNumber: 36,
                columnNumber: 16
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-reveal__cta",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "ai-btn",
                        disabled: !ready || saving,
                        onClick: ()=>{
                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StylePrefsForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stylePrefsComplete"])(prefs)) onSubmit(prefs);
                        },
                        children: saving ? "Saving…" : "See my Style Profile"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleCollectStage.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_s(StyleCollectStage, "X1+k0eUHHk3F+nFg9TVzgkVaEZo=");
_c = StyleCollectStage;
var _c;
__turbopack_context__.k.register(_c, "StyleCollectStage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/appearance/StyleProfileReveal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StyleProfileReveal",
    ()=>StyleProfileReveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/appearance-index.ts [app-client] (ecmascript)");
"use client";
;
;
function StyleProfileReveal(param) {
    let { journey, onContinue } = param;
    var _CLOTHING_PRESENTATIONS_find, _FAVORITE_COLORS_find, _FAVORITE_COLORS_find1, _BOTTOM_PREFERENCES_find, _SILHOUETTE_PREFERENCES_find, _STYLE_VIBES_find, _STYLE_BUDGETS_find;
    const profile = journey.styleProfile;
    var _profile_preferences;
    const prefs = (_profile_preferences = profile === null || profile === void 0 ? void 0 : profile.preferences) !== null && _profile_preferences !== void 0 ? _profile_preferences : journey.stylePreferences;
    var _profile_summary, _CLOTHING_PRESENTATIONS_find_label, _FAVORITE_COLORS_find_hex;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "ai-reveal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-reveal__intro",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-reveal__eyebrow",
                        children: "Stage 2 · Style Profile"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Your style read"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Built from your answers. Vision signals from a full-body photo will refine this later."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                className: "ai-style-card report-glass",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-style-card__summary",
                        children: (_profile_summary = profile === null || profile === void 0 ? void 0 : profile.summary) !== null && _profile_summary !== void 0 ? _profile_summary : "Style preferences saved."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    (profile === null || profile === void 0 ? void 0 : profile.estimateNote) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-style-card__estimate",
                        children: profile.estimateNote
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this) : null,
                    prefs ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                        className: "ai-style-card__grid",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: "Dressing"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 45,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: (_CLOTHING_PRESENTATIONS_find_label = (_CLOTHING_PRESENTATIONS_find = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLOTHING_PRESENTATIONS"].find((p)=>p.id === prefs.presentation)) === null || _CLOTHING_PRESENTATIONS_find === void 0 ? void 0 : _CLOTHING_PRESENTATIONS_find.label) !== null && _CLOTHING_PRESENTATIONS_find_label !== void 0 ? _CLOTHING_PRESENTATIONS_find_label : "Women"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 46,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: "Color"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 55,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ai-style-card__dot",
                                                style: {
                                                    background: (_FAVORITE_COLORS_find_hex = (_FAVORITE_COLORS_find = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FAVORITE_COLORS"].find((c)=>c.id === prefs.favoriteColor)) === null || _FAVORITE_COLORS_find === void 0 ? void 0 : _FAVORITE_COLORS_find.hex) !== null && _FAVORITE_COLORS_find_hex !== void 0 ? _FAVORITE_COLORS_find_hex : "#888"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                                lineNumber: 57,
                                                columnNumber: 17
                                            }, this),
                                            (_FAVORITE_COLORS_find1 = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FAVORITE_COLORS"].find((c)=>c.id === prefs.favoriteColor)) === null || _FAVORITE_COLORS_find1 === void 0 ? void 0 : _FAVORITE_COLORS_find1.label
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 56,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: "Prefer"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 72,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: (_BOTTOM_PREFERENCES_find = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOTTOM_PREFERENCES"].find((b)=>b.id === prefs.bottomPreference)) === null || _BOTTOM_PREFERENCES_find === void 0 ? void 0 : _BOTTOM_PREFERENCES_find.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: "Silhouette"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 82,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: (_SILHOUETTE_PREFERENCES_find = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SILHOUETTE_PREFERENCES"].find((s)=>s.id === prefs.silhouette)) === null || _SILHOUETTE_PREFERENCES_find === void 0 ? void 0 : _SILHOUETTE_PREFERENCES_find.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 83,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: "Vibe"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: (_STYLE_VIBES_find = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLE_VIBES"].find((v)=>v.id === prefs.vibe)) === null || _STYLE_VIBES_find === void 0 ? void 0 : _STYLE_VIBES_find.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 92,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: "Budget"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: (_STYLE_BUDGETS_find = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLE_BUDGETS"].find((b)=>b.id === prefs.budget)) === null || _STYLE_BUDGETS_find === void 0 ? void 0 : _STYLE_BUDGETS_find.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-reveal__cta",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "ai-btn",
                        onClick: onContinue,
                        children: "Continue"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-reveal__note",
                        children: "Optional next: a shoppable look reference. You can skip generation — your strengths pass already stands on its own."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_c = StyleProfileReveal;
var _c;
__turbopack_context__.k.register(_c, "StyleProfileReveal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/appearance/LooksReveal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LooksReveal",
    ()=>LooksReveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/appearance-index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$device$2d$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/device-id.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$device$2d$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deviceAuthHeaders"])({
        "Content-Type": "application/json",
        ...token ? {
            Authorization: "Bearer ".concat(token)
        } : {}
    });
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
        const existing = from === null || from === void 0 ? void 0 : from[index];
        if (existing) {
            const phase = phaseFromStatus(existing.status);
            return {
                ...existing,
                phase,
                error: phase === "failed" && existing.error ? friendlyGenError(0, existing.error) : existing.error
            };
        }
        return {
            id: "look-".concat(index),
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
            id: "look-".concat(copy.length),
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
        const res = await fetch("/api/appearance/".concat(reportId), {
            headers: authHeaders(),
            cache: "no-store"
        });
        const data = await res.json();
        var _data_journey;
        return (_data_journey = data.journey) !== null && _data_journey !== void 0 ? _data_journey : null;
    } catch (e) {
        return null;
    }
}
/** Poll until this look is ready/failed; stream intermediate phases to the UI. */ async function pollLookUntilSettled(reportId, lookIndex, opts) {
    var _opts_maxMs;
    const maxMs = (_opts_maxMs = opts.maxMs) !== null && _opts_maxMs !== void 0 ? _opts_maxMs : 360_000;
    var _opts_intervalMs;
    const intervalMs = (_opts_intervalMs = opts.intervalMs) !== null && _opts_intervalMs !== void 0 ? _opts_intervalMs : 1500;
    const started = Date.now();
    while(Date.now() - started < maxMs){
        var _journey_looks;
        if (opts.signal.aborted) return null;
        const journey = await fetchJourney(reportId);
        const look = journey === null || journey === void 0 ? void 0 : (_journey_looks = journey.looks) === null || _journey_looks === void 0 ? void 0 : _journey_looks[lookIndex];
        if (look) {
            opts.onUpdate(look);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLookSettled"])(look.status)) return look;
        }
        await sleep(intervalMs);
    }
    return null;
}
async function postGenerateLook(reportId, lookIndex, signal) {
    const res = await fetch("/api/appearance/".concat(reportId, "/looks/generate"), {
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
    } catch (e) {
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
    return "https://www.ebay.com/sch/i.html?_nkw=".concat(query);
}
/** Short color words that actually match eBay listing titles. */ const EBAY_COLOR = {
    black: "black",
    navy: "navy",
    beige: "beige",
    white: "white",
    red: "red",
    pink: "pink",
    green: "green",
    blue: "blue"
};
/**
 * Shoppable eBay queries — one piece at a time.
 * Dress / one-piece → single short query.
 * Jeans / trousers / skirt → separate bottom + top searches (never the long outfit sentence).
 */ function buildEbayShopLinks(_recommendedStyle, prefs) {
    const audiencePrefix = (prefs === null || prefs === void 0 ? void 0 : prefs.presentation) === "masculine" ? "men " : (prefs === null || prefs === void 0 ? void 0 : prefs.presentation) === "androgynous" ? "" : "women ";
    if (!prefs) {
        const fallback = "".concat(audiencePrefix, "casual outfit").trim();
        return [
            {
                id: "piece",
                label: "Shop",
                query: fallback,
                href: ebaySearchHref(fallback)
            }
        ];
    }
    const color = EBAY_COLOR[prefs.favoriteColor] || prefs.favoriteColor;
    const sil = prefs.silhouette === "oversized" ? "oversized" : prefs.silhouette === "relaxed" ? "relaxed" : "fitted";
    const mens = prefs.presentation === "masculine";
    // One-piece looks: single short search (women / either only).
    if (prefs.bottomPreference === "dresses") {
        const dressQuery = "".concat(sil, " ").concat(color, " midi dress");
        return [
            {
                id: "dress",
                label: "Dress",
                query: dressQuery,
                href: ebaySearchHref(dressQuery)
            }
        ];
    }
    const bottomNoun = prefs.bottomPreference === "jeans" ? "jeans" : prefs.bottomPreference === "trousers" ? mens ? "chinos" : "trousers" : "skirt";
    const bottomLabel = prefs.bottomPreference === "jeans" ? "Jeans" : prefs.bottomPreference === "trousers" ? mens ? "Trousers" : "Trousers" : "Skirt";
    const topNoun = mens ? prefs.vibe === "polished" ? "dress shirt" : prefs.vibe === "street" ? "graphic tee" : prefs.vibe === "classic" ? "oxford shirt" : "t-shirt" : prefs.vibe === "polished" ? "blouse" : prefs.vibe === "street" ? "crop top" : prefs.vibe === "classic" ? "knit top" : "top";
    const bottomQuery = "".concat(audiencePrefix).concat(sil, " ").concat(color, " ").concat(bottomNoun).replace(/\s+/g, " ").trim();
    const topQuery = "".concat(audiencePrefix).concat(color, " ").concat(topNoun).replace(/\s+/g, " ").trim();
    return [
        {
            id: "bottoms",
            label: bottomLabel,
            query: bottomQuery,
            href: ebaySearchHref(bottomQuery)
        },
        {
            id: "tops",
            label: "Top",
            query: topQuery,
            href: ebaySearchHref(topQuery)
        }
    ];
}
/** Approximate hotspots on the after still — coaching upgrades, not landmark locks. */ function buildUpgradeHotspots(pillars, prefs, recommendedStyle) {
    const spots = [];
    var _pillars_grooming_tips_, _ref;
    const faceTip = (_ref = (_pillars_grooming_tips_ = pillars.grooming.tips[0]) !== null && _pillars_grooming_tips_ !== void 0 ? _pillars_grooming_tips_ : pillars.structure.tips[0]) !== null && _ref !== void 0 ? _ref : "Keep grooming consistent so rechecks measure real change.";
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
    const outfitLine = recommendedStyle.trim() || (prefs ? "".concat(prefs.vibe, " ").concat(prefs.silhouette, " ").concat(prefs.bottomPreference) : "Your prescribed outfit");
    spots.push({
        id: "outfit",
        region: "outfit",
        top: "48%",
        left: "28%",
        title: "Outfit match",
        tip: "This look is dialed to your style profile: ".concat(outfitLine, ". Shop close matches on eBay next.")
    });
    if (prefs) {
        spots.push({
            id: "silhouette",
            region: "silhouette",
            top: "72%",
            left: "62%",
            title: "".concat(prefs.silhouette, " silhouette"),
            tip: "You chose ".concat(prefs.silhouette, " + ").concat(prefs.bottomPreference, ". Keep this shape when shopping so the prescription stays coherent.")
        });
    }
    return spots.slice(0, 4);
}
function LooksReveal(param) {
    let { reportId, portraitFileId, journey, onJourneyUpdate, onFinish } = param;
    _s();
    const [looks, setLooks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "LooksReveal.useState": ()=>seedLooks(journey.looks)
    }["LooksReveal.useState"]);
    const [retryingIndex, setRetryingIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeHotspot, setActiveHotspot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [shopOpen, setShopOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [shopLinkId, setShopLinkId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [ebayCache, setEbayCache] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const rememberEbayResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LooksReveal.useCallback[rememberEbayResult]": (query, entry)=>{
            setEbayCache({
                "LooksReveal.useCallback[rememberEbayResult]": (prev)=>prev[query] ? prev : {
                        ...prev,
                        [query]: entry
                    }
            }["LooksReveal.useCallback[rememberEbayResult]"]);
        }
    }["LooksReveal.useCallback[rememberEbayResult]"], []);
    const onJourneyUpdateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(onJourneyUpdate);
    const prefsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(journey.looks);
    const retryAbortRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const applyLookUpdate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LooksReveal.useCallback[applyLookUpdate]": (look)=>{
            setLooks({
                "LooksReveal.useCallback[applyLookUpdate]": (prev)=>mergeLook(prev, toUiLook(look))
            }["LooksReveal.useCallback[applyLookUpdate]"]);
        }
    }["LooksReveal.useCallback[applyLookUpdate]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LooksReveal.useEffect": ()=>{
            onJourneyUpdateRef.current = onJourneyUpdate;
        }
    }["LooksReveal.useEffect"], [
        onJourneyUpdate
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LooksReveal.useEffect": ()=>{
            prefsRef.current = journey.looks;
        }
    }["LooksReveal.useEffect"], [
        journey.looks
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LooksReveal.useEffect": ()=>{
            var _journey_looks;
            if ((_journey_looks = journey.looks) === null || _journey_looks === void 0 ? void 0 : _journey_looks.length) {
                setLooks({
                    "LooksReveal.useEffect": (prev)=>{
                        const next = seedLooks(journey.looks);
                        return next.map({
                            "LooksReveal.useEffect": (s, i)=>{
                                const was = prev[i];
                                if ((s.phase === "waiting" || isBusyPhase(s.phase)) && was && isBusyPhase(was.phase) && s.phase === "waiting") {
                                    return was;
                                }
                                return s;
                            }
                        }["LooksReveal.useEffect"]);
                    }
                }["LooksReveal.useEffect"]);
            }
        }
    }["LooksReveal.useEffect"], [
        journey.looks
    ]);
    const retryLook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LooksReveal.useCallback[retryLook]": async (lookIndex)=>{
            var _retryAbortRef_current;
            if (retryingIndex != null) return;
            (_retryAbortRef_current = retryAbortRef.current) === null || _retryAbortRef_current === void 0 ? void 0 : _retryAbortRef_current.abort();
            const ac = new AbortController();
            retryAbortRef.current = ac;
            setRetryingIndex(lookIndex);
            const prev = looks[lookIndex];
            setLooks({
                "LooksReveal.useCallback[retryLook]": (cur)=>{
                    var _prev_garmentFileId;
                    return mergeLook(cur, {
                        ...prev !== null && prev !== void 0 ? prev : {
                            id: "look-".concat(lookIndex),
                            index: lookIndex,
                            label: labelFor(lookIndex),
                            recommendedStyle: "",
                            status: "pending",
                            fileId: null,
                            error: null,
                            phase: "waiting"
                        },
                        status: (prev === null || prev === void 0 ? void 0 : prev.garmentFileId) ? "generating_pose" : "generating_garment",
                        fileId: null,
                        error: null,
                        phase: (prev === null || prev === void 0 ? void 0 : prev.garmentFileId) ? "pose" : "garment",
                        garmentFileId: (_prev_garmentFileId = prev === null || prev === void 0 ? void 0 : prev.garmentFileId) !== null && _prev_garmentFileId !== void 0 ? _prev_garmentFileId : null
                    });
                }
            }["LooksReveal.useCallback[retryLook]"]);
            try {
                const posted = await postGenerateLook(reportId, lookIndex, ac.signal);
                if (ac.signal.aborted) return;
                if (posted.journey) onJourneyUpdateRef.current(posted.journey);
                if (posted.look) applyLookUpdate(posted.look);
                if (posted.look && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLookSettled"])(posted.look.status)) {
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
                    var _prev_id, _prev_garmentFileId, _prev_recommendedStyle;
                    applyLookUpdate({
                        id: (_prev_id = prev === null || prev === void 0 ? void 0 : prev.id) !== null && _prev_id !== void 0 ? _prev_id : "look-".concat(lookIndex),
                        index: lookIndex,
                        label: labelFor(lookIndex),
                        status: "failed",
                        fileId: null,
                        garmentFileId: (_prev_garmentFileId = prev === null || prev === void 0 ? void 0 : prev.garmentFileId) !== null && _prev_garmentFileId !== void 0 ? _prev_garmentFileId : null,
                        recommendedStyle: (_prev_recommendedStyle = prev === null || prev === void 0 ? void 0 : prev.recommendedStyle) !== null && _prev_recommendedStyle !== void 0 ? _prev_recommendedStyle : "",
                        error: "Timed out waiting for this look."
                    });
                }
            } catch (err) {
                if (ac.signal.aborted) return;
                var _prev_id1, _prev_garmentFileId1, _prev_recommendedStyle1;
                applyLookUpdate({
                    id: (_prev_id1 = prev === null || prev === void 0 ? void 0 : prev.id) !== null && _prev_id1 !== void 0 ? _prev_id1 : "look-".concat(lookIndex),
                    index: lookIndex,
                    label: labelFor(lookIndex),
                    status: "failed",
                    fileId: null,
                    garmentFileId: (_prev_garmentFileId1 = prev === null || prev === void 0 ? void 0 : prev.garmentFileId) !== null && _prev_garmentFileId1 !== void 0 ? _prev_garmentFileId1 : null,
                    recommendedStyle: (_prev_recommendedStyle1 = prev === null || prev === void 0 ? void 0 : prev.recommendedStyle) !== null && _prev_recommendedStyle1 !== void 0 ? _prev_recommendedStyle1 : "",
                    error: friendlyGenError(0, err instanceof Error ? err.message : "Retry failed.")
                });
            } finally{
                if (!ac.signal.aborted) {
                    setRetryingIndex(null);
                }
            }
        }
    }["LooksReveal.useCallback[retryLook]"], [
        applyLookUpdate,
        looks,
        reportId,
        retryingIndex
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LooksReveal.useEffect": ()=>{
            const ac = new AbortController();
            const initial = seedLooks(prefsRef.current);
            setLooks(initial);
            void ({
                "LooksReveal.useEffect": async ()=>{
                    for (const lookIndex of LOOK_SLOTS){
                        var _latest_looks;
                        if (ac.signal.aborted) return;
                        const latest = await fetchJourney(reportId);
                        if (ac.signal.aborted) return;
                        const existing = latest === null || latest === void 0 ? void 0 : (_latest_looks = latest.looks) === null || _latest_looks === void 0 ? void 0 : _latest_looks[lookIndex];
                        if ((existing === null || existing === void 0 ? void 0 : existing.status) === "ready" && existing.fileId) {
                            applyLookUpdate(existing);
                            if (latest) onJourneyUpdateRef.current(latest);
                            continue;
                        }
                        if ((existing === null || existing === void 0 ? void 0 : existing.status) === "failed") {
                            applyLookUpdate(existing);
                            if (latest) onJourneyUpdateRef.current(latest);
                            continue;
                        }
                        setLooks({
                            "LooksReveal.useEffect": (prev)=>{
                                var _existing_recommendedStyle, _existing_garmentFileId, _prev_lookIndex, _existing_status;
                                return mergeLook(prev, {
                                    ...(_prev_lookIndex = prev[lookIndex]) !== null && _prev_lookIndex !== void 0 ? _prev_lookIndex : {
                                        id: "look-".concat(lookIndex),
                                        index: lookIndex,
                                        label: labelFor(lookIndex),
                                        recommendedStyle: (_existing_recommendedStyle = existing === null || existing === void 0 ? void 0 : existing.recommendedStyle) !== null && _existing_recommendedStyle !== void 0 ? _existing_recommendedStyle : "",
                                        garmentFileId: (_existing_garmentFileId = existing === null || existing === void 0 ? void 0 : existing.garmentFileId) !== null && _existing_garmentFileId !== void 0 ? _existing_garmentFileId : null
                                    },
                                    status: (_existing_status = existing === null || existing === void 0 ? void 0 : existing.status) !== null && _existing_status !== void 0 ? _existing_status : "generating_garment",
                                    fileId: null,
                                    error: null,
                                    phase: existing ? phaseFromStatus(existing.status) : "garment"
                                });
                            }
                        }["LooksReveal.useEffect"]);
                        try {
                            const posted = await postGenerateLook(reportId, lookIndex, ac.signal);
                            if (ac.signal.aborted) return;
                            if (posted.journey) onJourneyUpdateRef.current(posted.journey);
                            if (posted.look) applyLookUpdate(posted.look);
                            if (posted.look && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLookSettled"])(posted.look.status)) {
                                continue;
                            }
                            if (!posted.ok && posted.status !== 202 && !isGatewayTimeout(posted.status, posted.raw)) {
                                console.warn("[LooksReveal] generate returned", posted.status, posted.raw.slice(0, 200));
                            }
                            if (!posted.ok && posted.status === 429) {
                                var _initial_lookIndex;
                                var _existing_garmentFileId, _initial_lookIndex_recommendedStyle;
                                applyLookUpdate({
                                    id: "look-".concat(lookIndex),
                                    index: lookIndex,
                                    label: labelFor(lookIndex),
                                    status: "failed",
                                    fileId: null,
                                    garmentFileId: (_existing_garmentFileId = existing === null || existing === void 0 ? void 0 : existing.garmentFileId) !== null && _existing_garmentFileId !== void 0 ? _existing_garmentFileId : null,
                                    recommendedStyle: (_initial_lookIndex_recommendedStyle = (_initial_lookIndex = initial[lookIndex]) === null || _initial_lookIndex === void 0 ? void 0 : _initial_lookIndex.recommendedStyle) !== null && _initial_lookIndex_recommendedStyle !== void 0 ? _initial_lookIndex_recommendedStyle : "",
                                    error: posted.error || "This device or network already used the free outfit generation."
                                });
                                continue;
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
                                var _initial_lookIndex1;
                                var _existing_garmentFileId1, _initial_lookIndex_recommendedStyle1;
                                applyLookUpdate({
                                    id: "look-".concat(lookIndex),
                                    index: lookIndex,
                                    label: labelFor(lookIndex),
                                    status: "failed",
                                    fileId: null,
                                    garmentFileId: (_existing_garmentFileId1 = existing === null || existing === void 0 ? void 0 : existing.garmentFileId) !== null && _existing_garmentFileId1 !== void 0 ? _existing_garmentFileId1 : null,
                                    recommendedStyle: (_initial_lookIndex_recommendedStyle1 = (_initial_lookIndex1 = initial[lookIndex]) === null || _initial_lookIndex1 === void 0 ? void 0 : _initial_lookIndex1.recommendedStyle) !== null && _initial_lookIndex_recommendedStyle1 !== void 0 ? _initial_lookIndex_recommendedStyle1 : "",
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
                                var _existing_garmentFileId2;
                                applyLookUpdate({
                                    id: "look-".concat(lookIndex),
                                    index: lookIndex,
                                    label: labelFor(lookIndex),
                                    status: "failed",
                                    fileId: null,
                                    garmentFileId: (_existing_garmentFileId2 = existing === null || existing === void 0 ? void 0 : existing.garmentFileId) !== null && _existing_garmentFileId2 !== void 0 ? _existing_garmentFileId2 : null,
                                    recommendedStyle: "",
                                    error: friendlyGenError(0, err instanceof Error ? err.message : "Generation failed.")
                                });
                            }
                        }
                    }
                    if (ac.signal.aborted) return;
                    const refreshed = await fetchJourney(reportId);
                    if (refreshed) onJourneyUpdateRef.current(refreshed);
                }
            })["LooksReveal.useEffect"]();
            return ({
                "LooksReveal.useEffect": ()=>{
                    var _retryAbortRef_current;
                    ac.abort();
                    (_retryAbortRef_current = retryAbortRef.current) === null || _retryAbortRef_current === void 0 ? void 0 : _retryAbortRef_current.abort();
                }
            })["LooksReveal.useEffect"];
        }
    }["LooksReveal.useEffect"], [
        reportId,
        applyLookUpdate
    ]);
    var _looks_;
    const look = (_looks_ = looks[0]) !== null && _looks_ !== void 0 ? _looks_ : null;
    const ready = Boolean((look === null || look === void 0 ? void 0 : look.phase) === "ready" && look.fileId);
    const failed = (look === null || look === void 0 ? void 0 : look.phase) === "failed" && retryingIndex == null;
    const loading = look != null && (isBusyPhase(look.phase) || retryingIndex === look.index);
    const allSettled = looks.length === LOOK_COUNT && looks.every((l)=>l.phase === "ready" || l.phase === "failed");
    const youSrc = portraitFileId ? "/api/files/".concat(portraitFileId) : null;
    const hotspots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LooksReveal.useMemo[hotspots]": ()=>{
            var _look_recommendedStyle;
            return buildUpgradeHotspots(journey.pillars, journey.stylePreferences, (_look_recommendedStyle = look === null || look === void 0 ? void 0 : look.recommendedStyle) !== null && _look_recommendedStyle !== void 0 ? _look_recommendedStyle : "");
        }
    }["LooksReveal.useMemo[hotspots]"], [
        journey.pillars,
        journey.stylePreferences,
        look === null || look === void 0 ? void 0 : look.recommendedStyle
    ]);
    const ebayLinks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LooksReveal.useMemo[ebayLinks]": ()=>{
            var _look_recommendedStyle;
            return buildEbayShopLinks((_look_recommendedStyle = look === null || look === void 0 ? void 0 : look.recommendedStyle) !== null && _look_recommendedStyle !== void 0 ? _look_recommendedStyle : "", journey.stylePreferences);
        }
    }["LooksReveal.useMemo[ebayLinks]"], [
        look === null || look === void 0 ? void 0 : look.recommendedStyle,
        journey.stylePreferences
    ]);
    var _ebayLinks_find, _ref;
    const activeShopLink = (_ref = (_ebayLinks_find = ebayLinks.find((l)=>l.id === shopLinkId)) !== null && _ebayLinks_find !== void 0 ? _ebayLinks_find : ebayLinks[0]) !== null && _ref !== void 0 ? _ref : null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LooksReveal.useEffect": ()=>{
            if (!shopOpen) return;
            const onKey = {
                "LooksReveal.useEffect.onKey": (e)=>{
                    if (e.key === "Escape") setShopOpen(false);
                }
            }["LooksReveal.useEffect.onKey"];
            window.addEventListener("keydown", onKey);
            return ({
                "LooksReveal.useEffect": ()=>window.removeEventListener("keydown", onKey)
            })["LooksReveal.useEffect"];
        }
    }["LooksReveal.useEffect"], [
        shopOpen
    ]);
    var _look_label, _look_phase;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "ai-reveal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-reveal__intro",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-reveal__eyebrow",
                        children: "Optional · Shoppable reference"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 780,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Try a look on eBay terms"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 781,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Optional — not required for your strengths pass. If you generate a still, treat it as a clothing reference; likeness can vary. Prefer shopping the pieces that accentuate what already works.",
                            loading && look ? " ".concat(phaseLabel(look.phase)) : ready ? " Ready." : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 782,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/LooksReveal.tsx",
                lineNumber: 779,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-ba",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "ai-ba__panel report-glass",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ai-ba__media",
                                children: [
                                    youSrc ? // eslint-disable-next-line @next/next/no-img-element
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: youSrc,
                                        alt: "Before — your photo",
                                        className: "ai-look-card__img"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 799,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ai-look-card__pulse",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "ai-look-card__pulse-label",
                                            children: "Your photo"
                                        }, void 0, false, {
                                            fileName: "[project]/components/appearance/LooksReveal.tsx",
                                            lineNumber: 802,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 801,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ai-ba__badge",
                                        children: "Before"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 805,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 796,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ai-ba__caption",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "Original"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 808,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Baseline selfie for comparison."
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 809,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 807,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 795,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "ai-ba__panel report-glass".concat(loading ? " is-loading" : "").concat(failed ? " is-failed" : "").concat(ready ? " is-ready" : ""),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ai-ba__media",
                                children: [
                                    ready && (look === null || look === void 0 ? void 0 : look.fileId) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: "/api/files/".concat(look.fileId),
                                                alt: "After — prescribed look",
                                                className: "ai-look-card__img"
                                            }, void 0, false, {
                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                lineNumber: 820,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ai-ba__hotspots",
                                                "aria-label": "Upgrade highlights",
                                                children: hotspots.map((spot)=>{
                                                    const open = activeHotspot === spot.id;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "ai-ba__hotspot ai-ba__hotspot--".concat(spot.region).concat(open ? " is-open" : ""),
                                                        style: {
                                                            top: spot.top,
                                                            left: spot.left
                                                        },
                                                        "aria-expanded": open,
                                                        "aria-describedby": "hotspot-tip-".concat(spot.id),
                                                        onMouseEnter: ()=>setActiveHotspot(spot.id),
                                                        onMouseLeave: ()=>setActiveHotspot(null),
                                                        onFocus: ()=>setActiveHotspot(spot.id),
                                                        onBlur: ()=>setActiveHotspot(null),
                                                        onClick: ()=>setActiveHotspot((cur)=>cur === spot.id ? null : spot.id),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ai-ba__hotspot-dot",
                                                                "aria-hidden": true
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                                lineNumber: 846,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                id: "hotspot-tip-".concat(spot.id),
                                                                className: "ai-ba__hotspot-tip",
                                                                role: "tooltip",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        children: spot.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                                        lineNumber: 852,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: spot.tip
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                                        lineNumber: 853,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                                lineNumber: 847,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, spot.id, true, {
                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                        lineNumber: 829,
                                                        columnNumber: 23
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                lineNumber: 825,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true) : (look === null || look === void 0 ? void 0 : look.garmentFileId) && (look.phase === "garment_ready" || look.phase === "pose" || look.phase === "tryon" || look.phase === "failed") ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ai-look-card__garment-stage",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: "/api/files/".concat(look.garmentFileId),
                                                alt: "",
                                                className: "ai-look-card__garment-thumb"
                                            }, void 0, false, {
                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                lineNumber: 867,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ai-look-card__pulse ai-look-card__pulse--overlay",
                                                "aria-hidden": true,
                                                children: [
                                                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ai-look-card__pulse-ring"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                        lineNumber: 876,
                                                        columnNumber: 30
                                                    }, this) : null,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "ai-look-card__pulse-label",
                                                        children: retryingIndex != null ? "Retrying…" : look ? phaseLabel(look.phase) : "Waiting…"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                        lineNumber: 877,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                lineNumber: 872,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 865,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ai-look-card__pulse",
                                        "aria-hidden": true,
                                        children: [
                                            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ai-look-card__pulse-ring"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                        lineNumber: 890,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ai-look-card__pulse-ring ai-look-card__pulse-ring--delay"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                        lineNumber: 891,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "ai-look-card__pulse-label",
                                                children: look ? phaseLabel(look.phase) : "Waiting…"
                                            }, void 0, false, {
                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                lineNumber: 894,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 887,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ai-ba__badge ai-ba__badge--after",
                                        children: "After"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 899,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 816,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ai-ba__caption",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: (_look_label = look === null || look === void 0 ? void 0 : look.label) !== null && _look_label !== void 0 ? _look_label : "Prescribed look"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 902,
                                        columnNumber: 13
                                    }, this),
                                    (look === null || look === void 0 ? void 0 : look.recommendedStyle) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: look.recommendedStyle
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 903,
                                        columnNumber: 39
                                    }, this) : null,
                                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "ai-look-card__stage",
                                        children: retryingIndex != null && (look === null || look === void 0 ? void 0 : look.garmentFileId) ? "Garment saved · retrying pose + try-on…" : (look === null || look === void 0 ? void 0 : look.phase) === "tryon" ? "Pose ready · styling via virtual try-on…" : (look === null || look === void 0 ? void 0 : look.phase) === "pose" ? "Garment ready · creating a fashion pose…" : phaseLabel((_look_phase = look === null || look === void 0 ? void 0 : look.phase) !== null && _look_phase !== void 0 ? _look_phase : "waiting")
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 905,
                                        columnNumber: 15
                                    }, this) : null,
                                    failed && (look === null || look === void 0 ? void 0 : look.error) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "ai-look-card__error",
                                        children: look.error
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 916,
                                        columnNumber: 15
                                    }, this) : null,
                                    failed && retryingIndex == null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "ai-look-card__retry",
                                        onClick: ()=>void retryLook(0),
                                        children: (look === null || look === void 0 ? void 0 : look.garmentFileId) ? "Retry pose + try-on" : "Retry look"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 919,
                                        columnNumber: 15
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 901,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 813,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "ai-ba__shop report-glass",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "ai-ba__shop-eyebrow",
                                children: "Shop the look"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 931,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "Check eBay prices"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 932,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Browse live listings that match this outfit prescription. Affiliate links stay free."
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 933,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "ai-ba__shop-cta".concat(ready ? "" : " is-disabled"),
                                disabled: !ready,
                                onClick: ()=>{
                                    setShopLinkId((id)=>{
                                        var _ebayLinks_;
                                        var _ref;
                                        return (_ref = id !== null && id !== void 0 ? id : (_ebayLinks_ = ebayLinks[0]) === null || _ebayLinks_ === void 0 ? void 0 : _ebayLinks_.id) !== null && _ref !== void 0 ? _ref : null;
                                    });
                                    setShopOpen(true);
                                },
                                children: ready ? "Browse eBay prices →" : "Available when look is ready"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 937,
                                columnNumber: 11
                            }, this),
                            ebayLinks.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "ai-ba__shop-query",
                                children: [
                                    "Searches: ",
                                    ebayLinks.map((l)=>l.query).join(" · ")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 949,
                                columnNumber: 13
                            }, this) : (look === null || look === void 0 ? void 0 : look.recommendedStyle) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "ai-ba__shop-query",
                                children: look.recommendedStyle
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 953,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 930,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/LooksReveal.tsx",
                lineNumber: 794,
                columnNumber: 7
            }, this),
            shopOpen && activeShopLink ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EbayShopModal, {
                links: ebayLinks,
                activeId: activeShopLink.id,
                cache: ebayCache,
                onCache: rememberEbayResult,
                onSelect: setShopLinkId,
                onClose: ()=>setShopOpen(false)
            }, void 0, false, {
                fileName: "[project]/components/appearance/LooksReveal.tsx",
                lineNumber: 959,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-reveal__cta",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "ai-btn",
                    onClick: onFinish,
                    disabled: !allSettled && !ready,
                    children: allSettled || ready ? "Finish strengths pass" : "Skip look — finish with strengths"
                }, void 0, false, {
                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                    lineNumber: 970,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/appearance/LooksReveal.tsx",
                lineNumber: 969,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/LooksReveal.tsx",
        lineNumber: 778,
        columnNumber: 5
    }, this);
}
_s(LooksReveal, "vkUhwuBHG3poT5dmLj2de7oBdnc=");
_c = LooksReveal;
/** Survives modal unmount so reopen / tab switch never double-fetches. */ const ebaySessionCache = new Map();
const ebaySessionInflight = new Set();
function EbayShopModal(param) {
    let { links, activeId, cache, onCache, onSelect, onClose } = param;
    _s1();
    var _links_find;
    const active = (_links_find = links.find((l)=>l.id === activeId)) !== null && _links_find !== void 0 ? _links_find : links[0];
    var _cache_active_query, _ref;
    const cached = (_ref = (_cache_active_query = cache[active.query]) !== null && _cache_active_query !== void 0 ? _cache_active_query : ebaySessionCache.get(active.query)) !== null && _ref !== void 0 ? _ref : null;
    const [fetching, setFetching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "EbayShopModal.useState": ()=>!cached && ebaySessionInflight.has(active.query)
    }["EbayShopModal.useState"]);
    const onCacheRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(onCache);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EbayShopModal.useEffect": ()=>{
            onCacheRef.current = onCache;
        }
    }["EbayShopModal.useEffect"], [
        onCache
    ]);
    // Pull session hits into React state when the modal remounts.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EbayShopModal.useEffect": ()=>{
            const hit = ebaySessionCache.get(active.query);
            if (hit && !cache[active.query]) onCache(active.query, hit);
        }
    }["EbayShopModal.useEffect"], [
        active.query,
        cache,
        onCache
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EbayShopModal.useEffect": ()=>{
            const query = active.query;
            if (cache[query] || ebaySessionCache.has(query) || ebaySessionInflight.has(query)) {
                setFetching(ebaySessionInflight.has(query) && !ebaySessionCache.has(query));
                return;
            }
            // Do not abort on tab switch / close — finish and cache for next open.
            ebaySessionInflight.add(query);
            setFetching(true);
            void ({
                "EbayShopModal.useEffect": async ()=>{
                    let entry;
                    try {
                        const qs = new URLSearchParams({
                            q: query,
                            limit: "12"
                        });
                        const res = await fetch("/api/ebay/search?".concat(qs), {
                            headers: authHeaders(),
                            cache: "no-store"
                        });
                        const raw = await res.text();
                        let data = {};
                        try {
                            data = raw ? JSON.parse(raw) : {};
                        } catch (e) {
                            data = {};
                        }
                        if (!res.ok) {
                            entry = {
                                items: [],
                                error: data.error || "Search failed (".concat(res.status, ").")
                            };
                        } else {
                            entry = {
                                items: Array.isArray(data.items) ? data.items : [],
                                error: null
                            };
                        }
                    } catch (err) {
                        entry = {
                            items: [],
                            error: err instanceof Error ? err.message : "Couldn’t load eBay listings."
                        };
                    }
                    ebaySessionCache.set(query, entry);
                    ebaySessionInflight.delete(query);
                    onCacheRef.current(query, entry);
                    setFetching(false);
                }
            })["EbayShopModal.useEffect"]();
        }
    }["EbayShopModal.useEffect"], [
        active.query,
        cache
    ]);
    var _cached_items;
    const items = (_cached_items = cached === null || cached === void 0 ? void 0 : cached.items) !== null && _cached_items !== void 0 ? _cached_items : [];
    var _cached_error;
    const error = (_cached_error = cached === null || cached === void 0 ? void 0 : cached.error) !== null && _cached_error !== void 0 ? _cached_error : null;
    const loading = !cached && fetching;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ai-ebay-modal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "ai-ebay-modal__backdrop",
                "aria-label": "Close eBay shop",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/components/appearance/LooksReveal.tsx",
                lineNumber: 1091,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "dialog",
                "aria-modal": true,
                "aria-labelledby": "ai-ebay-modal-title",
                className: "ai-ebay-modal__panel report-glass",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "ai-ebay-modal__header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "ai-ebay-modal__eyebrow",
                                        children: "eBay"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 1105,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        id: "ai-ebay-modal-title",
                                        children: "Shop this look"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 1106,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 1104,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "ai-ebay-modal__close",
                                onClick: onClose,
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 1108,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 1103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ai-ebay-modal__tabs",
                        role: "tablist",
                        "aria-label": "Search queries",
                        children: links.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                role: "tab",
                                "aria-selected": link.id === active.id,
                                className: "ai-ebay-modal__tab".concat(link.id === active.id ? " is-active" : ""),
                                onClick: ()=>onSelect(link.id),
                                children: link.label
                            }, link.id, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 1119,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 1117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ai-ebay-modal__toolbar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "ai-ebay-modal__query",
                                children: active.query
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 1133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                className: "ai-ebay-modal__open",
                                href: active.href,
                                target: "_blank",
                                rel: "noopener noreferrer sponsored",
                                children: "Open search on eBay"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 1134,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 1132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ai-ebay-modal__results",
                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "ai-ebay-modal__status",
                            children: "Searching live listings…"
                        }, void 0, false, {
                            fileName: "[project]/components/appearance/LooksReveal.tsx",
                            lineNumber: 1146,
                            columnNumber: 13
                        }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ai-ebay-modal__status ai-ebay-modal__status--error",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                                    lineNumber: 1149,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: active.href,
                                    target: "_blank",
                                    rel: "noopener noreferrer sponsored",
                                    children: "Open this search on eBay →"
                                }, void 0, false, {
                                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                                    lineNumber: 1150,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/appearance/LooksReveal.tsx",
                            lineNumber: 1148,
                            columnNumber: 13
                        }, this) : items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ai-ebay-modal__status",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "No listings matched this query."
                                }, void 0, false, {
                                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                                    lineNumber: 1160,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: active.href,
                                    target: "_blank",
                                    rel: "noopener noreferrer sponsored",
                                    children: "Try the full eBay search →"
                                }, void 0, false, {
                                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                                    lineNumber: 1161,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/appearance/LooksReveal.tsx",
                            lineNumber: 1159,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "ai-ebay-modal__grid",
                            children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        className: "ai-ebay-modal__card",
                                        href: item.shopUrl,
                                        target: "_blank",
                                        rel: "noopener noreferrer sponsored",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ai-ebay-modal__card-media",
                                                children: item.imageUrl ? // eslint-disable-next-line @next/next/no-img-element
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: item.imageUrl,
                                                    alt: ""
                                                }, void 0, false, {
                                                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                    lineNumber: 1182,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ai-ebay-modal__card-placeholder"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                    lineNumber: 1184,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                lineNumber: 1179,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ai-ebay-modal__card-body",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "ai-ebay-modal__card-title",
                                                        children: item.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                        lineNumber: 1188,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "ai-ebay-modal__card-price",
                                                        children: formatEbayPrice(item.price, item.currency)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                        lineNumber: 1189,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                lineNumber: 1187,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 1173,
                                        columnNumber: 19
                                    }, this)
                                }, item.id, false, {
                                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                                    lineNumber: 1172,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/appearance/LooksReveal.tsx",
                            lineNumber: 1170,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 1144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/LooksReveal.tsx",
                lineNumber: 1097,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/LooksReveal.tsx",
        lineNumber: 1090,
        columnNumber: 5
    }, this);
}
_s1(EbayShopModal, "zS0SyhKTX478Q+qpHJcNmGLwnDw=");
_c1 = EbayShopModal;
function formatEbayPrice(price, currency) {
    if (price == null) return "See price on eBay";
    try {
        return new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: currency || "USD",
            maximumFractionDigits: 2
        }).format(price);
    } catch (e) {
        return "".concat(currency, " ").concat(price.toFixed(2));
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
var _c, _c1;
__turbopack_context__.k.register(_c, "LooksReveal");
__turbopack_context__.k.register(_c1, "EbayShopModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/appearance/JourneyProPitch.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JourneyProPitch",
    ()=>JourneyProPitch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function JourneyProPitch(param) {
    let { reportId, user, onUserUpdate } = param;
    _s();
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const isPro = Boolean(user === null || user === void 0 ? void 0 : user.isPro);
    const unlock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "JourneyProPitch.useCallback[unlock]": async ()=>{
            if (!user) {
                setError("Sign in to unlock Pro.");
                return;
            }
            setBusy(true);
            setError(null);
            setMessage(null);
            try {
                const checkout = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startProCheckout"])({
                    successPath: "/appearance/".concat(reportId, "?checkout=success"),
                    cancelPath: "/appearance/".concat(reportId, "?checkout=cancel")
                });
                if (checkout.alreadyPro) {
                    setMessage("You’re already on Pro.");
                    return;
                }
                if (checkout.url) {
                    window.location.href = checkout.url;
                    return;
                }
                if (checkout.devUnlock) {
                    const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["devUnlockPro"])();
                    onUserUpdate === null || onUserUpdate === void 0 ? void 0 : onUserUpdate(updated);
                    setMessage("Pro unlocked (dev).");
                    return;
                }
                var _checkout_error;
                setError((_checkout_error = checkout.error) !== null && _checkout_error !== void 0 ? _checkout_error : "Checkout unavailable right now.");
            } catch (err) {
                setError(err instanceof Error ? err.message : "Checkout failed.");
            } finally{
                setBusy(false);
            }
        }
    }["JourneyProPitch.useCallback[unlock]"], [
        onUserUpdate,
        reportId,
        user
    ]);
    if (isPro) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "ai-reveal",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ai-reveal__intro",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "ai-reveal__eyebrow",
                            children: "Pro"
                        }, void 0, false, {
                            fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "You’re unlocked"
                        }, void 0, false, {
                            fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Full strength zooms, style direction, and private rechecks stay on your dashboard. Your first strengths pass is saved."
                        }, void 0, false, {
                            fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ai-reveal__cta ai-reveal__cta--row",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            className: "ai-btn",
                            href: "/dashboard",
                            children: "Go to dashboard"
                        }, void 0, false, {
                            fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            className: "ai-btn ai-btn--ghost",
                            href: "/report/".concat(reportId),
                            children: "Open full report"
                        }, void 0, false, {
                            fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/appearance/JourneyProPitch.tsx",
            lineNumber: 63,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "ai-reveal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-reveal__intro",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-reveal__eyebrow",
                        children: "First pass complete"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Accentuate more with Pro"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "You’ve seen what already works on your photos. Pro unlocks the full strength sequence, style direction, and private progress over time."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "ai-pro-pitch__list",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: "Full strength zooms + style direction on your real photos"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: "Private rechecks — you versus you"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: "Optional shoppable references when you want them"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-reveal__cta ai-reveal__cta--row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "ai-btn",
                        disabled: busy || !user,
                        onClick: ()=>void unlock(),
                        children: busy ? "Opening checkout…" : "Unlock Pro — £9.99/mo"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        className: "ai-btn ai-btn--ghost",
                        href: "/report/".concat(reportId),
                        children: "Skip for now — full report"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            message ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "ai-pro-pitch__msg",
                children: message
            }, void 0, false, {
                fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                lineNumber: 115,
                columnNumber: 18
            }, this) : null,
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "ai-error mt-3",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                lineNumber: 116,
                columnNumber: 16
            }, this) : null,
            !user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "ai-reveal__note",
                children: "Sign in to unlock Pro checkout."
            }, void 0, false, {
                fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                lineNumber: 118,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/JourneyProPitch.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_s(JourneyProPitch, "nMJMucwGYqqnET6hCs67sHvAIvQ=");
_c = JourneyProPitch;
var _c;
__turbopack_context__.k.register(_c, "JourneyProPitch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/appearance/JourneyProgressBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JourneyProgressBar",
    ()=>JourneyProgressBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/appearance-index.ts [app-client] (ecmascript)");
"use client";
;
;
function JourneyProgressBar(param) {
    let { current, withinStep = 0, detail, variant = "light", compact = false } = param;
    const total = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JOURNEY_FLOW_STEPS"].length;
    const index = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journeyStepIndex"])(current);
    const percent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["journeyProgressPercent"])(current, withinStep);
    const currentMeta = current === "complete" ? {
        label: "Profile complete",
        shortLabel: "Done"
    } : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JOURNEY_FLOW_STEPS"][index];
    var _currentMeta_label;
    const stepLabel = (_currentMeta_label = currentMeta === null || currentMeta === void 0 ? void 0 : currentMeta.label) !== null && _currentMeta_label !== void 0 ? _currentMeta_label : "In progress";
    const stepsLeft = current === "complete" ? 0 : Math.max(0, total - index - (withinStep >= 1 ? 1 : 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "journey-progress journey-progress--".concat(variant).concat(compact ? " journey-progress--compact" : ""),
        role: "group",
        "aria-label": "Appearance Index progress",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "journey-progress__top",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "journey-progress__label",
                        children: current === "complete" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: "All steps done"
                        }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                "Step ",
                                Math.min(index + 1, total),
                                " of ",
                                total,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "journey-progress__sep",
                                    "aria-hidden": true,
                                    children: "·"
                                }, void 0, false, {
                                    fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, this),
                                stepLabel
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "journey-progress__pct",
                        "aria-hidden": true,
                        children: [
                            percent,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "journey-progress__track",
                role: "progressbar",
                "aria-valuemin": 0,
                "aria-valuemax": 100,
                "aria-valuenow": percent,
                "aria-valuetext": "".concat(percent, "% — ").concat(stepLabel),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "journey-progress__fill",
                    style: {
                        width: "".concat(percent, "%")
                    }
                }, void 0, false, {
                    fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            !compact ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                className: "journey-progress__steps",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JOURNEY_FLOW_STEPS"].map((step, i)=>{
                    const done = current === "complete" || i < index || i === index && withinStep >= 1;
                    const active = current !== "complete" && i === index;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "journey-progress__step".concat(done ? " is-done" : "").concat(active ? " is-active" : ""),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "journey-progress__dot",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                                lineNumber: 95,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "journey-progress__step-label",
                                children: step.shortLabel
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                                lineNumber: 96,
                                columnNumber: 17
                            }, this)
                        ]
                    }, step.id, true, {
                        fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                        lineNumber: 89,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, this) : null,
            !compact && (detail || stepsLeft > 0) && current !== "complete" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "journey-progress__detail",
                children: detail !== null && detail !== void 0 ? detail : stepsLeft === 1 ? "1 stage left after this" : "".concat(stepsLeft, " stages left after this")
            }, void 0, false, {
                fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                lineNumber: 106,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c = JourneyProgressBar;
var _c;
__turbopack_context__.k.register(_c, "JourneyProgressBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/appearance/AppearanceAuthGate.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppearanceAuthGate",
    ()=>AppearanceAuthGate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function AppearanceAuthGate(param) {
    let { reportId, open, onAuthed, onDismiss, dismissible = false } = param;
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [firstName, setFirstName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("register");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppearanceAuthGate.useEffect": ()=>{
            setMounted(true);
        }
    }["AppearanceAuthGate.useEffect"], []);
    if (!open || !mounted) return null;
    async function onSubmit(e) {
        e.preventDefault();
        setError(null);
        setBusy(true);
        try {
            const result = mode === "register" ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerAccount"])({
                firstName,
                email,
                password,
                reportId
            }) : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginAccount"])({
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center",
        children: [
            dismissible ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": "Dismiss",
                className: "absolute inset-0 bg-[#0a0414]/75 backdrop-blur-sm",
                onClick: onDismiss
            }, void 0, false, {
                fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-[#0a0414]/75 backdrop-blur-sm"
            }, void 0, false, {
                fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "dialog",
                "aria-modal": true,
                "aria-labelledby": "appearance-auth-title",
                className: "report-glass relative z-10 w-full max-w-md rounded-3xl p-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)] sm:p-8",
                children: [
                    dismissible && onDismiss ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onDismiss,
                        className: "absolute right-4 top-4 rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/50 transition hover:bg-white/10 hover:text-white",
                        children: "Close"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: onSubmit,
                        className: "pt-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs uppercase tracking-[0.18em] text-white/45",
                                children: "Free account"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "appearance-auth-title",
                                className: "mt-2 text-2xl font-semibold text-white",
                                children: "Save this pass & continue styling"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-sm leading-relaxed text-white/55",
                                children: "Your strengths view is ready. Create a free account to set style preferences that accentuate what already works — and keep this pass on your dashboard."
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this),
                            mode === "register" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "mt-5 block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-white/45",
                                        children: "First name"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                        lineNumber: 105,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block ".concat(mode === "register" ? "mt-3" : "mt-5"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-white/45",
                                        children: "Email"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                        lineNumber: 117,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "mt-3 block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-white/45",
                                        children: "Password"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                        lineNumber: 129,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-sm text-amber-200/90",
                                role: "alert",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                lineNumber: 144,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: busy,
                                className: "mt-5 w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/90 disabled:opacity-60",
                                children: busy ? "Working…" : mode === "register" ? "Create account & continue" : "Sign in & continue"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
_s(AppearanceAuthGate, "N0VKDdsWeBbcsVYgGKJJk8DRkog=");
_c = AppearanceAuthGate;
var _c;
__turbopack_context__.k.register(_c, "AppearanceAuthGate");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/appearance/AppearanceJourney.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppearanceJourney",
    ()=>AppearanceJourney
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$SiteHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/site/SiteHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/appearance-index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/use-auth-user.ts [app-client] (ecmascript)");
// Scoring-era Stage 1 (parked — restore if we bring back facial strengths):
// import { StrengthsPresentation } from "./StrengthsPresentation";
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$CelebrityMatchStage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/CelebrityMatchStage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleCollectStage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/StyleCollectStage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleProfileReveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/StyleProfileReveal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$LooksReveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/LooksReveal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$JourneyProPitch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/JourneyProPitch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$JourneyProgressBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/JourneyProgressBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$AppearanceAuthGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/AppearanceAuthGate.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$celebrity$2d$match$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/celebrity-match.ts [app-client] (ecmascript)");
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
function AppearanceJourney(param) {
    let { report } = param;
    _s();
    const { user, ready: authReady, isAuthed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthUser"])();
    const [authUser, setAuthUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [journey, setJourney] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadError, setLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [prefsError, setPrefsError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [authOpen, setAuthOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingAdvance, setPendingAdvance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const signedIn = isAuthed || Boolean(authUser);
    const authHeaders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppearanceJourney.useCallback[authHeaders]": ()=>{
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
            return {
                "Content-Type": "application/json",
                ...token ? {
                    Authorization: "Bearer ".concat(token)
                } : {}
            };
        }
    }["AppearanceJourney.useCallback[authHeaders]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppearanceJourney.useEffect": ()=>{
            if (user) setAuthUser(user);
        }
    }["AppearanceJourney.useEffect"], [
        user
    ]);
    // Return from Stripe Checkout on this page.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppearanceJourney.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const q = new URLSearchParams(window.location.search).get("checkout");
            if (q !== "success" && q !== "cancel") return;
            const url = new URL(window.location.href);
            url.searchParams.delete("checkout");
            window.history.replaceState({}, "", url.pathname);
            if (q === "cancel") return;
            void ({
                "AppearanceJourney.useEffect": async ()=>{
                    for(let i = 0; i < 6; i++){
                        const me = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchMe"])();
                        if (me === null || me === void 0 ? void 0 : me.isPro) {
                            setAuthUser(me);
                            return;
                        }
                        await new Promise({
                            "AppearanceJourney.useEffect": (r)=>setTimeout(r, 1000)
                        }["AppearanceJourney.useEffect"]);
                    }
                }
            })["AppearanceJourney.useEffect"]();
        }
    }["AppearanceJourney.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppearanceJourney.useEffect": ()=>{
            let cancelled = false;
            ({
                "AppearanceJourney.useEffect": async ()=>{
                    try {
                        const res = await fetch("/api/appearance/".concat(report.id), {
                            headers: authHeaders(),
                            cache: "no-store"
                        });
                        const data = await res.json();
                        if (!res.ok || !data.journey) {
                            if (!cancelled) {
                                var _data_error;
                                setLoadError((_data_error = data.error) !== null && _data_error !== void 0 ? _data_error : "Could not load appearance journey.");
                            }
                            return;
                        }
                        if (!cancelled) setJourney(data.journey);
                    } catch (e) {
                        if (!cancelled) setLoadError("Could not load appearance journey.");
                    }
                }
            })["AppearanceJourney.useEffect"]();
            return ({
                "AppearanceJourney.useEffect": ()=>{
                    cancelled = true;
                }
            })["AppearanceJourney.useEffect"];
        }
    }["AppearanceJourney.useEffect"], [
        authHeaders,
        report.id
    ]);
    // Past face reveal without a session → hard gate.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppearanceJourney.useEffect": ()=>{
            if (!authReady || !journey) return;
            if (!signedIn && needsAuthForStage(journey.stage)) {
                setAuthOpen(true);
            }
        }
    }["AppearanceJourney.useEffect"], [
        authReady,
        journey,
        signedIn
    ]);
    const advance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppearanceJourney.useCallback[advance]": async (stage)=>{
            // Never hit the API without a session — open the prompt instead.
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])()) {
                setPendingAdvance(stage);
                setAuthOpen(true);
                setPrefsError(null);
                return;
            }
            setSaving(true);
            setPrefsError(null);
            try {
                const res = await fetch("/api/appearance/".concat(report.id, "/advance"), {
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
                } catch (e) {
                    data = {};
                }
                if (res.status === 401) {
                    setPendingAdvance(stage);
                    setAuthOpen(true);
                    setPrefsError(null);
                    return;
                }
                if (!res.ok || !data.journey) {
                    var _data_error;
                    setPrefsError((_data_error = data.error) !== null && _data_error !== void 0 ? _data_error : "Could not continue.");
                    return;
                }
                setJourney(data.journey);
                setPendingAdvance(null);
            } finally{
                setSaving(false);
            }
        }
    }["AppearanceJourney.useCallback[advance]"], [
        authHeaders,
        report.id
    ]);
    const submitPrefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppearanceJourney.useCallback[submitPrefs]": async (preferences)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])()) {
                setAuthOpen(true);
                return;
            }
            setSaving(true);
            setPrefsError(null);
            try {
                const res = await fetch("/api/appearance/".concat(report.id, "/style-preferences"), {
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
                } catch (e) {
                    data = {};
                }
                if (res.status === 401) {
                    setAuthOpen(true);
                    return;
                }
                if (!res.ok || !data.journey) {
                    var _data_error;
                    setPrefsError((_data_error = data.error) !== null && _data_error !== void 0 ? _data_error : "Could not save preferences.");
                    return;
                }
                setJourney(data.journey);
            } finally{
                setSaving(false);
            }
        }
    }["AppearanceJourney.useCallback[submitPrefs]"], [
        authHeaders,
        report.id
    ]);
    const onContinueFromFace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppearanceJourney.useCallback[onContinueFromFace]": ()=>{
            // Always gate on the real token — don't rely on async session state alone.
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])()) {
                setPendingAdvance("style_collect");
                setAuthOpen(true);
                return;
            }
            void advance("style_collect");
        }
    }["AppearanceJourney.useCallback[onContinueFromFace]"], [
        advance
    ]);
    const onAuthed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppearanceJourney.useCallback[onAuthed]": (next)=>{
            setAuthUser(next);
            setAuthOpen(false);
            const target = pendingAdvance !== null && pendingAdvance !== void 0 ? pendingAdvance : "style_collect";
            setPendingAdvance(null);
            void ({
                "AppearanceJourney.useCallback[onAuthed]": async ()=>{
                    let stageNow = "face_reveal";
                    try {
                        const res = await fetch("/api/appearance/".concat(report.id), {
                            headers: {
                                "Content-Type": "application/json",
                                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])() ? {
                                    Authorization: "Bearer ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])())
                                } : {}
                            },
                            cache: "no-store"
                        });
                        const data = await res.json();
                        if (data.journey) {
                            setJourney(data.journey);
                            stageNow = data.journey.stage;
                        }
                    } catch (e) {
                    /* continue */ }
                    if (stageNow === "face_reveal") {
                        await advance(target);
                    }
                }
            })["AppearanceJourney.useCallback[onAuthed]"]();
        }
    }["AppearanceJourney.useCallback[onAuthed]"], [
        advance,
        pendingAdvance,
        report.id
    ]);
    var _journey_stage;
    const stage = (_journey_stage = journey === null || journey === void 0 ? void 0 : journey.stage) !== null && _journey_stage !== void 0 ? _journey_stage : "face_reveal";
    const flowStep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["appearanceStageToFlowStep"])(stage);
    const lockedPastFace = authReady && !signedIn && needsAuthForStage(stage);
    var _report_portraitFileId;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "ai-page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$SiteHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SiteHeader"], {
                variant: "dark"
            }, void 0, false, {
                fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                lineNumber: 262,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-shell".concat(stage === "face_reveal" ? " ai-shell--scan" : ""),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$JourneyProgressBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JourneyProgressBar"], {
                        current: flowStep,
                        withinStep: flowStep === "complete" ? 1 : 0.35,
                        variant: "dark",
                        compact: stage === "face_reveal",
                        detail: flowStep === "complete" ? undefined : flowStep === "face_reveal" ? "Upload done · celebrity style match" : flowStep === "style_collect" ? "Pick your visual style preferences" : flowStep === "style_reveal" ? "Style profile ready — inspired looks next" : "Almost done — inspired looks"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 267,
                        columnNumber: 9
                    }, this),
                    loadError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-error",
                        children: loadError
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 286,
                        columnNumber: 11
                    }, this) : !journey || !authReady ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-loading",
                        children: "Loading your Appearance Index…"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 288,
                        columnNumber: 11
                    }, this) : lockedPastFace ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "ai-reveal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ai-reveal__intro",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "ai-reveal__eyebrow",
                                        children: "Account required"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                        lineNumber: 292,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Sign in to continue your style profile"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                        lineNumber: 293,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Your celebrity match stays free. Style preferences need a free account so we can save them to your dashboard."
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                        lineNumber: 294,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                lineNumber: 291,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ai-reveal__cta",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "ai-btn",
                                    onClick: ()=>setAuthOpen(true),
                                    children: "Create account / sign in"
                                }, void 0, false, {
                                    fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                    lineNumber: 300,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                lineNumber: 299,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 290,
                        columnNumber: 11
                    }, this) : stage === "face_reveal" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$CelebrityMatchStage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CelebrityMatchStage"], {
                        report: report,
                        fullProfileUnlocked: Boolean((authUser === null || authUser === void 0 ? void 0 : authUser.isPro) || (user === null || user === void 0 ? void 0 : user.isPro) || (journey === null || journey === void 0 ? void 0 : journey.fullProfileComplete)),
                        onContinue: onContinueFromFace,
                        continueLabel: signedIn ? "Continue to style preferences" : "Continue — create free account",
                        onRecalculate: ()=>{
                            // Stable seed uses portrait ids — new photos via upload change the match.
                            void (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$celebrity$2d$match$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchSeedForReport"])(report);
                            window.location.assign("/upload");
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 310,
                        columnNumber: 11
                    }, this) : stage === "style_collect" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleCollectStage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StyleCollectStage"], {
                        onSubmit: (p)=>void submitPrefs(p),
                        saving: saving,
                        error: prefsError
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 328,
                        columnNumber: 11
                    }, this) : stage === "style_reveal" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleProfileReveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StyleProfileReveal"], {
                        journey: journey,
                        onContinue: ()=>void advance("prescription_reveal")
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 334,
                        columnNumber: 11
                    }, this) : stage === "prescription_reveal" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$LooksReveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LooksReveal"], {
                        reportId: report.id,
                        portraitFileId: (_report_portraitFileId = report.portraitFileId) !== null && _report_portraitFileId !== void 0 ? _report_portraitFileId : null,
                        journey: journey,
                        onJourneyUpdate: setJourney,
                        onFinish: ()=>void advance("complete")
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 339,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$JourneyProPitch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JourneyProPitch"], {
                        reportId: report.id,
                        user: authUser !== null && authUser !== void 0 ? authUser : user,
                        onUserUpdate: (u)=>setAuthUser(u)
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 347,
                        columnNumber: 11
                    }, this),
                    prefsError && stage === "face_reveal" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-error mt-4",
                        children: prefsError
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 355,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                lineNumber: 264,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$AppearanceAuthGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppearanceAuthGate"], {
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
                lineNumber: 359,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
        lineNumber: 261,
        columnNumber: 5
    }, this);
}
_s(AppearanceJourney, "Vhhm26EwIU0s3bg1RYmfmDTDSHI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthUser"]
    ];
});
_c = AppearanceJourney;
var _c;
__turbopack_context__.k.register(_c, "AppearanceJourney");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1eb14bfd._.js.map