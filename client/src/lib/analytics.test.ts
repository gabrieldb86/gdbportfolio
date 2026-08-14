import { describe, expect, it } from "vitest";
import { isGoogleAnalyticsMeasurementId } from "./analytics";

describe("Google Analytics measurement ID validation", () => {
  it("accepts the GA4 format required before a script can be loaded", () => {
    expect(isGoogleAnalyticsMeasurementId("G-ABC123XYZ")).toBe(true);
    expect(isGoogleAnalyticsMeasurementId(" g-123abc ")).toBe(true);
  });

  it("rejects missing and malformed identifiers so analytics is not loaded by accident", () => {
    expect(isGoogleAnalyticsMeasurementId(undefined)).toBe(false);
    expect(isGoogleAnalyticsMeasurementId("")).toBe(false);
    expect(isGoogleAnalyticsMeasurementId("UA-12345-1")).toBe(false);
    expect(isGoogleAnalyticsMeasurementId("not-a-measurement-id")).toBe(false);
  });
});
