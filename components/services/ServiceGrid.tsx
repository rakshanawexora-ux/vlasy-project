import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/data/services';
import { servicePhotography } from '@/data/service-photography';
import { Photo } from '@/components/ui/Primitives';
export function ServiceGrid({slugs,full=false}:{slugs?:string[];full?:boolean}) {
 const items=slugs?slugs.map(slug=>services.find(s=>s.slug===slug)!).filter(Boolean):services;
 return <div className={`service-grid ${full?'service-grid-full':''}`}>{items.map((s,i)=><Link className="service-tile" href={`/services/${s.slug}`} key={s.slug}><div className="service-card-visual"><Photo src={s.image} alt={`${s.name} editorial reference, not a documented VLASY client result`}/>{full&&<Photo className="service-card-detail" src={servicePhotography[s.slug].frames[0].src} alt={servicePhotography[s.slug].frames[0].alt}/>}<span className="service-card-tag">{s.category}</span></div><div className="service-caption"><span className="tile-number">0{i+1}</span><h3>{s.name}</h3><ArrowUpRight size={23} strokeWidth={1}/></div>{full&&<p>{s.description}</p>}</Link>)}</div>;
}
