import { SectionLabel, TextLink } from '@/components/ui/Primitives';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { SITE_CONFIG, whatsappUrl, phoneUrl } from '@/lib/constants';
import { metadata } from '@/lib/seo';
export const generateMetadata = () =>
  metadata(
    'Contact & appointments',
    'Start your VLASY consultation. Enquire about hair, beauty, bridal and academy programs in Chennai.',
    '/contact',
  );
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const q = await searchParams;
  const branch = q.branch === 'Kolathur' || q.branch === 'Madhavaram' ? q.branch : 'Not Sure';
  return (
    <section className="section page-top contact-layout">
      <div>
        <SectionLabel>A CONVERSATION, FIRST</SectionLabel>
        <h1>
          Talk to the
          <br />
          <em>VLASY team.</em>
        </h1>
        <p className="muted" style={{ marginTop: 25 }}>
          Tell us which service or training program you are interested in. Share your preferred
          branch, date and any questions so the team can discuss the next step.
        </p>
        <div className="contact-info">
          {SITE_CONFIG.phone ? (
            <TextLink href={phoneUrl}>{SITE_CONFIG.phone}</TextLink>
          ) : (
            <p>Use the enquiry form to ask about services, pricing or appointment availability.</p>
          )}
          {SITE_CONFIG.email && (
            <TextLink href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</TextLink>
          )}
          {SITE_CONFIG.whatsapp && <TextLink href={whatsappUrl()}>Chat on WhatsApp</TextLink>}
          <TextLink href="/locations/kolathur">Kolathur, Chennai</TextLink>
          <TextLink href="/locations/madhavaram">Madhavaram, Chennai</TextLink>
        </div>
      </div>
      <EnquiryForm service={q.service || ''} branch={branch} />
    </section>
  );
}
