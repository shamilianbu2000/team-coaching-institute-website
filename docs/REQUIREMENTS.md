# Requirements

## Goal
Professional, mobile-first website for **TEAM Coaching Institute, Jayankondam** that builds trust with parents/students and generates admission enquiries (primary), calls, WhatsApp chats and map directions (secondary).

## Scope (this version)
- Static-first Next.js (App Router) site. **No custom backend, no database, no admin dashboard, no authentication.**
- Admission enquiries are delivered by **Formspree**.
- Content lives in TypeScript data files (`src/content/*`) so it can be updated without a database.

## Functional requirements
| ID | Requirement | Status |
|----|-------------|--------|
| F1 | Pages: Home, About, Classes & Courses, Course details (×4), Faculty, Results & Achievements, Testimonials, Gallery, Contact & Admissions, Privacy Policy | Done |
| F2 | Study Resources page | Not built – no content exists; docs explain when to add |
| F3 | Admission form: parent name*, student name*, parent mobile* (Indian format), student class*, subjects, message; RHF + Zod; loading, success, error, duplicate-submit guard; Formspree honeypot | Done (needs real endpoint) |
| F4 | Click-to-call, WhatsApp (prefilled message), Google Maps directions | Done |
| F5 | Fixed bottom Call / WhatsApp / Directions bar on mobile | Done |
| F6 | GA4-ready with events: `generate_lead`, `whatsapp_click`, `phone_click`, `directions_click` | Done (off until `NEXT_PUBLIC_GA_ID` set) |
| F7 | Demo-class CTA | Not added – not confirmed by client |

## Content rules
- Only facts in `docs/CLIENT_RESEARCH.md` "verified" table are published as facts.
- Missing information is shown as **Client confirmation required**.
- No copied reviews, no invented ratings, results, faculty, counts, or social links.
- Classes 1–7 are not listed (no evidence); Classes 8–12, NEET, competitive exams and crash course are shown as "to be confirmed".

## Non-functional requirements
- Mobile-first; verified at 360, 390, 768, 1024, 1280, 1440 px with no horizontal overflow.
- Touch targets ≥ 44 px, body text ≥ 16 px, keyboard accessible, skip link, ARIA labels, reduced-motion respected.
- Local SEO for Jayankondam/Ariyalur; per-page metadata, canonical, Open Graph, sitemap, robots, JSON-LD.
- No secrets in the repository; only `NEXT_PUBLIC_*` configuration.
