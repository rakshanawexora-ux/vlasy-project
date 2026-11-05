'use client';

import Link from 'next/link';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import type { PointerEvent, ReactNode } from 'react';

const MotionLink = motion.create(Link);

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
