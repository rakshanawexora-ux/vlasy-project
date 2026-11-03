import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { Photo } from '@/components/ui/Primitives';
import { articles } from '@/data/journal';
import { metadata } from '@/lib/seo';
export const generateMetadata = () =>
  metadata(
    'The VLASY journal',
    'Thoughtful reads on hair replacement, extensions, colour and everyday hair care.',
    '/journal',
  );
export default function Journal() {
  return (
    <>
      <PageHero
        label="THE VLASY JOURNAL"
        title="Hair care and consultation guides."
        description="Practical reading before your appointment, from choosing a hair system to understanding extensions and caring for coloured hair."
      />
      <section className="section journal-grid">
        {articles.map((a) => (
          <Link key={a.slug} href={`/journal/${a.slug}`}>
            <Photo src={a.image} alt={`${a.category} editorial inspiration`} />
            <span className="small-label" style={{ marginTop: 20 }}>
              {a.category}
            </span>
            <h2>{a.title}</h2>
            <p>{a.intro}</p>
            <span className="text-link">Read the story ↗</span>
          </Link>
        ))}
      </section>
    </>
  );
}
