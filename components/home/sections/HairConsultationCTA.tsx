import Link from 'next/link';
import { HairFlow } from '@/components/brand/HairFlow';
import { MagneticLink } from '@/components/brand/BrandMotion';
import { Reveal } from '@/components/ui/Reveal';
import { hairConsultationUrl } from '@/data/hair-replacement';
import { SITE_CONFIG, whatsappUrl } from '@/lib/constants';

export function HairConsultationCTA() {
  return (
    <section className="hr-consultation">
      <HairFlow className="hair-flow-consultation" />
      <div className="hr-cta-top">
        <span>YOUR NEXT CHAPTER STARTS WITH A CONVERSATION.</span>
      </div>
      <Reveal>
        <h2>
          READY TO FEEL
          <br />
          <span>LIKE YOU?</span>
        </h2>
        <div className="hr-cta-bottom">
          <p>
            Let’s find a hair solution that makes sense for you.
            <br />A personal consultation. A considered next step.
          </p>
          <div>
            <MagneticLink href={hairConsultationUrl} className="hr-pill hr-pill-cream">
              Book a hair consultation
            </MagneticLink>
            {SITE_CONFIG.whatsapp && (
              <Link
                href={whatsappUrl('Hello VLASY, I would like to enquire about hair replacement.')}
                className="hr-cta-whatsapp"
              >
                Enquire on WhatsApp
              </Link>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
