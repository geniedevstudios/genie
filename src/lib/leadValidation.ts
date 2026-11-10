import { z } from 'zod';

// Accept international names and short, useful enquiries. Avoid guessing whether
// a person's name or email provider "looks real".
export const leadName = z.string().trim().min(1).max(100)
  .refine((value) => !/[\r\n\p{Cc}]/u.test(value), 'Enter a valid name.');
export const leadEmail = z.string().trim().email().max(254);
export const leadPhone = z.string().trim().regex(/^\+[1-9]\d{6,14}$/, 'Enter a valid international phone number.');

export const leadMessage = z.string().trim().min(10, 'Please add a little more detail (at least 10 characters).').max(4000)
  .refine((value) => {
    const compact = value.replace(/\s/g, '');
    return /[\p{L}\p{N}]/u.test(compact) && !/^(.)\1{9,}$/u.test(compact);
  }, 'Please describe what you need help with.')
  .refine((value) => (value.match(/(?:https?:\/\/|www\.)/gi) ?? []).length <= 5,
    'Please include no more than five links.');

export const contactRequest = z.object({
  firstName: leadName,
  lastName: leadName,
  email: leadEmail,
  phone: leadPhone.optional(),
  purpose: leadMessage,
  privacyAccepted: z.literal(true),
});

export const quoteRequest = z.object({
  name: leadName.refine((value) => value.length >= 2, 'Enter your name.'),
  email: leadEmail,
  phone: leadPhone,
  message: leadMessage,
  privacyAccepted: z.literal(true),
});
