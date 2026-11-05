import Link from 'next/link';
import { ArrowDown, Scissors, Sparkles, HeartHandshake } from 'lucide-react';
import { HeroCarousel } from './HeroCarousel';
export function Hero() {
  return (
    <section className="hr-hero" aria-labelledby="hero-title">
      <HeroCarousel />
      <div className="hr-hero-overlay" />
      <div className="hr-hero-content">
        <p className="hr-overline">
          <span />
          HAIR · BEAUTY · GROOMING
        </p>
        <h1 id="hero-title" className="hr-kinetic-title">
          {['YOUR STYLE.', 'YOUR WAY.', 'VLASY.'].map((line, index) => (
            <span className={`hr-title-line ${index === 2 ? 'hr-hero-last' : ''}`} key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h1>
        <p className="hr-hero-description">
          Premium hair, beauty and grooming in Kolathur, Chennai.
          <br />
          Services for women and men.
        </p>
        <div className="hero-service-actions">
          <Link href="/contact" className="hr-pill hr-pill-cream">
            Book an appointment
          </Link>
          <Link href="/services" className="hero-services-link">
            Explore all services
          </Link>
        </div>
      </div>
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
