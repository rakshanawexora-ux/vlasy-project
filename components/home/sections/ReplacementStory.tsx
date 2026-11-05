import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { SectionLabel, Photo } from '@/components/ui/Primitives';
import { Reveal } from '@/components/ui/Reveal';
import { hairConsultationUrl } from '@/data/hair-replacement';

export function ReplacementStory() {
  return (
    <section className="hr-story">
      <div className="hr-story-photo">
        <Photo
          src="/images/studio-v2/salon-process.webp"
          imageAudience="men"
          alt="AI editorial scene of an Indian stylist and man discussing his hair in a consultation"
        />
        <span className="hr-photo-label">A NEW PERSPECTIVE. STILL YOU.</span>
      </div>
      <Reveal className="hr-story-copy">
        <SectionLabel>OUR SIGNATURE FOCUS</SectionLabel>
        <h2>
          Your hair.
          <br />
          Only{' '}
          <span>
            better
            <br />
            understood.
          </span>
        </h2>
        <p>
          A non-surgical hair system adds coverage without a transplant. We consider your scalp,
          existing hair and daily routine, then explain fitting, blending and the ongoing care
          involved.
        </p>
        <ul>
          {[
            'A considered hairline, colour & density',
            'A fit that considers your daily routine',
            'Clear guidance on care & maintenance',
            'A personal consultation before you decide',
          ].map((t) => (
            <li key={t}>
              <Check size={16} />
              {t}
            </li>
          ))}
        </ul>
        <Link className="hr-pill hr-pill-cream" href={hairConsultationUrl}>
          Book a hair consultation
          <ArrowUpRight size={18} />
        </Link>
        <span className="hr-small-disclaimer">
          Suitability and results vary. Ask us what is realistic for you.
        </span>
      </Reveal>
    </section>
  );
}
