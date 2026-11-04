import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ServiceGraphic } from '@/components/brand/ServiceGraphic';
import { Photo, SectionLabel } from '@/components/ui/Primitives';
import { services } from '@/data/services';
import { featuredServiceSlugs } from '@/data/featured-services';
import { FeaturedServiceStory } from './FeaturedServiceStory';
export function HomeServices() {
  const featured = featuredServiceSlugs.map(
    (slug) => services.find((service) => service.slug === slug)!,
  );
  return (
    <section
      className="hr-section hr-more home-expertise featured-expertise"
      id="services"
      aria-labelledby="home-services-heading"
    >
      <div className="featured-service-layout">
        <div className="expertise-heading featured-service-intro">
          <ServiceGraphic />
          <div>
            <SectionLabel>SELECTED SERVICES · VLASY KOLATHUR</SectionLabel>
            <h2 id="home-services-heading">
              What we do
              <br />
              <span>at VLASY.</span>
            </h2>
            <p className="featured-intro-copy">
              A few places to begin. Explore signature hair, beauty and occasion services as you
              scroll, then open the complete menu to see all nine categories.
            </p>
            <Link className="button featured-all-link" href="/services">
              Explore all services
              <ArrowUpRight size={18} />
            </Link>
            <p className="featured-service-hint">5 featured categories · full menu available</p>
          </div>
        </div>
        <div className="expertise-grid featured-story-list">
          {featured.map((service, index) => (
            <FeaturedServiceStory
              key={service.slug}
              service={service}
              index={index}
              total={featured.length}
            />
          ))}
          <div className="featured-services-footer">
            <h3>There is more to explore.</h3>
            <p>
              Hair extensions, treatments, men’s grooming, nail care and more are in the complete
              service menu.
            </p>
            <Link href="/services" className="button">
              Explore all services
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
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
      <noscript>
        <style>{'.featured-service-card{opacity:1!important;transform:none!important}'}</style>
      </noscript>
    </section>
  );
}
