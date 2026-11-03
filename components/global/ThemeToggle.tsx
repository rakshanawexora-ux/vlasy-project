'use client';
import { useEffect,useSyncExternalStore } from 'react';
import { Sun,Moon } from 'lucide-react';
import { usePathname } from 'next/navigation';
const themeEvent='vlasy-theme-change';
let selectedTheme:'light'|'dark'|undefined;
function snapshot(){if(selectedTheme)return selectedTheme;try{return localStorage.getItem('vlasy-theme')==='light'?'light':'dark';}catch{return document.documentElement.dataset.theme==='light'?'light':'dark';}}
function subscribe(notify:()=>void){
 const storage=(event:StorageEvent)=>{if(event.key==='vlasy-theme'&&(event.newValue==='light'||event.newValue==='dark')){selectedTheme=event.newValue;document.documentElement.dataset.theme=event.newValue;updateThemeColor(event.newValue);notify();}};
 window.addEventListener(themeEvent,notify);window.addEventListener('storage',storage);
 return()=>{window.removeEventListener(themeEvent,notify);window.removeEventListener('storage',storage);};
}
function updateThemeColor(theme:string){document.querySelectorAll('meta[name="theme-color"]').forEach(meta=>meta.setAttribute('content',theme==='light'?'#f5f1e9':'#242321'));}
export function ThemeToggle(){
 const path=usePathname();
 const theme=useSyncExternalStore(subscribe,snapshot,()=> 'dark');
 useEffect(()=>{const selected=snapshot();document.documentElement.dataset.theme=selected;updateThemeColor(selected);},[theme,path]);
 const toggle=()=>{const next=theme==='dark'?'light':'dark';selectedTheme=next;document.documentElement.dataset.theme=next;updateThemeColor(next);try{localStorage.setItem('vlasy-theme',next);}catch{}window.dispatchEvent(new Event(themeEvent));};
 return <button type="button" className="theme-toggle" onClick={toggle} aria-label={`Switch to ${theme==='dark'?'light':'dark'} theme`} title={`Switch to ${theme==='dark'?'light':'dark'} theme`}>{theme==='dark'?<Sun size={19} aria-hidden="true"/>:<Moon size={19} aria-hidden="true"/>}</button>;
}
