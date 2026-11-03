import { ActionLink, SectionLabel } from '@/components/ui/Primitives';
export default function NotFound() {
  return (
    <section className="thank-you">
      <SectionLabel>404 / A DIFFERENT DIRECTION</SectionLabel>
      <h1>
        Let’s find
        <br />
        <em>your way.</em>
      </h1>
      <p>This page is not available. Your next chapter is still waiting.</p>
      <ActionLink href="/">Back to VLASY</ActionLink>
    </section>
  );
}
