'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { hairStrands } from './hair-strands';

/** Logo-inspired decorative hair strands. The supplied logo is preserved separately. */
export function HairFlow({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      className={`hair-flow ${className}`}
      viewBox="0 0 560 610"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {hairStrands.map((path, index) => (
        <motion.path
          key={index}
          d={path}
          stroke="currentColor"
          strokeWidth={index % 4 === 0 ? 3 : 1.5}
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: reduced ? 0 : 1.9,
            delay: reduced ? 0 : index * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </motion.svg>
  );
}
