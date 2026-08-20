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

  it("applies the reference gutter only on desktop while retaining the mobile axis", () => {
    const css = readProjectFile("client/src/index.css");

    expect(css).toContain("--reference-page-gutter: clamp(168px, 14.5vw, 260px)");
    expect(css).toContain("--reference-content-gutter: calc(var(--reference-page-gutter) - 54px)");
    expect(css).toContain(".home-revision .hero-redesign-copy");
    expect(css).toContain("max-width: 440px !important");
    expect(css).toContain(".home-revision .hero-redesign-panel");
    expect(css).toContain("padding-left: 0 !important");
    expect(css).toContain("@media (min-width: 901px)");
    expect(css).toContain("--editorial-axis: 24px");
  });

  it("defers protected editing and below-the-fold portfolio imagery from the public initial load", () => {
    const appSource = readProjectFile("client/src/App.tsx");
    const homeSource = readProjectFile("client/src/pages/Home.tsx");

    expect(appSource).toContain('lazy(() => import("@/pages/Editor"))');
    expect(appSource).toContain("<Suspense fallback={null}><Editor /></Suspense>");
    expect(homeSource).toContain('className="project-image"');
    expect(homeSource).toContain('loading="lazy" fetchPriority="low"');
    expect(homeSource).toContain('siteConfig.trainingImage');
  });

  it("uses the GTmetrix LCP image preload and cacheable public delivery headers", () => {
    const htmlSource = readProjectFile("client/index.html");
    const viteSource = readProjectFile("server/_core/vite.ts");
    const storageSource = readProjectFile("server/_core/storageProxy.ts");

    expect(htmlSource).toContain('samuel-scalzo-xyuYk9oLA8I-unsplash_f54f1e14.jpg');
    expect(htmlSource).toContain('fetchpriority="high"');
    expect(htmlSource).not.toContain("use.typekit.net");
    expect(viteSource).toContain('PUBLIC_HTML_CACHE_CONTROL = "public, max-age=0, s-maxage=300, stale-while-revalidate=86400"');
    expect(storageSource).toContain('public, max-age=300, s-maxage=300, stale-while-revalidate=86400');
    expect(storageSource).not.toContain('res.set("Cache-Control", "no-store")');
  });

  it("keeps manual hero measurements on desktop while resetting only their mobile impact", () => {
    const css = readProjectFile("client/src/index.css");
    const homeSource = readProjectFile("client/src/pages/Home.tsx");

    expect(homeSource).toContain("marginLeft: '-315px'");
    expect(homeSource).toContain("marginRight: '377px'");
    expect(css).toContain(".home-revision .hero-redesign-panel[style]");
    expect(css).toContain("@media (max-width: 900px)");
    expect(css).toContain("margin-left: 0 !important");
    expect(css).toContain(".home-revision .hero-redesign-panel .hero-proof-line[style]");
  });

  it("makes manually sized desktop sections fluid without touching the mobile breakpoint", () => {
    const css = readProjectFile("client/src/index.css");

    expect(css).toContain("@media (min-width: 901px) and (max-width: 1680px)");
    expect(css).toContain("width: min(994px, 100%) !important");
    expect(css).toContain("width: min(909px, 100%) !important");
    expect(css).toContain("@media (min-width: 901px) and (max-width: 1300px)");
    expect(css).toContain("grid-template-columns: repeat(3, minmax(0, 1fr)) !important");
    expect(css).toContain("@media (max-width: 900px)");
  });

  it("resets only the mobile impact of manual service and statement dimensions", () => {
    const css = readProjectFile("client/src/index.css");

    expect(css).toContain(".home-revision #services-title[style]");
    expect(css).toContain(".home-revision .statement-copy[style]");
    expect(css).toContain("padding: 78px var(--editorial-axis) 62px !important");
    expect(css).toContain(".home-revision .statement-copy h2[style]");
    expect(css).toContain("height: auto !important");
  });

  it("preserves the final manual contact dimensions on desktop and resets them only on mobile", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");
    const css = readProjectFile("client/src/index.css");

    expect(homeSource).toContain("id=\"contact-title\" style={{height: '479px', width: '756px', marginBottom: '111px', marginRight: '-1px'}}");
    expect(homeSource).toContain("id=\"contact\" className=\"contact-section section-pad\" aria-labelledby=\"contact-title\" style={{height: '1440px', width: '355px'}}");
    expect(homeSource).toContain("Você está formando<br style={{height: '479px', marginBottom: '111px', marginRight: '-1px', width: '756px'}} />uma equipe de");
    expect(homeSource).toContain("<em style={{height: '479px', marginBottom: '111px', marginRight: '-1px', width: '756px'}}>coordenação?</em>");
    expect(homeSource).toContain("style={{fontSize: '16px', marginBottom: '18px', marginTop: '-111px'}}");
    expect(homeSource).toContain("contact-form\" data-reveal=\"contact-form\" onSubmit={handleSubmit} style={{marginLeft: '914px', width: '750px'}}");
    expect(css).toContain("#contact.contact-section .contact-intro h2#contact-title[style]");
    expect(css).toContain("min-width: 756px");
    expect(css).toContain("width: 756px !important");
    expect(css).toContain(".home-revision .contact-form[style]");
    expect(css).toContain("width: auto !important");
    expect(css).toContain("height: auto !important");
  });

  it("preserves the manual manifesto aside offset on desktop and resets it only on mobile", () => {
    const css = readProjectFile("client/src/index.css");
    const homeSource = readProjectFile("client/src/pages/Home.tsx");

    expect(homeSource).toContain("manifesto-aside\" style={{marginLeft: '-145px'}}");
    expect(css).toContain(".home-revision .manifesto-aside[style]");
    expect(css).toContain("margin-left: 0 !important");
  });

  it("preserves the manual 25px typography in the services editorial note", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");

    expect(homeSource).toContain("services-editorial-note\" style={{fontSize: '25px'}}");
    expect(homeSource).toContain("<strong style={{fontSize: '25px'}}>Do briefing à rotina de campo.</strong>");
    expect(homeSource).toContain("<p style={{fontSize: '25px'}}>Coordenação que organiza contexto");
  });

  it("preserves the manual positioning of the about image label", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");

    expect(homeSource).toContain("about-art-label\" style={{marginBottom: '-21px', marginRight: '75px'}}");
  });

  it("preserves the manual CV toolstrip measurements and resets them only on mobile", () => {
    const css = readProjectFile("client/src/index.css");
    const cvSource = readProjectFile("client/src/pages/CV.tsx");

    expect(cvSource).toContain("fontSize: '40px', width: '382px'");
    expect(cvSource).toContain("cv-toolstrip\" style={{marginLeft: '173px'}}");
    expect(cvSource).toContain("<span style={{marginLeft: '173px'}}>Curiosidade</span>");
    expect(css).toContain(".cv-toolstrip-label .section-kicker[style]");
    expect(css).toContain(".cv-toolstrip[style]");
    expect(css).toContain("margin-left: 0 !important");
  });

  it("preserves the final manual offset in the CV portrait caption", () => {
    const cvSource = readProjectFile("client/src/pages/CV.tsx");

    expect(cvSource).toContain('style={{ marginBottom: "-24px", marginLeft: \'-5px\' }}');
    expect(cvSource).toContain("<span style={{marginLeft: '-5px'}}>Gabriel Danino Basilio</span>");
    expect(cvSource).toContain("<span style={{marginLeft: '-5px'}}>Coordenador · Conteúdo, Treinamento &amp; Trade</span>");
  });

  it("restores the functional layout flow across the edited CV sections", () => {
    const cvSource = readProjectFile("client/src/pages/CV.tsx");

    expect(cvSource).toContain('<div className="cv-content-grid">');
    expect(cvSource).toContain('<section className="cv-detail-section section-pad" aria-labelledby="qualification-title">');
    expect(cvSource).toContain('<div className="cv-detail-content">');
    expect(cvSource).toContain('<section className="cv-toolstrip-section">');
    expect(cvSource).toContain('<section className="cv-experience-section section-pad" aria-labelledby="experience-title">');
    expect(cvSource).not.toContain("height: '5944px'");
  });

  it("preserves manual coordination-focus dimensions on desktop and resets them only on mobile", () => {
    const css = readProjectFile("client/src/index.css");
    const homeSource = readProjectFile("client/src/pages/Home.tsx");

    expect(homeSource).toContain("coordination-focus-label\" data-reveal=\"focus-label\" style={{width: '933px'}}");
    expect(homeSource).toContain("coordination-focus-note\" style={{fontSize: '16px', width: '879px'}}");
    expect(homeSource).toContain("data-reveal-delay=\"80\" style={{marginLeft: '190px'}}");
    expect(homeSource).toContain("data-reveal-delay=\"140\" style={{marginLeft: '190px'}}");
    expect(css).toContain(".home-revision .coordination-focus-label[style]");
    expect(css).toContain(".home-revision .coordination-focus-item[style]");
    expect(css).toContain(".coordination-focus-item[data-reveal-delay=\"200\"] .coordination-focus-item-top span[style]");
    expect(css).toContain("margin-left: 190px !important");
    expect(css).toContain("margin-left: 0 !important");
  });

  it("publishes the custom favicon across browser and device metadata", () => {
    const document = readProjectFile("client/index.html");
    const manifest = readProjectFile("client/public/site.webmanifest");

    expect(document).toContain("/favicon.ico?v=portrait-20260820");
    expect(document).toContain("/favicon-16.png?v=portrait-20260820");
    expect(document).toContain("/favicon-32.png?v=portrait-20260820");
    expect(document).toContain("/apple-touch-icon.png?v=portrait-20260820");
    expect(document).toContain('rel="manifest" href="/site.webmanifest?v=portrait-20260820"');
    expect(manifest).toContain("/icon-192.png?v=portrait-20260820");
    expect(manifest).toContain("/icon-512.png?v=portrait-20260820");
  });

  it("places the WhatsApp CTA in the first fold of the hero", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");

    expect(homeSource).toContain('href="https://wa.me/5511945747353"');
    expect(homeSource).toContain("data-umami-event=\"hero-whatsapp-click\"");
    expect(homeSource).toContain('trackPortfolioEvent("cta_fale_comigo")');
    expect(homeSource).toContain("style={{fontSize: '23px', marginTop: '33px'}}>FALAR COM GABRIEL");
    expect(homeSource).toContain("<ArrowUpRight size={15} style={{fontSize: '23px', marginTop: '-3px', height: '24px', marginLeft: '1px', width: '24px'}} />");
    expect(homeSource).toContain("FALAR COM GABRIEL");
  });

  it("keeps the hero WhatsApp CTA fixed and visible on mobile without changing desktop behavior", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");
    const css = readProjectFile("client/src/index.css");

    expect(css).toContain("/* CTA fixo no mobile");
    expect(homeSource).toContain('className="mobile-sticky-cta"');
    expect(homeSource).toContain('className="mobile-sticky-cta" href="https://wa.me/5511945747353"');
    expect(css).toContain(".home-revision .mobile-sticky-cta {");
    expect(css).toContain("position: fixed;");
    expect(css).toContain("bottom: 0;");
    expect(css).toContain("background: #d73332;");
    expect(css).toContain("color: #fff9f2 !important;");
    expect(css).toContain(".home-revision .site-footer");
    expect(css).toContain("padding-bottom: calc(96px + env(safe-area-inset-bottom)) !important;");
  });
});
