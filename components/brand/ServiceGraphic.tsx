'use client';
import { motion, useReducedMotion } from 'framer-motion';
/** Short, decorative draw-on animation; never carries essential information. */
export function ServiceGraphic() {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      className="service-motion-graphic"
      viewBox="0 0 280 280"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {[
        'M30 225C5 110 190 215 235 35',
        'M45 240C15 110 210 230 250 50',
        'M60 255C25 120 220 245 265 65',
        'M23 170C90 50 150 265 255 130',
      ].map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth={i === 3 ? 1 : 2}
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reduced ? 0 : 1.6,
            delay: reduced ? 0 : i * 0.12,
            ease: 'easeOut',
          }}
        />
      ))}
      <motion.circle
        cx="235"
        cy="35"
        r="7"
        fill="currentColor"
        initial={reduced ? false : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.2 }}
      />
    </motion.svg>
  );
}
