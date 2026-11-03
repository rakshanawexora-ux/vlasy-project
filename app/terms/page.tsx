import { PageHero } from '@/components/ui/PageHero';
import { metadata } from '@/lib/seo';
export const generateMetadata = () =>
  metadata('Terms of use', 'VLASY Salon & Academy — terms of use.', '/terms');
export default function Page() {
  return (
    <>
      <PageHero label="VLASY / INFORMATION" title="Terms of use" />
      <div className="section simple-content">
        <p className="legal-note">
          Pre-launch information. Business-specific legal details must be reviewed and completed
          before publication.
        </p>
        <section>
          <h2>Consultations & appointments</h2>
          <p>
            Submitting an enquiry does not confirm an appointment. Services, dates, availability and
            pricing must be agreed with the VLASY team.
          </p>
        </section>
        <section>
          <h2>Individual results</h2>
          <p>
            Hair and beauty results depend on your individual circumstances, suitability,
            maintenance and the agreed service. Editorial photographs on this site are illustrative
            and do not represent documented client outcomes.
          </p>
        </section>
        <section>
          <h2>Academy information</h2>
          <p>
            Program areas are an initial guide. Confirm course availability, syllabus, fees,
            schedules and certification in writing before enrolment. No employment or income result
            is guaranteed.
          </p>
        </section>
        <section>
          <h2>Site status</h2>
          <p>
            This is a pre-launch website. Business contact details and final booking, cancellation
            and payment terms are pending confirmation. No online payment is collected.
          </p>
        </section>
      </div>
    </>
  );
}
