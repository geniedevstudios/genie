'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import styles from './WhyChooseUs.module.css';

const FEATURE_GRID = [
  {
    key: 'innovative',
    title: 'Meet your build team',
    description:
      'Work directly with the people designing and building your product. Bring your ideas; we’ll work through the details together.',
  },
  {
    key: 'ethical',
    title: 'Know the plan',
    description:
      'A clear scope, an agreed price, and a shared path to launch. You know what we’re building and what comes next.',
  },
  {
    key: 'experienced',
    title: 'Build beyond launch',
    description:
      'Start with what matters now. We build with room for your next feature, your next customer, and your next big idea.',
  },
  {
    key: 'sustainable',
    title: 'Keep the keys',
    description:
      'Your product belongs to you. Get the source code, deployment setup, and a clear handoff so you can keep moving.',
  },
] as const;

const ROMAN = ['I', 'II', 'III', 'IV'] as const;

/** Custom avatars for the rating stack */
const TRUST_AVATARS = ['/joey logo.png', '/genie-logo.png', '/genie-logo.png'] as const;

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
            <h2
              id="why-hero-heading"
              className={styles.heroTitle}




            >
              Your idea. Our next great build.
            </h2>
            <p
              className={styles.heroSub}




            >
              Every great build starts with a conversation. Bring us the problem you want to solve, and we’ll shape the plan, build it with you, and see it through to launch.
            </p>
          </div>

          <aside
            className={styles.ratingCard}
            role="group"
            aria-label="Client trust and satisfaction"




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
            <p className={styles.ratingHeadline}>30+ companies</p>
            <p className={styles.ratingTagline}>
              Client work across shops, internal tools, and customer platforms.
            </p>
            <div className={styles.ratingFooter}>
              <div className={styles.avatarStack} aria-hidden>
                {TRUST_AVATARS.map((src, i) => (
                  <Image
                    key={`${src}-${i}`}
                    src={src}
                    alt=""
                    className={styles.avatarImg}
                    width={36}
                    height={36}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </aside>
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
                <article
                  key={item.key}
                  className={styles.featureColumn}
                  role="listitem"




                >
                  <div className={styles.featureCopy}>
                    <span className={styles.featureWatermark} aria-hidden="true">
                      {ROMAN[i]}
                    </span>
                    <h3 className={styles.featureTitle}>{item.title}</h3>
                  </div>
                  <p className={styles.featureDesc}>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
