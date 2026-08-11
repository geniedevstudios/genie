import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateEmailTemplate } from '@/utils/emailTemplates';


export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set in the environment variables.');
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { name, email, purpose, firstName, lastName, privacyAccepted, phone } = body as {
      name?: string;
      email?: string;
      purpose?: string;
      firstName?: string;
      lastName?: string;
      privacyAccepted?: boolean;
      phone?: string;
    };

    const resolvedName =
      name?.trim() ||
      [firstName?.trim(), lastName?.trim()].filter(Boolean).join(' ').trim();
    const resolvedPurpose = purpose?.trim() || 'Contact form';
    const resolvedEmail = email?.trim();

    if (!resolvedName || !resolvedEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const usesSplitName = Boolean(
      (typeof firstName === 'string' && firstName.length > 0) ||
        (typeof lastName === 'string' && lastName.length > 0),
    );
    if (
      usesSplitName &&
      (!firstName?.trim() || !lastName?.trim() || !privacyAccepted)
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const adminEmailHtml = generateEmailTemplate({
      title: 'New Contact Request',
      contentHtml: `
        <h2>New Contact Request</h2>
        <p>A new contact request has been submitted by <strong>${resolvedName}</strong>.</p>
        
        <h3>Details</h3>
        <ul>
          <li><strong>Name:</strong> ${resolvedName}</li>
          <li><strong>Email:</strong> ${resolvedEmail}</li>
          <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
          <li><strong>Purpose:</strong> ${resolvedPurpose}</li>
        </ul>
      `
    });

    const userEmailHtml = generateEmailTemplate({
      title: 'Thank you for your Contact Request',
      contentHtml: `
        <h2>Hi ${resolvedName},</h2>
        <p>Our team has received your contact request regarding "${resolvedPurpose}".</p>
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
        replyTo: resolvedEmail,
        subject: `New Contact Request Received: ${resolvedName}`,
        html: adminEmailHtml,
      }),
      resend.emails.send({
        from: 'Genie Dev Studios <contact@geniedevstudios.com>',
        to: resolvedEmail,
        subject: `Thank you for reaching out to Genie Dev Studios`,
        html: userEmailHtml,
      })
    ]);

    if (adminRes.error || userRes.error) {
      console.error('Resend Errors:', adminRes.error, userRes.error);
      return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 });
    }

    console.log('Email sent successfully for lead:', {
      name: resolvedName,
      email: resolvedEmail,
      purpose: resolvedPurpose,
      phone: typeof phone === 'string' ? phone.trim() || undefined : undefined,
    });

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Booking API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
