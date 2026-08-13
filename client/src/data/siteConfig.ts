// Configuração editorial do portfólio — edite este arquivo para trocar conteúdo, imagens, proporções, ordem e identidade visual.
export type ProjectConfig = {
  number: string;
  title: string;
  type: string;
  year: string;
  image: string;
  href: string;
  size: "project-wide" | "project-tall" | "project-card";
  aspectRatio: string;
  objectPosition: string;
  visible: boolean;
};

export type ServiceConfig = [string, string, string];

export type CoordinationFeatureConfig = {
  image: string;
  title: string;
  category: string;
  year: string;
  description: string;
  href: string;
  alt: string;
  objectPosition: string;
};

export type SiteConfig = {
  profilePhoto: string;
  heroImage: string;
  railImage: string;
  trainingImage: string;
  backgroundImage: string;
  generatedAssets: {
    hero: string;
    collage: string;
    paper: string;
    mark: string;
    poster: string;
  };
  brand: {
    accent: string;
    background: string;
    foreground: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    positioning: string;
    intro: string;
  };
  coordinationFeature: CoordinationFeatureConfig;
  projects: ProjectConfig[];
  services: ServiceConfig[];
  serviceDetails: Record<string, string>;
};

export const defaultSiteConfig: SiteConfig = {
  profilePhoto: "/manus-storage/gabriel-profile_69235fc9.jpg",
  heroImage: "/manus-storage/gabriel-bonecaps-project_cac714ba.png",
  railImage: "/manus-storage/gabriel-sidebar-portrait_dae7ef67.jpg",
  trainingImage: "/manus-storage/gabriel-treinamento-apresentacao_2c7fabd9.jpg",
  backgroundImage: "/manus-storage/samuel-scalzo-xyuYk9oLA8I-unsplash_f54f1e14.jpg",
  generatedAssets: {
    hero: "/manus-storage/gdb-editorial-reference_251d002f.png",
    collage: "/manus-storage/gdb-editorial-collage_983088a0.png",
    paper: "/manus-storage/gdb-red-paper-detail_86c93d83.png",
    mark: "/manus-storage/gdb-editorial-mark_6fef482b.png",
    poster: "/manus-storage/gdb-abstract-poster_93816c75.png",
  },
  brand: {
    accent: "#d73332",
    background: "#f4eee6",
    foreground: "#191817",
  },
  hero: {
    eyebrow: "Coordenação ● Conteúdo ● Treinamento ● Trade Marketing",
    headline: "CONTEÚDO, treinamento & TRADE MARKETING.",
    positioning: "Coordenador de Conteúdo, Treinamento e Trade Marketing",
    intro: "Transformo estratégia em conteúdos, experiências de aprendizagem e operações de campo que movem pessoas e melhoram a execução.",
  },
  coordinationFeature: {
    image: "/manus-storage/gabriel-bonecaps-project_cac714ba.png",
    title: "Campanha Cystex",
    category: "Trade & Incentivo",
    year: "2026",
    description: "Projeto em destaque — substitua a imagem, o título e o link em siteConfig.ts.",
    href: "/cases/grupo-ems-cystex",
    alt: "Projeto Campanha Cystex em destaque",
    objectPosition: "center",
  },
  projects: [
    {
      number: "01",
      title: "Podcast Varejo na Real",
      type: "Conteúdo · Identidade",
      year: "2024",
      image: "/manus-storage/podcast-varejo-na-real_af69c605.jpg",
      href: "https://www.behance.net/gallery/229319463/Podcast-Varejo-na-Real-EP04",
      size: "project-card",
      aspectRatio: "1.26",
      objectPosition: "center",
      visible: true,
    },
    {
      number: "02",
      title: "Ragtech Dicas",
      type: "Conteúdo · Social",
      year: "2024",
      image: "/manus-storage/ragtech-dicas_c4a3d253.png",
      href: "/cases/ragtech-sistema-treinamento",
      size: "project-card",
      aspectRatio: "1.26",
      objectPosition: "center",
      visible: true,
    },
    {
      number: "03",
      title: "Future Print 2024",
      type: "Eventos · PDV",
      year: "2024",
      image: "/manus-storage/future-print-2024_9d7e3d75.png",
      href: "https://www.behance.net/gallery/229318387/Future-Print-2024-Feira-Ragtech-com-Roland-e-Epson",
      size: "project-card",
      aspectRatio: "1.26",
      objectPosition: "center",
      visible: true,
    },
    {
      number: "04",
      title: "Eletrolar Show 2024",
      type: "Eventos · Experiência",
      year: "2024",
      image: "/manus-storage/eletrolar-show-2024_51e67363.png",
      href: "https://www.behance.net/gallery/229253681/Eletrolar-Show-2024-Feira-com-Redragon-e-Ragtech",
      size: "project-card",
      aspectRatio: "1.26",
      objectPosition: "center",
      visible: true,
    },
    {
      number: "05",
      title: "Blocs Presentation",
      type: "Apresentação",
      year: "2024",
      image: "/manus-storage/blocs-presentation_ad07fc26.png",
      href: "/cases/blocs-presentation",
      size: "project-card",
      aspectRatio: "1.26",
      objectPosition: "center",
      visible: true,
    },
    {
      number: "06",
      title: "Valens BDN",
      type: "Branding",
      year: "2023",
      image: "/manus-storage/valens-bdn_e5a00706.jpg",
      href: "https://www.behance.net/gallery/229252033/Valens-BDN",
      size: "project-card",
      aspectRatio: "1.26",
      objectPosition: "center",
      visible: true,
    },
    {
      number: "07",
      title: "Campanha Cystex",
      type: "Trade & Incentivo",
      year: "2026",
      image: "/manus-storage/gabriel-bonecaps-project_cac714ba.png",
      href: "/cases/grupo-ems-cystex",
      size: "project-card",
      aspectRatio: "1.26",
      objectPosition: "center",
      visible: true,
    },
    {
      number: "08",
      title: "Roadshow DPSP",
      type: "Facilitação",
      year: "2026",
      image: "/manus-storage/valens-bdn_e5a00706.jpg",
      href: "/cases/roadshow-dpsp",
      size: "project-card",
      aspectRatio: "1.26",
      objectPosition: "center",
      visible: true,
    },
    {
      number: "09",
      title: "Today at Apple Brazil",
      type: "Liderança T&D",
      year: "2023",
      image: "/manus-storage/gabriel-profile_69235fc9.jpg",
      href: "/cases/today-at-apple",
      size: "project-card",
      aspectRatio: "1.26",
      objectPosition: "center",
      visible: true,
    },
    {
      number: "10",
      title: "Trilhas de Aprendizagem",
      type: "Instructional Design",
      year: "2026",
      image: "/manus-storage/valens-bdn_e5a00706.jpg",
      href: "/cases/trilhas-aprendizagem",
      size: "project-card",
      aspectRatio: "1.26",
      objectPosition: "center",
      visible: true,
    },
  ],
  services: [
    ["01", "Conteúdo & Treinamento", "Instructional design, trilhas de aprendizagem, e-learning e facilitação, do briefing ao resultado."],
    ["02", "Trade Marketing & Performance de Campo", "Campanhas de incentivo, dashboards de KPI, execução em PDV e gestão de indicadores multiloja."],
    ["03", "Treinamento & Desenvolvimento de Pessoas", "Onboarding, avaliação de desempenho, coordenação de equipes de campo e programas de capacitação."],
  ],
  serviceDetails: {
    "01": "Desenho experiências de aprendizagem com ADDIE, Kirkpatrick e Learning Experience Design (LXD) — da estratégia à trilha, do e-learning à facilitação presencial. Já apliquei essa abordagem para mais de 114K pessoas ao longo da carreira, incluindo 8 anos como pioneiro do Today at Apple no Brasil.",
    "02": "Construo campanhas de incentivo de ponta a ponta — briefing, modelagem financeira e análise de risco — e dashboards interativos para monitorar KPIs de força de campo. Na SPOT/EMS, isso significou acompanhar mais de 130 promotores em tempo real.",
    "03": "Coordeno equipes de campo com onboarding estruturado, ciclos de PDCA, avaliação de desempenho e metodologia 9Box. Já treinei e integrei equipes em redes como Apple Premium Resellers, Ragtech e ITM Channel Marketing, com taxas de retenção de até 90%.",
  },
};

