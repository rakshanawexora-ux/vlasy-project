import { PageHero } from '@/components/ui/PageHero';
import { LocationCards } from '@/components/locations/LocationCards';
import { FinalCTA } from '@/components/ui/FinalCTA';
import { metadata } from '@/lib/seo';
export const generateMetadata=()=>metadata('Our Chennai salons','Find VLASY Salon & Academy in Kolathur and Madhavaram, Chennai. Enquire about branch details and appointments.','/locations');
export default function Locations(){return <><PageHero label="FIND YOUR SPACE" title="Your next chapter. Closer to you." description="Visit VLASY in Kolathur or Madhavaram. Two spaces for considered care and a little time for yourself."/><section className="section"><LocationCards/></section><FinalCTA/></>;}
