#!/usr/bin/env node
// Compare each migrated Astro post against the rendered HTML on the live site.
//
// We iterate src/content/blog/ (the migrator's output, frozen on disk) and
// for each post:
//   1. Read its markdown body, normalize to a tokenized multiset.
//   2. Fetch the rendered HTML at <SITE_BASE><urlPath> using the urlPath
//      captured by the migrator.
//   3. Isolate <article>, normalize the same way.
//   4. Report words present in source but missing from rendered.
//
// This is a "did Astro's build lose any prose?" check. The earlier permalink
// equality script (verify-permalinks) already confirms the URL set is
// byte-identical to production, so URL-level drift is covered separately.

import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASTRO_BLOG_DIR = join(__dirname, '..', 'src', 'content', 'blog');
const SITE_BASE = process.env.SITE_BASE || 'https://thatsabug.pages.dev';

// Stopwords are content-bearing too in some cases, but for an equality check
// we want signal — drop them so a missing "the" doesn't flag a real post.
const STOPWORDS = new Set(
  ('a an and or but if then else when at in on for to of from by with as is are was '
   + 'were be been being have has had do does did this that these those it its '
   + 'i me my we our you your he she they them his her their will would should '
   + 'can could may might must not no nor so yet about into out over under up down '
   + 'than too very just also more most some any all each every other another such '
   + 'one two three four five six seven eight nine ten how what why where which who '
   + 'whom whose there here am s t d ll re ve m').split(/\s+/),
);

function normalizeBody(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ') // strip fenced code blocks (different rendering)
    .replace(/`[^`]*`/g, ' ')         // strip inline code
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    // Pull alt text out of <img> tags before stripping the tag itself.
    // Source-side markdown ![text](url) gets converted to <img alt="text" src="url">
    // and we want the alt words counted on both sides.
    .replace(/<img\b[^>]*?\balt\s*=\s*"([^"]*)"[^>]*>/gi, ' $1 ')
    // Same idea for markdown image syntax on the source side.
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, ' $1 ')
    // Strip markdown link syntax — keep visible link text, drop URL.
    // [text](url) → text
    .replace(/\[([^\]]*)\]\(([^)]+)\)/g, '$1')
    // Strip raw URLs (http/https) so only prose remains.
    // Stop at characters that legitimately end a URL in HTML attributes:
    // quote chars, angle brackets, whitespace. Otherwise we consume the
    // closing quote of an href attribute and break the next tag.
    .replace(/https?:\/\/[^\s"'<>]+/gi, ' ')
    // Strip <a href="..."> attributes' URL but keep inner text. Cheap version:
    // any href attribute payload to a space.
    .replace(/href\s*=\s*"[^"]*"/gi, ' ')
    .replace(/src\s*=\s*"[^"]*"/gi, ' ')
    .replace(/<[^>]+>/g, ' ')         // strip HTML tags
    .replace(/&[a-z]+;/g, ' ')
    .replace(/&#\d+;/g, ' ')
    .replace(/\{%[^%]*%\}/g, ' ')     // strip Liquid (already converted in src/content)
    .toLowerCase();
}

function tokenize(text) {
  const words = text.match(/[a-z0-9]+/g) || [];
  return words.filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

function multisetOf(tokens) {
  const m = new Map();
  for (const t of tokens) m.set(t, (m.get(t) || 0) + 1);
  return m;
}

function diffMultisets(source, rendered) {
  // Words in source but missing from rendered (or under-represented).
  const missing = new Map();
  for (const [word, count] of source) {
    const renderedCount = rendered.get(word) || 0;
    if (renderedCount < count) {
      missing.set(word, count - renderedCount);
    }
  }
  return missing;
}

async function fetchPost(urlPath) {
  const url = SITE_BASE + urlPath;
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

function isolateMainContent(html) {
  // The PostLayout puts the post inside <article ...> ... </article>.
  // Narrow to that to drop nav/footer/sidebar before the word comparison.
  const m = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  return m ? m[1] : html;
}

async function main() {
  const files = readdirSync(ASTRO_BLOG_DIR).filter((f) => f.endsWith('.md'));
  const results = [];

  console.log(`Comparing ${files.length} posts against ${SITE_BASE}...\n`);

  for (const file of files) {
    const raw = readFileSync(join(ASTRO_BLOG_DIR, file), 'utf8');
    const parsed = matter(raw);
    const urlPath = parsed.data.urlPath;
    if (!urlPath) {
      results.push({ file, status: 'NO_URLPATH' });
      continue;
    }

    const sourceTokens = tokenize(normalizeBody(parsed.content));

    let rendered;
    try {
      const html = await fetchPost(urlPath);
      const articleHtml = isolateMainContent(html);
      rendered = tokenize(normalizeBody(articleHtml));
    } catch (e) {
      results.push({ file, urlPath, status: 'FETCH_ERROR', error: e.message });
      continue;
    }

    const sourceMs = multisetOf(sourceTokens);
    const renderedMs = multisetOf(rendered);
    const missing = diffMultisets(sourceMs, renderedMs);

    const distinctMissing = missing.size;
    const totalMissing = [...missing.values()].reduce((a, b) => a + b, 0);
    // Threshold: under 3 missing distinct words = effectively identical.
    // (Normalization noise — hyphenation, smart quotes, etc.)
    const status = distinctMissing === 0 ? 'OK' : distinctMissing < 3 ? 'NEAR' : 'DIFF';

    results.push({
      file,
      urlPath,
      status,
      sourceWordCount: sourceTokens.length,
      renderedWordCount: rendered.length,
      distinctMissing,
      totalMissing,
      missingSample: [...missing.entries()].slice(0, 8),
    });
  }

  // Print
  const ok = results.filter((r) => r.status === 'OK').length;
  const near = results.filter((r) => r.status === 'NEAR').length;
  const diff = results.filter((r) => r.status === 'DIFF').length;
  const errors = results.filter((r) => r.status === 'FETCH_ERROR' || r.status === 'NO_ASTRO_MATCH').length;

  for (const r of results) {
    if (r.status === 'OK') {
      // Quiet for matches; just show counts inline.
      console.log(`✔ ${r.file.padEnd(60)} src=${r.sourceWordCount} dst=${r.renderedWordCount}`);
    } else if (r.status === 'NEAR') {
      console.log(`~ ${r.file.padEnd(60)} ${r.distinctMissing} distinct missing (${r.totalMissing} total) — ${r.missingSample.map(([w, c]) => `${w}×${c}`).join(', ')}`);
    } else if (r.status === 'DIFF') {
      console.log(`✘ ${r.file.padEnd(60)} ${r.distinctMissing} distinct missing (${r.totalMissing} total) — ${r.missingSample.map(([w, c]) => `${w}×${c}`).join(', ')}`);
    } else if (r.status === 'FETCH_ERROR') {
      console.log(`! ${r.file.padEnd(60)} fetch failed: ${r.error}`);
    } else {
      console.log(`! ${r.file.padEnd(60)} no Astro match`);
    }
  }

  console.log(`\nSummary: ${ok} OK, ${near} near-match, ${diff} drift, ${errors} errors. Total: ${results.length}.`);
  if (diff > 0 || errors > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
