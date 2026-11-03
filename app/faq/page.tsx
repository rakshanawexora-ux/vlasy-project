import { PageHero } from '@/components/ui/PageHero';
import { FAQ } from '@/components/ui/FAQ';
import { FinalCTA } from '@/components/ui/FinalCTA';
import { metadata } from '@/lib/seo';
export const generateMetadata = () =>
  metadata(
    'Frequently asked questions',
    'Answers about hair replacement, extensions, colour, bridal appointments and VLASY Academy.',
    '/faq',
  );
export default function FAQPage() {
  return (
    <>
      <PageHero
        label="A LITTLE CLARITY"
        title="Good questions. Thoughtful answers."
        description="The details matter. Explore a few answers before your first conversation with us."
      />
      {[
        'Hair Replacement',
        'Hair Extensions',
        'Hair Colour',
        'Haircuts & Styling',
        'Beauty Treatments',
        'Mehndi',
        'Bridal',
        'Appointments',
        'Academy',
      ].map((c) => (
        <section className="section faq-preview" key={c}>
          <h2>{c}</h2>
          <FAQ category={c} />
        </section>
      ))}
      <FinalCTA />
    </>
  );
}
