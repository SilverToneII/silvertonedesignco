# Deploy Runbook — Step 16

This is the §22 step 16 work that requires owner credentials. Estimated
time: 15–30 min including DNS propagation.

## Prerequisites

- [ ] GitHub account with repo creation rights
- [ ] Vercel account (Hobby tier sufficient for expected traffic)
- [ ] Domain registrar access for `silvertonedesignco.com` DNS
- [ ] Confirm owner action items from `README.md` are resolved (or
      acceptable to ship as placeholders for v1)

## 1. Push to GitHub

```bash
cd ~/Desktop/Apps/silvertonedesignco

# Currently on local branch step-1-init with all build commits
git log --oneline                          # confirm commits look right

# Create the repo and push
gh repo create silvertonedesignco \
  --public \
  --description "Portfolio of LaBrew Solomon II — UX/UI and Product Designer" \
  --source . \
  --remote origin

git checkout -b main                        # canonical branch name
git push -u origin main
git push origin step-1-init                 # keep the build branch for review
```

If you don't have `gh` CLI: `brew install gh && gh auth login`.

## 2. Connect to Vercel

1. Go to https://vercel.com/new
2. Import the `silvertonedesignco` GitHub repo
3. Framework preset: **Next.js** (auto-detected)
4. Root directory: `./` (default)
5. Build command: `pnpm build` (default)
6. Install command: `pnpm install --frozen-lockfile`
7. Output directory: `.next` (default)
8. Environment variables: none required for v1 (see §21.4 for v2 namespace)
9. Click **Deploy** — the first build takes 2–4 min

Vercel will produce a preview URL like
`silvertonedesignco-{hash}.vercel.app`. Verify the site loads, then
proceed to custom domain setup.

## 3. Configure custom domain

In Vercel dashboard for the project:

1. Settings → Domains → Add `silvertonedesignco.com`
2. Vercel will show DNS records you need to set at the registrar

## 4. Update DNS at registrar

Per §21.3:

```
Record  Name  Value
A       @     76.76.21.21
CNAME   www   cname.vercel-dns.com
```

Propagation usually takes 1–10 min for the apex; up to an hour for
some registrars.

## 5. Wait for SSL provision

Vercel handles Let's Encrypt automatically. Once DNS propagates, the
domain will get a green check mark in the dashboard (typically <2 min
after DNS resolves).

## 6. Verify production build

Open https://silvertonedesignco.com in a few browsers (Safari, Chrome,
Firefox) and:

- [ ] All routes resolve (`/`, `/work`, `/work/[slug]`, `/about`, `/feed`, `/connect`)
- [ ] No console errors in any browser
- [ ] Run mobile + desktop Lighthouse on home, work index, one project:
      - Performance ≥95 mobile + desktop
      - Accessibility 100
      - Best Practices 100
      - SEO 100
- [ ] OG image renders correctly on Twitter card validator and LinkedIn
      post inspector
- [ ] `/sitemap.xml` and `/robots.txt` resolve
- [ ] Vercel Analytics shows hits in the dashboard within 1–2 min of
      first visit

## Post-deploy

- Set the GitHub repo's default branch to `main`
- Branch protection on `main`: require PR + passing CI
- Auto-deploy preview on every PR

## If something breaks

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| Build fails on `pnpm install` peer warnings | ESLint conflict | Downgrade `eslint` to `8.57.0` in `package.json` |
| Build fails on MDX | Bare `{{ }}` in body | Wrap in backticks |
| Lighthouse Performance <95 | Missing image priority/blur | See §A7.5 fix sequence |
| Fonts FOIT visibly | Preload not landing | Verify `<link rel="preload">` in `<head>` |
| 404 on `/styleguide` in prod | Working as designed (`robots: index:false`) | n/a |
