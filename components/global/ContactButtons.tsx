import Link from 'next/link';
import { MessageCircle, Phone } from 'lucide-react';
import { SITE_CONFIG, whatsappUrl, phoneUrl } from '@/lib/constants';
import type { ReactNode } from 'react';

function ContactAction({ href, children }: { href?: string; children: ReactNode }) {
  return href ? (
    <Link href={href}>{children}</Link>
  ) : (
    <button type="button" disabled title="Business number not available yet">
      {children}
    </button>
  );
}
export function ContactButtons() {
  return (
    <>
      <Link
        className="floating-whatsapp"
        href={SITE_CONFIG.whatsapp ? whatsappUrl() : '/contact'}
        aria-label={SITE_CONFIG.whatsapp ? 'WhatsApp enquiry' : 'Salon enquiry'}
      >
        <MessageCircle size={21} />
        <span>LET’S TALK</span>
      </Link>
      <div className="mobile-sticky">
        <ContactAction href={SITE_CONFIG.phone ? phoneUrl : undefined}>
          <Phone size={17} aria-hidden="true" />
          Call
        </ContactAction>
        <ContactAction href={SITE_CONFIG.whatsapp ? whatsappUrl() : undefined}>
          <MessageCircle size={17} aria-hidden="true" />
          WhatsApp
        </ContactAction>
      </div>
    </>
  );
}
