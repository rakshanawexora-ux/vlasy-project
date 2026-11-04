import { PageHero } from '@/components/ui/PageHero';
import { LocationCards } from '@/components/locations/LocationCards';
import { FinalCTA } from '@/components/ui/FinalCTA';
import { metadata } from '@/lib/seo';
export const generateMetadata = () =>
  metadata(
    'VLASY salon in Kolathur, Chennai',
    'Find VLASY Salon & Academy in Kolathur, Chennai. Enquire about branch details and appointments.',
    '/locations',
  );
export default function Locations() {
  return (
    <>
      <PageHero
        label="FIND YOUR SPACE"
        title="Visit VLASY in Kolathur."
        description="Visit our Kolathur salon. Ask the team to confirm directions, opening hours and specialist availability before your visit."
      />
      <section className="section">
        <LocationCards />
      </section>
      <FinalCTA />
    </>
  );
}
