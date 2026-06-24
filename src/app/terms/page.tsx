import type { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { GenieMark } from '@/components/common/GenieMark';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service | Genie | DEV',
  description: 'The terms and conditions for using GENIE | DEV services.',
};

function CompanyLogo() {
  return (
    <span className={styles.inlineLogo} aria-label="GENIE | DEV">
      <GenieMark width={18} />
      <span>&nbsp;| dev</span>
    </span>
  );
}

export default function TermsPage() {
  const lastUpdated = 'April 19, 2026';

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.glassCard}>
            <h1 className={styles.title}>Terms of Service</h1>
            <span className={styles.lastUpdated}>Last Updated: {lastUpdated}</span>

            <div className={styles.content}>
              <p>
                Welcome to <CompanyLogo />. These Terms of Service (&quot;Terms&quot;) govern your access
                to and use of our website and services. By accessing or using our services, you agree
                to be bound by these Terms and our Privacy Policy.
              </p>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>I. Acceptance of Terms</h2>
                <p>
                  By using the services provided by <CompanyLogo />, you confirm that you have read,
                  understood, and agree to these Terms. If you do not agree, you must not use our
                  services.
                </p>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>II. Description of Services</h2>
                <p>
                  <CompanyLogo /> provides software development, UI/UX design, and IT consultancy
                  services. The specific details, timelines, and deliverables for each project will
                  be outlined in separate service agreements or project proposals.
                </p>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>III. User Responsibilities</h2>
                <p>
                  As a user or client of <CompanyLogo />, you agree to:
                </p>
                <ul>
                  <li>Provide accurate and complete information as required for project execution.</li>
                  <li>Maintain the confidentiality of any project-related credentials.</li>
                  <li>Use our services only for lawful purposes and in accordance with these Terms.</li>
                </ul>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>IV. Intellectual Property Rights</h2>
                <p>
                  All intellectual property rights in the materials, code, and designs created by
                  <CompanyLogo /> shall remain the property of <CompanyLogo /> until all payments
                  are settled, after which ownership will be transferred as specified in the
                  service agreement.
                </p>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>V. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, <CompanyLogo /> shall not be liable for
                  any indirect, incidental, special, or consequential damages resulting from the use
                  or inability to use our services.
                </p>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>VI. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of Ghana,
                  without regard to its conflict of law principles.
                </p>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>VII. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. We will provide notice of
                  significant changes by updating the &quot;Last Updated&quot; date on this page.
                </p>
              </section>

              <div className={styles.contactBox}>
                <h2 className={styles.sectionTitle}>Contact Information</h2>
                <p>
                  For any questions regarding these Terms, please contact us at:
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
