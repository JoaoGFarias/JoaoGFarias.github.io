# That's a Bug — Astro prototype

Astro 5 + Tailwind 3 + MDX. Static-site target, deployed to Cloudflare Pages.

For repo-wide guidance (relationship with the Jekyll tree on `master`, what not to touch), see the root `CLAUDE.md`.

## Run

Use the `justfile` — `just` (no args) lists every recipe.

```
just setup             # first time: Node check, install, migrate, build
just up                # everyday: setup-if-needed, then dev server (localhost:4321)
just build             # dist/
just preview           # serve dist/
just migrate           # re-run Jekyll → Astro converter
just verify-permalinks # diff build URLs against snapshot of production
```

## Deploy

Cloudflare Pages, project name `thatsabug`. Account ID is in the justfile.

```
just deploy-preview <branch-name>     # preview build, alias URL
just deploy-prod                      # prompts before pushing to production
just smoke-prod                       # smoke-test production after DNS cutover
just smoke-preview                    # same against the preview alias
```

See `RECIPES.md` for the full cutover procedure (DNS, rollback, gotchas).

## Architecture

```
src/
├── site.config.ts             # site metadata, social, giscus IDs (one source of truth)
├── content/
│   ├── config.ts              # Zod schemas for blog + portfolio + career
│   ├── blog/                  # 66 migrated posts
│   ├── portfolio/             # technical artifacts (currently 1 entry)
│   └── career/                # roles (4 entries)
├── layouts/
│   ├── BaseLayout.astro       # shell: head, nav, footer, dark-mode bootstrap
│   └── PostLayout.astro       # post page chrome — author bio, tags, Giscus
├── components/
│   ├── Nav.astro
│   ├── Footer.astro
│   ├── PostCard.astro         # post listing item
│   ├── AuthorBio.astro        # the bio block on every post
│   ├── FormattedDate.astro
│   └── Giscus.astro           # comments — reads IDs from site.config
└── pages/
    ├── index.astro            # home (latest 8 posts)
    ├── [...path].astro        # catchall for /blog/...slug/ — routes via post.data.urlPath
    ├── posts.astro            # full archive grouped by year
    ├── about.astro
    ├── social.astro           # legacy /social/ from Jekyll sitemap
    ├── 404.astro
    ├── rss.xml.ts             # /rss.xml
    ├── categories/[category].astro
    ├── tags/[tag].astro
    ├── portfolio/index.astro
    ├── portfolio/[slug].astro
    ├── career/index.astro
    └── career/[slug].astro
public/
├── CNAME                      # thatsabug.com (preserved from Jekyll)
├── _redirects                 # CF Pages redirects (legacy /page2/, /wip/...)
└── assets/                    # copied verbatim from ../assets/ — referenced by /assets/... in post bodies
scripts/
├── migrate-posts.mjs          # Jekyll → Astro one-shot converter (idempotent)
└── live-urls.txt              # snapshot of production URLs for permalink-equality check
```

## Key constraints

### Permalinks must stay byte-identical to production

Every `_posts/*.markdown` source carries categories that, with the slug, reconstruct the exact Jekyll URL. The migrator records this in the `urlPath` frontmatter field; `[...path].astro` routes from `urlPath`, not from the file slug. **Don't link to posts as `/blog/${post.slug}/`** — always use `post.data.urlPath`.

### `urlPath` is required on every blog post

The Zod schema in `src/content/config.ts` enforces this. Adding a new post manually means adding `urlPath: "/blog/<slug>/"` to its frontmatter. Or just add it to `_posts/` and run `npm run migrate`.

### Don't normalize slugs

Production URLs use underscores (`/blog/testing_ember_application_first_steps/`). The migrator preserves them verbatim. "Modernizing" them to hyphens would break SEO and inbound links.

## Adding content

**A new post**: add to `_posts/<YYYY-MM-DD>-<slug>.markdown` with Jekyll frontmatter, then `npm run migrate`. This keeps both trees in sync until the Jekyll tree is retired.

After cutover, drop the Jekyll round-trip and create posts directly at `src/content/blog/<slug>.md` — but include the `urlPath` field manually.

**A portfolio entry**: drop a `.md` into `src/content/portfolio/`, frontmatter must match the schema in `src/content/config.ts`. `order: 0` is top-of-list.

**A career entry**: same shape, in `src/content/career/`.

## Giscus

Wired in `src/site.config.ts`. Real IDs are committed for the `JoaoGFarias/JoaoGFarias.github.io` repo, General category. **Comments don't load on localhost** — Giscus checks origin against the configured domain. Always test on the deployed Pages preview.

## Dark mode

Class-based, bootstrapped inline in `BaseLayout.astro` (reads `localStorage['theme']` then falls back to `prefers-color-scheme`). No toggle UI yet — adding one is one component when we want it.
