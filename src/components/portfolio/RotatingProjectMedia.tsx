'use client';

import { useEffect, useState } from 'react';
import { PORTFOLIO_IMAGE_ROTATE_MS } from '@/lib/portfolioData';
import styles from '@/components/sections/PortfolioExplorer.module.css';

type RotatingProjectMediaProps = {
  sources: string[];
  variant: 'preview' | 'page';
  /** First card’s first image loads eagerly */
  eagerFirst?: boolean;
};

export function RotatingProjectMedia({ sources, variant, eagerFirst }: RotatingProjectMediaProps) {
  const [active, setActive] = useState(0);
  const n = sources.length;
  const sourcesKey = sources.join('|');

  useEffect(() => {
    setActive(0);
  }, [sourcesKey]);

  useEffect(() => {
    if (n <= 1) return;
    const id = window.setInterval(() => {
      setActive(a => (a + 1) % n);
    }, PORTFOLIO_IMAGE_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [n, sourcesKey]);

  if (variant === 'preview') {
    return (
      <>
        {sources.map((src, i) => (
          <div
            key={src}
            className={styles.projectCardSlide}
            data-active={i === active ? 'true' : undefined}
            aria-hidden={i !== active}
          >
            <img
              src={src}
              alt=""
              className={styles.projectCardBlur}
              loading={eagerFirst && i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            <img
              src={src}
              alt=""
              className={styles.projectCardBgImg}
              loading={eagerFirst && i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {sources.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={styles.projectCardPageImg}
          loading={eagerFirst && i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          style={{
            opacity: i === active ? 1 : 0,
            transition: 'opacity 0.65s ease-in-out',
          }}
        />
      ))}
    </>
  );
}
