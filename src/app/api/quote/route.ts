import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
      replyTo: contact.email,
      subject: `New Quote Request: ${projectType || 'Project'} from ${contact.name}`,
      html: `
        <h2>New Custom Quote Request</h2>
        
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
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Quote request sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Quote API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
