import { ServiceDetailPage, servicePageMetadata } from '@/components/services/ServiceDetailPage';
export const generateMetadata = () => servicePageMetadata('hair-treatments');
export default function Page() {
  return <ServiceDetailPage slug="hair-treatments" />;
}
