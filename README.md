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

## Third logo update — glossy AI-rendered style (Sep 2026)

The flat vector logo package was replaced again with a different, more
photorealistic/glossy house-and-ramp design (same navy/red/gray palette,
different rendering style):

- **`assets/logo.jpg`** — the full color lockup on a white background,
  used on all light-background pages (`index.html`, `aging-in-place.html`,
  `family-assessment.html`)
- **`assets/logo-white.png`** — a matching white/red version with the
  navy background removed (chroma-keyed to transparency, with edge
  decontamination to avoid a dark fringe), used on `fall-detection.html`'s
  dark navy nav
- **Favicon set regenerated** from an icon-only crop of this new design
  (`favicon.ico`, `assets/apple-touch-icon.png`)
- Nav logo heights were increased on every page (34px/40px → 70-100px)
  since this logo's proportions are much closer to square than the old
  wide horizontal banner, so the old heights would have rendered it tiny

**Note on `logo-white.png`**: it was produced by removing a solid navy
background from an AI-generated image, not a true vector transparent
export. It reads cleanly against the site's exact navy (`#063B78`) since
that's what it was built for, but may show a faint edge if ever placed on
a different background color — regenerate directly from the source AI
tool if a cleaner version is needed later.

## Second rebrand — navy/red visual identity (Sep 2026)

A full professional logo package replaced the original teal/orange design
with a navy/red/gray identity:

- **Colors**: Navy `#063B78`, Red `#E30613`, Ramp Gray `#A7B1BF`, White
  — every page's color variables were remapped to this palette, including
  hardcoded gradient/glow effects that weren't using CSS variables
- **Logo**: `assets/logo.png` (horizontal, color) is the default used on
  light backgrounds; `assets/logo-white.png` is used on `fall-detection.html`'s
  dark navy nav instead of the earlier white-chip workaround; `assets/logo-stacked.png`
  is available if a taller/vertical lockup is ever needed
- **Favicon**: `favicon.ico` and `assets/apple-touch-icon.png` added to all
  four pages — this site never had a proper favicon before
- Per the brand guide included in the logo package: keep clear space around
  the logo equal to one window-pane's height, don't stretch it or recolor
  individual elements, and reserve red for accents/CTAs rather than large
  fill areas

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
