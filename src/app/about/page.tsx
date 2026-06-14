import type { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { About } from '@/components/sections/About';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About | 🧞 │ dev',
  description:
    'How GENIE | dev works — engineering discipline, partnerships, and the team behind your next build.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <About />
      </main>
      <Footer />
    </>
  );
}
