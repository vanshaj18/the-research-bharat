# Deployment guide (hosting prep)

This project is ready to deploy but **not deployed yet**. Use this checklist when you choose a host.

## Pre-flight (run locally)

```bash
npm ci
npm run lint
npm run build
npm run start   # optional: smoke-test production server on :3000
```

All three commands must pass before going live.

## Required environment variables

| Variable | Where | Purpose |
|----------|-------|---------|
| `GOOGLE_CHAT_WEBHOOK_URL` | Server only | Contact form → Google Chat webhook |
| `NEXT_PUBLIC_SITE_URL` | Build + runtime | Canonical URL for sitemap, robots, Open Graph (`https://your-domain.com`, no trailing slash) |

Copy `env.example` to `.env.local` for local dev. On the host, set the same variables in the project dashboard (never commit secrets).

## Recommended host: Vercel

Next.js 16 is optimized for [Vercel](https://vercel.com/docs/frameworks/nextjs).

1. Push the repo to GitHub (or GitLab/Bitbucket).
2. Import the project in Vercel → **Add New Project**.
3. Framework preset: **Next.js** (auto-detected).
4. Add env vars above for **Production** (and Preview if you want contact form on preview URLs).
5. Deploy. Do **not** connect a custom domain until DNS is ready.

### After first deploy

- Set `NEXT_PUBLIC_SITE_URL` to the production URL and redeploy (sitemap/OG need the final domain).
- Submit `https://your-domain.com/sitemap.xml` in Google Search Console.
- Send a test message from `/contact` and confirm it appears in Google Chat.

## Node.js version

Use **Node 22** (see `.nvmrc` and `package.json` `engines`). Vercel respects `engines`; other hosts should match.

## What ships in production

| Route | Type | Notes |
|-------|------|-------|
| `/`, `/publications`, `/lookpublic`, `/contact`, `/tools/*` | Static | Pre-rendered at build |
| `/blog`, `/blog/[slug]` | Static | `noindex` — hidden from sitemap, disallowed in robots |
| `/api/contact` | Serverless | Requires `GOOGLE_CHAT_WEBHOOK_URL` |

## Security

`next.config.ts` sets baseline security headers and disables `X-Powered-By`. Review CSP if you add third-party scripts later.

## Custom domain (when ready)

1. Add domain in Vercel → **Settings → Domains**.
2. Point DNS per Vercel instructions.
3. Update `NEXT_PUBLIC_SITE_URL` to the apex or `www` URL you standardize on.
4. Redeploy.

## Alternative: Node / Docker

For self-hosted Node:

```bash
npm run build
npm run start   # listens on PORT (default 3000)
```

Set `PORT`, `GOOGLE_CHAT_WEBHOOK_URL`, and `NEXT_PUBLIC_SITE_URL` in the process environment. Put a reverse proxy (nginx, Caddy) in front for TLS.

## Not in scope yet

- Custom domain / DNS
- Analytics or monitoring
- CI/CD beyond the host’s Git integration
- Staging environment (optional: use Vercel Preview deployments)
