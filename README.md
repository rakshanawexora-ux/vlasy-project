# VLASY Unisex Salon

A responsive Next.js website for the VLASY unisex salon in Kolathur, Chennai.
The confirmed menu has nine main service categories and 85 illustrated sub-services. The homepage highlights five categories in a scroll-led sequence with a complete-menu CTA. Each
category has its own named page; sub-services are listed within that page.

The current design uses bright ivory and champagne-gold surfaces by default,
with an optional saved dark theme. Homepage client-focused image placements
follow an 80% women / 20% men creative direction. All generated editorial images
are visibly labelled and are not represented as real VLASY client results.
The supplied logo is preserved. Motion respects reduced-motion and data-saver
preferences, and the female-led hero loop includes a pause/play control.

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

## Theme and hero media

The header theme control switches dark/light palettes and remembers the choice in local storage. The default light theme is applied before hydration to prevent a palette flash. The hero includes a 10-second silent motion loop made from the AI editorial artwork, not recorded salon footage, with pause/play, static fallback, reduced-motion and data-saver handling. See `public/videos/README.md` for replacement guidance.

## Content & integrations

- Central contact values and original logo paths: `lib/constants.ts`.
- Optional public environment values: `.env.example`. Copy to `.env.local` and
  fill only confirmed business values. The default SEO domain is deliberately
  `vlasy.example`; replace `NEXT_PUBLIC_SITE_URL` before publishing.
- Branch addresses, hours and map links: `SITE_CONFIG.locations`.
- Services, FAQs and articles: `data/`.
- Verified reviews: `data/testimonials.ts` (empty until supplied).
- Current imagery: 47 native-resolution AI editorial images in `public/images/studio-v2/`, including a separate mobile hero. No artificial 4K upscaling; photo overlay badges are removed; provenance and illustrative comparison notes remain. See `public/images/README.md` and `docs/IMAGES.md`.
- Fonts are Google Fonts distributed through Fontsource and self-hosted with
  `next/font/local` because direct Google Fonts access is blocked in this runtime.
- Logo asset and replacement instructions: `public/logo/README.md`. Both themes
  use the black/gold mark on a cream backing without recolouring the artwork.

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
pins, licensed real photography, verified reviews and current
salon service details. Review draft legal content, set the production URL and
configure a real enquiry provider. Add conversion IDs only with the appropriate
privacy/consent behavior; the thank-you page has a marked integration point.

No fake reviews, invented business contact details or generated before/after
claims are used. The reusable before/after component is ready for genuine pairs.

## Maintainer guide

See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for the folder map, content-editing locations, formatting commands, SEO settings and validation workflow. Homepage sections are separate files in `components/home/sections/`.

Contact delivery and Render setup: see `docs/RENDER.md`. The form no longer treats console logging as delivery. Real email delivery requires the private provider settings in Render.
