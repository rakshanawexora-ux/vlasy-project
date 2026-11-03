import { ArrowUpRight } from 'lucide-react';
import { SectionLabel, Photo } from '@/components/ui/Primitives';
import { Reveal } from '@/components/ui/Reveal';

export function EverydaySection() {
  return (
    <section className="hr-section hr-everyday">
      <div className="hr-heading-row">
        <Reveal>
          <SectionLabel>BEYOND HOW IT LOOKS</SectionLabel>
          <h2>
            Made for the way
            <br />
            <span>you live.</span>
          </h2>
        </Reveal>
        <p>
          A good solution should make sense
          <br />
          outside the salon, too.
        </p>
      </div>
      <div className="hr-everyday-grid">
        <article className="hr-benefit-card hr-benefit-cream">
          <span>01 / THE LOOK</span>
          <h3>
            Familiar in
            <br />
            the mirror.
          </h3>
          <p>
            Colour, texture, density and hairline are considered together. The goal is a look that
            feels individual.
          </p>
          <ScanDetail />
        </article>
        <article className="hr-benefit-photo">
          <Photo
            src="/images/editorial/replacement-process.webp"
            alt="AI editorial illustration of a stylist combing a short dark hairstyle"
          />
          <div>
            <span>YOUR EVERYDAY, CONSIDERED.</span>
            <h3>
              A little less thinking.
              <br />A little more living.
            </h3>
          </div>
        </article>
        <article className="hr-benefit-card hr-benefit-dark">
          <span>02 / THE ROUTINE</span>
          <h3>
            Life doesn’t
            <br />
            stand still.
          </h3>
          <p>
            Work, workouts, travel and daily care. Talk us through your routine so we can discuss a
            practical fit and maintenance plan.
          </p>
          <ArrowUpRight size={39} strokeWidth={1} />
        </article>
      </div>
    </section>
  );
}
function ScanDetail() {
  return (
    <div className="hr-detail-lines" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}
