import { NextResponse } from 'next/server';

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

    // Email Integration Placeholder
    // For Production: Use Resend, Mailgun, or Nodemailer
    // Example with Resend:
    /*
    const { data, error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: ['geniedev.noreply@gmail.com'],
      subject: `New Lead: ${name}`,
      html: `
        <h3>New Booking Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Purpose:</strong> ${purpose}</p>
      `,
    });
    */

    console.log('New Lead Captured:', {
      name: resolvedName,
      email: resolvedEmail,
      purpose: resolvedPurpose,
      phone: typeof phone === 'string' ? phone.trim() || undefined : undefined,
    });

    // Simulate network delay for realistic UI feedback
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Booking API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
