import type { Metadata } from 'next';
import { SITE_CONFIG } from './constants';

/** Shared metadata for public pages. Use a real production URL in environment settings. */
export function metadata(title: string, description: string, path: string): Metadata {
  const image = '/images/studio-v2/unisex-hero.webp';
  return {
    title: path === '/' ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: path === '/thank-you' ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url: path,
      type: 'website',
      locale: 'en_IN',
      siteName: SITE_CONFIG.name,
      images: [
        { url: image, width: 1536, height: 1024, alt: 'VLASY — AI editorial hair inspiration' },
      ],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export const absoluteUrl = (path: string) => new URL(path, SITE_CONFIG.url).toString();
