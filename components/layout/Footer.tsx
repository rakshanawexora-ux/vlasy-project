import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { HairFlow } from '@/components/brand/HairFlow';
import { Logo } from '@/components/ui/Logo';
import { services } from '@/data/services';
import { SITE_CONFIG, whatsappUrl } from '@/lib/constants';
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p>Good hair. New possibilities.</p>
        <Link href="/contact" className="text-link">
          Let’s talk
          <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="footer-columns">
        <div>
          <span className="footer-label">EXPLORE</span>
          {[
            ['Our story', '/about'],
            ['Transformations', '/transformations'],
            ['Academy', '/academy'],
            ['Journal', '/journal'],
            ['FAQs', '/faq'],
          ].map(([n, h]) => (
            <Link key={h} href={h}>
              {n}
            </Link>
          ))}
        </div>
        <div>
          <span className="footer-label">OUR EXPERTISE</span>
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`}>
              {s.shortName}
            </Link>
          ))}
        </div>
        <div>
          <span className="footer-label">FIND YOUR SPACE</span>
          <Link href="/locations/kolathur">Kolathur, Chennai</Link>
          <Link href="/contact">Contact & enquiries</Link>
        </div>
        <div>
          <span className="footer-label">STAY CONNECTED</span>
          <Link href={SITE_CONFIG.instagram || '/contact?channel=instagram'}>
            Instagram
            <ArrowUpRight size={12} />
          </Link>
          <Link href={SITE_CONFIG.facebook || '/contact?channel=facebook'}>
            Facebook
            <ArrowUpRight size={12} />
          </Link>
          <Link href={whatsappUrl()}>
            WhatsApp
            <ArrowUpRight size={12} />
          </Link>
          <p className="footer-note">
            Hair, beauty
            <br />
            and training.
          </p>
        </div>
      </div>
      <div className="footer-wordmark footer-brand-stage">
        <HairFlow className="hair-flow-footer" />
        <Logo large variant="light" />
        <p className="footer-brand-tagline">
          Your hair.
          <br />
          Your confidence.
          <br />
          <span>Your next chapter.</span>
        </p>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} VLASY Salon & Academy.</span>
        <span>CHENNAI, INDIA</span>
        <div>
          <Link href="/privacy-policy">Privacy policy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
