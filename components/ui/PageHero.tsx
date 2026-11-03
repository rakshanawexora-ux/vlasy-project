import { SectionLabel, ActionLink } from './Primitives';
export function PageHero({
  label,
  title,
  description,
  cta,
  href = '/contact',
}: {
  label: string;
  title: string;
  description?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="page-hero">
      <SectionLabel>{label}</SectionLabel>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      {cta && <ActionLink href={href}>{cta}</ActionLink>}
    </section>
  );
}
