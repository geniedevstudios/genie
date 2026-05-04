'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { PortfolioItem } from '@/lib/portfolioData';
import { getPortfolioThumbSources, PORTFOLIO_IMAGE_ROTATE_MS, PORTFOLIO_PROJECTS } from '@/lib/portfolioData';
import styles from './FeaturedProjects.module.css';

/** Home featured strip — projects that have a hero image in `/public` (one tile per title when listed in multiple categories) */
const FEATURED_PROJECTS: PortfolioItem[] = (() => {
  const withThumbs = [
    ...PORTFOLIO_PROJECTS.web,
    ...PORTFOLIO_PROJECTS.uiux,
    ...PORTFOLIO_PROJECTS.security,
  ].filter(p => getPortfolioThumbSources(p).length > 0);
  const seenTitles = new Set<string>();
  const out: PortfolioItem[] = [];
  for (const p of withThumbs) {
    if (seenTitles.has(p.title)) continue;
    seenTitles.add(p.title);
    out.push(p);
  }
  return out;
})();

export const FeaturedProjects: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(FEATURED_PROJECTS[0]?.id ?? '');
  const [imgIdx, setImgIdx] = useState(0);

  const active = FEATURED_PROJECTS.find(p => p.id === activeId) ?? FEATURED_PROJECTS[0];
  const thumbSources = active ? getPortfolioThumbSources(active) : [];

  useEffect(() => {
    setImgIdx(0);
  }, [active?.id]);

  useEffect(() => {
    if (thumbSources.length <= 1) return;
    const id = window.setInterval(() => {
      setImgIdx(i => (i + 1) % thumbSources.length);
    }, PORTFOLIO_IMAGE_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [thumbSources.length, active?.id]);

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
          <div className={styles.featuredMediaWrap}>
            {thumbSources.length > 1 ? (
              <div className={styles.featuredMediaStack} aria-hidden>
                {thumbSources.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className={styles.featuredMediaLayer}
                    data-active={i === imgIdx ? 'true' : undefined}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                ))}
              </div>
            ) : thumbSources.length === 1 ? (
              <img
                className={styles.featuredMedia}
                src={thumbSources[0]}
                alt=""
                loading="eager"
                decoding="async"
              />
            ) : (
              <div
                className={styles.featuredPlaceholder}
                role="img"
                aria-label={`${active?.title ?? 'Project'} preview`}
              >
                <span className={styles.featuredPlaceholderLabel}>Preview unavailable</span>
              </div>
            )}
          </div>

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
