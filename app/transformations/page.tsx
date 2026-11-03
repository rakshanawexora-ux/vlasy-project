import { ComparisonSection } from '@/components/transformations/ComparisonSection';
import { PageHero } from '@/components/ui/PageHero';
import { TransformationGallery } from '@/components/transformations/TransformationGallery';
import { FinalCTA } from '@/components/ui/FinalCTA';
import { metadata } from '@/lib/seo';
export const generateMetadata=()=>metadata('Transformation inspiration','Explore hair, colour and bridal inspiration for your next VLASY consultation.','/transformations');
export default function Transformations(){return <><PageHero label="THE POSSIBILITIES" title="A new look. A new perspective." description="Explore directions for your next chapter. These editorial images illustrate our visual direction; consented VLASY client stories and real before-and-after results will be added here."/><section className="section"><TransformationGallery/></section><ComparisonSection/><FinalCTA/></>;}
