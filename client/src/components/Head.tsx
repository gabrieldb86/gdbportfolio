import { useEffect } from "react";
import { useLocation } from "wouter";
import { getPortfolioRouteMeta, PORTFOLIO_ORIGIN } from "@shared/portfolioSeo";
import { setPageMetadata } from "@/lib/seo";

export function Head() {
  const [location] = useLocation();

  useEffect(() => {
    const metadata = getPortfolioRouteMeta(location);
    const image = metadata.ogImage ? `${PORTFOLIO_ORIGIN}${metadata.ogImage}` : undefined;
    setPageMetadata({
      title: metadata.title,
      description: metadata.description,
      path: metadata.canonicalPath ?? location,
      image,
      robots: metadata.noindex ? "noindex, follow" : "index, follow",
    });
  }, [location]);

  return null;
}
