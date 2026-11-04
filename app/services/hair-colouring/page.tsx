import { ServiceDetailPage, servicePageMetadata } from '@/components/services/ServiceDetailPage';
export const generateMetadata = () => servicePageMetadata('hair-colouring');
export default function Page() {
  return <ServiceDetailPage slug="hair-colouring" />;
}
