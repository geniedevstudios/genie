import type { CSSProperties } from 'react';
import Link from 'next/link';
import type { PortfolioItem } from '@/lib/portfolioData';
import { PORTFOLIO_THUMB_GRADIENTS } from '@/lib/portfolioData';
import styles from '@/components/sections/PortfolioExplorer.module.css';

export type PortfolioProjectCardProps = {
  project: PortfolioItem;
  index: number;
  TitleTag?: 'h2' | 'h4';
  /** `preview` = hero image behind text (portfolio explorer). `page` = stacked layout for category route. */
  variant?: 'preview' | 'page';
};

function thumbGradient(index: number): CSSProperties {
  return {
    background: PORTFOLIO_THUMB_GRADIENTS[index % PORTFOLIO_THUMB_GRADIENTS.length],
  };
}

export function PortfolioProjectCard({
  project,
  index,
  TitleTag = 'h4',
  variant = 'preview',
}: PortfolioProjectCardProps) {
  if (variant === 'page') {
    return (
      <article className={styles.projectCardPage}>
        <div className={styles.projectCardPageTop}>
          <TitleTag className={styles.projectCardPageTitle}>{project.title}</TitleTag>
          <p className={styles.projectCardPageSummary}>{project.summary}</p>
          <Link href={project.href} className={styles.viewBtnPage} prefetch={false}>
            View project
          </Link>
        </div>
        <div className={styles.projectCardPageFigure} aria-hidden>
          {project.thumbSrc ? (
            <img
              src={project.thumbSrc}
              alt=""
              className={styles.projectCardPageImg}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          ) : (
            <div className={styles.projectCardPageGradient} style={thumbGradient(index)} />
          )}
          <div className={styles.projectCardPageFade} />
        </div>
      </article>
    );
  }

  return (
    <article className={styles.projectCard}>
      <div className={styles.projectCardMedia} aria-hidden>
        {project.thumbSrc ? (
          <>
            <img
              src={project.thumbSrc}
              alt=""
              className={styles.projectCardBlur}
              loading="lazy"
              decoding="async"
            />
            <img
              src={project.thumbSrc}
              alt=""
              className={styles.projectCardBgImg}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </>
        ) : (
          <div className={styles.projectCardGradient} style={thumbGradient(index)} />
        )}
        <div className={styles.projectCardScrim} />
      </div>

      <div className={styles.projectCardForeground}>
        <TitleTag className={styles.projectName}>{project.title}</TitleTag>
        <p className={styles.projectSummary}>{project.summary}</p>
        <Link href={project.href} className={styles.viewBtn} prefetch={false}>
          View project
        </Link>
      </div>
    </article>
  );
}
