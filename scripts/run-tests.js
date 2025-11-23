import assert from "node:assert/strict";

// Lightweight DOM shims for utility functions
globalThis.window = {
  WebGLRenderingContext: function WebGLRenderingContext() {},
  matchMedia: () => ({ matches: false }),
  devicePixelRatio: 1,
};

globalThis.document = {
  createElement: () => ({
    getContext: () => ({}),
  }),
};

Object.defineProperty(globalThis, "navigator", {
  value: { hardwareConcurrency: 4 },
  writable: true,
});

const { isFrameRateHealthy } = await import("../src/effects/threeEngine.js");
const { shouldUseStaticBackground } = await import("../src/utils/gpuCheck.js");
const { performanceBudget, shouldEnableWebGL } = await import("../src/utils/performance.js");

// Performance expectation for mid-tier devices
const fpsSamples = [45, 52, 47, 44, 49, 46];
assert.equal(isFrameRateHealthy(fpsSamples, 40), true, "Average FPS should stay above 40fps threshold");

// Fallback logic when motion should be reduced
// @ts-ignore
window.matchMedia = () => ({ matches: true });
assert.equal(shouldUseStaticBackground(), true, "Reduced motion should trigger static fallback");

// Lighthouse and viewport budgets present
assert.deepEqual(performanceBudget.viewports, [360, 412, 768], "Expected responsive breakpoints for audits");
assert.ok(performanceBudget.lighthouse.performance > 0.9, "Performance budget should be declared");

// WebGL fallback detection
// @ts-ignore
window.WebGLRenderingContext = undefined;
assert.equal(shouldEnableWebGL(), false, "WebGL disabled should block heavy effects");

console.log("✅ Basic performance and fallback tests passed");
