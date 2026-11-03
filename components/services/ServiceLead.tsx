import { Photo } from '@/components/ui/Primitives';
import { servicePhotography } from '@/data/service-photography';
export function ServiceLead({slug,src,name}:{slug:string;src:string;name:string}){
 const detail=servicePhotography[slug].frames[0];
 return <div className="service-lead-pair"><Photo className="service-lead-main" src={src} alt={`${name} — AI editorial inspiration, not a documented VLASY result` } priority/><Photo className="service-lead-detail" src={detail.src} alt={detail.alt}/></div>;
}
