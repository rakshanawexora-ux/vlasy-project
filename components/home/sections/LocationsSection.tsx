import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { SectionLabel, Photo } from '@/components/ui/Primitives';
import { Reveal } from '@/components/ui/Reveal';

export function LocationsSection() {
  return (
    <section className="hr-locations">
      <div className="hr-locations-image">
        <Photo
          src="/images/editorial/salon-portrait.webp"
          alt="Editorial salon interior; actual VLASY branch imagery to be supplied"
        />
        <span>YOUR SPACE TO RESET.</span>
      </div>
      <Reveal className="hr-locations-copy">
        <SectionLabel>FIND YOUR SPACE</SectionLabel>
        <h2>
          Good hair.
          <br />
          <span>Closer to home.</span>
        </h2>
        <p>
          Two Chennai neighbourhoods.
          <br />
          One personal approach.
        </p>
        {[
          { name: 'Kolathur', slug: 'kolathur' },
          { name: 'Madhavaram', slug: 'madhavaram' },
        ].map((l) => (
          <Link className="hr-location-row" key={l.slug} href={`/locations/${l.slug}`}>
            <MapPin size={20} strokeWidth={1} />
            <span>
              <strong>{l.name}</strong>
              <small>CHENNAI, TAMIL NADU</small>
            </span>
            <ArrowUpRight size={22} />
          </Link>
        ))}
        <span className="hr-location-note">
          Enquire for confirmed branch details and specialist availability.
        </span>
      </Reveal>
    </section>
  );
}
