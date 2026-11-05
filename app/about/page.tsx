import { PageHero } from '@/components/ui/PageHero';
import { SectionLabel, Photo } from '@/components/ui/Primitives';
import { Process } from '@/components/services/Process';
import { FinalCTA } from '@/components/ui/FinalCTA';
import { metadata } from '@/lib/seo';
export const generateMetadata = () =>
  metadata(
    'About VLASY Unisex Salon in Chennai',
    'Get to know VLASY in Kolathur, Chennai. Explore our hair and beauty services and personal consultations.',
    '/about',
  );
export default function About() {
  return (
    <>
      <PageHero
        label="THE VLASY STORY"
        title="Get to know VLASY."
        description="Hair and beauty in Chennai, with a conversation before every recommendation. Find us in Kolathur."
      />
      <Photo
        className="page-image"
        src="/images/studio-v2/salon-portrait.webp"
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
            VLASY Unisex Salon brings together hair services and beauty care in Chennai. Whether you
            are considering a hair system or simply ready for a haircut, we start by listening to
            what you want and what will work with your routine.
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
          src="/images/studio-v2/salon-process.webp"
          alt="AI editorial illustration of a stylist discussing hair preferences with a client"
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
      <FinalCTA />
    </>
  );
}
