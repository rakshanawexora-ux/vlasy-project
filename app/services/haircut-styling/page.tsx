import { ServiceDetailPage, servicePageMetadata } from '@/components/services/ServiceDetailPage';
export const generateMetadata = () => servicePageMetadata('haircut-styling');
export default function Page() {
  return <ServiceDetailPage slug="haircut-styling" />;
}
