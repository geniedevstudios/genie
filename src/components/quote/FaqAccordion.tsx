'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import styles from './quote.module.css';

const FAQS = [
  {
    question: 'How do you price your projects?',
    answer: 'We typically price our projects on a milestone basis, which depends on the complexity, timeline, and required tech stack. Once we understand your requirements during our discovery phase, we’ll provide a transparent, fixed-price quote so there are no surprises.',
  },
  {
    question: 'How long does a typical build take?',
    answer: 'A standard web application or MVP usually takes between 1 to 3 weeks from design to deployment. More complex systems with custom backends, payment integrations, or mobile apps may take 1 to 3 months. We establish strict, realistic timelines before any code is written.',
  },
  {
    question: 'Do you offer ongoing maintenance?',
    answer: 'Yes. We build systems to be maintainable and scalable from day one, but we also offer retainer packages for ongoing support, security updates, and feature additions so your product continues to perform reliably in production.',
  }
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={styles.faqSection}>
      <div className={styles.faqLeft}>
        <h2 className={styles.faqTitle}>
          Frequently <span>asked<br />questions</span>
        </h2>
        <p className={styles.faqDesc}>
          Have questions before we start? Here are a few common ones we get about our process, timelines, and how we deliver value.
        </p>
      </div>

      <div className={styles.faqList}>
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className={styles.faqItem} data-open={isOpen}>
              <button className={styles.faqHeader} onClick={() => toggle(idx)}>
                <Plus size={20} strokeWidth={2.5} className={styles.faqIcon} />
                {faq.question}
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className={styles.faqContent}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
