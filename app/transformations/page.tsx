import { ComparisonSection } from '@/components/transformations/ComparisonSection';
import { PageHero } from '@/components/ui/PageHero';
import { TransformationGallery } from '@/components/transformations/TransformationGallery';
import { FinalCTA } from '@/components/ui/FinalCTA';
import { metadata } from '@/lib/seo';
export const generateMetadata = () =>
  metadata(
    'Transformation inspiration',
    'Explore hair, colour and bridal inspiration for your next VLASY consultation.',
    '/transformations',
  );
export default function Transformations() {
  return (
    <>
      <PageHero
        label="THE POSSIBILITIES"
        title="Hair and beauty inspiration."
        description="Bring a reference to your consultation. These AI-created editorial images illustrate style ideas; they are not photographs of VLASY clients or proof of treatment results."
      />
      <section className="section">
        <TransformationGallery />
      </section>
      <ComparisonSection />
      <FinalCTA />
    </>
  );
}
