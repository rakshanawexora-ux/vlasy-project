import { Hero } from '@/components/home/Hero';
import { HomeServices } from '@/components/home/HomeServices';
import {
  ConfidenceIntro,
  ReplacementStory,
  EverydaySection,
  JourneySection,
  HonestResults,
  LocationsSection,
  FAQSection,
  HairConsultationCTA,
} from '@/components/home/sections';
import { Schema } from '@/components/ui/Primitives';
import { services } from '@/data/services';
import { absoluteUrl, metadata } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/constants';
export const generateMetadata = () =>
  metadata(
    'VLASY Salon & Academy | Hair & Beauty in Chennai',
    'Explore VLASY Unisex Salon in Kolathur: wigs, extensions, haircuts, colouring, treatments, grooming, beauty, bridal and nail services for women and men.',
    '/',
  );
export default function Home() {
  return (
    <div className="replacement-home">
      <Hero />
      <HomeServices />
      <ConfidenceIntro />
      <ReplacementStory />
      <EverydaySection />
      <JourneySection />
      <HonestResults />
      <LocationsSection />
      <FAQSection />
      <HairConsultationCTA />
      <Schema
        data={{
          '@context': 'https://schema.org',
          '@type': 'OfferCatalog',
          name: 'VLASY salon services in Chennai',
          url: SITE_CONFIG.url,
          itemListElement: services.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.name,
              url: absoluteUrl(`/services/${service.slug}`),
              areaServed: 'Chennai',
            },
          })),
        }}
      />
    </div>
  );
}
