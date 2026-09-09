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
"[project]/lib/mediapipe.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
            const { FaceLandmarker, FilesetResolver } = await __turbopack_context__.A("[project]/node_modules/@mediapipe/tasks-vision/vision_bundle.mjs [app-client] (ecmascript, async loader)");
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
function canvasToJpegFile(canvas, originalName) {
    let suffix = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "oriented";
    return new Promise((resolve, reject)=>{
        canvas.toBlob((blob)=>{
            if (!blob) {
                reject(new Error("Failed to encode rotated image."));
                return;
            }
            const base = originalName.replace(/\.[^.]+$/, "") || "photo";
            resolve(new File([
                blob
            ], "".concat(base, "-").concat(suffix, ".jpg"), {
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
    } catch (e) {
        try {
            return await createImageBitmap(file);
        } catch (e) {
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
        } catch (e) {
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
    var _result_faceLandmarks_;
    const raw = (_result_faceLandmarks_ = result.faceLandmarks[0]) !== null && _result_faceLandmarks_ !== void 0 ? _result_faceLandmarks_ : null;
    if (!raw) {
        console.info("[MediaPipe] detect: no face", {
            w: canvas.width,
            h: canvas.height,
            faces: result.faceLandmarks.length
        });
        return null;
    }
    return raw.slice(0, FACE_MESH_COUNT).map((p)=>{
        var _p_z;
        return {
            x: p.x,
            y: p.y,
            z: (_p_z = p.z) !== null && _p_z !== void 0 ? _p_z : 0
        };
    });
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
 */ function cropAndUpscale(source, sx, sy, sw, sh) {
    let minSide = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 720;
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
                label: "full-q".concat(q)
            });
        }
        // Prefer anatomically upright full-frame hits (chin below eyes), then
        // level eyes / larger face. Eye-roll alone used to accept 180° flips.
        const bestFull = candidates.length ? [
            ...candidates
        ].sort(compareFaceCandidates)[0] : null;
        var _bestFull_canvas;
        // Crops only on the best upright orientation (never on sideways pixels).
        const baseForCrop = (_bestFull_canvas = bestFull === null || bestFull === void 0 ? void 0 : bestFull.canvas) !== null && _bestFull_canvas !== void 0 ? _bestFull_canvas : drawRotated(prepared, 0);
        const needsCrop = !bestFull || bestFull.span < 0.08 || bestFull.roll > 35 || !isFaceUpright(bestFull.landmarks);
        if (needsCrop) {
            const w = baseForCrop.width;
            const h = baseForCrop.height;
            var _bestFull_quarters;
            const cropQuarters = (_bestFull_quarters = bestFull === null || bestFull === void 0 ? void 0 : bestFull.quarters) !== null && _bestFull_quarters !== void 0 ? _bestFull_quarters : 0;
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
                        } catch (e) {
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
                            label: "q".concat(q, "-").concat(region.label)
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
        } catch (e) {
        /* already closed */ }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/profile.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * User lifestyle / demographics — styling context only (mirrors backend).
 * Never collect ethnicity/race.
 */ __turbopack_context__.s([
    "ACTIVITY_LABELS",
    ()=>ACTIVITY_LABELS,
    "ACTIVITY_LEVELS",
    ()=>ACTIVITY_LEVELS,
    "AGE_BANDS",
    ()=>AGE_BANDS,
    "AGE_BAND_LABELS",
    ()=>AGE_BAND_LABELS,
    "BUDGET_BANDS",
    ()=>BUDGET_BANDS,
    "BUDGET_LABELS",
    ()=>BUDGET_LABELS,
    "CLIMATES",
    ()=>CLIMATES,
    "CLIMATE_LABELS",
    ()=>CLIMATE_LABELS,
    "DRESS_CODES",
    ()=>DRESS_CODES,
    "DRESS_CODE_LABELS",
    ()=>DRESS_CODE_LABELS,
    "PRESENTATIONS",
    ()=>PRESENTATIONS,
    "PRESENTATION_LABELS",
    ()=>PRESENTATION_LABELS,
    "WORK_SETTINGS",
    ()=>WORK_SETTINGS,
    "WORK_SETTING_LABELS",
    ()=>WORK_SETTING_LABELS,
    "emptyProfileDraft",
    ()=>emptyProfileDraft
]);
const AGE_BANDS = [
    "18-24",
    "25-34",
    "35-44",
    "45-54",
    "55+"
];
const PRESENTATIONS = [
    "masculine",
    "feminine",
    "androgynous",
    "prefer_not"
];
const WORK_SETTINGS = [
    "office",
    "remote",
    "creative",
    "trades",
    "student",
    "other"
];
const ACTIVITY_LEVELS = [
    "low",
    "moderate",
    "high"
];
const CLIMATES = [
    "cool",
    "temperate",
    "warm",
    "varied"
];
const DRESS_CODES = [
    "casual",
    "smart_casual",
    "business",
    "uniform",
    "mixed"
];
const BUDGET_BANDS = [
    "low",
    "mid",
    "flexible"
];
const AGE_BAND_LABELS = {
    "18-24": "18–24",
    "25-34": "25–34",
    "35-44": "35–44",
    "45-54": "45–54",
    "55+": "55+"
};
const PRESENTATION_LABELS = {
    masculine: "Masculine",
    feminine: "Feminine",
    androgynous: "Androgynous",
    prefer_not: "Prefer not to say"
};
const WORK_SETTING_LABELS = {
    office: "Office",
    remote: "Remote",
    creative: "Creative",
    trades: "Trades / on-site",
    student: "Student",
    other: "Other"
};
const ACTIVITY_LABELS = {
    low: "Low",
    moderate: "Moderate",
    high: "High"
};
const CLIMATE_LABELS = {
    cool: "Cool",
    temperate: "Temperate",
    warm: "Warm",
    varied: "Varied"
};
const DRESS_CODE_LABELS = {
    casual: "Casual",
    smart_casual: "Smart casual",
    business: "Business",
    uniform: "Uniform",
    mixed: "Mixed"
};
const BUDGET_LABELS = {
    low: "Budget-conscious",
    mid: "Mid-range",
    flexible: "Flexible"
};
function emptyProfileDraft() {
    return {
        ageBand: "25-34",
        presentation: "prefer_not",
        lifestyle: {
            workSetting: "office",
            activity: "moderate",
            climate: "temperate",
            dressCode: "smart_casual",
            budgetBand: "mid"
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/profile/ProfileIntakeForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProfileIntakeForm",
    ()=>ProfileIntakeForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/profile.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function SelectField(param) {
    let { label, value, options, labels, onChange, dark } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "block space-y-1.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs font-medium uppercase tracking-[0.14em] ".concat(dark ? "text-white/45" : "text-neutral-500"),
                children: label
            }, void 0, false, {
                fileName: "[project]/components/profile/ProfileIntakeForm.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: value,
                onChange: (e)=>onChange(e.target.value),
                className: dark ? "w-full rounded-xl border border-white/15 bg-[#12141a] px-3 py-2.5 text-sm text-white outline-none focus:border-white/35" : "w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none focus:border-neutral-400",
                children: options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: opt,
                        children: labels[opt]
                    }, opt, false, {
                        fileName: "[project]/components/profile/ProfileIntakeForm.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/profile/ProfileIntakeForm.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/profile/ProfileIntakeForm.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_c = SelectField;
function ProfileIntakeForm(param) {
    let { initial, onSaved, compact = false, tone = "light" } = param;
    _s();
    const dark = tone === "dark";
    const draftBase = initial ? {
        ageBand: initial.ageBand,
        presentation: initial.presentation,
        lifestyle: {
            ...initial.lifestyle
        }
    } : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["emptyProfileDraft"])();
    const [ageBand, setAgeBand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(draftBase.ageBand);
    const [presentation, setPresentation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(draftBase.presentation);
    const [workSetting, setWorkSetting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(draftBase.lifestyle.workSetting);
    const [activity, setActivity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(draftBase.lifestyle.activity);
    const [climate, setClimate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(draftBase.lifestyle.climate);
    const [dressCode, setDressCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(draftBase.lifestyle.dressCode);
    const [budgetBand, setBudgetBand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(draftBase.lifestyle.budgetBand);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [done, setDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    async function submit(e) {
        e.preventDefault();
        setBusy(true);
        setError(null);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveProfile"])({
                ageBand,
                presentation,
                lifestyle: {
                    workSetting,
                    activity,
                    climate,
                    dressCode,
                    budgetBand
                }
            });
            setDone(true);
            onSaved(result.user, result.profile);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not save profile.");
        } finally{
            setBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: submit,
        className: "space-y-4 rounded-2xl border ".concat(dark ? "border-white/12 bg-[#1e2128] text-white" : "border-neutral-200 bg-white text-neutral-900", " ").concat(compact ? "p-4" : "p-5 sm:p-6"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs uppercase tracking-[0.16em] ".concat(dark ? "text-white/45" : "text-neutral-500"),
                        children: "Lifestyle profile"
                    }, void 0, false, {
                        fileName: "[project]/components/profile/ProfileIntakeForm.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mt-1 text-lg font-semibold tracking-tight ".concat(dark ? "text-white" : "text-neutral-950"),
                        children: "How you live & dress"
                    }, void 0, false, {
                        fileName: "[project]/components/profile/ProfileIntakeForm.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm ".concat(dark ? "text-white/50" : "text-neutral-500"),
                        children: "Used for styling context and outfit stills — never for ethnicity-based scoring."
                    }, void 0, false, {
                        fileName: "[project]/components/profile/ProfileIntakeForm.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/profile/ProfileIntakeForm.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3 sm:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectField, {
                        label: "Age band",
                        value: ageBand,
                        options: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AGE_BANDS"],
                        labels: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AGE_BAND_LABELS"],
                        onChange: setAgeBand,
                        dark: dark
                    }, void 0, false, {
                        fileName: "[project]/components/profile/ProfileIntakeForm.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectField, {
                        label: "Presentation",
                        value: presentation,
                        options: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRESENTATIONS"],
                        labels: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRESENTATION_LABELS"],
                        onChange: setPresentation,
                        dark: dark
                    }, void 0, false, {
                        fileName: "[project]/components/profile/ProfileIntakeForm.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectField, {
                        label: "Work setting",
                        value: workSetting,
                        options: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORK_SETTINGS"],
                        labels: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORK_SETTING_LABELS"],
                        onChange: setWorkSetting,
                        dark: dark
                    }, void 0, false, {
                        fileName: "[project]/components/profile/ProfileIntakeForm.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectField, {
                        label: "Activity",
                        value: activity,
                        options: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACTIVITY_LEVELS"],
                        labels: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACTIVITY_LABELS"],
                        onChange: setActivity,
                        dark: dark
                    }, void 0, false, {
                        fileName: "[project]/components/profile/ProfileIntakeForm.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectField, {
                        label: "Climate",
                        value: climate,
                        options: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLIMATES"],
                        labels: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLIMATE_LABELS"],
                        onChange: setClimate,
                        dark: dark
                    }, void 0, false, {
                        fileName: "[project]/components/profile/ProfileIntakeForm.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectField, {
                        label: "Dress code",
                        value: dressCode,
                        options: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DRESS_CODES"],
                        labels: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DRESS_CODE_LABELS"],
                        onChange: setDressCode,
                        dark: dark
                    }, void 0, false, {
                        fileName: "[project]/components/profile/ProfileIntakeForm.tsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectField, {
                        label: "Budget",
                        value: budgetBand,
                        options: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BUDGET_BANDS"],
                        labels: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BUDGET_LABELS"],
                        onChange: setBudgetBand,
                        dark: dark
                    }, void 0, false, {
                        fileName: "[project]/components/profile/ProfileIntakeForm.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/profile/ProfileIntakeForm.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm ".concat(dark ? "text-rose-300" : "text-red-600"),
                role: "alert",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/profile/ProfileIntakeForm.tsx",
                lineNumber: 231,
                columnNumber: 9
            }, this) : null,
            done ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm ".concat(dark ? "text-emerald-300" : "text-emerald-700"),
                children: "Profile saved."
            }, void 0, false, {
                fileName: "[project]/components/profile/ProfileIntakeForm.tsx",
                lineNumber: 239,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                disabled: busy,
                className: "cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium transition disabled:opacity-60 ".concat(dark ? "bg-white text-neutral-950 hover:bg-white/90" : "bg-neutral-950 text-white hover:bg-neutral-800"),
                children: busy ? "Saving…" : initial ? "Update profile" : "Save profile"
            }, void 0, false, {
                fileName: "[project]/components/profile/ProfileIntakeForm.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/profile/ProfileIntakeForm.tsx",
        lineNumber: 142,
        columnNumber: 5
    }, this);
}
_s(ProfileIntakeForm, "ddp7NIbXs4OyxAk7tWU4rlcC5eA=");
_c1 = ProfileIntakeForm;
var _c, _c1;
__turbopack_context__.k.register(_c, "SelectField");
__turbopack_context__.k.register(_c1, "ProfileIntakeForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/report/LookTrackPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LookTrackPanel",
    ()=>LookTrackPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mediapipe$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mediapipe.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/types/report.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$profile$2f$ProfileIntakeForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/profile/ProfileIntakeForm.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function recommendationsFromDiffs(diffs) {
    return [
        ...diffs
    ].filter((d)=>d.measurable && d.gap >= 8).sort((a, b)=>b.gap - a.gap).slice(0, 5).map((d)=>{
        var _FEATURE_LABELS_d_feature;
        const label = (_FEATURE_LABELS_d_feature = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][d.feature]) !== null && _FEATURE_LABELS_d_feature !== void 0 ? _FEATURE_LABELS_d_feature : d.feature;
        let action = "Close the gap on ".concat(label, " toward your reference look.");
        if (d.feature === "skin_clarity") {
            action = "Match the reference skin clarity with consistent gentle skincare and even lighting in check-in photos.";
        } else if (d.feature === "grooming_signal") {
            action = "Echo the reference grooming: cleaner edges, outfit clarity, and intentional styling in your next shoot.";
        } else if (d.feature === "jawline_definition") {
            action = "Improve jawline read with posture, lighting angle, and grooming along the jaw contour.";
        } else if (d.feature === "eyebrow_shape") {
            action = "Shape and fill brows to better mirror the reference arch and density.";
        }
        return {
            feature: d.feature,
            action,
            effort: d.gap > 25 ? "medium" : "low",
            confidence: d.confidence.toLowerCase()
        };
    });
}
function LookTrackPanel(param) {
    let { baselineReport, isAuthed, isPro = false, onUserChange, tone = "dark" } = param;
    _s();
    const [profileComplete, setProfileComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [targetReport, setTargetReport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [recs, setRecs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [refConsent, setRefConsent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [replaceBusy, setReplaceBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    var _baselineReport_baselineReportId;
    const baselineId = baselineReport.kind === "target_look" ? (_baselineReport_baselineReportId = baselineReport.baselineReportId) !== null && _baselineReport_baselineReportId !== void 0 ? _baselineReport_baselineReportId : baselineReport.id : baselineReport.id;
    const refresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LookTrackPanel.useCallback[refresh]": async ()=>{
            if (!isAuthed) {
                setLoading(false);
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const p = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchProfile"])();
                setProfile(p.profile);
                setProfileComplete(p.profileComplete);
                onUserChange === null || onUserChange === void 0 ? void 0 : onUserChange(p.user);
                const target = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTargetLookReport"])(baselineId);
                setTargetReport(target);
                if (target) {
                    var _target_targetDiff;
                    setRecs(recommendationsFromDiffs((_target_targetDiff = target.targetDiff) !== null && _target_targetDiff !== void 0 ? _target_targetDiff : []));
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load look track.");
            } finally{
                setLoading(false);
            }
        }
    }["LookTrackPanel.useCallback[refresh]"], [
        baselineId,
        isAuthed,
        onUserChange
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LookTrackPanel.useEffect": ()=>{
            void refresh();
        }
    }["LookTrackPanel.useEffect"], [
        refresh
    ]);
    const rankedDiffs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LookTrackPanel.useMemo[rankedDiffs]": ()=>{
            var _targetReport_targetDiff;
            const diffs = (_targetReport_targetDiff = targetReport === null || targetReport === void 0 ? void 0 : targetReport.targetDiff) !== null && _targetReport_targetDiff !== void 0 ? _targetReport_targetDiff : [];
            return [
                ...diffs
            ].sort({
                "LookTrackPanel.useMemo[rankedDiffs]": (a, b)=>{
                    if (a.measurable !== b.measurable) return a.measurable ? -1 : 1;
                    return b.gap - a.gap;
                }
            }["LookTrackPanel.useMemo[rankedDiffs]"]);
        }
    }["LookTrackPanel.useMemo[rankedDiffs]"], [
        targetReport
    ]);
    async function onReferenceSelected(file) {
        if (!file) return;
        if (!refConsent) {
            setError("Confirm reference photo retention before uploading.");
            return;
        }
        setBusy(true);
        setError(null);
        try {
            var _extracted_landmarks;
            const extracted = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mediapipe$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractFaceLandmarksFromFile"])(file);
            if (!((_extracted_landmarks = extracted.landmarks) === null || _extracted_landmarks === void 0 ? void 0 : _extracted_landmarks.length)) {
                throw new Error("Couldn't find a clear face. Full-body or looking-down shots often fail — try a closer crop of the face looking toward the camera.");
            }
            const formData = new FormData();
            formData.append("file", extracted.fileForUpload);
            formData.append("retainForTracking", "true");
            formData.append("landmarks", JSON.stringify(extracted.landmarks));
            const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("zelko.authToken") : "TURBOPACK unreachable";
            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                headers: token ? {
                    Authorization: "Bearer ".concat(token)
                } : undefined,
                body: formData
            });
            const uploadData = await uploadRes.json().catch(()=>null);
            if (!uploadRes.ok || !(uploadData === null || uploadData === void 0 ? void 0 : uploadData.fileId)) {
                var _uploadData_error;
                throw new Error((_uploadData_error = uploadData === null || uploadData === void 0 ? void 0 : uploadData.error) !== null && _uploadData_error !== void 0 ? _uploadData_error : "Reference upload failed.");
            }
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeTargetLook"])({
                baselineReportId: baselineId,
                referenceFileId: uploadData.fileId,
                referenceLandmarks: extracted.landmarks
            });
            setTargetReport(result.report);
            var _result_report_targetDiff;
            setRecs(result.recommendations.length > 0 ? result.recommendations : recommendationsFromDiffs((_result_report_targetDiff = result.report.targetDiff) !== null && _result_report_targetDiff !== void 0 ? _result_report_targetDiff : []));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Target-look analysis failed.");
        } finally{
            setBusy(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    }
    if (!isAuthed) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "look-track-panel report-glass rounded-2xl p-5 sm:p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[11px] font-medium uppercase tracking-[0.16em] text-white/40",
                    children: "Toward your look"
                }, void 0, false, {
                    fileName: "[project]/components/report/LookTrackPanel.tsx",
                    lineNumber: 191,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "mt-1 text-lg font-semibold text-white",
                    children: "Diff against a reference"
                }, void 0, false, {
                    fileName: "[project]/components/report/LookTrackPanel.tsx",
                    lineNumber: 194,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 text-sm text-white/50",
                    children: "Sign in to add a lifestyle profile, upload a reference photo, and compare skin, grooming, and facial features against the look you want."
                }, void 0, false, {
                    fileName: "[project]/components/report/LookTrackPanel.tsx",
                    lineNumber: 197,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/login?next=/report/".concat(baselineReport.id),
                    className: "mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-950",
                    children: "Sign in to continue"
                }, void 0, false, {
                    fileName: "[project]/components/report/LookTrackPanel.tsx",
                    lineNumber: 201,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/report/LookTrackPanel.tsx",
            lineNumber: 190,
            columnNumber: 7
        }, this);
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "look-track-panel report-glass rounded-2xl p-5 text-sm text-white/45",
            children: "Loading toward your look…"
        }, void 0, false, {
            fileName: "[project]/components/report/LookTrackPanel.tsx",
            lineNumber: 213,
            columnNumber: 7
        }, this);
    }
    var _targetReport_referencePortraitFileId;
    const refUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portraitUrl"])((_targetReport_referencePortraitFileId = targetReport === null || targetReport === void 0 ? void 0 : targetReport.referencePortraitFileId) !== null && _targetReport_referencePortraitFileId !== void 0 ? _targetReport_referencePortraitFileId : targetReport === null || targetReport === void 0 ? void 0 : targetReport.referenceFileId);
    const youUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portraitUrl"])(baselineReport.portraitFileId);
    var _targetReport_overallAlignment, _targetReport_overallAlignment1;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "look-track-panel report-glass space-y-5 rounded-2xl p-5 sm:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] font-medium uppercase tracking-[0.16em] text-white/40",
                        children: "Toward your look"
                    }, void 0, false, {
                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mt-1 text-lg font-semibold text-white",
                        children: "Diff against a reference"
                    }, void 0, false, {
                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 max-w-xl text-sm text-white/45",
                        children: "Set lifestyle context, then upload a reference photo. We compare landmarks, skin clarity, and grooming — not ethnicity."
                    }, void 0, false, {
                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/LookTrackPanel.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-rose-300",
                role: "alert",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/report/LookTrackPanel.tsx",
                lineNumber: 240,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$profile$2f$ProfileIntakeForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProfileIntakeForm"], {
                initial: profile,
                compact: true,
                tone: tone,
                onSaved: (user, saved)=>{
                    onUserChange === null || onUserChange === void 0 ? void 0 : onUserChange(user);
                    setProfile(saved);
                    setProfileComplete(true);
                }
            }, void 0, false, {
                fileName: "[project]/components/report/LookTrackPanel.tsx",
                lineNumber: 245,
                columnNumber: 7
            }, this),
            !profileComplete ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-white/45",
                children: "Save your lifestyle profile first — it shapes styling context for this reference diff."
            }, void 0, false, {
                fileName: "[project]/components/report/LookTrackPanel.tsx",
                lineNumber: 257,
                columnNumber: 9
            }, this) : !targetReport ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-white/55",
                        children: "Upload a reference photo of the look you want. Closer face crops work best — we auto-zoom full-body shots when we can."
                    }, void 0, false, {
                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                        lineNumber: 263,
                        columnNumber: 15
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-start gap-2.5 text-sm text-white/55",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: refConsent,
                                onChange: (e)=>setRefConsent(e.target.checked),
                                className: "mt-1 accent-white"
                            }, void 0, false, {
                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                lineNumber: 268,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Keep this reference photo so we can re-diff. You can delete linked reports anytime."
                            }, void 0, false, {
                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                lineNumber: 274,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                        lineNumber: 267,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                disabled: busy || !refConsent,
                                onClick: ()=>{
                                    var _fileInputRef_current;
                                    return (_fileInputRef_current = fileInputRef.current) === null || _fileInputRef_current === void 0 ? void 0 : _fileInputRef_current.click();
                                },
                                className: "inline-flex cursor-pointer rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-white/90 disabled:opacity-50",
                                children: busy ? "Analyzing…" : "Upload reference photo"
                            }, void 0, false, {
                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                lineNumber: 280,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: fileInputRef,
                                type: "file",
                                accept: "image/jpeg,image/png,image/webp",
                                className: "hidden",
                                disabled: busy,
                                onChange: (e)=>{
                                    var _e_target_files;
                                    var _e_target_files_;
                                    return void onReferenceSelected((_e_target_files_ = (_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0]) !== null && _e_target_files_ !== void 0 ? _e_target_files_ : null);
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                lineNumber: 288,
                                columnNumber: 13
                            }, this),
                            busy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-white/40",
                                children: "Landmarks + skin + grooming…"
                            }, void 0, false, {
                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                lineNumber: 299,
                                columnNumber: 15
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                        lineNumber: 279,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/LookTrackPanel.tsx",
                lineNumber: 262,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-4 py-3 sm:px-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] font-medium uppercase tracking-[0.16em] text-white/40",
                                                children: "Alignment to this reference"
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                lineNumber: 311,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-0.5 text-3xl font-semibold tabular-nums tracking-tight text-white",
                                                children: [
                                                    (_targetReport_overallAlignment = targetReport.overallAlignment) !== null && _targetReport_overallAlignment !== void 0 ? _targetReport_overallAlignment : "—",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-1 text-sm font-medium text-white/40",
                                                        children: "/ 100"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                        lineNumber: 316,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                lineNumber: 314,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                        lineNumber: 310,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        disabled: replaceBusy,
                                        className: "cursor-pointer text-sm text-white/45 underline-offset-2 hover:text-white hover:underline disabled:opacity-50",
                                        onClick: ()=>{
                                            void (async ()=>{
                                                if (!targetReport) return;
                                                const ok = window.confirm("Remove this reference look? You can upload a new one after.");
                                                if (!ok) return;
                                                setReplaceBusy(true);
                                                setError(null);
                                                try {
                                                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteMyReport"])(targetReport.id);
                                                    setTargetReport(null);
                                                    setRecs([]);
                                                    setRefConsent(false);
                                                } catch (err) {
                                                    setError(err instanceof Error ? err.message : "Could not remove reference.");
                                                } finally{
                                                    setReplaceBusy(false);
                                                }
                                            })();
                                        },
                                        children: replaceBusy ? "Removing…" : "Replace reference"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                        lineNumber: 321,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                lineNumber: 309,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.15fr)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-2 p-3 sm:gap-3 sm:p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
                                                className: "relative overflow-hidden rounded-xl bg-black/30",
                                                children: [
                                                    youUrl ? // eslint-disable-next-line @next/next/no-img-element
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: youUrl,
                                                        alt: "You",
                                                        className: "aspect-[3/4] w-full object-cover object-top"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                        lineNumber: 360,
                                                        columnNumber: 21
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex aspect-[3/4] items-center justify-center text-sm text-white/35",
                                                        children: "You"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                        lineNumber: 366,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                                                        className: "absolute bottom-2 left-2 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90",
                                                        children: "You"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                        lineNumber: 370,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                lineNumber: 357,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
                                                className: "relative overflow-hidden rounded-xl bg-black/30",
                                                children: [
                                                    refUrl ? // eslint-disable-next-line @next/next/no-img-element
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: refUrl,
                                                        alt: "Reference look",
                                                        className: "aspect-[3/4] w-full object-cover object-top"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                        lineNumber: 377,
                                                        columnNumber: 21
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex aspect-[3/4] items-center justify-center text-sm text-white/35",
                                                        children: "Reference"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                        lineNumber: 383,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                                                        className: "absolute bottom-2 left-2 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90",
                                                        children: "Reference"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                lineNumber: 374,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                        lineNumber: 356,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-t border-white/8 p-3 sm:p-4 lg:border-l lg:border-t-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white/40",
                                                children: "Feature alignment"
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                lineNumber: 394,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "space-y-3",
                                                children: rankedDiffs.map((d)=>{
                                                    var _FEATURE_LABELS_d_feature;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-baseline justify-between gap-2 text-sm",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium text-white/90",
                                                                        children: (_FEATURE_LABELS_d_feature = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][d.feature]) !== null && _FEATURE_LABELS_d_feature !== void 0 ? _FEATURE_LABELS_d_feature : d.feature
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                                        lineNumber: 401,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    d.measurable ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "shrink-0 tabular-nums text-[11px] text-white/40",
                                                                        children: [
                                                                            "You ",
                                                                            d.userScore,
                                                                            " · Ref ",
                                                                            d.referenceScore
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                                        lineNumber: 405,
                                                                        columnNumber: 27
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px] text-white/30",
                                                                        children: "Not comparable"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                                        lineNumber: 409,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                                lineNumber: 400,
                                                                columnNumber: 23
                                                            }, this),
                                                            d.measurable ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-1.5 flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "h-1.5 flex-1 overflow-hidden rounded-full bg-white/10",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "h-full rounded-full bg-white/70",
                                                                            style: {
                                                                                width: "".concat(Math.max(4, Math.min(100, d.alignment)), "%")
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                                            lineNumber: 417,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                                        lineNumber: 416,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "w-7 text-right text-[11px] tabular-nums text-white/50",
                                                                        children: d.alignment
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                                        lineNumber: 424,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                                lineNumber: 415,
                                                                columnNumber: 25
                                                            }, this) : null
                                                        ]
                                                    }, d.feature, true, {
                                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                        lineNumber: 399,
                                                        columnNumber: 21
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                lineNumber: 397,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                        lineNumber: 393,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                lineNumber: 355,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                        lineNumber: 308,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-b border-white/8 px-4 py-3 sm:px-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] font-medium uppercase tracking-[0.16em] text-white/40",
                                        children: "Your roadmap"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                        lineNumber: 439,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "mt-0.5 text-lg font-semibold text-white",
                                        children: "From here to this look"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                        lineNumber: 442,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 max-w-xl text-sm text-white/45",
                                        children: "Ordered steps based on the biggest gaps — act, then re-check under the same light."
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                        lineNumber: 445,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                lineNumber: 438,
                                columnNumber: 13
                            }, this),
                            isPro ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                className: "space-y-0 p-4 sm:p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "relative flex gap-3 pb-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-bold text-neutral-950",
                                                "aria-hidden": true,
                                                children: "1"
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                lineNumber: 454,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-semibold text-white",
                                                        children: "Where you are"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                        lineNumber: 461,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-sm text-white/50",
                                                        children: [
                                                            "Alignment ",
                                                            (_targetReport_overallAlignment1 = targetReport.overallAlignment) !== null && _targetReport_overallAlignment1 !== void 0 ? _targetReport_overallAlignment1 : "—",
                                                            "/100 to this reference. Baseline composite",
                                                            " ",
                                                            baselineReport.overallScore,
                                                            "."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                        lineNumber: 464,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                lineNumber: 460,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                        lineNumber: 453,
                                        columnNumber: 17
                                    }, this),
                                    (recs.length > 0 ? recs : rankedDiffs.filter((d)=>d.measurable && d.gap >= 5).slice(0, 4).map((d)=>{
                                        var _FEATURE_LABELS_d_feature;
                                        return {
                                            feature: d.feature,
                                            action: "Close the gap on ".concat((_FEATURE_LABELS_d_feature = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][d.feature]) !== null && _FEATURE_LABELS_d_feature !== void 0 ? _FEATURE_LABELS_d_feature : d.feature, "."),
                                            effort: d.gap > 25 ? "medium" : "low",
                                            confidence: d.confidence.toLowerCase()
                                        };
                                    })).map((r, i)=>{
                                        var _FEATURE_LABELS_r_feature;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "relative flex gap-3 pb-5 last:pb-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[11px] font-bold text-white/80",
                                                    "aria-hidden": true,
                                                    children: i + 2
                                                }, void 0, false, {
                                                    fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                    lineNumber: 487,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-semibold text-white",
                                                            children: [
                                                                (_FEATURE_LABELS_r_feature = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][r.feature]) !== null && _FEATURE_LABELS_r_feature !== void 0 ? _FEATURE_LABELS_r_feature : r.feature,
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "ml-2 text-[10px] font-medium uppercase tracking-[0.12em] text-white/35",
                                                                    children: [
                                                                        r.effort,
                                                                        " effort"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                                    lineNumber: 497,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                            lineNumber: 494,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-1 text-sm text-white/55",
                                                            children: r.action
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                            lineNumber: 501,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                    lineNumber: 493,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, "".concat(r.feature, "-").concat(r.action), true, {
                                            fileName: "[project]/components/report/LookTrackPanel.tsx",
                                            lineNumber: 483,
                                            columnNumber: 19
                                        }, this);
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "relative flex gap-3 border-t border-white/8 pt-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-white/25 text-[11px] font-bold text-white/70",
                                                "aria-hidden": true,
                                                children: "✓"
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                lineNumber: 506,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-semibold text-white",
                                                        children: "Where you want to be"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                        lineNumber: 513,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-sm text-white/50",
                                                        children: "Re-upload weekly under consistent lighting to prove movement toward this reference — never framed as a decline."
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                        lineNumber: 516,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/upload",
                                                        className: "mt-3 inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-white/90",
                                                        children: "Schedule next check-in"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                        lineNumber: 521,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                lineNumber: 512,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                        lineNumber: 505,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                lineNumber: 452,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative px-4 py-6 sm:px-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                        className: "pointer-events-none select-none space-y-4 blur-[5px]",
                                        "aria-hidden": true,
                                        children: [
                                            "Where you are — current alignment",
                                            "Close the largest gap first",
                                            "Lock lighting and angle for check-ins",
                                            "Where you want to be — prove the shift"
                                        ].map((label, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex size-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-[11px] font-bold text-white/50",
                                                        children: i + 1
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                        lineNumber: 543,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-white/55",
                                                        children: label
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                        lineNumber: 546,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, label, true, {
                                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                lineNumber: 542,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                        lineNumber: 532,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 flex flex-col items-center justify-center bg-[#1a1c20]/55 px-5 text-center backdrop-blur-[2px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold text-white",
                                                children: "Unlock your roadmap with Pro"
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                lineNumber: 551,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 max-w-sm text-sm text-white/50",
                                                children: "See the ordered path from this score to your reference look — plus weekly tracking to prove change."
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                lineNumber: 554,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/pricing",
                                                className: "mt-4 inline-flex rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-white/90",
                                                children: "Upgrade to Pro"
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                                lineNumber: 558,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                                        lineNumber: 550,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/LookTrackPanel.tsx",
                                lineNumber: 531,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/LookTrackPanel.tsx",
                        lineNumber: 437,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/LookTrackPanel.tsx",
                lineNumber: 306,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/report/LookTrackPanel.tsx",
        lineNumber: 225,
        columnNumber: 5
    }, this);
}
_s(LookTrackPanel, "S01TGadEafkxFifOvJeAt60NBZM=");
_c = LookTrackPanel;
var _c;
__turbopack_context__.k.register(_c, "LookTrackPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/report/OutfitRecommendPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OutfitRecommendPanel",
    ()=>OutfitRecommendPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function OutfitRecommendPanel(param) {
    let { baselineReportId, isAuthed, reportPath, onUserChange, compact = false } = param;
    _s();
    const [stills, setStills] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [recommendation, setRecommendation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [cap, setCap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(3);
    const [used, setUsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [remaining, setRemaining] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(3);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(isAuthed);
    const refresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "OutfitRecommendPanel.useCallback[refresh]": async ()=>{
            if (!isAuthed) {
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                var _outfits_stills_;
                const outfits = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchOutfitStills"])(baselineReportId);
                setStills(outfits.stills);
                setCap(outfits.cap);
                setUsed(outfits.used);
                setRemaining(outfits.remaining);
                onUserChange === null || onUserChange === void 0 ? void 0 : onUserChange(outfits.user);
                const meta = (_outfits_stills_ = outfits.stills[0]) === null || _outfits_stills_ === void 0 ? void 0 : _outfits_stills_.promptMeta;
                if ((meta === null || meta === void 0 ? void 0 : meta.recommendedStyle) && (meta === null || meta === void 0 ? void 0 : meta.rationale)) {
                    var _meta_eyeColor, _meta_hairColor, _meta_complementaryColors;
                    setRecommendation({
                        eyeColor: (_meta_eyeColor = meta.eyeColor) !== null && _meta_eyeColor !== void 0 ? _meta_eyeColor : "",
                        hairColor: (_meta_hairColor = meta.hairColor) !== null && _meta_hairColor !== void 0 ? _meta_hairColor : "",
                        undertone: "",
                        complementaryColors: (_meta_complementaryColors = meta.complementaryColors) !== null && _meta_complementaryColors !== void 0 ? _meta_complementaryColors : [],
                        recommendedStyle: meta.recommendedStyle,
                        rationale: meta.rationale
                    });
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load outfits.");
            } finally{
                setLoading(false);
            }
        }
    }["OutfitRecommendPanel.useCallback[refresh]"], [
        baselineReportId,
        isAuthed,
        onUserChange
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OutfitRecommendPanel.useEffect": ()=>{
            void refresh();
        }
    }["OutfitRecommendPanel.useEffect"], [
        refresh
    ]);
    async function onGenerate() {
        setBusy(true);
        setError(null);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateOutfitStill"])(baselineReportId);
            setStills((prev)=>[
                    result.still,
                    ...prev
                ]);
            setCap(result.cap);
            setUsed(result.used);
            setRemaining(result.remaining);
            if (result.recommendation) setRecommendation(result.recommendation);
            onUserChange === null || onUserChange === void 0 ? void 0 : onUserChange(result.user);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to generate outfit.");
        } finally{
            setBusy(false);
        }
    }
    if (!isAuthed) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "report-glass rounded-3xl p-5 text-center text-white",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs uppercase tracking-[0.16em] text-white/40",
                    children: "Outfit"
                }, void 0, false, {
                    fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 text-sm text-white/65",
                    children: "Sign in to generate up to 3 outfits matched to your face, eyes, and hair."
                }, void 0, false, {
                    fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/login?reportId=".concat(encodeURIComponent(baselineReportId), "&next=").concat(encodeURIComponent(reportPath)),
                    className: "mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-950",
                    children: "Sign in to generate"
                }, void 0, false, {
                    fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
            lineNumber: 114,
            columnNumber: 7
        }, this);
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "report-glass rounded-3xl p-5 text-sm text-white/45",
            children: "Loading outfit…"
        }, void 0, false, {
            fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
            lineNumber: 134,
            columnNumber: 7
        }, this);
    }
    const latestSrc = stills.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portraitUrl"])(stills[0].fileId) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "report-glass space-y-4 rounded-3xl p-5 text-white ".concat(compact ? "sm:space-y-3" : ""),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: compact ? "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between" : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs uppercase tracking-[0.16em] text-white/40",
                                children: "Outfit recommendation"
                            }, void 0, false, {
                                fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "mt-1 text-base font-semibold text-white",
                                children: "Looks for your face"
                            }, void 0, false, {
                                fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs leading-relaxed text-white/45",
                                children: "Colors and style from your eyes, hair, and undertone — up to 3 stills from your uploaded face."
                            }, void 0, false, {
                                fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-[11px] text-white/35",
                                children: [
                                    used,
                                    " / ",
                                    cap,
                                    " used · ",
                                    remaining,
                                    " remaining"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2 ".concat(compact ? "shrink-0" : ""),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            disabled: busy || remaining <= 0,
                            onClick: ()=>void onGenerate(),
                            className: "rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-950 disabled:opacity-50",
                            children: busy ? "Generating…" : remaining > 0 ? used === 0 ? "Generate recommended outfit" : "Generate another outfit" : "Outfit limit reached"
                        }, void 0, false, {
                            fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                            lineNumber: 173,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-amber-200/90",
                role: "alert",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                lineNumber: 191,
                columnNumber: 9
            }, this) : null,
            recommendation ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl bg-white/5 px-3.5 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-medium text-white/90",
                        children: recommendation.recommendedStyle
                    }, void 0, false, {
                        fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                        lineNumber: 198,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs leading-relaxed text-white/55",
                        children: recommendation.rationale
                    }, void 0, false, {
                        fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                        lineNumber: 201,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-[11px] text-white/40",
                        children: [
                            "Eyes ",
                            recommendation.eyeColor || "—",
                            " · Hair",
                            " ",
                            recommendation.hairColor || "—",
                            recommendation.complementaryColors.length > 0 ? " · ".concat(recommendation.complementaryColors.join(", ")) : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                        lineNumber: 204,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                lineNumber: 197,
                columnNumber: 9
            }, this) : null,
            latestSrc || stills.length > 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: compact ? "grid grid-cols-[minmax(0,11rem)_1fr] gap-3 sm:grid-cols-[minmax(0,14rem)_1fr]" : "space-y-3",
                children: [
                    latestSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-hidden rounded-2xl",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: latestSrc,
                            alt: "Recommended outfit",
                            className: "aspect-[3/4] w-full object-cover"
                        }, void 0, false, {
                            fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                            lineNumber: 225,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                        lineNumber: 223,
                        columnNumber: 13
                    }, this) : null,
                    stills.length > 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: compact ? "grid grid-cols-3 gap-2 self-start sm:grid-cols-2 md:grid-cols-3" : "grid grid-cols-3 gap-2",
                        children: stills.slice(1).map((s)=>{
                            const src = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portraitUrl"])(s.fileId);
                            if (!src) return null;
                            return(// eslint-disable-next-line @next/next/no-img-element
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: src,
                                alt: "Earlier outfit still",
                                className: "aspect-[3/4] w-full rounded-xl object-cover"
                            }, s.id, false, {
                                fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                                lineNumber: 246,
                                columnNumber: 19
                            }, this));
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                        lineNumber: 234,
                        columnNumber: 13
                    }, this) : compact && latestSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "self-center text-xs text-white/40",
                        children: "Generate another look to fill your remaining stills."
                    }, void 0, false, {
                        fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                        lineNumber: 256,
                        columnNumber: 13
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
                lineNumber: 215,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/report/OutfitRecommendPanel.tsx",
        lineNumber: 144,
        columnNumber: 5
    }, this);
}
_s(OutfitRecommendPanel, "0k/PTSOD/alFv2Wdse5pGe7CGJ8=");
_c = OutfitRecommendPanel;
var _c;
__turbopack_context__.k.register(_c, "OutfitRecommendPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard/OutfitsSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EbayLooksCard",
    ()=>EbayLooksCard,
    "JourneyLooksGallery",
    ()=>JourneyLooksGallery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function EbayLooksCard(param) {
    let { reportId, looks } = param;
    const readyLooks = looks.filter((l)=>l.status === "ready");
    const prompts = readyLooks.length > 0 ? readyLooks : [
        {
            id: "placeholder",
            index: 0,
            label: "Signature look",
            recommendedStyle: "casual midi dress neutrals"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "account-dash__card p-5 sm:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-start justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/40",
                                children: "eBay matches"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-1 text-lg font-semibold tracking-tight text-white",
                                children: "Shoppable looks"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 max-w-xl text-sm text-white/50",
                                children: "Affiliate listings matched to your prescribed outfits. Links stay free — live Browse API results land here next."
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    reportId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/appearance/".concat(reportId),
                        className: "shrink-0 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/10",
                        children: "Open style journey"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-5 grid gap-3 sm:grid-cols-1",
                children: prompts.slice(0, 1).map((look, i)=>{
                    const query = encodeURIComponent((look.recommendedStyle || look.label || "outfit").slice(0, 80));
                    const href = "https://www.ebay.com/sch/i.html?_nkw=".concat(query);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "rounded-2xl border border-white/10 bg-white/[0.03] p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] font-medium uppercase tracking-[0.14em] text-white/40",
                                children: look.label
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                                lineNumber: 71,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm font-medium text-white/85 line-clamp-3",
                                children: look.recommendedStyle || "Style match coming soon"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                                lineNumber: 74,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: href,
                                target: "_blank",
                                rel: "noopener noreferrer sponsored",
                                className: "mt-4 inline-flex text-xs font-semibold text-white/70 underline-offset-4 hover:text-white hover:underline",
                                children: "Search on eBay →"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                                lineNumber: 77,
                                columnNumber: 15
                            }, this)
                        ]
                    }, look.id || "ebay-".concat(i), true, {
                        fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                        lineNumber: 67,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/OutfitsSection.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c = EbayLooksCard;
function JourneyLooksGallery(param) {
    let { reportId } = param;
    _s();
    const [looks, setLooks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "JourneyLooksGallery.useEffect": ()=>{
            let cancelled = false;
            ({
                "JourneyLooksGallery.useEffect": async ()=>{
                    setLoading(true);
                    setError(null);
                    try {
                        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
                        const res = await fetch("/api/appearance/".concat(reportId), {
                            headers: token ? {
                                Authorization: "Bearer ".concat(token)
                            } : {},
                            cache: "no-store"
                        });
                        const data = await res.json();
                        if (!res.ok || !data.journey) {
                            if (!cancelled) {
                                setLooks([]);
                                var _data_error;
                                setError((_data_error = data.error) !== null && _data_error !== void 0 ? _data_error : null);
                            }
                            return;
                        }
                        if (!cancelled) {
                            var _data_journey_looks;
                            setLooks((_data_journey_looks = data.journey.looks) !== null && _data_journey_looks !== void 0 ? _data_journey_looks : []);
                        }
                    } catch (e) {
                        if (!cancelled) setError("Could not load prescribed looks.");
                    } finally{
                        if (!cancelled) setLoading(false);
                    }
                }
            })["JourneyLooksGallery.useEffect"]();
            return ({
                "JourneyLooksGallery.useEffect": ()=>{
                    cancelled = true;
                }
            })["JourneyLooksGallery.useEffect"];
        }
    }["JourneyLooksGallery.useEffect"], [
        reportId
    ]);
    const ready = looks.filter((l)=>l.status === "ready" && l.fileId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "account-dash__card p-5 sm:p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-end justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/40",
                                        children: "Prescribed looks"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                                        lineNumber: 145,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-1 text-lg font-semibold tracking-tight text-white",
                                        children: "From your appearance journey"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-sm text-white/50",
                                        children: "The three style stills generated after your Face + Style reveal."
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                                        lineNumber: 151,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/appearance/".concat(reportId),
                                className: "text-xs font-semibold text-white/70 underline-offset-4 hover:underline",
                                children: ready.length ? "Regenerate in journey →" : "Generate looks →"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-5 text-sm text-white/45",
                        children: "Loading looks…"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                        lineNumber: 164,
                        columnNumber: 11
                    }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-5 text-sm text-amber-200/90",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                        lineNumber: 166,
                        columnNumber: 11
                    }, this) : ready.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-5 text-sm text-white/45",
                        children: "No prescribed looks yet. Finish the style journey to generate them."
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 grid gap-3 sm:grid-cols-2",
                        children: ready.map((look)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: "overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/api/files/".concat(look.fileId),
                                        alt: look.label,
                                        className: "aspect-[3/4] w-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                                        lineNumber: 179,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-semibold text-white",
                                                children: look.label
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                                                lineNumber: 185,
                                                columnNumber: 19
                                            }, this),
                                            look.recommendedStyle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-xs leading-relaxed text-white/50 line-clamp-3",
                                                children: look.recommendedStyle
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                                                lineNumber: 189,
                                                columnNumber: 21
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                                        lineNumber: 184,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, look.id, true, {
                                fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                                lineNumber: 174,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                        lineNumber: 172,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EbayLooksCard, {
                reportId: reportId,
                looks: looks
            }, void 0, false, {
                fileName: "[project]/components/dashboard/OutfitsSection.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(JourneyLooksGallery, "qjejkabxJGC4vRuvOxdibtl7w4o=");
_c1 = JourneyLooksGallery;
var _c, _c1;
__turbopack_context__.k.register(_c, "EbayLooksCard");
__turbopack_context__.k.register(_c1, "JourneyLooksGallery");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/AccountDashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AccountDashboard",
    ()=>AccountDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/types/report.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/score-tone.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/recommendations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$LookTrackPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/report/LookTrackPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$OutfitRecommendPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/report/OutfitRecommendPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$OutfitsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/OutfitsSection.tsx [app-client] (ecmascript)");
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
const RING_FEATURES = [
    {
        key: "overall",
        label: "Overall"
    },
    {
        key: "skin_clarity",
        label: "Clarity"
    },
    {
        key: "jawline_definition",
        label: "Jawline"
    },
    {
        key: "face_symmetry",
        label: "Symmetry"
    },
    {
        key: "facial_proportions",
        label: "Balance"
    }
];
function AccountDashboard(param) {
    let { user, theme = "dark", onToggleTheme, onUserChange, onSignOut } = param;
    var _user_firstName;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const modeParam = searchParams.get("mode");
    const viewParam = searchParams.get("view");
    const dashView = viewParam === "outfits" ? "outfits" : "overview";
    const [analysisMode, setAnalysisMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(modeParam === "target" ? "target" : "assistant");
    const [reports, setReports] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deletingId, setDeletingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [billingBusy, setBillingBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [billingMessage, setBillingMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [avatarBusy, setAvatarBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AccountDashboard.useEffect": ()=>{
            setAnalysisMode(modeParam === "target" ? "target" : "assistant");
        }
    }["AccountDashboard.useEffect"], [
        modeParam
    ]);
    function selectMode(mode) {
        setAnalysisMode(mode);
        const params = new URLSearchParams(searchParams.toString());
        params.delete("view");
        if (mode === "target") params.set("mode", "target");
        else params.delete("mode");
        const q = params.toString();
        router.replace(q ? "/dashboard?".concat(q) : "/dashboard", {
            scroll: false
        });
    }
    function goOutfits() {
        router.replace("/dashboard?view=outfits", {
            scroll: false
        });
    }
    function goOverview() {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("view");
        const q = params.toString();
        router.replace(q ? "/dashboard?".concat(q) : "/dashboard", {
            scroll: false
        });
    }
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AccountDashboard.useCallback[load]": async ()=>{
            setLoading(true);
            setError(null);
            try {
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchMyReports"])();
                setReports(data.reports);
                onUserChange(data.user);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load reports.");
            } finally{
                setLoading(false);
            }
        }
    }["AccountDashboard.useCallback[load]"], [
        onUserChange
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AccountDashboard.useEffect": ()=>{
            void load();
        }
    }["AccountDashboard.useEffect"], [
        load
    ]);
    const baselineReports = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AccountDashboard.useMemo[baselineReports]": ()=>reports.filter({
                "AccountDashboard.useMemo[baselineReports]": (r)=>r.kind !== "target_look"
            }["AccountDashboard.useMemo[baselineReports]"])
    }["AccountDashboard.useMemo[baselineReports]"], [
        reports
    ]);
    var _baselineReports_;
    const latest = (_baselineReports_ = baselineReports[0]) !== null && _baselineReports_ !== void 0 ? _baselineReports_ : null;
    const baseline = baselineReports.length > 1 ? baselineReports[baselineReports.length - 1] : null;
    // Backfill standardized portrait for older reports (once).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AccountDashboard.useEffect": ()=>{
            if (!(latest === null || latest === void 0 ? void 0 : latest.id) || latest.standardizedPortraitFileId || !latest.portraitFileId) {
                return;
            }
            let cancelled = false;
            setAvatarBusy(true);
            void ({
                "AccountDashboard.useEffect": async ()=>{
                    try {
                        const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensureStandardizedPortrait"])(latest.id);
                        if (!cancelled) {
                            setReports({
                                "AccountDashboard.useEffect": (prev)=>prev.map({
                                        "AccountDashboard.useEffect": (r)=>r.id === updated.id ? updated : r
                                    }["AccountDashboard.useEffect"])
                            }["AccountDashboard.useEffect"]);
                        }
                    } catch (e) {
                    /* keep source portrait */ } finally{
                        if (!cancelled) setAvatarBusy(false);
                    }
                }
            })["AccountDashboard.useEffect"]();
            return ({
                "AccountDashboard.useEffect": ()=>{
                    cancelled = true;
                }
            })["AccountDashboard.useEffect"];
        }
    }["AccountDashboard.useEffect"], [
        latest === null || latest === void 0 ? void 0 : latest.id,
        latest === null || latest === void 0 ? void 0 : latest.standardizedPortraitFileId,
        latest === null || latest === void 0 ? void 0 : latest.portraitFileId
    ]);
    const focusAreas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AccountDashboard.useMemo[focusAreas]": ()=>{
            if (!latest) return [];
            var _latest_priorityFeatures;
            const priority = new Set((_latest_priorityFeatures = latest.priorityFeatures) !== null && _latest_priorityFeatures !== void 0 ? _latest_priorityFeatures : []);
            const weak = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCORED_APPEARANCE_KEYS"].filter({
                "AccountDashboard.useMemo[focusAreas].weak": (key)=>{
                    const f = latest.features[key];
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFeatureMeasurable"])(f.measurable) && f.score < 70;
                }
            }["AccountDashboard.useMemo[focusAreas].weak"]).sort({
                "AccountDashboard.useMemo[focusAreas].weak": (a, b)=>latest.features[a].score - latest.features[b].score
            }["AccountDashboard.useMemo[focusAreas].weak"]);
            const ordered = [];
            var _latest_priorityFeatures1;
            for (const key of (_latest_priorityFeatures1 = latest.priorityFeatures) !== null && _latest_priorityFeatures1 !== void 0 ? _latest_priorityFeatures1 : []){
                if (!ordered.includes(key)) ordered.push(key);
            }
            for (const key of weak){
                if (!ordered.includes(key)) ordered.push(key);
            }
            return ordered.slice(0, 5).map({
                "AccountDashboard.useMemo[focusAreas]": (key)=>{
                    const score = latest.features[key].score;
                    const concern = Math.max(0, Math.min(100, 100 - score));
                    const level = concern >= 55 ? "High" : concern >= 35 ? "Moderate" : "Low";
                    return {
                        key,
                        label: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][key],
                        score,
                        concern,
                        level,
                        prioritized: priority.has(key),
                        signal: latest.features[key].observedSignal
                    };
                }
            }["AccountDashboard.useMemo[focusAreas]"]);
        }
    }["AccountDashboard.useMemo[focusAreas]"], [
        latest
    ]);
    const recCards = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AccountDashboard.useMemo[recCards]": ()=>{
            if (!latest) return [];
            const out = [];
            for (const key of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCORED_APPEARANCE_KEYS"]){
                const score = latest.features[key].score;
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFeatureMeasurable"])(latest.features[key].measurable)) continue;
                const recs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recommendationsForScore"])(key, score);
                if (recs[0]) {
                    out.push({
                        feature: key,
                        title: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][key],
                        body: recs[0].action
                    });
                }
                if (out.length >= 3) break;
            }
            if (out.length === 0) {
                out.push({
                    feature: "skin_clarity",
                    title: "Keep the loop",
                    body: "Re-upload under the same light next week to prove what’s working."
                });
            }
            return out;
        }
    }["AccountDashboard.useMemo[recCards]"], [
        latest
    ]);
    const progress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AccountDashboard.useMemo[progress]": ()=>{
            if (!latest || !baseline || latest.id === baseline.id) return null;
            const delta = latest.overallScore - baseline.overallScore;
            const label = Math.abs(delta) < 3 ? "No significant change detected" : delta > 0 ? "Improvement detected on the composite" : "No significant change detected";
            return {
                from: baseline.overallScore,
                to: latest.overallScore,
                delta,
                label,
                sessions: baselineReports.length
            };
        }
    }["AccountDashboard.useMemo[progress]"], [
        baseline,
        latest,
        baselineReports.length
    ]);
    const heatVars = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AccountDashboard.useMemo[heatVars]": ()=>{
            if (!latest) {
                return {
                    "--heat-cheek": "0.15",
                    "--heat-brow": "0.12",
                    "--heat-jaw": "0.1"
                };
            }
            const skin = latest.features.skin_clarity.score;
            const brow = latest.features.eyebrow_shape.score;
            const jaw = latest.features.jawline_definition.score;
            const cheek = Math.max(0.08, Math.min(0.55, (100 - skin) / 100));
            const browHeat = Math.max(0.06, Math.min(0.4, (100 - brow) / 140));
            const jawHeat = Math.max(0.06, Math.min(0.35, (100 - jaw) / 160));
            return {
                "--heat-cheek": String(cheek),
                "--heat-brow": String(browHeat),
                "--heat-jaw": String(jawHeat)
            };
        }
    }["AccountDashboard.useMemo[heatVars]"], [
        latest
    ]);
    const concernThumb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AccountDashboard.useMemo[concernThumb]": ()=>{
            if (!latest) return 18;
            const avgConcern = focusAreas.length > 0 ? focusAreas.reduce({
                "AccountDashboard.useMemo[concernThumb]": (a, b)=>a + b.concern
            }["AccountDashboard.useMemo[concernThumb]"], 0) / focusAreas.length : Math.max(0, 100 - latest.overallScore);
            return Math.max(8, Math.min(92, avgConcern));
        }
    }["AccountDashboard.useMemo[concernThumb]"], [
        focusAreas,
        latest
    ]);
    const portraitSrc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["accountPortraitUrl"])(latest);
    async function handleDelete(reportId) {
        const ok = window.confirm("Delete this report permanently? Linked photos for it will be removed too.");
        if (!ok) return;
        setDeletingId(reportId);
        setError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteMyReport"])(reportId);
            await load();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Delete failed.");
        } finally{
            setDeletingId(null);
        }
    }
    async function handleCancelSubscription() {
        const endHint = user.currentPeriodEnd ? " You’ll keep Pro until ".concat(new Date(user.currentPeriodEnd).toLocaleDateString("en-GB"), ".") : " You’ll keep Pro until the end of the current billing period.";
        const ok = window.confirm("Cancel Zelko Pro?".concat(endHint, " You can resubscribe anytime from Pricing."));
        if (!ok) return;
        setBillingBusy(true);
        setBillingMessage(null);
        setError(null);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cancelProSubscription"])();
            onUserChange(result.user);
            setBillingMessage(result.message);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not cancel subscription.");
        } finally{
            setBillingBusy(false);
        }
    }
    const firstName = ((_user_firstName = user.firstName) === null || _user_firstName === void 0 ? void 0 : _user_firstName.trim()) || user.email.split("@")[0] || "there";
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "account-dash mx-auto max-w-7xl",
        "data-theme": theme,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "account-dash__shell",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "account-dash__rail",
                    "aria-label": "Account",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            title: "Home",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconHome, {}, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 323,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "account-dash__rail-label",
                                    children: "Home"
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 324,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AccountDashboard.tsx",
                            lineNumber: 322,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            title: "Dashboard",
                            "data-active": dashView === "overview" ? "true" : undefined,
                            onClick: goOverview,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconGrid, {}, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 332,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "account-dash__rail-label",
                                    children: "Dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 333,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AccountDashboard.tsx",
                            lineNumber: 326,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            title: "Outfits",
                            "data-active": dashView === "outfits" ? "true" : undefined,
                            onClick: goOutfits,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconOutfit, {}, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 341,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "account-dash__rail-label",
                                    children: "Outfits"
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 342,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AccountDashboard.tsx",
                            lineNumber: 335,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/upload",
                            title: "New scan",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconScan, {}, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 345,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "account-dash__rail-label",
                                    children: "New scan"
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 346,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AccountDashboard.tsx",
                            lineNumber: 344,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/tracking",
                            title: "Progress",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconHeart, {}, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 349,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "account-dash__rail-label",
                                    children: "Progress"
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 350,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AccountDashboard.tsx",
                            lineNumber: 348,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/pricing",
                            title: user.isPro ? "Plan" : "Upgrade",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconSpark, {}, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 353,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "account-dash__rail-label",
                                    children: user.isPro ? "Plan" : "Upgrade"
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 354,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AccountDashboard.tsx",
                            lineNumber: 352,
                            columnNumber: 11
                        }, this),
                        onToggleTheme ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            title: theme === "dark" ? "Light mode" : "Dark mode",
                            "aria-label": theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
                            onClick: onToggleTheme,
                            children: [
                                theme === "dark" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconSun, {}, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 367,
                                    columnNumber: 35
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconMoon, {}, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 367,
                                    columnNumber: 49
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "account-dash__rail-label",
                                    children: theme === "dark" ? "Light" : "Dark"
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 368,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AccountDashboard.tsx",
                            lineNumber: 359,
                            columnNumber: 13
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            title: "Sign out",
                            onClick: onSignOut,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconOut, {}, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 374,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "account-dash__rail-label",
                                    children: "Sign out"
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 375,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AccountDashboard.tsx",
                            lineNumber: 373,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AccountDashboard.tsx",
                    lineNumber: 321,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "account-dash__main",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                            className: "account-dash__top",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex min-w-0 items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/5 text-sm font-semibold uppercase",
                                            children: firstName.slice(0, 1)
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 382,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "truncate text-sm font-semibold text-white",
                                                    children: dashView === "outfits" ? "Your outfits" : "".concat(greeting, ", ").concat(firstName)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                    lineNumber: 386,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "truncate text-xs text-white/45",
                                                    children: dashView === "outfits" ? "Prescribed looks, AI stills, and eBay matches" : user.email
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                    lineNumber: 391,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 385,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ".concat(user.isPro ? "bg-white text-neutral-950" : "border border-white/20 text-white/70"),
                                            children: user.isPro ? user.cancelAtPeriodEnd ? "Pro · ending" : "Pro" : "Free"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 397,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 381,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-2",
                                    children: [
                                        !user.isPro ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/pricing",
                                            className: "inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/16",
                                            children: "Upgrade to Pro"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 413,
                                            columnNumber: 17
                                        }, this) : null,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/upload",
                                            className: "inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/85 transition hover:bg-white/10",
                                            children: "New assessment"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 420,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: latest ? "/report/".concat(latest.id) : "/upload",
                                            className: "inline-flex items-center rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-white/90",
                                            children: "Open report"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 426,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 411,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AccountDashboard.tsx",
                            lineNumber: 380,
                            columnNumber: 11
                        }, this),
                        dashView === "overview" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-1 rounded-2xl border border-white/15 bg-white/[0.04] p-1 shadow-[0_8px_28px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.06)]",
                            role: "tablist",
                            "aria-label": "Analysis mode",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    role: "tab",
                                    "aria-selected": analysisMode === "assistant",
                                    onClick: ()=>selectMode("assistant"),
                                    className: "flex-1 cursor-pointer rounded-xl px-4 py-2.5 text-left transition sm:flex-none sm:min-w-[12rem] ".concat(analysisMode === "assistant" ? "bg-white text-neutral-950 shadow-[0_4px_14px_rgba(0,0,0,0.25)]" : "text-white/55 hover:bg-white/5 hover:text-white"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-semibold",
                                            children: "AI appearance"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 452,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-0.5 text-[11px] ".concat(analysisMode === "assistant" ? "text-neutral-500" : "text-white/35"),
                                            children: "Default scores & coaching"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 453,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 441,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    role: "tab",
                                    "aria-selected": analysisMode === "target",
                                    onClick: ()=>selectMode("target"),
                                    className: "flex-1 cursor-pointer rounded-xl px-4 py-2.5 text-left transition sm:flex-none sm:min-w-[12rem] ".concat(analysisMode === "target" ? "bg-white text-neutral-950 shadow-[0_4px_14px_rgba(0,0,0,0.25)]" : "text-white/55 hover:bg-white/5 hover:text-white"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-semibold",
                                            children: "Toward your look"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 474,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-0.5 text-[11px] ".concat(analysisMode === "target" ? "text-neutral-500" : "text-white/35"),
                                            children: "Diff vs a reference photo"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 475,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 463,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AccountDashboard.tsx",
                            lineNumber: 436,
                            columnNumber: 11
                        }, this) : null,
                        error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/components/AccountDashboard.tsx",
                            lineNumber: 489,
                            columnNumber: 13
                        }, this) : null,
                        !user.isPro ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "account-dash__card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/40",
                                            children: "Free plan"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 497,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "mt-1 text-lg font-semibold tracking-tight text-white",
                                            children: "Unlock Pro for full coaching"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 500,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 max-w-xl text-sm text-white/50",
                                            children: "Full feature breakdown, confidence labels, weekly tracking, and checklist — £9.99/mo."
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 503,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 496,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex shrink-0 flex-wrap gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/pricing",
                                            className: "inline-flex rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-white/90",
                                            children: "Upgrade to Pro"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 509,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/pricing",
                                            className: "inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/10",
                                            children: "See plans"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 515,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 508,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AccountDashboard.tsx",
                            lineNumber: 495,
                            columnNumber: 13
                        }, this) : null,
                        user.isPro && reports.length === 0 && !loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "account-dash__card px-5 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold text-white",
                                    children: "Upload your first report to use Pro"
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 527,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-sm text-white/50",
                                    children: "Progress and checklist unlock after your first linked assessment."
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 530,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AccountDashboard.tsx",
                            lineNumber: 526,
                            columnNumber: 13
                        }, this) : null,
                        dashView === "outfits" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-4",
                            children: latest ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$OutfitsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JourneyLooksGallery"], {
                                        reportId: latest.id
                                    }, void 0, false, {
                                        fileName: "[project]/components/AccountDashboard.tsx",
                                        lineNumber: 540,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "account-dash__outfit",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$OutfitRecommendPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OutfitRecommendPanel"], {
                                            baselineReportId: latest.id,
                                            isAuthed: true,
                                            compact: true,
                                            reportPath: "/dashboard?view=outfits",
                                            onUserChange: onUserChange
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 542,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/AccountDashboard.tsx",
                                        lineNumber: 541,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "account-dash__card p-5 sm:p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/40",
                                        children: "Outfits"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AccountDashboard.tsx",
                                        lineNumber: 553,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-1 text-lg font-semibold text-white",
                                        children: "Need a scan first"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AccountDashboard.tsx",
                                        lineNumber: 556,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-sm text-white/50",
                                        children: "Complete an appearance assessment to unlock prescribed looks and eBay matches."
                                    }, void 0, false, {
                                        fileName: "[project]/components/AccountDashboard.tsx",
                                        lineNumber: 559,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/upload",
                                        className: "mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-950",
                                        children: "Start assessment"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AccountDashboard.tsx",
                                        lineNumber: 563,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AccountDashboard.tsx",
                                lineNumber: 552,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/AccountDashboard.tsx",
                            lineNumber: 537,
                            columnNumber: 13
                        }, this) : null,
                        dashView === "overview" && analysisMode === "target" ? latest ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$LookTrackPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LookTrackPanel"], {
                            baselineReport: latest,
                            isAuthed: true,
                            isPro: user.isPro,
                            tone: theme === "light" ? "light" : "dark",
                            onUserChange: onUserChange
                        }, void 0, false, {
                            fileName: "[project]/components/AccountDashboard.tsx",
                            lineNumber: 576,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "account-dash__card p-5 sm:p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] font-medium uppercase tracking-[0.16em] text-white/40",
                                    children: "Toward your look"
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 585,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "mt-1 text-lg font-semibold text-white",
                                    children: "Need a baseline first"
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 588,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-sm text-white/50",
                                    children: "Complete a free appearance scan, then upload a reference photo to compare alignment."
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 591,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/upload",
                                    className: "mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-950",
                                    children: "Start assessment"
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 595,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AccountDashboard.tsx",
                            lineNumber: 584,
                            columnNumber: 15
                        }, this) : null,
                        dashView === "overview" && analysisMode === "assistant" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "account-dash__grid",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "account-dash__card overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "account-dash__portrait",
                                        style: heatVars,
                                        children: [
                                            portraitSrc ? // eslint-disable-next-line @next/next/no-img-element
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: portraitSrc,
                                                alt: "Standardized appearance portrait"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AccountDashboard.tsx",
                                                lineNumber: 612,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex h-full flex-col items-center justify-center gap-2 px-6 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-white/55",
                                                        children: loading ? "Loading your portrait…" : "Complete an assessment to generate your clinical avatar."
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AccountDashboard.tsx",
                                                        lineNumber: 618,
                                                        columnNumber: 21
                                                    }, this),
                                                    !loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/upload",
                                                        className: "rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-950",
                                                        children: "Start assessment"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AccountDashboard.tsx",
                                                        lineNumber: 624,
                                                        columnNumber: 23
                                                    }, this) : null
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AccountDashboard.tsx",
                                                lineNumber: 617,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "account-dash__heat",
                                                "aria-hidden": true
                                            }, void 0, false, {
                                                fileName: "[project]/components/AccountDashboard.tsx",
                                                lineNumber: 633,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "account-dash__badge",
                                                children: avatarBusy ? "Generating…" : "Zelko scan"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AccountDashboard.tsx",
                                                lineNumber: 634,
                                                columnNumber: 17
                                            }, this),
                                            latest ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "account-dash__result",
                                                children: [
                                                    "Result ",
                                                    latest.overallScore
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AccountDashboard.tsx",
                                                lineNumber: 638,
                                                columnNumber: 19
                                            }, this) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "account-dash__concern-scale",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Low"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AccountDashboard.tsx",
                                                        lineNumber: 643,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "account-dash__concern-scale-track",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "account-dash__concern-scale-thumb",
                                                            style: {
                                                                left: "".concat(concernThumb, "%")
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AccountDashboard.tsx",
                                                            lineNumber: 645,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AccountDashboard.tsx",
                                                        lineNumber: 644,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "High"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AccountDashboard.tsx",
                                                        lineNumber: 650,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AccountDashboard.tsx",
                                                lineNumber: 642,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AccountDashboard.tsx",
                                        lineNumber: 609,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 608,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex min-w-0 flex-col gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                            className: "account-dash__card p-4 sm:p-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-4 flex items-end justify-between gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/40",
                                                                    children: "Appearance overview"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                                    lineNumber: 660,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                    className: "mt-1 text-lg font-semibold tracking-tight text-white",
                                                                    children: "Measured signals"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                                    lineNumber: 663,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AccountDashboard.tsx",
                                                            lineNumber: 659,
                                                            columnNumber: 19
                                                        }, this),
                                                        latest ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-white/40",
                                                            children: new Date(latest.createdAt).toLocaleDateString("en-GB")
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AccountDashboard.tsx",
                                                            lineNumber: 668,
                                                            columnNumber: 21
                                                        }, this) : null
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                    lineNumber: 658,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "account-dash__rings",
                                                    children: RING_FEATURES.map((item)=>{
                                                        var _latest_overallScore, _latest_features_item_key_score;
                                                        const value = item.key === "overall" ? (_latest_overallScore = latest === null || latest === void 0 ? void 0 : latest.overallScore) !== null && _latest_overallScore !== void 0 ? _latest_overallScore : 0 : (_latest_features_item_key_score = latest === null || latest === void 0 ? void 0 : latest.features[item.key].score) !== null && _latest_features_item_key_score !== void 0 ? _latest_features_item_key_score : 0;
                                                        const locked = item.key !== "overall" && latest && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFeatureMeasurable"])(latest.features[item.key].measurable);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScoreRing, {
                                                            label: item.label,
                                                            value: locked ? null : value
                                                        }, item.key, false, {
                                                            fileName: "[project]/components/AccountDashboard.tsx",
                                                            lineNumber: 684,
                                                            columnNumber: 23
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                    lineNumber: 673,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 657,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                            className: "account-dash__card p-4 sm:p-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/40",
                                                    children: "Focus areas"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                    lineNumber: 695,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "mt-1 text-lg font-semibold tracking-tight text-white",
                                                    children: "Where to act"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                    lineNumber: 698,
                                                    columnNumber: 17
                                                }, this),
                                                !latest ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-3 text-sm text-white/45",
                                                    children: "Soft spots appear here after your first report."
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                    lineNumber: 702,
                                                    columnNumber: 19
                                                }, this) : focusAreas.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-3 text-sm text-white/45",
                                                    children: "No soft spots below 70 — keep the routine consistent."
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                    lineNumber: 706,
                                                    columnNumber: 19
                                                }, this) : focusAreas.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "account-dash__bar-row",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "truncate text-xs font-medium text-white/75",
                                                                children: item.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AccountDashboard.tsx",
                                                                lineNumber: 712,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "account-dash__bar-track",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "account-dash__bar-fill",
                                                                    style: {
                                                                        width: "".concat(item.concern, "%")
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                                    lineNumber: 716,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AccountDashboard.tsx",
                                                                lineNumber: 715,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-right text-[11px] tabular-nums text-white/55",
                                                                children: item.level
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AccountDashboard.tsx",
                                                                lineNumber: 721,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, item.key, true, {
                                                        fileName: "[project]/components/AccountDashboard.tsx",
                                                        lineNumber: 711,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 694,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                            className: "account-dash__card p-4 sm:p-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/40",
                                                    children: "Recommendations"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                    lineNumber: 730,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "account-dash__recs mt-3",
                                                    children: recCards.map((rec)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "account-dash__rec",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs font-semibold text-white",
                                                                    children: rec.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                                    lineNumber: 736,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mt-1 text-[12px] leading-relaxed text-white/50",
                                                                    children: rec.body
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                                    lineNumber: 739,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, rec.title + rec.body, true, {
                                                            fileName: "[project]/components/AccountDashboard.tsx",
                                                            lineNumber: 735,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                    lineNumber: 733,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 729,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "account-dash__footer-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                    className: "account-dash__card p-4 sm:p-5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/40",
                                                            children: "Next check-in"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AccountDashboard.tsx",
                                                            lineNumber: 749,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-2 text-sm font-semibold text-white",
                                                            children: "Weekly re-upload window"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AccountDashboard.tsx",
                                                            lineNumber: 752,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-1 text-xs text-white/45",
                                                            children: "Tracking compares under consistent lighting — never a decline callout."
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AccountDashboard.tsx",
                                                            lineNumber: 755,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/upload",
                                                            className: "mt-3 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/85",
                                                            children: "Schedule scan"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AccountDashboard.tsx",
                                                            lineNumber: 759,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                    lineNumber: 748,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                    className: "account-dash__card p-4 sm:p-5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/40",
                                                            children: "Your progress"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AccountDashboard.tsx",
                                                            lineNumber: 767,
                                                            columnNumber: 19
                                                        }, this),
                                                        progress ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mt-2 text-2xl font-semibold tabular-nums text-white",
                                                                    children: [
                                                                        progress.delta > 0 ? "+" : "",
                                                                        progress.to - progress.from,
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "ml-1 text-sm font-medium text-white/45",
                                                                            children: "composite"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AccountDashboard.tsx",
                                                                            lineNumber: 775,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                                    lineNumber: 772,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mt-1 text-xs text-white/45",
                                                                    children: progress.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                                    lineNumber: 779,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mt-2 text-2xl font-semibold tabular-nums text-white",
                                                                    children: "—"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                                    lineNumber: 783,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mt-1 text-xs text-white/45",
                                                                    children: "Needs a second linked session to compare."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                                    lineNumber: 786,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true),
                                                        user.isPro ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/tracking",
                                                            className: "mt-3 inline-flex text-xs font-semibold text-white/80 underline-offset-4 hover:underline",
                                                            children: "Open tracking →"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AccountDashboard.tsx",
                                                            lineNumber: 792,
                                                            columnNumber: 21
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/pricing",
                                                            className: "mt-3 inline-flex text-xs font-semibold text-white/80 underline-offset-4 hover:underline",
                                                            children: "Unlock tracking →"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AccountDashboard.tsx",
                                                            lineNumber: 799,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                    lineNumber: 766,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 747,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 656,
                                    columnNumber: 13
                                }, this),
                                latest ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "account-dash__card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/40",
                                                    children: "Outfits"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                    lineNumber: 813,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "mt-1 text-base font-semibold text-white",
                                                    children: "Prescribed looks & eBay matches"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                    lineNumber: 816,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-sm text-white/50",
                                                    children: "Journey stills, AI outfit recommendations, and shoppable eBay searches live on the Outfits page."
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                    lineNumber: 819,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 812,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: goOutfits,
                                            className: "shrink-0 cursor-pointer rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-white/90",
                                            children: "Open outfits"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 824,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 811,
                                    columnNumber: 15
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AccountDashboard.tsx",
                            lineNumber: 606,
                            columnNumber: 11
                        }, this) : null,
                        user.isPro ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "account-dash__card p-4 sm:p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/40",
                                    children: "Billing"
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 838,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-sm text-white/60",
                                    children: user.cancelAtPeriodEnd && user.currentPeriodEnd ? "Pro stays active until ".concat(new Date(user.currentPeriodEnd).toLocaleDateString("en-GB"), ".") : "£9.99 GBP / month. Cancel anytime."
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 841,
                                    columnNumber: 15
                                }, this),
                                billingMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-sm text-emerald-300",
                                    children: billingMessage
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 847,
                                    columnNumber: 17
                                }, this) : null,
                                !user.cancelAtPeriodEnd ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    disabled: billingBusy,
                                    onClick: ()=>void handleCancelSubscription(),
                                    className: "mt-3 cursor-pointer rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/10 disabled:opacity-60",
                                    children: billingBusy ? "Canceling…" : "Cancel subscription"
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 850,
                                    columnNumber: 17
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AccountDashboard.tsx",
                            lineNumber: 837,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "account-dash__card p-4 sm:p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/40",
                                    children: "Plan"
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 862,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mt-1 text-lg font-semibold tracking-tight text-white",
                                    children: "You're on Free"
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 865,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "mt-3 space-y-1.5 text-sm text-white/50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: "Composite score + strongest features preview"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 869,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: "Up to 3 outfit stills"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 870,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "text-white/35",
                                            children: "Pro adds full breakdown, tracking, and checklist"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 871,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 868,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/pricing",
                                    className: "mt-4 inline-flex rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-white/90",
                                    children: "Upgrade to Pro — £9.99/mo"
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 875,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AccountDashboard.tsx",
                            lineNumber: 861,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "account-dash__card p-4 sm:p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-end justify-between gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/40",
                                                    children: "Reports"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                    lineNumber: 887,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "mt-1 text-lg font-semibold tracking-tight text-white",
                                                    children: "Your assessments"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                    lineNumber: 890,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 886,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/upload",
                                            className: "text-xs font-semibold text-white/70 underline-offset-4 hover:text-white hover:underline",
                                            children: "New assessment"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 894,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 885,
                                    columnNumber: 13
                                }, this),
                                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-5 text-sm text-white/45",
                                    children: "Loading…"
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 903,
                                    columnNumber: 15
                                }, this) : baselineReports.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-5 py-8 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-white/55",
                                            children: "No reports linked yet."
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 906,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/upload",
                                            className: "mt-4 inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-950",
                                            children: "Start free report"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 907,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 905,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "mt-5 space-y-2.5",
                                    children: baselineReports.map((report, index)=>{
                                        var _report_priorityFeatures;
                                        const face = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["accountPortraitUrl"])(report);
                                        const topPriority = (_report_priorityFeatures = report.priorityFeatures) === null || _report_priorityFeatures === void 0 ? void 0 : _report_priorityFeatures[0];
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 sm:flex-row sm:items-center sm:justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex min-w-0 items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative size-12 shrink-0 overflow-hidden rounded-xl bg-white/5",
                                                            children: face ? // eslint-disable-next-line @next/next/no-img-element
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: face,
                                                                alt: "",
                                                                className: "h-full w-full object-cover object-top"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AccountDashboard.tsx",
                                                                lineNumber: 928,
                                                                columnNumber: 29
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex h-full items-center justify-center text-xs text-white/35",
                                                                children: "—"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AccountDashboard.tsx",
                                                                lineNumber: 934,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AccountDashboard.tsx",
                                                            lineNumber: 925,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-semibold text-white",
                                                                    children: [
                                                                        "Score ",
                                                                        report.overallScore,
                                                                        index === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "ml-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/35",
                                                                            children: "Latest"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AccountDashboard.tsx",
                                                                            lineNumber: 943,
                                                                            columnNumber: 31
                                                                        }, this) : null
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                                    lineNumber: 940,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mt-0.5 text-xs text-white/40",
                                                                    children: [
                                                                        new Date(report.createdAt).toLocaleString(),
                                                                        topPriority ? " · focus ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][topPriority]) : ""
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                                    lineNumber: 948,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AccountDashboard.tsx",
                                                            lineNumber: 939,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                    lineNumber: 924,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2 sm:justify-end",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/report/".concat(report.id),
                                                            className: "inline-flex rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-neutral-950",
                                                            children: "Open"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AccountDashboard.tsx",
                                                            lineNumber: 957,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            disabled: deletingId === report.id,
                                                            onClick: ()=>void handleDelete(report.id),
                                                            className: "inline-flex cursor-pointer rounded-full border border-white/15 bg-transparent px-3.5 py-2 text-xs font-semibold text-white/70 transition hover:border-rose-300/40 hover:text-rose-200 disabled:opacity-60",
                                                            children: deletingId === report.id ? "Deleting…" : "Delete"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AccountDashboard.tsx",
                                                            lineNumber: 963,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AccountDashboard.tsx",
                                                    lineNumber: 956,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, report.id, true, {
                                            fileName: "[project]/components/AccountDashboard.tsx",
                                            lineNumber: 920,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/AccountDashboard.tsx",
                                    lineNumber: 915,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AccountDashboard.tsx",
                            lineNumber: 884,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AccountDashboard.tsx",
                    lineNumber: 379,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/AccountDashboard.tsx",
            lineNumber: 320,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/AccountDashboard.tsx",
        lineNumber: 319,
        columnNumber: 5
    }, this);
}
_s(AccountDashboard, "3MTiFi8oDmY3IP3jZG7IJW9SHKU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = AccountDashboard;
function ScoreRing(param) {
    let { label, value } = param;
    const r = 28;
    const c = 2 * Math.PI * r;
    const pct = value == null ? 0 : Math.max(0, Math.min(100, value)) / 100;
    const dash = "".concat(c * pct, " ").concat(c);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "account-dash__ring",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "account-dash__ring-chart",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        viewBox: "0 0 72 72",
                        "aria-hidden": true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "36",
                                cy: "36",
                                r: r,
                                fill: "none",
                                stroke: "var(--ad-ring-track)",
                                strokeWidth: "6"
                            }, void 0, false, {
                                fileName: "[project]/components/AccountDashboard.tsx",
                                lineNumber: 1000,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "36",
                                cy: "36",
                                r: r,
                                fill: "none",
                                stroke: "var(--ad-ring-stroke)",
                                strokeWidth: "6",
                                strokeLinecap: "round",
                                strokeDasharray: dash
                            }, void 0, false, {
                                fileName: "[project]/components/AccountDashboard.tsx",
                                lineNumber: 1008,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AccountDashboard.tsx",
                        lineNumber: 999,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: value == null ? "—" : value
                    }, void 0, false, {
                        fileName: "[project]/components/AccountDashboard.tsx",
                        lineNumber: 1019,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AccountDashboard.tsx",
                lineNumber: 998,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] font-medium uppercase tracking-[0.1em] text-white/45",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/AccountDashboard.tsx",
                lineNumber: 1021,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AccountDashboard.tsx",
        lineNumber: 997,
        columnNumber: 5
    }, this);
}
_c1 = ScoreRing;
function IconSun() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "4",
                stroke: "currentColor",
                strokeWidth: "1.6"
            }, void 0, false, {
                fileName: "[project]/components/AccountDashboard.tsx",
                lineNumber: 1031,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6",
                stroke: "currentColor",
                strokeWidth: "1.6",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/components/AccountDashboard.tsx",
                lineNumber: 1032,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AccountDashboard.tsx",
        lineNumber: 1030,
        columnNumber: 5
    }, this);
}
_c2 = IconSun;
function IconMoon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M18.5 14.2A7.2 7.2 0 0 1 9.8 5.5 7.5 7.5 0 1 0 18.5 14.2Z",
            stroke: "currentColor",
            strokeWidth: "1.6",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/components/AccountDashboard.tsx",
            lineNumber: 1044,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/AccountDashboard.tsx",
        lineNumber: 1043,
        columnNumber: 5
    }, this);
}
_c3 = IconMoon;
function IconHome() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z",
            stroke: "currentColor",
            strokeWidth: "1.6",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/components/AccountDashboard.tsx",
            lineNumber: 1056,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/AccountDashboard.tsx",
        lineNumber: 1055,
        columnNumber: 5
    }, this);
}
_c4 = IconHome;
function IconGrid() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "4",
                y: "4",
                width: "7",
                height: "7",
                rx: "1.5",
                stroke: "currentColor",
                strokeWidth: "1.6"
            }, void 0, false, {
                fileName: "[project]/components/AccountDashboard.tsx",
                lineNumber: 1068,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "13",
                y: "4",
                width: "7",
                height: "7",
                rx: "1.5",
                stroke: "currentColor",
                strokeWidth: "1.6"
            }, void 0, false, {
                fileName: "[project]/components/AccountDashboard.tsx",
                lineNumber: 1069,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "4",
                y: "13",
                width: "7",
                height: "7",
                rx: "1.5",
                stroke: "currentColor",
                strokeWidth: "1.6"
            }, void 0, false, {
                fileName: "[project]/components/AccountDashboard.tsx",
                lineNumber: 1070,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "13",
                y: "13",
                width: "7",
                height: "7",
                rx: "1.5",
                stroke: "currentColor",
                strokeWidth: "1.6"
            }, void 0, false, {
                fileName: "[project]/components/AccountDashboard.tsx",
                lineNumber: 1071,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AccountDashboard.tsx",
        lineNumber: 1067,
        columnNumber: 5
    }, this);
}
_c5 = IconGrid;
function IconScan() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M7 4H5a1 1 0 0 0-1 1v2M17 4h2a1 1 0 0 1 1 1v2M7 20H5a1 1 0 0 1-1-1v-2M17 20h2a1 1 0 0 0 1-1v-2M8 12h8",
            stroke: "currentColor",
            strokeWidth: "1.6",
            strokeLinecap: "round"
        }, void 0, false, {
            fileName: "[project]/components/AccountDashboard.tsx",
            lineNumber: 1078,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/AccountDashboard.tsx",
        lineNumber: 1077,
        columnNumber: 5
    }, this);
}
_c6 = IconScan;
function IconHeart() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20Z",
            stroke: "currentColor",
            strokeWidth: "1.6",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/components/AccountDashboard.tsx",
            lineNumber: 1090,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/AccountDashboard.tsx",
        lineNumber: 1089,
        columnNumber: 5
    }, this);
}
_c7 = IconHeart;
function IconSpark() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 3v3M12 18v3M3 12h3M18 12h3M6.2 6.2l2.1 2.1M15.7 15.7l2.1 2.1M17.8 6.2l-2.1 2.1M8.3 15.7l-2.1 2.1",
            stroke: "currentColor",
            strokeWidth: "1.6",
            strokeLinecap: "round"
        }, void 0, false, {
            fileName: "[project]/components/AccountDashboard.tsx",
            lineNumber: 1102,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/AccountDashboard.tsx",
        lineNumber: 1101,
        columnNumber: 5
    }, this);
}
_c8 = IconSpark;
function IconOutfit() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M9 4.5 12 3l3 1.5 3.5 1.2v3.3L16 11v9H8v-9L5.5 9V5.7L9 4.5Z",
            stroke: "currentColor",
            strokeWidth: "1.6",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/components/AccountDashboard.tsx",
            lineNumber: 1114,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/AccountDashboard.tsx",
        lineNumber: 1113,
        columnNumber: 5
    }, this);
}
_c9 = IconOutfit;
function IconOut() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M10 7V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-2M14 12H4m0 0 3-3M4 12l3 3",
            stroke: "currentColor",
            strokeWidth: "1.6",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/components/AccountDashboard.tsx",
            lineNumber: 1126,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/AccountDashboard.tsx",
        lineNumber: 1125,
        columnNumber: 5
    }, this);
}
_c10 = IconOut;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_context__.k.register(_c, "AccountDashboard");
__turbopack_context__.k.register(_c1, "ScoreRing");
__turbopack_context__.k.register(_c2, "IconSun");
__turbopack_context__.k.register(_c3, "IconMoon");
__turbopack_context__.k.register(_c4, "IconHome");
__turbopack_context__.k.register(_c5, "IconGrid");
__turbopack_context__.k.register(_c6, "IconScan");
__turbopack_context__.k.register(_c7, "IconHeart");
__turbopack_context__.k.register(_c8, "IconSpark");
__turbopack_context__.k.register(_c9, "IconOutfit");
__turbopack_context__.k.register(_c10, "IconOut");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useDashboardTheme.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDashboardTheme",
    ()=>useDashboardTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const STORAGE_KEY = "zelko.dashboardTheme";
