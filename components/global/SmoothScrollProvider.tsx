'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
export function SmoothScrollProvider() {
 const pathname=usePathname();
 useEffect(()=>{
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
 const lenis=new Lenis({duration:0.8,smoothWheel:true,autoRaf:true,anchors:true});
 return ()=>lenis.destroy();
 },[pathname]);
 return null;
}
