import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const readProjectFile = (relativePath: string) =>
  readFileSync(resolve(projectRoot, relativePath), "utf8");

describe("public portfolio metrics and privacy", () => {
  it("keeps the 114K metric synchronized across public source files", () => {
    const files = [
      "client/src/pages/Home.tsx",
      "client/src/pages/CV.tsx",
      "client/src/data/siteConfig.ts",
    ];

    for (const file of files) {
      const source = readProjectFile(file);
      expect(source, file).toContain("114K");
      expect(source, file).not.toMatch(/(?:100|300)\s*(?:K|mil)\+?/i);
    }

    const homeSource = readProjectFile("client/src/pages/Home.tsx");
    expect(homeSource).not.toContain("useState(0)");
  });

  it("does not render the phone number as visible CV text", () => {
    const cvSource = readProjectFile("client/src/pages/CV.tsx");

    expect(cvSource).not.toContain("+55 11 94574-7353");
    expect(cvSource).not.toMatch(/href=["']tel:/i);
    expect(cvSource).toContain("wa.me/5511945747353");
  });

  it("keeps the CV opportunity CTA connected to WhatsApp with a prepared message", () => {
    const cvSource = readProjectFile("client/src/pages/CV.tsx");

    expect(cvSource).toContain("Conversar sobre uma oportunidade");
    expect(cvSource).toContain("https://wa.me/5511945747353?text=");
    expect(cvSource).toContain('trackPortfolioEvent("contact_whatsapp")');
    expect(cvSource).not.toContain('href="/#contact">Conversar sobre uma oportunidade');
  });

  it("labels the Home CV action as navigation instead of a download", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");

    expect(homeSource).toContain('<Link href="/cv" className="proof-link proof-link-alt"><span>Ver CV</span>');
    expect(homeSource).not.toContain("Baixar CV");
  });

  it("uses direct professional language instead of generic portfolio slogans", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");
    const cvSource = readProjectFile("client/src/pages/CV.tsx");

    expect(homeSource).not.toContain("Feito com intenção");
    expect(homeSource).not.toContain("Números que comprovam");
    expect(homeSource).not.toContain("O que precisa");
    expect(cvSource).not.toContain("o próximo resultado");
  });

  it("does not retain unused AI or platform demonstration components", () => {
    const files = [
      "client/src/components/AIChatBox.tsx",
      "client/src/components/ManusDialog.tsx",
      "client/src/pages/ComponentShowcase.tsx",
    ];

    for (const file of files) {
      expect(existsSync(resolve(projectRoot, file)), file).toBe(false);
    }
  });

  it("keeps public pages on a shared editorial axis", () => {
    const css = readProjectFile("client/src/index.css");
    const homeSource = readProjectFile("client/src/pages/Home.tsx");

    expect(css).toContain("--editorial-axis: 74px");
    expect(css).toContain("--editorial-page-axis: calc(54px + var(--editorial-axis))");
    expect(css).toContain(".privacy-page .privacy-main");
    expect(homeSource).toContain('className="header-avatar"');
  });

  it("keeps the rail avatar visible and red sections in document flow on desktop", () => {
    const css = readProjectFile("client/src/index.css");

    expect(css).toContain(".home-revision .side-rail .rail-image-block");
    expect(css).toContain("display: grid !important");
    expect(css).toContain(".home-revision .recruiter-proof-wrap");
    expect(css).toContain("height: auto !important");
    expect(css).toContain(".home-revision .coordination-focus-label h2");
  });
});
