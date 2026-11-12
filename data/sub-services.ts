import type { Service } from './services';
import serviceImages from './sub-service-images.json';
export type SubService = { id: string; name: string; image: string; alt: string };
/** Every offering has its own native-resolution photograph, indexed by its approved name. */
export function getSubServices(service: Service): SubService[] {
  const images = serviceImages as Record<string, Record<string, { image: string; alt: string }>>;
  return service.offerings.map((name, index) => {
    const photo = images[service.slug]?.[name];
    if (!photo) throw new Error(`Missing sub-service imagery: ${service.slug}/${name}`);
    return { id: `${service.slug}-${index + 1}`, name, ...photo };
  });
}
