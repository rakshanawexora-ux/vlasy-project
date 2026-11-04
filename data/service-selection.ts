import { services } from './services';
const legacyNames: Record<string, string> = {
  'Hair Replacement': 'hair-wig-hair-replacement',
  'Hair Extensions': 'hair-extensions',
  'Haircuts & Styling': 'haircut-styling',
  'Hair Cuts & Styling': 'haircut-styling',
  'Hair Colour': 'hair-colouring',
  'Bridal Services': 'bridal-special-occasion',
  'Beauty Treatments': 'womens-beauty',
};
/** Accept old consultation links while presenting the current confirmed menu. */
export function normalizeServiceName(value: string) {
  if (value === 'Academy' || value === 'Other' || !value) return value;
  return (
    services.find(
      (service) =>
        service.name === value ||
        service.shortName === value ||
        service.slug === legacyNames[value],
    )?.name || ''
  );
}
