import { PageHero } from '@/components/ui/PageHero';
import { ServiceGrid } from '@/components/services/ServiceGrid';
import { FinalCTA } from '@/components/ui/FinalCTA';
import { metadata } from '@/lib/seo';
export const generateMetadata = () =>
  metadata(
    'Hair, beauty & grooming services in Kolathur',
    'Explore the complete VLASY unisex salon menu: wigs, extensions, haircuts, colouring, treatments, grooming, beauty, bridal and nail services in Chennai.',
    '/services',
  );
const groups = [
  { title: 'Hair wigs & extensions', slugs: ['hair-wig-hair-replacement', 'hair-extensions'] },
  {
    title: 'Haircuts, colour & treatments',
    slugs: ['haircut-styling', 'hair-colouring', 'hair-treatments'],
  },
  { title: 'Grooming & beauty', slugs: ['mens-grooming', 'womens-beauty'] },
  { title: 'Bridal, occasions & nails', slugs: ['bridal-special-occasion', 'nail-beauty'] },
];
export default function Services() {
  return (
    <>
      <PageHero
        label="VLASY UNISEX SALON"
        title="Your complete hair, beauty & grooming menu."
        description="Premium services for women and men in Kolathur, Chennai. Explore nine service categories, see what is included and talk to our team about your next appointment."
        cta="Enquire about a service"
      />
      {groups.map((group) => (
        <section className="section" key={group.title}>
          <div className="section-heading">
            <h2>{group.title}</h2>
          </div>
          <ServiceGrid full slugs={group.slugs} />
        </section>
      ))}
      <FinalCTA />
    </>
  );
}
