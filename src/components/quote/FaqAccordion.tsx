import { Plus } from 'lucide-react';
import styles from './quote.module.css';

const FAQS = [
  {
    question: 'How do you price your projects?',
    answer: 'The price is agreed on before work starts, against a written scope. Send what you know, or describe the problem if you are not sure what to build. We reply with a recommended approach and a price.',
  },
  {
    question: 'How long does a typical build take?',
    answer: 'A focused website or a small internal tool can take a few weeks. A web platform, mobile app, or larger business system usually takes longer, depending on the scope and any integrations. We confirm the timeline when the price and scope are agreed.',
  },
  {
    question: 'Do I own the source code and infrastructure?',
    answer: 'Yes, 100%. Upon final settlement, full repository ownership, custom designs, domains, and cloud/payment accounts belong to your business—with zero proprietary lock-in. We also offer optional retainer plans if you want our team to handle ongoing updates and monitoring.',
  }
];

export function FaqAccordion() {
  return <section className={styles.faqSection} aria-labelledby="faq-heading">
    <div><span className="studio-eyebrow">Before we begin</span><h2 id="faq-heading" className={styles.sectionTitle}>A few things<br />you might wonder.</h2><p className={styles.faqDesc}>Clear answers, so you can take the next step with confidence.</p></div>
    <div className={styles.faqList}>
      {FAQS.map((faq, index) => <details className={styles.faqItem} key={faq.question} open={index === 0}>
        <summary className={styles.faqHeader}>{faq.question}<Plus size={20} className={styles.faqIcon} aria-hidden /></summary>
        <p className={styles.faqContent}>{faq.answer}</p>
      </details>)}
    </div>
  </section>;
}
