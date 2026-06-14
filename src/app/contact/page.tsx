import type { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ContactPageForm } from '@/components/sections/ContactPageForm';

export const metadata: Metadata = {
  title: 'Contact | 🧞 │ dev',
  description: 'Get in touch — support, phone, and a quick form. We respond with clear next steps.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactPageForm />
      <Footer />
    </>
  );
}
