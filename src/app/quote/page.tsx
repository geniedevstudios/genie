import type { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { QuoteContent } from '@/components/quote/QuoteContent';

export const metadata: Metadata = {
  title: 'Get a Quote | Genie Dev Studios',
  description:
    'Describe the software you need, or the problem if you are not sure yet. Genie Dev Studios replies with an approach and a price.',
  alternates: {
    canonical: '/quote',
  },
  openGraph: {
    title: 'Get a Quote | Genie Dev Studios',
    description:
      'Describe the software you need, or the problem if you are not sure yet. We reply with an approach and a price.',
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
