# GitHub Actions

## `deploy-prototype.yml`

Builds the Astro prototype on push or PR, runs the same quality gate developers run locally (`just ci` — migrate → typecheck → build → permalink verification), and on push events deploys to Cloudflare Pages.

**Triggers:**

| Event | Branch / target | Result |
|---|---|---|
| Push to `master` | — | Build + deploy to **production** alias on Cloudflare Pages (`https://thatsabug.pages.dev`). |
| Push to `prototype/astro-migration` | — | Build + deploy to **preview** alias (`https://prototype-astro-migration.thatsabug.pages.dev`). |
| Push to any other branch matching the path filters | — | No trigger (only `master` and `prototype/astro-migration` are watched). |
| PR targeting any branch | — | Build + quality gate only. Does **not** deploy (PRs from forks can't access secrets, and same-repo PRs would double-deploy alongside the push event). |
| `workflow_dispatch` | manual | Build + deploy from the chosen ref. |

Path filters mean unrelated changes (e.g. fixing a typo in this README) don't kick off a build.

## One-time setup

The workflow needs a single secret: `CLOUDFLARE_API_TOKEN`.

### 1. Create the token in Cloudflare

1. Go to <https://dash.cloudflare.com/profile/api-tokens>.
2. Click **Create Token** → use the **Edit Cloudflare Workers** template (it's the closest fit; we'll narrow it).
3. Edit the permissions to be **only** what's needed:
   - Account → **Cloudflare Pages → Edit**
4. Account Resources: **Include → All accounts** (or scope to the specific account if you have multiple).
5. (Optional) Set a TTL — 1 year is reasonable; rotate annually.
6. Click **Continue to summary** → **Create Token**.
7. Copy the token. **You won't see it again.**

### 2. Add the secret to GitHub

1. <https://github.com/JoaoGFarias/JoaoGFarias.github.io/settings/secrets/actions>
2. **New repository secret**:
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: paste the token
3. **Add secret**.

That's it. The next push to a watched branch will trigger the workflow.

## What runs in CI

```
just ci
  → migrate          (re-run Jekyll→Astro converter)
  → typecheck        (npx astro check — TS + content schema)
  → verify-permalinks
       └→ build      (npm run build)
       └→ diff dist/ URL set against scripts/live-urls.txt
```

If any step fails, the workflow fails and **deploy is skipped**. The workflow has the same exit-code semantics as running `just ci` locally — no CI-specific shimming.

## Updating Node version, deps, or build steps

Don't edit the workflow YAML for these. Edit the local source instead:

| Want to change | Edit |
|---|---|
| Node version | Both `.github/workflows/deploy-prototype.yml` (`node-version:`) and your local Node — keep them aligned. |
| Build steps | `prototype/justfile` (recipe `ci` or its dependencies). The workflow inherits. |
| Deploy target / branch / project | `.github/workflows/deploy-prototype.yml` (the `Deploy to Cloudflare Pages` step). |

This is the point of routing CI through `just`: the build pipeline is one tested recipe, not two.

## Cost / runtime

Free for public repos. Each run is ~2 minutes — most of it is `npm ci` (mitigated by the npm cache action) and the Astro build. The deploy step itself is ~10 seconds.

## Failure modes worth knowing

**Permalink drift fail** — somebody changed a post slug, frontmatter category, or migrator behaviour without refreshing `scripts/live-urls.txt`. Fix path: either revert the slug change, or run `just refresh-live-urls` locally if the change is intentional and the live site sitemap will follow.

**Astro check fail** — TS error in a `.astro` file or content schema violation. Run `just typecheck` locally to reproduce.

**Cloudflare deploy fail with 401/403** — token expired or scope is wrong. Recreate the token with the permissions above.

**Cloudflare deploy fail with project not found** — the project name `thatsabug` no longer exists or is in a different account. The account ID is hardcoded in the workflow; double-check it against `npx wrangler whoami`.

**Same-repo PR shows two queued runs** — that's the push-and-PR overlap. The `concurrency` group cancels the older one, so it's harmless but visually confusing.
