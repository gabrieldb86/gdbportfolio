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

    expect(homeSource).toContain('<Link href="/cv" className="proof-link proof-link-alt" style={{fontSize: \'14px\', marginTop: \'87px\', marginLeft: \'-305px\'}}><span style={{fontSize: \'14px\'}}>Ver CV</span>');
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

  it("publishes a clear privacy policy for contact data and analytics changes", () => {
    const privacySource = readProjectFile("client/src/pages/Privacy.tsx");
    const homeSource = readProjectFile("client/src/pages/Home.tsx");

    expect(privacySource).toContain("Dados que podem ser informados");
    expect(privacySource).toContain("O conteúdo digitado não é salvo em uma base de contatos própria deste site");
    expect(privacySource).toContain("LGPD — Lei nº 13.709/2018");
    expect(privacySource).toContain("Cookies e métricas de navegação");
    expect(privacySource).toContain("Seus direitos");
    expect(privacySource).toContain('href="mailto:gabrieldb@me.com"');
    expect(homeSource).toContain("Este site não capta nem armazena leads.");
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
    const gallerySource = readProjectFile("client/src/components/ProjectAccordionGallery.tsx");

    expect(appSource).toContain('lazy(() => import("@/pages/Editor"))');
    expect(appSource).toContain("<Suspense fallback={null}><Editor /></Suspense>");
    expect(homeSource).toContain("<ProjectAccordionGallery projects={behanceProjects} />");
    expect(gallerySource).toContain('className="project-accordion-media"');
    expect(gallerySource).toContain('loading="lazy" fetchPriority="low"');
    expect(homeSource).toContain('siteConfig.trainingImage');
  });

  it("uses the GTmetrix LCP image preload and cacheable public delivery headers", () => {
    const htmlSource = readProjectFile("client/index.html");
    const viteSource = readProjectFile("server/_core/vite.ts");
    const storageSource = readProjectFile("server/_core/storageProxy.ts");

    expect(htmlSource).toContain('samuel-scalzo-xyuYk9oLA8I-unsplash_f54f1e14_d1a41791.webp');
    expect(htmlSource).toContain('fetchpriority="high"');
    expect(htmlSource).not.toContain("use.typekit.net");
    expect(viteSource).toContain('PUBLIC_HTML_CACHE_CONTROL = "public, max-age=0, s-maxage=300, stale-while-revalidate=86400"');
    expect(storageSource).toContain('public, max-age=300, s-maxage=300, stale-while-revalidate=86400');
    expect(storageSource).not.toContain('res.set("Cache-Control", "no-store")');
  });

  it("uses optimized WebP assets for portfolio imagery while preserving vector assets", () => {
    const configSource = readProjectFile("client/src/data/siteConfig.ts");
    const casesSource = readProjectFile("client/src/pages/CaseStudy.tsx");
    const seoSource = readProjectFile("shared/portfolioSeo.ts");

    expect(configSource).toContain("gabriel-profile_69235fc9_7b29c3e7.webp");
    expect(configSource).toContain("gdb-editorial-reference_251d002f_af5d8c3a.webp");
    expect(configSource).toContain("legacyWebpAssetMap");
    expect(configSource).toContain("gdb-editorial-collage_983088a0.png");
    expect(casesSource).toContain("ragtech-dicas_c4a3d253_4fcf3eea.webp");
    expect(seoSource).toContain("DEFAULT_OG_IMAGE = \"/manus-storage/gabriel-open-graph-preview_2ecf2c14.jpg\"");
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

  it("keeps manually sized section wrappers fluid across desktop canvases", () => {
    const css = readProjectFile("client/src/index.css");

    expect(css).toContain("@media (min-width: 901px)");
    expect(css).toContain(".home-revision .manifesto-section[style]");
    expect(css).toContain(".home-revision .work-section[style]");
    expect(css).toContain(".home-revision .contact-section[style]");
    expect(css).toContain("width: auto !important;");
    expect(css).toContain("height: auto !important;");
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

    expect(homeSource).toContain("id=\"contact-title\" style={{height: '479px', width: '756px', marginBottom: '111px', marginRight: '-1px', fontSize: '51px'}}");
    expect(homeSource).toContain("id=\"contact\" className=\"contact-section section-pad\" aria-labelledby=\"contact-title\" style={{height: '1560px', width: '355px'}}");
    expect(homeSource).toContain("Você está formando<br style={{height: '479px', marginBottom: '111px', marginRight: '-1px', width: '756px'}} />uma equipe de");
    expect(homeSource).toContain("<em style={{height: '479px', marginBottom: '111px', marginRight: '-1px', width: '756px', fontSize: '55px', color: '#b72529'}}>coordenação?</em>");
    expect(homeSource).toContain("style={{fontSize: '18px', marginBottom: '18px', marginTop: '-100px'}}");
    expect(homeSource).toContain("contact-form\" data-reveal=\"contact-form\" onSubmit={handleSubmit} noValidate aria-describedby={Object.keys(formErrors).length ? \"contact-form-errors\" : undefined} style={{marginLeft: '130px', width: '750px'}}");
    expect(homeSource).toContain('className="hero-actions" style={{marginTop: \'24px\'}}');
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

  it("preserves the manual services typography while applying the selected heading size", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");

    expect(homeSource).toContain("services-editorial-note\" style={{fontSize: '25px'}}");
    expect(homeSource).toContain("<strong style={{fontSize: '20px', color: '#1c1b1a'}}>Do briefing à rotina de campo.</strong>");
    expect(homeSource).toContain("<p style={{fontSize: '25px'}}>Coordenação que organiza contexto");
  });

  it("preserves the manual positioning of the about image label", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");

    expect(homeSource).toContain("about-art-label\" style={{marginBottom: '-17px', marginRight: '6px', fontSize: '14px', color: '#b72529'}}");
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
    expect(homeSource).toContain("coordination-focus-note\" style={{fontSize: '20px', width: '879px', marginTop: '51px'}}");
    expect(homeSource).toContain("data-reveal-delay=\"80\" style={{marginLeft: '190px'}}");
    expect(homeSource).toContain("data-reveal-delay=\"140\" style={{marginLeft: '190px'}}");
    expect(homeSource).toContain("coordination-focus-item-body\" style={{marginTop: '10px'}}");
    expect(homeSource).toContain("coordination-focus-item-body\" style={{marginLeft: '190px', marginTop: '10px'}}");
    expect(css).toContain(".home-revision .coordination-focus-label[style]");
    expect(css).toContain(".home-revision .coordination-focus-item[style]");
    expect(css).toContain(".coordination-focus-item[data-reveal-delay=\"200\"] .coordination-focus-item-top span[style]");
    expect(css).toContain("margin-left: 190px !important");
    expect(css).toContain("margin-left: 0 !important");
  });

  it("publishes the custom favicon across browser and device metadata", () => {
    const document = readProjectFile("client/index.html");
    const manifest = readProjectFile("client/public/site.webmanifest");

    expect(document).toContain("%BASE_URL%favicon.ico?v=portrait-20260820");
    expect(document).toContain("%BASE_URL%favicon-16.png?v=portrait-20260820");
    expect(document).toContain("%BASE_URL%favicon-32.png?v=portrait-20260820");
    expect(document).toContain("%BASE_URL%apple-touch-icon.png?v=portrait-20260820");
    expect(document).toContain('rel="manifest" href="%BASE_URL%site.webmanifest?v=portrait-20260820"');
    expect(manifest).toContain("/icon-192.png?v=portrait-20260820");
    expect(manifest).toContain("/icon-512.png?v=portrait-20260820");
  });

  it("keeps the static GitHub Pages publication configured for the confirmed repository", () => {
    const viteConfig = readProjectFile("vite.config.ts");
    const packageJson = readProjectFile("package.json");
    const workflow = readProjectFile(".github/workflows/deploy-github-pages.yml");
    const staticBuild = readProjectFile("scripts/build-github-pages.mjs");

    expect(viteConfig).toContain('"/gdbportfolio/"');
    expect(packageJson).toContain('"build:github-pages": "node scripts/build-github-pages.mjs"');
    expect(workflow).toContain("actions/deploy-pages@v4");
    expect(staticBuild).toContain("https://gabrieldb86.github.io/gdbportfolio");
  });

  it("shows only four Behance projects through the accessible animated work gallery", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");
    const gallerySource = readProjectFile("client/src/components/ProjectAccordionGallery.tsx");
    const css = readProjectFile("client/src/index.css");

    expect(homeSource).toContain('project.href.includes("behance.net")');
    expect(homeSource).toContain(".slice(0, 4)");
    expect(homeSource).toContain("<ProjectAccordionGallery projects={behanceProjects} />");
    expect(gallerySource).toContain('target="_blank"');
    expect(gallerySource).toContain('aria-label={`Abrir ${project.title} no Behance`}');
    expect(gallerySource).toContain('event.key === "ArrowRight"');
    expect(css).toContain(".project-accordion-gallery");
    expect(css).toContain(".project-accordion-panel.is-active");
    expect(css).toContain("min-width: clamp(94px, 11.5vw, 148px)");
    expect(css).toContain("flex-grow: 3.4");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("keeps the recent gallery and glow effect contained at mobile and tablet widths", () => {
    const css = readProjectFile("client/src/index.css");

    expect(css).toContain("@media (min-width: 721px) and (max-width: 900px)");
    expect(css).toContain(".project-accordion-panel { width: 100%; min-width: 0; }");
    expect(css).toContain(".image-glow-frame::after { inset: -5px; filter: blur(5px); }");
  });

  it("restores the approved compact mobile work gallery without changing manual desktop dimensions", () => {
    const css = readProjectFile("client/src/index.css");
    const homeSource = readProjectFile("client/src/pages/Home.tsx");

    expect(homeSource).toContain("id=\"work\" className=\"work-section work-redesign section-pad\" aria-labelledby=\"work-title\" style={{height: '5139px', width: '358px'}}");
    expect(css).toContain("/* Restauração mobile: preserva os valores manuais do desktop");
    expect(css).toContain(".home-revision .work-redesign[style]");
    expect(css).toContain("height: auto !important;");
    expect(css).toContain(".home-revision .project-accordion-gallery");
    expect(css).toContain("height: 112px;");
  });

  it("applies the reusable editorial glow effect to every public image surface", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");
    const cvSource = readProjectFile("client/src/pages/CV.tsx");
    const caseSource = readProjectFile("client/src/pages/CaseStudy.tsx");
    const gallerySource = readProjectFile("client/src/components/ProjectAccordionGallery.tsx");
    const glowSource = readProjectFile("client/src/components/ImageGlowFrame.tsx");
    const css = readProjectFile("client/src/index.css");

    expect(homeSource).toContain('from "@/components/ImageGlowFrame"');
    expect(homeSource).toContain('className="hero-redesign-portrait hero-redesign-portrait-large"');
    expect(homeSource).toContain('className="about-art-wrap"');
    expect(homeSource).toContain('className="statement-media-frame"');
    expect(cvSource).toContain('className="cv-portrait"');
    expect(cvSource).toContain('className="cv-closing-media"');
    expect(caseSource).toContain('className="case-hero-art"');
    expect(gallerySource).toContain('className="project-accordion-media"');
    expect(glowSource).toContain("onPointerMove");
    expect(glowSource).toContain("--image-glow-angle");
    expect(css).toContain(".image-glow-frame::before");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("keeps the client router base aligned with root SSR hydration", () => {
    const clientEntry = readProjectFile("client/src/entry-client.tsx");
    const serverEntry = readProjectFile("client/src/entry-server.tsx");

    expect(clientEntry).toContain('const routerBase = import.meta.env.BASE_URL === "/"');
    expect(clientEntry).toContain("? undefined");
    expect(clientEntry).toContain("<Router base={routerBase}>");
    expect(clientEntry).not.toContain('replace(/\\/$/, "") || "/"');
    expect(serverEntry).toContain("<Router ssrPath={ssrPath} ssrSearch={ssrSearch}>");
  });

  it("places the WhatsApp CTA in the first fold of the hero", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");
    const sourceLines = homeSource.split("\n");
    const ctaTargetLine = sourceLines.findIndex((line) => line.includes('data-editor-target="hero-cta"'));
    const iconTargetLine = sourceLines.findIndex((line) => line.includes('data-editor-target="hero-cta-icon"'));

    expect(homeSource).toContain('href="https://wa.me/5511945747353"');
    expect(homeSource).toContain("data-umami-event=\"hero-whatsapp-click\"");
    expect(homeSource).toContain('trackPortfolioEvent("cta_fale_comigo")');
    expect(homeSource).toContain('data-editor-target="hero-cta"');
    expect(homeSource).toContain('data-editor-target="hero-cta-icon"');
    expect(homeSource).toContain("style={{fontSize: '23px', marginTop: '33px'}}");
    expect(homeSource).toContain('className="hero-cta-icon"');
    expect(homeSource).toContain("style={{fontSize: '23px', marginTop: '-3px', height: '24px', marginLeft: '1px', width: '24px'}}");
    expect(ctaTargetLine).toBeGreaterThan(-1);
    expect(iconTargetLine).toBeGreaterThan(ctaTargetLine);
    expect(homeSource).toContain("FALAR COM GABRIEL");
  });

  it("preserves the final manual portrait spacing and width in the hero", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");

    expect(homeSource).toContain('hero-redesign-portrait hero-redesign-portrait-large" data-reveal="hero-portrait" style={{marginRight: \'110px\'}}');
    expect(homeSource).toContain("style={{ aspectRatio: '0.80', width: '648px' }}");
  });

  it("preserves the final manual values across the edited public sections", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");

    expect(homeSource).toContain("hero-section hero-redesign\" style={{height: '870px'}}");
    expect(homeSource).toContain("brand-name\" style={{ fontSize: '17px', textAlign: \"left\" }}");
    expect(homeSource).toContain("id=\"coordination-focus-title\" style={{height: '140px', width: '272px', color: '#f4eee6'}}");
    expect(homeSource).toContain("style={{fontSize: '12px', height: '21px', width: '276px', color: '#b72529'}}");
    expect(homeSource).toContain("id=\"work\" className=\"work-section work-redesign section-pad\" aria-labelledby=\"work-title\" style={{height: '5139px', width: '358px'}}");
    expect(homeSource).toContain("about-art-label\" style={{marginBottom: '-17px', marginRight: '6px', fontSize: '14px', color: '#b72529'}}");
    expect(homeSource).toContain("fontSize: '55px', color: '#b72529'}}>coordenação?</em>");
  });

  it("preserves the manual white manifesto surface with black copy and red link", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");

    expect(homeSource).toContain("backgroundColor: '#f4eee6'");
    expect(homeSource).toContain("section-kicker\" style={{fontSize: '16px', color: '#b72529'}}>Como eu atuo</p>");
    expect(homeSource).toContain("id=\"manifesto-title\" style={{color: '#1c1b1a'}}");
    expect(homeSource).toContain("<span style={{color: '#b72529'}}>quando chega ao campo.</span>");
    expect(homeSource).toContain("fontSize: '16px', color: '#000000', fontWeight: '600'");
    expect(homeSource).toContain("width: '276px', color: '#b72529'");
    expect(homeSource).toContain("<p style={{ fontSize: '18px', color: '#f4eee6' }}>Uma seleção de campanhas");
    expect(homeSource).toContain("statement-context-box\" style={{width: '500px', fontSize: '16px'}}");
    expect(homeSource).toContain("contact-privacy-note\" style={{fontSize: '14px'}}");
  });

  it("preserves the manual dimensions of the manifesto section", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");

    expect(homeSource).toContain("manifesto-section section-pad\" aria-labelledby=\"manifesto-title\" style={{height: '733px', width: '351px', backgroundColor: '#f4eee6'}}");
  });

  it("preserves the manual white focus title, black emphasis and note spacing", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");
    const css = readProjectFile("client/src/index.css");

    expect(homeSource).toContain("id=\"coordination-focus-title\" style={{height: '140px', width: '272px', color: '#f4eee6'}}");
    expect(homeSource).toContain("<em style={{height: '140px', width: '272px', color: '#1c1b1a'}}>método à prática.</em>");
    expect(homeSource).toContain("coordination-focus-note\" style={{fontSize: '20px', width: '879px', marginTop: '51px'}}");
    expect(homeSource).toContain("className=\"behance-link\" href=\"https://www.behance.net/gabrieldb86\" data-umami-event=\"behance-open\" target=\"_blank\" rel=\"noreferrer\" onClick={() => trackPortfolioEvent(\"portfolio_behance\")} style={{fontSize: '14px'}}");
    expect(css).toContain(".home-revision .coordination-focus-label h2 em {\n    color: #000000 !important;");
  });

  it("preserves the manual recruiter indicators and removes only the marked narrative metric", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");

    expect(homeSource).toContain("paddingTop: '30px', marginRight: '300px'");
    expect(homeSource).toContain("style={{marginLeft: '-330px'}}");
    expect(homeSource).toContain("style={{marginTop: '-80px'}}");
    expect(homeSource).toContain("style={{marginTop: '-47px'}}");
    expect(homeSource).toContain("style={{marginTop: '-49px'}}");
    expect(homeSource).toContain("proof-metric\" style={{marginRight: '-120px', marginTop: '-12px'}}");
    expect(homeSource).toContain("proof-tagline\" style={{fontSize: '12px', color: '#fff9f2'}}");
    expect(homeSource).toContain("proof-actions\" style={{marginRight: '20px', marginLeft: '135px', height: '99px', width: '314px'}}");
    expect(homeSource).toContain("className=\"proof-link\" style={{fontSize: '14px', marginTop: '-5px'}}");
    expect(homeSource).toContain("className=\"proof-link proof-link-alt\" style={{fontSize: '14px', marginTop: '87px', marginLeft: '-305px'}}");
    expect(homeSource).not.toContain("proof-metric-narrative");
    expect(homeSource).not.toContain("mais de 20 campanhas de incentivo implementadas");
  });

  it("restores the recruiter metrics as a complete mobile grid without changing desktop offsets", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");
    const css = readProjectFile("client/src/index.css");

    expect(homeSource).toContain("style={{ height: '490px', paddingTop: '76px', backgroundColor: '#cf7b73' }}");
    expect(homeSource).toContain("style={{marginLeft: '-330px'}}");
    expect(css).toContain("/* Restauração mobile das métricas");
    expect(css).toContain(".home-revision #recruiter-proof[style]");
    expect(css).toContain("grid-template-columns: repeat(2, minmax(0, 1fr));");
    expect(css).toContain(".home-revision .recruiter-proof-layout .proof-metric[style]");
    expect(css).toContain("margin: 0 !important;");
    expect(css).toContain(".proof-metric:nth-child(n + 3)");
  });

  it("allows the manual brand type size to override the header default", () => {
    const css = readProjectFile("client/src/index.css");
    const homeSource = readProjectFile("client/src/pages/Home.tsx");

    expect(css).toContain(".brand-name { white-space: nowrap; line-height: 1.1; font-size: 21px; letter-spacing: -.02em; }");
    expect(css).not.toContain(".brand-name { white-space: nowrap; line-height: 1.1; font-size: 21px !important;");
    expect(homeSource).toContain("brand-name\" style={{ fontSize: '17px', textAlign: \"left\" }}");
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

  it("keeps public desktop layouts fluid and accessible as the viewport is reduced", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");
    const css = readProjectFile("client/src/index.css");

    expect(css).toContain("/* Desktop fluido e acessível");
    expect(css).toContain("@media (min-width: 901px) and (max-width: 1280px)");
    expect(css).toContain(".home-revision .hero-redesign[style]");
    expect(css).toContain(".home-revision .contact-form[style]");
    expect(css).toContain("grid-template-columns: minmax(0, 1fr) !important;");
    expect(css).toContain("max-height: 800px");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain("@media (prefers-contrast: more)");
    expect(homeSource).toContain('className="skip-link" href="#main-content"');
    expect(homeSource).toContain('<main id="main-content" tabIndex={-1}>');
    expect(css).toContain(".skip-link:focus-visible");
  });

  it("uses a compact accessible reflow before extreme viewport widths cut off content", () => {
    const css = readProjectFile("client/src/index.css");

    expect(css).toContain("/* Limite de reflow acessível");
    expect(css).toContain("@media (max-width: 360px)");
    expect(css).toContain("text-overflow: ellipsis;");
    expect(css).toContain("overflow-wrap: anywhere;");
    expect(css).toContain(".home-revision .mobile-sticky-cta");
    expect(css).toContain("font-size: 16px;");
  });

  it("switches away from compressed desktop before the intermediate viewport loses usability", () => {
    const css = readProjectFile("client/src/index.css");

    expect(css).toContain("/* Janela de transição");
    expect(css).toContain("@media (min-width: 901px) and (max-width: 1100px)");
    expect(css).toContain(".home-revision .side-rail");
    expect(css).toContain(".home-revision .hero-redesign[style]");
    expect(css).toContain("grid-template-columns: minmax(0, 1fr) !important;");
  });

  it("keeps desktop content in continuous reflow instead of forcing a wider canvas", () => {
    const css = readProjectFile("client/src/index.css");

    expect(css).toContain("/* Reflow contínuo do desktop estreito");
    expect(css).toContain("min-width: 0 !important;");
    expect(css).toContain("overflow-x: hidden !important;");
    expect(css).toContain(".home-revision .side-rail");
    expect(css).toContain("grid-template-columns: minmax(0, 1.1fr) minmax(230px, .82fr) !important;");
    expect(css).toContain("grid-template-columns: repeat(2, minmax(0, 1fr)) !important;");
    expect(css).toContain("/* Tablet fluido");
    expect(css).toContain(".home-revision .work-section[style]");
    expect(css).toContain("#contact.contact-section .contact-intro h2#contact-title[style]");
    expect(css).toContain(".home-revision .footer-credit");
  });

  it("provides an editorial and recoverable not-found experience", () => {
    const notFoundSource = readProjectFile("client/src/pages/NotFound.tsx");
    const errorBoundarySource = readProjectFile("client/src/components/ErrorBoundary.tsx");
    const css = readProjectFile("client/src/index.css");

    expect(notFoundSource).toContain("notFoundContent");
    expect(notFoundSource).toContain('id="not-found-home-link" href="/"');
    expect(notFoundSource).toContain("Esta página saiu");
    expect(errorBoundarySource).toContain("Recuperação de página");
    expect(errorBoundarySource).not.toContain("error?.stack");
    expect(css).toContain(".not-found-page, .recovery-page");
    expect(css).toContain(".not-found-main");
  });

  it("redirects a valid contact flow to an editable thank-you page", () => {
    const appSource = readProjectFile("client/src/App.tsx");
    const homeSource = readProjectFile("client/src/pages/Home.tsx");
    const thankYouSource = readProjectFile("client/src/pages/ThankYou.tsx");
    const css = readProjectFile("client/src/index.css");

    expect(appSource).toContain('path="/obrigado" component={ThankYou}');
    expect(homeSource).toContain('setLocation("/obrigado")');
    expect(thankYouSource).toContain("thankYouContent");
    expect(thankYouSource).toContain('id="thank-you-home-link"');
    expect(thankYouSource).toContain("envie-a diretamente pelo WhatsApp");
    expect(css).toContain(".thank-you-page");
    expect(css).toContain(".thank-you-main");
  });
});
