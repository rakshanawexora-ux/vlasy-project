'use client';
import { useState,useRef,useEffect } from 'react';
import { ArrowUpRight,X } from 'lucide-react';
import { transformations,transformationCategories } from '@/data/transformations';
import { Photo } from '@/components/ui/Primitives';
export function TransformationGallery({preview=false}:{preview?:boolean}){
 const [category,setCategory]=useState('All');const [selected,setSelected]=useState<typeof transformations[number]|null>(null);const dialog=useRef<HTMLDialogElement>(null);const trigger=useRef<HTMLButtonElement|null>(null);
 useEffect(()=>{if(selected)dialog.current?.showModal();else if(dialog.current?.open){dialog.current.close();trigger.current?.focus();}},[selected]);
 const matches=transformations.filter(t=>category==='All'||t.category===category);const items=preview?matches.slice(0,3):matches;
 return <><div className="gallery-filters" aria-label="Filter transformation inspiration">{transformationCategories.map(c=><button key={c} onClick={()=>setCategory(c)} aria-pressed={c===category}>{c}</button>)}</div><div className="transformation-grid">{items.map((t,i)=><button key={t.id} className={`transformation-tile tile-${i}`} onClick={e=>{trigger.current=e.currentTarget;setSelected(t);}}><Photo src={t.image} alt={`${t.title} — editorial placeholder`}/><div><span className="small-label">{t.category}</span><ArrowUpRight size={21}/></div><h3>{t.title}</h3></button>)}</div><p className="image-note">EDITORIAL INSPIRATION · REAL VLASY CLIENT STORIES COMING SOON</p><dialog data-lenis-prevent ref={dialog} className="gallery-dialog" onCancel={()=>setSelected(null)} onClick={e=>{if(e.target===e.currentTarget)setSelected(null);}} aria-label={selected?.title||'Gallery image'}><button aria-label="Close gallery" className="dialog-close" onClick={()=>setSelected(null)}><X/></button>{selected&&<><Photo src={selected.image} alt={`${selected.title} — placeholder editorial photograph`}/><div className="gallery-detail"><span className="eyebrow">{selected.category}</span><h2>{selected.title}</h2><p>{selected.detail}</p></div></>}</dialog></>;
}
