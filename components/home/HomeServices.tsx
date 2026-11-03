import { ServiceGraphic } from '@/components/brand/ServiceGraphic';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Photo, SectionLabel } from '@/components/ui/Primitives';
import { services } from '@/data/services';

const summaries: Record<string, string> = {
  'hair-replacement': 'Non-surgical hair systems, personal fitting and ongoing care.',
  'hair-extensions': 'Explore length, volume, colour matching and blending.',
  'hair-colour': 'Colour consultations, balayage, highlights and grey coverage.',
  'hair-cut-styling': 'Personalised cuts, shaping and styling for your everyday routine.',
  bridal: 'Bridal hair and makeup, with a look planned around your occasion.',
  'beauty-treatments': 'Personalised beauty care, preparation and facial consultations.',
  mehndi: 'Bridal and occasion designs, considered with your artist.',
};
export function HomeServices() {
  const offerings = [
    ...services.map((s) => ({
      name: s.name,
      href: `/services/${s.slug}`,
      image: s.image,
      summary: summaries[s.slug],
    })),
    {
      name: 'VLASY Academy',
      href: '/academy',
      image: '/images/editorial/academy-portrait.webp',
      summary: 'Explore professional hair, colour, beauty and bridal training.',
    },
  ];
  return (
    <section
      className="hr-section hr-more home-expertise"
      id="services"
      aria-labelledby="home-services-heading"
    >
      <div className="expertise-heading">
        <ServiceGraphic />
        <div>
          <SectionLabel>SALON & ACADEMY · CHENNAI</SectionLabel>
          <h2 id="home-services-heading">
            What we do
            <br />
            <span>at VLASY.</span>
          </h2>
        </div>
        <div>
          <p>
            From hair replacement and everyday haircuts to bridal makeup and beauty care, explore
            what VLASY offers in Chennai. Each service has its own guide to help you decide what to
            ask before booking.
          </p>
          <Link className="hr-inline-link" href="/services">
            Explore all services
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
      <div className="expertise-grid">
        {offerings.map((item, index) => (
          <Link
            href={item.href}
            className="expertise-card"
            key={item.href}
            aria-label={`Explore ${item.name}`}
          >
            <Photo src={item.image} alt={`${item.name} — AI editorial inspiration`} />
            <div className="expertise-card-content">
              <span className="expertise-index">0{index + 1}</span>
              <h3>{item.name}</h3>
              <p>{item.summary}</p>
              <span className="expertise-card-action">
                Explore {index === 7 ? 'training' : 'service'}
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
