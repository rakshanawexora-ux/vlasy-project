import { Hero } from '@/components/home/Hero';
import { ConfidenceIntro,ReplacementStory,EverydaySection,JourneySection,HonestResults,MoreThanHair,NewLocations,NewFAQ,HairConsultationCTA } from '@/components/home/HairReplacementHome';
import { metadata } from '@/lib/seo';
export const generateMetadata=()=>metadata('VLASY Salon & Academy | Hair, Beauty & Training in Chennai','Explore non-surgical hair replacement, hair extensions, colour, styling, bridal, beauty, mehndi and professional training at VLASY in Chennai.','/');
export default function Home(){return <div className="replacement-home"><Hero/><MoreThanHair/><ConfidenceIntro/><ReplacementStory/><EverydaySection/><JourneySection/><HonestResults/><NewLocations/><NewFAQ/><HairConsultationCTA/></div>;}
