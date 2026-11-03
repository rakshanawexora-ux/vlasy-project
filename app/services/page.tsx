import { PageHero } from '@/components/ui/PageHero';
import { ServiceGrid } from '@/components/services/ServiceGrid';
import { FinalCTA } from '@/components/ui/FinalCTA';
import { metadata } from '@/lib/seo';
export const generateMetadata = () =>
  metadata(
    'Hair, beauty & bridal services in Chennai',
    'Explore hair replacement, extensions, colour, haircuts, bridal makeup, beauty care and mehndi at VLASY in Chennai. Read the service guides and enquire.',
    '/services',
  );
export default function Services() {
  return (
    <>
      <PageHero
        label="THE ART OF YOU"
        title="Hair and beauty services in Chennai."
        description="Looking for a regular haircut, a new colour or help planning your bridal look? Explore our services, learn what each appointment involves and talk to us about what suits you."
      />
      {[
        ['Hair transformation', ['hair-replacement', 'hair-extensions']],
        ['Hair services', ['hair-colour', 'hair-cut-styling']],
        ['Beauty & occasion', ['bridal', 'beauty-treatments', 'mehndi']],
      ].map(([name, slugs]) => (
        <section className="section" key={name as string}>
          <div className="section-heading">
            <h2>{name}</h2>
          </div>
          <ServiceGrid full slugs={slugs as string[]} />
        </section>
      ))}
      <FinalCTA />
    </>
  );
}
