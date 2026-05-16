#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');
const SRC_POSTS = join(REPO_ROOT, '_posts');
const OUT_DIR = join(__dirname, '..', 'src', 'content', 'blog');

function slugFromFilename(filename) {
  // Strip date prefix and extension. Keep the rest verbatim — Jekyll
  // preserves underscores; we want byte-identical URLs.
  // Trailing dashes/underscores are dropped to match Jekyll's URL
  // (e.g. "scrum-testing-plan-" → "scrum-testing-plan").
  const stem = filename.replace(/\.markdown$|\.md$/, '');
  const withoutDate = stem.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  return withoutDate.replace(/-+$/, '').toLowerCase();
}

function dateFromFilename(filename) {
  const m = filename.match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : null;
}

function parseDate(raw, fallback) {
  if (raw instanceof Date && !isNaN(raw.valueOf())) return raw.toISOString();
  if (typeof raw === 'string') {
    const cleaned = raw.replace(/\s+([+-]\d{2}:?\d{2})$/, '$1');
    const d = new Date(cleaned);
    if (!isNaN(d.valueOf())) return d.toISOString();
  }
  return new Date(fallback + 'T12:00:00Z').toISOString();
}

function convertLiquid(body) {
  let out = body;
  out = out.replace(/\{%\s*include\s+figure\s+([^%]+?)\s*%\}/g, (_, attrs) => {
    const path = (attrs.match(/image_path="([^"]*)"/) || [])[1] || '';
    const alt = (attrs.match(/alt="([^"]*)"/) || [])[1] || '';
    const caption = (attrs.match(/caption="([^"]*)"/) || [])[1] || '';
    const normalized = path.startsWith('http') || path.startsWith('/') ? path : '/' + path;
    const img = `![${alt}](${normalized})`;
    return caption ? `${img}\n*${caption}*` : img;
  });
  out = out.replace(/\{%\s*include\s+video\s+([^%]+?)\s*%\}/g, (_, attrs) => {
    const id = (attrs.match(/id="([^"]*)"/) || [])[1] || '';
    return `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
  });
  return out;
}

function rawCategories(fmCats) {
  // Preserve categories EXACTLY as Jekyll saw them (including date strings).
  // These reconstruct the original Jekyll URL: /:category1/:category2/:slug/
  if (!fmCats) return [];
  const arr = Array.isArray(fmCats) ? fmCats : [fmCats];
  return arr.map((c) => String(c).trim()).filter(Boolean);
}

function displayCategories(rawCats) {
  // The categories shown on the post page should not include date-string
  // pseudo-categories that exist only to disambiguate URLs.
  return rawCats.filter((c) => !/^\d{4}-\d{2}-\d{2}$/.test(c));
}

function buildUrlPath(rawCats, slug) {
  // Jekyll's permalink: /:categories/:title/
  // With no categories, becomes /:title/. Always trailing-slashed.
  const segments = rawCats.map((c) => c.toLowerCase()).filter(Boolean);
  segments.push(slug);
  return '/' + segments.join('/') + '/';
}

function normalizeFrontmatter(fm, fallbackDate) {
  const out = {};
  out.title = fm.title || 'Untitled';
  out.date = parseDate(fm.date, fallbackDate);
  if (fm.excerpt) out.excerpt = fm.excerpt;

  const raw = rawCategories(fm.categories);
  out.urlPath = buildUrlPath(raw, ''); // tail filled in by caller w/ slug
  out.rawCategories = raw;
  out.categories = displayCategories(raw);

  const tags = Array.isArray(fm.tags) ? fm.tags : fm.tags ? [fm.tags] : [];
  out.tags = tags.map((t) => String(t).trim()).filter(Boolean);

  if (fm.teaser) out.cover = fm.teaser;
  return out;
}

function toYaml(obj) {
  const lines = ['---'];
  for (const [key, val] of Object.entries(obj)) {
    if (val === undefined || val === null) continue;
    if (Array.isArray(val)) {
      if (val.length === 0) {
        lines.push(`${key}: []`);
      } else {
        lines.push(`${key}:`);
        for (const item of val) lines.push(`  - ${JSON.stringify(item)}`);
      }
    } else if (typeof val === 'string') {
      lines.push(`${key}: ${JSON.stringify(val)}`);
    } else {
      lines.push(`${key}: ${val}`);
    }
  }
  lines.push('---', '');
  return lines.join('\n');
}

function makeUniqueSlug(base, seen) {
  if (!seen.has(base)) {
    seen.set(base, 1);
    return base;
  }
  // Slug collisions (different categories, same filename slug) are
  // disambiguated with a -2, -3 suffix. The original URL is preserved
  // via the urlPath frontmatter field; only the file on disk is renamed.
  let n = 2;
  while (seen.has(`${base}-${n}`)) n++;
  seen.set(`${base}-${n}`, 1);
  return `${base}-${n}`;
}

function main() {
  if (existsSync(OUT_DIR)) rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });

  const files = readdirSync(SRC_POSTS).filter(
    (f) => f.endsWith('.markdown') || f.endsWith('.md'),
  );

  const seen = new Map();
  let written = 0;

  for (const file of files) {
    const raw = readFileSync(join(SRC_POSTS, file), 'utf8');
    const parsed = matter(raw);
    const fileSlug = slugFromFilename(file);
    const fm = normalizeFrontmatter(parsed.data, dateFromFilename(file));

    fm.urlPath = buildUrlPath(fm.rawCategories, fileSlug);
    delete fm.rawCategories;

    const fileBaseSlug = makeUniqueSlug(fileSlug, seen);
    const body = convertLiquid(parsed.content).trimStart();
    writeFileSync(join(OUT_DIR, `${fileBaseSlug}.md`), toYaml(fm) + body + '\n');
    written++;
  }

  console.log(`Migrated ${written} posts to ${OUT_DIR}`);
}

main();
