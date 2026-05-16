# That's a Bug — repo guide for Claude

This repo serves **thatsabug.com** (custom domain, currently via GitHub Pages on `master`).

There are two coexisting trees on `master` vs. `prototype/astro-migration`:

| Branch | What's there | Status |
|---|---|---|
| `master` | Jekyll + Minimal Mistakes (the live site) | Production. Touch only for hotfixes. |
| `prototype/astro-migration` | New Astro 5 + Tailwind site under `prototype/` | Cutover candidate. Deployed to Cloudflare Pages preview. |

The Astro prototype is feature-complete and matches production permalinks byte-for-byte. The cutover (DNS switch from GitHub Pages → Cloudflare Pages) is the only remaining step. See `prototype/RECIPES.md` for cutover commands.

## Don't do these without asking

- **Don't merge `prototype/astro-migration` into `master`** until DNS is ready to switch. Merging early risks GitHub Pages serving the new tree from the wrong directory.
- **Don't `rm` the Jekyll tree** (`_posts/`, `_pages/`, `_layouts/`, `_config.yml`, etc.) — those stay until cutover is verified, then archived.
- **Don't push to `master`** unless explicitly asked. The live site is served from there.

## Working on the prototype

```bash
cd prototype
ASTRO_TELEMETRY_DISABLED=1 npm install
ASTRO_TELEMETRY_DISABLED=1 npm run dev      # http://localhost:4321
ASTRO_TELEMETRY_DISABLED=1 npm run build    # static output in dist/
```

`ASTRO_TELEMETRY_DISABLED=1` is required only inside the Claude Code sandbox (telemetry tries to write outside the writable allowlist). On a normal shell it's optional.

## Re-running the Jekyll → Astro migration

If the source posts in `_posts/` are edited and the Astro tree needs to catch up:

```bash
cd prototype && npm run migrate
```

This re-reads all `_posts/*.markdown`, normalizes frontmatter, converts Liquid `{% include figure %}` and `{% include video %}` into markdown/iframe, and rewrites `src/content/blog/`. Idempotent — safe to run repeatedly.

## Permalink contract

Production URLs at thatsabug.com use the Jekyll permalink scheme `/:categories/:title/`, with categories preserved verbatim including date pseudo-categories (`/blog/2018-08-28/5_links_refactoring/`). The migrator captures each post's full original URL into the `urlPath` frontmatter field, and routing reads from there via `src/pages/[...path].astro`.

**Verified equality** (2026-05-16): every URL in `https://thatsabug.com/sitemap.xml` is reproduced byte-identically by the prototype build. See `prototype/scripts/live-urls.txt` for the snapshot.

## Useful files to know

| Path | Why |
|---|---|
| `prototype/CLAUDE.md` | Astro-specific guidance |
| `prototype/RECIPES.md` | Cutover commands, redeploys, rollback |
| `prototype/scripts/migrate-posts.mjs` | Jekyll→Astro converter |
| `prototype/scripts/live-urls.txt` | Snapshot of production URLs (for permalink verification) |
| `prototype/src/site.config.ts` | Site metadata, social links, Giscus IDs |
| `prototype/public/_redirects` | Cloudflare Pages redirect rules |

## Conventions

- Markdown post bodies on the prototype side live at `prototype/src/content/blog/<slug>.md`. The slug is derived from the source filename and disambiguated when needed; the production URL is preserved in `urlPath` regardless.
- Portfolio entries (technical artifacts) live at `prototype/src/content/portfolio/`. Career entries (roles) live at `prototype/src/content/career/`. Both share the same Zod schema.
- Astro components are in `prototype/src/components/`, layouts in `prototype/src/layouts/`, page routes in `prototype/src/pages/`.
- Tailwind for styling. The `prose` plugin handles long-form post body styling — don't reinvent typography in custom CSS.
