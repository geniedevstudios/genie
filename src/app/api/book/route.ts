import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { escapeHtml, generateEmailTemplate } from '@/utils/emailTemplates';
import { contactRequest } from '@/lib/leadValidation';
import { prepareSubmission, verifySubmission } from '@/lib/formProtection.server';
import { submissionErrorResponse } from '@/lib/submissionError';


export async function POST(req: Request) {
  try {
    const submission = await prepareSubmission(req);
    if (submission.honeypotFilled) return NextResponse.json({ message: 'Success' });
    const input = contactRequest.parse(submission.body);
    await verifySubmission(submission, 'contact');

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set in the environment variables.');
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const resolvedName = `${input.firstName} ${input.lastName}`;
    const nameHtml = escapeHtml(resolvedName);
    const purposeHtml = escapeHtml(input.purpose).replace(/\n/g, '<br />');
    const emailHtml = escapeHtml(input.email);
    const phoneHtml = escapeHtml(input.phone || 'Not provided');

    const adminEmailHtml = generateEmailTemplate({
      title: 'New Contact Request',
      contentHtml: `
        <h2>New Contact Request</h2>
        <p>A new contact request has been submitted by <strong>${nameHtml}</strong>.</p>
        
        <h3>Details</h3>
        <ul>
          <li><strong>Name:</strong> ${nameHtml}</li>
          <li><strong>Email:</strong> ${emailHtml}</li>
          <li><strong>Phone:</strong> ${phoneHtml}</li>
          <li><strong>Purpose:</strong> ${purposeHtml}</li>
        </ul>
      `
    });

    const userEmailHtml = generateEmailTemplate({
      title: 'Thank you for your Contact Request',
      contentHtml: `
        <h2>Hi ${nameHtml},</h2>
        <p>Our team has received your contact request.</p>
        <p>We're reviewing your details and will get back to you shortly.</p>
        <p>If you need immediate assistance, please reply directly to this email.</p>
        <br />
        <p>Best regards,</p>
        <p><strong>The Genie Dev Studios Team</strong></p>
      `
    });

    const [adminRes, userRes] = await Promise.all([
      resend.emails.send({
        from: 'Genie Dev Studios <contact@geniedevstudios.com>',
        to: process.env.EMAIL_USER || 'geniedev.noreply@gmail.com',
        replyTo: input.email,
        subject: `New Contact Request Received: ${resolvedName}`,
        html: adminEmailHtml,
      }),
      resend.emails.send({
        from: 'Genie Dev Studios <contact@geniedevstudios.com>',
        to: input.email,
        subject: `Thank you for reaching out to Genie Dev Studios`,
        html: userEmailHtml,
      })
    ]);

    if (adminRes.error || userRes.error) {
      console.error('Resend Errors:', adminRes.error, userRes.error);
      return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    const rejection = submissionErrorResponse(error);
    if (rejection) return rejection;
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Please check your name, email, phone, message (10–4,000 characters), and privacy consent.' }, { status: 400 });
    }
    console.error('Booking API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
