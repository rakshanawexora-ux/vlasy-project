import { test, expect } from './fixtures';
import { isEnquiryOriginAllowed } from '../lib/enquiry-origin';
import { deliverEnquiry, EnquiryDeliveryError } from '../lib/enquiry-delivery';

const values = {
  name: 'Test Visitor',
  phone: '9876543210',
  email: 'visitor@example.com',
  service: 'Hair Extensions Services',
  branch: 'Kolathur' as const,
  consent: true,
  message: 'Tape-in consultation',
};
const config = { apiKey: 'test-only', from: 'Salon <salon@example.com>', to: 'owner@example.com' };

test('delivery sends plain text to the configured recipient and requires a provider receipt', async () => {
  const transport: typeof fetch = async (url, init) => {
    expect(url).toBe('https://api.resend.com/emails');
    const payload = JSON.parse(init!.body as string);
    expect(payload.to).toEqual(['owner@example.com']);
    expect(payload.reply_to).toBe(values.email);
    expect(payload.text).toContain('Tape-in consultation');
    expect(payload).not.toHaveProperty('html');
    return Response.json({ id: 'test-receipt' });
  };
  expect(await deliverEnquiry(values, config, transport)).toEqual({ id: 'test-receipt' });
});

test('missing configuration never makes a network request', async () => {
  let called = false;
  await expect(
    deliverEnquiry(values, {}, async () => {
      called = true;
      return Response.json({ id: 'unexpected' });
    }),
  ).rejects.toMatchObject({ reason: 'unconfigured' });
  expect(called).toBe(false);
});

for (const mode of ['provider-error', 'missing-receipt', 'network-error']) {
  test(`delivery does not report success for ${mode}`, async () => {
    const transport: typeof fetch = async () => {
      if (mode === 'network-error') throw new Error('private provider detail');
      return mode === 'provider-error'
        ? Response.json({ error: 'private provider detail' }, { status: 500 })
        : Response.json({});
    };
    await expect(deliverEnquiry(values, config, transport)).rejects.toEqual(
      new EnquiryDeliveryError('unavailable'),
    );
  });
}

test('Render proxy origins work while unrelated or malformed origins are rejected', () => {
  const internal = 'http://localhost:10000/api/enquiry';
  const publicOrigin = 'https://vlasy-project.onrender.com';
  expect(isEnquiryOriginAllowed(publicOrigin, internal, 'localhost:10000', publicOrigin)).toBe(
    true,
  );
  expect(
    isEnquiryOriginAllowed(
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3000/api/enquiry',
      '127.0.0.1:3000',
    ),
  ).toBe(true);
  expect(
    isEnquiryOriginAllowed('https://unrelated.example', internal, 'localhost:10000', publicOrigin),
  ).toBe(false);
  expect(isEnquiryOriginAllowed('not a URL', internal, 'localhost:10000', publicOrigin)).toBe(
    false,
  );
});
