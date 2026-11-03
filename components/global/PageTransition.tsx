'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
export function PageTransition({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const reduced = useReducedMotion();
  return (
    <motion.div
      key={path}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
