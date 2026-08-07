import type { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ContactPageForm } from '@/components/sections/ContactPageForm';

export const metadata: Metadata = {
  title: 'Contact | Genie │ dev',
  description: 'Get in touch — support, phone, and a quick form. We respond with clear next steps.',
};

import styles from '@/app/page.module.css';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className={styles.homeMain} data-theme="light">
        <ContactPageForm />
      </main>
      <Footer />
    </>
  );
}
