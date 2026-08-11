'use client';

import { GenieMark } from '@/components/common/GenieMark';
import { Testimonials } from './Testimonials';
import { FloatingTools } from './FloatingTools';
import { FaqAccordion } from './FaqAccordion';
import { QuoteForm } from './QuoteForm';
import styles from './quote.module.css';

export function QuoteContent() {
  return (
    <div className={styles.quoteWrapper}>
      {/* Background clouds */}
      <div className={`${styles.cloud} ${styles.cloud1}`} />
      <div className={`${styles.cloud} ${styles.cloud2}`} />
      
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div className={styles.heroTitleBlock}>
            <h1 className={styles.heroTitleGroup}>
              <span className={styles.heroDisplay}>Quote</span>
              <span className={styles.heroBrandLine}>
                <span className={styles.heroBrandMarkWrap}>
                  <GenieMark width={64} className={styles.heroBrandMark} />
                </span>
                <span className={styles.heroBrandSuffix}>| dev</span>
              </span>
            </h1>
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.heroSub}>
              See what our clients have to say
            </p>
          </div>
        </div>
        
        <Testimonials />

        <p className={styles.investmentStatement}>
          We believe building a custom platform is <span>not an expense</span>, but rather an <span>investment</span>{' '}in your business&apos;s future.
        </p>
      </div>

      <QuoteForm />

      <div className={styles.container}>
        <FloatingTools />
        <FaqAccordion />
      </div>
    </div>
  );
}
