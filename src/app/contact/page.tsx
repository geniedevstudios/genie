import type { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ContactPageForm } from '@/components/sections/ContactPageForm';

export const metadata: Metadata = {
  title: 'Contact Us | Genie Dev Studios',
  description: 'Tell Genie Dev Studios what you need built, or describe the problem if you are not sure yet.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | Genie Dev Studios',
    description: 'Describe a product or a business problem. We reply with an approach, a scope, and a price.',
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="home-main-surface" data-theme="dark">
        <ContactPageForm />
      </main>
      <Footer />
    </>
  );
}
