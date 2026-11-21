# TEAM Coaching Institute – Website

Professional, mobile-first website for **TEAM Coaching Institute, Jayankondam (Ariyalur district, Tamil Nadu)**. Goal: generate admission enquiries and improve local search visibility.

> **Status:** code complete and tested. The admission form needs a **Formspree endpoint** before it can send enquiries (see below). Content marked *Client confirmation required* awaits the institute.

## Tech stack
Next.js 16 (App Router, static generation) · TypeScript · Tailwind CSS 4 · Lucide icons · Framer Motion · React Hook Form + Zod · **Formspree** (form delivery) · Playwright + Vitest. **No backend, no database, no admin, no auth.**

## Pages
Home · About · Classes & Courses · 4 course pages · Faculty · Results & Achievements · Testimonials · Gallery · Contact & Admissions · Privacy Policy (+ sitemap.xml, robots.txt).

## Local setup
```bash
git clone https://github.com/shamilianbu2000/team-coaching-institute-website.git
cd team-coaching-institute-website
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
```

## Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` · `npm run lint` | Types · ESLint |
| `npm run test:unit` | Vitest unit tests |
| `npm run test:e2e` | Playwright (builds must exist; uses port 3100) |
| `npm run deploy:ghpages` | Static export → `gh-pages` branch (GitHub Pages) |

## Environment variables
| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | **Yes** (for the form) | `https://formspree.io/f/xxxx` |
| `NEXT_PUBLIC_SITE_URL` | Yes in production | Canonical URLs, sitemap, Open Graph |
| `NEXT_PUBLIC_GA_ID` | No | GA4 measurement ID |
| `NEXT_PUBLIC_GSC_VERIFICATION` | No | Search Console token |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_PHONE_*`, `NEXT_PUBLIC_CONTACT_EMAIL` | No | Override contact details |
| `NEXT_PUBLIC_INSTAGRAM_URL` / `YOUTUBE_URL` / `FACEBOOK_URL` | No | Social links (none found yet) |

Never commit `.env.local`. `NEXT_PUBLIC_*` values are public by design.

## Formspree setup
Short version: create form → set institute email → verify email → copy endpoint → put it in `.env.local` and in the host's env settings → redeploy → send a real test enquiry. Full guide: [`docs/FORMSPREE_SETUP.md`](docs/FORMSPREE_SETUP.md). Without an endpoint the form shows a notice and disables submit (it never fakes success).

## Updating content
Edit `src/content/site.ts` (business details), `courses.ts` (courses), `general.ts` (faculty, achievements, testimonials, gallery, reasons). Empty faculty/achievements/testimonials arrays render clearly-marked placeholders; add real entries and they appear automatically. Put approved photos in `public/` and set `src` in `GALLERY_ITEMS`.

## Documentation
[`docs/`](docs): CLIENT_RESEARCH · REQUIREMENTS · SITEMAP · UX_FLOWS · API_DOCUMENTATION · SEO_STRATEGY · TEST_REPORT · DEPLOYMENT · FORMSPREE_SETUP.

## Deployment
Demo: GitHub Pages (`npm run deploy:ghpages`). Production: Vercel recommended – see [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Repository & demo
- Repository: https://github.com/shamilianbu2000/team-coaching-institute-website (public – required for free GitHub Pages)
- **Live demo (GitHub Pages):** https://shamilianbu2000.github.io/team-coaching-institute-website/
- The demo's admission form is disabled until a Formspree endpoint is set and `npm run deploy:ghpages` is re-run.
