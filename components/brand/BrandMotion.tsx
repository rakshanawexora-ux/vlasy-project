'use client';

import Image, { getImageProps } from 'next/image';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import type { PointerEvent, ReactNode } from 'react';

const MotionLink = motion.create(Link);

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  // Keep identical markup during hydration; CSS hides this decoration for reduced motion.
  return <motion.div className="brand-scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

export function HeroPortrait() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 70]);
  const reduced = useReducedMotion();
  const mobile = getImageProps({
    src: '/images/studio-v2/unisex-hero-mobile.webp',
    alt: '',
    width: 1024,
    height: 1536,
    quality: 90,
    sizes: '1000px',
  }).props;
  return (
    <motion.div
      className="hr-moving-image"
      data-image-audience="women"
      style={reduced ? undefined : { y }}
    >
      <picture>
        <source media="(max-width: 700px)" srcSet={mobile.srcSet} sizes="1000px" />
        <Image
          src="/images/studio-v2/unisex-hero.webp"
          alt="AI editorial portrait of an Indian woman with naturally styled hair; not a client result"
          fill
          loading="eager"
          fetchPriority="high"
          quality={90}
          sizes="100vw"
          className="hero-image hr-hero-photo"
        />
      </picture>
    </motion.div>
  );
}

export function KineticHeadline() {
  const reduced = useReducedMotion();
  return (
    <h1 id="hero-title" className="hr-kinetic-title">
      {['YOUR STYLE.', 'YOUR WAY.', 'VLASY.'].map((line, index) => (
        <span className={`hr-title-line ${index === 2 ? 'hr-hero-last' : ''}`} key={line}>
          <motion.span
            initial={reduced ? false : { y: '105%' }}
            animate={{ y: 0 }}
            transition={{
              duration: reduced ? 0 : 0.95,
              delay: reduced ? 0 : 0.15 + index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export function MagneticLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 180, damping: 18 });
  const y = useSpring(rawY, { stiffness: 180, damping: 18 });
  function move(event: PointerEvent<HTMLAnchorElement>) {
    if (reduced || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - bounds.left - bounds.width / 2) * 0.055);
    rawY.set((event.clientY - bounds.top - bounds.height / 2) * 0.1);
  }
  function reset() {
    rawX.set(0);
    rawY.set(0);
  }
  return (
    <MotionLink
      href={href}
      className={`${className} magnetic-link`}
      style={reduced ? undefined : { x, y }}
      onPointerMove={move}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </MotionLink>
  );
}
