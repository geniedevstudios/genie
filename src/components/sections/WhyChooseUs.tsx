'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { GenieMark } from '@/components/common/GenieMark';
import styles from './WhyChooseUs.module.css';

const FEATURE_GRID = [
  {
    key: 'innovative',
    title: 'Production-Ready',
    description:
      'We don’t ship fragile prototypes. Every build is architected for real traffic, fast loads, and clean scaling.',
  },
  {
    key: 'ethical',
    title: 'Transparent Scope',
    description:
      'Fixed milestones, upfront Cedi pricing, and direct communication with the engineers writing your code.',
  },
  {
    key: 'experienced',
    title: 'Full-Stack Depth',
    description:
      'From pixel-accurate UI and mobile apps to payment webhooks and database tuning, we own the entire stack.',
  },
  {
    key: 'sustainable',
    title: 'Clean Handoff',
    description:
      'Well-documented repositories, automated deployments, and zero vendor lock-in so you truly own your product.',
  },
] as const;

const ROMAN = ['I', 'II', 'III', 'IV'] as const;

/** Custom avatars for the rating stack */
const TRUST_AVATARS = ['/joey logo.png', '/genie-logo.png', '/genie-logo.png'] as const;

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
              aria-label="Why Partner with Genie | dev studios?"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            >
              <span className={styles.heroTitleLine} aria-hidden>
                Why Partner with <GenieMark width={34} className={styles.heroTitleGenie} /> | dev studios?
              </span>
            </motion.h2>
            <motion.p
              className={styles.heroSub}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.06, ease: [0.19, 1, 0.22, 1] }}
            >
              You work directly with senior builders who scope clearly, ship on schedule, and stand behind every release.
            </motion.p>
          </div>

          <motion.aside
            className={styles.ratingCard}
            role="group"
            aria-label="Client trust and satisfaction"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className={styles.ratingStars} aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={styles.ratingStarIcon}
                  size={17}
                  strokeWidth={1.75}
                  fill="currentColor"
                  aria-hidden
                />
              ))}
            </div>
            <p className={styles.ratingEyebrow}>Production track record</p>
            <p className={styles.ratingHeadline}>Trusted by 30+ growing brands</p>
            <p className={styles.ratingTagline}>
              From e-commerce storefronts to custom internal tools, scoped upfront and engineered to last.
            </p>
            <div className={styles.ratingFooter}>
              <div className={styles.avatarStack} aria-hidden>
                {TRUST_AVATARS.map((src, i) => (
                  <img
                    key={`${src}-${i}`}
                    src={src}
                    alt=""
                    className={styles.avatarImg}
                    width={36}
                    height={36}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
              <span className={styles.ratingChip}>20+ systems shipped</span>
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
