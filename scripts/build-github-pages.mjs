import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const execFileAsync = promisify(execFile);
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "github-pages");
const assetOrigin = process.env.PORTFOLIO_ASSET_ORIGIN ?? "https://gabrielpor-7t6ygmlv.manus.space";
const sourceRoots = ["client", "shared"];

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectSourceFiles(entryPath);
    return entry.isFile() && /\.(?:ts|tsx|css|html)$/.test(entry.name) ? [entryPath] : [];
  }));
  return files.flat();
}

async function copyPortfolioAssets() {
  const sourceFiles = (await Promise.all(sourceRoots.map((root) => collectSourceFiles(path.join(projectRoot, root))))).flat();
  const assetPaths = new Set();

  for (const sourceFile of sourceFiles) {
    const source = await readFile(sourceFile, "utf8");
    for (const match of source.matchAll(/\/manus-storage\/[A-Za-z0-9._-]+/g)) assetPaths.add(match[0]);
  }

  for (const assetPath of [...assetPaths].sort()) {
    const response = await fetch(`${assetOrigin}${assetPath}`);
    if (!response.ok) throw new Error(`Não foi possível obter o ativo ${assetPath} (${response.status}).`);
    const destination = path.join(outputDir, assetPath);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, Buffer.from(await response.arrayBuffer()));
  }
}

async function finalizeStaticFiles() {
  const indexPath = path.join(outputDir, "index.html");
  const index = await readFile(indexPath, "utf8");
  const withoutPrivateAnalytics = index.replace(/\s*<script defer src="[^\"]*umami" data-website-id="[^\"]*"><\/script>/, "");
  await writeFile(indexPath, withoutPrivateAnalytics);
  await writeFile(path.join(outputDir, "404.html"), withoutPrivateAnalytics);
  await writeFile(path.join(outputDir, ".nojekyll"), "");

  const manifestPath = path.join(outputDir, "site.webmanifest");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  manifest.start_url = "./";
  manifest.icons = manifest.icons.map((icon) => ({
    ...icon,
    src: `./${icon.src.replace(/^\//, "").split("?")[0]}`,
  }));
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  const sitemapPath = path.join(outputDir, "sitemap.xml");
  const sitemap = await readFile(sitemapPath, "utf8");
  await writeFile(sitemapPath, sitemap.replaceAll(assetOrigin, "https://gabrieldb86.github.io/gdbportfolio"));
}

await rm(outputDir, { recursive: true, force: true });
await execFileAsync("pnpm", ["exec", "vite", "build", "--outDir", "../github-pages"], {
  cwd: projectRoot,
  env: { ...process.env, GITHUB_PAGES: "true" },
});
await copyPortfolioAssets();
await finalizeStaticFiles();
