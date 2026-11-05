import { enquiryText } from './enquiry-text';
import type { EnquiryValues } from './validations';

type DeliveryConfig = {
  apiKey?: string;
  from?: string;
  to?: string;
};
export class EnquiryDeliveryError extends Error {
  constructor(public readonly reason: 'unconfigured' | 'unavailable') {
    super(reason);
  }
}
export function enquiryDeliveryConfig(): DeliveryConfig {
  return {
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.ENQUIRY_FROM_EMAIL,
    to: process.env.ENQUIRY_TO_EMAIL,
  };
}
export function canDeliverEnquiries(config = enquiryDeliveryConfig()) {
  return Boolean(config.apiKey && config.from && config.to);
}
/** Success means the delivery provider accepted the message, never a console log. */
export async function deliverEnquiry(
  values: EnquiryValues,
  config = enquiryDeliveryConfig(),
  transport: typeof fetch = fetch,
) {
  if (!canDeliverEnquiries(config)) throw new EnquiryDeliveryError('unconfigured');
  try {
    const response = await transport('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${config.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        subject: 'New VLASY salon enquiry',
        text: enquiryText(values),
        ...(values.email ? { reply_to: values.email } : {}),
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new EnquiryDeliveryError('unavailable');
    const receipt = await response.json();
    if (!receipt.id || typeof receipt.id !== 'string')
      throw new EnquiryDeliveryError('unavailable');
    return { id: receipt.id };
  } catch {
    // Never echo provider responses, credentials or the visitor's personal details.
    throw new EnquiryDeliveryError('unavailable');
  }
}
