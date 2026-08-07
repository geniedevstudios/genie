'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GENIE_IMAGE_SRC } from '@/lib/genieAsset';
import styles from './Projects.module.css';

/** Decorative browser window — matches reference “web” illustration */
function WebIllustration() {
  return (
    <div className={styles.illuWeb} aria-hidden>
      <div className={styles.illuWebChrome}>
        <span className={styles.illuWebDot} />
        <span className={styles.illuWebDot} />
        <span className={styles.illuWebDot} />
      </div>
      <div className={styles.illuWebCanvas}>
        <div className={styles.illuWebHero} />
        <div className={styles.illuWebRow}>
          <div className={styles.illuWebCol} />
          <div className={styles.illuWebCol} />
        </div>
        <div className={styles.illuWebBarLong} />
      </div>
    </div>
  );
}

function PhoneIllustration() {
  return (
    <div className={styles.illuPhone} aria-hidden>
      <div className={styles.illuPhoneNotch} />
      <div className={styles.illuPhoneBody}>
        <div className={styles.illuPhoneAvatar} />
        <div className={styles.illuPhoneLines}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

function ShieldIllustration() {
  return (
    <div className={styles.illuShield} aria-hidden>
      <div className={styles.illuShieldRing} />
      <div className={styles.illuShieldCore} />
    </div>
  );
}

function UiIllustration() {
  return (
    <div className={styles.illuUi} aria-hidden>
      <div className={styles.illuUiGrid}>
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className={styles.illuUiPen} />
    </div>
  );
}

const PORTFOLIO_SHOWCASE_HREF = '/portfolio#portfolio-showcase';
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
    void v.play().catch(() => {});
  }, [worksVideoOk]);

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className={`${styles.section} section-spacing`}
    >
      <div className="container">
        <header className={styles.sectionHeader}>
          <div className={styles.titleBlock}>
            <div className={styles.ghostStack} aria-hidden>
              <span>OUR</span>
              <span>SPECIALTY</span>
            </div>
            <h2 id="portfolio-heading" className={styles.title}>
              Our specialty
            </h2>
          </div>
          <p className={styles.lede}>
            Deep work across web, mobile, security, and design—so you ship reliable products, protect
            what matters, and deliver experiences worth returning to.
          </p>
        </header>

        <div className={styles.cardGrid}>
          {/* Featured — Web */}
          <motion.article
            className={styles.cardFeatured}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <WebIllustration />
            <div className={styles.cardFeaturedCopy}>
              <h3 className={styles.cardTitleLight}>Web &amp; Web Apps Development</h3>
              <p className={styles.cardDescLight}>
                We build fast, scalable web products that streamline operations, engage customers,
                and help you grow with confidence.
              </p>
            </div>
            <Link href={PORTFOLIO_SHOWCASE_HREF} className={styles.discoverFeatured}>
              Explore
            </Link>
          </motion.article>

          {/* Stacked — Mobile */}
          <motion.article
            className={`${styles.cardCompact} ${styles.mediaRight}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className={styles.compactCopy}>
              <h3 className={styles.cardTitleDark}>Mobile Apps Development</h3>
              <p className={styles.cardDescDark}>
                Native-quality mobile experiences that keep users engaged across iOS and Android.
              </p>
              <Link href={PORTFOLIO_SHOWCASE_HREF} className={styles.discoverDark}>
                Explore
              </Link>
            </div>
            <div className={styles.compactMedia}>
              <PhoneIllustration />
            </div>
          </motion.article>

          {/* Cybersecurity */}
          <motion.article
            className={`${styles.cardCompact} ${styles.mediaRight}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className={styles.compactCopy}>
              <h3 className={styles.cardTitleDark}>Cybersecurity</h3>
              <p className={styles.cardDescDark}>
                Hardening, reviews, and architecture so your systems stay resilient under real-world
                pressure.
              </p>
              <Link href={PORTFOLIO_SHOWCASE_HREF} className={styles.discoverDark}>
                Explore
              </Link>
            </div>
            <div className={styles.compactMedia}>
              <ShieldIllustration />
            </div>
          </motion.article>

          {/* UI/UX — graphic left */}
          <motion.article
            className={`${styles.cardCompact} ${styles.mediaLeft}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className={styles.compactMedia}>
              <UiIllustration />
            </div>
            <div className={`${styles.compactCopy} ${styles.compactCopyEnd}`}>
              <h3 className={styles.cardTitleDark}>UI/UX Design</h3>
              <p className={styles.cardDescDark}>
                Research-backed interfaces and design systems that clarify your product and lift
                conversion.
              </p>
              <Link href={PORTFOLIO_SHOWCASE_HREF} className={styles.discoverDark}>
                Explore
              </Link>
            </div>
          </motion.article>
        </div>

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
                autoPlay
                preload="auto"
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
            <p className={styles.wishKicker}>make a wish</p>
            <p className={styles.wishLine}>
              <span className={styles.wishLead}>tap on</span>{' '}
              <Link
                href={PORTFOLIO_SECTION_HREF}
                className={styles.genieLink}
                aria-label="Open portfolio — see more of our work"
              >
                <img
                  src={GENIE_IMAGE_SRC}
                  alt=""
                  width={44}
                  height={44}
                  className={styles.genieImg}
                  draggable={false}
                />
              </Link>{' '}
              <span className={styles.wishTrail}>to see more of our works</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
