import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown,ArrowUpRight,ShieldCheck,ScanFace,HeartHandshake } from 'lucide-react';
import { hairConsultationUrl } from '@/data/hair-replacement';
export function Hero(){return <section className="hr-hero" aria-labelledby="hero-title">
 <Image src="/images/hair-confidence-hero.jpg" alt="Editorial portrait illustrating a natural short hairstyle; not a documented hair replacement result" fill priority sizes="(max-width: 700px) 1100px, 100vw" className="hero-image hr-hero-photo"/>
 <div className="hr-hero-overlay"/>
 <div className="hr-hero-content"><p className="hr-overline"><span/>HAIR REPLACEMENT / CHENNAI</p>
 <h1 id="hero-title"><span>FEEL LIKE</span><span>YOURSELF.</span><span className="hr-hero-last">AGAIN.</span></h1>
 <p className="hr-hero-description">Personalised, non-surgical hair replacement.<br/>Designed around you. Made for your life.</p>
 <Link href={hairConsultationUrl} className="hr-pill hr-pill-cream">Let’s talk hair<ArrowUpRight size={19} aria-hidden="true"/></Link>
 </div>
 <Link href="/services/hair-replacement" className="hr-hero-note"><span className="hr-note-icon"><ScanFace size={28} strokeWidth={1}/></span><span><small>A PERSONAL APPROACH</small><strong>Your hair.<br/>Your kind of confidence.</strong><span className="hr-note-link">Explore hair replacement<ArrowUpRight size={16}/></span></span></Link>
 <div className="hr-hero-base"><div className="hr-hero-promises"><span><ShieldCheck size={19} strokeWidth={1.2}/>Non-surgical<br/>hair solutions</span><span><ScanFace size={19} strokeWidth={1.2}/>Personalised<br/>to you</span><span><HeartHandshake size={19} strokeWidth={1.2}/>Care beyond<br/>the chair</span></div><a href="#approach" className="hr-scroll">SCROLL TO EXPLORE<ArrowDown size={15}/></a></div>
 <span className="hr-hero-annotation">KOLATHUR & MADHAVARAM · CHENNAI</span>
 </section>;}
