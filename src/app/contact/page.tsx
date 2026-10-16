import type { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ContactPageForm } from '@/components/sections/ContactPageForm';

export const metadata: Metadata = {
  title: 'Contact Us | Genie Dev Studios',
  description: 'Get in touch — support, phone, and a quick form. We respond with clear next steps.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | Genie Dev Studios',
    description: 'Start a project with Genie Dev Studios. Share your goals and hear back from an engineer within 24 hours.',
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="home-main-surface" data-theme="light">
        <ContactPageForm />
      </main>
      <Footer />
    </>
  );
}
