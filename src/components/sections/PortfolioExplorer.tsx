'use client';

import React, { useId, useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';
import {
  type PortfolioCategoryId,
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_PROJECTS,
} from '@/lib/portfolioData';
import { PortfolioProjectCard } from '@/components/portfolio/PortfolioProjectCard';
import styles from './PortfolioExplorer.module.css';

export type { PortfolioCategoryId } from '@/lib/portfolioData';

export function PortfolioExplorer() {
  const [active, setActive] = useState<PortfolioCategoryId>('web');
  const listId = useId();
  const detailRef = React.useRef<HTMLDivElement>(null);

  const activeCategory = useMemo(
    () => PORTFOLIO_CATEGORIES.find(c => c.id === active) ?? PORTFOLIO_CATEGORIES[0],
    [active]
  );
  const items = PORTFOLIO_PROJECTS[active];

  const handleCategoryClick = (id: PortfolioCategoryId) => {
    setActive(id);
    
    // On mobile/tablet, the detail shell is below the categories.
    // We scroll it into view for better UX when the selection changes.
    if (typeof window !== 'undefined' && window.innerWidth <= 960) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50); // small delay to allow active state to begin rendering
    }
  };

  return (
    <section
      className={`${styles.section} section-spacing`}
      aria-label="Portfolio showcase"
      id="portfolio-showcase"
    >
      <div className={`${styles.sectionInner} container`}>
        <div className={styles.layout}>
          <div className={styles.categories} aria-label="Portfolio categories">
            {PORTFOLIO_CATEGORIES.map(cat => {
              const selected = active === cat.id;
              return (
                <div
                  key={cat.id}
                  className={`${styles.categoryCardOuter} ${selected ? styles.categoryCardActive : ''}`}
                  onClick={() => handleCategoryClick(cat.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCategoryClick(cat.id);
                    }
                  }}
                  aria-pressed={selected}
                  id={`${listId}-control-${cat.id}`}
                  aria-controls={`${listId}-panel`}
                >
                  <div className={styles.categoryTextContent}>
                    <span className={styles.categoryTitle}>{cat.title}</span>
                    <span className={styles.categoryDesc}>{cat.description}</span>
                  </div>
                  <div className={styles.browseProjectsWrap}>
                    <Link
                      href={`/portfolio/${cat.id}`}
                      className={styles.browseProjectsBubble}
                      prefetch
                      onClick={(e) => e.stopPropagation()}
                    >
                      Browse projects
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className={styles.detailShell}
            role="region"
            id={`${listId}-panel`}
            aria-labelledby={`${listId}-control-${active}`}
            ref={detailRef}
          >
            <div className={styles.detailTop}>
              <div>
                <span className={styles.detailLabel}>
                  <LayoutGrid size={14} strokeWidth={2} aria-hidden />
                  Preview
                </span>
                <h3 className={styles.detailTitle}>{activeCategory.title}</h3>
              </div>
              <div className={styles.detailBadge} aria-hidden>
                <LayoutGrid size={18} strokeWidth={2} />
              </div>
            </div>

            <div className={styles.projectScroll}>
              {items.length === 0 ? (
                <div className={styles.emptyStateWrap}>
                  <p className={styles.emptyState}>Projects for this category are on the way.</p>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className={styles.projectGrid}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: [0.19, 1, 0.22, 1] }}
                  >
                    {items.map((project, index) => (
                      <PortfolioProjectCard key={project.id} project={project} index={index} TitleTag="h4" />
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
