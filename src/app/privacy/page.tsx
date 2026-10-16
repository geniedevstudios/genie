import type { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { GenieMark } from '@/components/common/GenieMark';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | Genie Dev Studios',
  description: 'How GENIE | dev studios collects, uses, and protects your information.',
};

function CompanyLogo() {
  return (
    <span className={styles.inlineLogo} aria-label="GENIE | dev studios">
      <GenieMark width={18} />
      <span>&nbsp;| dev studios</span>
    </span>
  );
}

export default function PrivacyPage() {
  const lastUpdated = 'April 19, 2026';

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.glassCard}>
            <h1 className={styles.title}>Privacy Policy</h1>
            <span className={styles.lastUpdated}>Last Updated: {lastUpdated}</span>

            <div className={styles.content}>
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>I. Introduction</h2>
                <p>
                  At <CompanyLogo />, we value your privacy and are committed to protecting your personal data.
                  This Privacy Policy explains how we collect, use, and safeguard your information when
                  you visit our website and use our services.
                </p>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>II. Information We Collect</h2>
                <p>
                  We may collect several types of information from and about users of our website, including:
                </p>
                <ul>
                  <li>
                    <strong>Personal Identifiers:</strong> Name, email address, and phone number when
                    you contact us through our forms.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Details of your visits to our website, including
                    traffic data, location data, logs, and other communication data.
                  </li>
                  <li>
                    <strong>Technical Data:</strong> IP address, browser type and version, time zone
                    setting, and operating system.
                  </li>
                </ul>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>III. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Provide, maintain, and improve our services and website.</li>
                  <li>Communicate with you regarding project inquiries or newsletters.</li>
                  <li>Analyze usage patterns to enhance user experience.</li>
                  <li>Ensure the security and integrity of our platform.</li>
                </ul>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>IV. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your
                  personal information against unauthorized access, alteration, disclosure, or
                  destruction. However, no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>V. Third-Party Services</h2>
                <p>
                  We may use third-party services such as hosting providers (Vercel), database services
                  (Supabase), and analytics tools. These third parties have access to your information
                  only to perform specific tasks on our behalf and are obligated not to disclose or
                  use it for any other purpose.
                </p>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>VI. Your Rights</h2>
                <p>
                  Depending on your location, you may have rights under data protection laws,
                  including the right to access, correct, or delete your personal data. To exercise
                  these rights, please contact us using the information below.
                </p>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>VII. Changes to This Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any
                  changes by posting the new Privacy Policy on this page and updating the &quot;Last
                  Updated&quot; date.
                </p>
              </section>

              <div className={styles.contactBox}>
                <h2 className={styles.sectionTitle}>Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                  <br />
                  <a href="mailto:geniedev.noreply@gmail.com" className={styles.contactLink}>
                    geniedev.noreply@gmail.com
                  </a>
                  <br />
                  Accra, Ghana
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
