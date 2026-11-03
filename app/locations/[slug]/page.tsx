import { notFound } from 'next/navigation';
import { locations } from '@/data/locations';
import { PageHero } from '@/components/ui/PageHero';
import { Photo, SectionLabel, Schema, TextLink } from '@/components/ui/Primitives';
import { ServiceGrid } from '@/components/services/ServiceGrid';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { MapPin } from 'lucide-react';
import { metadata, absoluteUrl } from '@/lib/seo';
export const generateStaticParams = () => locations.map((l) => ({ slug: l.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = locations.find((l) => l.slug === slug);
  return l
    ? metadata(
        `VLASY ${l.name}`,
        `Explore VLASY Salon & Academy in ${l.name}, Chennai. Enquire about services and appointments.`,
        `/locations/${slug}`,
      )
    : {};
}
export default async function Branch({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = locations.find((l) => l.slug === slug);
  if (!l) notFound();
  return (
    <>
      <PageHero
        label="VLASY / CHENNAI"
        title={`Your space in ${l.name}.`}
        description="Personal care, considered transformations and a little time for you."
        cta="Book at this branch"
        href="#branch-enquiry"
      />
      <Photo
        className="page-image"
        src={l.image}
        alt={`Editorial salon inspiration; replace with real ${l.name} branch photography`}
      />
      <section className="section page-split">
        <div>
          <SectionLabel>PLAN YOUR VISIT</SectionLabel>
          <h2>
            {l.name},<br />
            <em>Chennai.</em>
          </h2>
          <p>{l.address || 'The full branch address will be added after confirmation.'}</p>
          <p>{l.hours || 'Contact the team for current opening hours.'}</p>
          <TextLink href={`/contact?branch=${l.name}`}>Ask for directions & availability</TextLink>
        </div>
        <div className="branch-map">
          <MapPin size={32} strokeWidth={1} />
          <h3>Find your way.</h3>
          <p>
            {l.map
              ? 'Open the confirmed branch location below.'
              : 'A verified map pin will be added with the full address.'}
          </p>
          {l.map && <TextLink href={l.map}>Get directions</TextLink>}
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <h2>Find your next look.</h2>
        </div>
        <ServiceGrid slugs={['hair-replacement', 'hair-extensions', 'hair-colour']} />
      </section>
      <section className="section page-split" id="branch-enquiry">
        <div>
          <SectionLabel>A PERSONAL EXPERIENCE</SectionLabel>
          <h2>
            Make time
            <br />
            <em>for yourself.</em>
          </h2>
          <p>
            Share your preferred service and date. Our team will confirm availability and
            appointment details.
          </p>
          <p>
            Verified branch reviews and original salon photographs will be added when available.
          </p>
        </div>
        <EnquiryForm branch={l.name as 'Kolathur' | 'Madhavaram'} />
      </section>
      <Schema
        data={{
          '@context': 'https://schema.org',
          '@type': 'BeautySalon',
          name: `VLASY Salon & Academy — ${l.name}`,
          url: absoluteUrl(`/locations/${slug}`),
          areaServed: { '@type': 'Place', name: `${l.name}, Chennai` },
          ...(l.address
            ? {
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: l.address,
                  addressLocality: 'Chennai',
                  addressRegion: 'Tamil Nadu',
                  addressCountry: 'IN',
                },
              }
            : {}),
        }}
      />
    </>
  );
}
