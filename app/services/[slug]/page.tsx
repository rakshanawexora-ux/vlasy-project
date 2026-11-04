import { permanentRedirect, notFound } from 'next/navigation';
import { legacyServiceRoutes } from '@/data/service-routes';
export default async function LegacyServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = legacyServiceRoutes[slug];
  if (destination) permanentRedirect(`/services/${destination}`);
  if (slug === 'mehndi') permanentRedirect('/services');
  notFound();
}