const STORAGE_KEY = "gabriel-portfolio-config";

function migrateProjects(savedProjects: ProjectConfig[] | undefined) {
  if (!savedProjects) return defaultSiteConfig.projects;
  return savedProjects.map((project) => {
    const defaultProject = defaultSiteConfig.projects.find((candidate) => candidate.number === project.number);
    const isLegacyBehanceAsset = project.image.startsWith("https://mir-s3-cdn-cf.behance.net/");
    const isLegacyProjectLink = project.href === "https://www.behance.net/gabrieldb86" || project.href.includes("229252353/Blocs-Presentation");
    const isKnownBrokenAsset = /podcast-varejo-na-real_af69c605|ragtech-dicas_83287b6b|future-print-2024_11b8395d|eletrolar-show-2024_5c1c2e78|blocs-presentation_4e27f6cf|gabriel-treinamento-apresentacao_2c7fabd9|gdb-editorial-collage_983088a0/.test(project.image);
    return defaultProject ? { ...project, image: isLegacyBehanceAsset || isKnownBrokenAsset ? defaultProject.image : project.image, href: isLegacyProjectLink ? defaultProject.href : project.href } : project;
  });
}

function migrateHero(savedHero: Partial<SiteConfig["hero"]> | undefined) {
  const hero = { ...defaultSiteConfig.hero, ...savedHero };
  const hasLegacyMetric = /(?:100|300)\s*(?:K|mil)\+?/i.test(hero.intro);
  const hasLegacyLongIntro = hero.intro.startsWith("Sou Gabriel, há mais de 17 anos");
  return {
    ...hero,
    positioning: hero.positioning || defaultSiteConfig.hero.positioning,
    intro: hasLegacyMetric || hasLegacyLongIntro ? defaultSiteConfig.hero.intro : hero.intro,
  };
}

