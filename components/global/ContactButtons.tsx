import Link from 'next/link';
import { MessageCircle, Phone, CalendarDays } from 'lucide-react';
import { SITE_CONFIG, whatsappUrl, phoneUrl } from '@/lib/constants';
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
        {SITE_CONFIG.phone && (
          <Link href={phoneUrl}>
            <Phone size={17} />
            Call
          </Link>
        )}
        {SITE_CONFIG.whatsapp && (
          <Link href={whatsappUrl()}>
            <MessageCircle size={17} />
            WhatsApp
          </Link>
        )}
        <Link href="/contact?service=Hair%20Replacement">
          <CalendarDays size={17} />
          Book
        </Link>
      </div>
    </>
  );
}
