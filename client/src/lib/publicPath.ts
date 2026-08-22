export function portfolioPath(path = "/"): string {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const suffix = path.replace(/^\//, "");

  return suffix ? `${base}${suffix}` : base;
}
