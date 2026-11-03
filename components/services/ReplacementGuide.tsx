import { SectionLabel } from '@/components/ui/Primitives';
const topics = [
  [
    'What a system does',
    'A non-surgical hair system adds coverage using hair attached to a base that is fitted and blended with your existing hair. It does not regrow hair or treat the cause of hair loss.',
  ],
  [
    'Finding a suitable fit',
    'Discuss your scalp condition, sensitivities, hair-loss pattern and styling preferences. Ask how the base, attachment and hairline will be selected, and how removal works. Seek medical advice for sudden hair loss or an irritated scalp.',
  ],
  [
    'Living with your system',
    'Exercise, Chennai heat, swimming and washing can affect attachment and care. Agree on a routine for your chosen system rather than assuming every activity or product is suitable.',
  ],
  [
    'The full cost of care',
    'Ask for a written breakdown of the system, fitting, cleaning, refits and eventual replacement. Lifespan and maintenance intervals vary; confirm the schedule and ongoing cost before committing.',
  ],
];
export function ReplacementGuide() {
  return (
    <section className="section replacement-guide" aria-labelledby="replacement-guide-heading">
      <SectionLabel>KNOW BEFORE YOU DECIDE</SectionLabel>
      <h2 id="replacement-guide-heading">
        More clarity.
        <br />
        <em>A considered choice.</em>
      </h2>
      <p className="guide-intro">
        Coverage, comfort and ongoing care belong in the same conversation. Here is what to discuss
        at your hair replacement consultation.
      </p>
      <div className="guide-grid">
        {topics.map(([title, copy], i) => (
          <article key={title}>
            <span className="eyebrow">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
      <div className="consultation-checklist">
        <h3>Bring your questions.</h3>
        <p>
          Bring hairstyle references and details of any scalp sensitivities. Ask about realistic
          density, attachment options, a maintenance demonstration and the total care plan. Your
          appointment, specialist availability and pricing are confirmed by the team.
        </p>
      </div>
    </section>
  );
}
