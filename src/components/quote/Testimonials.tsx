'use client';

import Image from 'next/image';
import styles from './quote.module.css';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'JOEY The Brand · Storefront',
    text: 'Genie Dev Studios built our storefront and checkout, and stayed with the work through launch.',
    avatar: '/joey logo.png',
  },
  {
    id: 2,
    name: 'JOEY The Brand · Admin & Ops',
    text: 'The admin they built is what we use for inventory, orders, and drops, instead of tracking that work in spreadsheets.',
    avatar: '/joey logo.png',
  },
  {
    id: 3,
    name: 'JOEY The Brand · Product UI/UX',
    text: 'They designed the shop screens and the back-office screens as one product, and we could talk to the people building it.',
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
      <div className={styles.testimonialsGrid}>
        {TESTIMONIALS.map((t, idx) => (
          <div key={`${t.id}-${idx}`} className={styles.testimonialCard}>
            <p className={styles.testimonialText}>{t.text}</p>
            <div className={styles.testimonialAuthor}>
              <Image src={t.avatar} alt="" width={36} height={36} className={styles.authorAvatar} />
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{t.name}</span>
                <div className={styles.stars}>
                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
