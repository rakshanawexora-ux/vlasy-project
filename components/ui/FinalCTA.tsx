import { ActionLink, SectionLabel, TextLink } from './Primitives';
import { whatsappUrl } from '@/lib/constants';
export function FinalCTA() {
  return (
    <section className="final-cta">
      <SectionLabel>YOUR NEXT CHAPTER</SectionLabel>
      <h2>
        Have a service
        <br />
        <em>in mind?</em>
      </h2>
      <p>
        Tell us what you are looking for. We will discuss suitable options, pricing and appointment
        availability.
      </p>
      <div className="button-row">
        <ActionLink href="/contact">Request an appointment</ActionLink>
        <TextLink href={whatsappUrl()}>WhatsApp us</TextLink>
      </div>
    </section>
  );
}
