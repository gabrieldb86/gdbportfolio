import { describe, expect, it } from "vitest";
import { getPortfolioRouteMeta } from "./portfolioSeo";

describe("public portfolio metadata", () => {
  it("returns route-specific, indexable metadata for every public page", () => {
    const routes = [
      "/",
      "/cv",
      "/privacidade",
      "/cases/ragtech-sistema-treinamento",
      "/cases/blocs-presentation",
      "/cases/grupo-ems-cystex",
      "/cases/roadshow-dpsp",
      "/cases/today-at-apple",
      "/cases/trilhas-aprendizagem",
    ];

    const titles = routes.map((route) => {
      const metadata = getPortfolioRouteMeta(route);
      expect(metadata.canonicalPath).toBe(route);
      expect(metadata.description).toBeTruthy();
      expect(metadata.noindex).not.toBe(true);
      expect(metadata.notFound).not.toBe(true);
      return metadata.title;
    });

    expect(new Set(titles).size).toBe(routes.length);
  });

  it("marks unknown paths and the private editor as non-indexable", () => {
    expect(getPortfolioRouteMeta("/cases/inexistente")).toMatchObject({ notFound: true, noindex: true });
    expect(getPortfolioRouteMeta("/editor")).toMatchObject({ noindex: true });
  });
});
