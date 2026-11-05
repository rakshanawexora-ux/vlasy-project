import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MoveUpRight } from 'lucide-react';
import { HairFlow } from '@/components/brand/HairFlow';
import { SectionLabel } from '@/components/ui/Primitives';
import { Reveal } from '@/components/ui/Reveal';

export function ConfidenceIntro() {
  return (
    <section className="hr-section hr-intro" id="approach">
      <HairFlow className="hair-flow-intro" />
      <div className="hr-intro-top">
        <SectionLabel>THE VLASY APPROACH</SectionLabel>
        <p>
          A little more hair.
          <br />A lot more possibility.
        </p>
      </div>
      <div className="hr-intro-composition">
        <Reveal className="hr-intro-heading">
          <h2>
            Good hair.
            <br />
            <span>Real life.</span>
            <br />
            More <em>you.</em>
          </h2>
          <p>
            Hair loss can feel personal.
            <br />
            Your hair solution should be, too.
          </p>
        </Reveal>
        <Reveal className="hr-intro-portrait">
          <div className="hr-portrait-frame" data-image-audience="women">
            <Image
              src="/images/studio-v2/women-bob-cut.webp"
              alt="AI editorial portrait of a woman with a shoulder-length bob; not a client result"
              fill
              sizes="(max-width:700px) 78vw, 32vw"
            />
            <span>
              INDIVIDUAL BY DESIGN
              <ArrowUpRight size={17} />
            </span>
          </div>
          <span className="hr-portrait-caption">AI EDITORIAL PORTRAIT / NOT A CLIENT RESULT</span>
        </Reveal>
        <Reveal className="hr-intro-aside">
          <span className="hr-outline-circle">
            <MoveUpRight size={37} strokeWidth={1} />
          </span>
          <h3>
            Natural-looking.
            <br />
            Thoughtfully fitted.
          </h3>
          <p>
            Non-surgical hair systems considered around your hairline, your routine and the way you
            want to feel.
          </p>
          <Link href="/services/hair-wig-hair-replacement" className="hr-inline-link">
            Explore hair replacement
            <ArrowUpRight size={19} />
          </Link>
        </Reveal>
      </div>
      <div className="hr-value-strip">
        <span>YOUR HAIRLINE</span>
        <i />
        <span>YOUR LIFESTYLE</span>
        <i />
        <span>YOUR CONFIDENCE</span>
        <i />
        <span>YOUR NEXT CHAPTER</span>
      </div>
    </section>
  );
}
