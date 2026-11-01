import { Hero } from '@/components/home/Hero';
import { BrandIntro,ChooseTransformation,HairReplacementFeature,TransformationsPreview,HairExtensionsFeature,ProcessSection,BeautySection,Testimonials,AcademyPreview,LocationsPreview,FAQPreview,ServiceRibbon } from '@/components/home/HomeSections';
import { FinalCTA } from '@/components/ui/FinalCTA';
import { metadata } from '@/lib/seo';
export const generateMetadata=()=>metadata('VLASY Salon & Academy | Hair, redefined. Chennai','Personalised hair replacement, hair extensions, colour, bridal beauty and professional training at VLASY in Kolathur and Madhavaram, Chennai.','/');
export default function Home(){return <><Hero/><ServiceRibbon/><BrandIntro/><ChooseTransformation/><HairReplacementFeature/><TransformationsPreview/><HairExtensionsFeature/><ProcessSection/><BeautySection/><Testimonials/><AcademyPreview/><LocationsPreview/><FAQPreview/><FinalCTA/></>;}
