import { NextResponse } from 'next/server';
import { enquirySchema } from '@/lib/validations';
import { isEnquiryOriginAllowed } from '@/lib/enquiry-origin';
import { deliverEnquiry, EnquiryDeliveryError, canDeliverEnquiries } from '@/lib/enquiry-delivery';

export function GET() {
  return NextResponse.json(
    { available: canDeliverEnquiries() },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}

export async function POST(request: Request) {
  if (
    !isEnquiryOriginAllowed(
      request.headers.get('origin'),
      request.url,
      request.headers.get('host'),
      process.env.RENDER_EXTERNAL_URL || process.env.NEXT_PUBLIC_SITE_URL,
    )
  )
    return NextResponse.json({ error: 'Origin not permitted.' }, { status: 403 });
  let values;
  try {
    const raw = await request.text();
    if (raw.length > 16000)
      return NextResponse.json({ error: 'Request too large.' }, { status: 413 });
    const result = enquirySchema.safeParse(JSON.parse(raw));
    if (!result.success)
      return NextResponse.json(
        { error: 'Please check your enquiry.', fields: result.error.flatten().fieldErrors },
        { status: 400 },
      );
    values = result.data;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
  try {
    await deliverEnquiry(values);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    const unconfigured = error instanceof EnquiryDeliveryError && error.reason === 'unconfigured';
    return NextResponse.json(
      {
        error: unconfigured
          ? 'Online enquiries are temporarily unavailable. Please use our contact options or try again later.'
          : 'Your enquiry could not be sent. Please try again or contact us directly. Your details are still here.',
      },
      { status: unconfigured ? 503 : 502 },
    );
  }
}
