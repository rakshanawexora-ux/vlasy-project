import { ServiceDetailPage, servicePageMetadata } from '@/components/services/ServiceDetailPage';
export const generateMetadata = () => servicePageMetadata('hair-wig-hair-replacement');
export default function Page() {
  return <ServiceDetailPage slug="hair-wig-hair-replacement" />;
}
