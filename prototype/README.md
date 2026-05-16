# That's a Bug — Astro prototype

Astro 5 + Tailwind static site. Sibling to the legacy Jekyll tree at the repo root; both share `master` until cutover.

## Quick start

```bash
npm install
ASTRO_TELEMETRY_DISABLED=1 npm run dev      # http://localhost:4321
ASTRO_TELEMETRY_DISABLED=1 npm run build    # dist/
```

`ASTRO_TELEMETRY_DISABLED=1` is needed only under sandboxed environments. On a normal shell, drop it.

## Where to look

- **`CLAUDE.md`** — architecture, conventions, what to touch and what not to.
- **`RECIPES.md`** — deploy, cutover, rollback, common gotchas.
- **`scripts/migrate-posts.mjs`** — the Jekyll → Astro converter.
- **`../CLAUDE.md`** (repo root) — relationship between the two trees.

## Status

Feature-complete. All 66 production posts migrated; permalinks verified byte-identical to thatsabug.com. Currently deployed to a Cloudflare Pages preview at `https://prototype-astro-migration.thatsabug.pages.dev`. DNS cutover pending.
