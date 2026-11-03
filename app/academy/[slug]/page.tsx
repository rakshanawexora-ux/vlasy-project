import Link from 'next/link';
import { notFound } from 'next/navigation';
import { programs, getProgram } from '@/data/academy';
import { PageHero } from '@/components/ui/PageHero';
import { Photo, SectionLabel, TextLink } from '@/components/ui/Primitives';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { metadata } from '@/lib/seo';
export const generateStaticParams = () => programs.map((program) => ({ slug: program.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const program = getProgram((await params).slug);
  return program
    ? metadata(
        `${program.name} training in Chennai`,
        program.description,
        `/academy/${program.slug}`,
      )
    : {};
}
export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const program = getProgram((await params).slug);
  if (!program) notFound();
  return (
    <>
      <PageHero
        label="VLASY ACADEMY / PROGRAM AREA"
        title={program.name}
        description={program.description}
        cta="Enquire about this program"
        href="#program-enquiry"
      />
      <div className="service-lead-pair">
        <Photo
          src={program.image}
          alt={`${program.name} — AI-generated editorial illustration, not a VLASY class photograph`}
          priority
        />
        <Photo
          src="/images/editorial/academy-portrait.webp"
          alt="AI editorial illustration of an instructor demonstrating hair sectioning to adult students"
        />
      </div>
      <section className="section">
        <nav className="detail-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/academy">Academy</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{program.name}</span>
        </nav>
        <SectionLabel>EXPLORE YOUR DIRECTION</SectionLabel>
        <h2>
          A closer look at
          <br />
          <em>your learning path.</em>
        </h2>
        <div className="program-focus-list">
          {program.focus.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section page-split">
        <div>
          <SectionLabel>MAKE AN INFORMED CHOICE</SectionLabel>
          <h2>
            Clear details.
            <br />
            <em>A considered next step.</em>
          </h2>
        </div>
        <div>
          <p>
            These program areas are an introductory guide. Ask the academy to confirm the current
            syllabus, eligibility, duration, schedule, fees and materials before enrolling.
          </p>
          <p>
            Request written details of practical training, assessment, certification and any career
            support. A place, qualification or employment outcome is not guaranteed by this page.
          </p>
          <TextLink href="/academy">Explore all training areas</TextLink>
        </div>
      </section>
      <section className="section page-split" id="program-enquiry">
        <div>
          <SectionLabel>LET’S TALK TRAINING</SectionLabel>
          <h2>
            Interested in
            <br />
            <em>{program.name}?</em>
          </h2>
          <p>
            Tell us your experience and what you would like to learn. Mention this program in your
            enquiry and request the current course guide.
          </p>
        </div>
        <EnquiryForm service="Academy" />
      </section>
    </>
  );
}
