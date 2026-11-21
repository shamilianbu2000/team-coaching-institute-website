# Deployment

Two supported routes. The current demo is on **GitHub Pages**; Vercel remains the recommended production host.

## Option A – GitHub Pages (used for the demo)
Static export of the site published to the `gh-pages` branch. Requires a **public** repository on a free GitHub account.

```bash
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxx npm run deploy:ghpages
```
The script (`scripts/deploy-ghpages.sh`) builds with `STATIC_EXPORT=1`, `NEXT_PUBLIC_BASE_PATH=/<repo>` and `NEXT_PUBLIC_SITE_URL=https://<owner>.github.io/<repo>`, adds `.nojekyll` and force-pushes only the `gh-pages` branch. Then in GitHub: Settings → Pages → *Deploy from a branch* → `gh-pages` / `(root)`.
Notes: the Formspree endpoint is baked in at build time, so re-run the script after setting it. A custom domain needs no base path – build with `NEXT_PUBLIC_BASE_PATH=` (empty) and `NEXT_PUBLIC_SITE_URL=https://your-domain`. The Open Graph image is served without a file extension on Pages, so some social crawlers may not preview it; Vercel serves it correctly.

## Option B – Vercel (recommended for production)

Recommended host: **Vercel** (free Hobby plan is sufficient for a static-first Next.js site).

## Steps
1. Push the repository to GitHub (done: see README for the URL).
2. In Vercel: **Add New → Project → Import** `team-coaching-institute-website`. Framework preset: Next.js (auto-detected). Build command `npm run build`, output default.
3. **Environment variables** (Production and Preview):
   - `NEXT_PUBLIC_FORMSPREE_ENDPOINT` – required for the form (see `FORMSPREE_SETUP.md`)
   - `NEXT_PUBLIC_SITE_URL` – the production URL (e.g. `https://team-coaching-institute-website.vercel.app` or the custom domain)
   - optional: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GSC_VERIFICATION`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_CONTACT_EMAIL`, social URLs
4. Deploy. Verify HTTPS (Vercel provides it automatically).
5. Custom domain (optional, client-owned): Vercel → Domains → add domain and follow the DNS instructions. **Do not buy a domain without client approval.**
6. After the first deploy, update `NEXT_PUBLIC_SITE_URL` to the final URL and redeploy so canonical URLs, sitemap and Open Graph are correct.

## Post-deploy checklist
- [ ] Home and all routes return 200; `/sitemap.xml` and `/robots.txt` work
- [ ] Submit a real test enquiry and confirm the Formspree email arrives
- [ ] Call, WhatsApp and Directions links behave correctly on a phone
- [ ] Lighthouse mobile run; no console errors
- [ ] Search Console property verified and sitemap submitted

## Run the same checks locally
```bash
npm ci
NEXT_PUBLIC_SITE_URL=http://localhost:3100 NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/testform npm run build
npm run test:unit
npm run test:e2e   # starts `next start` on port 3100
```
