'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GenieMark } from '@/components/common/GenieMark';
import styles from './WhyChooseUs.module.css';

const FEATURE_GRID = [
  {
    key: 'innovative',
    title: 'Innovative',
    description:
      'Modern web and mobile stacks, clear architecture, and patterns that scale with your product.',
  },
  {
    key: 'ethical',
    title: 'Ethical',
    description:
      'Fair scope, honest timelines, and plain-language updates — integrity in how we ship and how we treat users and data.',
  },
  {
    key: 'experienced',
    title: 'Experienced',
    description:
      'Seasoned engineers who have shipped production systems — not throwaway demos or endless prototypes.',
  },
  {
    key: 'sustainable',
    title: 'Sustainable',
    description:
      'Milestones you can plan around, maintainable codebases, and ownership that lasts beyond launch.',
  },
] as const;

const ROMAN = ['I', 'II', 'III', 'IV'] as const;

const cellMotion = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.19, 1, 0.22, 1] as const },
  }),
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className={styles.whySection} aria-labelledby="why-hero-heading">
      <div className={styles.cutoutStage}>
        <div className={styles.heroBand}>
          <div className={styles.chooseMaskWrap}>
            <div className={styles.choosePhoto} aria-hidden />
            <div className={styles.chooseScrim} aria-hidden />
          </div>

          <div className={styles.heroCopy}>
            <motion.h2
              id="why-hero-heading"
              className={styles.heroTitle}
              aria-label="Why Partner with Genie | dev?"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            >
              <span className={styles.heroTitleLine} aria-hidden>
                Why Partner with <GenieMark width={34} className={styles.heroTitleGenie} /> | dev?
              </span>
            </motion.h2>
            <motion.p
              className={styles.heroSub}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.06, ease: [0.19, 1, 0.22, 1] }}
            >
              Our expert team is dedicated to delivering high-performance web and mobile solutions
              tailored to your needs.
            </motion.p>
          </div>

          <motion.aside
            className={styles.ratingCard}
            role="group"
            aria-label="Client satisfaction"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className={styles.ratingKicker}>Trusted delivery</p>
            <p className={styles.ratingTitle}>Quality-first builds</p>
            <p className={styles.ratingSub}>Shipped on scope — and on your timeline.</p>
            <div className={styles.ratingRow}>
              <div className={styles.avatarStack} aria-hidden>
                <span className={styles.avatar} />
                <span className={styles.avatar} style={{ filter: 'hue-rotate(32deg)' }} />
                <span className={styles.avatar} style={{ filter: 'hue-rotate(64deg)' }} />
              </div>
              <span className={styles.ratingStat}>
                <strong>+48%</strong> velocity
              </span>
            </div>
          </motion.aside>
        </div>
      </div>

      <div className={styles.featuresPanel}>
        <div className="container">
          <div className={styles.featuresGridWrap}>
            <div
              className={styles.featuresGrid}
              role="list"
              aria-label="What you get when you partner with us"
            >
              {FEATURE_GRID.map((item, i) => (
                <motion.article
                  key={item.key}
                  className={styles.featureColumn}
                  role="listitem"
                  variants={cellMotion}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  custom={i}
                >
                  <div className={styles.featureCopy}>
                    <span className={styles.featureWatermark} aria-hidden="true">
                      {ROMAN[i]}
                    </span>
                    <h3 className={styles.featureTitle}>{item.title}</h3>
                  </div>
                  <p className={styles.featureDesc}>{item.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
