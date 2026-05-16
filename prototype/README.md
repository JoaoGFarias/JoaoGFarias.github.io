# That's a Bug — Astro prototype

Prototype migration of the Jekyll site to Astro 5 + Tailwind. Lives on the
`prototype/astro-migration` branch alongside the existing Jekyll source — none
of the current site is touched on this branch.

## Run it

```bash
cd prototype
npm install
ASTRO_TELEMETRY_DISABLED=1 npm run dev      # http://localhost:4321
ASTRO_TELEMETRY_DISABLED=1 npm run build    # static output in dist/
ASTRO_TELEMETRY_DISABLED=1 npm run preview  # serve dist/
```

`ASTRO_TELEMETRY_DISABLED=1` is only needed under the Claude sandbox; on your
machine you can drop it.

## What's here

- **All 66 posts** migrated from `_posts/*.markdown` to `src/content/blog/*.md`.
- **Liquid → Markdown**: `{% include figure %}` and `{% include video %}` are
  converted in `scripts/migrate-posts.mjs`. Re-run with `npm run migrate`.
- **Pages**: home (paginated latest), `/blog/<slug>/`, `/archive/`,
  `/categories/<cat>/`, `/tags/<tag>/`, `/about/`, `/portfolio/`,
  `/portfolio/<slug>/`, `/404`.
- **Feed** at `/rss.xml`, **sitemap** at `/sitemap-index.xml`.
- **Giscus** comments wired but inert — needs real `repoId` + `categoryId` in
  `src/site.config.ts` (get them from <https://giscus.app>).
- **Dark mode**: respects system preference; class-based, controllable later.
- **CNAME** preserved (`public/CNAME` = `thatsabug.com`).

## Permalink mapping

Old Jekyll URL: `/:category/:slug/` — most posts had category `blog`, so the
common case maps 1:1 to `/blog/:slug/` in Astro.

If any post lived at a non-`blog` category in production, add a redirect to
`public/_redirects` (Cloudflare Pages / Netlify syntax). Example:

```
/old-category/old-slug/   /blog/new-slug/   301
```

To verify mappings against the live site before cutting over, crawl the
production sitemap at <https://thatsabug.com/sitemap.xml> and diff slugs.

## What's deliberately not done

- **Pagination** on the home page (currently shows the latest 8 + link to
  `/archive/`). Add later when post count justifies it.
- **Search**. Pagefind is the Astro-native answer when it's wanted.
- **Real portfolio content** — the three entries in `src/content/portfolio/`
  are placeholders to show the shape.
- **Image optimization**. Posts reference `/assets/...` flat copies. Astro's
  `<Image>` component is the upgrade path when you're ready.
- **Old Disqus thread import**. Giscus uses a different backend (GitHub
  Discussions); existing Disqus comments are not migrated.

## Deploying to Cloudflare Pages (free tier)

1. Push this branch to GitHub.
2. Cloudflare Pages → Create project → connect repo.
3. Build command: `cd prototype && ASTRO_TELEMETRY_DISABLED=1 npm install && npm run build`
4. Build output: `prototype/dist`
5. Custom domains → add `thatsabug.com`. Cloudflare will issue a cert.
6. Update DNS to Cloudflare's nameservers (or add CNAME if staying with current registrar).

Vercel and Netlify work the same way — pick whichever you like.

## Repo structure

```
prototype/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── CNAME
│   ├── _redirects
│   └── assets/                   # copied from ../assets/
├── scripts/
│   └── migrate-posts.mjs         # one-shot Jekyll → Astro converter
└── src/
    ├── site.config.ts            # site metadata, social, giscus IDs
    ├── styles/global.css
    ├── components/
    │   ├── Footer.astro
    │   ├── FormattedDate.astro
    │   ├── Giscus.astro
    │   ├── Nav.astro
    │   └── PostCard.astro
    ├── content/
    │   ├── config.ts             # typed schemas (blog + portfolio)
    │   ├── blog/                 # 66 migrated posts
    │   └── portfolio/            # 3 placeholder entries
    ├── layouts/
    │   ├── BaseLayout.astro
    │   └── PostLayout.astro
    └── pages/
        ├── 404.astro
        ├── about.astro
        ├── archive.astro
        ├── index.astro
        ├── rss.xml.ts
        ├── blog/[slug].astro
        ├── categories/[category].astro
        ├── portfolio/index.astro
        ├── portfolio/[slug].astro
        └── tags/[tag].astro
```
