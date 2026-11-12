'use client';

import Image, { getImageProps } from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowDown, Scissors, Sparkles, HeartHandshake } from 'lucide-react';
import { heroSlides } from '@/data/hero-slides';

type Connection = {
  saveData?: boolean;
  addEventListener?: (event: string, listener: () => void) => void;
  removeEventListener?: (event: string, listener: () => void) => void;
};
function connection() {
  return (navigator as Navigator & { connection?: Connection }).connection;
}
function automaticSlidesAllowed() {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !connection()?.saveData;
}
function subscribePreference(notify: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const network = connection();
  media.addEventListener('change', notify);
  network?.addEventListener?.('change', notify);
  return () => {
    media.removeEventListener('change', notify);
    network?.removeEventListener?.('change', notify);
  };
}

/** Image and copy share one index and a six-second timer. Motion/data preferences are respected. */
export function HeroCarousel() {
  const region = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [interacting, setInteracting] = useState(false);
  const [visible, setVisible] = useState(true);
  const allowed = useSyncExternalStore(subscribePreference, automaticSlidesAllowed, () => false);
  useEffect(() => {
    const element = region.current;
    if (!element) return;
    let onScreen = true;
    const sync = () => setVisible(onScreen && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.1 },
    );
    observer.observe(element);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);
  useEffect(() => {
    if (!allowed || interacting || !visible) return;
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % heroSlides.length),
      6000,
    );
    return () => window.clearInterval(timer);
  }, [allowed, interacting, visible]);
  return (
    <section
      ref={region}
      className="hr-hero hero-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured salon services"
      data-active-slide={active + 1}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);
      }}
    >
      <div className="hero-slides">
        {heroSlides.map((slide, index) => {
          const mobileSource =
            'mobileImage' in slide
              ? getImageProps({
                  src: `/images/studio-v2/${slide.mobileImage}.webp`,
                  alt: '',
                  width: 1024,
                  height: 1536,
                  quality: 90,
                  sizes: '1000px',
                }).props.srcSet
              : undefined;
          return (
            <div
              key={slide.image}
              className={`hero-slide ${index === active ? 'is-active' : ''}`}
              aria-hidden={index !== active}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${heroSlides.length}: ${slide.title}`}
              data-image-audience={slide.audience}
            >
              <picture>
                {mobileSource && (
                  <source media="(max-width: 700px)" srcSet={mobileSource} sizes="1000px" />
                )}
                <Image
                  src={`/images/studio-v2/${slide.image}.webp`}
                  alt={`${slide.alt}; illustrative style reference`}
                  fill
                  quality={90}
                  sizes="100vw"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  className={`hero-slide-image hr-hero-photo ${index === active ? 'hero-image' : ''}`}
                />
              </picture>
            </div>
          );
        })}
      </div>
      <div className="hr-hero-overlay" />
      <div className="hr-hero-content">
        <p className="hr-overline">
          <span />
          {heroSlides[active].eyebrow}
        </p>
        <h1 id="hero-title" className="hr-kinetic-title">
          {heroSlides[active].headline.map((line, index) => (
            <span className={`hr-title-line ${index === 2 ? 'hr-hero-last' : ''}`} key={index}>
              <span>{line}</span>
            </span>
          ))}
        </h1>
        <p className="hr-hero-description">{heroSlides[active].description}</p>
        <div className="hero-service-actions">
          <Link href={heroSlides[active].href} className="hr-pill hr-pill-cream">
            {heroSlides[active].cta}
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
