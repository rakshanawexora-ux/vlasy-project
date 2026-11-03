'use client';

import Image from 'next/image';
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
  const reduced = useReducedMotion();
  return reduced ? null : (
    <motion.div className="brand-scroll-progress" style={{ scaleX }} aria-hidden="true" />
  );
}

export function HeroPortrait() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 70]);
  const reduced = useReducedMotion();
  return (
    <motion.div className="hr-moving-image" style={reduced ? undefined : { y }}>
      <Image
        src="/images/editorial/hero.webp"
        alt="Editorial portrait illustrating a natural short hairstyle; not a documented hair replacement result"
        fill
        priority
        sizes="(max-width: 700px) 1100px, 100vw"
        className="hero-image hr-hero-photo"
      />
    </motion.div>
  );
}

export function KineticHeadline() {
  const reduced = useReducedMotion();
  return (
    <h1 id="hero-title" className="hr-kinetic-title">
      {['FEEL LIKE', 'YOURSELF.', 'AGAIN.'].map((line, index) => (
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
