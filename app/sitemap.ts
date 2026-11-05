import type { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { articles } from '@/data/journal';
import { absoluteUrl } from '@/lib/seo';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/about',
    '/services',
    '/transformations',
    '/journal',
    '/faq',
    '/contact',
    '/privacy-policy',
    '/terms',
    ...services.map((s) => `/services/${s.slug}`),
    ...articles.map((a) => `/journal/${a.slug}`),
  ].map((path) => ({
    url: absoluteUrl(path || '/'),
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
