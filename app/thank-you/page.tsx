import { ActionLink, TextLink, SectionLabel } from '@/components/ui/Primitives';
import { SITE_CONFIG, whatsappUrl } from '@/lib/constants';
import { metadata } from '@/lib/seo';
export const generateMetadata = () => ({
  ...metadata('Thank you', 'Your VLASY enquiry has been received.', '/thank-you'),
  robots: { index: false, follow: false },
});
export default function ThankYou() {
  return (
    <section className="thank-you">
      <SectionLabel>YOUR NEXT CHAPTER BEGINS</SectionLabel>
      <h1>
        Thank <em>you.</em>
      </h1>
      <p>
        Your enquiry has been received.
        <br />
        Our team will review your request and confirm the next step with you.
      </p>
      <div className="button-row">
        <ActionLink href="/transformations">Explore transformations</ActionLink>
        {SITE_CONFIG.whatsapp && <TextLink href={whatsappUrl()}>Chat on WhatsApp</TextLink>}
      </div>
      {/* Add consent-aware Google Ads conversion and Meta Lead tracking here after IDs and privacy choices are configured. */}
    </section>
  );
}
