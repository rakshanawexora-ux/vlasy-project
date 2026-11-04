import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ServiceGraphic } from '@/components/brand/ServiceGraphic';
import { Photo, SectionLabel } from '@/components/ui/Primitives';
import { services } from '@/data/services';
import { serviceImageAudience } from '@/data/service-photography';
export function HomeServices() {
  return (
    <section
      className="hr-section hr-more home-expertise"
      id="services"
      aria-labelledby="home-services-heading"
    >
      <div className="expertise-heading">
        <ServiceGraphic />
        <div>
          <SectionLabel>VLASY UNISEX SALON · KOLATHUR</SectionLabel>
          <h2 id="home-services-heading">
            What we do
            <br />
            <span>at VLASY.</span>
          </h2>
        </div>
        <div>
          <p>
            Nine service categories for your hair, beauty and grooming routine. Explore the complete
            menu for women and men, from hair systems and colouring to bridal looks and nail care.
          </p>
          <Link className="hr-inline-link" href="/services">
            View the complete services menu
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
      <div className="expertise-grid">
        {services.map((service, index) => (
          <Link
            href={`/services/${service.slug}`}
            className="expertise-card"
            key={service.slug}
            aria-label={`Explore ${service.shortName}`}
          >
            <Photo
              src={service.image}
              alt={`${service.shortName} — AI editorial inspiration`}
              imageAudience={serviceImageAudience(service)}
            />
            <div className="expertise-card-content">
              <span className="expertise-index">0{index + 1}</span>
              <h3>{service.shortName}</h3>
              <p>{service.description}</p>
              <span className="expertise-card-action">
                View services
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <Link href="/academy" className="home-academy-feature" aria-label="Explore VLASY Academy">
        <Photo
          src="/images/editorial/academy-portrait.webp"
          alt="AI editorial illustration of female students learning hairstyling"
          imageAudience="women"
        />
        <div>
          <SectionLabel>VLASY ACADEMY</SectionLabel>
          <h3>Turn your interest into a learning path.</h3>
          <p>Explore professional hair, colour, beauty and bridal training.</p>
          <span className="expertise-card-action">
            Explore training
            <ArrowUpRight size={18} />
          </span>
        </div>
      </Link>
    </section>
  );
}