function migrateServiceDetails(savedDetails: Record<string, string> | undefined) {
  const details = { ...defaultSiteConfig.serviceDetails, ...savedDetails };
  return Object.fromEntries(Object.entries(details).map(([key, value]) => [key, value.replace(/(?:100|300)\s*(?:K|mil)\+?/i, "114K")]));
}

export function getSiteConfig(): SiteConfig {
  if (typeof window === "undefined") return defaultSiteConfig;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultSiteConfig;
    const parsed = JSON.parse(saved) as Partial<SiteConfig>;
    const hero = migrateHero(parsed.hero);
    const normalizedEyebrow = hero.eyebrow.replace(/\s*[·•]\s*/g, " ● ").replace(/^\s*●\s*/, "");
    return {
      ...defaultSiteConfig,
      ...parsed,
      brand: { ...defaultSiteConfig.brand, ...parsed.brand },
      hero: { ...hero, eyebrow: normalizedEyebrow },
      coordinationFeature: { ...defaultSiteConfig.coordinationFeature, ...parsed.coordinationFeature },
      projects: migrateProjects(parsed.projects),
      services: parsed.services ?? defaultSiteConfig.services,
      serviceDetails: migrateServiceDetails(parsed.serviceDetails),
    };
  } catch {
    return defaultSiteConfig;
  }
}

export function saveSiteConfig(config: SiteConfig) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY, newValue: JSON.stringify(config) }));
}

export function resetSiteConfig() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY, newValue: null }));
}

export { STORAGE_KEY };
