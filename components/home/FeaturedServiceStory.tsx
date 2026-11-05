'use client';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Photo } from '@/components/ui/Primitives';
import type { Service } from '@/data/services';
import { serviceImageAudience } from '@/data/service-photography';
export function FeaturedServiceStory({
  service,
  index,
  total,
}: {
  service: Service;
  index: number;
  total: number;
}) {
  const target = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  return (
    <motion.article
      ref={target}
      className="expertise-card featured-service-card"
      initial={reduced ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduced ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="featured-service-media">
        <motion.div className="featured-parallax-layer" style={reduced ? undefined : { y }}>
          <Photo
            src={service.image}
            alt={`${service.shortName} — AI editorial inspiration`}
            imageAudience={serviceImageAudience(service)}
            sizes="(max-width: 700px) 80vw, 52vw"
          />
        </motion.div>
        <span className="featured-service-number" aria-hidden="true">
          0{index + 1} / 0{total}
        </span>
      </div>
      <div className="expertise-card-content">
        <span className="small-label">{service.category}</span>
        <h3>{service.shortName}</h3>
        <p>{service.description}</p>
        <Link
          href={`/services/${service.slug}`}
          className="expertise-card-action"
          aria-label={`Explore ${service.shortName}`}
        >
          Explore this service
          <ArrowUpRight size={19} aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}
