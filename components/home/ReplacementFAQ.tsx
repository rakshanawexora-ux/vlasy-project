import { Plus } from 'lucide-react';
import { replacementFaqs } from '@/data/hair-replacement';
import { Schema } from '@/components/ui/Primitives';
export function ReplacementFAQ(){return <><div className="hr-faq-list">{replacementFaqs.map((f,i)=><details key={f.q}><summary><span>0{i+1}</span><h3>{f.q}</h3><Plus size={19} aria-hidden="true"/></summary><p>{f.a}</p></details>)}</div><Schema data={{'@context':'https://schema.org','@type':'FAQPage',mainEntity:replacementFaqs.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))}}/></>;}
