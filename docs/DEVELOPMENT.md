# Developing the VLASY website

Use the existing checkout for cloud tasks. A separate Git worktree is not needed.
The project uses Next.js App Router, TypeScript, Node.js 24 and npm 11.

## Start and verify

```sh
npm ci
npm run dev
```

For the production workflow:

```sh
npm run lint
npm run typecheck
npm run format:check
npm run build
npm start
```

In another terminal, run `npm test`. Browser tests use the running production
server on port 3000 and Chromium at `/usr/bin/chromium`. Set `CHROMIUM_PATH` if
Chromium is installed elsewhere. In the managed cloud environment, builds,
server binding, browser execution and network access use the executor's supported
escalated execution mode. Keep the inherited proxy and TLS verification.

## Where changes belong

```text
app/                         URL routes, page composition and metadata
components/
  home/sections/             One file for each homepage section
  layout/                   Shared header, navigation and footer
  services/                 Service cards, photography and consultation guides
  transformations/          Gallery and accessible comparison slider
  forms/                    Enquiry form
  global/                   Theme, scrolling, popup and transitions
  brand/                    Logo-inspired decorative motion
  ui/                       Shared presentation components

data/                        Editable service, course, FAQ and article copy
lib/                         SEO helpers, business settings and validation
styles/
  base.css                   Resets and shared page layout
  brand.css                  Existing brand and homepage composition
  themes/dark.css            Dark palette and editorial components
  themes/light.css           Light palette, theme control and hero media
  readability.css            Shared text scale, alignment and CTA sizing
  salon.css                  Current cream–gold unisex design and service catalogue
public/                      Images, logo, fonts and hero video
tests/                       Browser/API regression tests
```

`app/page.tsx` defines the homepage section order. Edit a section in
`components/home/sections/` instead of changing one large page module.
Service text and options live in `data/services.ts`; service-image captions live
in `data/service-photography.ts`. URL slugs remain stable when display copy changes.

Use `npm run format` after editing. Prettier is pinned and configured in
`.prettierrc.json`; readable formatting is checked with `npm run format:check`.

## Content and SEO

Write for the person planning an appointment. Explain suitability, preparation,
maintenance and next steps. Mention Chennai or the confirmed neighbourhoods when
useful; do not repeat keywords unnaturally or invent reviews, qualifications,
prices, addresses, guarantees or treatment results.

The shared `metadata` helper in `lib/seo.ts` supplies canonical, Open Graph and
Twitter metadata. Its share image is an existing campaign asset in `public/images/studio-v2/`.
Set `NEXT_PUBLIC_SITE_URL` to the confirmed public domain. On Vercel,
`VERCEL_PROJECT_PRODUCTION_URL` is used when no explicit domain is supplied.
Local development intentionally falls back to `https://vlasy.example`.
Do not claim search rankings or production indexing from a local build.

The Our Approach route was removed intentionally. Do not add `/approach` back to
navigation, the sitemap or page content without a new product requirement.

## Preserve these behaviours

- Keep the supplied logo unchanged. Decorative SVGs are separate assets.
- The image overlay badges were removed at the owner’s request. Keep accurate image provenance in alt text and documentation, and retain the before/after clarification that it is illustrative, not a client result.
- Theme choice persists across navigation and reloads.
- Respect reduced motion and data saver: hero rotation stops automatically, with no manual slide controls. No hero video, zoom, headline animation or parallax. Image and copy update together every six seconds.
- Keep enquiry validation, consent, honeypot and same-origin checks.
- Enquiries require the private Resend configuration described in `docs/RENDER.md`. Do not report a console log or unconfigured request as delivered.
- Confirm contact details, opening hours, prices and course details before publishing them.

Next.js development mode can generate `AGENTS.md` and update `next-env.d.ts`.
Preserve existing user changes and restore only generated changes you caused
when cleaning up a development session.

## Confirmed salon catalogue

The current menu has nine main categories and 85 sub-services. Each category has a descriptively named `app/services/<category>/page.tsx` file. Shared page layout lives in `components/services/ServiceDetailPage.tsx`; approved names and sub-service lists live in `data/services.ts`. Sub-services are listed within their category, with no separate sub-service pages. Earlier service URLs redirect through `data/service-routes.ts`. Kolathur is the only published branch; the removed branch is rejected by form validation. New visits use light mode, while a saved explicit dark preference remains respected.

## Service discovery

Homepage feature selection is in `data/featured-services.ts` (five highlights, not the whole catalogue). `FeaturedServiceStory` handles one-time entry reveals and desktop image parallax; reduced motion uses static images. `FeaturedServiceRail` keeps the five cards in a compact native swipe rail on screens up to 700px, with previous/next buttons, keyboard arrows, position feedback and no autoplay. Desktop keeps the vertical parallax narrative. The full menu is always available via the Explore all services links.

`data/sub-services.ts` maps every confirmed sub-service to an editorial image. Related services may reuse a relevant reference. `SubServiceGallery` provides search and individual enquiry links. Contact validates the requested sub-service against the selected category before prefilling the editable enquiry message. No separate sub-service pages are created.

The current campaign has 47 native-resolution AI images, including a dedicated portrait mobile hero, plus 93 distinct service photographs in `public/images/services-unique/`. The separate manifest `docs/service-image-assets.json` records their native dimensions, hashes and service assignments. No upscaling is applied. See `public/images/README.md` and `docs/editorial-assets.json` for provenance and dimensions. `Photo` accepts a `sizes` override so card layouts request appropriately sized responsive variants.

## Removed pages

Academy (including every program route) and Visit Us (including `/locations/kolathur`) have been removed. These URLs return 404 and are excluded from navigation and the sitemap. Training promotions, academy FAQs and enquiry options are removed too. Keep Kolathur contact information on `/contact`; do not recreate these pages without a new request.

Photo replacement instructions are in `docs/IMAGES.md`. Render runtime and contact-delivery settings are in `docs/RENDER.md`.

## Hero carousel and interactions

`data/hero-slides.ts` pairs each of the five service images with its headline, description, CTA and destination. `HeroCarousel` updates the image and content together every six seconds without manual controls. Keyboard focus, offscreen state and document visibility pause the timer. Ordinary pointer hover does not pause it. Reduced motion and data saver disable automatic rotation. Keep the logo still and avoid zoom or parallax in the hero. Use `FeaturedServiceStory` for subtle spring-smoothed parallax below the hero. CTA text uses weight 600. Repeated decorative CTA arrows and the Contact the team / Let’s talk actions were removed at the owner’s request.
