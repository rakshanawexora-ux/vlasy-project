import { getSubServices } from '@/data/sub-services';
import { SubServiceGallery } from './SubServiceGallery';
import { notFound } from 'next/navigation';
import { getService } from '@/data/services';
import { metadata, absoluteUrl } from '@/lib/seo';
import { PageHero } from '@/components/ui/PageHero';
import { SectionLabel, Schema } from '@/components/ui/Primitives';
import { ServiceLead } from './ServiceLead';
import { ServicePhotoStory } from './ServicePhotoStory';
import { Process } from './Process';
import { ReplacementGuide } from './ReplacementGuide';
import { ComparisonSection } from '@/components/transformations/ComparisonSection';
import { FAQ } from '@/components/ui/FAQ';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
export function servicePageMetadata(slug: string) {
  const service = getService(slug);
  return service
    ? metadata(`${service.shortName} in Chennai`, service.description, `/services/${service.slug}`)
    : {};
}
export function ServiceDetailPage({ slug }: { slug: string }) {
  const s = getService(slug);
  if (!s) notFound();
  const category = s.faqCategory;
  return (
    <>
      <PageHero
        label={s.name}
        title={`${s.name} in Chennai`}
        description={s.description}
        cta="Talk to a specialist"
        href="#consultation"
      />
      <ServiceLead slug={s.slug} src={s.image} name={s.name} />
      <section className="section page-split">
        <div>
          <SectionLabel>PERSONAL, FROM THE START</SectionLabel>
          <h2>{s.introHeading}</h2>
          <p>{s.audience}</p>
        </div>
        <div>
          <SectionLabel>OUR APPROACH</SectionLabel>
          <h3>What to discuss at your consultation</h3>
          <p>{s.consultation}</p>
        </div>
      </section>
      <section className="section">
        <SectionLabel>YOUR SERVICE OPTIONS</SectionLabel>
        <h2>Find your service.</h2>
        <p className="service-options-intro">
          Browse the options below. Select Enquire to tell us exactly which service you would like
          to discuss.
        </p>
        <SubServiceGallery category={s.shortName} serviceName={s.name} items={getSubServices(s)} />
      </section>
      <ServicePhotoStory slug={s.slug} />
      <section className="section">
        <SectionLabel>HOW IT WORKS</SectionLabel>
        <h2>
          Your next chapter,
          <br />
          <em>step by step.</em>
        </h2>
        <Process />
      </section>
      <section className="section page-split">
        <div>
          <SectionLabel>BEFORE YOUR APPOINTMENT</SectionLabel>
          <h2>Arrive with your questions.</h2>
        </div>
        <p>{s.preparation}</p>
      </section>
      <section className="section page-split">
        <div>
          <SectionLabel>BEYOND THE SALON</SectionLabel>
          <h2>
            A little care.
            <br />
            <em>A lasting difference.</em>
          </h2>
        </div>
        <p>{s.care}</p>
      </section>
      {s.slug === 'hair-wig-hair-replacement' && (
        <>
          <ReplacementGuide />
          <ComparisonSection />
        </>
      )}
      <section className="section faq-preview">
        <h2>A little clarity.</h2>
        <FAQ category={category} />
      </section>
      <section className="section page-split" id="consultation">
        <div>
          <SectionLabel>LET’S BEGIN</SectionLabel>
          <h2>Ask about {s.name.toLowerCase()}.</h2>
          <p>
            Tell us a little about you. Our team will discuss suitable options, availability and
            pricing before your appointment is confirmed.
          </p>
        </div>
        <EnquiryForm service={s.name} />
      </section>
      <Schema
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: s.name,
          description: s.description,
          url: absoluteUrl(`/services/${s.slug}`),
          areaServed: 'Chennai',
          provider: { '@type': 'BeautySalon', name: 'VLASY Salon & Academy' },
        }}
      />
    </>
  );
}
