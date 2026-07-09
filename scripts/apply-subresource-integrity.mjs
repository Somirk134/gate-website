import { createHash } from 'node:crypto';
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join, posix, relative, sep } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const indexPath = join(distDir, 'index.html');

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('base64');
}

function toWebPath(filePath) {
  return `/${relative(distDir, filePath).split(sep).join(posix.sep)}`;
}

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

const builtFiles = await collectFiles(distDir);
const assetIntegrity = {};
let html = await readFile(indexPath, 'utf8');

for (const filePath of builtFiles) {
  const webPath = toWebPath(filePath);

  if (!webPath.startsWith('/assets/') || !/\.(js|css)$/.test(webPath)) {
    continue;
  }

  const buffer = await readFile(filePath);
  const digest = sha256(buffer);
  assetIntegrity[webPath] = `sha256-${digest}`;
}

for (const [webPath, integrity] of Object.entries(assetIntegrity)) {
  const escapedPath = webPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const tagPattern = new RegExp(`<(script|link)([^>]+(?:src|href)=["']${escapedPath}["'][^>]*)>`, 'g');

  html = html.replace(tagPattern, (tag, tagName, attrs) => {
    if (/\sintegrity=/.test(attrs)) {
      return tag;
    }

    // 在构建产物中写入 SRI，浏览器会拒绝被篡改的同源 JS/CSS。
    const crossorigin = /\scrossorigin(?:=|\s|>)/.test(attrs) ? '' : ' crossorigin';
    return `<${tagName}${attrs} integrity="${integrity}"${crossorigin}>`;
  });
}

await writeFile(indexPath, html, 'utf8');

const finalFiles = await collectFiles(distDir);
const manifest = {};

for (const filePath of finalFiles) {
  const webPath = toWebPath(filePath);

  if (webPath === '/integrity-manifest.json') {
    continue;
  }

  const fileStat = await stat(filePath);
  const buffer = await readFile(filePath);
  const digest = sha256(buffer);

  manifest[webPath] = {
    bytes: fileStat.size,
    sha256: digest,
    sri: `sha256-${digest}`,
  };
}

await writeFile(
  join(distDir, 'integrity-manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
  'utf8',
);
