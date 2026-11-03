import { NextResponse } from 'next/server';
import { enquirySchema } from '@/lib/validations';
export async function POST(request: Request) {
  try {
    const raw = await request.text();
    if (raw.length > 16000)
      return NextResponse.json({ error: 'Request too large.' }, { status: 413 });
    const origin = request.headers.get('origin');
    if (
      origin &&
      new URL(origin).host !== (request.headers.get('host') || new URL(request.url).host)
    )
      return NextResponse.json({ error: 'Origin not permitted.' }, { status: 403 });
    const result = enquirySchema.safeParse(JSON.parse(raw));
    if (!result.success)
      return NextResponse.json(
        { error: 'Please check your enquiry.', fields: result.error.flatten().fieldErrors },
        { status: 400 },
      );
    // Development adapter only. Replace with a durable CRM/email integration before launch.
    // Keep operational log access restricted: these fields contain personal information.
    console.info(
      '[VLASY enquiry — development adapter]',
      JSON.stringify({ ...result.data, website: undefined, timestamp: new Date().toISOString() }),
    );
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
