import type { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { About } from '@/components/sections/About';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About | Genie Dev Studios',
  description:
    'Genie Dev Studios is the software studio of Genie Platforms in Accra. We design and build custom websites, applications, and business systems.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About | Genie Dev Studios',
    description:
      'Genie Dev Studios is the software studio of Genie Platforms in Accra. We design and build custom websites, applications, and business systems.',
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className={`${styles.page} home-main-surface`} data-theme="dark">
        <About />
      </main>
      <Footer />
    </>
  );
}
