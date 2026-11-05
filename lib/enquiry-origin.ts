/** Accept the public Render origin even if the reverse proxy uses an internal host. */
export function isEnquiryOriginAllowed(
  origin: string | null,
  requestUrl: string,
  host: string | null,
  publicOrigin?: string,
) {
  if (!origin) return true;
  try {
    const source = new URL(origin);
    if (!['http:', 'https:'].includes(source.protocol)) return false;
    if (source.host === (host || new URL(requestUrl).host)) return true;
    return Boolean(publicOrigin && source.origin === new URL(publicOrigin).origin);
  } catch {
    return false;
  }
}
