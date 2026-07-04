# Tensir — Landing

Next.js 15 + React 19 + Tailwind v4. Single page: `app/page.jsx`.

## Local
```bash
npm install
npm run dev   # http://localhost:3000
```

## Deploy (GitHub → Vercel → tensir.ai)
1. Push this folder to a GitHub repo (e.g. `tensir/landing`).
2. Vercel → Add New Project → Import the repo. Framework auto-detected (Next.js). No env vars needed. Deploy.
3. Vercel → Project → Settings → Domains → add `tensir.ai` and `www.tensir.ai`.
4. Cloudflare DNS (tensir.ai zone):
   - `A` record `@` → `76.76.21.21` (Vercel)
   - `CNAME` `www` → `cname.vercel-dns.com`
   - Set both to **DNS only** (grey cloud) — Vercel handles TLS.
5. Wait for Vercel domain check → green. Done.

## Later
- Swap `<VideoPlaceholder/>` in `app/page.jsx` for `<video src="/hero.mp4" …>` (drop `hero.mp4` in `/public`).
- `/investors`, `/careers`, `/faq` pages don't exist yet — create `app/investors/page.jsx` etc.
- Real i18n (per-locale routes for SEO) — later.
