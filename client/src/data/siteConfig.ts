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

export type SiteConfig = {
  profilePhoto: string;
  heroImage: string;
  railImage: string;
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
    intro: string;
  };
  projects: ProjectConfig[];
  services: ServiceConfig[];
  serviceDetails: Record<string, string>;
};

export const defaultSiteConfig: SiteConfig = {
  profilePhoto: "/manus-storage/gabriel-profile_69235fc9.jpg",
  heroImage: "/manus-storage/gabriel-bonecaps-project_cac714ba.png",
  railImage: "/manus-storage/gabriel-sidebar-portrait_dae7ef67.jpg",
  generatedAssets: {
    hero: "/manus-storage/gdb-editorial-reference_55640f8a.png",
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
    eyebrow: "Conteúdo · Design · Materiais",
    headline: "Ideias que saem do briefing e encontram forma.",
    intro: "Sou Gabriel, um criador multidisciplinar que transforma estratégia, conteúdo e design em materiais com clareza e presença.",
  },
  projects: [
    {
      number: "01",
      title: "Podcast Varejo na Real",
      type: "Conteúdo · Identidade editorial",
      year: "2024",
      image: "https://mir-s3-cdn-cf.behance.net/projects/404/ff75d9229319463.Y3JvcCwxMzgwLDEwODAsMjcwLDA.jpg",
      href: "https://www.behance.net/gallery/229319463/Podcast-Varejo-na-Real-EP04",
      size: "project-wide",
      aspectRatio: "1.74",
      objectPosition: "center",
      visible: true,
    },
    {
      number: "02",
      title: "Ragtech Dicas",
      type: "Conteúdo · Social · Direção visual",
      year: "2024",
      image: "https://mir-s3-cdn-cf.behance.net/projects/404/821789229318749.Y3JvcCwxMzc0LDEwNzQsMCwyOTk.png",
      href: "https://www.behance.net/gallery/229318749/Ragtech-Dicas-01-O-que-um-nobreak",
      size: "project-tall",
      aspectRatio: ".87",
      objectPosition: "center",
      visible: true,
    },
    {
      number: "03",
      title: "Future Print 2024",
      type: "Eventos · Materiais de marca",
      year: "2024",
      image: "https://mir-s3-cdn-cf.behance.net/projects/404/993e5a229318387.Y3JvcCw4MDgsNjMyLDAsMA.png",
      href: "https://www.behance.net/gallery/229318387/Future-Print-2024-Feira-Ragtech-com-Roland-e-Epson",
      size: "project-card",
      aspectRatio: "1.26",
      objectPosition: "center",
      visible: true,
    },
    {
      number: "04",
      title: "Eletrolar Show 2024",
      type: "Eventos · Experiência de marca",
      year: "2024",
      image: "https://mir-s3-cdn-cf.behance.net/projects/404/e836a2229253681.Y3JvcCw4MDgsNjMyLDAsMA.png",
      href: "https://www.behance.net/gallery/229253681/Eletrolar-Show-2024-Feira-com-Redragon-e-Ragtech",
      size: "project-card",
      aspectRatio: "1.26",
      objectPosition: "center",
      visible: true,
    },
    {
      number: "05",
      title: "Blocs Presentation",
      type: "Apresentação · Sistema visual",
      year: "2023",
      image: "https://mir-s3-cdn-cf.behance.net/projects/404/98dc70229252859.Y3JvcCw4MDgsNjMyLDAsMA.png",
      href: "https://www.behance.net/gallery/229252859/Blocs-Presentation",
      size: "project-card",
      aspectRatio: "1.26",
      objectPosition: "center",
      visible: true,
    },
    {
      number: "06",
      title: "Valens BDN",
      type: "Identidade · Uniformes alternativos",
      year: "2022",
      image: "https://mir-s3-cdn-cf.behance.net/projects/404/7a7b9f200631919.Y3JvcCwxMzk5LDEwOTUsMCww.jpg",
      href: "https://www.behance.net/gallery/200631919/Uniformes-Alternativos-Valens-BDN",
      size: "project-tall",
      aspectRatio: ".87",
      objectPosition: "center",
      visible: true,
    },
  ],
  services: [
    ["01", "Estratégia de conteúdo", "Do briefing ao plano de conteúdo com pauta, intenção e formato."],
    ["02", "Design para comunicação", "Peças que organizam uma mensagem e fazem a marca ser lembrada."],
    ["03", "Apresentações & materiais", "Decks, eventos e materiais comerciais com clareza e presença."],
  ],
  serviceDetails: {
    "01": "Leio o problema, organizo a mensagem e construo uma linha de conteúdo com pauta, intenção, formato e critério de sucesso. O objetivo é transformar informação solta em comunicação que orienta uma ação.",
    "02": "Crio sistemas visuais e peças que tornam a mensagem mais clara, consistente e reconhecível — do post à campanha, do material interno ao ponto de contato com o consumidor.",
    "03": "Estruturo apresentações, materiais de treinamento, eventos e decks comerciais para que cada página tenha uma função, um ritmo e uma história fácil de acompanhar.",
  },
};

const STORAGE_KEY = "gabriel-portfolio-config";

export function getSiteConfig(): SiteConfig {
  if (typeof window === "undefined") return defaultSiteConfig;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultSiteConfig;
    const parsed = JSON.parse(saved) as Partial<SiteConfig>;
    return {
      ...defaultSiteConfig,
      ...parsed,
      brand: { ...defaultSiteConfig.brand, ...parsed.brand },
      hero: { ...defaultSiteConfig.hero, ...parsed.hero },
      projects: parsed.projects ?? defaultSiteConfig.projects,
      services: parsed.services ?? defaultSiteConfig.services,
      serviceDetails: parsed.serviceDetails ?? defaultSiteConfig.serviceDetails,
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
