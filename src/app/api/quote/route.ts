import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { escapeHtml, generateEmailTemplate } from '@/utils/emailTemplates';
import { quoteRequest } from '@/lib/leadValidation';
import { prepareSubmission, verifySubmission } from '@/lib/formProtection.server';
import { submissionErrorResponse } from '@/lib/submissionError';

export async function POST(request: Request) {
  try {
    const submission = await prepareSubmission(request);
    if (submission.honeypotFilled) return NextResponse.json({ message: 'Success' });
    const input = quoteRequest.parse(submission.body);
    await verifySubmission(submission, 'quote');

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set in the environment variables.');
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const name = escapeHtml(input.name);
    const email = escapeHtml(input.email);
    const phone = escapeHtml(input.phone);
    const message = escapeHtml(input.message).replace(/\n/g, '<br />');

    const adminEmailHtml = generateEmailTemplate({
      title: 'New Quote Request',
      contentHtml: `
        <h2>New Quote Request</h2>
        <p>A new quote request has been submitted by <strong>${name}</strong>.</p>

        <h3>Details</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
        </ul>

        <h3>Project details</h3>
        <p>${message}</p>
      `,
    });

    const userEmailHtml = generateEmailTemplate({
      title: 'Thank you for your Quote Request',
      contentHtml: `
        <h2>Hi ${name},</h2>
        <p>Our team has received your quote request.</p>
        <p>We'll review the details and email you a quote shortly.</p>
        <p>If you have any urgent questions, feel free to reply directly to this email.</p>
        <br />
        <p>Best regards,</p>
        <p><strong>The Genie Dev Studios Team</strong></p>
      `,
    });

    const [adminRes, userRes] = await Promise.all([
      resend.emails.send({
        from: 'Genie Dev Studios <quote@geniedevstudios.com>',
        to: process.env.EMAIL_USER || 'geniedev.noreply@gmail.com',
        replyTo: input.email,
        subject: `New Quote Request Received: ${input.name}`,
        html: adminEmailHtml,
      }),
      resend.emails.send({
        from: 'Genie Dev Studios <quote@geniedevstudios.com>',
        to: input.email,
        subject: 'Thank you for your Quote Request - Genie Dev Studios',
        html: userEmailHtml,
      }),
    ]);

    if (adminRes.error || userRes.error) {
      console.error('Resend Errors:', adminRes.error, userRes.error);
      return NextResponse.json({ error: 'Unable to send quote request' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    const rejection = submissionErrorResponse(error);
    if (rejection) return rejection;
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid quote request' }, { status: 400 });
    }
    console.error('Quote submission failed', error);
    return NextResponse.json({ error: 'Unable to send quote request' }, { status: 500 });
  }
}
