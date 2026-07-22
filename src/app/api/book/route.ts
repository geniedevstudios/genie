import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
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

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: resolvedEmail,
      subject: `New Contact: ${resolvedName} - ${resolvedPurpose}`,
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${resolvedName}</p>
        <p><strong>Email:</strong> ${resolvedEmail}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Purpose:</strong> ${resolvedPurpose}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

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
