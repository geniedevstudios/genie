import type { CSSProperties } from 'react';
import Link from 'next/link';
import type { PortfolioItem } from '@/lib/portfolioData';
import { getPortfolioThumbSources, PORTFOLIO_THUMB_GRADIENTS } from '@/lib/portfolioData';
import { portfolioRomanNumeral } from '@/lib/portfolioRoman';
import { RotatingProjectMedia } from '@/components/portfolio/RotatingProjectMedia';
import styles from '@/components/sections/PortfolioExplorer.module.css';

export type PortfolioProjectCardProps = {
  project: PortfolioItem;
  index: number;
  TitleTag?: 'h2' | 'h4';
  /** `preview` = portfolio explorer. `page` = category route with card chrome */
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
  const sources = getPortfolioThumbSources(project);
  const useRotation = sources.length > 1;
  const reverse = index % 2 === 1;
  const roman = portfolioRomanNumeral(index);

  const viewBtn = (
    <Link href={project.href} className={styles.viewBtnInCard} prefetch={false}>
      View project
    </Link>
  );

  if (variant === 'page') {
    return (
      <article
        className={`${styles.projectCardRow} ${styles.projectCardRowSurface} ${reverse ? styles.projectCardRowReverse : ''}`}
      >
        <div className={styles.projectCardVisual}>
          <div className={`${styles.projectCardPageFigureInner} ${styles.projectCardFigureWithCta}`}>
            {sources.length > 0 ? (
              useRotation ? (
                <RotatingProjectMedia
                  sources={sources}
                  variant="page"
                  eagerFirst={index === 0}
                />
              ) : (
                <img
                  src={sources[0]}
                  alt=""
                  className={styles.projectCardPageImg}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              )
            ) : (
              <div className={styles.projectCardPageGradient} style={thumbGradient(index)} />
            )}
            {viewBtn}
          </div>
        </div>

        <div className={styles.projectCardAside}>
          <div className={styles.projectAsideHead}>
            <span className={styles.projectAsideRoman} aria-hidden="true">
              {roman}
            </span>
            <TitleTag className={styles.projectAsideTitle}>{project.title}</TitleTag>
          </div>
          <p className={styles.projectAsideSummary}>{project.summary}</p>
        </div>
      </article>
    );
  }

  return (
    <article className={`${styles.projectCardRow} ${reverse ? styles.projectCardRowReverse : ''}`}>
      <div className={styles.projectCardVisual}>
        <div className={`${styles.projectCardVisualInner} ${styles.projectCardFigureWithCta}`}>
          <div className={styles.projectCardMedia}>
            {sources.length > 0 ? (
              useRotation ? (
                <RotatingProjectMedia
                  sources={sources}
                  variant="preview"
                  eagerFirst={index === 0}
                />
              ) : (
                <>
                  <img
                    src={sources[0]}
                    alt=""
                    className={styles.projectCardBlur}
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    src={sources[0]}
                    alt=""
                    className={styles.projectCardBgImg}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </>
              )
            ) : (
              <div className={styles.projectCardGradient} style={thumbGradient(index)} />
            )}
          </div>
          {viewBtn}
        </div>
      </div>

      <div className={styles.projectCardAside}>
        <div className={styles.projectAsideHead}>
          <span className={styles.projectAsideRoman} aria-hidden="true">
            {roman}
          </span>
          <TitleTag className={styles.projectAsideTitle}>{project.title}</TitleTag>
        </div>
        <p className={styles.projectAsideSummary}>{project.summary}</p>
      </div>
    </article>
  );
}
