import type { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { About } from '@/components/sections/About';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About | Genie Dev Studios',
  description:
    'Meet Genie Dev Studios — a software design and engineering studio in Accra building web platforms, mobile apps, and secure systems.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About | Genie Dev Studios',
    description:
      'Meet Genie Dev Studios — a software design and engineering studio in Accra building web platforms, mobile apps, and secure systems.',
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className={`${styles.page} home-main-surface`} data-theme="light">
        <About />
      </main>
      <Footer />
    </>
  );
}
