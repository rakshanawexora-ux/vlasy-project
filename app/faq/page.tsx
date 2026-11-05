import { services } from '@/data/services';
import { PageHero } from '@/components/ui/PageHero';
import { FAQ } from '@/components/ui/FAQ';
import { FinalCTA } from '@/components/ui/FinalCTA';
import { metadata } from '@/lib/seo';
export const generateMetadata = () =>
  metadata(
    'Frequently asked questions',
    'Answers about hair replacement, extensions, colour, bridal services and salon appointments.',
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
      {[...services.map((service) => service.shortName), 'Appointments'].map((c) => (
        <section className="section faq-preview" key={c}>
          <h2>{c}</h2>
          <FAQ category={c} />
        </section>
      ))}
      <FinalCTA />
    </>
  );
}
