# Website images change pannradhu

Photos `public/images/studio-v2/` folder-la irukku. Same filename-la new WebP replace
pannina, code-la path change panna thevai illai. GitHub-ku push pannitu Render-la
"Clear build cache & deploy" use pannunga; old optimized variants remain cached otherwise.

| Website area       | Filename                   |
| ------------------ | -------------------------- |
| Desktop hero       | `unisex-hero.webp`         |
| Mobile hero        | `unisex-hero-mobile.webp`  |
| Wigs / replacement | `women-wig-fitting.webp`   |
| Extensions         | `extensions-portrait.webp` |
| Haircuts           | `women-bob-cut.webp`       |
| Hair colour        | `colour-portrait.webp`     |
| Treatments         | `hair-spa.webp`            |
| Men's grooming     | `styling-portrait.webp`    |
| Women's beauty     | `beauty-portrait.webp`     |
| Bridal             | `bridal-portrait.webp`     |
| Nails              | `manicure.webp`            |

Wide photos-ku 3:2 ratio; mobile hero-ku 2:3 portrait use pannunga. Clear original
photo use pannunga; small screenshot-ai enlarge panna detail improve aagaadhu.
Quality 90+ WebP preferred. Genuine native 4K sources available aana use pannalam;
small files-ai "4K" nu resize panna vendam.

New filename use panna `data/services.ts` (main photos), `data/sub-services.ts`
(individual service cards), `data/service-photography.ts` (photo stories) update
pannanum. Accurate alt text-um update pannunga. Photo overlay badges owner request-la remove panniyachu. Provenance notes accurate-ah
vechukonga; before/after preview-ai real client result-nu solla koodadhu.
Competitor site photos copy panna koodadhu.

## Individual service photographs

`public/images/services-unique/<category>/<service-name>.webp` contains one distinct photograph for each of the 85 sub-services. `data/sub-service-images.json` maps the approved names to files and descriptions. Eight additional photographs in the `editorial/` folder complete the category galleries. Category leads and stories use 45 different sources, separate from sub-service cards.

The 93 new images are fictional AI-generated scenes, exported at native 1536 × 1024 resolution as quality-94 WebP, without upscaling. They are not real customers, branch interiors or documented results. `docs/service-image-assets.json` records provenance, dimensions and file hashes. Replace a service photo under its descriptive filename and update its alt text and provenance when needed.
