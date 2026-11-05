import Link from 'next/link';
import { SectionLabel, Photo } from '@/components/ui/Primitives';
import { Reveal } from '@/components/ui/Reveal';
import { hairConsultationUrl } from '@/data/hair-replacement';

export function HonestResults() {
  return (
    <section className="hr-results">
      <Reveal className="hr-results-copy">
        <SectionLabel>CONFIDENCE STARTS WITH CLARITY</SectionLabel>
        <h2>
          Explore
          <br />
          <span>your possibilities.</span>
        </h2>
        <p>
          Bring your questions and hairstyle references. Ask about attachment, cleaning, refit
          appointments and replacement costs. We will discuss what is suitable for you before you
          decide.
        </p>
        <Link className="hr-pill hr-pill-dark" href={hairConsultationUrl}>
          Discuss your hair options
        </Link>
        <span className="hr-results-note">
          Style inspiration, not documented client results. Real VLASY stories will be added with
          permission.
        </span>
      </Reveal>
      <div className="hr-results-visual">
        <Photo
          src="/images/studio-v2/styling-portrait.webp"
          imageAudience="men"
          alt="Natural short hairstyle, editorial inspiration rather than a verified client result"
        />
        <div className="hr-results-caption">
          <span>THE STARTING POINT</span>
          <strong>You, on your terms.</strong>
        </div>
      </div>
    </section>
  );
}
