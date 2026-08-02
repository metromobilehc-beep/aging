# Metro Mobile Health Care — Safety Services Site

A hub landing page plus two standalone service-line pages for Metro Mobile
Health Care. Not part of the Selko platform.

## Pages

- `index.html` — **Hub / landing page.** First stop for visitors — presents
  both services side by side and lets them pick.
- `fall-detection.html` — **Fall Detection / Evolve by TLS Global** (radar-based
  fall monitoring, 24/7 remote wellness support)
- `aging-in-place.html` — **Aging in Place** (PT/OT-led home safety
  assessments and modifications)

All three pages link to each other via nav. Both service pages submit their
contact/referral forms to the same backend function, tagged by service.

## Files

- `index.html` — hub/selector landing page (uses the real logo at `assets/metro-logo.jpg`)
- `fall-detection.html` — Fall Detection landing page
- `aging-in-place.html` — Aging in Place landing page
- `assets/metro-logo.jpg` — official Metro Mobile Healthcare logo (white background)
- `api/referral.js` — shared Vercel serverless function that receives both
  forms' submissions (distinguished by a `service` field: `fall-detection`
  or `aging-in-place`)


## Turning on email notifications

Both forms work right now — every submission is accepted and logged in
Vercel's function logs — but no email goes out until you add three
environment variables:

1. In Vercel: **Project → Settings → Environment Variables**, add:
   - `RESEND_API_KEY` — same Resend account already used for Selko Cred's
     credential reminder emails
   - `NOTIFY_EMAIL` — the inbox that should receive new referrals
   - `NOTIFY_FROM` — a verified sending address on your Resend domain
2. Redeploy the project.

No code changes needed — `api/referral.js` picks these up automatically,
and labels each notification email by which service it came from.

## Known follow-ups

- The Evolve page's original Wix version referenced an `Evolve_by_TLS_Brochure.pdf`
  download link — that file isn't included here. Add a real PDF at
  `/Evolve_by_TLS_Brochure.pdf` if you want that download strip back, or say
  the word and it can be rebuilt as an artifact.

## Deploy / fix the aging.metromobilehc.com domain mix-up

If `aging.metromobilehc.com` is currently pointing at a different Vercel
project (e.g. Cred or Comply):

1. Open that project → Settings → Domains → remove `aging.metromobilehc.com`
2. Import this repo as its own Vercel project (no build config needed)
3. In this project's Settings → Domains, add whichever domain should point
   here — since this repo now serves all three pages (hub, aging-in-place,
   fall-detection) from one project, one domain (e.g. `aging.metromobilehc.com`,
   or a new one like `safety.metromobilehc.com`) can serve the whole hub, with
   `/aging-in-place.html` and `/fall-detection.html` as the sub-pages.

The CNAME in Wix is already correct for `aging.metromobilehc.com`, so
re-pointing the domain in Vercel is usually instant.
