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
"[project]/lib/types/report.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
const SCORED_APPEARANCE_KEYS = FEATURE_KEYS.filter(_c = (k)=>k !== "photo_quality");
_c1 = SCORED_APPEARANCE_KEYS;
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
var _c, _c1;
__turbopack_context__.k.register(_c, "SCORED_APPEARANCE_KEYS$FEATURE_KEYS.filter");
__turbopack_context__.k.register(_c1, "SCORED_APPEARANCE_KEYS");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/object-cover-map.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Map a normalized image-space point (0–1) into CSS percent of a box
 * that displays the image with object-fit: cover and object-position.
 */ __turbopack_context__.s([
    "mapNormToCoverPercent",
    ()=>mapNormToCoverPercent
]);
function mapNormToCoverPercent(nx, ny, imgW, imgH, boxW, boxH) {
    let objectPosX = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : 0.5, objectPosY = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : 0.18;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/feature-mutability.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/recommendations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RECOMMENDATION_LOOKUP",
    ()=>RECOMMENDATION_LOOKUP,
    "checklistRecommendationsForScore",
    ()=>checklistRecommendationsForScore,
    "recommendationsForScore",
    ()=>recommendationsForScore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/feature-mutability.ts [app-client] (ecmascript)");
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
    const mutability = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["featureMutability"])(feature);
    return {
        ...rec,
        mutability,
        checklistEligible: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isChecklistEligibleFeature"])(feature)
    };
}
function recommendationsForScore(feature, score) {
    var _RECOMMENDATION_LOOKUP_feature;
    if (score >= 70) return [];
    const mutability = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["featureMutability"])(feature);
    var _RECOMMENDATION_LOOKUP_feature_recommendations;
    const raw = (_RECOMMENDATION_LOOKUP_feature_recommendations = (_RECOMMENDATION_LOOKUP_feature = RECOMMENDATION_LOOKUP[feature]) === null || _RECOMMENDATION_LOOKUP_feature === void 0 ? void 0 : _RECOMMENDATION_LOOKUP_feature.recommendations) !== null && _RECOMMENDATION_LOOKUP_feature_recommendations !== void 0 ? _RECOMMENDATION_LOOKUP_feature_recommendations : [];
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/score-tone.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/report/InteractivePortrait.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InteractivePortrait",
    ()=>InteractivePortrait
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$object$2d$cover$2d$map$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/object-cover-map.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/recommendations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/feature-mutability.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/score-tone.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/types/report.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
function InteractivePortrait(param) {
    let { report, faceSrc, usingUserPortrait, isUnlocked, topFeature, size = "default", openOnHover = false } = param;
    var _report_featureOverlays;
    _s();
    const boxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const imgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [boxSize, setBoxSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        w: 0,
        h: 0
    });
    const [imgSize, setImgSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        w: 0,
        h: 0
    });
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const overlays = (((_report_featureOverlays = report.featureOverlays) === null || _report_featureOverlays === void 0 ? void 0 : _report_featureOverlays.length) > 0 ? report.featureOverlays : FALLBACK_OVERLAYS).filter((d)=>d.feature !== "grooming_signal");
    const measure = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "InteractivePortrait.useCallback[measure]": ()=>{
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
        }
    }["InteractivePortrait.useCallback[measure]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InteractivePortrait.useEffect": ()=>{
            measure();
            const box = boxRef.current;
            if (!box || typeof ResizeObserver === "undefined") return;
            const ro = new ResizeObserver({
                "InteractivePortrait.useEffect": ()=>measure()
            }["InteractivePortrait.useEffect"]);
            ro.observe(box);
            return ({
                "InteractivePortrait.useEffect": ()=>ro.disconnect()
            })["InteractivePortrait.useEffect"];
        }
    }["InteractivePortrait.useEffect"], [
        measure,
        faceSrc
    ]);
    var _overlays_find;
    const selectedDot = (_overlays_find = overlays.find((d)=>d.id === selectedId)) !== null && _overlays_find !== void 0 ? _overlays_find : null;
    const selectedScore = selectedDot ? report.features[selectedDot.feature] : null;
    const selectedPos = selectedDot ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$object$2d$cover$2d$map$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapNormToCoverPercent"])(selectedDot.x, selectedDot.y, imgSize.w || 1, imgSize.h || 1, boxSize.w || 1, boxSize.h || 1, OBJECT_POS_X, OBJECT_POS_Y) : null;
    const pop = selectedPos && boxSize.w > 0 ? popoverOrigin(selectedPos.left, selectedPos.top, boxSize.w, boxSize.h) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: size === "hero" ? "relative mx-auto w-full max-w-none" : "relative mx-auto w-full max-w-md lg:max-w-none",
        children: [
            "      ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: boxRef,
                className: "report-glass relative aspect-[3/4] overflow-hidden rounded-[2rem]",
                onClick: (e)=>{
                    if (e.target === e.currentTarget) setSelectedId(null);
                },
                onMouseLeave: ()=>{
                    if (openOnHover) setSelectedId(null);
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30",
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, this),
                    !usingUserPortrait && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-white/55 backdrop-blur-sm",
                        children: "Demo portrait"
                    }, void 0, false, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 175,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-black/35 px-2.5 py-1 text-[10px] text-white/50 backdrop-blur-sm",
                        children: openOnHover ? "Hover a point" : "Tap a point"
                    }, void 0, false, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this),
                    overlays.map((dot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OverlayDot, {
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
                    isUnlocked(topFeature) && !selectedDot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute left-3 top-12 z-10 report-glass-chip rounded-2xl px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] uppercase tracking-[0.14em] text-white/45",
                                children: "Strongest"
                            }, void 0, false, {
                                fileName: "[project]/components/report/InteractivePortrait.tsx",
                                lineNumber: 203,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold text-white",
                                children: [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][topFeature],
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    selectedDot && selectedScore && pop && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureBreakdownCard, {
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
_s(InteractivePortrait, "oY7FeZI5frJjmHXJTs5bAaaVrbo=");
_c = InteractivePortrait;
function OverlayDot(param) {
    let { dot, score, unlocked, active, imgSize, boxSize, openOnHover, onSelect, onHoverOpen } = param;
    const pos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$object$2d$cover$2d$map$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapNormToCoverPercent"])(dot.x, dot.y, imgSize.w || 1, imgSize.h || 1, boxSize.w || 1, boxSize.h || 1, OBJECT_POS_X, OBJECT_POS_Y);
    const tone = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFeatureMeasurable"])(score.measurable) ? "bg-white/35" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scoreToneClass"])(score.score, unlocked);
    function onKeyDown(e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        "aria-label": "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][dot.feature], " — ").concat(openOnHover ? "hover" : "tap", " for breakdown"),
        "aria-pressed": active,
        onClick: (e)=>{
            e.stopPropagation();
            onSelect();
        },
        onMouseEnter: ()=>{
            if (openOnHover) onHoverOpen();
        },
        onKeyDown: onKeyDown,
        className: "report-face-dot absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 ".concat(active ? "report-face-dot--active" : ""),
        style: {
            left: "".concat(pos.left, "%"),
            top: "".concat(pos.top, "%")
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "report-face-dot__core ".concat(tone)
            }, void 0, false, {
                fileName: "[project]/components/report/InteractivePortrait.tsx",
                lineNumber: 291,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "report-face-dot__ring ".concat(tone),
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
_c1 = OverlayDot;
function FeatureBreakdownCard(param) {
    let { feature, packet, unlocked, placeRight, style, onClose } = param;
    var _recommendationsForScore_;
    const measurable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFeatureMeasurable"])(packet.measurable);
    const mutability = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_MUTABILITY"][feature];
    const tip = unlocked && measurable ? (_recommendationsForScore_ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recommendationsForScore"])(feature, packet.score)[0]) === null || _recommendationsForScore_ === void 0 ? void 0 : _recommendationsForScore_.action : null;
    var _packet_gateNote;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "dialog",
        "aria-label": "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][feature], " breakdown"),
        className: "report-face-popover absolute z-30 report-glass-chip rounded-xl px-3 py-2.5 ".concat(placeRight ? "report-face-popover--from-left" : "report-face-popover--from-right"),
        style: {
            left: style.left,
            top: style.top,
            width: POPOVER_W
        },
        onClick: (e)=>e.stopPropagation(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[9px] uppercase tracking-[0.14em] text-white/45",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MUTABILITY_LABELS"][mutability]
                            }, void 0, false, {
                                fileName: "[project]/components/report/InteractivePortrait.tsx",
                                lineNumber: 337,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-0.5 truncate text-[13px] font-semibold text-white",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][feature]
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
            !measurable ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-amber-300/90",
                        children: "Not measured"
                    }, void 0, false, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 356,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 line-clamp-4 text-[11px] leading-snug text-white/75",
                        children: (_packet_gateNote = packet.gateNote) !== null && _packet_gateNote !== void 0 ? _packet_gateNote : packet.observedSignal
                    }, void 0, false, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 359,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true) : unlocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1.5 flex flex-wrap items-baseline gap-x-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xl font-semibold tracking-tight text-white",
                                children: [
                                    packet.score,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1.5 line-clamp-3 text-[11px] leading-snug text-white/75",
                        children: packet.observedSignal
                    }, void 0, false, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 376,
                        columnNumber: 11
                    }, this),
                    tip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_c2 = FeatureBreakdownCard;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "InteractivePortrait");
