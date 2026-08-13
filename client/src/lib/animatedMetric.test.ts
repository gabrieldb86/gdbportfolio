import { describe, expect, it } from "vitest";
import { easeOutCubic, formatMetricValue } from "./animatedMetric";

describe("animated metric helpers", () => {
  it("clamps and eases progress from zero to one", () => {
    expect(easeOutCubic(-1)).toBe(0);
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(0.5)).toBeCloseTo(0.875, 3);
    expect(easeOutCubic(1)).toBe(1);
    expect(easeOutCubic(2)).toBe(1);
  });

  it("formats whole and decimal metrics for the Portuguese locale", () => {
    expect(formatMetricValue(114, 0)).toBe("114");
    expect(formatMetricValue(8.3, 1)).toBe("8,3");
  });
});
