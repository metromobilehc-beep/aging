# Stay Safe Home Solutions

One website, one brand, two services — Aging in Place assessments and
Evolve Fall Detection monitoring, both under the Stay Safe Home Solutions
name. This replaces the previous Metro Mobile Health Care branding on
this domain.

## Pages

- `index.html` — hub/selector landing page (logo, quiz, both service cards)
- `aging-in-place.html` — Aging in Place assessment service
- `fall-detection.html` — Evolve fall detection & monitoring service
- `family-assessment.html` — passcode-gated family needs intake form

## What changed in this rebrand

- Logo swapped to the new Stay Safe Home Solutions mark (`assets/logo.png`)
- Every instance of "Metro Mobile Health Care" / "Metro Mobile Healthcare"
  replaced with "Stay Safe Home Solutions" — nav, footers, meta tags,
  JSON-LD structured data, alt text
- Canonical URLs, Open Graph tags, sitemap, and robots.txt updated to
  `https://www.staysafehomesolutions.com`
- Removed a line on the aging-in-place page that would have falsely
  claimed the *Stay Safe Home Solutions* name itself has "years" of
  history — reworded to credit the clinical team's experience instead,
  which is accurate, without implying the brand name is older than it is
- Removed a footer link pointing to metromobilehc.com, since this is now
  presented as its own single brand
- "Evolve by TLS Global" and "Powered by TLS Global / Tranquility Lifestyle
  Solutions" were left as-is — those are the actual third-party technology
  partner's names, not Metro's own branding, so they're accurate regardless
  of this rebrand

## One thing left unchanged — worth a decision

`fall-detection.html`'s contact section still lists the email
`metromobilehc@gmail.com`. I left this alone since it's a functioning
contact address, not just a branding string, and changing it without
confirming you have a working Stay Safe Home Solutions inbox would risk
losing real leads. Let me know if you want this swapped to a different
address once one exists.

## Deploying

This should replace whatever is currently deployed at
`www.staysafehomesolutions.com`. Since that domain was previously pointing
at the Metro hub Vercel project, either:

- Push these files to that same repo/project (simplest — same domain
  config, just new content), or
- Set up a new repo/project and re-point the domain to it

Either way, `aging.metromobilehc.com` and `www.staysafehomesolutions.com`
should no longer serve the same content once this is live — decide
whether the old `aging.metromobilehc.com` URL should redirect here or
be retired.

## Email notifications

Same as before: set `RESEND_API_KEY`, `NOTIFY_EMAIL`, and `NOTIFY_FROM`
as environment variables in Vercel, then redeploy. `api/referral.js` is
unchanged and already labels submissions by service (Aging in Place,
Fall Detection, Family Needs Assessment).
