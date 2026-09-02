(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/lib/appearance-summary.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildAppearanceSummary",
    ()=>buildAppearanceSummary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/score-tone.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/types/report.ts [app-client] (ecmascript)");
;
;
function bandFor(score) {
    if (score >= 75) return "strong";
    if (score >= 60) return "steady";
    return "soft";
}
function vibeLine(score) {
    if (score >= 80) {
        return "Honestly? This is a strong read. Most of what we measured is holding up.";
    }
    if (score >= 70) {
        return "Overall you're in a good place. A few things look solid, a couple deserve a second look.";
    }
    if (score >= 60) {
        return "It's a mixed bag in a useful way. Some stuff is already working. Some stuff is softer.";
    }
    return "There's a clear shortlist of things to work on. Not a roast. Just where the signals got quieter.";
}
function listLabels(keys) {
    const labels = keys.map((k)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][k].toLowerCase());
    if (labels.length === 0) return "";
    if (labels.length === 1) return labels[0];
    if (labels.length === 2) return "".concat(labels[0], " and ").concat(labels[1]);
    return "".concat(labels.slice(0, -1).join(", "), ", and ").concat(labels[labels.length - 1]);
}
function buildAppearanceSummary(report) {
    const measurable = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCORED_APPEARANCE_KEYS"].filter((k)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFeatureMeasurable"])(report.features[k].measurable));
    const ranked = [
        ...measurable
    ].sort((a, b)=>report.features[b].score - report.features[a].score);
    const strong = ranked.filter((k)=>bandFor(report.features[k].score) === "strong");
    const soft = ranked.filter((k)=>bandFor(report.features[k].score) === "soft");
    const top = ranked.slice(0, Math.min(2, ranked.length));
    const weak = [
        ...measurable
    ].filter((k)=>report.features[k].score < 70).sort((a, b)=>report.features[a].score - report.features[b].score).slice(0, 2);
    const skipped = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCORED_APPEARANCE_KEYS"].filter((k)=>!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFeatureMeasurable"])(report.features[k].measurable));
    const opener = "Your composite landed at ".concat(report.overallScore, "/100. ").concat(vibeLine(report.overallScore), " Reminder: this is not an attractiveness score, and nobody else is in this comparison.");
    let strengths;
    if (top.length === 0) {
        strengths = "We couldn't get a clean enough read this round. Next time, try clearer front-facing shots and we'll have more to work with.";
    } else if (strong.length >= 2) {
        strengths = "What's popping first: ".concat(listLabels(top), ". Those are your cleanest signals in this photo. Good anchors if you re-upload later.");
    } else if (strong.length === 1) {
        strengths = "Your strongest moment is ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][strong[0]].toLowerCase(), " at ").concat(report.features[strong[0]].score, "/100.").concat(top[1] ? " ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][top[1]].toLowerCase(), " is right behind it.") : " Everything else is more mixed, which actually helps you know where to focus.");
    } else {
        strengths = 'Nothing is screaming "perfect," but '.concat(listLabels(top), " are leading right now. Lean on those while you tidy up the softer scores.");
    }
    const preview = [
        opener,
        strengths
    ];
    const full = [
        ...preview
    ];
    if (weak.length > 0) {
        full.push("The softer spots are mostly ".concat(listLabels(weak), ". Each one has a real signal behind it plus a next step, so you're not left guessing. Tap the dots on your portrait if you want the close-up version."));
    } else if (soft.length === 0 && measurable.length > 0) {
        full.push("Nothing here is sitting in a clearly weak zone. When you re-upload, keep the lighting and angle similar so change looks like change, not a photo accident.");
    }
    if (skipped.includes("grooming_signal")) {
        full.push("We skipped grooming this time. Your outfit wasn't clear enough in the frame. Wider shot next round and that signal can join the party.");
    }
    var _report_priorityFeatures;
    const priorities = ((_report_priorityFeatures = report.priorityFeatures) !== null && _report_priorityFeatures !== void 0 ? _report_priorityFeatures : []).filter((k)=>measurable.includes(k));
    if (priorities.length > 0) {
        full.push("You flagged ".concat(listLabels(priorities), " as the stuff you care about most. We didn't change those scores. We just bump them up when we rank what to do next."));
    }
    return {
        title: "Appearance summary",
        preview,
        full
    };
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
    return token ? {
        Authorization: "Bearer ".concat(token),
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
    let { report, faceSrc, usingUserPortrait, isUnlocked, topFeature, size = "default" } = param;
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
                        lineNumber: 155,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30",
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    !usingUserPortrait && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-white/55 backdrop-blur-sm",
                        children: "Demo portrait"
                    }, void 0, false, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 169,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-black/35 px-2.5 py-1 text-[10px] text-white/50 backdrop-blur-sm",
                        children: "Tap a point"
                    }, void 0, false, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    overlays.map((dot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OverlayDot, {
                            dot: dot,
                            score: report.features[dot.feature],
                            unlocked: isUnlocked(dot.feature),
                            active: selectedId === dot.id,
                            imgSize: imgSize,
                            boxSize: boxSize,
                            onSelect: ()=>setSelectedId((prev)=>prev === dot.id ? null : dot.id)
                        }, dot.id, false, {
                            fileName: "[project]/components/report/InteractivePortrait.tsx",
                            lineNumber: 179,
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
                                lineNumber: 195,
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
                                        lineNumber: 200,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/InteractivePortrait.tsx",
                                lineNumber: 198,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 194,
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
                        lineNumber: 208,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/InteractivePortrait.tsx",
                lineNumber: 147,
                columnNumber: 12
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/report/InteractivePortrait.tsx",
        lineNumber: 141,
        columnNumber: 5
    }, this);
}
_s(InteractivePortrait, "oY7FeZI5frJjmHXJTs5bAaaVrbo=");
_c = InteractivePortrait;
function OverlayDot(param) {
    let { dot, score, unlocked, active, imgSize, boxSize, onSelect } = param;
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
        "aria-label": "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][dot.feature], " — tap for breakdown"),
        "aria-pressed": active,
        onClick: (e)=>{
            e.stopPropagation();
            onSelect();
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
                lineNumber: 276,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "report-face-dot__ring ".concat(tone),
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/components/report/InteractivePortrait.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/report/InteractivePortrait.tsx",
        lineNumber: 262,
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
                                lineNumber: 322,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-0.5 truncate text-[13px] font-semibold text-white",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][feature]
                            }, void 0, false, {
                                fileName: "[project]/components/report/InteractivePortrait.tsx",
                                lineNumber: 325,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 321,
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
                        lineNumber: 329,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/InteractivePortrait.tsx",
                lineNumber: 320,
                columnNumber: 7
            }, this),
            !measurable ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-amber-300/90",
                        children: "Not measured"
                    }, void 0, false, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 341,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 line-clamp-4 text-[11px] leading-snug text-white/75",
                        children: (_packet_gateNote = packet.gateNote) !== null && _packet_gateNote !== void 0 ? _packet_gateNote : packet.observedSignal
                    }, void 0, false, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 344,
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
                                        lineNumber: 353,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/InteractivePortrait.tsx",
                                lineNumber: 351,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.1em] text-white/55",
                                children: packet.confidence
                            }, void 0, false, {
                                fileName: "[project]/components/report/InteractivePortrait.tsx",
                                lineNumber: 357,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 350,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1.5 line-clamp-3 text-[11px] leading-snug text-white/75",
                        children: packet.observedSignal
                    }, void 0, false, {
                        fileName: "[project]/components/report/InteractivePortrait.tsx",
                        lineNumber: 361,
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
                        lineNumber: 365,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1.5 text-[11px] leading-snug text-white/55",
                children: "Locked on free — unlock to see this region's score and signal."
            }, void 0, false, {
                fileName: "[project]/components/report/InteractivePortrait.tsx",
                lineNumber: 371,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/report/InteractivePortrait.tsx",
        lineNumber: 305,
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
"[project]/components/report/ReportOrbitLayout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReportOrbitLayout",
    ()=>ReportOrbitLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/types/report.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/feature-mutability.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$InteractivePortrait$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/report/InteractivePortrait.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function ReportOrbitLayout(param) {
    let { report, faceSrc, usingUserPortrait, isUnlocked, topFeature, paid, onUnlock, appearanceSummary, weakRecs, groomingMeasurable, compositeTen } = param;
    const clarity = report.features.skin_clarity;
    const jawline = report.features.jawline_definition;
    const grooming = report.features.grooming_signal;
    const symmetry = report.features.face_symmetry;
    var _grooming_gateNote;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "report-orbit relative z-10 mx-auto max-w-[90rem] px-4 pb-20 pt-2 text-white md:px-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "report-orbit__stage relative mx-auto min-h-[78svh] w-full max-w-6xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "report-orbit__portrait absolute left-1/2 top-1/2 z-10 w-[min(70vw,40rem)] -translate-x-1/2 -translate-y-1/2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$InteractivePortrait$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractivePortrait"], {
                            report: report,
                            faceSrc: faceSrc,
                            usingUserPortrait: usingUserPortrait,
                            isUnlocked: isUnlocked,
                            topFeature: topFeature,
                            size: "hero"
                        }, void 0, false, {
                            fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatCard, {
                        className: "report-orbit__card report-orbit__card--tl hidden max-w-[16rem] lg:block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] uppercase tracking-[0.16em] text-white/45",
                                children: "Overall"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-4xl font-semibold tracking-tight text-white",
                                children: [
                                    report.overallScore,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-1 text-sm font-normal text-white/35",
                                        children: "/100"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                        lineNumber: 74,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-white/45",
                                children: [
                                    "Index ",
                                    compositeTen,
                                    "/10 · measured composite"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatCard, {
                        className: "report-orbit__card report-orbit__card--tr hidden max-w-[17rem] lg:block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] uppercase tracking-[0.16em] text-white/40",
                                children: "Strongest"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm font-semibold text-white",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][topFeature]
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-0.5 text-2xl font-semibold text-white/80",
                                children: isUnlocked(topFeature) ? report.features[topFeature].score : "··"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatCard, {
                        className: "report-orbit__card report-orbit__card--ml hidden max-w-[15rem] lg:block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] uppercase tracking-[0.16em] text-white/40",
                                children: "Skin clarity"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-3xl font-semibold text-white",
                                children: isUnlocked("skin_clarity") ? clarity.score : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "blur-sm select-none",
                                    children: "72"
                                }, void 0, false, {
                                    fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 line-clamp-2 text-[11px] text-white/45",
                                children: isUnlocked("skin_clarity") ? clarity.observedSignal : "Unlock to reveal"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatCard, {
                        className: "report-orbit__card report-orbit__card--mr hidden max-w-[15rem] lg:block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] uppercase tracking-[0.16em] text-white/40",
                                children: "Jawline"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-3xl font-semibold text-white/85",
                                children: isUnlocked("jawline_definition") ? jawline.score : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "blur-sm select-none",
                                    children: "68"
                                }, void 0, false, {
                                    fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                    lineNumber: 115,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 line-clamp-2 text-[11px] text-white/45",
                                children: "Edge contrast along the jaw contour"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatCard, {
                        className: "report-orbit__card report-orbit__card--bl hidden max-w-[16rem] md:block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] uppercase tracking-[0.16em] text-white/40",
                                children: "Symmetry"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-2xl font-semibold text-white",
                                children: isUnlocked("face_symmetry") ? symmetry.score : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "blur-sm select-none",
                                    children: "74"
                                }, void 0, false, {
                                    fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                    lineNumber: 129,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 line-clamp-2 text-[11px] text-white/45",
                                children: isUnlocked("face_symmetry") ? symmetry.observedSignal : "Measured · unlock to reveal"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatCard, {
                        className: "report-orbit__card report-orbit__card--br hidden max-w-[16rem] md:block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] uppercase tracking-[0.16em] text-white/40",
                                children: "Grooming"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            !groomingMeasurable ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm font-medium text-amber-200/90",
                                children: "Not measured"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 144,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-2xl font-semibold text-white",
                                children: isUnlocked("grooming_signal") ? grooming.score : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "blur-sm select-none",
                                    children: "70"
                                }, void 0, false, {
                                    fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                    lineNumber: 150,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 line-clamp-2 text-[11px] text-white/45",
                                children: !groomingMeasurable ? (_grooming_gateNote = grooming.gateNote) !== null && _grooming_gateNote !== void 0 ? _grooming_gateNote : grooming.observedSignal : isUnlocked("grooming_signal") ? "Confidence · ".concat(grooming.confidence) : "Locked on free"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 grid gap-3 sm:grid-cols-2 lg:hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatCard, {
                        className: "report-orbit-float--static",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] uppercase tracking-[0.16em] text-white/45",
                                children: "Overall"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-3xl font-semibold text-white",
                                children: [
                                    report.overallScore,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-1 text-sm font-normal text-white/35",
                                        children: "/100"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                        lineNumber: 172,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatCard, {
                        className: "report-orbit-float--static",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] uppercase tracking-[0.16em] text-white/40",
                                children: "Strongest"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm font-semibold text-white",
                                children: [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][topFeature],
                                    " ·",
                                    " ",
                                    isUnlocked(topFeature) ? report.features[topFeature].score : "··"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 179,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto mt-6 grid max-w-4xl gap-4 lg:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatCard, {
                        className: "report-orbit-float--static max-w-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] uppercase tracking-[0.16em] text-white/45",
                                children: appearanceSummary.title
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this),
                            paid ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 space-y-3",
                                children: appearanceSummary.full.map((para, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm leading-relaxed text-white/75",
                                        children: para
                                    }, "orbit-sum-".concat(i), false, {
                                        fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                        lineNumber: 194,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 192,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "report-summary-fade mt-3 max-h-[7.5rem] space-y-3 overflow-hidden",
                                        children: appearanceSummary.preview.map((para, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm leading-relaxed text-white/75",
                                                children: para
                                            }, "orbit-prev-".concat(i), false, {
                                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                                lineNumber: 206,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                        lineNumber: 204,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 flex justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: onUnlock,
                                            className: "cursor-pointer rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white/85 transition hover:bg-white/15",
                                            children: "Unlock to view the full summary"
                                        }, void 0, false, {
                                            fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                            lineNumber: 215,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                        lineNumber: 214,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatCard, {
                        className: "report-orbit-float--static max-w-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] uppercase tracking-[0.16em] text-white/40",
                                children: "Next actions"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 228,
                                columnNumber: 11
                            }, this),
                            paid && weakRecs.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-3 space-y-2",
                                children: weakRecs.map((rec)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "rounded-xl border border-white/10 bg-white/5 px-3 py-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-white/90",
                                                children: rec.action
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                                lineNumber: 238,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-[10px] uppercase tracking-[0.12em] text-white/35",
                                                children: [
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][rec.feature],
                                                    " ·",
                                                    " ",
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MUTABILITY_LABELS"][rec.mutability === "actionable" || rec.mutability === "photo_sensitive" || rec.mutability === "structural" ? rec.mutability : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_MUTABILITY"][rec.feature]],
                                                    rec.checklistEligible === false ? " · not on checklist" : ""
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                                lineNumber: 239,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, rec.action, true, {
                                        fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                        lineNumber: 234,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 232,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-sm leading-relaxed text-white/45",
                                children: paid ? "No weak scores below 70 — keep your routine consistent." : "Unlock the full report to see paired recommendations."
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 256,
                                columnNumber: 13
                            }, this),
                            !paid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onUnlock,
                                className: "mt-4 w-full cursor-pointer rounded-xl bg-white py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-white/90",
                                children: "Unlock recommendations"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                                lineNumber: 263,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/ReportOrbitLayout.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/report/ReportOrbitLayout.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_c = ReportOrbitLayout;
function FloatCard(param) {
    let { children, className = "" } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "report-glass report-orbit-float rounded-2xl p-4 ".concat(className),
        children: children
    }, void 0, false, {
        fileName: "[project]/components/report/ReportOrbitLayout.tsx",
        lineNumber: 285,
        columnNumber: 5
    }, this);
}
_c1 = FloatCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "ReportOrbitLayout");
__turbopack_context__.k.register(_c1, "FloatCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/checklist.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Client helpers for Pro action checklists. */ __turbopack_context__.s([
    "fetchChecklist",
    ()=>fetchChecklist,
    "setChecklistItemDone",
    ()=>setChecklistItemDone
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
;
function authHeaders() {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
    return token ? {
        Authorization: "Bearer ".concat(token),
        "Content-Type": "application/json"
    } : {
        "Content-Type": "application/json"
    };
}
async function fetchChecklist(reportId) {
    const res = await fetch("/api/checklist/".concat(reportId), {
        headers: authHeaders()
    });
    if (res.status === 401 || res.status === 403) return null;
    const data = await res.json().catch(()=>null);
    if (!res.ok) {
        var _data_error;
        throw new Error((_data_error = data === null || data === void 0 ? void 0 : data.error) !== null && _data_error !== void 0 ? _data_error : "Failed to load checklist.");
    }
    var _data_checklist;
    return (_data_checklist = data === null || data === void 0 ? void 0 : data.checklist) !== null && _data_checklist !== void 0 ? _data_checklist : null;
}
async function setChecklistItemDone(reportId, itemId, completed) {
    const res = await fetch("/api/checklist/".concat(reportId, "/items/").concat(itemId), {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({
            completed
        })
    });
    const data = await res.json().catch(()=>null);
    if (!res.ok || !(data === null || data === void 0 ? void 0 : data.checklist)) {
        var _data_error;
        throw new Error((_data_error = data === null || data === void 0 ? void 0 : data.error) !== null && _data_error !== void 0 ? _data_error : "Failed to update checklist.");
    }
    return data.checklist;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/report/ActionChecklist.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionChecklist",
    ()=>ActionChecklist
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$checklist$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/checklist.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/types/report.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ActionChecklist(param) {
    let { reportId, highlight } = param;
    _s();
    const [checklist, setChecklist] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [busyId, setBusyId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ActionChecklist.useCallback[load]": async ()=>{
            setLoading(true);
            setError(null);
            try {
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$checklist$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchChecklist"])(reportId);
                setChecklist(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Could not load checklist.");
            } finally{
                setLoading(false);
            }
        }
    }["ActionChecklist.useCallback[load]"], [
        reportId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ActionChecklist.useEffect": ()=>{
            void load();
        }
    }["ActionChecklist.useEffect"], [
        load
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ActionChecklist.useEffect": ()=>{
            if (!highlight) return;
            const el = document.getElementById("action-checklist");
            if (!el) return;
            const id = window.setTimeout({
                "ActionChecklist.useEffect.id": ()=>{
                    el.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }["ActionChecklist.useEffect.id"], 400);
            return ({
                "ActionChecklist.useEffect": ()=>window.clearTimeout(id)
            })["ActionChecklist.useEffect"];
        }
    }["ActionChecklist.useEffect"], [
        highlight,
        checklist
    ]);
    async function toggle(itemId, completed) {
        setBusyId(itemId);
        setError(null);
        try {
            const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$checklist$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setChecklistItemDone"])(reportId, itemId, completed);
            setChecklist(updated);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Update failed.");
        } finally{
            setBusyId(null);
        }
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: "action-checklist",
            className: "report-glass rounded-3xl px-5 py-6 md:px-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-white/50",
                children: "Loading your action checklist…"
            }, void 0, false, {
                fileName: "[project]/components/report/ActionChecklist.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/report/ActionChecklist.tsx",
            lineNumber: 66,
            columnNumber: 7
        }, this);
    }
    if (!checklist) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "action-checklist",
        className: "report-glass rounded-3xl px-5 py-6 text-white md:px-6 ".concat(highlight ? "ring-2 ring-white/40" : ""),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-end justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs uppercase tracking-[0.18em] text-white/45",
                                children: "This week"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ActionChecklist.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-1 text-xl font-semibold text-white",
                                children: "Your action checklist"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ActionChecklist.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 max-w-xl text-sm leading-relaxed text-white/55",
                                children: "Only changeable levers — skin, grooming, brows, and photo setup. Structural reads stay on the report as context, not weekly chores."
                            }, void 0, false, {
                                fileName: "[project]/components/report/ActionChecklist.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ActionChecklist.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm tabular-nums text-white/60",
                        children: [
                            checklist.completedCount,
                            "/",
                            checklist.totalCount,
                            " done"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ActionChecklist.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/ActionChecklist.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 text-sm text-rose-300",
                role: "alert",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/report/ActionChecklist.tsx",
                lineNumber: 105,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-5 space-y-3",
                children: checklist.items.map((item)=>{
                    var _FEATURE_LABELS_item_featureKey;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: item.completed,
                                disabled: busyId === item.id,
                                onChange: (e)=>void toggle(item.id, e.target.checked),
                                className: "mt-1 size-4 cursor-pointer rounded border-white/30 bg-transparent accent-white",
                                "aria-label": "Mark done: ".concat(item.action)
                            }, void 0, false, {
                                fileName: "[project]/components/report/ActionChecklist.tsx",
                                lineNumber: 116,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium ".concat(item.completed ? "text-white/40 line-through" : "text-white/90"),
                                        children: item.action
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ActionChecklist.tsx",
                                        lineNumber: 125,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-white/40",
                                        children: [
                                            (_FEATURE_LABELS_item_featureKey = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][item.featureKey]) !== null && _FEATURE_LABELS_item_featureKey !== void 0 ? _FEATURE_LABELS_item_featureKey : item.featureKey,
                                            " · ",
                                            item.effort,
                                            " effort"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/report/ActionChecklist.tsx",
                                        lineNumber: 134,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ActionChecklist.tsx",
                                lineNumber: 124,
                                columnNumber: 13
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/components/report/ActionChecklist.tsx",
                        lineNumber: 112,
                        columnNumber: 11
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/report/ActionChecklist.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/report/ActionChecklist.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_s(ActionChecklist, "/Egfev/7Pi9fM3w+L3yNBRDKB98=");
_c = ActionChecklist;
var _c;
__turbopack_context__.k.register(_c, "ActionChecklist");
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
    // Prefer raw pixels — EXIF "from-image" can disagree with how WebPs are
    // stored and fight our manual 90° search.
    try {
        return await createImageBitmap(file);
    } catch (e) {
    /* fall through */ }
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
        return await createImageBitmap(img);
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
        // Prefer level eyes + larger face among full-frame hits.
        const bestFull = candidates.length ? [
            ...candidates
        ].sort((a, b)=>{
            const rollDiff = a.roll - b.roll;
            if (Math.abs(rollDiff) > 8) return rollDiff;
            return b.span - a.span;
        })[0] : null;
        var _bestFull_canvas;
        // Crops only on the best upright orientation (never on sideways pixels).
        const baseForCrop = (_bestFull_canvas = bestFull === null || bestFull === void 0 ? void 0 : bestFull.canvas) !== null && _bestFull_canvas !== void 0 ? _bestFull_canvas : drawRotated(prepared, 0);
        const needsCrop = !bestFull || bestFull.span < 0.08 || bestFull.roll > 35;
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
                if (span > 0.18 && roll < 30) break;
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
        candidates.sort((a, b)=>{
            const spanDiff = b.span - a.span;
            if (Math.abs(spanDiff) > 0.03) return spanDiff;
            return a.roll - b.roll;
        });
        const best = candidates[0];
        console.info("[MediaPipe] chose face pass", {
            label: best.label,
            fromCrop: best.fromCrop,
            quarters: best.quarters,
            roll: Math.round(best.roll),
            eyeSpan: Number(best.span.toFixed(3)),
            tried: candidates.length
        });
        // Always re-encode so preview is upright, opaque, and matches landmarks
        // (transparent / ultra-wide cutouts otherwise break detection + display).
        let canvasOut = best.canvas;
        let landmarksOut = best.landmarks;
        let quartersOut = best.quarters;
        if (best.fromCrop && bestFull && bestFull.span >= 0.08 && bestFull.roll <= 35) {
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
"[project]/components/report/ReportAnalyticsSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReportAnalyticsSection",
    ()=>ReportAnalyticsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/types/report.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/score-tone.ts [app-client] (ecmascript)");
"use client";
;
;
;
function ReportAnalyticsSection(param) {
    let { report, isUnlocked } = param;
    const clarity = report.features.skin_clarity;
    const symmetry = report.features.face_symmetry;
    const proportions = report.features.facial_proportions;
    const eyes = report.features.eye_spacing;
    const brows = report.features.eyebrow_shape;
    const jaw = report.features.jawline_definition;
    const radarKeys = [
        "skin_clarity",
        "face_symmetry",
        "facial_proportions",
        "jawline_definition",
        "eye_spacing",
        "eyebrow_shape"
    ];
    const radarScales = radarKeys.map((k)=>{
        if (!isUnlocked(k) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFeatureMeasurable"])(report.features[k].measurable)) {
            return 0.35;
        }
        return Math.max(0.2, Math.min(1, report.features[k].score / 100));
    });
    const rankedBars = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCORED_APPEARANCE_KEYS"].filter((k)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFeatureMeasurable"])(report.features[k].measurable)).map((k)=>({
            key: k,
            label: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][k],
            score: report.features[k].score,
            unlocked: isUnlocked(k)
        })).sort((a, b)=>b.score - a.score);
    // Facial thirds: balanced ideal ~0.33; skew slightly from proportions score.
    const prop = proportions.score / 100;
    const drift = (0.5 - prop) * 0.08;
    const thirds = [
        {
            label: "Upper",
            value: 0.33 + drift * 0.4,
            fill: 0.55 + prop * 0.35
        },
        {
            label: "Middle",
            value: 0.34 - drift * 0.2,
            fill: 0.6 + prop * 0.3
        },
        {
            label: "Lower",
            value: 0.33 - drift * 0.2,
            fill: 0.52 + prop * 0.35
        }
    ];
    const symTracks = [
        {
            label: "Eyes",
            pos: isUnlocked("eye_spacing") ? eyes.score / 100 : 0.45,
            locked: !isUnlocked("eye_spacing")
        },
        {
            label: "Brows",
            pos: isUnlocked("eyebrow_shape") ? brows.score / 100 : 0.45,
            locked: !isUnlocked("eyebrow_shape")
        },
        {
            label: "Jaw",
            pos: isUnlocked("jawline_definition") ? jaw.score / 100 : 0.45,
            locked: !isUnlocked("jawline_definition")
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative z-10 mx-auto max-w-7xl px-5 pb-10 md:px-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5 flex flex-wrap items-end justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs uppercase tracking-[0.18em] text-white/40",
                                children: "Analytic views"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-1 text-xl font-semibold text-white",
                                children: "How your signals read"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "max-w-sm text-xs leading-relaxed text-white/40",
                        children: "Same chart language as the product preview — now filled with your measured scores."
                    }, void 0, false, {
                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "report-glass report-chart-enter rounded-3xl p-4 text-white sm:p-5",
                        style: {
                            animationDelay: "40ms"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/45",
                                children: "Facial thirds"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-white/35",
                                children: [
                                    "Proportion balance ·",
                                    " ",
                                    isUnlocked("facial_proportions") ? proportions.score : "locked"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 space-y-2.5",
                                children: thirds.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-1 flex items-baseline justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] text-white/55",
                                                        children: row.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                                        lineNumber: 120,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[11px] tabular-nums ".concat(isUnlocked("facial_proportions") ? "text-white/85" : "blur-sm select-none text-white/40"),
                                                        children: row.value.toFixed(2)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                                        lineNumber: 121,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                                lineNumber: 119,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-1.5 overflow-hidden rounded-full bg-white/10",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-full rounded-full bg-gradient-to-r from-white/50 to-white/85",
                                                    style: {
                                                        width: isUnlocked("facial_proportions") ? "".concat(row.fill * 100, "%") : "28%"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                                    lineNumber: 132,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                                lineNumber: 131,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, row.label, true, {
                                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "report-glass report-chart-enter rounded-3xl p-4 text-white sm:p-5",
                        style: {
                            animationDelay: "100ms"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/45",
                                children: "Skin clarity"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                viewBox: "0 0 160 72",
                                className: "mt-2 w-full",
                                "aria-hidden": true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                            id: "reportDistFill",
                                            x1: "0",
                                            y1: "0",
                                            x2: "0",
                                            y2: "1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                    offset: "0%",
                                                    stopColor: "rgba(226,232,240,0.35)"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                    offset: "100%",
                                                    stopColor: "rgba(226,232,240,0)"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                                    lineNumber: 158,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                            lineNumber: 156,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M8 62 C 28 60, 40 18, 80 16 C 120 14, 132 52, 152 62",
                                        fill: "none",
                                        stroke: "rgba(255,255,255,0.55)",
                                        strokeWidth: "1.4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                        lineNumber: 161,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M80 16 C 100 15, 118 40, 132 54 L 132 62 L 80 62 Z",
                                        fill: "url(#reportDistFill)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                        lineNumber: 167,
                                        columnNumber: 13
                                    }, this),
                                    isUnlocked("skin_clarity") ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: 16 + clarity.score / 100 * 128,
                                        y1: "12",
                                        x2: 16 + clarity.score / 100 * 128,
                                        y2: "62",
                                        stroke: "rgba(255,255,255,0.9)",
                                        strokeWidth: "1.2",
                                        strokeDasharray: "3 3"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                        lineNumber: 172,
                                        columnNumber: 15
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 flex items-end justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-1.5 flex-1 overflow-hidden rounded-full bg-white/10",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full rounded-full bg-white/75",
                                            style: {
                                                width: isUnlocked("skin_clarity") ? "".concat(clarity.score, "%") : "30%"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                            lineNumber: 185,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                        lineNumber: 184,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-3 font-mono text-lg font-semibold tabular-nums ".concat(isUnlocked("skin_clarity") ? "text-white" : "blur-sm select-none text-white/40"),
                                        children: isUnlocked("skin_clarity") ? clarity.score : "72"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                        lineNumber: 194,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-[10px] text-white/40",
                                children: [
                                    "Confidence ·",
                                    " ",
                                    isUnlocked("skin_clarity") ? clarity.confidence : "—"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                lineNumber: 204,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "report-glass report-chart-enter rounded-3xl p-4 text-white sm:p-5",
                        style: {
                            animationDelay: "160ms"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/45",
                                children: "Symmetry map"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-white/35",
                                children: [
                                    "Overall ·",
                                    " ",
                                    isUnlocked("face_symmetry") ? symmetry.score : "locked"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                lineNumber: 218,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 space-y-3",
                                children: symTracks.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-1 flex justify-between text-[10px] text-white/40",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: t.label
                                                }, void 0, false, {
                                                    fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                                lineNumber: 225,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative h-2 rounded-full bg-white/10",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)] ".concat(t.locked ? "opacity-30" : ""),
                                                    style: {
                                                        left: "calc(".concat(t.pos * 100, "% - 5px)")
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                                lineNumber: 228,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, t.label, true, {
                                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                        lineNumber: 224,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                lineNumber: 222,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex justify-between text-[9px] uppercase tracking-[0.12em] text-white/30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Asym"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                        lineNumber: 240,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Sym"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                        lineNumber: 241,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                        lineNumber: 211,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "report-glass report-chart-enter rounded-3xl p-4 text-white sm:p-5",
                        style: {
                            animationDelay: "220ms"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/45",
                                        children: "Feature map"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                        lineNumber: 251,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-mono text-[10px] text-white/50",
                                        children: [
                                            "Composite",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white/90",
                                                children: report.overallScore
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                                lineNumber: 256,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                        lineNumber: 254,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                lineNumber: 250,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                viewBox: "0 0 160 150",
                                className: "mx-auto mt-1 w-[9.5rem]",
                                "aria-hidden": true,
                                children: [
                                    [
                                        0.35,
                                        0.55,
                                        0.75,
                                        1
                                    ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                            points: hexPoints(80, 78, 52 * s),
                                            fill: "none",
                                            stroke: "rgba(255,255,255,0.1)",
                                            strokeWidth: "1"
                                        }, s, false, {
                                            fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                            lineNumber: 265,
                                            columnNumber: 15
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                        points: hexPoints(80, 78, 48, radarScales),
                                        fill: "rgba(226,232,240,0.18)",
                                        stroke: "rgba(248,250,252,0.75)",
                                        strokeWidth: "1.3"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                        lineNumber: 273,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 grid grid-cols-2 gap-x-2 gap-y-0.5 text-[9px] text-white/40",
                                children: radarKeys.map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][k]
                                    }, k, false, {
                                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                        lineNumber: 282,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                lineNumber: 280,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "report-glass report-chart-enter mt-3 rounded-3xl p-5 text-white sm:p-6",
                style: {
                    animationDelay: "280ms"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-end justify-between gap-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/45",
                                    children: "Feature ranking"
                                }, void 0, false, {
                                    fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                    lineNumber: 297,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-sm text-white/50",
                                    children: "Strongest measured signals first"
                                }, void 0, false, {
                                    fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                    lineNumber: 300,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                            lineNumber: 296,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                        lineNumber: 295,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 space-y-3",
                        children: rankedBars.map((row, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-[7.5rem_1fr_2.5rem] items-center gap-3 sm:grid-cols-[10rem_1fr_3rem]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate text-xs text-white/60",
                                        children: row.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                        lineNumber: 308,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-2 overflow-hidden rounded-full bg-white/10",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full rounded-full bg-gradient-to-r from-white/35 via-white/70 to-white",
                                            style: {
                                                width: row.unlocked ? "".concat(row.score, "%") : "".concat(18 + i * 4, "%"),
                                                opacity: row.unlocked ? 1 : 0.35
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                            lineNumber: 310,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                        lineNumber: 309,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-right font-mono text-xs tabular-nums ".concat(row.unlocked ? "text-white/85" : "blur-[3px] select-none text-white/40"),
                                        children: row.unlocked ? row.score : "··"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                        lineNumber: 318,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, row.key, true, {
                                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                                lineNumber: 307,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                        lineNumber: 305,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
                lineNumber: 291,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/report/ReportAnalyticsSection.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c = ReportAnalyticsSection;
function hexPoints(cx, cy, r) {
    let scales = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : [
        1,
        1,
        1,
        1,
        1,
        1
    ];
    return Array.from({
        length: 6
    }, (_, i)=>{
        const angle = -Math.PI / 2 + i * Math.PI / 3;
        var _scales_i;
        const sr = r * ((_scales_i = scales[i]) !== null && _scales_i !== void 0 ? _scales_i : 1);
        return "".concat(cx + Math.cos(angle) * sr, ",").concat(cy + Math.sin(angle) * sr);
    }).join(" ");
}
var _c;
__turbopack_context__.k.register(_c, "ReportAnalyticsSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/site/PrivacyDataStatement.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PrivacyDataStatement",
    ()=>PrivacyDataStatement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
;
function PrivacyDataStatement(param) {
    let { tone = "light", compact = false } = param;
    const muted = tone === "dark" ? "text-white/55" : "text-neutral-500";
    const strong = tone === "dark" ? "text-white/85" : "text-neutral-800";
    const border = tone === "dark" ? "border-white/10 bg-white/5" : "border-neutral-200 bg-white";
    const link = tone === "dark" ? "text-white underline-offset-2 hover:underline" : "text-neutral-900 underline-offset-2 hover:underline";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "rounded-2xl border px-4 py-3 text-sm leading-relaxed ".concat(border, " ").concat(muted),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-medium ".concat(strong),
                children: "How we handle your photos"
            }, void 0, false, {
                fileName: "[project]/components/site/PrivacyDataStatement.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-2 list-disc space-y-1.5 pl-4 ".concat(compact ? "" : ""),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: [
                            "We do ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: [
                            "Extra upload photos are deleted after analysis by default. We keep a",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: [
                            "If you upload a ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: "Outfit stills are generative previews (fal.ai). They are not medical advice and are capped (1 free / more on Pro)."
                    }, void 0, false, {
                        fileName: "[project]/components/site/PrivacyDataStatement.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: [
                            "We do ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3",
                children: [
                    "Full terms:",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/privacy",
                        className: "font-medium ".concat(link),
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
_c = PrivacyDataStatement;
var _c;
__turbopack_context__.k.register(_c, "PrivacyDataStatement");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/report/ReportView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReportView",
    ()=>ReportView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/recommendations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/feature-mutability.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$summary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/appearance-summary.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/score-tone.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/types/report.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/use-auth-user.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$nav$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/site-nav.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$MobileNavSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/site/MobileNavSheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$InteractivePortrait$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/report/InteractivePortrait.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$ReportOrbitLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/report/ReportOrbitLayout.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$ActionChecklist$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/report/ActionChecklist.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$LookTrackPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/report/LookTrackPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$OutfitRecommendPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/report/OutfitRecommendPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$ReportAnalyticsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/report/ReportAnalyticsSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$PrivacyDataStatement$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/site/PrivacyDataStatement.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
;
;
;
const FREE_TOP_COUNT = 2;
const LAYOUT_STORAGE_KEY = "zelko-report-layout";
function ReportView(param) {
    let { report, initialPaid = false } = param;
    _s();
    const [paid, setPaid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialPaid);
    const [signupOpen, setSignupOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    /** Why the auth modal opened — unlock requires account before Stripe. */ const [signupReason, setSignupReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("save");
    const [layout, setLayout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("classic");
    const [unlockBusy, setUnlockBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [unlockError, setUnlockError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [checkoutJustSucceeded, setCheckoutJustSucceeded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { user, ready, isAuthed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthUser"])();
    const navLinks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$nav$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navForAuth"])(isAuthed);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReportView.useEffect": ()=>{
            try {
                const stored = window.localStorage.getItem(LAYOUT_STORAGE_KEY);
                if (stored === "classic" || stored === "orbit") setLayout(stored);
            } catch (e) {
            /* ignore */ }
        }
    }["ReportView.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReportView.useEffect": ()=>{
            if (user === null || user === void 0 ? void 0 : user.isPro) setPaid(true);
        }
    }["ReportView.useEffect"], [
        user === null || user === void 0 ? void 0 : user.isPro
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReportView.useEffect": ()=>{
            let cancelled = false;
            void ({
                "ReportView.useEffect": async ()=>{
                    // After Stripe redirect, poll briefly — webhook may lag.
                    if ("object" !== "undefined" && new URLSearchParams(window.location.search).get("checkout") === "success") {
                        setCheckoutJustSucceeded(true);
                        for(let i = 0; i < 5; i++){
                            await new Promise({
                                "ReportView.useEffect": (r)=>setTimeout(r, 1200)
                            }["ReportView.useEffect"]);
                            const again = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchMe"])();
                            if (cancelled) return;
                            if (again === null || again === void 0 ? void 0 : again.isPro) {
                                setPaid(true);
                                try {
                                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["linkReportToAccount"])(report.id);
                                } catch (e) {
                                /* report may already be linked */ }
                                break;
                            }
                        }
                    }
                }
            })["ReportView.useEffect"]();
            return ({
                "ReportView.useEffect": ()=>{
                    cancelled = true;
                }
            })["ReportView.useEffect"];
        }
    }["ReportView.useEffect"], [
        report.id
    ]);
    // Soft “save report” prompt only for guests — never for signed-in users.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReportView.useEffect": ()=>{
            if (!ready || !isAuthed) return;
            let cancelled = false;
            void ({
                "ReportView.useEffect": async ()=>{
                    try {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["linkReportToAccount"])(report.id);
                    } catch (e) {
                    /* already linked to someone else, or guest edge */ }
                    if (cancelled) return;
                }
            })["ReportView.useEffect"]();
            return ({
                "ReportView.useEffect": ()=>{
                    cancelled = true;
                }
            })["ReportView.useEffect"];
        }
    }["ReportView.useEffect"], [
        ready,
        isAuthed,
        report.id
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReportView.useEffect": ()=>{
            if (!ready || isAuthed) {
                if (isAuthed) setSignupOpen(false);
                return;
            }
            const id = window.setTimeout({
                "ReportView.useEffect.id": ()=>{
                    setSignupReason({
                        "ReportView.useEffect.id": (reason)=>reason === "unlock" ? reason : "save"
                    }["ReportView.useEffect.id"]);
                    setSignupOpen(true);
                }
            }["ReportView.useEffect.id"], 2800);
            return ({
                "ReportView.useEffect": ()=>window.clearTimeout(id)
            })["ReportView.useEffect"];
        }
    }["ReportView.useEffect"], [
        ready,
        isAuthed
    ]);
    /** Stripe / Pro checkout — callers must already be authenticated. */ async function runProCheckout() {
        setUnlockError(null);
        setUnlockBusy(true);
        try {
            const me = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchMe"])();
            if (!me) {
                setSignupReason("unlock");
                setSignupOpen(true);
                return;
            }
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["linkReportToAccount"])(report.id);
            } catch (e) {
            /* already linked or guest edge */ }
            if (me.isPro) {
                setPaid(true);
                return;
            }
            const checkout = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startProCheckout"])({
                successPath: "/report/".concat(report.id, "?checkout=success"),
                cancelPath: "/report/".concat(report.id, "?checkout=cancel")
            });
            if (checkout.alreadyPro) {
                setPaid(true);
                return;
            }
            if (checkout.url) {
                window.location.href = checkout.url;
                return;
            }
            if (checkout.devUnlock) {
                const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["devUnlockPro"])();
                if (updated.isPro) setPaid(true);
                return;
            }
            var _checkout_error;
            setUnlockError((_checkout_error = checkout.error) !== null && _checkout_error !== void 0 ? _checkout_error : "Billing is not configured yet. Set Stripe keys on the backend.");
        } catch (err) {
            setUnlockError(err instanceof Error ? err.message : "Could not start checkout.");
        } finally{
            setUnlockBusy(false);
        }
    }
    /** Unlock Pro: account first, then checkout. */ async function handleUnlock() {
        setUnlockError(null);
        const me = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchMe"])();
        if (!me) {
            setSignupReason("unlock");
            setSignupOpen(true);
            return;
        }
        await runProCheckout();
    }
    function switchLayout(next) {
        setLayout(next);
        try {
            window.localStorage.setItem(LAYOUT_STORAGE_KEY, next);
        } catch (e) {
        /* ignore */ }
    }
    const ranked = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ReportView.useMemo[ranked]": ()=>{
            return [
                ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCORED_APPEARANCE_KEYS"]
            ].filter({
                "ReportView.useMemo[ranked]": (k)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFeatureMeasurable"])(report.features[k].measurable)
            }["ReportView.useMemo[ranked]"]).sort({
                "ReportView.useMemo[ranked]": (a, b)=>report.features[b].score - report.features[a].score
            }["ReportView.useMemo[ranked]"]);
        }
    }["ReportView.useMemo[ranked]"], [
        report.features
    ]);
    const freeUnlocked = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ReportView.useMemo[freeUnlocked]": ()=>new Set(ranked.slice(0, FREE_TOP_COUNT))
    }["ReportView.useMemo[freeUnlocked]"], [
        ranked
    ]);
    const isUnlocked = (key)=>paid || freeUnlocked.has(key);
    var _ranked_;
    const topFeature = (_ranked_ = ranked[0]) !== null && _ranked_ !== void 0 ? _ranked_ : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCORED_APPEARANCE_KEYS"][0];
    const clarity = report.features.skin_clarity;
    const jawline = report.features.jawline_definition;
    const grooming = report.features.grooming_signal;
    const groomingMeasurable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFeatureMeasurable"])(grooming.measurable);
    const symmetry = report.features.face_symmetry;
    const proportions = report.features.facial_proportions;
    const weakRecs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ReportView.useMemo[weakRecs]": ()=>{
            if (!paid) return [];
            var _report_priorityFeatures;
            const priority = new Set((_report_priorityFeatures = report.priorityFeatures) !== null && _report_priorityFeatures !== void 0 ? _report_priorityFeatures : []);
            // Personalization only reorders recommendations — scores stay as measured.
            // Prefer actionable first, then photo-sensitive setup tips; structural last.
            const mutRank = {
                "ReportView.useMemo[weakRecs].mutRank": (k)=>{
                    const m = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_MUTABILITY"][k];
                    if (m === "actionable") return 0;
                    if (m === "photo_sensitive") return 1;
                    return 2;
                }
            }["ReportView.useMemo[weakRecs].mutRank"];
            const weak = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCORED_APPEARANCE_KEYS"].filter({
                "ReportView.useMemo[weakRecs].weak": (k)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFeatureMeasurable"])(report.features[k].measurable) && report.features[k].score < 70
            }["ReportView.useMemo[weakRecs].weak"]).sort({
                "ReportView.useMemo[weakRecs].weak": (a, b)=>{
                    const aPri = priority.has(a) ? 0 : 1;
                    const bPri = priority.has(b) ? 0 : 1;
                    if (aPri !== bPri) return aPri - bPri;
                    const m = mutRank(a) - mutRank(b);
                    if (m !== 0) return m;
                    return report.features[a].score - report.features[b].score;
                }
            }["ReportView.useMemo[weakRecs].weak"]);
            return weak.flatMap({
                "ReportView.useMemo[weakRecs]": (k)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recommendationsForScore"])(k, report.features[k].score).slice(0, 1).map({
                        "ReportView.useMemo[weakRecs]": (rec)=>({
                                feature: k,
                                ...rec
                            })
                    }["ReportView.useMemo[weakRecs]"])
            }["ReportView.useMemo[weakRecs]"]).slice(0, 4);
        }
    }["ReportView.useMemo[weakRecs]"], [
        paid,
        report.features,
        report.priorityFeatures
    ]);
    const appearanceSummary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ReportView.useMemo[appearanceSummary]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appearance$2d$summary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildAppearanceSummary"])(report)
    }["ReportView.useMemo[appearanceSummary]"], [
        report
    ]);
    const compositeTen = (report.overallScore / 10).toFixed(1);
    var _portraitUrl;
    const faceSrc = (_portraitUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portraitUrl"])(report.portraitFileId)) !== null && _portraitUrl !== void 0 ? _portraitUrl : "/woman1.png";
    const usingUserPortrait = Boolean(report.portraitFileId);
    var _report_baselineReportId, _report_baselineReportId1, _grooming_gateNote;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "report-dash relative min-h-screen overflow-hidden text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": true,
                className: "report-dash__bg"
            }, void 0, false, {
                fileName: "[project]/components/report/ReportView.tsx",
                lineNumber: 285,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "relative z-20 mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-5 md:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "flex items-center gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex size-8 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white/90",
                                children: "Z"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 289,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-lg font-semibold tracking-tight text-white",
                                children: "Zelko"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 292,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 288,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden items-center gap-1 rounded-full border border-white/12 bg-white/8 p-1 shadow-sm backdrop-blur-xl lg:flex",
                        children: isAuthed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                navLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: link.href,
                                        className: "rounded-full px-3.5 py-1.5 text-sm text-white/50 transition hover:text-white",
                                        children: link.label
                                    }, link.href, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 301,
                                        columnNumber: 17
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-neutral-950",
                                    children: "Report"
                                }, void 0, false, {
                                    fileName: "[project]/components/report/ReportView.tsx",
                                    lineNumber: 309,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "rounded-full px-3.5 py-1.5 text-sm text-white/50 transition hover:text-white",
                                    children: "home"
                                }, void 0, false, {
                                    fileName: "[project]/components/report/ReportView.tsx",
                                    lineNumber: 315,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-neutral-950",
                                    children: "result"
                                }, void 0, false, {
                                    fileName: "[project]/components/report/ReportView.tsx",
                                    lineNumber: 321,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/tracking",
                                    className: "rounded-full px-3.5 py-1.5 text-sm text-white/50 transition hover:text-white",
                                    children: "progress"
                                }, void 0, false, {
                                    fileName: "[project]/components/report/ReportView.tsx",
                                    lineNumber: 324,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 297,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center rounded-full border border-white/12 bg-white/8 p-0.5 backdrop-blur-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>switchLayout("classic"),
                                        className: "cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-medium transition ".concat(layout === "classic" ? "bg-white/15 text-white" : "text-white/45 hover:text-white/75"),
                                        "aria-pressed": layout === "classic",
                                        children: "Classic"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 336,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>switchLayout("orbit"),
                                        className: "cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-medium transition ".concat(layout === "orbit" ? "bg-white/15 text-white" : "text-white/45 hover:text-white/75"),
                                        "aria-pressed": layout === "orbit",
                                        children: "Orbit"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 348,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 335,
                                columnNumber: 11
                            }, this),
                            !paid ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void handleUnlock(),
                                disabled: unlockBusy,
                                className: "cursor-pointer rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-neutral-950 transition hover:bg-white/90 disabled:opacity-60",
                                children: unlockBusy ? "…" : "Unlock"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 362,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200",
                                children: "Full report"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 371,
                                columnNumber: 13
                            }, this),
                            isAuthed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/login",
                                className: "hidden rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-sm text-white/70 backdrop-blur-xl transition hover:bg-white/15 sm:inline",
                                children: "Account"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 376,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/login",
                                className: "hidden rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-sm text-white/70 backdrop-blur-xl transition hover:bg-white/15 sm:inline",
                                children: "Sign in"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 383,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$MobileNavSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuToggleButton"], {
                                open: menuOpen,
                                onClick: ()=>setMenuOpen((v)=>!v),
                                light: true
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 390,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 334,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/ReportView.tsx",
                lineNumber: 287,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$MobileNavSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileNavSheet"], {
                open: menuOpen,
                onClose: ()=>setMenuOpen(false),
                links: isAuthed ? [
                    ...navLinks,
                    {
                        label: "This report",
                        href: "/report/".concat(report.id)
                    }
                ] : [
                    {
                        label: "Home",
                        href: "/"
                    },
                    {
                        label: "Tracking",
                        href: "/tracking"
                    },
                    {
                        label: "Pricing",
                        href: "/pricing"
                    }
                ],
                extras: isAuthed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/login",
                    onClick: ()=>setMenuOpen(false),
                    className: "inline-flex w-full items-center justify-center rounded-xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white",
                    children: "Account"
                }, void 0, false, {
                    fileName: "[project]/components/report/ReportView.tsx",
                    lineNumber: 412,
                    columnNumber: 13
                }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/login",
                    onClick: ()=>setMenuOpen(false),
                    className: "inline-flex w-full items-center justify-center rounded-xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white",
                    children: "Sign in"
                }, void 0, false, {
                    fileName: "[project]/components/report/ReportView.tsx",
                    lineNumber: 420,
                    columnNumber: 13
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/components/report/ReportView.tsx",
                lineNumber: 398,
                columnNumber: 7
            }, this),
            unlockError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "relative z-20 mx-auto max-w-7xl px-5 pb-2 text-sm text-amber-200/90 md:px-8",
                children: unlockError
            }, void 0, false, {
                fileName: "[project]/components/report/ReportView.tsx",
                lineNumber: 432,
                columnNumber: 9
            }, this) : null,
            layout === "orbit" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$ReportOrbitLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportOrbitLayout"], {
                        report: report,
                        faceSrc: faceSrc,
                        usingUserPortrait: usingUserPortrait,
                        isUnlocked: isUnlocked,
                        topFeature: topFeature,
                        paid: paid,
                        onUnlock: ()=>void handleUnlock(),
                        appearanceSummary: appearanceSummary,
                        weakRecs: weakRecs,
                        groomingMeasurable: groomingMeasurable,
                        compositeTen: compositeTen
                    }, void 0, false, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 439,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 mx-auto max-w-md px-5 pb-8 md:px-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$OutfitRecommendPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OutfitRecommendPanel"], {
                            baselineReportId: report.kind === "target_look" ? (_report_baselineReportId = report.baselineReportId) !== null && _report_baselineReportId !== void 0 ? _report_baselineReportId : report.id : report.id,
                            isAuthed: isAuthed,
                            isPro: Boolean(user === null || user === void 0 ? void 0 : user.isPro) || paid,
                            reportPath: "/report/".concat(report.id)
                        }, void 0, false, {
                            fileName: "[project]/components/report/ReportView.tsx",
                            lineNumber: 453,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 452,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 mx-auto grid max-w-7xl gap-6 px-5 pb-24 pt-4 text-white md:px-8 lg:grid-cols-[1fr_minmax(16rem,22rem)_1fr] lg:gap-5 lg:pt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-4 lg:order-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "report-glass rounded-3xl p-6 md:p-7",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs uppercase tracking-[0.2em] text-white/45",
                                        children: "Appearance report"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 470,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "mt-3 font-[family-name:var(--font-cursive)] text-4xl leading-[1.1] text-white sm:text-5xl",
                                        children: "Your AI Appearance Report"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 473,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 max-w-sm text-sm leading-relaxed text-white/55",
                                        children: "Precise metrics from measurable features — each score names the signal behind it. Never a raw attractiveness number."
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 476,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 469,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "report-glass rounded-3xl p-5 md:p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs uppercase tracking-[0.16em] text-white/45",
                                        children: appearanceSummary.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 483,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative mt-3",
                                        children: paid ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3.5",
                                            children: appearanceSummary.full.map((para, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm leading-relaxed text-white/75",
                                                    children: para
                                                }, "summary-full-".concat(i), false, {
                                                    fileName: "[project]/components/report/ReportView.tsx",
                                                    lineNumber: 490,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/report/ReportView.tsx",
                                            lineNumber: 488,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "report-summary-fade max-h-[10rem] space-y-3.5 overflow-hidden",
                                                    children: [
                                                        appearanceSummary.preview.map((para, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm leading-relaxed text-white/75",
                                                                children: para
                                                            }, "summary-preview-".concat(i), false, {
                                                                fileName: "[project]/components/report/ReportView.tsx",
                                                                lineNumber: 502,
                                                                columnNumber: 23
                                                            }, this)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm leading-relaxed text-white/75",
                                                            "aria-hidden": true,
                                                            children: "More detail on softer spots, confidence notes, and what to do next sits behind Pro."
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/report/ReportView.tsx",
                                                            lineNumber: 510,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm leading-relaxed text-white/75",
                                                            "aria-hidden": true,
                                                            children: "Unlock the full appearance summary when you're ready for the complete write-up."
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/report/ReportView.tsx",
                                                            lineNumber: 514,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/report/ReportView.tsx",
                                                    lineNumber: 500,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative z-10 mt-3 flex justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>void handleUnlock(),
                                                        disabled: unlockBusy,
                                                        className: "cursor-pointer rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white/85 backdrop-blur-md transition hover:bg-white/15 hover:text-white disabled:opacity-60",
                                                        children: unlockBusy ? "Starting…" : "Unlock to view the full summary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/report/ReportView.tsx",
                                                        lineNumber: 520,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/report/ReportView.tsx",
                                                    lineNumber: 519,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 486,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 482,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "report-glass rounded-3xl p-5 md:p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs uppercase tracking-[0.16em] text-white/40",
                                                        children: "Overall composite"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/report/ReportView.tsx",
                                                        lineNumber: 537,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2 text-5xl font-semibold tracking-tight text-white md:text-6xl",
                                                        children: [
                                                            report.overallScore,
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ml-1 text-lg font-normal text-white/35",
                                                                children: "/ 100"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/report/ReportView.tsx",
                                                                lineNumber: 542,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/report/ReportView.tsx",
                                                        lineNumber: 540,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/report/ReportView.tsx",
                                                lineNumber: 536,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/70",
                                                children: "measured"
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/ReportView.tsx",
                                                lineNumber: 547,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 535,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScoreGauge, {
                                        value: report.overallScore
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 551,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-xs leading-relaxed text-white/40",
                                        children: report.retainForTracking ? "Photos retained for tracking (opt-in)." : report.portraitFileId ? "Portrait kept for this report; other source photos deleted." : report.photoDeletedAt ? "Source photos deleted after analysis." : "Analysis complete."
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 552,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 534,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricTile, {
                                        label: "Skin clarity",
                                        score: isUnlocked("skin_clarity") ? clarity.score : null,
                                        locked: !isUnlocked("skin_clarity"),
                                        accent: "neutral",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniSpark, {
                                            values: sparkFromScore(clarity.score)
                                        }, void 0, false, {
                                            fileName: "[project]/components/report/ReportView.tsx",
                                            lineNumber: 570,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 564,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricTile, {
                                        label: "Symmetry map",
                                        score: isUnlocked("face_symmetry") ? symmetry.score : null,
                                        locked: !isUnlocked("face_symmetry"),
                                        accent: "neutral",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DotScatter, {
                                            scores: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCORED_APPEARANCE_KEYS"].filter((k)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFeatureMeasurable"])(report.features[k].measurable)).map((k)=>({
                                                    key: k,
                                                    score: report.features[k].score,
                                                    unlocked: isUnlocked(k)
                                                }))
                                        }, void 0, false, {
                                            fileName: "[project]/components/report/ReportView.tsx",
                                            lineNumber: 578,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 572,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 563,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 468,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto flex w-full max-w-md flex-col gap-4 lg:order-2 lg:max-w-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$InteractivePortrait$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractivePortrait"], {
                                report: report,
                                faceSrc: faceSrc,
                                usingUserPortrait: usingUserPortrait,
                                isUnlocked: isUnlocked,
                                topFeature: topFeature
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 593,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$OutfitRecommendPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OutfitRecommendPanel"], {
                                baselineReportId: report.kind === "target_look" ? (_report_baselineReportId1 = report.baselineReportId) !== null && _report_baselineReportId1 !== void 0 ? _report_baselineReportId1 : report.id : report.id,
                                isAuthed: isAuthed,
                                isPro: Boolean(user === null || user === void 0 ? void 0 : user.isPro) || paid,
                                reportPath: "/report/".concat(report.id)
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 600,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 592,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-4 lg:order-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "report-glass flex flex-col items-center rounded-3xl p-6 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RingProgress, {
                                        value: isUnlocked("jawline_definition") ? jawline.score : 0,
                                        locked: !isUnlocked("jawline_definition"),
                                        label: "Jawline",
                                        color: "#e2e8f0"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 615,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-xs leading-relaxed text-white/45",
                                        children: "Edge contrast along the jaw contour — medium confidence tier."
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 621,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 614,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "report-glass rounded-3xl p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs uppercase tracking-[0.16em] text-white/40",
                                        children: "Grooming signal"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 627,
                                        columnNumber: 13
                                    }, this),
                                    !groomingMeasurable ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-lg font-semibold text-amber-200/90",
                                                children: "Not measured"
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/ReportView.tsx",
                                                lineNumber: 632,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-xs leading-relaxed text-white/55",
                                                children: (_grooming_gateNote = grooming.gateNote) !== null && _grooming_gateNote !== void 0 ? _grooming_gateNote : grooming.observedSignal
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/ReportView.tsx",
                                                lineNumber: 635,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-3xl font-semibold text-white",
                                                children: isUnlocked("grooming_signal") ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        grooming.score,
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-base font-normal text-white/35",
                                                            children: [
                                                                " ",
                                                                "/ 100"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/report/ReportView.tsx",
                                                            lineNumber: 645,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "blur-sm select-none",
                                                    children: "72"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/report/ReportView.tsx",
                                                    lineNumber: 651,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/ReportView.tsx",
                                                lineNumber: 641,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DropMeter, {
                                                filled: isUnlocked("grooming_signal") ? Math.round(grooming.score / 20) : 0
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/ReportView.tsx",
                                                lineNumber: 654,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-xs text-white/40",
                                                children: isUnlocked("grooming_signal") ? "Confidence · ".concat(grooming.confidence) : "Locked on free"
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/ReportView.tsx",
                                                lineNumber: 661,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 626,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "report-glass rounded-3xl p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs uppercase tracking-[0.16em] text-white/40",
                                        children: "Next actions"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 671,
                                        columnNumber: 13
                                    }, this),
                                    paid ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-sm leading-relaxed text-white/55",
                                        children: "Your checklist below only includes changeable levers (skin, grooming, brows, photo setup) — not fixed facial structure."
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 675,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-3 text-sm leading-relaxed text-white/45",
                                                children: "Unlock the full report to get a concrete Pro checklist tied to this score."
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/ReportView.tsx",
                                                lineNumber: 681,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>void handleUnlock(),
                                                disabled: unlockBusy,
                                                className: "mt-4 w-full rounded-xl bg-white py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-white/90 disabled:opacity-60",
                                                children: unlockBusy ? "Starting…" : "Unlock recommendations"
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/ReportView.tsx",
                                                lineNumber: 685,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 670,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "report-glass rounded-3xl p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs uppercase tracking-[0.16em] text-white/40",
                                        children: "Appearance index"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 698,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-4xl font-semibold text-white",
                                        children: [
                                            compositeTen,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-normal text-white/35",
                                                children: " / 10"
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/ReportView.tsx",
                                                lineNumber: 703,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 701,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 grid grid-cols-2 gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniRing, {
                                                label: "Proportions",
                                                value: isUnlocked("facial_proportions") ? proportions.score : null,
                                                color: "#f8fafc"
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/ReportView.tsx",
                                                lineNumber: 706,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniRing, {
                                                label: "Clarity",
                                                value: isUnlocked("skin_clarity") ? clarity.score : null,
                                                color: "#94a3b8"
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/ReportView.tsx",
                                                lineNumber: 713,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 705,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 697,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 613,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/ReportView.tsx",
                lineNumber: 466,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$ReportAnalyticsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportAnalyticsSection"], {
                report: report,
                isUnlocked: isUnlocked
            }, void 0, false, {
                fileName: "[project]/components/report/ReportView.tsx",
                lineNumber: 724,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative z-10 mx-auto max-w-7xl px-5 pb-16 md:px-8",
                children: [
                    paid ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8 space-y-4",
                        children: [
                            checkoutJustSucceeded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200",
                                children: "Pro is active. Your full report is unlocked — start the checklist below before your next weekly check-in."
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 731,
                                columnNumber: 15
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$ActionChecklist$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionChecklist"], {
                                reportId: report.id,
                                highlight: checkoutJustSucceeded
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 736,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$LookTrackPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LookTrackPanel"], {
                                baselineReport: report,
                                isAuthed: isAuthed,
                                isPro: Boolean(user === null || user === void 0 ? void 0 : user.isPro) || paid
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 740,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$PrivacyDataStatement$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrivacyDataStatement"], {
                                tone: "dark",
                                compact: true
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 745,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 729,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$report$2f$LookTrackPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LookTrackPanel"], {
                            baselineReport: report,
                            isAuthed: isAuthed,
                            isPro: Boolean(user === null || user === void 0 ? void 0 : user.isPro) || paid
                        }, void 0, false, {
                            fileName: "[project]/components/report/ReportView.tsx",
                            lineNumber: 749,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 748,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex flex-wrap items-end justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs uppercase tracking-[0.18em] text-white/40",
                                        children: "Feature breakdown"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 758,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-1 text-xl font-semibold text-white",
                                        children: "Individually measured"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 761,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 757,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/upload",
                                className: "text-sm text-white/50 underline-offset-4 hover:text-white hover:underline",
                                children: "Start another assessment"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 765,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 756,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                        children: ranked.map((key)=>{
                            const unlocked = isUnlocked(key);
                            const packet = report.features[key];
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "report-glass rounded-2xl px-4 py-4 text-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-white/90",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$types$2f$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_LABELS"][key]
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/ReportView.tsx",
                                                lineNumber: 782,
                                                columnNumber: 19
                                            }, this),
                                            unlocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-semibold text-white",
                                                children: packet.score
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/ReportView.tsx",
                                                lineNumber: 786,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "relative text-lg font-semibold text-white/30",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "blur-[5px] select-none",
                                                        children: packet.score
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/report/ReportView.tsx",
                                                        lineNumber: 791,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "absolute inset-0 flex items-center justify-center text-[9px] uppercase tracking-[0.14em] text-white/50",
                                                        children: "Locked"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/report/ReportView.tsx",
                                                        lineNumber: 794,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/report/ReportView.tsx",
                                                lineNumber: 790,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 781,
                                        columnNumber: 17
                                    }, this),
                                    unlocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-[10px] uppercase tracking-[0.12em] text-white/35",
                                                children: [
                                                    packet.confidence,
                                                    " confidence ·",
                                                    " ",
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MUTABILITY_LABELS"][__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_MUTABILITY"][key]]
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/report/ReportView.tsx",
                                                lineNumber: 802,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 line-clamp-2 text-xs leading-relaxed text-white/50",
                                                children: packet.observedSignal
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/ReportView.tsx",
                                                lineNumber: 806,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 line-clamp-2 text-[11px] leading-relaxed text-white/35",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MUTABILITY_HINTS"][__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$feature$2d$mutability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_MUTABILITY"][key]]
                                            }, void 0, false, {
                                                fileName: "[project]/components/report/ReportView.tsx",
                                                lineNumber: 809,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-xs text-white/35",
                                        children: "Measured · unlock to reveal"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 814,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, key, true, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 777,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 772,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/ReportView.tsx",
                lineNumber: 727,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SignupPrompt, {
                open: signupOpen,
                reason: signupReason,
                onClose: ()=>setSignupOpen(false),
                reportId: report.id,
                onAuthed: (authedUser)=>{
                    if (authedUser.isPro) {
                        setPaid(true);
                        setSignupOpen(false);
                        return;
                    }
                    if (signupReason === "unlock") {
                        setSignupOpen(false);
                        void runProCheckout();
                    }
                }
            }, void 0, false, {
                fileName: "[project]/components/report/ReportView.tsx",
                lineNumber: 824,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/report/ReportView.tsx",
        lineNumber: 284,
        columnNumber: 5
    }, this);
}
_s(ReportView, "SVMMQPl7UZns4gdATGxlBvs3yAc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthUser"]
    ];
});
_c = ReportView;
function SignupPrompt(param) {
    let { open, onClose, reportId, reason = "save", onAuthed } = param;
    _s1();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [firstName, setFirstName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("register");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sent, setSent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [linkedEmail, setLinkedEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const forUnlock = reason === "unlock";
    if (!open) return null;
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
            setLinkedEmail(result.user.email);
            onAuthed === null || onAuthed === void 0 ? void 0 : onAuthed(result.user);
            // Unlock flow continues to Stripe in onAuthed — skip “saved” screen.
            if (!forUnlock) setSent(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        } finally{
            setBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": "Dismiss",
                className: "absolute inset-0 bg-[#0a0414]/70 backdrop-blur-sm",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/components/report/ReportView.tsx",
                lineNumber: 892,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "dialog",
                "aria-modal": true,
                "aria-labelledby": "signup-prompt-title",
                className: "report-glass relative z-10 w-full max-w-md rounded-3xl p-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)] sm:p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onClose,
                        className: "absolute right-4 top-4 rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/50 transition hover:bg-white/10 hover:text-white",
                        children: "Close"
                    }, void 0, false, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 904,
                        columnNumber: 9
                    }, this),
                    sent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs uppercase tracking-[0.18em] text-white/45",
                                children: "Linked"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 914,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "signup-prompt-title",
                                className: "mt-2 text-2xl font-semibold text-white",
                                children: "Report saved to your account"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 917,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-sm leading-relaxed text-white/55",
                                children: [
                                    "Signed in as",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/85",
                                        children: linkedEmail
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 925,
                                        columnNumber: 15
                                    }, this),
                                    ". This report is linked for progress tracking when you re-upload."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 923,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 flex flex-wrap gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/tracking",
                                        className: "rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950",
                                        children: "Go to tracking"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 929,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: onClose,
                                        className: "rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/70",
                                        children: "Keep reading report"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 935,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 928,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 913,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: onSubmit,
                        className: "pt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs uppercase tracking-[0.18em] text-white/45",
                                children: forUnlock ? "Unlock Pro" : "Track progress"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 946,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "signup-prompt-title",
                                className: "mt-2 text-2xl font-semibold text-white",
                                children: forUnlock ? mode === "register" ? "Create an account to unlock Pro" : "Sign in to unlock Pro" : mode === "register" ? "Create an account to save this report" : "Sign in to link this report"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 949,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-sm leading-relaxed text-white/55",
                                children: forUnlock ? "Pro is tied to your account so full reports and tracking stay with you. After you sign up, we’ll take you to checkout." : "Re-upload weekly, compare under consistent lighting, and keep recommendations tied to this baseline."
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 961,
                                columnNumber: 13
                            }, this),
                            mode === "register" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "mt-5 block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs uppercase tracking-[0.14em] text-white/40",
                                        children: "First name"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 968,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        required: true,
                                        autoComplete: "given-name",
                                        value: firstName,
                                        onChange: (e)=>setFirstName(e.target.value),
                                        placeholder: "Alex",
                                        className: "mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/40"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 971,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 967,
                                columnNumber: 15
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block ".concat(mode === "register" ? "mt-3" : "mt-5"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs uppercase tracking-[0.14em] text-white/40",
                                        children: "Email"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 983,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "email",
                                        required: true,
                                        value: email,
                                        onChange: (e)=>setEmail(e.target.value),
                                        placeholder: "you@email.com",
                                        className: "mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/40"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 986,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 982,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "mt-3 block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs uppercase tracking-[0.14em] text-white/40",
                                        children: "Password"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 996,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "password",
                                        required: true,
                                        minLength: 8,
                                        value: password,
                                        onChange: (e)=>setPassword(e.target.value),
                                        placeholder: "At least 8 characters",
                                        className: "mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/40"
                                    }, void 0, false, {
                                        fileName: "[project]/components/report/ReportView.tsx",
                                        lineNumber: 999,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 995,
                                columnNumber: 13
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-sm text-rose-300",
                                role: "alert",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 1010,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: busy,
                                className: "mt-4 w-full rounded-xl bg-white py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/90 disabled:opacity-60",
                                children: busy ? "Working…" : forUnlock ? mode === "register" ? "Create account & continue" : "Sign in & continue" : mode === "register" ? "Create account & save report" : "Sign in & link report"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 1014,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    setMode((m)=>m === "register" ? "login" : "register");
                                    setError(null);
                                },
                                className: "mt-3 w-full text-center text-xs text-white/45 underline-offset-2 hover:text-white/70 hover:underline",
                                children: mode === "register" ? "Already have an account? Sign in" : "Need an account? Register"
                            }, void 0, false, {
                                fileName: "[project]/components/report/ReportView.tsx",
                                lineNumber: 1029,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 945,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/ReportView.tsx",
                lineNumber: 898,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/report/ReportView.tsx",
        lineNumber: 891,
        columnNumber: 5
    }, this);
}
_s1(SignupPrompt, "3rMY1FKB3rm8QOlWiWxCIoET6zY=");
_c1 = SignupPrompt;
function ScoreGauge(param) {
    let { value } = param;
    const pct = Math.max(0, Math.min(100, value));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative mt-5 h-2.5 overflow-hidden rounded-full bg-white/10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-full rounded-full bg-gradient-to-r from-white/40 via-white/80 to-white",
                style: {
                    width: "".concat(pct, "%")
                }
            }, void 0, false, {
                fileName: "[project]/components/report/ReportView.tsx",
                lineNumber: 1052,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-white bg-white shadow-[0_0_12px_rgba(255,255,255,0.55)]",
                style: {
                    left: "calc(".concat(pct, "% - 6px)")
                }
            }, void 0, false, {
                fileName: "[project]/components/report/ReportView.tsx",
                lineNumber: 1056,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/report/ReportView.tsx",
        lineNumber: 1051,
        columnNumber: 5
    }, this);
}
_c2 = ScoreGauge;
function MetricTile(param) {
    let { label, score, locked, accent, children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "report-glass rounded-2xl p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] uppercase tracking-[0.14em] text-white/40",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/report/ReportView.tsx",
                lineNumber: 1079,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-2xl font-semibold text-white",
                children: locked || score === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "blur-sm select-none text-white/50",
                    children: "68"
                }, void 0, false, {
                    fileName: "[project]/components/report/ReportView.tsx",
                    lineNumber: 1084,
                    columnNumber: 11
                }, this) : score
            }, void 0, false, {
                fileName: "[project]/components/report/ReportView.tsx",
                lineNumber: 1082,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 h-14 ".concat(accent === "blue" ? "text-slate-300" : "text-white/70"),
                children: children
            }, void 0, false, {
                fileName: "[project]/components/report/ReportView.tsx",
                lineNumber: 1089,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/report/ReportView.tsx",
        lineNumber: 1078,
        columnNumber: 5
    }, this);
}
_c3 = MetricTile;
function sparkFromScore(score) {
    const base = score / 100;
    return [
        0.35,
        0.42,
        0.38,
        0.55,
        0.5,
        0.62,
        0.58,
        base,
        base * 0.95,
        base
    ].map((v)=>Math.max(0.15, Math.min(1, v)));
}
function MiniSpark(param) {
    let { values } = param;
    const w = 120;
    const h = 40;
    const pts = values.map((v, i)=>{
        const x = i / (values.length - 1) * w;
        const y = h - v * (h - 4) - 2;
        return "".concat(x, ",").concat(y);
    }).join(" ");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 ".concat(w, " ").concat(h),
        className: "h-full w-full",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            points: pts,
            opacity: "0.85"
        }, void 0, false, {
            fileName: "[project]/components/report/ReportView.tsx",
            lineNumber: 1117,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/report/ReportView.tsx",
        lineNumber: 1116,
        columnNumber: 5
    }, this);
}
_c4 = MiniSpark;
function DotScatter(param) {
    let { scores } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-full w-full overflow-hidden rounded-lg bg-black/25",
        children: scores.map((s, i)=>{
            const x = 12 + i * 17 % 76;
            const y = 15 + (s.score * 0.55 + i * 7) % 70;
            const color = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$score$2d$tone$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scoreToneClass"])(s.score, s.unlocked);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute size-1.5 rounded-full ".concat(color, " opacity-80"),
                style: {
                    left: "".concat(x, "%"),
                    top: "".concat(y, "%")
                }
            }, s.key, false, {
                fileName: "[project]/components/report/ReportView.tsx",
                lineNumber: 1142,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/report/ReportView.tsx",
        lineNumber: 1136,
        columnNumber: 5
    }, this);
}
_c5 = DotScatter;
function RingProgress(param) {
    let { value, locked, label, color } = param;
    const r = 42;
    const c = 2 * Math.PI * r;
    const shown = locked ? 0 : value;
    const offset = c - shown / 100 * c;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative size-36",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 100 100",
                className: "size-full -rotate-90",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "50",
                        cy: "50",
                        r: r,
                        fill: "none",
                        stroke: "rgba(255,255,255,0.08)",
                        strokeWidth: "8"
                    }, void 0, false, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 1171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "50",
                        cy: "50",
                        r: r,
                        fill: "none",
                        stroke: color,
                        strokeWidth: "8",
                        strokeLinecap: "round",
                        strokeDasharray: c,
                        strokeDashoffset: offset,
                        className: "transition-[stroke-dashoffset] duration-700"
                    }, void 0, false, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 1179,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/ReportView.tsx",
                lineNumber: 1170,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex flex-col items-center justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] uppercase tracking-[0.14em] text-white/40",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 1193,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-2xl font-semibold text-white",
                        children: locked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "blur-sm select-none",
                            children: "71"
                        }, void 0, false, {
                            fileName: "[project]/components/report/ReportView.tsx",
                            lineNumber: 1198,
                            columnNumber: 13
                        }, this) : value
                    }, void 0, false, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 1196,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/ReportView.tsx",
                lineNumber: 1192,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/report/ReportView.tsx",
        lineNumber: 1169,
        columnNumber: 5
    }, this);
}
_c6 = RingProgress;
function MiniRing(param) {
    let { label, value, color } = param;
    const r = 18;
    const c = 2 * Math.PI * r;
    const shown = value !== null && value !== void 0 ? value : 0;
    const offset = c - shown / 100 * c;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 44 44",
                className: "size-11 -rotate-90",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "22",
                        cy: "22",
                        r: r,
                        fill: "none",
                        stroke: "rgba(255,255,255,0.08)",
                        strokeWidth: "4"
                    }, void 0, false, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 1224,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "22",
                        cy: "22",
                        r: r,
                        fill: "none",
                        stroke: color,
                        strokeWidth: "4",
                        strokeLinecap: "round",
                        strokeDasharray: c,
                        strokeDashoffset: value === null ? c : offset
                    }, void 0, false, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 1232,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/ReportView.tsx",
                lineNumber: 1223,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] uppercase tracking-[0.12em] text-white/40",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 1245,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-semibold text-white",
                        children: value === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "blur-sm select-none",
                            children: "80%"
                        }, void 0, false, {
                            fileName: "[project]/components/report/ReportView.tsx",
                            lineNumber: 1250,
                            columnNumber: 13
                        }, this) : "".concat(value)
                    }, void 0, false, {
                        fileName: "[project]/components/report/ReportView.tsx",
                        lineNumber: 1248,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/report/ReportView.tsx",
                lineNumber: 1244,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/report/ReportView.tsx",
        lineNumber: 1222,
        columnNumber: 5
    }, this);
}
_c7 = MiniRing;
function DropMeter(param) {
    let { filled } = param;
    const n = Math.max(0, Math.min(5, filled));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-3 flex gap-1.5",
        children: Array.from({
            length: 5
        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "h-2.5 flex-1 rounded-full ".concat(i < n ? "bg-gradient-to-r from-white/50 to-white" : "bg-white/10")
            }, i, false, {
                fileName: "[project]/components/report/ReportView.tsx",
                lineNumber: 1265,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/report/ReportView.tsx",
        lineNumber: 1263,
        columnNumber: 5
    }, this);
}
_c8 = DropMeter;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "ReportView");
__turbopack_context__.k.register(_c1, "SignupPrompt");
__turbopack_context__.k.register(_c2, "ScoreGauge");
__turbopack_context__.k.register(_c3, "MetricTile");
__turbopack_context__.k.register(_c4, "MiniSpark");
__turbopack_context__.k.register(_c5, "DotScatter");
__turbopack_context__.k.register(_c6, "RingProgress");
__turbopack_context__.k.register(_c7, "MiniRing");
__turbopack_context__.k.register(_c8, "DropMeter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_b1248cb1._.js.map