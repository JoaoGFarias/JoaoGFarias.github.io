#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');
const SRC_POSTS = join(REPO_ROOT, '_posts');
const OUT_DIR = join(__dirname, '..', 'src', 'content', 'blog');

const DATE_CATEGORY_RE = /^\d{4}-\d{2}-\d{2}$/;

function slugFromFilename(filename) {
  // 2018-06-18-the-heuristic_testing_strategy_model_mindmap_.markdown
  // -> the-heuristic-testing-strategy-model-mindmap
  const stem = filename.replace(/\.markdown$|\.md$/, '');
  const withoutDate = stem.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  return withoutDate
    .replace(/_/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function dateFromFilename(filename) {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : null;
}

function convertLiquid(body) {
  let out = body;

  // {% include figure image_path="..." alt="..." caption="..." %}
  out = out.replace(
    /\{%\s*include\s+figure\s+([^%]+?)\s*%\}/g,
    (_, attrs) => {
      const path = (attrs.match(/image_path="([^"]*)"/) || [])[1] || '';
      const alt = (attrs.match(/alt="([^"]*)"/) || [])[1] || '';
      const caption = (attrs.match(/caption="([^"]*)"/) || [])[1] || '';
      const normalized = path.startsWith('http') || path.startsWith('/')
        ? path
        : '/' + path;
      const img = `![${alt}](${normalized})`;
      return caption ? `${img}\n*${caption}*` : img;
    },
  );

  // {% include video id="..." provider="youtube" %}
  out = out.replace(
    /\{%\s*include\s+video\s+([^%]+?)\s*%\}/g,
    (_, attrs) => {
      const id = (attrs.match(/id="([^"]*)"/) || [])[1] || '';
      return `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
    },
  );

  return out;
}

function parseDate(raw, fallback) {
  if (raw instanceof Date && !isNaN(raw.valueOf())) return raw.toISOString();
  if (typeof raw === 'string') {
    // Jekyll allows "2018-06-18T20:15:00 -0300" — Date can't parse that space.
    const cleaned = raw.replace(/\s+([+-]\d{2}:?\d{2})$/, '$1');
    const d = new Date(cleaned);
    if (!isNaN(d.valueOf())) return d.toISOString();
  }
  return new Date(fallback + 'T12:00:00Z').toISOString();
}

function normalizeFrontmatter(fm, fallbackDate) {
  const out = {};
  out.title = fm.title || 'Untitled';
  out.date = parseDate(fm.date, fallbackDate);
  if (fm.excerpt) out.excerpt = fm.excerpt;

  const cats = Array.isArray(fm.categories)
    ? fm.categories
    : fm.categories
    ? [fm.categories]
    : [];
  out.categories = cats
    .map((c) => String(c).trim())
    .filter((c) => c && !DATE_CATEGORY_RE.test(c));

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

function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  const files = readdirSync(SRC_POSTS).filter(
    (f) => f.endsWith('.markdown') || f.endsWith('.md'),
  );

  let written = 0;
  const slugSeen = new Map();

  for (const file of files) {
    const raw = readFileSync(join(SRC_POSTS, file), 'utf8');
    const parsed = matter(raw);
    const fm = normalizeFrontmatter(parsed.data, dateFromFilename(file));
    let slug = slugFromFilename(file);

    // Disambiguate duplicate slugs (e.g. multiple "5_things" titled posts)
    if (slugSeen.has(slug)) {
      const date = dateFromFilename(file);
      slug = `${date}-${slug}`;
    }
    slugSeen.set(slug, true);

    const body = convertLiquid(parsed.content).trimStart();
    const outPath = join(OUT_DIR, `${slug}.md`);
    writeFileSync(outPath, toYaml(fm) + body + '\n');
    written++;
  }

  console.log(`Migrated ${written} posts to ${OUT_DIR}`);
}

main();
