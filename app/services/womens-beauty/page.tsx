import { ServiceDetailPage, servicePageMetadata } from '@/components/services/ServiceDetailPage';
export const generateMetadata = () => servicePageMetadata('womens-beauty');
export default function Page() {
  return <ServiceDetailPage slug="womens-beauty" />;
}
