import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { DEFAULT_OG_IMAGE, PORTFOLIO_ORIGIN, PORTFOLIO_SITE_NAME, type PortfolioRouteMeta } from "../../shared/portfolioSeo";

const CANONICAL_ORIGIN = (process.env.CANONICAL_ORIGIN || PORTFOLIO_ORIGIN).replace(/\/+$/, "");
const SITE_NAME = process.env.SITE_NAME || PORTFOLIO_SITE_NAME;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function absoluteUrl(value: string): string {
  if (/^https?:\/\//i.test(value)) return value;
  return `${CANONICAL_ORIGIN}${value.startsWith("/") ? value : `/${value}`}`;
}

function buildHeadTags(head: PortfolioRouteMeta): string {
  const title = escapeHtml(head.title);
  const description = escapeHtml(head.description);
  const canonical = head.canonicalPath ? absoluteUrl(head.canonicalPath) : "";
  const image = absoluteUrl(head.ogImage ?? DEFAULT_OG_IMAGE);
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${head.noindex || head.notFound ? "noindex, follow" : "index, follow"}" />`,
    `<meta property="og:type" content="${head.ogType ?? "website"}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
  ];
  if (canonical) {
    tags.push(`<meta property="og:url" content="${escapeHtml(canonical)}" />`);
    tags.push(`<link rel="canonical" href="${escapeHtml(canonical)}" />`);
  }
  return tags.join("\n");
}

function composeHtml(template: string, appHtml: string, head: PortfolioRouteMeta, dehydratedState: unknown): string {
  const serializedState = JSON.stringify(dehydratedState).replace(/</g, "\\u003c");
  const stateScript = `<script>window.__RQ_STATE__ = ${serializedState}</script>`;
  return template
    .replace("</body>", () => `${stateScript}</body>`)
    .replace("<!--app-head-->", () => buildHeadTags(head))
    .replace("<!--app-html-->", () => appHtml);
}

function fallbackHead(): PortfolioRouteMeta {
  return {
    title: "Gabriel Danino Basilio — Coordenação de Conteúdo, Treinamento e Trade Marketing",
    description: "Portfólio profissional de Gabriel Danino Basilio.",
    canonicalPath: "/",
    ogImage: DEFAULT_OG_IMAGE,
  };
}

export async function setupVite(app: Express, server: Server) {
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: { middlewareMode: true, hmr: { server }, allowedHosts: true },
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    try {
      const clientTemplate = path.resolve(import.meta.dirname, "../..", "client", "index.html");
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(`src="/src/entry-client.tsx"`, `src="/src/entry-client.tsx?v=${nanoid()}"`);
      template = await vite.transformIndexHtml(req.originalUrl, template);
      template = template.replace("</head>", `<link rel="stylesheet" href="/src/index.css?direct" data-ssr-dev-css></head>`);
      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
      const { html, dehydratedState, head } = await render(req.originalUrl);
      res.status(head.notFound ? 404 : 200).set("Cache-Control", "no-cache").type("html").end(composeHtml(template, html, head, dehydratedState));
    } catch (error) {
      vite.ssrFixStacktrace(error as Error);
      console.error("[SSR] dev render failed:", error);
      next(error);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) console.error("Could not find the build directory:", distPath);

  app.use((req, res, next) => {
    if (req.path === "/index.html") return res.redirect(301, "/");
    if (req.path !== "/" && /\/+$/ .test(req.path)) {
      const query = req.originalUrl.slice(req.path.length);
      const target = (req.path.replace(/\/+$/, "") || "/").replace(/^\/\/+/, "/");
      return res.redirect(301, `${target}${query}`);
    }
    next();
  });
  app.use(express.static(distPath, { index: false, redirect: false }));

  app.use("*", async (req, res) => {
    const templatePath = path.resolve(distPath, "index.html");
    try {
      const template = await fs.promises.readFile(templatePath, "utf-8");
      const serverEntryPath = path.resolve(import.meta.dirname, "server-ssr", "entry-server.js");
      const { render } = await import(serverEntryPath);
      const { html, dehydratedState, head } = await render(req.originalUrl);
      res.status(head.notFound ? 404 : 200).set("Cache-Control", "no-cache").type("html").end(composeHtml(template, html, head, dehydratedState));
    } catch (error) {
      console.error("[SSR] render failed, serving shell:", error);
      const template = await fs.promises.readFile(templatePath, "utf-8");
      res.status(200).set("Cache-Control", "no-cache").type("html").end(composeHtml(template, "", fallbackHead(), { mutations: [], queries: [] }));
    }
  });
}
