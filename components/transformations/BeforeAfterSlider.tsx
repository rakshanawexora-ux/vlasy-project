"use client";
import { useId, useState } from 'react';
import Image from 'next/image';
import { MoveHorizontal } from 'lucide-react';

export function BeforeAfterSlider({ before, after, alt }: { before: string; after: string; alt: string }) {
 const id = useId();
 const [value, setValue] = useState(50);
 return <figure className="comparison" aria-labelledby={`${id}-title`}>
  <figcaption id={`${id}-title`}><strong>Illustrative comparison · not a client result</strong><p>Two separate editorial portraits demonstrate the comparison control. They are not a matched before-and-after pair or evidence of a treatment outcome.</p></figcaption>
  <div className="before-after">
   <Image fill src={after} alt={`Right editorial portrait: ${alt}`} sizes="(max-width:700px) 100vw, 50vw" />
   <div className="before-image" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}><Image fill src={before} alt={`Left editorial portrait: ${alt}`} sizes="(max-width:700px) 100vw, 50vw" /></div>
   <span className="before-label">Illustration A</span><span className="after-label">Illustration B</span>
   <div className="slider-line" style={{ left: `${value}%` }} aria-hidden="true"><span><MoveHorizontal size={22}/></span></div>
  </div>
  <div className="comparison-control"><label htmlFor={id}>Compare illustrative portraits</label><output htmlFor={id}>{value}% left image</output>
   <input id={id} type="range" min="0" max="100" step="1" value={value} aria-valuetext={`${value}% of illustration A visible`} aria-describedby={`${id}-help`} onChange={e => setValue(Number(e.target.value))}/>
   <p id={`${id}-help`}>Drag the control or use the arrow keys. Home and End reveal either image in full.</p>
  </div>
 </figure>;
}
