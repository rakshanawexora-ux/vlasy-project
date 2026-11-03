import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '@/components/ui/Primitives';
import { Reveal } from '@/components/ui/Reveal';
import { ReplacementFAQ } from '../ReplacementFAQ';

export function FAQSection() {
  return (
    <section className="hr-section hr-faq">
      <Reveal className="hr-faq-heading">
        <SectionLabel>LET’S CLEAR THINGS UP</SectionLabel>
        <h2>
          A little clarity.
          <br />
          <span>
            A lot less
            <br />
            guesswork.
          </span>
        </h2>
        <Link href="/faq" className="hr-inline-link">
          Read our FAQs
          <ArrowUpRight size={18} />
        </Link>
      </Reveal>
      <ReplacementFAQ />
    </section>
  );
}
