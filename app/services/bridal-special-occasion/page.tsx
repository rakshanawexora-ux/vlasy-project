import { ServiceDetailPage, servicePageMetadata } from '@/components/services/ServiceDetailPage';
export const generateMetadata = () => servicePageMetadata('bridal-special-occasion');
export default function Page() {
  return <ServiceDetailPage slug="bridal-special-occasion" />;
}
