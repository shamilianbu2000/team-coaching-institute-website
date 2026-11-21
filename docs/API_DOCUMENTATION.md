# API documentation

**There is no custom backend API.** The site is a static Next.js frontend. The only network call is the browser posting the admission form directly to Formspree.

## Formspree endpoint
`POST {NEXT_PUBLIC_FORMSPREE_ENDPOINT}` (for example `https://formspree.io/f/xxxxxxxx`)

Headers: `Content-Type: application/json`, `Accept: application/json`

Body:
```json
{
  "Parent name": "string (required)",
  "Student name": "string (required)",
  "Parent mobile": "string, normalized, Indian mobile (required)",
  "Student class": "string (required)",
  "Interested subjects": "string (optional)",
  "Message": "string (optional)",
  "_gotcha": "",
  "_subject": "New admission enquiry – TEAM Coaching Institute"
}
```
- `_gotcha` is the honeypot: it must stay empty; Formspree discards submissions where it is filled.
- Responses: `2xx` → success shown; `4xx/5xx` → error shown using Formspree's `errors[].message` when present; network failure → "Network problem" message.
- The code (`src/lib/enquiry.ts → submitEnquiry`) never reports success unless Formspree returns 2xx, and reports "not configured" when the endpoint is empty or `YOUR_FORMSPREE_ENDPOINT`.

## Client-side validation (Zod, `src/lib/enquiry.ts`)
- Names: 2–80 chars. Class: 1–40 chars. Subjects ≤ 200, message ≤ 1000.
- Mobile: optional `+91`/`91`/`0` prefix, then 10 digits starting 6–9 (spaces/hyphens ignored).

## Spam protection
Honeypot field + Formspree's server-side spam filtering. Enable **reCAPTCHA** or Formspree's spam rules in the Formspree dashboard if spam appears (see `FORMSPREE_SETUP.md`).

## Analytics events (GA4, optional)
`generate_lead`, `whatsapp_click`, `phone_click`, `directions_click` – sent through `window.gtag` only when `NEXT_PUBLIC_GA_ID` is configured.
