'use client';
import { useState } from 'react';
import { ArrowUpRight,Plus,Minus } from 'lucide-react';
import Link from 'next/link';
import { replacementSteps,hairConsultationUrl } from '@/data/hair-replacement';
export function ReplacementJourney(){
 const [active,setActive]=useState(0);
 return <div className="hr-journey-interactive"><div className="hr-journey-list">{replacementSteps.map((s,i)=><div className={`hr-step ${active===i?'hr-step-active':''}`} key={s.number}><h3><button aria-expanded={active===i} aria-controls={`step-${i}`} onClick={()=>setActive(i)}><span>{s.number}</span>{s.short}{active===i?<Minus size={18}/>:<Plus size={18}/>}</button></h3><div id={`step-${i}`} hidden={active!==i}><p>{s.copy}</p></div></div>)}</div><div className="hr-journey-card" aria-live="polite"><span className="hr-journey-number">{replacementSteps[active].number}<span>/ 04</span></span><div><h3>{replacementSteps[active].title}</h3><p>{replacementSteps[active].detail}</p><Link href={hairConsultationUrl}>Start with a consultation<ArrowUpRight size={18}/></Link></div></div></div>;
}
