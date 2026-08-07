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
  const [active, setActive] = useState<PortfolioCategoryId | null>('web');
  const listId = useId();
  const detailRef = React.useRef<HTMLDivElement>(null);

  const activeCategory = useMemo(
    () => PORTFOLIO_CATEGORIES.find(c => c.id === active) ?? PORTFOLIO_CATEGORIES[0],
    [active]
  );
  const items = active ? PORTFOLIO_PROJECTS[active] : PORTFOLIO_PROJECTS['web'];

  const handleCategoryClick = (id: PortfolioCategoryId) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 960;

    if (isMobile && active === id) {
      setActive(null);
      return;
    }

    setActive(id);
    
    // On mobile, scroll the tapped category to the top so the accordion has room.
    if (isMobile) {
      setTimeout(() => {
        document.getElementById(`${listId}-control-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  const renderDetail = (className: string, idPrefix: string) => (
    <div
      className={`${styles.detailShell} ${className}`}
      role="region"
      id={`${listId}-panel-${idPrefix}`}
      aria-labelledby={`${listId}-control-${active}`}
      ref={idPrefix === 'desktop' ? detailRef : undefined}
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
  );

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
                <React.Fragment key={cat.id}>
                  <div
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
                    aria-controls={`${listId}-panel-mobile`}
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

                  <AnimatePresence>
                    {selected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        {renderDetail(styles.mobileDetailShell, 'mobile')}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              );
            })}
          </div>

          {renderDetail(styles.desktopDetailShell, 'desktop')}
        </div>
      </div>
    </section>
  );
}
