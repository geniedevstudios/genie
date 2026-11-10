'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SpecialtyShowcase } from './SpecialtyShowcase';
import { GENIE_IMAGE_SRC } from '@/lib/genieAsset';
import styles from './Projects.module.css';

const PORTFOLIO_SECTION_HREF = '/portfolio';

export const Projects: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const worksVideoSrc =
    (process.env.NEXT_PUBLIC_WORKS_VIDEO_URL && process.env.NEXT_PUBLIC_WORKS_VIDEO_URL.trim()) || '/works.mp4';
  const [worksVideoOk, setWorksVideoOk] = useState(true);
  const [worksVideoReady, setWorksVideoReady] = useState(false);
  const worksRevealedRef = useRef(false);

  const handleWorksReady = useCallback(() => {
    if (worksRevealedRef.current) return;
    worksRevealedRef.current = true;
    setWorksVideoReady(true);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !worksVideoOk) return;
    let visible = false;
    const updatePlayback = () => {
      if (visible && !document.hidden) void v.play().catch(() => {});
      else v.pause();
    };
    updatePlayback();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    });
    observer.observe(v);
    document.addEventListener('visibilitychange', updatePlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updatePlayback);
      v.pause();
    };
  }, [worksVideoOk]);

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className={styles.section}
    >
      <SpecialtyShowcase />
      <div className="container">
        <div id="portfolio-showcase" className={styles.showcaseWrap}>
          <motion.div
            className={styles.infinityStage}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
          >
            {worksVideoOk ? (
              <>
              <video
                ref={videoRef}
                className={`${styles.infinityVideo} ${worksVideoReady ? styles.infinityVideoReady : ''}`}
                src={worksVideoSrc}
                muted
                loop
                playsInline
                preload="metadata"
                onCanPlay={handleWorksReady}
                onPlaying={handleWorksReady}
                onTimeUpdate={(e) => {
                  if (e.currentTarget.currentTime > 0.05) handleWorksReady();
                }}
                onError={() => setWorksVideoOk(false)}
              />
              {!worksVideoReady && (
                <div className={styles.infinityVideoShimmer} aria-hidden />
              )}
              </>
            ) : (
              <div className={styles.videoPlaceholder} aria-hidden />
            )}
          </motion.div>

          <motion.div
            className={styles.wishCta}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className={styles.wishKicker}>Make a wish</p>
            <p className={styles.wishLine}>
              <span className={styles.wishLead}>Tap</span>{' '}
              <Link
                href={PORTFOLIO_SECTION_HREF}
                className={styles.genieLink}
                aria-label="See more of our work"
              >
                <Image
                  src={GENIE_IMAGE_SRC}
                  alt=""
                  width={44}
                  height={44}
                  className={styles.genieImg}
                  draggable={false}
                />
              </Link>{' '}
              <span className={styles.wishTrail}>to see more of our work.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
