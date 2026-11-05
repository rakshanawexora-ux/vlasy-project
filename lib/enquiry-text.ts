import type { EnquiryValues } from './validations';

export function enquiryText(values: EnquiryValues) {
  return [
    'VLASY salon enquiry',
    `Name: ${values.name}`,
    `Mobile: ${values.phone}`,
    values.email && `Email: ${values.email}`,
    `Service: ${values.service}`,
    `Branch: ${values.branch}`,
    values.preferredDate && `Preferred date: ${values.preferredDate}`,
    values.message && `Message: ${values.message}`,
    `Contact consent: ${values.consent ? 'Yes' : 'No'}`,
  ]
    .filter(Boolean)
    .join('\n');
}
