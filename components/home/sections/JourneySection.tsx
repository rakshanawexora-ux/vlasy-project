import { SectionLabel } from '@/components/ui/Primitives';
import { Reveal } from '@/components/ui/Reveal';
import { ReplacementJourney } from '../ReplacementJourney';

export function JourneySection() {
  return (
    <section className="hr-section hr-journey" id="your-journey">
      <div className="hr-heading-row">
        <Reveal>
          <SectionLabel>FROM THE FIRST HELLO</SectionLabel>
          <h2>
            A clear path.
            <br />
            <span>A personal process.</span>
          </h2>
        </Reveal>
        <p>
          Understand your options.
          <br />
          Decide at your own pace.
        </p>
      </div>
      <ReplacementJourney />
    </section>
  );
}