__turbopack_context__.k.register(_c1, "OverlayDot");
__turbopack_context__.k.register(_c2, "FeatureBreakdownCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/appearance/FaceGroomingReveal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FaceGroomingReveal",
    ()=>FaceGroomingReveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/types/report.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$InteractivePortrait$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/report/InteractivePortrait.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/score-tone.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function PillarCard(param) {
    let { pillar, features, delay = 0 } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "ai-pillar report-glass",
        style: {
            animationDelay: "".concat(delay, "ms")
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "ai-pillar__head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: pillar.label
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "ai-pillar__score",
                children: pillar.measurable && pillar.score != null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: (pillar.score / 10).toFixed(1)
                        }, void 0, false, {
                            fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                            lineNumber: 36,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                            children: "/10"
                        }, void 0, false, {
                            fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                            lineNumber: 37,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "ai-pillar__features",
                children: pillar.featureKeys.map((key)=>{
                    const packet = features[key];
                    if (!packet) return null;
                    const ok = packet.measurable !== false;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][key]
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                                lineNumber: 50,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "ai-pillar__tips",
                children: pillar.tips.map((tip)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
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
_c = PillarCard;
function FaceGroomingReveal(param) {
    let { report, pillars, onContinue, continueLabel = "Continue to style profile", continueNote = "Next: a few visual style choices (and later, a full-body photo)." } = param;
    _s();
    // Landmarks were measured on the real upload — never swap in the AI avatar here.
    const portraitId = report.portraitFileId;
    const faceSrc = portraitId ? "/api/files/".concat(portraitId) : "/woman1.png";
    const usingUserPortrait = Boolean(portraitId);
    const topFeature = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FaceGroomingReveal.useMemo[topFeature]": ()=>{
            const ranked = [
                ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCORED_APPEARANCE_KEYS"]
            ].filter({
                "FaceGroomingReveal.useMemo[topFeature].ranked": (k)=>{
                    var _report_features_k;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFeatureMeasurable"])((_report_features_k = report.features[k]) === null || _report_features_k === void 0 ? void 0 : _report_features_k.measurable);
                }
            }["FaceGroomingReveal.useMemo[topFeature].ranked"]).sort({
                "FaceGroomingReveal.useMemo[topFeature].ranked": (a, b)=>{
                    var _report_features_b, _report_features_a;
                    var _report_features_b_score, _report_features_a_score;
                    return ((_report_features_b_score = (_report_features_b = report.features[b]) === null || _report_features_b === void 0 ? void 0 : _report_features_b.score) !== null && _report_features_b_score !== void 0 ? _report_features_b_score : 0) - ((_report_features_a_score = (_report_features_a = report.features[a]) === null || _report_features_a === void 0 ? void 0 : _report_features_a.score) !== null && _report_features_a_score !== void 0 ? _report_features_a_score : 0);
                }
            }["FaceGroomingReveal.useMemo[topFeature].ranked"]);
            var _ranked_;
            return (_ranked_ = ranked[0]) !== null && _ranked_ !== void 0 ? _ranked_ : "face_symmetry";
        }
    }["FaceGroomingReveal.useMemo[topFeature]"], [
        report.features
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "ai-reveal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-reveal__intro",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-reveal__eyebrow",
                        children: "Stage 1 · Face & Grooming Index"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Your first reveal"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-reveal__grid",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ai-reveal__portrait-wrap",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$InteractivePortrait$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractivePortrait"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ai-reveal__pillars",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PillarCard, {
                                pillar: pillars.structure,
                                features: report.features,
                                delay: 80
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PillarCard, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-reveal__cta",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "ai-btn",
                        onClick: onContinue,
                        children: continueLabel
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/FaceGroomingReveal.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_s(FaceGroomingReveal, "3FtEOdW29UD78BWXtqrRcget9ic=");
_c1 = FaceGroomingReveal;
var _c, _c1;
__turbopack_context__.k.register(_c, "PillarCard");
__turbopack_context__.k.register(_c1, "FaceGroomingReveal");
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
                        children: "Generate my looks"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/StyleProfileReveal.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-reveal__note",
                        children: "Next: three outfit stills using your face — styled from these preferences."
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
                        children: "Stage 3 · Prescription"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 780,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Before & after"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 781,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Your photo versus one prescribed look. Hover the markers on the after still for upgrades tied to your profile.",
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
                                        lineNumber: 798,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ai-look-card__pulse",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "ai-look-card__pulse-label",
                                            children: "Your photo"
                                        }, void 0, false, {
                                            fileName: "[project]/components/appearance/LooksReveal.tsx",
                                            lineNumber: 801,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 800,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ai-ba__badge",
                                        children: "Before"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 804,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 795,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ai-ba__caption",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "Original"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 807,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Baseline selfie for comparison."
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 808,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 806,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 794,
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
                                                lineNumber: 819,
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
                                                                lineNumber: 845,
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
                                                                        lineNumber: 851,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: spot.tip
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                                        lineNumber: 852,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                                lineNumber: 846,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, spot.id, true, {
                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                        lineNumber: 828,
                                                        columnNumber: 23
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                lineNumber: 824,
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
                                                lineNumber: 866,
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
                                                        lineNumber: 875,
                                                        columnNumber: 30
                                                    }, this) : null,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "ai-look-card__pulse-label",
                                                        children: retryingIndex != null ? "Retrying…" : look ? phaseLabel(look.phase) : "Waiting…"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                        lineNumber: 876,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                lineNumber: 871,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 864,
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
                                                        lineNumber: 889,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ai-look-card__pulse-ring ai-look-card__pulse-ring--delay"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                        lineNumber: 890,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "ai-look-card__pulse-label",
                                                children: look ? phaseLabel(look.phase) : "Waiting…"
                                            }, void 0, false, {
                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                lineNumber: 893,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 886,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ai-ba__badge ai-ba__badge--after",
                                        children: "After"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 898,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 815,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ai-ba__caption",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: (_look_label = look === null || look === void 0 ? void 0 : look.label) !== null && _look_label !== void 0 ? _look_label : "Prescribed look"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 901,
                                        columnNumber: 13
                                    }, this),
                                    (look === null || look === void 0 ? void 0 : look.recommendedStyle) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: look.recommendedStyle
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 902,
                                        columnNumber: 39
                                    }, this) : null,
                                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "ai-look-card__stage",
                                        children: retryingIndex != null && (look === null || look === void 0 ? void 0 : look.garmentFileId) ? "Garment saved · retrying pose + try-on…" : (look === null || look === void 0 ? void 0 : look.phase) === "tryon" ? "Pose ready · styling via virtual try-on…" : (look === null || look === void 0 ? void 0 : look.phase) === "pose" ? "Garment ready · creating a fashion pose…" : phaseLabel((_look_phase = look === null || look === void 0 ? void 0 : look.phase) !== null && _look_phase !== void 0 ? _look_phase : "waiting")
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 904,
                                        columnNumber: 15
                                    }, this) : null,
                                    failed && (look === null || look === void 0 ? void 0 : look.error) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "ai-look-card__error",
                                        children: look.error
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 915,
                                        columnNumber: 15
                                    }, this) : null,
                                    failed && retryingIndex == null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "ai-look-card__retry",
                                        onClick: ()=>void retryLook(0),
                                        children: (look === null || look === void 0 ? void 0 : look.garmentFileId) ? "Retry pose + try-on" : "Retry look"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 918,
                                        columnNumber: 15
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 900,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 812,
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
                                lineNumber: 930,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "Check eBay prices"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 931,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Browse live listings that match this outfit prescription. Affiliate links stay free."
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 932,
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
                                lineNumber: 936,
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
                                lineNumber: 948,
                                columnNumber: 13
                            }, this) : (look === null || look === void 0 ? void 0 : look.recommendedStyle) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "ai-ba__shop-query",
                                children: look.recommendedStyle
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 952,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 929,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/LooksReveal.tsx",
                lineNumber: 793,
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
                lineNumber: 958,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-reveal__cta",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "ai-btn",
                    onClick: onFinish,
                    disabled: !allSettled && !ready,
                    children: allSettled || ready ? "Finish this pass" : "Continue while look finishes"
                }, void 0, false, {
                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                    lineNumber: 969,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/appearance/LooksReveal.tsx",
                lineNumber: 968,
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
                lineNumber: 1088,
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
                                        lineNumber: 1102,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        id: "ai-ebay-modal-title",
                                        children: "Shop this look"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 1103,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 1101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "ai-ebay-modal__close",
                                onClick: onClose,
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                lineNumber: 1105,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 1100,
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
                                lineNumber: 1116,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 1114,
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
                                lineNumber: 1130,
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
                                lineNumber: 1131,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 1129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ai-ebay-modal__results",
                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "ai-ebay-modal__status",
                            children: "Searching live listings…"
                        }, void 0, false, {
                            fileName: "[project]/components/appearance/LooksReveal.tsx",
                            lineNumber: 1143,
                            columnNumber: 13
                        }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ai-ebay-modal__status ai-ebay-modal__status--error",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                                    lineNumber: 1146,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: active.href,
                                    target: "_blank",
                                    rel: "noopener noreferrer sponsored",
                                    children: "Open this search on eBay →"
                                }, void 0, false, {
                                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                                    lineNumber: 1147,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/appearance/LooksReveal.tsx",
                            lineNumber: 1145,
                            columnNumber: 13
                        }, this) : items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ai-ebay-modal__status",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "No listings matched this query."
                                }, void 0, false, {
                                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                                    lineNumber: 1157,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: active.href,
                                    target: "_blank",
                                    rel: "noopener noreferrer sponsored",
                                    children: "Try the full eBay search →"
                                }, void 0, false, {
                                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                                    lineNumber: 1158,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/appearance/LooksReveal.tsx",
                            lineNumber: 1156,
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
                                                    lineNumber: 1179,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ai-ebay-modal__card-placeholder"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                    lineNumber: 1181,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                lineNumber: 1176,
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
                                                        lineNumber: 1185,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "ai-ebay-modal__card-price",
                                                        children: formatEbayPrice(item.price, item.currency)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                        lineNumber: 1186,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/appearance/LooksReveal.tsx",
                                                lineNumber: 1184,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                                        lineNumber: 1170,
                                        columnNumber: 19
                                    }, this)
                                }, item.id, false, {
                                    fileName: "[project]/components/appearance/LooksReveal.tsx",
                                    lineNumber: 1169,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/appearance/LooksReveal.tsx",
                            lineNumber: 1167,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/LooksReveal.tsx",
                        lineNumber: 1141,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/LooksReveal.tsx",
                lineNumber: 1094,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/LooksReveal.tsx",
        lineNumber: 1087,
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
                            children: "Rechecks, pillar history, and restocked looks stay on your dashboard. Your first Appearance Profile pass is saved."
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
                        children: "Keep improving with Pro"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "You’ve finished the free Appearance Profile — face, style, and one prescribed look with shoppable matches. Pro unlocks the ongoing loop."
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
                        children: "Weekly rechecks with per-pillar history"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: "Restocked eBay-driven looks over time"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/JourneyProPitch.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: "Seasonal themed style pushes"
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
    let { current, withinStep = 0, detail, variant = "light" } = param;
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
        className: "journey-progress journey-progress--".concat(variant),
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    lineNumber: 69,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/appearance/JourneyProgressBar.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
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
                                lineNumber: 85,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            (detail || stepsLeft > 0) && current !== "complete" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "journey-progress__detail",
                children: detail !== null && detail !== void 0 ? detail : stepsLeft === 1 ? "1 stage left after this" : "".concat(stepsLeft, " stages left after this")
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
                                children: "Save this pass & unlock your style profile"
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/AppearanceAuthGate.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-sm leading-relaxed text-white/55",
                                children: "Your Face & Grooming reveal is ready. Create a free account to set style preferences and generate prescribed looks — and keep this report on your dashboard."
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$FaceGroomingReveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/FaceGroomingReveal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleCollectStage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/StyleCollectStage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleProfileReveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/StyleProfileReveal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$LooksReveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/LooksReveal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$JourneyProPitch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/JourneyProPitch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$JourneyProgressBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/JourneyProgressBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$AppearanceAuthGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/appearance/AppearanceAuthGate.tsx [app-client] (ecmascript)");
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
                lineNumber: 259,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ai-shell pt-20 sm:pt-24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$JourneyProgressBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JourneyProgressBar"], {
                        current: flowStep,
                        withinStep: flowStep === "complete" ? 1 : 0.35,
                        variant: "dark",
                        detail: flowStep === "complete" ? undefined : flowStep === "face_reveal" ? "Upload done · reviewing Structure & Grooming" : flowStep === "style_collect" ? "Pick your visual style preferences" : flowStep === "style_reveal" ? "Style Profile ready — looks are next" : "Almost done — prescribed looks"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 262,
                        columnNumber: 9
                    }, this),
                    loadError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-error",
                        children: loadError
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 280,
                        columnNumber: 11
                    }, this) : !journey || !authReady ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-loading",
                        children: "Loading your Appearance Index…"
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 282,
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
                                        lineNumber: 286,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Sign in to continue your style profile"
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                        lineNumber: 287,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Face & Grooming stay free to view. Style preferences and prescribed looks need a free account so we can save them to your dashboard."
                                    }, void 0, false, {
                                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                        lineNumber: 288,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                lineNumber: 285,
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
                                    lineNumber: 295,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                                lineNumber: 294,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 284,
                        columnNumber: 11
                    }, this) : stage === "face_reveal" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$FaceGroomingReveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaceGroomingReveal"], {
                        report: report,
                        pillars: journey.pillars,
                        onContinue: onContinueFromFace,
                        continueLabel: signedIn ? "Continue to style profile" : "Continue — create free account",
                        continueNote: signedIn ? "Next: visual style choices, then prescribed looks." : "Next: a free account, then visual style choices and prescribed looks."
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 305,
                        columnNumber: 11
                    }, this) : stage === "style_collect" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleCollectStage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StyleCollectStage"], {
                        onSubmit: (p)=>void submitPrefs(p),
                        saving: saving,
                        error: prefsError
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 321,
                        columnNumber: 11
                    }, this) : stage === "style_reveal" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$StyleProfileReveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StyleProfileReveal"], {
                        journey: journey,
                        onContinue: ()=>void advance("prescription_reveal")
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 327,
                        columnNumber: 11
                    }, this) : stage === "prescription_reveal" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$LooksReveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LooksReveal"], {
                        reportId: report.id,
                        portraitFileId: (_report_portraitFileId = report.portraitFileId) !== null && _report_portraitFileId !== void 0 ? _report_portraitFileId : null,
                        journey: journey,
                        onJourneyUpdate: setJourney,
                        onFinish: ()=>void advance("complete")
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 332,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$appearance$2f$JourneyProPitch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JourneyProPitch"], {
                        reportId: report.id,
                        user: authUser !== null && authUser !== void 0 ? authUser : user,
                        onUserUpdate: (u)=>setAuthUser(u)
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 340,
                        columnNumber: 11
                    }, this),
                    prefsError && stage === "face_reveal" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ai-error mt-4",
                        children: prefsError
                    }, void 0, false, {
                        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                        lineNumber: 348,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/appearance/AppearanceJourney.tsx",
                lineNumber: 261,
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
                lineNumber: 352,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/appearance/AppearanceJourney.tsx",
        lineNumber: 258,
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

//# sourceMappingURL=_5a11e911._.js.map