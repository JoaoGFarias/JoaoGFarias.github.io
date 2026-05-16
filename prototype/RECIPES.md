# Recipes

Operational commands for the Astro prototype. Captured here so picking this back up after a break doesn't require re-deriving anything.

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

Wrangler is installed as a dev dep. Authorize once with:

```bash
cd prototype
npx wrangler login        # opens browser; click Allow
npx wrangler whoami       # confirm — should show Jgfarias42@gmail.com's account
```

Auth persists in `~/.config/.wrangler/`. Re-run `wrangler login` only if the token expires or you wipe that dir.

## Deploy a preview build

For any branch that isn't production:

```bash
cd prototype
ASTRO_TELEMETRY_DISABLED=1 npm run build
CLOUDFLARE_ACCOUNT_ID=d1ece964fbec895acc3d26a8bfc40995 npx wrangler pages deploy dist \
  --project-name=thatsabug \
  --branch=<safe-branch-name> \
  --commit-dirty=true
```

Output gives you two URLs:

- A unique deployment URL like `https://abc123.thatsabug.pages.dev` (immutable — pins this exact build)
- An alias like `https://<branch>.thatsabug.pages.dev` (stable for that branch — moves with each deploy)

`--branch` accepts only `[a-z0-9-]`; slashes get flattened (CLI handles this automatically — `prototype/astro-migration` → `prototype-astro-migration`).

## Production deploy (post-cutover)

When ready to make this the production deploy on the same project:

```bash
cd prototype
ASTRO_TELEMETRY_DISABLED=1 npm run build
CLOUDFLARE_ACCOUNT_ID=d1ece964fbec895acc3d26a8bfc40995 npx wrangler pages deploy dist \
  --project-name=thatsabug \
  --branch=master \
  --commit-dirty=true
```

`--branch=master` is treated by Cloudflare as the production branch and pushes to the apex `https://thatsabug.pages.dev`. Once the custom domain is attached, this also serves `thatsabug.com`.

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
   - `curl -sI https://thatsabug.com/ | head -1` should return 200.
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

If `_posts/` changes (e.g. a hotfix to the Jekyll tree pre-cutover):

```bash
cd prototype
npm run migrate
ASTRO_TELEMETRY_DISABLED=1 npm run build
# verify and deploy
```

The migrator wipes `src/content/blog/` and rewrites it from scratch every run. Idempotent.

## Verify permalink equality

Anytime the source posts or migration logic changes, re-run the diff against the live sitemap:

```bash
cd prototype
ASTRO_TELEMETRY_DISABLED=1 npm run build
find dist -name "index.html" | sed 's|^dist||;s|/index.html$|/|' \
  | grep -E "^/(blog|bugs-real-world)/" | sort > "$TMPDIR/built-urls.txt"
sort scripts/live-urls.txt > "$TMPDIR/live-urls.txt"
diff "$TMPDIR/live-urls.txt" "$TMPDIR/built-urls.txt"
```

A clean diff (no output) means every production URL is preserved.

If you want the live sitemap re-fetched fresh (e.g. if you've added posts to the Jekyll site since):

```bash
curl -s https://thatsabug.com/sitemap.xml \
  | grep -oE '<loc>[^<]+</loc>' \
  | sed -E 's|</?loc>||g; s|^http://thatsabug.com||; s|^https://thatsabug.com||; s|^//|/|' \
  | sort -u > scripts/live-urls.txt
```

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
