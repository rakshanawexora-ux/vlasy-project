import { ServiceDetailPage, servicePageMetadata } from '@/components/services/ServiceDetailPage';
export const generateMetadata = () => servicePageMetadata('nail-beauty');
export default function Page() {
  return <ServiceDetailPage slug="nail-beauty" />;
}
