import { PageHero } from '@/components/ui/PageHero';
import { LocationCards } from '@/components/locations/LocationCards';
import { FinalCTA } from '@/components/ui/FinalCTA';
import { metadata } from '@/lib/seo';
export const generateMetadata = () =>
  metadata(
    'Our Chennai salons',
    'Find VLASY Salon & Academy in Kolathur and Madhavaram, Chennai. Enquire about branch details and appointments.',
    '/locations',
  );
export default function Locations() {
  return (
    <>
      <PageHero
        label="FIND YOUR SPACE"
        title="Find VLASY in Chennai."
        description="Choose Kolathur or Madhavaram when you enquire. Ask the team to confirm directions, opening hours and specialist availability before your visit."
      />
      <section className="section">
        <LocationCards />
      </section>
      <FinalCTA />
    </>
  );
}
