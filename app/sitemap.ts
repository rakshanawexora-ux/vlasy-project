import { programs } from '@/data/academy';
import type { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { articles } from '@/data/journal';
import { absoluteUrl } from '@/lib/seo';
export default function sitemap():MetadataRoute.Sitemap{return ['','/about','/approach','/services','/transformations','/academy','/locations','/locations/kolathur','/locations/madhavaram','/journal','/faq','/contact','/privacy-policy','/terms',...programs.map(p=>`/academy/${p.slug}`),...services.map(s=>`/services/${s.slug}`),...articles.map(a=>`/journal/${a.slug}`)].map(path=>({url:absoluteUrl(path||'/'),changeFrequency:'monthly',priority:path===''?1:0.7}));}
