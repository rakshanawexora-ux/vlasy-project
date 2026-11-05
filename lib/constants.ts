// Prefer the confirmed public domain; Vercel supplies its production domain automatically.
const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  'https://vlasy.example';
const siteUrl = new URL(
  /^https?:\/\//.test(configuredUrl) ? configuredUrl : `https://${configuredUrl}`,
).origin;

export const SITE_CONFIG = {
  name: 'VLASY Unisex Salon',
  url: siteUrl,
  phone: process.env.NEXT_PUBLIC_PHONE || '',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '',
  email: process.env.NEXT_PUBLIC_EMAIL || '',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || '',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK || '',
  logo: { light: '/logo/vlasy-transparent.png', dark: '/logo/vlasy-transparent.png' },
  locations: {
    kolathur: { address: '', hours: '', map: '' },
  },
};
export function whatsappUrl(
  message = 'Hello VLASY, I would like to enquire about a consultation.',
) {
  return SITE_CONFIG.whatsapp
    ? `https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    : '/contact?channel=whatsapp';
}
export const phoneUrl = SITE_CONFIG.phone ? `tel:${SITE_CONFIG.phone}` : '/contact?channel=call';
