import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const readProjectFile = (relativePath: string) =>
  readFileSync(resolve(projectRoot, relativePath), "utf8");

describe("public portfolio metrics and privacy", () => {
  it("keeps the 114K metric synchronized across public source files", () => {
    const files = [
      "client/index.html",
      "client/src/pages/Home.tsx",
      "client/src/pages/CV.tsx",
      "client/src/data/siteConfig.ts",
    ];

    for (const file of files) {
      const source = readProjectFile(file);
      expect(source, file).toContain("114K");
      expect(source, file).not.toMatch(/(?:100|300)\s*(?:K|mil)\+?/i);
    }
  });

  it("does not render the phone number as visible CV text", () => {
    const cvSource = readProjectFile("client/src/pages/CV.tsx");

    expect(cvSource).not.toContain("+55 11 94574-7353");
    expect(cvSource).not.toMatch(/href=["']tel:/i);
    expect(cvSource).toContain("wa.me/5511945747353");
  });
});
