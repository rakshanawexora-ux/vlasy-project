import type { Metadata } from 'next';
import { SITE_CONFIG } from './constants';
export function metadata(title: string, description: string, path: string): Metadata {
 return {title,description,alternates:{canonical:path},openGraph:{title,description,url:path,type:'website',siteName:SITE_CONFIG.name,images:[{url:'/images/hero.jpg',width:1536,height:1024,alt:'VLASY editorial hair inspiration'}]},twitter:{card:'summary_large_image',title,description,images:['/images/hero.jpg']}};
}
export const absoluteUrl = (path:string) => new URL(path, SITE_CONFIG.url).toString();
