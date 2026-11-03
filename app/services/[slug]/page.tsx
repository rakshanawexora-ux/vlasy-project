import { ServiceLead } from '@/components/services/ServiceLead';
import { ServicePhotoStory } from '@/components/services/ServicePhotoStory';
import { ComparisonSection } from '@/components/transformations/ComparisonSection';
import { ReplacementGuide } from '@/components/services/ReplacementGuide';
import { notFound } from 'next/navigation';
import { services, getService } from '@/data/services';
import { PageHero } from '@/components/ui/PageHero';
import { SectionLabel, Schema } from '@/components/ui/Primitives';
import { Process } from '@/components/services/Process';
import { FAQ } from '@/components/ui/FAQ';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { metadata, absoluteUrl } from '@/lib/seo';
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  return s ? metadata(`${s.name} in Chennai`, s.description, `/services/${s.slug}`) : {};
}
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
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
        <h2>What you can discuss with us</h2>
        <div className="offerings">
          {s.offerings.map((o, i) => (
            <div className="offering" key={o}>
              <span>0{i + 1}</span>
              <h3>{o}</h3>
              <p>{s.offeringDetails[i]}</p>
            </div>
          ))}
        </div>
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
      {s.slug === 'hair-replacement' && (
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
