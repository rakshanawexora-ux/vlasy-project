'use client';
import { useState } from 'react';
import Image from 'next/image';
export function BeforeAfterSlider({before,after,alt}:{before:string;after:string;alt:string}){
 const [value,setValue]=useState(50);
 return <figure className="before-after"><Image fill src={after} alt={`After: ${alt}`} sizes="(max-width:700px) 100vw, 50vw"/><div className="before-image" style={{clipPath:`inset(0 ${100-value}% 0 0)`}}><Image fill src={before} alt={`Before: ${alt}`} sizes="(max-width:700px) 100vw, 50vw"/></div><div className="slider-line" style={{left:`${value}%`}}/><span className="before-label">Before</span><span className="after-label">After</span><label className="sr-only" htmlFor="compare-range">Compare before and after photographs</label><input id="compare-range" type="range" min="0" max="100" value={value} onChange={e=>setValue(Number(e.target.value))}/></figure>;
}
