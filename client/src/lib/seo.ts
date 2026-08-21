// SEO editorial — metadados por rota para pessoas e mecanismos de busca, sem alterar o layout visual.

const SITE_URL = "https://gabrielpor-7t6ygmlv.manus.space";
const DEFAULT_OG_IMAGE = `${SITE_URL}/manus-storage/gabriel-open-graph-preview_2ecf2c14.jpg`;

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = href;
}

export function setPageMetadata({
  title,
  description,
  path = "/",
  robots = "index, follow",
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  path?: string;
  robots?: string;
  image?: string;
}) {
  const url = `${SITE_URL}${path}`;
  document.title = title;
  upsertMeta("name", "description", description);
  upsertMeta("name", "robots", robots);
  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:image", image);
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", image);
  upsertCanonical(url);
}

export { SITE_URL };
