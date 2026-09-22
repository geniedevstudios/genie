import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { escapeHtml, generateEmailTemplate } from '@/utils/emailTemplates';
import { quoteRequest } from '@/lib/leadValidation';
import { prepareSubmission, verifySubmission } from '@/lib/formProtection.server';
import { submissionErrorResponse } from '@/lib/submissionError';
import {
  BUDGET_BANDS,
  SERVICE_LABELS,
  TIMEFRAME_LABELS,
  calculateQuote,
  isQuoteInputError,
} from '@/lib/quotePricing';

export async function POST(request: Request) {
  try {
    const submission = await prepareSubmission(request);
    if (submission.honeypotFilled) return NextResponse.json({ message: 'Success' });
    const input = quoteRequest.parse(submission.body);
    const quote = calculateQuote(input);
    await verifySubmission(submission, 'quote');

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set in the environment variables.');
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const serviceLabel = SERVICE_LABELS[input.service];
    const budgetLabel = BUDGET_BANDS[input.budget].label;
    const timeframeLabel = TIMEFRAME_LABELS[input.timeframe];
    const name = escapeHtml(input.contact.name);
    const email = escapeHtml(input.contact.email);
    const whatsapp = escapeHtml(input.contact.whatsapp);
    const descriptionHtml = escapeHtml(input.description).replace(/\n/g, '<br />');
    const featuresHtml = input.features.map((f) => `<li>${escapeHtml(f)}</li>`).join('');

    const adminEmailHtml = generateEmailTemplate({
      title: 'New Quote Request',
      contentHtml: `
        <h2>New Custom Quote Request</h2>
        <p>A new quote request has been submitted by <strong>${name}</strong>.</p>

        <h3>Contact Information</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>WhatsApp:</strong> ${whatsapp}</li>
        </ul>

        <h3>Project Details</h3>
        <ul>
          <li><strong>Project Type:</strong> ${escapeHtml(serviceLabel)}</li>
          <li><strong>Budget Range:</strong> ${escapeHtml(budgetLabel)}</li>
          <li><strong>Start Timeframe:</strong> ${escapeHtml(timeframeLabel)}</li>
          <li><strong>Preliminary range:</strong> ${escapeHtml(quote.estimate)}</li>
          <li><strong>Internal calculated amount:</strong> GH₵${quote.calculated.toLocaleString('en-GH')}</li>
          <li><strong>Budget fit:</strong> ${escapeHtml(quote.budgetFit)}</li>
          <li><strong>Rush applied:</strong> ${quote.rushApplied ? 'Yes (20%)' : 'No'}</li>
        </ul>
        <p>${escapeHtml(quote.message)}</p>

        <h3>Capabilities &amp; Features Requested:</h3>
        <ul>
          ${featuresHtml}
        </ul>

        <h3>Description / Additional Details</h3>
        <p>${descriptionHtml}</p>
      `,
    });

    const userEmailHtml = generateEmailTemplate({
      title: 'Thank you for your Quote Request',
      contentHtml: `
        <h2>Hi ${name},</h2>
        <p>Our team has received your quote request for your ${escapeHtml(serviceLabel)} project.</p>
        <p>Preliminary project range: <strong>${escapeHtml(quote.estimate)}</strong>.</p>
        <p>This is a preliminary cedi range. A fixed quote and milestones are confirmed after discovery. We will get back to you shortly with next steps.</p>
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
        replyTo: input.contact.email,
        subject: `New Quote Request Received: ${input.contact.name}`,
        html: adminEmailHtml,
      }),
      resend.emails.send({
        from: 'Genie Dev Studios <quote@geniedevstudios.com>',
        to: input.contact.email,
        subject: 'Thank you for your Quote Request - Genie Dev Studios',
        html: userEmailHtml,
      }),
    ]);

    if (adminRes.error || userRes.error) {
      console.error('Resend Errors:', adminRes.error, userRes.error);
      return NextResponse.json({ error: 'Unable to send quote request' }, { status: 500 });
    }

    return NextResponse.json({ quote }, { status: 201 });
  } catch (error) {
    const rejection = submissionErrorResponse(error);
    if (rejection) return rejection;
    if (error instanceof z.ZodError || isQuoteInputError(error)) {
      return NextResponse.json({ error: 'Invalid quote request' }, { status: 400 });
    }
    console.error('Quote submission failed', error);
    return NextResponse.json({ error: 'Unable to send quote request' }, { status: 500 });
  }
}
