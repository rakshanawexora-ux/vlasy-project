import { BeforeAfterSlider } from './BeforeAfterSlider';
import { SectionLabel } from '@/components/ui/Primitives';
export function ComparisonSection() {
  return (
    <section className="section comparison-section" aria-labelledby="comparison-heading">
      <div>
        <SectionLabel>A CLOSER LOOK</SectionLabel>
        <h2 id="comparison-heading">
          Explore the detail.
          <br />
          <em>Understand the difference.</em>
        </h2>
        <p>
          A useful before-and-after comparison needs matching angles, lighting and a documented
          treatment. We will only publish VLASY client comparisons with permission.
        </p>
        <p>
          Explore an AI-generated illustration of advanced hair thinning and a possible hair
          replacement appearance on the same fictional Indian model. Actual suitability, coverage
          and results vary; ask your specialist for verified client examples.
        </p>
      </div>
      <BeforeAfterSlider
        before="/images/editorial/2026-11/hair-replacement-before-illustration.webp"
        after="/images/editorial/2026-11/hair-replacement-after-illustration.webp"
        alt="Fictional Indian man showing advanced top-of-scalp hair loss before and a fuller short hairstyle after simulated hair replacement"
      />
    </section>
  );
}
