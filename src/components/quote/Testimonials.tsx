'use client';

import { motion } from 'framer-motion';
import styles from './quote.module.css';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    text: 'Working with Genie dev was an absolute game-changer. They delivered our complex e-commerce platform ahead of schedule, with flawless code quality.',
    avatar: 'https://i.pravatar.cc/100?img=1',
  },
  {
    id: 2,
    name: 'Marcus Chen',
    text: 'Their deep understanding of systems architecture helped us scale from a few hundred users to tens of thousands without a single hiccup.',
    avatar: 'https://i.pravatar.cc/100?img=11',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    text: 'Incredible attention to detail. Not only is the final product lightning fast, but the communication throughout the entire build process was top-tier.',
    avatar: 'https://i.pravatar.cc/100?img=9',
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
