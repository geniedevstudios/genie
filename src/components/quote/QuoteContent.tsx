import { Testimonials } from './Testimonials';
import { FloatingTools } from './FloatingTools';
import { FaqAccordion } from './FaqAccordion';
import { QuoteForm } from './QuoteForm';
import { StudioCharacter } from '@/components/common/StudioCharacter';
import styles from './quote.module.css';

export function QuoteContent() {
  return (
    <div className={styles.quoteWrapper}>
      <header className={styles.hero}>
        <span className="studio-eyebrow">Your next great build starts here</span>
        <h1 className="studio-title">Make a wish.<br />Let’s make a plan.</h1>
        <p>Tell us what you have in mind. We’ll shape the scope, map out the next steps, and agree a price before the work begins.</p>
        <StudioCharacter character="together" />
      </header>
      <QuoteForm />
      <div className={styles.container}>
        <section aria-labelledby="client-notes-heading">
          <span className="studio-eyebrow">From the people we build with</span>
          <h2 id="client-notes-heading" className={styles.sectionTitle}>Good work. Shared stories.</h2>
          <Testimonials />
        </section>
        <FloatingTools />
        <FaqAccordion />
      </div>
    </div>
  );
}
