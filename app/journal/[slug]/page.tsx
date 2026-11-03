import { notFound } from 'next/navigation';
import { articles } from '@/data/journal';
import { PageHero } from '@/components/ui/PageHero';
import { Photo } from '@/components/ui/Primitives';
import { FinalCTA } from '@/components/ui/FinalCTA';
import { metadata } from '@/lib/seo';
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  return a ? metadata(a.title, a.intro, `/journal/${slug}`) : {};
}
export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  return (
    <>
      <PageHero label={`THE JOURNAL / ${a.category}`} title={a.title} description={a.intro} />
      <Photo className="page-image" src={a.image} alt={`${a.category} editorial inspiration`} />
      <article className="section article-body">
        {a.sections.map(([h, p]) => (
          <section key={h}>
            <h2>{h}</h2>
            <p>{p}</p>
          </section>
        ))}
        <p>
          These general notes do not replace an individual consultation. Your specialist can explain
          what applies to your hair and routine.
        </p>
      </article>
      <FinalCTA />
    </>
  );
}
