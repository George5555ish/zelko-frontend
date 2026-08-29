(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/SkinGlassLens.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SkinGlassLens",
    ()=>SkinGlassLens
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const LENS_ZOOM = 3.4;
const DEFAULT_DWELL_MS = 7000;
const DEFAULT_FADE_MS = 1200;
const DEFAULT_ENTER_DELAY_MS = 900;
const DEFAULT_GAP_MS = 1600;
/** Very slight drift while dwelling — almost still */ const PAN_RADIUS_X = 0.01;
const PAN_RADIUS_Y = 0.008;
const PAN_PERIOD_MS = 5500;
function offsetForMotion(motion, t) {
    const angle = t * Math.PI * 2;
    switch(motion){
        case "orbit":
            return {
                dx: Math.cos(angle) * PAN_RADIUS_X,
                dy: Math.sin(angle) * PAN_RADIUS_Y
            };
        case "sweep":
            return {
                dx: Math.sin(angle) * PAN_RADIUS_X * 1.15,
                dy: Math.sin(angle * 2) * PAN_RADIUS_Y * 0.4
            };
        case "figure8":
            return {
                dx: Math.sin(angle) * PAN_RADIUS_X,
                dy: Math.sin(angle * 2) * PAN_RADIUS_Y * 0.75
            };
        case "bob":
            return {
                dx: Math.sin(angle * 0.5) * PAN_RADIUS_X * 0.35,
                dy: Math.sin(angle) * PAN_RADIUS_Y
            };
        case "zigzag":
            return {
                dx: Math.sin(angle) * PAN_RADIUS_X,
                dy: Math.cos(angle * 2) * PAN_RADIUS_Y * 0.8
            };
    }
}
/** object-fit: cover + object-position mapping into a content box */ function coverLayout(mediaW, mediaH, boxW, boxH, posX, posY) {
    const scale = Math.max(boxW / mediaW, boxH / mediaH);
    const dw = mediaW * scale;
    const dh = mediaH * scale;
    const offsetX = (boxW - dw) * posX;
    const offsetY = (boxH - dh) * posY;
    return {
        scale,
        offsetX,
        offsetY
    };
}
function parseObjectPosition(value) {
    const parts = value.trim().split(/\s+/);
    const read = (part, fallback)=>{
        if (!part) return fallback;
        if (part.endsWith("%")) return Number.parseFloat(part) / 100;
        return fallback;
    };
    return {
        x: read(parts[0], 0.5),
        y: read(parts[1], 0.5)
    };
}
function SkinGlassLens(param) {
    let { active, imageSrc, useVideoZoom = false, syncVideoRef, containerRef, stops: stopsProp, stop, objectPosition = "50% 50%", className = "", enterDelayMs = DEFAULT_ENTER_DELAY_MS, dwellMs = DEFAULT_DWELL_MS, fadeMs = DEFAULT_FADE_MS, gapMs = DEFAULT_GAP_MS, loop = true, persist = false, exiting = false, lite = false } = param;
    var _stops_, _stops_1, _stops_2, _stops_3, _stops_4;
    _s();
    const stops = stopsProp !== null && stopsProp !== void 0 ? stopsProp : stop ? [
        stop
    ] : [];
    const stopKey = stops.map((s)=>{
        var _s_offsetXPx, _s_offsetYPx;
        return "".concat(s.label, ":").concat(s.x, ":").concat(s.y, ":").concat((_s_offsetXPx = s.offsetXPx) !== null && _s_offsetXPx !== void 0 ? _s_offsetXPx : 0, ":").concat((_s_offsetYPx = s.offsetYPx) !== null && _s_offsetYPx !== void 0 ? _s_offsetYPx : 0, ":").concat(s.motion);
    }).join("|");
    const lensRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const zoomImgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const syncVideoRefStable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(syncVideoRef);
    syncVideoRefStable.current = syncVideoRef;
    const stopsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(stops);
    stopsRef.current = stops;
    var _stops__x, _stops__y;
    const posRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: (_stops__x = (_stops_ = stops[0]) === null || _stops_ === void 0 ? void 0 : _stops_.x) !== null && _stops__x !== void 0 ? _stops__x : 0,
        y: (_stops__y = (_stops_1 = stops[0]) === null || _stops_1 === void 0 ? void 0 : _stops_1.y) !== null && _stops__y !== void 0 ? _stops__y : 0
    });
    var _stops__offsetXPx;
    const offsetXPxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])((_stops__offsetXPx = (_stops_2 = stops[0]) === null || _stops_2 === void 0 ? void 0 : _stops_2.offsetXPx) !== null && _stops__offsetXPx !== void 0 ? _stops__offsetXPx : 0);
    var _stops__offsetYPx;
    const offsetYPxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])((_stops__offsetYPx = (_stops_3 = stops[0]) === null || _stops_3 === void 0 ? void 0 : _stops_3.offsetYPx) !== null && _stops__offsetYPx !== void 0 ? _stops__offsetYPx : 0);
    const objectPos = parseObjectPosition(objectPosition);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    var _stops__label;
    const [label, setLabel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])((_stops__label = (_stops_4 = stops[0]) === null || _stops_4 === void 0 ? void 0 : _stops_4.label) !== null && _stops__label !== void 0 ? _stops__label : "");
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(exiting);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SkinGlassLens.useEffect": ()=>{
            if (!active || stops.length === 0) return;
            if (exiting) {
                setReady(true);
                return;
            }
            const id = window.setTimeout({
                "SkinGlassLens.useEffect.id": ()=>setReady(true)
            }["SkinGlassLens.useEffect.id"], 80);
            return ({
                "SkinGlassLens.useEffect": ()=>window.clearTimeout(id)
            })["SkinGlassLens.useEffect"];
        }
    }["SkinGlassLens.useEffect"], [
        active,
        stops.length,
        exiting
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SkinGlassLens.useEffect": ()=>{
            if (!ready || stops.length === 0) return;
            const lens = lensRef.current;
            var _containerRef_current, _ref;
            const parent = (_ref = (_containerRef_current = containerRef === null || containerRef === void 0 ? void 0 : containerRef.current) !== null && _containerRef_current !== void 0 ? _containerRef_current : lens === null || lens === void 0 ? void 0 : lens.offsetParent) !== null && _ref !== void 0 ? _ref : lens === null || lens === void 0 ? void 0 : lens.parentElement;
            const img = zoomImgRef.current;
            const canvas = canvasRef.current;
            if (!lens || !parent || !(parent instanceof HTMLElement)) return;
            if (useVideoZoom && !canvas) return;
            if (!useVideoZoom && !img) return;
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            let cancelled = false;
            let fadeTimer = 0;
            let dwellTimer = 0;
            let raf = 0;
            let stopIndex = 0;
            var _canvas_getContext;
            const ctx = (_canvas_getContext = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d", {
                alpha: false
            })) !== null && _canvas_getContext !== void 0 ? _canvas_getContext : null;
            const paintCanvas = {
                "SkinGlassLens.useEffect.paintCanvas": ()=>{
                    var _syncVideoRefStable_current;
                    if (!canvas || !ctx) return;
                    const source = (_syncVideoRefStable_current = syncVideoRefStable.current) === null || _syncVideoRefStable_current === void 0 ? void 0 : _syncVideoRefStable_current.current;
                    if (!source || source.readyState < 2) return;
                    const mediaW = source.videoWidth;
                    const mediaH = source.videoHeight;
                    if (!mediaW || !mediaH) return;
                    const pw = parent.clientWidth;
                    const ph = parent.clientHeight;
                    const size = lens.offsetWidth;
                    if (size < 2 || pw < 2 || ph < 2) return;
                    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
                    const pixel = Math.max(1, Math.round(size * dpr));
                    if (canvas.width !== pixel || canvas.height !== pixel) {
                        canvas.width = pixel;
                        canvas.height = pixel;
                    }
                    const { scale, offsetX, offsetY } = coverLayout(mediaW, mediaH, pw, ph, objectPos.x, objectPos.y);
                    const { x: xFrac, y: yFrac } = posRef.current;
                    const cx = xFrac * pw + offsetXPxRef.current + size / 2;
                    const cy = yFrac * ph + offsetYPxRef.current + size / 2;
                    const view = size / LENS_ZOOM;
                    const left = cx - view / 2;
                    const top = cy - view / 2;
                    let sx = (left - offsetX) / scale;
                    let sy = (top - offsetY) / scale;
                    let sw = view / scale;
                    let sh = view / scale;
                    // Keep sample rect inside the video frame so we never paint empty black.
                    if (sw > mediaW) {
                        sx = 0;
                        sw = mediaW;
                    } else {
                        sx = Math.max(0, Math.min(sx, mediaW - sw));
                    }
                    if (sh > mediaH) {
                        sy = 0;
                        sh = mediaH;
                    } else {
                        sy = Math.max(0, Math.min(sy, mediaH - sh));
                    }
                    try {
                        ctx.drawImage(source, sx, sy, sw, sh, 0, 0, pixel, pixel);
                    } catch (e) {
                        ctx.fillStyle = "#1a1c20";
                        ctx.fillRect(0, 0, pixel, pixel);
                    }
                }
            }["SkinGlassLens.useEffect.paintCanvas"];
            const moveLens = {
                "SkinGlassLens.useEffect.moveLens": function(xFrac, yFrac) {
                    let offsetXPx = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : offsetXPxRef.current, offsetYPx = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : offsetYPxRef.current;
                    posRef.current = {
                        x: xFrac,
                        y: yFrac
                    };
                    offsetXPxRef.current = offsetXPx;
                    offsetYPxRef.current = offsetYPx;
                    const pw = parent.clientWidth;
                    const ph = parent.clientHeight;
                    const size = lens.offsetWidth;
                    const left = xFrac * pw + offsetXPx;
                    const top = yFrac * ph + offsetYPx;
                    lens.style.left = "".concat(left, "px");
                    lens.style.top = "".concat(top, "px");
                    if (img) {
                        const cx = left + size / 2;
                        const cy = top + size / 2;
                        img.style.width = "".concat(pw * LENS_ZOOM, "px");
                        img.style.height = "".concat(ph * LENS_ZOOM, "px");
                        img.style.left = "".concat(size / 2 - cx * LENS_ZOOM, "px");
                        img.style.top = "".concat(size / 2 - cy * LENS_ZOOM, "px");
                    }
                }
            }["SkinGlassLens.useEffect.moveLens"];
            const placeAt = {
                "SkinGlassLens.useEffect.placeAt": function(xFrac, yFrac) {
                    let offsetXPx = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : offsetXPxRef.current, offsetYPx = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : offsetYPxRef.current;
                    moveLens(xFrac, yFrac, offsetXPx, offsetYPx);
                    if (useVideoZoom) paintCanvas();
                }
            }["SkinGlassLens.useEffect.placeAt"];
            const stopPan = {
                "SkinGlassLens.useEffect.stopPan": ()=>{
                    if (raf) {
                        window.cancelAnimationFrame(raf);
                        window.clearTimeout(raf);
                        raf = 0;
                    }
                }
            }["SkinGlassLens.useEffect.stopPan"];
            const startPan = {
                "SkinGlassLens.useEffect.startPan": (stop)=>{
                    stopPan();
                    var _stop_offsetXPx;
                    const ox = (_stop_offsetXPx = stop.offsetXPx) !== null && _stop_offsetXPx !== void 0 ? _stop_offsetXPx : 0;
                    var _stop_offsetYPx;
                    const oy = (_stop_offsetYPx = stop.offsetYPx) !== null && _stop_offsetYPx !== void 0 ? _stop_offsetYPx : 0;
                    placeAt(stop.x, stop.y, ox, oy);
                    if (reduced) return;
                    const origin = performance.now();
                    let lastPaint = 0;
                    // Lite: pan every frame, paint canvas ~12fps to stay cheap
                    const paintEveryMs = lite ? 80 : 0;
                    const tick = {
                        "SkinGlassLens.useEffect.startPan.tick": (now)=>{
                            if (cancelled) return;
                            const t = (now - origin) % PAN_PERIOD_MS / PAN_PERIOD_MS;
                            const { dx, dy } = offsetForMotion(stop.motion, t);
                            if (paintEveryMs > 0) {
                                moveLens(stop.x + dx, stop.y + dy, ox, oy);
                                if (now - lastPaint >= paintEveryMs) {
                                    paintCanvas();
                                    lastPaint = now;
                                }
                            } else {
                                placeAt(stop.x + dx, stop.y + dy, ox, oy);
                            }
                            raf = window.requestAnimationFrame(tick);
                        }
                    }["SkinGlassLens.useEffect.startPan.tick"];
                    raf = window.requestAnimationFrame(tick);
                }
            }["SkinGlassLens.useEffect.startPan"];
            const showStop = {
                "SkinGlassLens.useEffect.showStop": (index)=>{
                    if (cancelled) return;
                    const list = stopsRef.current;
                    const current = list[index];
                    if (!current) return;
                    var _current_offsetXPx, _current_offsetYPx;
                    placeAt(current.x, current.y, (_current_offsetXPx = current.offsetXPx) !== null && _current_offsetXPx !== void 0 ? _current_offsetXPx : 0, (_current_offsetYPx = current.offsetYPx) !== null && _current_offsetYPx !== void 0 ? _current_offsetYPx : 0);
                    setLabel(current.label);
                    setVisible(true);
                    startPan(current);
                    if (reduced) return;
                    if (persist) return;
                    dwellTimer = window.setTimeout({
                        "SkinGlassLens.useEffect.showStop": ()=>{
                            if (cancelled) return;
                            stopPan();
                            var _current_offsetXPx, _current_offsetYPx;
                            placeAt(current.x, current.y, (_current_offsetXPx = current.offsetXPx) !== null && _current_offsetXPx !== void 0 ? _current_offsetXPx : 0, (_current_offsetYPx = current.offsetYPx) !== null && _current_offsetYPx !== void 0 ? _current_offsetYPx : 0);
                            setVisible(false);
                            fadeTimer = window.setTimeout({
                                "SkinGlassLens.useEffect.showStop": ()=>{
                                    if (cancelled) return;
                                    if (!loop) return;
                                    if (list.length === 1) {
                                        fadeTimer = window.setTimeout({
                                            "SkinGlassLens.useEffect.showStop": ()=>{
                                                if (cancelled) return;
                                                showStop(0);
                                            }
                                        }["SkinGlassLens.useEffect.showStop"], gapMs);
                                    } else {
                                        stopIndex = (index + 1) % list.length;
                                        const pause = index === list.length - 1 ? gapMs : 0;
                                        if (pause > 0) {
                                            fadeTimer = window.setTimeout({
                                                "SkinGlassLens.useEffect.showStop": ()=>{
                                                    if (cancelled) return;
                                                    showStop(stopIndex);
                                                }
                                            }["SkinGlassLens.useEffect.showStop"], pause);
                                        } else {
                                            showStop(stopIndex);
                                        }
                                    }
                                }
                            }["SkinGlassLens.useEffect.showStop"], fadeMs);
                        }
                    }["SkinGlassLens.useEffect.showStop"], dwellMs);
                }
            }["SkinGlassLens.useEffect.showStop"];
            const first = stopsRef.current[0];
            if (!first) return;
            var _first_offsetXPx, _first_offsetYPx;
            placeAt(first.x, first.y, (_first_offsetXPx = first.offsetXPx) !== null && _first_offsetXPx !== void 0 ? _first_offsetXPx : 0, (_first_offsetYPx = first.offsetYPx) !== null && _first_offsetYPx !== void 0 ? _first_offsetYPx : 0);
            setLabel(first.label);
            if (exiting) {
                setVisible(true);
                var _first_offsetXPx1, _first_offsetYPx1;
                placeAt(first.x, first.y, (_first_offsetXPx1 = first.offsetXPx) !== null && _first_offsetXPx1 !== void 0 ? _first_offsetXPx1 : 0, (_first_offsetYPx1 = first.offsetYPx) !== null && _first_offsetYPx1 !== void 0 ? _first_offsetYPx1 : 0);
                fadeTimer = window.setTimeout({
                    "SkinGlassLens.useEffect": ()=>{
                        if (cancelled) return;
                        setVisible(false);
                    }
                }["SkinGlassLens.useEffect"], 40);
            } else {
                fadeTimer = window.setTimeout({
                    "SkinGlassLens.useEffect": ()=>showStop(0)
                }["SkinGlassLens.useEffect"], enterDelayMs);
            }
            const onResize = {
                "SkinGlassLens.useEffect.onResize": ()=>{
                    const list = stopsRef.current;
                    var _list_stopIndex;
                    const current = (_list_stopIndex = list[stopIndex]) !== null && _list_stopIndex !== void 0 ? _list_stopIndex : list[0];
                    if (current) {
                        var _current_offsetXPx, _current_offsetYPx;
                        placeAt(current.x, current.y, (_current_offsetXPx = current.offsetXPx) !== null && _current_offsetXPx !== void 0 ? _current_offsetXPx : 0, (_current_offsetYPx = current.offsetYPx) !== null && _current_offsetYPx !== void 0 ? _current_offsetYPx : 0);
                    }
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
        ready,
        stopKey,
        enterDelayMs,
        dwellMs,
        fadeMs,
        gapMs,
        loop,
        persist,
        exiting,
        useVideoZoom,
        lite,
        containerRef,
        objectPos.x,
        objectPos.y
    ]);
    if (stops.length === 0) return null;
    const transitionMs = "".concat(fadeMs, "ms");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: lensRef,
        className: "skin-glass-lens pointer-events-none absolute z-20 ".concat(active && visible ? "is-active" : "", " ").concat(className).trim(),
        style: {
            transitionProperty: "opacity, transform",
            transitionDuration: "".concat(transitionMs, ", ").concat(transitionMs),
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1), cubic-bezier(0.22, 1, 0.36, 1)",
            opacity: active && visible ? 1 : 0
        },
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "skin-glass-lens__ring",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "skin-glass-lens__zoom",
                        children: useVideoZoom ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                            ref: canvasRef,
                            className: "skin-glass-lens__zoom-canvas"
                        }, void 0, false, {
                            fileName: "[project]/components/SkinGlassLens.tsx",
                            lineNumber: 476,
                            columnNumber: 13
                        }, this) : // eslint-disable-next-line @next/next/no-img-element
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            ref: zoomImgRef,
                            src: imageSrc,
                            alt: "",
                            className: "skin-glass-lens__zoom-img",
                            style: {
                                objectPosition
                            },
                            draggable: false
                        }, void 0, false, {
                            fileName: "[project]/components/SkinGlassLens.tsx",
                            lineNumber: 482,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/SkinGlassLens.tsx",
                        lineNumber: 474,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "skin-glass-lens__glare"
                    }, void 0, false, {
                        fileName: "[project]/components/SkinGlassLens.tsx",
                        lineNumber: 492,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/SkinGlassLens.tsx",
                lineNumber: 473,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "skin-glass-lens__label",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/SkinGlassLens.tsx",
                lineNumber: 494,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/SkinGlassLens.tsx",
        lineNumber: 459,
        columnNumber: 5
    }, this);
}
_s(SkinGlassLens, "hmYPQ5Utmauyr2XhpDm9ErBKJmM=");
_c = SkinGlassLens;
var _c;
__turbopack_context__.k.register(_c, "SkinGlassLens");
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
"[project]/components/landing/GlassPillNav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GlassPillNav",
    ()=>GlassPillNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$MobileNavSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/site/MobileNavSheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$nav$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/site-nav.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/use-auth-user.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function GlassPillNav() {
    _s();
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { user, isAuthed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthUser"])();
    const navLinks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$nav$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navForAuth"])(isAuthed);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlassPillNav.useEffect": ()=>{
            const onScroll = {
                "GlassPillNav.useEffect.onScroll": ()=>setScrolled(window.scrollY >= 24)
            }["GlassPillNav.useEffect.onScroll"];
            onScroll();
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            return ({
                "GlassPillNav.useEffect": ()=>window.removeEventListener("scroll", onScroll)
            })["GlassPillNav.useEffect"];
        }
    }["GlassPillNav.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ".concat(scrolled ? "px-3 pt-3 sm:px-5 sm:pt-4" : "px-0 pt-0"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "pointer-events-auto flex w-full items-center justify-between gap-3 text-white transition-[max-width,padding,background-color,backdrop-filter,border-radius,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ".concat(scrolled ? "max-w-3xl rounded-full border border-white/15 bg-[#1a1c20]/72 px-4 py-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:px-5 sm:py-2.5" : "max-w-none rounded-none border border-transparent bg-transparent px-5 py-4 backdrop-blur-none sm:px-8 sm:py-5 md:px-10"),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex shrink-0 items-center gap-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LogoMark, {}, void 0, false, {
                                    fileName: "[project]/components/landing/GlassPillNav.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "sr-only",
                                    children: "Zelko"
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/GlassPillNav.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/landing/GlassPillNav.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "hidden items-center text-[0.9rem] text-white/75 lg:flex ".concat(scrolled ? "gap-5" : "gap-7"),
                            children: navLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: link.href,
                                    className: "transition hover:text-white",
                                    children: link.label
                                }, link.href, false, {
                                    fileName: "[project]/components/landing/GlassPillNav.tsx",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/landing/GlassPillNav.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 sm:gap-3",
                            children: [
                                isAuthed && (user === null || user === void 0 ? void 0 : user.isPro) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white sm:inline",
                                    children: "Pro"
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/GlassPillNav.tsx",
                                    lineNumber: 66,
                                    columnNumber: 15
                                }, this) : null,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: isAuthed ? "/dashboard" : "/login",
                                    className: "hidden text-sm text-white/75 transition hover:text-white sm:inline",
                                    children: isAuthed ? "Dashboard" : "Log in"
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/GlassPillNav.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/upload",
                                    className: "hidden rounded-full text-sm font-semibold text-[#1a1e24] transition hover:bg-white/92 sm:inline-flex ".concat(scrolled ? "bg-white px-3.5 py-1.5" : "bg-white px-4 py-2 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]"),
                                    children: "Start free report"
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/GlassPillNav.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$MobileNavSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuToggleButton"], {
                                    open: menuOpen,
                                    onClick: ()=>setMenuOpen((v)=>!v),
                                    light: true
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/GlassPillNav.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/landing/GlassPillNav.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/landing/GlassPillNav.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/landing/GlassPillNav.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$site$2f$MobileNavSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileNavSheet"], {
                open: menuOpen,
                onClose: ()=>setMenuOpen(false),
                links: navLinks,
                extras: isAuthed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/upload",
                            onClick: ()=>setMenuOpen(false),
                            className: "inline-flex w-full items-center justify-center rounded-xl bg-neutral-950 px-5 py-3.5 text-sm font-semibold text-white",
                            children: "New assessment"
                        }, void 0, false, {
                            fileName: "[project]/components/landing/GlassPillNav.tsx",
                            lineNumber: 102,
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
                                    fileName: "[project]/components/landing/GlassPillNav.tsx",
                                    lineNumber: 110,
                                    columnNumber: 17
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setMenuOpen(false);
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAuthToken"])(null);
                                        window.location.href = "/";
                                    },
                                    className: "inline-flex flex-1 cursor-pointer items-center justify-center rounded-xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white",
                                    children: "Sign out"
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/GlassPillNav.tsx",
                                    lineNumber: 117,
                                    columnNumber: 17
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/landing/GlassPillNav.tsx",
                            lineNumber: 109,
                            columnNumber: 15
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/landing/GlassPillNav.tsx",
                    lineNumber: 101,
                    columnNumber: 13
                }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/upload",
                            onClick: ()=>setMenuOpen(false),
                            className: "inline-flex w-full items-center justify-center rounded-xl bg-neutral-950 px-5 py-3.5 text-sm font-semibold text-white",
                            children: "Start your free report"
                        }, void 0, false, {
                            fileName: "[project]/components/landing/GlassPillNav.tsx",
                            lineNumber: 132,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/login",
                            onClick: ()=>setMenuOpen(false),
                            className: "inline-flex w-full items-center justify-center rounded-xl border border-neutral-900/70 px-4 py-3 text-sm font-medium text-neutral-900",
                            children: "Log in"
                        }, void 0, false, {
                            fileName: "[project]/components/landing/GlassPillNav.tsx",
                            lineNumber: 139,
                            columnNumber: 15
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/landing/GlassPillNav.tsx",
                    lineNumber: 131,
                    columnNumber: 13
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/components/landing/GlassPillNav.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(GlassPillNav, "HJbiFFmm5faaUjlZESoSw6i60wY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthUser"]
    ];
});
_c = GlassPillNav;
function LogoMark() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "22",
        height: "22",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": true,
        className: "text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "9",
                stroke: "currentColor",
                strokeWidth: "1.4"
            }, void 0, false, {
                fileName: "[project]/components/landing/GlassPillNav.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8.2 14.5 12 7.5l3.8 7",
                stroke: "currentColor",
                strokeWidth: "1.4",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/components/landing/GlassPillNav.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing/GlassPillNav.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
_c1 = LogoMark;
var _c, _c1;
__turbopack_context__.k.register(_c, "GlassPillNav");
__turbopack_context__.k.register(_c1, "LogoMark");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/LandingHero.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LandingHero",
    ()=>LandingHero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SkinGlassLens$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SkinGlassLens.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$GlassPillNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing/GlassPillNav.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const HERO_VIDEOS = [
    "/output.mp4",
    "/output2.mp4"
];
/** Each clip stays up for this long, then we crossfade to the next */ const VIDEO_INTERVAL_MS = 4000;
/** Crossfade length — must match `.hero-video-slide.is-fading-in` (~1s) */ const VIDEO_FADE_MS = 1000;
/** Face center on the hero video stage (mid-frame where the subject sits). */ const FACE_CX = 0.5;
const FACE_CY = 0.44;
const LENS_BATCHES = [
    [
        {
            x: FACE_CX - 0.04,
            y: FACE_CY + 0.1,
            offsetYPx: 200,
            label: "Skin clarity",
            motion: "orbit"
        },
        {
            x: FACE_CX - 0.06,
            y: FACE_CY - 0.06,
            offsetYPx: 200,
            label: "Jawline definition",
            motion: "sweep"
        }
    ],
    [
        {
            x: FACE_CX - 0.055,
            y: FACE_CY - 0.03,
            offsetXPx: 50,
            offsetYPx: -50,
            label: "Eye spacing",
            motion: "bob"
        },
        {
            x: FACE_CX - 0.02,
            y: FACE_CY - 0.1,
            offsetXPx: 50,
            offsetYPx: -50,
            label: "Forehead tone",
            motion: "zigzag"
        }
    ],
    [
        {
            x: FACE_CX,
            y: FACE_CY + 0.05,
            offsetXPx: -30,
            offsetYPx: 100,
            label: "Lip definition",
            motion: "figure8"
        },
        {
            x: FACE_CX + 0.06,
            y: FACE_CY - 0.01,
            offsetXPx: -30,
            offsetYPx: 100,
            label: "Cheek volume",
            motion: "orbit"
        }
    ]
];
const LANDMARK_BATCHES = [
    [
        {
            id: "forehead",
            x: FACE_CX,
            y: FACE_CY - 0.09
        },
        {
            id: "eye-l",
            x: FACE_CX - 0.04,
            y: FACE_CY - 0.03
        }
    ],
    [
        {
            id: "eye-r",
            x: FACE_CX + 0.04,
            y: FACE_CY - 0.03
        },
        {
            id: "cheek",
            x: FACE_CX + 0.07,
            y: FACE_CY + 0.02
        }
    ],
    [
        {
            id: "lip",
            x: FACE_CX,
            y: FACE_CY + 0.07
        },
        {
            id: "jaw",
            x: FACE_CX,
            y: FACE_CY + 0.13
        }
    ]
];
const BATCH_STAGGER_MS = 280;
const BATCH_DWELL_MS = 3800;
const BATCH_FADE_MS = 280;
const BATCH_GAP_MS = 3000;
const BATCH_ENTER_BASE_MS = 0;
const BATCH_START_DELAY_MS = 3000;
const LENSES_MAX_MS = 30_000;
const LM_START_DELAY_MS = 900;
const LM_STAGGER_MS = 180;
const LM_DWELL_MS = 2400;
const LM_FADE_MS = 220;
const LM_GAP_MS = 1400;
function playFromStart(video) {
    if (!video) return;
    try {
        video.currentTime = 0;
    } catch (e) {
    /* ignore */ }
    void video.play().catch(()=>{});
}
function pauseAndReset(video) {
    if (!video) return;
    video.pause();
    try {
        video.currentTime = 0;
    } catch (e) {
    /* ignore */ }
}
function LandingHero() {
    _s();
    const [started, setStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeVideo, setActiveVideo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [previousVideo, setPreviousVideo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lensBatch, setLensBatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [lensesReady, setLensesReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lensesDone, setLensesDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [landmarkBatch, setLandmarkBatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [landmarksReady, setLandmarksReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [landmarksVisible, setLandmarksVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [landmarksDone, setLandmarksDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const videoRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const activeVideoSyncRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const stageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LandingHero.useEffect": ()=>{
            const id = window.setTimeout({
                "LandingHero.useEffect.id": ()=>setStarted(true)
            }["LandingHero.useEffect.id"], 60);
            return ({
                "LandingHero.useEffect": ()=>window.clearTimeout(id)
            })["LandingHero.useEffect"];
        }
    }["LandingHero.useEffect"], []);
    // Dual-video interval crossfade
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LandingHero.useEffect": ()=>{
            var _videoRefs_current_;
            playFromStart((_videoRefs_current_ = videoRefs.current[0]) !== null && _videoRefs_current_ !== void 0 ? _videoRefs_current_ : null);
            var _videoRefs_current_1;
            activeVideoSyncRef.current = (_videoRefs_current_1 = videoRefs.current[0]) !== null && _videoRefs_current_1 !== void 0 ? _videoRefs_current_1 : null;
            const id = window.setInterval({
                "LandingHero.useEffect.id": ()=>{
                    setActiveVideo({
                        "LandingHero.useEffect.id": (current)=>{
                            const next = (current + 1) % HERO_VIDEOS.length;
                            setPreviousVideo(current);
                            var _videoRefs_current_next;
                            playFromStart((_videoRefs_current_next = videoRefs.current[next]) !== null && _videoRefs_current_next !== void 0 ? _videoRefs_current_next : null);
                            var _videoRefs_current_next1;
                            activeVideoSyncRef.current = (_videoRefs_current_next1 = videoRefs.current[next]) !== null && _videoRefs_current_next1 !== void 0 ? _videoRefs_current_next1 : null;
                            window.setTimeout({
                                "LandingHero.useEffect.id": ()=>{
                                    setPreviousVideo({
                                        "LandingHero.useEffect.id": (prev)=>{
                                            if (prev === current) {
                                                var _videoRefs_current_current;
                                                pauseAndReset((_videoRefs_current_current = videoRefs.current[current]) !== null && _videoRefs_current_current !== void 0 ? _videoRefs_current_current : null);
                                                return null;
                                            }
                                            return prev;
                                        }
                                    }["LandingHero.useEffect.id"]);
                                }
                            }["LandingHero.useEffect.id"], VIDEO_FADE_MS);
                            return next;
                        }
                    }["LandingHero.useEffect.id"]);
                }
            }["LandingHero.useEffect.id"], VIDEO_INTERVAL_MS);
            return ({
                "LandingHero.useEffect": ()=>window.clearInterval(id)
            })["LandingHero.useEffect"];
        }
    }["LandingHero.useEffect"], []);
    // Landmark + lens batch timers
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LandingHero.useEffect": ()=>{
            if (!started) return;
            const landmarksId = window.setTimeout({
                "LandingHero.useEffect.landmarksId": ()=>{
                    setLandmarksReady(true);
                    setLandmarksVisible(true);
                }
            }["LandingHero.useEffect.landmarksId"], LM_START_DELAY_MS);
            const lensesId = window.setTimeout({
                "LandingHero.useEffect.lensesId": ()=>setLensesReady(true)
            }["LandingHero.useEffect.lensesId"], BATCH_START_DELAY_MS);
            const stopId = window.setTimeout({
                "LandingHero.useEffect.stopId": ()=>setLensesDone(true)
            }["LandingHero.useEffect.stopId"], LENSES_MAX_MS);
            return ({
                "LandingHero.useEffect": ()=>{
                    window.clearTimeout(landmarksId);
                    window.clearTimeout(lensesId);
                    window.clearTimeout(stopId);
                }
            })["LandingHero.useEffect"];
        }
    }["LandingHero.useEffect"], [
        started
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LandingHero.useEffect": ()=>{
            if (!landmarksReady || landmarksDone) return;
            var _LANDMARK_BATCHES_landmarkBatch;
            const batch = (_LANDMARK_BATCHES_landmarkBatch = LANDMARK_BATCHES[landmarkBatch]) !== null && _LANDMARK_BATCHES_landmarkBatch !== void 0 ? _LANDMARK_BATCHES_landmarkBatch : LANDMARK_BATCHES[0];
            const lastEnter = (batch.length - 1) * LM_STAGGER_MS;
            const hideAt = lastEnter + LM_DWELL_MS;
            const advanceAt = hideAt + LM_FADE_MS + LM_GAP_MS;
            const hideId = window.setTimeout({
                "LandingHero.useEffect.hideId": ()=>setLandmarksVisible(false)
            }["LandingHero.useEffect.hideId"], hideAt);
            const advanceId = window.setTimeout({
                "LandingHero.useEffect.advanceId": ()=>{
                    if (landmarkBatch >= LANDMARK_BATCHES.length - 1) {
                        setLandmarksDone(true);
                        return;
                    }
                    setLandmarkBatch({
                        "LandingHero.useEffect.advanceId": (b)=>b + 1
                    }["LandingHero.useEffect.advanceId"]);
                    setLandmarksVisible(true);
                }
            }["LandingHero.useEffect.advanceId"], advanceAt);
            return ({
                "LandingHero.useEffect": ()=>{
                    window.clearTimeout(hideId);
                    window.clearTimeout(advanceId);
                }
            })["LandingHero.useEffect"];
        }
    }["LandingHero.useEffect"], [
        landmarksReady,
        landmarksDone,
        landmarkBatch
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LandingHero.useEffect": ()=>{
            if (!lensesReady || lensesDone) return;
            var _LENS_BATCHES_lensBatch;
            const batch = (_LENS_BATCHES_lensBatch = LENS_BATCHES[lensBatch]) !== null && _LENS_BATCHES_lensBatch !== void 0 ? _LENS_BATCHES_lensBatch : LENS_BATCHES[0];
            const lastEnter = (batch.length - 1) * BATCH_STAGGER_MS;
            const advanceAt = lastEnter + BATCH_DWELL_MS + BATCH_FADE_MS + BATCH_GAP_MS;
            const advanceId = window.setTimeout({
                "LandingHero.useEffect.advanceId": ()=>{
                    if (lensBatch >= LENS_BATCHES.length - 1) {
                        setLensBatch(0);
                        return;
                    }
                    setLensBatch({
                        "LandingHero.useEffect.advanceId": (b)=>b + 1
                    }["LandingHero.useEffect.advanceId"]);
                }
            }["LandingHero.useEffect.advanceId"], advanceAt);
            return ({
                "LandingHero.useEffect": ()=>window.clearTimeout(advanceId)
            })["LandingHero.useEffect"];
        }
    }["LandingHero.useEffect"], [
        lensesReady,
        lensesDone,
        lensBatch
    ]);
    var _LANDMARK_BATCHES_landmarkBatch, _LENS_BATCHES_lensBatch;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: stageRef,
        className: "relative min-h-[100svh] overflow-hidden bg-[#2a3038] text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$GlassPillNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassPillNav"], {}, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 242,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-0",
                children: [
                    HERO_VIDEOS.map((src, i)=>{
                        const isActive = i === activeVideo;
                        const isPrevious = i === previousVideo;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hero-video-slide absolute inset-0 ".concat(isActive ? previousVideo !== null ? "is-fading-in z-[1]" : "z-[1] !opacity-100" : isPrevious ? "z-0 !opacity-100" : "z-0"),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                ref: (el)=>{
                                    videoRefs.current[i] = el;
                                    if (isActive) activeVideoSyncRef.current = el;
                                },
                                className: "absolute inset-0 h-full w-full object-cover object-[50%_32%]",
                                src: src,
                                muted: true,
                                playsInline: true,
                                preload: isActive || isPrevious ? "auto" : "metadata"
                            }, void 0, false, {
                                fileName: "[project]/components/LandingHero.tsx",
                                lineNumber: 262,
                                columnNumber: 15
                            }, this)
                        }, src, false, {
                            fileName: "[project]/components/LandingHero.tsx",
                            lineNumber: 250,
                            columnNumber: 13
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": true,
                        className: "absolute inset-0 z-[2] bg-[#3a4554]/12 mix-blend-multiply"
                    }, void 0, false, {
                        fileName: "[project]/components/LandingHero.tsx",
                        lineNumber: 276,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": true,
                        className: "hero-edge-vignette absolute inset-0 z-[3]"
                    }, void 0, false, {
                        fileName: "[project]/components/LandingHero.tsx",
                        lineNumber: 280,
                        columnNumber: 9
                    }, this),
                    landmarksReady && !landmarksDone && ((_LANDMARK_BATCHES_landmarkBatch = LANDMARK_BATCHES[landmarkBatch]) !== null && _LANDMARK_BATCHES_landmarkBatch !== void 0 ? _LANDMARK_BATCHES_landmarkBatch : []).map((mark, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "hero-landmark pointer-events-none max-lg:hidden ".concat(landmarksVisible ? "is-on" : ""),
                            style: {
                                left: "".concat(mark.x * 100, "%"),
                                top: "".concat(mark.y * 100, "%"),
                                transitionDelay: landmarksVisible ? "".concat(i * LM_STAGGER_MS, "ms") : "0ms",
                                animationDelay: "".concat(i * LM_STAGGER_MS, "ms")
                            },
                            "aria-hidden": true
                        }, "".concat(landmarkBatch, "-").concat(mark.id), false, {
                            fileName: "[project]/components/LandingHero.tsx",
                            lineNumber: 289,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 245,
                columnNumber: 7
            }, this),
            lensesReady && !lensesDone && ((_LENS_BATCHES_lensBatch = LENS_BATCHES[lensBatch]) !== null && _LENS_BATCHES_lensBatch !== void 0 ? _LENS_BATCHES_lensBatch : []).map((lens, i)=>{
                var _LENS_BATCHES_lensBatch;
                var _LENS_BATCHES_lensBatch_length;
                const batchLen = (_LENS_BATCHES_lensBatch_length = (_LENS_BATCHES_lensBatch = LENS_BATCHES[lensBatch]) === null || _LENS_BATCHES_lensBatch === void 0 ? void 0 : _LENS_BATCHES_lensBatch.length) !== null && _LENS_BATCHES_lensBatch_length !== void 0 ? _LENS_BATCHES_lensBatch_length : 1;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SkinGlassLens$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkinGlassLens"], {
                    active: true,
                    useVideoZoom: true,
                    syncVideoRef: activeVideoSyncRef,
                    containerRef: stageRef,
                    stop: lens,
                    objectPosition: "50% 32%",
                    className: "skin-glass-lens--field max-lg:hidden",
                    enterDelayMs: BATCH_ENTER_BASE_MS + i * BATCH_STAGGER_MS,
                    dwellMs: BATCH_DWELL_MS + (batchLen - 1 - i) * BATCH_STAGGER_MS,
                    fadeMs: BATCH_FADE_MS,
                    loop: false,
                    lite: true
                }, "".concat(lensBatch, "-").concat(lens.label), false, {
                    fileName: "[project]/components/LandingHero.tsx",
                    lineNumber: 313,
                    columnNumber: 13
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-20 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:justify-center lg:px-10 lg:pb-24 lg:pt-32",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-xl transition duration-700 ease-out ".concat(started ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 sm:text-[11px]",
                                children: "Join people measuring change"
                            }, void 0, false, {
                                fileName: "[project]/components/LandingHero.tsx",
                                lineNumber: 337,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "mt-4 font-[family-name:var(--font-cursive)] text-[2.6rem] leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]",
                                children: [
                                    "Know exactly",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/components/LandingHero.tsx",
                                        lineNumber: 342,
                                        columnNumber: 13
                                    }, this),
                                    "what to change."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LandingHero.tsx",
                                lineNumber: 340,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 max-w-sm text-[12px] leading-relaxed text-white/55 sm:mt-4 sm:text-[13px]",
                                children: "Every score comes with the reason behind it — no guessing, no percentile, just what's measurable and what to do next."
                            }, void 0, false, {
                                fileName: "[project]/components/LandingHero.tsx",
                                lineNumber: 345,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 flex flex-wrap gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/upload",
                                        className: "inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1a1e24] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.55)] transition hover:bg-white/92",
                                        children: "Start free report"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LandingHero.tsx",
                                        lineNumber: 351,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/how-it-works",
                                        className: "inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/16",
                                        children: "How it works"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LandingHero.tsx",
                                        lineNumber: 357,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LandingHero.tsx",
                                lineNumber: 350,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LandingHero.tsx",
                        lineNumber: 332,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeroMeasureRail, {
                        started: started
                    }, void 0, false, {
                        fileName: "[project]/components/LandingHero.tsx",
                        lineNumber: 367,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 331,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LandingHero.tsx",
        lineNumber: 238,
        columnNumber: 5
    }, this);
}
_s(LandingHero, "p4xPyHPOiyGCS0nyVweoTqSOXaI=");
_c = LandingHero;
function HeroMeasureRail(param) {
    let { started } = param;
    const ticks = [
        {
            label: "Symmetry",
            pos: 0.22
        },
        {
            label: "Clarity",
            pos: 0.48
        },
        {
            label: "Jawline",
            pos: 0.72
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        "aria-hidden": true,
        className: "pointer-events-none absolute right-8 top-1/2 hidden w-36 -translate-y-1/2 lg:block xl:right-12 ".concat(started ? "opacity-100" : "opacity-0", " transition duration-1000 delay-300"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[9px] font-medium uppercase tracking-[0.2em] text-white/35",
                children: "Measured"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 387,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 font-mono text-3xl font-light tabular-nums tracking-tight text-white/80",
                children: "8"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 390,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-0.5 text-[11px] text-white/40",
                children: "features"
            }, void 0, false, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 393,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mt-8 h-44",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-0 left-3 top-0 w-px bg-gradient-to-b from-white/5 via-white/25 to-white/5"
                    }, void 0, false, {
                        fileName: "[project]/components/LandingHero.tsx",
                        lineNumber: 396,
                        columnNumber: 9
                    }, this),
                    ticks.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-0 flex items-center gap-2",
                            style: {
                                top: "".concat(t.pos * 100, "%")
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "ml-[7px] size-1.5 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.35)]"
                                }, void 0, false, {
                                    fileName: "[project]/components/LandingHero.tsx",
                                    lineNumber: 403,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] tracking-wide text-white/45",
                                    children: t.label
                                }, void 0, false, {
                                    fileName: "[project]/components/LandingHero.tsx",
                                    lineNumber: 404,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, t.label, true, {
                            fileName: "[project]/components/LandingHero.tsx",
                            lineNumber: 398,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/LandingHero.tsx",
                lineNumber: 395,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LandingHero.tsx",
        lineNumber: 381,
        columnNumber: 5
    }, this);
}
_c1 = HeroMeasureRail;
var _c, _c1;
__turbopack_context__.k.register(_c, "LandingHero");
__turbopack_context__.k.register(_c1, "HeroMeasureRail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/landing/HeroAnalyticCharts.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DistributionChart",
    ()=>DistributionChart,
    "FacialThirdsChart",
    ()=>FacialThirdsChart,
    "HeroAnalyticOverlays",
    ()=>HeroAnalyticOverlays,
    "RadarPreview",
    ()=>RadarPreview,
    "SymmetryTracks",
    ()=>SymmetryTracks,
    "ToneStrip",
    ()=>ToneStrip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
/**
 * Decorative analytic overlays for the landing hero.
 * Visual language inspired by premium facial-analysis marketing —
 * metrics map to Zelko’s measured features (not competitor copy).
 */ function GlassCard(param) {
    let { className, children, delayMs = 0 } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hero-chart-card pointer-events-none absolute ".concat(className !== null && className !== void 0 ? className : ""),
        style: {
            animationDelay: "".concat(delayMs, "ms")
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = GlassCard;
function FacialThirdsChart() {
    const rows = [
        {
            label: "Upper",
            value: 0.33,
            fill: 0.62
        },
        {
            label: "Middle",
            value: 0.34,
            fill: 0.7
        },
        {
            label: "Lower",
            value: 0.33,
            fill: 0.58
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-[11.5rem] rounded-2xl border border-white/12 bg-[#2a2e35]/55 p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:w-[13rem] sm:p-3.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/45",
                children: "Facial thirds"
            }, void 0, false, {
                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 space-y-2.5",
                children: rows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-1 flex items-baseline justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] text-white/55",
                                        children: row.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                                        lineNumber: 46,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[11px] tabular-nums text-white/85",
                                        children: row.value.toFixed(2)
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                                        lineNumber: 47,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-1.5 overflow-hidden rounded-full bg-white/10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full rounded-full bg-gradient-to-r from-sky-300/80 to-white/80",
                                    style: {
                                        width: "".concat(row.fill * 100, "%")
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                                    lineNumber: 52,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this)
                        ]
                    }, row.label, true, {
                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c1 = FacialThirdsChart;
function DistributionChart() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-[12rem] rounded-2xl border border-white/12 bg-[#2a2e35]/55 p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:w-[13.5rem] sm:p-3.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/45",
                children: "Skin clarity"
            }, void 0, false, {
                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 160 72",
                className: "mt-2 w-full",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                            id: "zelkoDistFill",
                            x1: "0",
                            y1: "0",
                            x2: "0",
                            y2: "1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "0%",
                                    stopColor: "rgba(186,230,253,0.45)"
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "100%",
                                    stopColor: "rgba(186,230,253,0)"
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M8 62 C 28 60, 40 18, 80 16 C 120 14, 132 52, 152 62",
                        fill: "none",
                        stroke: "rgba(255,255,255,0.75)",
                        strokeWidth: "1.4"
                    }, void 0, false, {
                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M80 16 C 100 15, 118 40, 132 54 L 132 62 L 80 62 Z",
                        fill: "url(#zelkoDistFill)"
                    }, void 0, false, {
                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: "108",
                        y1: "12",
                        x2: "108",
                        y2: "62",
                        stroke: "rgba(125,211,252,0.9)",
                        strokeWidth: "1.2",
                        strokeDasharray: "3 3"
                    }, void 0, false, {
                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1 flex items-end justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-1.5 flex-1 overflow-hidden rounded-full bg-white/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full w-[72%] rounded-full bg-sky-300/80"
                        }, void 0, false, {
                            fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-3 font-mono text-lg font-semibold tabular-nums text-white",
                        children: "72"
                    }, void 0, false, {
                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-[10px] text-white/40",
                children: "Confidence · High"
            }, void 0, false, {
                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_c2 = DistributionChart;
function SymmetryTracks() {
    const tracks = [
        {
            label: "Eyes",
            pos: 0.78
        },
        {
            label: "Brows",
            pos: 0.7
        },
        {
            label: "Jaw",
            pos: 0.64
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-[12rem] rounded-2xl border border-white/12 bg-[#2a2e35]/55 p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:w-[13.5rem] sm:p-3.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/45",
                children: "Symmetry"
            }, void 0, false, {
                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 space-y-3",
                children: tracks.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-1 flex justify-between text-[10px] text-white/40",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: t.label
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                                    lineNumber: 127,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                                lineNumber: 126,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-2 rounded-full bg-white/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute left-1 top-1/2 -translate-y-1/2 text-[8px] text-white/30",
                                        children: "·"
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                                        lineNumber: 130,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.45)]",
                                        style: {
                                            left: "calc(".concat(t.pos * 100, "% - 5px)")
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                                        lineNumber: 133,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                                lineNumber: 129,
                                columnNumber: 13
                            }, this)
                        ]
                    }, t.label, true, {
                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                        lineNumber: 125,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 flex justify-between text-[9px] uppercase tracking-[0.12em] text-white/30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Asym"
                    }, void 0, false, {
                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Sym"
                    }, void 0, false, {
                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this);
}
_c3 = SymmetryTracks;
function RadarPreview() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-[13rem] rounded-2xl border border-white/12 bg-[#2a2e35]/55 p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:w-[14.5rem] sm:p-3.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] font-medium uppercase tracking-[0.16em] text-white/45",
                        children: "Feature map"
                    }, void 0, false, {
                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-mono text-[10px] text-white/50",
                        children: [
                            "Composite ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/90",
                                children: "74"
                            }, void 0, false, {
                                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                                lineNumber: 158,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                lineNumber: 153,
                columnNumber: 7
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
                            stroke: "rgba(255,255,255,0.12)",
                            strokeWidth: "1"
                        }, s, false, {
                            fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                            lineNumber: 163,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                        points: hexPoints(80, 78, 38, [
                            0.7,
                            0.55,
                            0.8,
                            0.62,
                            0.75,
                            0.58
                        ]),
                        fill: "rgba(148,163,184,0.35)",
                        stroke: "rgba(226,232,240,0.7)",
                        strokeWidth: "1.2"
                    }, void 0, false, {
                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                        points: hexPoints(80, 78, 48, [
                            0.9,
                            0.78,
                            0.92,
                            0.85,
                            0.88,
                            0.8
                        ]),
                        fill: "rgba(167,243,208,0.22)",
                        stroke: "rgba(167,243,208,0.75)",
                        strokeWidth: "1.2"
                    }, void 0, false, {
                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1 flex justify-center gap-3 text-[9px] text-white/45",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "inline-block size-1.5 rounded-sm bg-slate-300/80"
                            }, void 0, false, {
                                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, this),
                            " Current"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                        lineNumber: 185,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "inline-block size-1.5 rounded-sm bg-emerald-200/80"
                            }, void 0, false, {
                                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this),
                            " Focus potential"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
        lineNumber: 152,
        columnNumber: 5
    }, this);
}
_c4 = RadarPreview;
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
function ToneStrip() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 rounded-2xl border border-white/12 bg-[#2a2e35]/55 px-2.5 py-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-16 w-2.5 rounded-full",
                style: {
                    background: "linear-gradient(180deg,#f5e6d3 0%,#d4a574 35%,#8b5a3c 70%,#3d2314 100%)"
                },
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                lineNumber: 213,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[9px] uppercase tracking-[0.14em] text-white/40",
                        children: "Tone read"
                    }, void 0, false, {
                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-0.5 text-[11px] text-white/75",
                        children: "Even · Mid"
                    }, void 0, false, {
                        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
        lineNumber: 212,
        columnNumber: 5
    }, this);
}
_c5 = ToneStrip;
function HeroAnalyticOverlays(param) {
    let { started } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute inset-0 z-10 hidden lg:block ".concat(started ? "hero-charts-in" : "opacity-0"),
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GlassCard, {
                className: "right-[5%] top-[18%]",
                delayMs: 240,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FacialThirdsChart, {}, void 0, false, {
                    fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                    lineNumber: 241,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GlassCard, {
                className: "right-[4%] top-[48%]",
                delayMs: 400,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RadarPreview, {}, void 0, false, {
                    fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                    lineNumber: 244,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                lineNumber: 243,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GlassCard, {
                className: "right-[22%] top-[72%]",
                delayMs: 480,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToneStrip, {}, void 0, false, {
                    fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                    lineNumber: 247,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing/HeroAnalyticCharts.tsx",
        lineNumber: 233,
        columnNumber: 5
    }, this);
}
_c6 = HeroAnalyticOverlays;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "GlassCard");
__turbopack_context__.k.register(_c1, "FacialThirdsChart");
__turbopack_context__.k.register(_c2, "DistributionChart");
__turbopack_context__.k.register(_c3, "SymmetryTracks");
__turbopack_context__.k.register(_c4, "RadarPreview");
__turbopack_context__.k.register(_c5, "ToneStrip");
__turbopack_context__.k.register(_c6, "HeroAnalyticOverlays");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/landing/AnalysisShowcaseSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnalysisShowcaseSection",
    ()=>AnalysisShowcaseSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$HeroAnalyticCharts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing/HeroAnalyticCharts.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function AnalysisShowcaseSection() {
    _s();
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [parallaxY, setParallaxY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnalysisShowcaseSection.useEffect": ()=>{
            const el = sectionRef.current;
            if (!el) return;
            let raf = 0;
            const onScroll = {
                "AnalysisShowcaseSection.useEffect.onScroll": ()=>{
                    cancelAnimationFrame(raf);
                    raf = requestAnimationFrame({
                        "AnalysisShowcaseSection.useEffect.onScroll": ()=>{
                            const rect = el.getBoundingClientRect();
                            const viewH = window.innerHeight || 1;
                            // Progress through viewport: -1 (below) → 0 (center) → 1 (above)
                            const mid = rect.top + rect.height / 2;
                            const progress = (viewH / 2 - mid) / viewH;
                            setParallaxY(Math.max(-48, Math.min(48, progress * 64)));
                        }
                    }["AnalysisShowcaseSection.useEffect.onScroll"]);
                }
            }["AnalysisShowcaseSection.useEffect.onScroll"];
            onScroll();
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            window.addEventListener("resize", onScroll);
            return ({
                "AnalysisShowcaseSection.useEffect": ()=>{
                    cancelAnimationFrame(raf);
                    window.removeEventListener("scroll", onScroll);
                    window.removeEventListener("resize", onScroll);
                }
            })["AnalysisShowcaseSection.useEffect"];
        }
    }["AnalysisShowcaseSection.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        className: "relative overflow-hidden bg-[#ebe8f2] px-5 py-20 text-neutral-900 sm:px-8 md:px-10 md:py-28",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": true,
                className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_25%_35%,rgba(255,255,255,0.7),transparent_70%)]"
            }, void 0, false, {
                fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": true,
                className: "pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-[min(52%,36rem)] lg:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 will-change-transform",
                    style: {
                        transform: "translate3d(0, ".concat(parallaxY, "px, 0)")
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative ml-auto h-full w-full max-w-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/landing/analysis-woman.png",
                                alt: "",
                                fill: true,
                                sizes: "(min-width: 1024px) 36rem, 0px",
                                className: "object-cover object-[52%_12%] opacity-[0.92]",
                                priority: false
                            }, void 0, false, {
                                fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-gradient-to-l from-transparent via-[#ebe8f2]/25 to-[#ebe8f2]"
                            }, void 0, false, {
                                fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-gradient-to-t from-[#ebe8f2] via-transparent to-[#ebe8f2]/70"
                            }, void 0, false, {
                                fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-gradient-to-b from-[#ebe8f2]/40 via-transparent to-[#ebe8f2]/90"
                            }, void 0, false, {
                                fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 mx-auto max-w-7xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400",
                                children: "What you see in a report"
                            }, void 0, false, {
                                fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-3 font-[family-name:var(--font-cursive)] text-4xl leading-[1.1] tracking-tight text-neutral-950 sm:text-5xl",
                                children: "Scores with a signal behind them."
                            }, void 0, false, {
                                fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 max-w-md text-sm leading-relaxed text-neutral-500 sm:text-[15px]",
                                children: "Every feature ships with a confidence label and the observed reason — so you know what to act on, not just a number."
                            }, void 0, false, {
                                fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/upload",
                                className: "mt-8 inline-flex rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800",
                                children: "Start free report"
                            }, void 0, false, {
                                fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-20 mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center sm:justify-start",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$HeroAnalyticCharts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DistributionChart"], {}, void 0, false, {
                                    fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center sm:justify-start",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$HeroAnalyticCharts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SymmetryTracks"], {}, void 0, false, {
                                    fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center sm:justify-start",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$HeroAnalyticCharts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FacialThirdsChart"], {}, void 0, false, {
                                    fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center sm:justify-start",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$HeroAnalyticCharts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadarPreview"], {}, void 0, false, {
                                    fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center sm:col-span-2 sm:justify-start lg:col-span-1 xl:col-span-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$HeroAnalyticCharts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToneStrip"], {}, void 0, false, {
                                    fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing/AnalysisShowcaseSection.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(AnalysisShowcaseSection, "taJlpEjiTkCtC2cuFlQAv8JtQlM=");
_c = AnalysisShowcaseSection;
var _c;
__turbopack_context__.k.register(_c, "AnalysisShowcaseSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/landing/FaceMeshScanSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FaceMeshScanSection",
    ()=>FaceMeshScanSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
/**
 * Static cheek mesh — faint landmark dots on both cheek areas (right-side portrait).
 * Coordinates normalized to the recomposed landing asset (woman on the right).
 */ const MESH_NODES = [
    // Left cheek (viewer-left / her right cheek — closer to camera center)
    {
        id: "lc1",
        x: 0.68,
        y: 0.4
    },
    {
        id: "lc2",
        x: 0.71,
        y: 0.38
    },
    {
        id: "lc3",
        x: 0.74,
        y: 0.41
    },
    {
        id: "lc4",
        x: 0.69,
        y: 0.44
    },
    {
        id: "lc5",
        x: 0.72,
        y: 0.45
    },
    {
        id: "lc6",
        x: 0.75,
        y: 0.47
    },
    {
        id: "lc7",
        x: 0.7,
        y: 0.49
    },
    {
        id: "lc8",
        x: 0.73,
        y: 0.5
    },
    // Right cheek (viewer-right / her left cheek)
    {
        id: "rc1",
        x: 0.8,
        y: 0.39
    },
    {
        id: "rc2",
        x: 0.83,
        y: 0.38
    },
    {
        id: "rc3",
        x: 0.86,
        y: 0.41
    },
    {
        id: "rc4",
        x: 0.81,
        y: 0.44
    },
    {
        id: "rc5",
        x: 0.84,
        y: 0.45
    },
    {
        id: "rc6",
        x: 0.87,
        y: 0.47
    },
    {
        id: "rc7",
        x: 0.82,
        y: 0.49
    },
    {
        id: "rc8",
        x: 0.85,
        y: 0.5
    }
];
const MESH_EDGES = [
    [
        "lc1",
        "lc2"
    ],
    [
        "lc2",
        "lc3"
    ],
    [
        "lc1",
        "lc4"
    ],
    [
        "lc2",
        "lc5"
    ],
    [
        "lc3",
        "lc6"
    ],
    [
        "lc4",
        "lc5"
    ],
    [
        "lc5",
        "lc6"
    ],
    [
        "lc4",
        "lc7"
    ],
    [
        "lc5",
        "lc8"
    ],
    [
        "lc7",
        "lc8"
    ],
    [
        "rc1",
        "rc2"
    ],
    [
        "rc2",
        "rc3"
    ],
    [
        "rc1",
        "rc4"
    ],
    [
        "rc2",
        "rc5"
    ],
    [
        "rc3",
        "rc6"
    ],
    [
        "rc4",
        "rc5"
    ],
    [
        "rc5",
        "rc6"
    ],
    [
        "rc4",
        "rc7"
    ],
    [
        "rc5",
        "rc8"
    ],
    [
        "rc7",
        "rc8"
    ]
];
function FaceMeshScanSection() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FaceMeshScanSection.useEffect": ()=>{
            const el = ref.current;
            if (!el || typeof IntersectionObserver === "undefined") {
                setVisible(true);
                return;
            }
            const io = new IntersectionObserver({
                "FaceMeshScanSection.useEffect": (param)=>{
                    let [entry] = param;
                    if (entry === null || entry === void 0 ? void 0 : entry.isIntersecting) setVisible(true);
                }
            }["FaceMeshScanSection.useEffect"], {
                threshold: 0.12
            });
            io.observe(el);
            return ({
                "FaceMeshScanSection.useEffect": ()=>io.disconnect()
            })["FaceMeshScanSection.useEffect"];
        }
    }["FaceMeshScanSection.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: ref,
        id: "ai-scan",
        className: "relative overflow-hidden bg-[#f4f3f1] px-5 py-14 text-neutral-900 sm:px-8 md:px-10 md:py-20",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative z-10 mx-auto max-w-6xl",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative overflow-hidden rounded-[1.75rem] bg-[#ebe9e6] transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:rounded-[2rem] ".concat(visible ? "opacity-100" : "opacity-0"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative aspect-[4/3] w-full max-h-[min(520px,70vh)] sm:aspect-[14/10] sm:max-h-[560px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: "/landing/face-scan-woman.png",
                            alt: "Woman with AI face landmark mesh overlay",
                            fill: true,
                            priority: false,
                            sizes: "(min-width: 1024px) 960px, 100vw",
                            className: "object-cover object-right",
                            quality: 90
                        }, void 0, false, {
                            fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                            lineNumber: 91,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FaceMesh, {}, void 0, false, {
                            fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            "aria-hidden": true,
                            className: "pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#f4f3f1_0%,rgba(244,243,241,0.92)_28%,rgba(244,243,241,0.35)_48%,transparent_62%),linear-gradient(180deg,transparent_78%,#f4f3f1_100%)]"
                        }, void 0, false, {
                            fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                            lineNumber: 103,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-y-0 left-0 z-10 flex w-full max-w-md flex-col justify-center px-6 py-8 sm:max-w-lg sm:px-10 md:px-12 transition duration-700 delay-100 ".concat(visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400",
                                    children: "Face landmarks"
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                                    lineNumber: 115,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mt-3 font-[family-name:var(--font-cursive)] text-3xl leading-[1.1] tracking-tight text-neutral-950 sm:text-4xl md:text-[2.75rem]",
                                    children: [
                                        "Understand",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                            className: "not-italic text-neutral-500",
                                            children: "your face."
                                        }, void 0, false, {
                                            fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                                            lineNumber: 120,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                                            lineNumber: 121,
                                            columnNumber: 17
                                        }, this),
                                        "Coach it with",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "relative inline-block",
                                            children: [
                                                "AI",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "aria-hidden": true,
                                                    className: "absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-neutral-900/80"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                                            lineNumber: 123,
                                            columnNumber: 17
                                        }, this),
                                        "."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                                    lineNumber: 118,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-4 max-w-sm text-sm leading-relaxed text-neutral-500",
                                    children: "Zelko maps measurable signals — skin, jawline, proportions — then pairs each score with something you can actually do."
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                                    lineNumber: 132,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/upload",
                                    className: "mt-6 inline-flex w-fit items-center gap-2.5 rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CameraIcon, {}, void 0, false, {
                                            fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                                            lineNumber: 140,
                                            columnNumber: 17
                                        }, this),
                                        "Start free appearance scan"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                                    lineNumber: 136,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                            lineNumber: 108,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute right-[8%] top-[14%] z-10 hidden max-w-[10.5rem] rounded-2xl border border-white/50 bg-white/55 p-2.5 shadow-[0_16px_36px_-18px_rgba(0,0,0,0.35)] backdrop-blur-md sm:block transition duration-700 delay-300 ".concat(visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400",
                                    children: "Skin clarity"
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                                    lineNumber: 152,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-0.5 text-xl font-semibold tabular-nums text-neutral-950",
                                    children: "90"
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                                    lineNumber: 155,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                            lineNumber: 145,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                    lineNumber: 90,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                lineNumber: 85,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
            lineNumber: 84,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_s(FaceMeshScanSection, "F7BtIAxVh3vOWU1Jr24RYsj9CHc=");
_c = FaceMeshScanSection;
function FaceMesh() {
    const byId = Object.fromEntries(MESH_NODES.map((n)=>[
            n.id,
            n
        ]));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        "aria-hidden": true,
        viewBox: "0 0 100 100",
        preserveAspectRatio: "none",
        className: "pointer-events-none absolute inset-0 h-full w-full",
        children: [
            MESH_EDGES.map((param)=>{
                let [a, b] = param;
                const na = byId[a];
                const nb = byId[b];
                if (!na || !nb) return null;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: na.x * 100,
                    y1: na.y * 100,
                    x2: nb.x * 100,
                    y2: nb.y * 100,
                    stroke: "rgba(255,255,255,0.22)",
                    strokeWidth: "0.12"
                }, "".concat(a, "-").concat(b), false, {
                    fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                    lineNumber: 181,
                    columnNumber: 11
                }, this);
            }),
            MESH_NODES.map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: n.x * 100,
                    cy: n.y * 100,
                    r: "0.32",
                    fill: "rgba(255,255,255,0.4)"
                }, n.id, false, {
                    fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                    lineNumber: 193,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
        lineNumber: 170,
        columnNumber: 5
    }, this);
}
_c1 = FaceMesh;
function CameraIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "16",
        height: "16",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 8.5A2.5 2.5 0 0 1 6.5 6h1.2l1.1-1.6A1.5 1.5 0 0 1 10 3.8h4a1.5 1.5 0 0 1 1.2.6L16.3 6h1.2A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-8Z",
                stroke: "currentColor",
                strokeWidth: "1.6"
            }, void 0, false, {
                fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                lineNumber: 208,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12.5",
                r: "3.2",
                stroke: "currentColor",
                strokeWidth: "1.6"
            }, void 0, false, {
                fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
                lineNumber: 213,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing/FaceMeshScanSection.tsx",
        lineNumber: 207,
        columnNumber: 5
    }, this);
}
_c2 = CameraIcon;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "FaceMeshScanSection");
__turbopack_context__.k.register(_c1, "FaceMesh");
__turbopack_context__.k.register(_c2, "CameraIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/landing/ReportPreviewSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReportPreviewSection",
    ()=>ReportPreviewSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ReportPreviewSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "inside-your-report",
        className: "relative overflow-hidden bg-[#1a1c20] px-5 py-20 text-white sm:px-8 md:px-10 md:py-28",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": true,
                className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_0%,rgba(255,255,255,0.06),transparent_55%),radial-gradient(ellipse_55%_45%_at_90%_80%,rgba(148,163,184,0.08),transparent_50%)]"
            }, void 0, false, {
                fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 mx-auto max-w-7xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-2xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] font-medium uppercase tracking-[0.2em] text-white/40",
                                children: "Inside your report"
                            }, void 0, false, {
                                fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                                lineNumber: 23,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-3 font-[family-name:var(--font-cursive)] text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl",
                                children: "This is what you walk away with."
                            }, void 0, false, {
                                fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 max-w-lg text-sm leading-relaxed text-white/50 sm:text-[15px]",
                                children: "A measured appearance report — interactive portrait, summary, and analytic charts — not a public ranking."
                            }, void 0, false, {
                                fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-14 space-y-16 md:mt-20 md:space-y-24",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviewRow, {
                                eyebrow: "Appearance dashboard",
                                title: "Your face, scored with a reason.",
                                body: "Tap landmark points on your portrait. See strongest signals, composite score, and gated Pro summary — never a raw attractiveness number.",
                                bullets: [
                                    "Interactive portrait with feature dots",
                                    "Jawline, grooming, and next-action cards",
                                    "Free top signals · Pro unlocks the full write-up"
                                ],
                                imageSrc: "/landing/report-dashboard.png",
                                imageAlt: "Zelko appearance report dashboard with interactive portrait and metric cards",
                                reverse: false
                            }, void 0, false, {
                                fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviewRow, {
                                eyebrow: "Analytic views",
                                title: "Charts that match the product language.",
                                body: "Facial thirds, skin clarity distribution, symmetry tracks, feature radar, and a ranked bar list — filled with your measured scores.",
                                bullets: [
                                    "Facial thirds & proportion balance",
                                    "Skin clarity curve with confidence",
                                    "Feature map + strongest-first ranking"
                                ],
                                imageSrc: "/landing/report-analytics.png",
                                imageAlt: "Zelko report analytic charts including facial thirds, skin clarity, symmetry, and feature ranking",
                                reverse: true
                            }, void 0, false, {
                                fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-14 flex flex-wrap gap-3 md:mt-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/upload",
                                className: "inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/90",
                                children: "Start free report"
                            }, void 0, false, {
                                fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/how-it-works",
                                className: "inline-flex rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white",
                                children: "How it works"
                            }, void 0, false, {
                                fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing/ReportPreviewSection.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = ReportPreviewSection;
function PreviewRow(param) {
    let { eyebrow, title, body, bullets, imageSrc, imageAlt, reverse } = param;
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PreviewRow.useEffect": ()=>{
            const el = ref.current;
            if (!el || typeof IntersectionObserver === "undefined") {
                setVisible(true);
                return;
            }
            const io = new IntersectionObserver({
                "PreviewRow.useEffect": (param)=>{
                    let [entry] = param;
                    if (entry === null || entry === void 0 ? void 0 : entry.isIntersecting) setVisible(true);
                }
            }["PreviewRow.useEffect"], {
                threshold: 0.18
            });
            io.observe(el);
            return ({
                "PreviewRow.useEffect": ()=>io.disconnect()
            })["PreviewRow.useEffect"];
        }
    }["PreviewRow.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "grid items-center gap-10 lg:grid-cols-2 lg:gap-14 ".concat(reverse ? "lg:[&>*:first-child]:order-2" : ""),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ".concat(visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] font-medium uppercase tracking-[0.18em] text-white/40",
                        children: eyebrow
                    }, void 0, false, {
                        fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 text-sm leading-relaxed text-white/50",
                        children: body
                    }, void 0, false, {
                        fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "mt-5 space-y-2 text-sm text-white/55",
                        children: bullets.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/25",
                                        children: "·"
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                                        lineNumber: 142,
                                        columnNumber: 15
                                    }, this),
                                    b
                                ]
                            }, b, true, {
                                fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                                lineNumber: 141,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScreenshotFrame, {
                visible: visible,
                delayMs: reverse ? 80 : 140,
                src: imageSrc,
                alt: imageAlt
            }, void 0, false, {
                fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing/ReportPreviewSection.tsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
_s(PreviewRow, "F7BtIAxVh3vOWU1Jr24RYsj9CHc=");
_c1 = PreviewRow;
function ScreenshotFrame(param) {
    let { src, alt, visible, delayMs } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ".concat(visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"),
        style: {
            transitionDelay: visible ? "".concat(delayMs, "ms") : "0ms"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "overflow-hidden rounded-[1.35rem] border border-white/12 bg-[#111317] shadow-[0_28px_80px_-24px_rgba(0,0,0,0.65)] ring-1 ring-white/5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-1.5 border-b border-white/8 px-3.5 py-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "size-1.5 rounded-full bg-white/20"
                        }, void 0, false, {
                            fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "size-1.5 rounded-full bg-white/20"
                        }, void 0, false, {
                            fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                            lineNumber: 180,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "size-1.5 rounded-full bg-white/20"
                        }, void 0, false, {
                            fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                            lineNumber: 181,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ml-2 text-[10px] uppercase tracking-[0.14em] text-white/30",
                            children: "Report preview"
                        }, void 0, false, {
                            fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                            lineNumber: 182,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative aspect-[16/10] w-full bg-[#15171b]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: src,
                        alt: alt,
                        fill: true,
                        sizes: "(min-width: 1024px) 720px, 100vw",
                        quality: 95,
                        className: "object-cover object-top",
                        priority: false
                    }, void 0, false, {
                        fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                        lineNumber: 187,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/landing/ReportPreviewSection.tsx",
                    lineNumber: 186,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/landing/ReportPreviewSection.tsx",
            lineNumber: 177,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/landing/ReportPreviewSection.tsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
}
_c2 = ScreenshotFrame;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ReportPreviewSection");
__turbopack_context__.k.register(_c1, "PreviewRow");
__turbopack_context__.k.register(_c2, "ScreenshotFrame");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/landing/OutfitStudioSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OutfitStudioSection",
    ()=>OutfitStudioSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const SLIDES = [
    {
        src: "/outfit/studio-1.png",
        label: "Tailored day",
        hint: "Blazer + clean neutrals"
    },
    {
        src: "/outfit/studio-2.png",
        label: "Smart casual",
        hint: "Knit polo + structured trousers"
    },
    {
        src: "/outfit/studio-3.png",
        label: "Soft linen",
        hint: "Warm weather ease"
    },
    {
        src: "/outfit/studio-4.png",
        label: "Evening layer",
        hint: "Turtleneck + overcoat"
    }
];
const INTERVAL_MS = 3200;
const FADE_MS = 750;
function OutfitStudioSection() {
    _s();
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [inView, setInView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const activeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OutfitStudioSection.useEffect": ()=>{
            activeRef.current = active;
        }
    }["OutfitStudioSection.useEffect"], [
        active
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OutfitStudioSection.useEffect": ()=>{
            const el = sectionRef.current;
            if (!el || typeof IntersectionObserver === "undefined") {
                setInView(true);
                return;
            }
            const io = new IntersectionObserver({
                "OutfitStudioSection.useEffect": (param)=>{
                    let [entry] = param;
                    var _entry_isIntersecting;
                    return setInView((_entry_isIntersecting = entry === null || entry === void 0 ? void 0 : entry.isIntersecting) !== null && _entry_isIntersecting !== void 0 ? _entry_isIntersecting : false);
                }
            }["OutfitStudioSection.useEffect"], {
                threshold: 0.15
            });
            io.observe(el);
            return ({
                "OutfitStudioSection.useEffect": ()=>io.disconnect()
            })["OutfitStudioSection.useEffect"];
        }
    }["OutfitStudioSection.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OutfitStudioSection.useEffect": ()=>{
            if (!inView) return;
            const id = window.setInterval({
                "OutfitStudioSection.useEffect.id": ()=>{
                    const next = (activeRef.current + 1) % SLIDES.length;
                    activeRef.current = next;
                    setActive(next);
                }
            }["OutfitStudioSection.useEffect.id"], INTERVAL_MS);
            return ({
                "OutfitStudioSection.useEffect": ()=>window.clearInterval(id)
            })["OutfitStudioSection.useEffect"];
        }
    }["OutfitStudioSection.useEffect"], [
        inView
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        id: "outfit-studio",
        className: "relative overflow-hidden bg-[#f4f2f8] px-5 py-20 text-neutral-900 sm:px-8 md:px-10 md:py-28",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": true,
                className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_75%_40%,rgba(180,190,210,0.28),transparent_65%)]"
            }, void 0, false, {
                fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400",
                                children: "Outfit studio"
                            }, void 0, false, {
                                fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-3 font-[family-name:var(--font-cursive)] text-4xl leading-[1.1] tracking-tight text-neutral-950 sm:text-5xl",
                                children: "See yourself in the look — not just the score."
                            }, void 0, false, {
                                fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-sm leading-relaxed text-neutral-500 sm:text-[15px]",
                                children: "From your report, Zelko recommends outfits that complement your face, eyes, and hair — then generates you in them. Signed-in users get up to 3 stills."
                            }, void 0, false, {
                                fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-6 space-y-2 text-sm text-neutral-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-neutral-300",
                                                children: "·"
                                            }, void 0, false, {
                                                fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                                lineNumber: 96,
                                                columnNumber: 15
                                            }, this),
                                            "Colors and style matched to your portrait cues"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-neutral-300",
                                                children: "·"
                                            }, void 0, false, {
                                                fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                                lineNumber: 100,
                                                columnNumber: 15
                                            }, this),
                                            "Optional lifestyle profile sharpens the dress code"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                        lineNumber: 99,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-neutral-300",
                                                children: "·"
                                            }, void 0, false, {
                                                fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                                lineNumber: 104,
                                                columnNumber: 15
                                            }, this),
                                            "Generative previews — fashion direction, not medical advice"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 flex flex-wrap gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/upload",
                                        className: "inline-flex rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800",
                                        children: "Start free report"
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/how-it-works",
                                        className: "inline-flex rounded-full border border-neutral-300 bg-white/70 px-5 py-3 text-sm font-medium text-neutral-700 transition hover:border-neutral-400 hover:bg-white",
                                        children: "How it works"
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative aspect-[3/4] overflow-hidden rounded-[1.75rem] border border-neutral-200/90 bg-neutral-100 shadow-[0_28px_60px_-36px_rgba(40,35,60,0.35)]",
                                children: [
                                    SLIDES.map((slide, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 transition-opacity ease-out",
                                            style: {
                                                opacity: i === active ? 1 : 0,
                                                transitionDuration: "".concat(FADE_MS, "ms"),
                                                pointerEvents: i === active ? "auto" : "none"
                                            },
                                            "aria-hidden": i !== active,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: slide.src,
                                                    alt: "",
                                                    fill: true,
                                                    sizes: "(max-width: 1024px) 90vw, 480px",
                                                    className: "object-cover object-[50%_18%]",
                                                    priority: i === 0
                                                }, void 0, false, {
                                                    fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    "aria-hidden": true,
                                                    className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, slide.src, true, {
                                            fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                            lineNumber: 127,
                                            columnNumber: 15
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-5 sm:p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] uppercase tracking-[0.18em] text-white/55",
                                                        children: "Look preview"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                                        lineNumber: 154,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-lg font-semibold tracking-tight text-white",
                                                        children: SLIDES[active].label
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                                        lineNumber: 157,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-white/65",
                                                        children: SLIDES[active].hint
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                                        lineNumber: 160,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                                lineNumber: 153,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-1.5 pb-1",
                                                role: "tablist",
                                                "aria-label": "Outfit slides",
                                                children: SLIDES.map((slide, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        role: "tab",
                                                        "aria-selected": i === active,
                                                        "aria-label": "Show ".concat(slide.label),
                                                        onClick: ()=>{
                                                            activeRef.current = i;
                                                            setActive(i);
                                                        },
                                                        className: "h-1.5 rounded-full transition-all ".concat(i === active ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/65")
                                                    }, slide.src, false, {
                                                        fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                                        lineNumber: 168,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                                lineNumber: 162,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-center text-xs text-neutral-400 lg:text-left",
                                children: "Example looks — your stills are generated from your own portrait."
                            }, void 0, false, {
                                fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing/OutfitStudioSection.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing/OutfitStudioSection.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_s(OutfitStudioSection, "xfsjnagNfMYgBn5u9z/XOBdkEEY=");
_c = OutfitStudioSection;
var _c;
__turbopack_context__.k.register(_c, "OutfitStudioSection");
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
"[project]/components/site/ProNeedsReportBanner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProNeedsReportBanner",
    ()=>ProNeedsReportBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/use-auth-user.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ProNeedsReportBanner() {
    var _user_reportIds;
    _s();
    const { user, ready, isAuthed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthUser"])();
    if (!ready || !isAuthed || !(user === null || user === void 0 ? void 0 : user.isPro)) return null;
    var _user_reportIds_length;
    const hasReport = ((_user_reportIds_length = (_user_reportIds = user.reportIds) === null || _user_reportIds === void 0 ? void 0 : _user_reportIds.length) !== null && _user_reportIds_length !== void 0 ? _user_reportIds_length : 0) > 0;
    if (hasReport) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative z-30 border-b border-amber-200/80 bg-amber-50 px-5 py-3 text-amber-950 md:px-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm leading-snug",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-semibold",
                            children: "Pro is active"
                        }, void 0, false, {
                            fileName: "[project]/components/site/ProNeedsReportBanner.tsx",
                            lineNumber: 17,
                            columnNumber: 11
                        }, this),
                        " — upload your first assessment to unlock progress, streaks, and your action checklist. Tracking stays locked until then."
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/site/ProNeedsReportBanner.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/upload",
                    className: "inline-flex shrink-0 rounded-xl bg-neutral-950 px-4 py-2 text-sm font-medium text-white",
                    children: "Upload first report"
                }, void 0, false, {
                    fileName: "[project]/components/site/ProNeedsReportBanner.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/site/ProNeedsReportBanner.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/site/ProNeedsReportBanner.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(ProNeedsReportBanner, "WrfbIcFPEE3/u+35ZNBbXvsZNgQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$use$2d$auth$2d$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthUser"]
    ];
});
_c = ProNeedsReportBanner;
var _c;
__turbopack_context__.k.register(_c, "ProNeedsReportBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/site/SectionReveal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SectionReveal",
    ()=>SectionReveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function SectionReveal(param) {
    let { children, className = "", delayMs = 0 } = param;
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [inView, setInView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SectionReveal.useEffect": ()=>{
            const node = ref.current;
            if (!node) return;
            if (typeof IntersectionObserver === "undefined") {
                setInView(true);
                return;
            }
            const observer = new IntersectionObserver({
                "SectionReveal.useEffect": (param)=>{
                    let [entry] = param;
                    if (entry === null || entry === void 0 ? void 0 : entry.isIntersecting) {
                        setInView(true);
                        observer.disconnect();
                    }
                }
            }["SectionReveal.useEffect"], {
                threshold: 0.12,
                rootMargin: "0px 0px -8% 0px"
            });
            observer.observe(node);
            return ({
                "SectionReveal.useEffect": ()=>observer.disconnect()
            })["SectionReveal.useEffect"];
        }
    }["SectionReveal.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "section-reveal ".concat(inView ? "is-in" : "", " ").concat(className),
        style: {
            transitionDelay: "".concat(delayMs, "ms")
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/site/SectionReveal.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(SectionReveal, "K+dCFMkCcTyPMHOI0MxAWPXS6Js=");
_c = SectionReveal;
var _c;
__turbopack_context__.k.register(_c, "SectionReveal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_94aec2ee._.js.map