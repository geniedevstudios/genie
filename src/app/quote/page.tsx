import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { QuoteContent } from '@/components/quote/QuoteContent';

export const metadata = {
  title: 'Get a Quote | Genie Dev Studios',
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
