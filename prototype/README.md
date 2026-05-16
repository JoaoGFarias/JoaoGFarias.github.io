# That's a Bug — Astro prototype

Astro 5 + Tailwind static site. Sibling to the legacy Jekyll tree at the repo root; both share `master` until cutover.

## Quick start

```bash
just setup    # first time
just up       # everyday — boots dev server at http://localhost:4321
```

`just` (no args) lists every recipe.

## Where to look

- **`CLAUDE.md`** — architecture, conventions, what to touch and what not to.
- **`RECIPES.md`** — deploy, cutover, rollback, common gotchas.
- **`scripts/migrate-posts.mjs`** — the Jekyll → Astro converter.
- **`../CLAUDE.md`** (repo root) — relationship between the two trees.

## Status

Feature-complete. All 66 production posts migrated; permalinks verified byte-identical to thatsabug.com. Currently deployed to a Cloudflare Pages preview at `https://prototype-astro-migration.thatsabug.pages.dev`. DNS cutover pending.
