import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/constants';
export function Logo({variant='dark',large=false}:{variant?:'light'|'dark';large?:boolean}) {
 const src=SITE_CONFIG.logo[variant];
 return src ? <Image src={src} alt="VLASY Salon & Academy" width={190} height={65}/> : <span className={`wordmark ${large?'wordmark-large':''}`} aria-label="VLASY Salon & Academy">VLASY{!large&&<small>SALON & ACADEMY</small>}</span>;
}
