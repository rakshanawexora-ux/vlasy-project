import { z } from 'zod';
export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.').max(100),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{8,20}$/, 'Please enter a valid mobile number.')
    .refine((v) => v.replace(/\D/g, '').length >= 10, 'Please include at least 10 digits.'),
  email: z.union([z.literal(''), z.email('Please enter a valid email address.')]).optional(),
  service: z.string().min(1, 'Please choose a service.').max(100),
  branch: z.enum(['Kolathur', 'Not Sure']),
  preferredDate: z
    .union([z.literal(''), z.iso.date('Please choose a valid date.')])
    .optional()
    .refine(
      (v) =>
        !v ||
        (/^\d{4}-\d{2}-\d{2}$/.test(v) &&
          v >= new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })),
      'Please choose today or a future date.',
    ),
  message: z.string().max(2000, 'Please keep your message under 2,000 characters.').optional(),
  consent: z.boolean().refine((v) => v, 'Please agree so our team can contact you.'),
  sourcePage: z.string().max(500).optional(),
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  website: z.string().max(0).optional(),
});
export type EnquiryValues = z.infer<typeof enquirySchema>;
