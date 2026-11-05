'use client';

import Image, { getImageProps } from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
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

/** Only the pictures crossfade: the headline, photograph scale and page position stay still. */
export function HeroCarousel() {
  const region = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [visible, setVisible] = useState(true);
  const [announcement, setAnnouncement] = useState('');
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
    if (!allowed || paused || interacting || !visible) return;
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % heroSlides.length),
      7000,
    );
    return () => window.clearInterval(timer);
  }, [allowed, paused, interacting, visible]);
  function select(direction: number) {
    const next = (active + direction + heroSlides.length) % heroSlides.length;
    setActive(next);
    setPaused(true);
    setAnnouncement(`${next + 1} of ${heroSlides.length}: ${heroSlides[next].title}`);
  }
  return (
    <div
      ref={region}
      className="hero-carousel"
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
      <div className="hero-carousel-panel">
        <div className="hero-carousel-caption">
          <span aria-hidden="true">
            0{active + 1} / 0{heroSlides.length}
          </span>
          <Link href={heroSlides[active].href}>{heroSlides[active].title}</Link>
        </div>
        <div className="hero-carousel-controls">
          <button
            type="button"
            className="hero-carousel-control"
            aria-label="Previous hero slide"
            onClick={() => select(-1)}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="hero-carousel-control"
            aria-label={paused || !allowed ? 'Play hero slideshow' : 'Pause hero slideshow'}
            disabled={!allowed}
            onClick={() => setPaused(!paused)}
            title={
              !allowed ? 'Automatic slides are off for your motion or data preference' : undefined
            }
          >
            {paused || !allowed ? (
              <Play size={16} aria-hidden="true" />
            ) : (
              <Pause size={16} aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            className="hero-carousel-control"
            aria-label="Next hero slide"
            onClick={() => select(1)}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        {announcement}
      </span>
    </div>
  );
}
