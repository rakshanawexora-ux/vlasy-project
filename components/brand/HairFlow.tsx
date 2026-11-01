'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Original decorative hair-strand artwork. Kept separate from the VLASY logo. */
export function HairFlow({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      className={`hair-flow ${className}`}
      viewBox="0 0 560 650"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {Array.from({ length: 13 }, (_, index) => {
        const offset = index * 13;
        return (
          <motion.path
            key={index}
            d={`M ${75 + offset * 0.38} ${625 - index * 3} C ${-85 + offset * 0.6} ${390 - index * 8}, ${590 - offset * 0.7} ${425 - index * 9}, ${430 - offset * 0.36} ${30 + index * 3}`}
            stroke="currentColor"
            strokeWidth={index % 4 === 0 ? 2.3 : 1.1}
            strokeLinecap="round"
            initial={reduced ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: reduced ? 0 : 1.9, delay: reduced ? 0 : index * 0.045, ease: [0.22, 1, 0.36, 1] }}
          />
        );
      })}
    </motion.svg>
  );
}
