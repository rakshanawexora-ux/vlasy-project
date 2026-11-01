import { Plus } from 'lucide-react';
import { faqs } from '@/data/faqs';
import { Schema } from './Primitives';
export function FAQ({category,limit}:{category?:string;limit?:number}) {
 const items=(category?faqs.filter(f=>f.category===category):faqs).slice(0,limit);
 return <><div className="faq-list">{items.map(f=><details key={f.q}><summary>{f.q}<Plus size={18} aria-hidden="true"/></summary><p>{f.a}</p></details>)}</div><Schema data={{'@context':'https://schema.org','@type':'FAQPage',mainEntity:items.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))}}/></>;
}
