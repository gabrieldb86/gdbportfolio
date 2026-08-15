import { describe, expect, it } from "vitest";

describe("SSR runtime configuration", () => {
  it("provides a secure canonical origin and public site name", () => {
    const canonicalOrigin = process.env.CANONICAL_ORIGIN;
    const siteName = process.env.SITE_NAME;

    expect(canonicalOrigin).toBeTruthy();
    expect(siteName).toBeTruthy();

    const origin = new URL(canonicalOrigin!);
    expect(origin.protocol).toBe("https:");
    expect(origin.hostname).toBe("gabrielpor-7t6ygmlv.manus.space");
    expect(siteName).toBe("Gabriel Danino Basilio");
  });
});
