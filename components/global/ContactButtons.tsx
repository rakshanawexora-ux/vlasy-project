import Link from 'next/link';
import { MessageCircle,Phone,CalendarDays } from 'lucide-react';
import { whatsappUrl,phoneUrl } from '@/lib/constants';
export function ContactButtons(){return <><Link className="floating-whatsapp" href={whatsappUrl()} aria-label="WhatsApp enquiry"><MessageCircle size={21}/><span>LET’S TALK</span></Link><div className="mobile-sticky"><Link href={phoneUrl}><Phone size={17}/>Call</Link><Link href={whatsappUrl()}><MessageCircle size={17}/>WhatsApp</Link><Link href="/contact?service=Hair%20Replacement"><CalendarDays size={17}/>Book</Link></div></>;}
