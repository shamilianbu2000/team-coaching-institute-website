# UX flows

## 1. Parent lands on the site from Google (mobile)
1. Hero shows what (tuition & coaching), where (Jayankondam), what (school, NEET, competitive, crash course) and two CTAs within the first screen.
2. Sticky bottom bar offers **Call · WhatsApp · Directions** at all times.
3. Parent scrolls: courses → why us → reviews link → location.
4. Taps **Enquire for Admission** → `/contact#enquiry` → fills 4 required fields → success message.

## 2. Direct contact
Call / WhatsApp / Directions available in header (desktop), hamburger menu, bottom bar (mobile), contact page and footer. Each click fires a GA4 event when analytics is configured.

## 3. Course enquiry
Classes → course card → course page (approach, pending facts flagged) → enquiry form in the same page or WhatsApp with a course-specific message.

## 4. Admission form states
`idle → validating (on blur / submit) → submitting (button disabled, "Sending…") → success | error`
- Not configured: banner explains, submit disabled, Call/WhatsApp buttons shown.
- Error (network/Formspree rejection): red alert with message; form data is kept so the user can retry.
- Success: confirmation card; `generate_lead` event; form resets.

## 5. Mobile menu
Hamburger → full-screen sheet with 8 links + "Enquire for Admission" + Call. Closes on link tap or Escape; body scroll locked while open.
