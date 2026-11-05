'use client';

import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

/** Native scrolling keeps the mobile catalogue usable with touch and without JavaScript. */
export function FeaturedServiceRail({ children, total }: { children: ReactNode; total: number }) {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  function moveTo(index: number) {
    const element = rail.current;
    const cards = element?.querySelectorAll<HTMLElement>('.featured-service-card');
    if (!element || !cards) return;
    const next = Math.max(0, Math.min(index, total - 1));
    element.scrollTo({
      left: cards[next].offsetLeft - cards[0].offsetLeft,
      behavior: reduced ? 'instant' : 'smooth',
    });
  }

  function updateActive() {
    const element = rail.current;
    const cards = element?.querySelectorAll<HTMLElement>('.featured-service-card');
    if (!element || !cards?.length) return;
    const origin = cards[0].offsetLeft;
    let closest = 0;
    cards.forEach((card, index) => {
      if (
        Math.abs(card.offsetLeft - origin - element.scrollLeft) <
        Math.abs(cards[closest].offsetLeft - origin - element.scrollLeft)
      )
        closest = index;
    });
    setActive(closest);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || !window.matchMedia('(max-width: 700px)').matches)
      return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      moveTo(active + (event.key === 'ArrowRight' ? 1 : -1));
    }
  }

  return (
    <div className="featured-services-browser">
      <div
        ref={rail}
        className="expertise-grid featured-story-list"
        role="region"
        aria-label="Featured services"
        tabIndex={0}
        onScroll={updateActive}
        onKeyDown={onKeyDown}
      >
        {children}
      </div>
      <div className="featured-rail-controls">
        <p aria-live="polite" aria-atomic="true">
          <span>
            {active + 1} / {total}
          </span>{' '}
          <span>Swipe to explore</span>
        </p>
        <div>
          <button
            type="button"
            aria-label="Previous featured service"
            disabled={active === 0}
            onClick={() => moveTo(active - 1)}
          >
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next featured service"
            disabled={active === total - 1}
            onClick={() => moveTo(active + 1)}
          >
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
      <noscript>
        <style>{'.featured-rail-controls{display:none!important}'}</style>
      </noscript>
    </div>
  );
}
