'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect,useRef,useState } from 'react';
import { ArrowUpRight,ChevronDown,Menu,X } from 'lucide-react';
import { navigation } from '@/data/navigation';
import { services } from '@/data/services';
import { ThemeToggle } from '@/components/global/ThemeToggle';
import { Logo } from '@/components/ui/Logo';
export function Header() {
 const menuButton=useRef<HTMLButtonElement>(null);const servicesButton=useRef<HTMLButtonElement>(null);
 const path=usePathname(); const [scrolled,setScrolled]=useState(false); const [hidden,setHidden]=useState(false); const [mobile,setMobile]=useState(false); const [mega,setMega]=useState(false);
 useEffect(()=>{let prev=window.scrollY; const scroll=()=>{const y=window.scrollY;setScrolled(y>35);setHidden(y>500&&y>prev);prev=y;};window.addEventListener('scroll',scroll,{passive:true});return()=>window.removeEventListener('scroll',scroll);},[]);
 useEffect(()=>{if(!mobile&&!mega)return; const escape=(e:KeyboardEvent)=>{if(e.key==='Escape'){setMobile(false);setMega(false);(mega?servicesButton.current:menuButton.current)?.focus();}if(mobile&&e.key==='Tab'){const targets=Array.from(document.querySelectorAll<HTMLElement>('.site-header .brand-link, .site-header .header-book, .theme-toggle, .menu-toggle, #mobile-nav a'));const first=targets[0],last=targets[targets.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}};document.addEventListener('keydown',escape);const original=document.body.style.overflow;if(mobile)document.body.style.overflow='hidden';return()=>{document.removeEventListener('keydown',escape);document.body.style.overflow=original;};},[mobile,mega]);
 const close=()=>{setMobile(false);setMega(false);};
 const dark=path==='/'&&!scrolled&&!mobile&&!mega;
 return <header className={`site-header ${dark?'header-light':''} ${hidden&&!mobile&&!mega?'header-hidden':''}`}>
 <Link href="/" onClick={close} className="brand-link"><Logo variant={dark?'light':'dark'}/></Link>
 <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(n=>n.label==='Services'?<div className="services-nav" key={n.href}><Link href="/services" onClick={close} aria-current={path.startsWith('/services')?'page':undefined}>Services</Link><button aria-label="Services menu" ref={servicesButton} aria-expanded={mega} aria-controls="services-menu" onClick={()=>setMega(!mega)}><ChevronDown size={12} aria-hidden="true"/></button></div>:<Link key={n.href} onClick={close} href={n.href} aria-current={(n.href==='/'?path==='/':path.startsWith(n.href))?'page':undefined}>{n.label}</Link>)}</nav>
 <Link className="header-book" href="/contact?service=Hair%20Replacement" onClick={close} aria-label="Hair consultation"><span className="header-book-label">Hair consultation</span><span className="header-book-short" aria-hidden="true">Book</span><ArrowUpRight size={15} aria-hidden="true"/></Link>
 <ThemeToggle/><button ref={menuButton} className="menu-toggle" aria-label={mobile?'Close navigation':'Open navigation'} aria-expanded={mobile} aria-controls="mobile-nav" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button>
 {mega&&<><button className="menu-backdrop" aria-label="Close services menu" onClick={close}/><div className="mega-menu" id="services-menu"><div><p className="eyebrow">THE ART OF TRANSFORMATION</p><h2>Find your<br/><em>next chapter.</em></h2><Link href="/services" onClick={close} className="text-link">Explore all services<ArrowUpRight size={16}/></Link></div><div className="mega-links">{services.map(s=><Link key={s.slug} href={`/services/${s.slug}`} onClick={close}>{s.name}<ArrowUpRight size={16}/></Link>)}</div></div></>}
 {mobile&&<nav className="mobile-menu" id="mobile-nav" aria-label="Mobile navigation">{navigation.map(n=><Link href={n.href} key={n.href} onClick={close} aria-current={(n.href==='/'?path==='/':path.startsWith(n.href))?'page':undefined}>{n.label}<ArrowUpRight size={22}/></Link>)}<div className="mobile-services">{services.map(s=><Link key={s.slug} href={`/services/${s.slug}`} onClick={close}>{s.name}</Link>)}</div><Link href="/contact" onClick={close} className="button">Let’s begin<ArrowUpRight size={16}/></Link></nav>}
 </header>;
}
