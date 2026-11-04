import { ServiceDetailPage, servicePageMetadata } from '@/components/services/ServiceDetailPage';
export const generateMetadata = () => servicePageMetadata('mens-grooming');
export default function Page() {
  return <ServiceDetailPage slug="mens-grooming" />;
}
