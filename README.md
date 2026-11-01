# VLASY Salon & Academy

A responsive Next.js App Router website for VLASY in Chennai. The redesigned
homepage leads with non-surgical hair replacement, clean Manrope typography,
forest-charcoal and cream surfaces, immersive local imagery, lifestyle guidance,
an interactive consultation-to-aftercare journey, and hair-specific FAQs and CTAs.
Other salon services and the academy remain available as supporting routes.

The supplied reference image informed the composition and hierarchy; the two
reference websites were blocked by this environment's network policy and could
not be inspected. The original logo shown in chat still needs a file attachment
for exact integration. The existing temporary text name remains until then.

## Develop

Use the existing `/workspace/vlasy-project` checkout; do not create a worktree.
Node.js 24 and npm 11 are used in this environment.

```sh
cd /workspace/vlasy-project
npm ci
npm run dev
```

For a production check: `npm run build` then `npm start`. Run `npm run lint`,
`npm run typecheck`, and `npm test`. Browser tests expect a running production
server on port 3000 and Chromium at `/usr/bin/chromium`; set `CHROMIUM_PATH` to
another installed Chromium executable if needed. In this managed environment,
Next.js build subprocesses, server binding and browser execution require the
executor's supported escalated execution mode.

## Content & integrations

- Central contact values and original logo paths: `lib/constants.ts`.
- Optional public environment values: `.env.example`. Copy to `.env.local` and
  fill only confirmed business values. The default SEO domain is deliberately
  `vlasy.example`; replace `NEXT_PUBLIC_SITE_URL` before publishing.
- Branch addresses, hours and map links: `SITE_CONFIG.locations`.
- Services, locations, FAQs, academy programs and articles: `data/`.
- Verified reviews: `data/testimonials.ts` (empty until supplied).
- Placeholder imagery and replacement guidance: `public/images/README.md`.
- Fonts are Google Fonts distributed through Fontsource and self-hosted with
  `next/font/local` because direct Google Fonts access is blocked in this runtime.
- Original logo is pending. A temporary text wordmark is used without recreating
  a logo. See `public/logo/README.md`.

## Enquiries

React Hook Form and Zod validate on the client; `/api/enquiry` independently
validates on the server. It captures contact fields, service, branch, preferred
date, consent, source page, campaign attribution and a server timestamp. A
honeypot, payload limit and same-origin check are included.

The current adapter logs submissions server-side and returns success as requested.
It does not send email, book appointments or store records in a durable CRM.
Replace this adapter with a durable provider before public use, restrict log
access, define retention and add rate limiting appropriate to the deployment.
Do not log actual customer data to a publicly accessible console.

Missing phone, WhatsApp and social values route visitors to contact rather than
inventing business details or sending them to an unrelated number. Once configured,
they use the centralized values. The consultation popup appears once per session
after 25 seconds, 45% scroll or desktop exit intent; it respects native modal focus
and Escape dismissal. All motion respects reduced-motion preferences.

## Before launch

Supply approved business contact details, branch addresses, opening hours, map
pins, the original logo, licensed real photography, verified reviews and current
academy program details. Review draft legal content, set the production URL and
configure a real enquiry provider. Add conversion IDs only with the appropriate
privacy/consent behavior; the thank-you page has a marked integration point.

No fake reviews, invented business contact details or generated before/after
claims are used. The reusable before/after component is ready for genuine pairs.
