import type { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { QuoteContent } from '@/components/quote/QuoteContent';

export const metadata: Metadata = {
  title: 'Get a Quote | Genie Dev Studios',
  description:
    'Scope your web app, mobile app, UI/UX design, or security audit and get an instant ballpark estimate in Ghana Cedis from Genie Dev Studios.',
  alternates: {
    canonical: '/quote',
  },
  openGraph: {
    title: 'Get a Quote | Genie Dev Studios',
    description:
      'Scope your web app, mobile app, UI/UX design, or security audit and get an instant ballpark estimate in Ghana Cedis.',
  },
};

export default function QuotePage() {
  return (
    <>
      <Navbar />
      <main>
        <QuoteContent />
      </main>
      <Footer />
    </>
  );
}
