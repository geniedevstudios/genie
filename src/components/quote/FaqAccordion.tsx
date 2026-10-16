'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import styles from './quote.module.css';

const FAQS = [
  {
    question: 'How do you price your projects?',
    answer: 'Every build is priced on a fixed-scope milestone basis in Ghana Cedis (GH₵)—never open-ended hourly billing. The calculator above gives you an immediate ballpark range based on your selected features, and we lock in an exact fixed quote after a brief discovery call.',
  },
  {
    question: 'How long does a typical build take?',
    answer: 'Focused websites, UI/UX prototypes, and security audits typically ship in 1–3 weeks. Full-stack web platforms, custom e-commerce systems, and mobile apps take 1–3 months depending on integrations, with weekly staging builds from week one.',
  },
  {
    question: 'Do I own the source code and infrastructure?',
    answer: 'Yes, 100%. Upon final settlement, full repository ownership, custom designs, domains, and cloud/payment accounts belong to your business—with zero proprietary lock-in. We also offer optional retainer plans if you want our team to handle ongoing updates and monitoring.',
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
          Straight answers on how we scope, price, and ship software at Genie Dev Studios.
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
