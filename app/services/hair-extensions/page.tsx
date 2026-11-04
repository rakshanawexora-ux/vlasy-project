import { ServiceDetailPage, servicePageMetadata } from '@/components/services/ServiceDetailPage';
export const generateMetadata = () => servicePageMetadata('hair-extensions');
export default function Page() {
  return <ServiceDetailPage slug="hair-extensions" />;
}
