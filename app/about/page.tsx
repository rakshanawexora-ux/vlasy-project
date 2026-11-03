import { PageHero } from '@/components/ui/PageHero';
import { SectionLabel, Photo } from '@/components/ui/Primitives';
import { Process } from '@/components/services/Process';
import { LocationCards } from '@/components/locations/LocationCards';
import { FinalCTA } from '@/components/ui/FinalCTA';
import { metadata } from '@/lib/seo';
export const generateMetadata = () =>
  metadata(
    'About VLASY Salon & Academy in Chennai',
    'Get to know VLASY in Kolathur and Madhavaram, Chennai. Explore our hair and beauty services, personal consultations and professional training.',
    '/about',
  );
export default function About() {
  return (
    <>
      <PageHero
        label="THE VLASY STORY"
        title="Get to know VLASY."
        description="Hair, beauty and professional training in Chennai, with a conversation before every recommendation. Find us in Kolathur and Madhavaram."
      />
      <Photo
        className="page-image"
        src="/images/editorial/salon-portrait.webp"
        alt="AI-generated editorial interior with styling chairs, mirrors and natural daylight; not a VLASY branch"
      />
      <section className="section page-split">
        <div>
          <SectionLabel>OUR PHILOSOPHY</SectionLabel>
          <h2>
            Artistry.
            <br />
            Personal care.
            <br />
            <em>Possibility.</em>
          </h2>
        </div>
        <div>
          <p>
            VLASY Salon & Academy brings together hair services, beauty care and professional
            training in Chennai. Whether you are considering a hair system or simply ready for a
            haircut, we start by listening to what you want and what will work with your routine.
          </p>
          <p>
            You can ask about the method, preparation, maintenance and cost before deciding. We want
            you to understand the appointment as clearly as the look you have in mind.
          </p>
        </div>
      </section>
      <section className="section">
        <SectionLabel>THE TRANSFORMATION APPROACH</SectionLabel>
        <h2>Thoughtful, from start to finish.</h2>
        <Process />
      </section>
      <section className="section page-split">
        <Photo
          src="/images/editorial/academy-portrait.webp"
          alt="AI-generated scene of an instructor and adult students practising hair sectioning"
        />
        <div>
          <SectionLabel>PEOPLE & PLACE</SectionLabel>
          <h2>
            Room to feel
            <br />
            <em>at home.</em>
          </h2>
          <p>
            Use your consultation to share references, ask questions and discuss any sensitivities
            or past treatments. The team will confirm the service, branch, pricing and appointment
            details with you.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <h2>Two spaces. One philosophy.</h2>
        </div>
        <LocationCards />
      </section>
      <FinalCTA />
    </>
  );
}
