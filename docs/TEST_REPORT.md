# Test report

Run date: 21 Nov 2026 · Next.js 16.4.6 · Node 26 · Playwright 1.65.1 (Chromium) · Vitest 5.1.1

| Check | Command | Result |
|-------|---------|--------|
| TypeScript | `npm run typecheck` | Pass, 0 errors |
| ESLint | `npm run lint` | Pass, 0 problems |
| Production build | `npm run build` (20 static pages) | Pass |
| Unit tests | `npm run test:unit` | 18 / 18 passed |
| End-to-end | `npm run test:e2e` | 37 / 37 passed |

## What the tests cover
**Unit (`tests/unit/enquiry.test.ts`)** – Zod schema (required fields, 4 valid and 5 invalid Indian mobile formats, honeypot rejection), number normalisation, and `submitEnquiry`: *not configured → never reports success*, placeholder endpoint treated as unconfigured, JSON POST + 2xx success, Formspree error message surfaced, network failure.

**End-to-end (`tests/e2e/site.spec.ts`, built production server)**
- All 13 routes (9 pages + 4 course pages) return 200, have an `h1`, title, description, canonical, Open Graph; every `<img>` has alt and loads; **no console errors**.
- 404 page; `sitemap.xml` contains course URLs; `robots.txt` references the sitemap.
- JSON-LD present, address correct, **no `aggregateRating`**.
- Desktop header navigation reaches every page with `aria-current`; class cards open course pages with "Client confirmation required" flags.
- Mobile (390px): hamburger opens/closes/navigates, Escape closes; bottom bar has `tel:+916381466472`, WhatsApp `wa.me` URL with the prefilled message, and Google Maps directions URL.
- Contact page: phone link, WhatsApp, directions, map embed with title; Google reviews link points to the client's Maps listing; **no broken internal links**; social section shows an honest "not found" note.
- Admission form (Formspree mocked at the network layer): empty submit shows all 4 errors and sends nothing; invalid mobile rejected; valid submit sends once, shows "Sending…" (button disabled), then success, payload has normalised mobile and empty honeypot; Formspree 422 shows its message and no success; network failure shows an error and no success.
- **No horizontal overflow** on all 13 routes at 360, 390, 768, 1024, 1280 and 1440 px (the 1024px run caught a real header overflow, fixed by moving the full menu to ≥1280px).
- Touch targets ≥ 44 px for the menu button and bottom-bar links.

## Not verified / limitations
- **Real Formspree delivery is NOT tested**: no endpoint exists yet. Tests mock the network. A real test enquiry must be sent after configuration (`FORMSPREE_SETUP.md`).
- Live deployment, HTTPS and production logs not verified (see `DEPLOYMENT.md` / README status).
- Not tested on physical phones or in Safari/Firefox; Chromium only.
- Google Maps embed content (third-party) is not asserted beyond the iframe URL.
- Colour contrast checked by design (navy/yellow/white pairs), not by an automated audit; run Lighthouse after deploy.
- GA4 events fire only when `NEXT_PUBLIC_GA_ID` is set; not exercised in tests.

## Reproduce
```bash
npm ci
NEXT_PUBLIC_SITE_URL=http://localhost:3100 NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/testform npm run build
npm run test:unit
npx playwright install chromium   # or: export PW_CHROMIUM_PATH=/path/to/chromium
npm run test:e2e
```
