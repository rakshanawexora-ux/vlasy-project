import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Scissors, Sparkles, HeartHandshake } from 'lucide-react';
import { HairFlow } from '@/components/brand/HairFlow';
import {
  HeroPortrait,
  KineticHeadline,
  MagneticLink,
  ScrollProgress,
} from '@/components/brand/BrandMotion';
import { HeroVideo } from './HeroVideo';
export function Hero() {
  return (
    <section className="hr-hero" aria-labelledby="hero-title">
      <ScrollProgress />
      <HeroPortrait />
      <HeroVideo />
      <div className="hr-hero-overlay" />
      <HairFlow className="hair-flow-hero" />
      <div className="hr-hero-content">
        <p className="hr-overline">
          <span />
          HAIR · BEAUTY · GROOMING
        </p>
        <KineticHeadline />
        <p className="hr-hero-description">
          Premium hair, beauty and grooming in Kolathur, Chennai.
          <br />
          Services for women and men.
        </p>
        <div className="hero-service-actions">
          <MagneticLink href="/contact" className="hr-pill hr-pill-cream">
            Book an appointment
            <ArrowUpRight size={19} aria-hidden="true" />
          </MagneticLink>
          <Link href="/services" className="hero-services-link">
            Explore all services
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <Link href="/services/hair-wig-hair-replacement" className="hr-hero-note">
        <span className="hr-note-icon">
          <Sparkles size={28} strokeWidth={1} />
        </span>
        <span>
          <small>A PERSONAL APPROACH</small>
          <strong>
            Hair wigs.
            <br />A fit that feels like you.
          </strong>
          <span className="hr-note-link">
            Explore wigs & replacement
            <ArrowUpRight size={16} />
          </span>
        </span>
      </Link>
      <div className="hr-hero-base">
        <div className="hr-hero-promises">
          <span>
            <Scissors size={19} strokeWidth={1.2} />
            Hair, beauty
            <br />& grooming
          </span>
          <span>
            <Sparkles size={19} strokeWidth={1.2} />
            Women
            <br />& men
          </span>
          <span>
            <HeartHandshake size={19} strokeWidth={1.2} />
            Personal care
            <br />
            in Kolathur
          </span>
        </div>
        <a href="#services" className="hr-scroll">
          EXPLORE OUR SERVICES
          <ArrowDown size={15} />
        </a>
      </div>
    </section>
  );
}
