import { PageHero } from '@/components/ui/PageHero';
import { ServiceGrid } from '@/components/services/ServiceGrid';
import { FinalCTA } from '@/components/ui/FinalCTA';
import { metadata } from '@/lib/seo';
export const generateMetadata=()=>metadata('Our services','Explore hair replacement, extensions, colour, cuts, bridal beauty and mehndi at VLASY Chennai.','/services');
export default function Services(){return <><PageHero label="THE ART OF YOU" title="Services designed around you." description="Your individuality is our starting point. Find the expertise, care and possibilities to express it."/>{[['Hair transformation',['hair-replacement','hair-extensions']],['Hair services',['hair-colour','hair-cut-styling']],['Beauty & occasion',['bridal','beauty-treatments','mehndi']]].map(([name,slugs])=><section className="section" key={name as string}><div className="section-heading"><h2>{name}</h2></div><ServiceGrid full slugs={slugs as string[]}/></section>)}<FinalCTA/></>;}
