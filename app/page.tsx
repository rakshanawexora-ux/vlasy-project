import { Hero } from '@/components/home/Hero';
import { ConfidenceIntro,ReplacementStory,EverydaySection,JourneySection,HonestResults,MoreThanHair,NewLocations,NewFAQ,HairConsultationCTA } from '@/components/home/HairReplacementHome';
import { metadata } from '@/lib/seo';
export const generateMetadata=()=>metadata('Hair Replacement Chennai | VLASY Salon & Academy','Feel like yourself again. Explore personalised, non-surgical hair replacement and ongoing care at VLASY in Kolathur and Madhavaram, Chennai.','/');
export default function Home(){return <div className="replacement-home"><Hero/><ConfidenceIntro/><ReplacementStory/><EverydaySection/><JourneySection/><HonestResults/><MoreThanHair/><NewLocations/><NewFAQ/><HairConsultationCTA/></div>;}
