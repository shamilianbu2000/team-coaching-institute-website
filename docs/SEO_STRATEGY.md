# SEO strategy

## Implemented
- Unique `<title>` and meta description per page; title template `%s | TEAM Coaching Institute`.
- Canonical URLs (from `NEXT_PUBLIC_SITE_URL`), Open Graph and Twitter metadata, generated Open Graph image.
- `sitemap.xml` (all pages + course pages) and `robots.txt` (allow all, points to sitemap).
- JSON-LD: `EducationalOrganization` + `LocalBusiness` (name, address, phone, geo, `hasMap`), `BreadcrumbList` on inner pages, `Course` on course pages. **No `aggregateRating`**: Google disallows self-serving review markup, and the rating is third-party.
- Semantic HTML (one `h1` per page, landmarks, labelled nav/forms), alt text on every image, internal links between home, classes, courses, contact.
- Local signals: Jayankondam / Ariyalur in titles, headings, footer, schema and map embed.
- Course-specific pages: "School Tuition (Classes 8–12) in Jayankondam", "NEET Coaching in Jayankondam", etc.
- Performance: static prerender, `next/font` (Manrope + Inter, swap), no heavy dependencies, lazy-loaded map iframe and images.

## Targets (only courses that exist publicly)
tuition centre in Jayankondam · coaching institute Jayankondam · NEET coaching Jayankondam · school tuition Jayankondam. Subject-specific keywords (Maths, Science, Class 10/12) are **not** used until the institute confirms subjects and classes.

## Manual steps after launch
1. Set `NEXT_PUBLIC_SITE_URL` to the live domain and redeploy.
2. Google Search Console: add property, set `NEXT_PUBLIC_GSC_VERIFICATION` (HTML tag) or use DNS verification, submit `/sitemap.xml`.
3. Google Business Profile: add the website URL; keep name/address/phone identical to the website.
4. GA4: create a property, set `NEXT_PUBLIC_GA_ID`; mark `generate_lead` as a key event.
5. Replace placeholders with real photos, faculty, results (with permission) – fresh authentic content is the biggest local-SEO lever.

No ranking is guaranteed.
