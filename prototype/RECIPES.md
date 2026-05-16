# Recipes

Operational reference for the Astro prototype — the *why* and *when* behind the commands.

The runnable versions live in `justfile`. From `prototype/`, `just` lists everything (24 recipes covering the full dev lifecycle: setup → authoring → quality checks → deploy → smoke → maintenance → rollback). This doc explains the rationale; the justfile owns the truth on what's actually run.

## Cloudflare Pages identity

| Field | Value |
|---|---|
| Account email | `Jgfarias42@gmail.com` |
| Account ID | `d1ece964fbec895acc3d26a8bfc40995` |
| Pages project | `thatsabug` |
| Default Pages URL | `https://thatsabug.pages.dev` |
| Current preview alias | `https://prototype-astro-migration.thatsabug.pages.dev` |

The account ID is non-secret; it's a routing identifier in CF API calls.

## Wrangler auth

Wrangler is installed as a dev dep. Authorize once with `just cf-login` (opens a browser; click Allow). Confirm with `just cf-whoami` — should show `Jgfarias42@gmail.com's account`.

Auth persists in `~/.config/.wrangler/`. Re-run only if the token expires or you wipe that dir.

## Deploy a preview build

`just deploy-preview <branch-name>` builds and deploys to that preview alias.

Output gives two URLs:

- A unique deployment URL like `https://abc123.thatsabug.pages.dev` (immutable — pins this exact build)
- An alias like `https://<branch>.thatsabug.pages.dev` (stable for that branch — moves with each deploy)

`--branch` accepts only `[a-z0-9-]`; slashes get flattened (`prototype/astro-migration` → `prototype-astro-migration`). The CLI handles that automatically.

## Production deploy (post-cutover)

`just deploy-prod` — prompts for confirmation, then builds and deploys to the production branch (`master` from Cloudflare's perspective). Serves `https://thatsabug.pages.dev` and (once the custom domain is attached) `https://thatsabug.com`.

## DNS cutover (the actual go-live step)

This is the moment thatsabug.com starts serving the new site instead of GitHub Pages. **Do this only after the preview at `https://thatsabug.pages.dev` looks correct.**

1. **Add the custom domain in Cloudflare Pages:**
   - Dashboard → Compute → Workers & Pages → `thatsabug` → Custom domains → Set up a custom domain.
   - Enter `thatsabug.com`. Cloudflare will show DNS records to add.
   - Also add `www.thatsabug.com` if you want it covered.

2. **Update DNS at your current registrar:**
   - The CNAME currently points the apex to GitHub Pages (`<user>.github.io`).
   - Replace with the records Cloudflare gives you (typically a single CNAME or A record set).
   - If you'd rather move DNS hosting to Cloudflare entirely, that's also offered in the same UI (changes nameservers, takes ~24h to propagate globally — but most users see it within minutes).

3. **Wait for cert provisioning** — Cloudflare auto-issues a Let's Encrypt cert. Usually < 5 minutes. Status shows in the Custom Domains UI.

4. **Verify:**
   - `just smoke-prod` hits a representative URL set and reports HTTP status for each.
   - Visit a few posts in a browser, check Giscus loads, confirm RSS at `/rss.xml`.

5. **Decommission GitHub Pages:**
   - Repo → Settings → Pages → set Source to "None" (or leave it — once DNS no longer points there, it's just dormant).
   - **Do not** delete `master`'s Jekyll tree until the new site has been live and trouble-free for at least a week.

## Rollback to GitHub Pages

If something goes wrong post-cutover:

1. Revert DNS at your registrar to the previous CNAME pointing at GitHub Pages.
2. GitHub Pages config on `master` is unchanged, so the old site comes back as soon as DNS propagates (~minutes to ~hours).
3. Investigate the Cloudflare deployment offline; redeploy via the preview alias before retrying cutover.

The only thing that lingers post-rollback is the SSL cert in Cloudflare. Harmless.

## Re-running the Jekyll→Astro migration

If `_posts/` changes (e.g. a hotfix to the Jekyll tree pre-cutover): `just migrate && just verify-permalinks`. The migrator wipes `src/content/blog/` and rewrites it from scratch every run. Idempotent.

## Verify permalink equality

`just verify-permalinks` builds and diffs the output URLs against `scripts/live-urls.txt` (a frozen snapshot of production). Empty output means every production URL is preserved.

If posts have been added to the Jekyll site since the snapshot was taken, refresh first: `just refresh-live-urls`.

## Add a redirect

`public/_redirects` (Cloudflare Pages format, identical to Netlify):

```
/old-path/    /new-path/    301
```

Wildcards and splats:
```
/old/*    /new/:splat    301
```

Rebuild and redeploy after changes; the `_redirects` file is included in `dist/` automatically.

## Update Giscus IDs

Edit `src/site.config.ts`. Source the values from <https://giscus.app> — fill in the repo, get the form to validate, then copy the four `data-*` attributes from the generated `<script>` block:

- `data-repo` (e.g. `JoaoGFarias/JoaoGFarias.github.io`)
- `data-repo-id`
- `data-category` (human name)
- `data-category-id`

## Common gotchas

**Dev server shows "0 posts" after running the migrator.** Restart the dev server. Astro's content collection cache doesn't pick up wholesale directory replacement.

**Build fails with `EPERM mkdir` somewhere under `~/Library/Preferences`.** Set `ASTRO_TELEMETRY_DISABLED=1`. This is a Claude Code sandbox issue, not Astro.

**Giscus shows "discussion not found" on localhost.** Expected — Giscus checks origin against the configured domain. Test on the Pages preview URL.

**`wrangler pages deploy` warns about uncommitted changes.** Add `--commit-dirty=true` if intentional, otherwise commit first. Wrangler attaches the commit hash to the deployment metadata, which is useful for traceability.
