import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateEmailTemplate } from '@/utils/emailTemplates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      projectType, 
      features, 
      description, 
      budget, 
      timeframe, 
      contact, 
      estimate 
    } = body;

    if (!contact?.name || !contact?.email || !contact?.whatsapp) {
      return NextResponse.json({ error: 'Missing required contact fields' }, { status: 400 });
    }

    const adminEmailHtml = generateEmailTemplate({
      title: 'New Quote Request',
      contentHtml: `
        <h2>New Custom Quote Request</h2>
        <p>A new quote request has been submitted by <strong>${contact.name}</strong>.</p>
        
        <h3>Contact Information</h3>
        <ul>
          <li><strong>Name:</strong> ${contact.name}</li>
          <li><strong>Email:</strong> ${contact.email}</li>
          <li><strong>WhatsApp:</strong> ${contact.whatsapp}</li>
        </ul>
        
        <h3>Project Details</h3>
        <ul>
          <li><strong>Project Type:</strong> ${projectType || 'Not specified'}</li>
          <li><strong>Budget Range:</strong> ${budget || 'Not specified'}</li>
          <li><strong>Start Timeframe:</strong> ${timeframe || 'Not specified'}</li>
          <li><strong>Calculated Estimate Shown to User:</strong> ${estimate}</li>
        </ul>
        
        <h3>Capabilities & Features Requested:</h3>
        <ul>
          ${features?.map((f: string) => `<li>${f}</li>`).join('') || '<li>None selected</li>'}
        </ul>
        
        <h3>Description / Additional Details</h3>
        <p>${description || 'Not provided'}</p>
      `
    });

    const userEmailHtml = generateEmailTemplate({
      title: 'Thank you for your Quote Request',
      contentHtml: `
        <h2>Hi ${contact.name},</h2>
        <p>Our team has received your quote requisition for your ${projectType || 'project'}.</p>
        <p>We are currently reviewing your requirements and will get back to you shortly with next steps.</p>
        <p>If you have any urgent questions, feel free to reply directly to this email.</p>
        <br />
        <p>Best regards,</p>
        <p><strong>The Genie Dev Studios Team</strong></p>
      `
    });

    const [adminRes, userRes] = await Promise.all([
      resend.emails.send({
        from: 'Genie Dev Studios <quote@geniedevstudios.com>',
        to: 'quote@geniedevstudios.com',
        replyTo: contact.email,
        subject: `New Quote Request Received: ${contact.name}`,
        html: adminEmailHtml,
      }),
      resend.emails.send({
        from: 'Genie Dev Studios <quote@geniedevstudios.com>',
        to: contact.email,
        subject: `Thank you for your Quote Request - Genie Dev Studios`,
        html: userEmailHtml,
      })
    ]);

    if (adminRes.error || userRes.error) {
      console.error('Resend Errors:', adminRes.error, userRes.error);
      return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Quote request sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Quote API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
