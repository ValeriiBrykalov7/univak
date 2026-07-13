import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const spritePath = path.join(projectRoot, "public", "icons.svg");
const outputDir = path.join(projectRoot, "public", "email-assets");

const colors = {
  green: "#2f6b3f",
  orange: "#f47c20",
};

const assets = [
  {
    filename: "univak-logo.png",
    symbolId: "logo",
    size: 512,
    scale: 0.9,
  },
  {
    filename: "telegram.png",
    symbolId: "icon-telegram",
    size: 256,
    color: colors.green,
    scale: 0.96,
  },
  {
    filename: "whatsapp.png",
    symbolId: "icon-whatsapp",
    size: 256,
    color: colors.green,
    scale: 0.99,
    viewBoxPadding: 0.85,
  },
  {
    filename: "phone.png",
    symbolId: "icon-phone",
    size: 256,
    color: colors.orange,
    scale: 0.98,
  },
  {
    filename: "email.png",
    symbolId: "icon-mail",
    size: 256,
    color: colors.orange,
    scale: 0.98,
  },
  {
    filename: "website.png",
    size: 256,
    color: colors.green,
    scale: 0.94,
    svg: createWebsiteSvg(colors.green),
  },
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function inflateViewBox(viewBox, padding = 0) {
  if (!padding) {
    return viewBox;
  }

  const values = viewBox.split(/\s+/).map(Number);

  if (values.length !== 4 || values.some((value) => Number.isNaN(value))) {
    throw new Error(`Cannot inflate invalid viewBox "${viewBox}".`);
  }

  const [x, y, width, height] = values;

  return [
    x - padding,
    y - padding,
    width + padding * 2,
    height + padding * 2,
  ].join(" ");
}

function extractSymbolSvg(sprite, symbolId, { viewBoxPadding = 0 } = {}) {
  const symbolPattern = new RegExp(
    `<symbol\\b(?=[^>]*\\bid=["']${escapeRegExp(symbolId)}["'])[^>]*>[\\s\\S]*?<\\/symbol>`,
    "m",
  );
  const symbolMatch = sprite.match(symbolPattern);

  if (!symbolMatch) {
    throw new Error(`Symbol "${symbolId}" was not found in ${spritePath}.`);
  }

  const symbol = symbolMatch[0];
  const openingTag = symbol.match(/<symbol\b([^>]*)>/)?.[1] ?? "";
  const viewBox = openingTag.match(/\bviewBox=["']([^"']+)["']/)?.[1];

  if (!viewBox) {
    throw new Error(`Symbol "${symbolId}" does not have a viewBox.`);
  }

  const content = symbol
    .replace(/^<symbol\b[^>]*>/, "")
    .replace(/<\/symbol>$/, "");

  return createStandaloneSvg({
    viewBox: inflateViewBox(viewBox, viewBoxPadding),
    content,
  });
}

function createStandaloneSvg({ viewBox, content, color }) {
  const colorAttribute = color ? ` color="${color}"` : "";

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"${colorAttribute}>`,
    content,
    "</svg>",
  ].join("");
}

function createWebsiteSvg(color) {
  return createStandaloneSvg({
    viewBox: "0 0 24 24",
    color,
    content: `
      <path d="M12 22.2a10.2 10.2 0 1 0 0-20.4 10.2 10.2 0 0 0 0 20.4Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2.4 12h19.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M12 1.8c2.5 2.6 3.9 6.1 3.9 10.2S14.5 19.6 12 22.2C9.5 19.6 8.1 16.1 8.1 12S9.5 4.4 12 1.8Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    `,
  });
}

function resolveCssVars(svg) {
  return svg.replace(/var\(\s*--[^,\s)]+\s*,\s*([^)]+?)\s*\)/g, "$1");
}

function normalizeSvg(svg, color) {
  return resolveCssVars(svg)
    .replaceAll("currentColor", color ?? colors.green)
    .replace(/\s{2,}/g, " ")
    .replace(/>\s+</g, "><")
    .trim();
}

async function renderPng({ svg, filename, size, scale, color }) {
  const normalizedSvg = normalizeSvg(svg, color);
  const innerSize = Math.round(size * scale);
  const paddingTotal = size - innerSize;
  const left = Math.floor(paddingTotal / 2);
  const right = paddingTotal - left;
  const top = Math.floor(paddingTotal / 2);
  const bottom = paddingTotal - top;
  const outputPath = path.join(outputDir, filename);

  const png = await sharp(Buffer.from(normalizedSvg))
    .resize({
      width: innerSize,
      height: innerSize,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .extend({
      top,
      right,
      bottom,
      left,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await writeFile(outputPath, png);

  return outputPath;
}

async function main() {
  const sprite = await readFile(spritePath, "utf8");

  await mkdir(outputDir, { recursive: true });

  const createdFiles = [];

  for (const asset of assets) {
    const svg =
      asset.svg ??
      extractSymbolSvg(sprite, asset.symbolId, {
        viewBoxPadding: asset.viewBoxPadding,
      });
    const outputPath = await renderPng({ ...asset, svg });
    createdFiles.push(path.relative(projectRoot, outputPath));
  }

  console.log("Created email assets:");

  for (const file of createdFiles) {
    console.log(`- ${file}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
