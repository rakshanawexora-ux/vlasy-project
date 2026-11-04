import Link from 'next/link';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { Photo, SectionLabel } from '@/components/ui/Primitives';
import { Reveal } from '@/components/ui/Reveal';
export function LocationsSection() {
  return (
    <section className="hr-locations">
      <div className="hr-locations-image">
        <Photo
          src="/images/editorial/salon-portrait.webp"
          alt="AI editorial salon interior; not a photograph of the VLASY branch"
        />
        <span>YOUR SPACE FOR PERSONAL CARE.</span>
      </div>
      <Reveal className="hr-locations-copy">
        <SectionLabel>VISIT VLASY</SectionLabel>
        <h2>
          Your salon.
          <br />
          <span>Here in Kolathur.</span>
        </h2>
        <p>Premium hair, beauty and grooming services for women and men in Chennai.</p>
        <Link className="hr-location-row" href="/locations/kolathur">
          <MapPin size={20} strokeWidth={1} />
          <span>
            <strong>Kolathur</strong>
            <small>CHENNAI, TAMIL NADU</small>
          </span>
          <ArrowUpRight size={22} />
        </Link>
        <span className="hr-location-note">
          Contact the team for confirmed directions, opening hours and appointment availability.
        </span>
      </Reveal>
    </section>
  );
}
