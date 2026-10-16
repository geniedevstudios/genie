'use client';

import { motion } from 'framer-motion';
import styles from './quote.module.css';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'JOEY The Brand · Storefront',
    text: 'Genie Dev Studios took our e-commerce storefront from concept to launch ahead of schedule. Checkout is fast, mobile conversion jumped, and the site feels effortless.',
    avatar: '/joey logo.png',
  },
  {
    id: 2,
    name: 'JOEY The Brand · Admin & Ops',
    text: 'The custom admin dashboard they built replaced our manual spreadsheets completely. Managing inventory, orders, and drops now takes minutes instead of hours.',
    avatar: '/joey logo.png',
  },
  {
    id: 3,
    name: 'JOEY The Brand · Product UI/UX',
    text: 'Every screen—from product discovery to back-office fulfillment—was prototyped clearly and engineered with zero friction. Communication was direct from day one.',
    avatar: '/joey logo.png',
  },
];

const StarIcon = () => (
  <svg viewBox="0 0 24 24" className={styles.starIcon}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export function Testimonials() {
  return (
    <div className={styles.testimonialsContainer}>
      <motion.div
        className={styles.testimonialsGrid}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {/* Double the array for seamless marquee */}
        {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
          <div key={`${t.id}-${idx}`} className={styles.testimonialCard}>
            <p className={styles.testimonialText}>{t.text}</p>
            <div className={styles.testimonialAuthor}>
              <img src={t.avatar} alt={t.name} className={styles.authorAvatar} />
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{t.name}</span>
                <div className={styles.stars}>
                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
