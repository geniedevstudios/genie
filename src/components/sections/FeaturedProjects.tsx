'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { PortfolioItem } from '@/lib/portfolioData';
import { PORTFOLIO_PROJECTS } from '@/lib/portfolioData';
import styles from './FeaturedProjects.module.css';

/** Home featured strip — projects that have a hero image in `/public` */
const FEATURED_PROJECTS: (PortfolioItem & { thumbSrc: string })[] = [
  ...PORTFOLIO_PROJECTS.web,
  ...PORTFOLIO_PROJECTS.uiux,
  ...PORTFOLIO_PROJECTS.security,
].filter((p): p is PortfolioItem & { thumbSrc: string } => Boolean(p.thumbSrc));

export const FeaturedProjects: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(FEATURED_PROJECTS[0]?.id ?? '');

  const active = FEATURED_PROJECTS.find(p => p.id === activeId) ?? FEATURED_PROJECTS[0];

  if (!FEATURED_PROJECTS.length) {
    return null;
  }

  return (
    <section
      id="featured-projects"
      aria-labelledby="featured-projects-heading"
      className={`${styles.section} section-spacing`}
    >
      <div className="container">
        <header className={styles.sectionHeader}>
          <div className={styles.titleBlock}>
            <div className={styles.ghostStack} aria-hidden>
              <span>OUR</span>
              <span>WORK</span>
            </div>
            <h2 id="featured-projects-heading" className={styles.title}>
              Featured projects
            </h2>
          </div>
          <p className={styles.lede}>
            Preview a build below — then browse the tiles to explore each project&apos;s summary.
          </p>
        </header>

        <div className={styles.featuredProjects} aria-label="Featured project showcase">
          <motion.div 
            layout 
            className={styles.featuredMediaWrap}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          >
            <AnimatePresence mode="wait">
              {active?.thumbSrc ? (
                <motion.img
                  key={active.id}
                  className={styles.featuredMedia}
                  src={active.thumbSrc}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <motion.div
                  key="placeholder"
                  className={styles.featuredPlaceholder}
                  role="img"
                  aria-label={`${active?.title ?? 'Project'} preview`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className={styles.featuredPlaceholderLabel}>Preview unavailable</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            key={active?.id}
            className={styles.featuredDesc}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className={styles.featuredDescText}>{active?.summary}</p>
          </motion.div>

          <nav className={styles.featuredToolbar} aria-label="Choose a featured project">
            <ul className={styles.featuredTileGrid}>
              {FEATURED_PROJECTS.map(p => {
                const selected = p.id === active?.id;
                return (
                  <li key={p.id} className={styles.featuredTileItem}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      className={`${styles.featuredTileBtn} ${selected ? styles.featuredTileBtnActive : ''}`}
                      onClick={() => setActiveId(p.id)}
                    >
                      {p.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.featuredClosingWrap}>
            <p className={styles.featuredClosing}>
              Want to be featured here?{' '}
              <Link href="/contact" className={styles.featuredClosingLink} prefetch={false}>
                Reach out to us
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
