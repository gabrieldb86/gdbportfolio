export const PORTFOLIO_ORIGIN = "https://gabrielpor-7t6ygmlv.manus.space";
export const PORTFOLIO_SITE_NAME = "Gabriel Danino Basilio";
export const DEFAULT_OG_IMAGE = "/manus-storage/gabriel-profile_69235fc9.jpg";

export type PortfolioRouteMeta = {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  notFound?: boolean;
};

const publicRouteMeta: Record<string, PortfolioRouteMeta> = {
  "/": {
    title: "Gabriel Danino Basilio — Coordenação de Conteúdo, Treinamento e Trade Marketing",
    description: "Portfólio de Gabriel Danino Basilio, coordenador de Conteúdo, Treinamento, T&D, Trade Marketing e Performance de Campo.",
    canonicalPath: "/",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/cv": {
    title: "CV — Gabriel Danino Basilio",
    description: "Experiência profissional em Conteúdo, Treinamento, T&D, Trade Marketing, Instructional Design, KPIs e gestão de campo.",
    canonicalPath: "/cv",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/privacidade": {
    title: "Privacidade — Gabriel Danino Basilio",
    description: "Aviso de privacidade sobre dados enviados pelo formulário e uso dos canais de contato do portfólio.",
    canonicalPath: "/privacidade",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/cases/ragtech-sistema-treinamento": {
    title: "Ragtech — Sistema de Treinamento",
    description: "Case de implantação de calendário, conteúdo e operação de treinamento para varejo parceiro e trade marketing.",
    canonicalPath: "/cases/ragtech-sistema-treinamento",
    ogImage: "/manus-storage/ragtech-dicas_c4a3d253.png",
    ogType: "article",
  },
  "/cases/blocs-presentation": {
    title: "Blocs Presentation — Case em Atualização",
    description: "Página de atualização editorial do projeto Blocs Presentation, sem atribuição de material de terceiros.",
    canonicalPath: "/cases/blocs-presentation",
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "article",
  },
  "/cases/grupo-ems-cystex": {
    title: "Campanha Cystex — Gabriel Danino Basilio",
    description: "Case de campanha de incentivo, conteúdo, avaliação e indicadores para força de campo do Grupo EMS.",
    canonicalPath: "/cases/grupo-ems-cystex",
    ogImage: "/manus-storage/gabriel-bonecaps-project_cac714ba.png",
    ogType: "article",
  },
  "/cases/roadshow-dpsp": {
    title: "Roadshow DPSP — Gabriel Danino Basilio",
    description: "Case de facilitação e apresentação de novidades e lançamentos para o canal farmacêutico.",
    canonicalPath: "/cases/roadshow-dpsp",
    ogImage: "/manus-storage/valens-bdn_e5a00706.jpg",
    ogType: "article",
  },
  "/cases/today-at-apple": {
    title: "Today at Apple Brazil — Gabriel Danino Basilio",
    description: "Case de aprendizagem, facilitação, inclusão e liderança em experiências do Today at Apple no Brasil.",
    canonicalPath: "/cases/today-at-apple",
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "article",
  },
  "/cases/trilhas-aprendizagem": {
    title: "Trilhas de Aprendizagem — Gabriel Danino Basilio",
    description: "Case de Instructional Design, trilhas, microlearning, avaliação, facilitação e aprendizagem blended.",
    canonicalPath: "/cases/trilhas-aprendizagem",
    ogImage: "/manus-storage/valens-bdn_e5a00706.jpg",
    ogType: "article",
  },
};

const privateEditorMeta: PortfolioRouteMeta = {
  title: PORTFOLIO_SITE_NAME,
  description: "Área privada do portfólio.",
  noindex: true,
};

const notFoundMeta: PortfolioRouteMeta = {
  title: "Página não encontrada — Gabriel Danino Basilio",
  description: "A página solicitada não está disponível neste portfólio.",
  noindex: true,
  notFound: true,
};

function normalizePath(pathOrUrl: string): string {
  const path = pathOrUrl.split("?")[0] || "/";
  return path.replace(/\/+$/, "") || "/";
}

export function getPortfolioRouteMeta(pathOrUrl: string): PortfolioRouteMeta {
  const path = normalizePath(pathOrUrl);
  if (path === "/editor" || path.startsWith("/editor/")) return privateEditorMeta;
  return publicRouteMeta[path] ?? notFoundMeta;
}

export function isPublicPortfolioRoute(pathOrUrl: string): boolean {
  const metadata = getPortfolioRouteMeta(pathOrUrl);
  return !metadata.noindex && !metadata.notFound;
}
