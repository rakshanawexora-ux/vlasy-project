import Link from 'next/link';
import { ServiceGraphic } from '@/components/brand/ServiceGraphic';
import { SectionLabel } from '@/components/ui/Primitives';
import { services } from '@/data/services';
import { featuredServiceSlugs } from '@/data/featured-services';
import { FeaturedServiceStory } from './FeaturedServiceStory';
import { FeaturedServiceRail } from './FeaturedServiceRail';
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
              Start with our signature hair, beauty and occasion services. Explore the complete menu
              for all nine categories.
            </p>
            <Link className="button featured-all-link" href="/services">
              Explore all services
            </Link>
            <p className="featured-service-hint">5 featured categories · full menu available</p>
          </div>
        </div>
        <div className="featured-service-collection">
          <FeaturedServiceRail total={featured.length}>
            {featured.map((service, index) => (
              <FeaturedServiceStory
                key={service.slug}
                service={service}
                index={index}
                total={featured.length}
              />
            ))}
          </FeaturedServiceRail>
          <div className="featured-services-footer">
            <h3>There is more to explore.</h3>
            <p>
              Hair extensions, treatments, men’s grooming, nail care and more are in the complete
              service menu.
            </p>
            <Link href="/services" className="button">
              Explore all services
            </Link>
          </div>
        </div>
      </div>
      <noscript>
        <style>{'.featured-service-card{opacity:1!important;transform:none!important}'}</style>
      </noscript>
    </section>
  );
}
