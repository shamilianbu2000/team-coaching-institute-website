# Formspree setup (admission enquiries)

The form posts straight to Formspree. Until a real endpoint is configured the site shows "Online form not connected yet" and **disables submit** – it never pretends to send.

1. **Create a Formspree account** at https://formspree.io (free plan is enough to start; the owner of the institute's email should create it).
2. **Create a new form** (e.g. "TEAM Coaching Institute – Admission Enquiry").
3. **Set the receiving email** to the institute's inbox.
4. **Verify the email**: Formspree sends a confirmation message – click the link. Submissions are not delivered until verified.
5. **Copy the endpoint** – it looks like `https://formspree.io/f/abcdwxyz`.
6. **Local:** copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/abcdwxyz`, then `npm run dev`.
7. **Hosting:** add the same variable in the host (Vercel → Project → Settings → Environment Variables → Production + Preview) and **redeploy** (NEXT_PUBLIC values are baked in at build time).
8. **Test with a real enquiry**: submit the form on the live site and confirm the email arrives (check spam). Only then treat the form as live.

## Recommended Formspree settings
- Enable **reCAPTCHA** (Form → Settings → Spam protection) or Formspree's built-in spam filtering if spam appears. Note: reCAPTCHA in Formspree needs its widget, which this custom form does not render; the honeypot (`_gotcha`) and Formspree's server-side filtering are active by default.
- Restrict submissions to your domain (Form → Settings → Domain restrictions) once the domain is known.
- Turn on email notifications for new submissions and add a second recipient if the owner wants a backup.

## Troubleshooting
- "Form not found" → wrong endpoint or form deleted.
- Success shown but no email → email not verified, or message in spam, or free-plan limit reached.
- Error banner on every submit → check the browser console/network tab for the Formspree response.