function useDashboardTheme() {
    _s();
    const [theme, setThemeState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("dark");
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDashboardTheme.useEffect": ()=>{
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored === "light" || stored === "dark") {
                    setThemeState(stored);
                }
            } catch (e) {
            /* ignore */ }
            setReady(true);
        }
    }["useDashboardTheme.useEffect"], []);
    const setTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDashboardTheme.useCallback[setTheme]": (next)=>{
            setThemeState(next);
            try {
                localStorage.setItem(STORAGE_KEY, next);
            } catch (e) {
            /* ignore */ }
        }
    }["useDashboardTheme.useCallback[setTheme]"], []);
    const toggleTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDashboardTheme.useCallback[toggleTheme]": ()=>{
            setThemeState({
                "useDashboardTheme.useCallback[toggleTheme]": (prev)=>{
                    const next = prev === "dark" ? "light" : "dark";
                    try {
                        localStorage.setItem(STORAGE_KEY, next);
                    } catch (e) {
                    /* ignore */ }
                    return next;
                }
            }["useDashboardTheme.useCallback[toggleTheme]"]);
        }
    }["useDashboardTheme.useCallback[toggleTheme]"], []);
    return {
        theme,
        setTheme,
        toggleTheme,
        ready
    };
}
_s(useDashboardTheme, "7536itsW2ZWVJOZeURKA9kcBj2o=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/DashboardClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AccountDashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AccountDashboard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useDashboardTheme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useDashboardTheme.ts [app-client] (ecmascript)");
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
function DashboardClient() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { theme, toggleTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useDashboardTheme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardTheme"])();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            void ({
                "DashboardClient.useEffect": async ()=>{
                    const me = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchMe"])();
                    if (!me) {
                        router.replace("/login?next=/dashboard");
                        return;
                    }
                    setUser(me);
                    setLoading(false);
                }
            })["DashboardClient.useEffect"]();
        }
    }["DashboardClient.useEffect"], [
        router
    ]);
    if (loading || !user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "dash-page flex min-h-screen items-center justify-center",
            "data-theme": theme,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm opacity-50",
                children: "Loading dashboard…"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/DashboardClient.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/dashboard/DashboardClient.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "dash-page relative min-h-screen overflow-hidden",
        "data-theme": theme,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": true,
                className: "dash-page__glow pointer-events-none absolute inset-0"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/DashboardClient.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 px-4 pb-16 pt-6 sm:px-6 md:px-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto mb-5 flex max-w-7xl items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "text-lg font-semibold tracking-tight",
                                style: {
                                    color: "var(--dash-page-fg)"
                                },
                                children: "Zelko"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/DashboardClient.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs uppercase tracking-[0.16em]",
                                style: {
                                    color: "var(--dash-page-muted)"
                                },
                                children: "Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/DashboardClient.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/DashboardClient.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AccountDashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountDashboard"], {
                        user: user,
                        theme: theme,
                        onToggleTheme: toggleTheme,
                        onUserChange: setUser,
                        onSignOut: ()=>{
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAuthToken"])(null);
                            router.replace("/login");
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/DashboardClient.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/DashboardClient.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/DashboardClient.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(DashboardClient, "XMeeFIPbE1mclcC9l70csT32VHs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useDashboardTheme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardTheme"]
    ];
});
_c = DashboardClient;
var _c;
__turbopack_context__.k.register(_c, "DashboardClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_728e2b29._.js.map