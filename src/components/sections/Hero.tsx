'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mouse, PenLine, Code2, Database, TrendingUp, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { GenieMark } from '@/components/common/GenieMark';
import { subscribeViewport } from '@/lib/subscribeViewport';
import { buildGenieVariants, type GenieOpenDir } from '@/lib/genieCardMotion';
import styles from './Hero.module.css';

/** Matches `Navbar.module.css` hamburger breakpoint — crossing it remounts hero pills so Framer Motion re-measures. */
const COMPACT_NAV_PX = 1024;

type CardAlign = 'left' | 'right';

interface PillDef {
  key: string;
  label: string;
  Icon: React.ElementType;
  delay: number;
  pillClass: string;
  darkIcon: boolean;
  description: string;
  stat: string;
  openDir: GenieOpenDir;
  cardAlign: CardAlign;
}

function shouldUseCursorTrailerFallback() {
  if (typeof window === 'undefined') return true;
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  const coarsePointer = window.matchMedia?.('(pointer: coarse)')?.matches ?? false;
  return prefersReducedMotion || coarsePointer;
}

/** MediaQueryList.addEventListener is not supported in older Safari; use addListener fallback. */
function subscribeMediaQuery(mq: MediaQueryList, fn: () => void) {
  if (mq.addEventListener) {
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }
  mq.addListener(fn);
  return () => mq.removeListener(fn);
}

/** Native `loop` often hitches when seeking to t=0; crossfade two players before the seam. */
const SeamlessLoopVideo: React.FC<{ src: string; stackClassName: string; videoClassName: string }> = ({
  src,
  stackClassName,
  videoClassName,
}) => {
  const aRef = useRef<HTMLVideoElement | null>(null);
  const bRef = useRef<HTMLVideoElement | null>(null);
  const activeRef = useRef<0 | 1>(0);
  const fadingRef = useRef(false);

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;

    const LEAD_SEC = 0.22;
    const FADE_MS = 230;
    /** Match `.cursorTrailerVideo` opacity so crossfade ends at the same strength */
    const VISIBLE = 0.9;

    const getActive = () => (activeRef.current === 0 ? a : b);
    const getNext = () => (activeRef.current === 0 ? b : a);

    const clearOpacity = (el: HTMLVideoElement) => {
      el.style.opacity = '';
      el.style.transition = '';
      el.style.zIndex = '';
    };

    activeRef.current = 0;
    fadingRef.current = false;
    clearOpacity(a);
    clearOpacity(b);
    a.style.zIndex = '2';
    b.style.zIndex = '1';
    a.style.opacity = String(VISIBLE);
    b.style.opacity = '0';
    b.pause();
    b.currentTime = 0;

    void a.play().catch(() => { });

    const onTimeUpdate = (e: Event) => {
      const cur = getActive();
      if (e.target !== cur) return;
      if (fadingRef.current) return;

      const dur = cur.duration;
      if (!isFinite(dur) || dur <= 0) return;
      if (cur.currentTime < dur - LEAD_SEC) return;

      fadingRef.current = true;
      const nxt = getNext();
      nxt.currentTime = 0;
      void nxt.play().catch(() => { });

      const fade = `${FADE_MS}ms ease-out`;
      cur.style.transition = `opacity ${fade}`;
      nxt.style.transition = `opacity ${fade}`;
      cur.style.opacity = '0';
      nxt.style.opacity = String(VISIBLE);
      nxt.style.zIndex = '3';

      window.setTimeout(() => {
        cur.pause();
        cur.currentTime = 0;
        activeRef.current = activeRef.current === 0 ? 1 : 0;
        clearOpacity(a);
        clearOpacity(b);
        getActive().style.opacity = String(VISIBLE);
        getActive().style.zIndex = '2';
        (activeRef.current === 0 ? b : a).style.opacity = '0';
        (activeRef.current === 0 ? b : a).style.zIndex = '1';
        fadingRef.current = false;
      }, FADE_MS);
    };

    a.addEventListener('timeupdate', onTimeUpdate);
    b.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      a.removeEventListener('timeupdate', onTimeUpdate);
      b.removeEventListener('timeupdate', onTimeUpdate);
      a.pause();
      b.pause();
      clearOpacity(a);
      clearOpacity(b);
    };
  }, [src]);

  return (
    <div className={stackClassName}>
      <video ref={aRef} className={videoClassName} src={src} muted playsInline preload="auto" />
      <video ref={bRef} className={videoClassName} src={src} muted playsInline preload="auto" />
    </div>
  );
};

const CursorTrailerVideo: React.FC<{
  heroRef: React.RefObject<HTMLElement | null>;
  src: string;
}> = ({ heroRef, src }) => {
  const trailerRef = useRef<HTMLDivElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const [isFallback, setIsFallback] = useState(true);

  /**
   * Re-evaluate coarse pointer + reduced motion whenever the viewport or input mode changes.
   * Without this, `isFallback` stays stuck from the first paint (refresh required after resize / device toolbar).
   */
  useEffect(() => {
    const sync = () => setIsFallback(shouldUseCursorTrailerFallback());

    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqCoarse = window.matchMedia('(pointer: coarse)');
    const unsubs = [
      subscribeMediaQuery(mqReduce, sync),
      subscribeMediaQuery(mqCoarse, sync),
    ];

    const unsubViewport = subscribeViewport(sync);

    return () => {
      unsubs.forEach(u => u());
      unsubViewport();
    };
  }, []);

  useEffect(() => {
    if (isFallback) return;
    const heroEl = heroRef.current;
    const trailerEl = trailerRef.current;
    if (!heroEl || !trailerEl) return;

    const TRAILER_W = 520;
    const TRAILER_H = 320;
    const PADDING = 16;

    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

    const setCentered = () => {
      const rect = heroEl.getBoundingClientRect();
      const centeredX = clamp((rect.width - TRAILER_W) / 2, PADDING, rect.width - TRAILER_W - PADDING);
      const centeredY = clamp((rect.height - TRAILER_H) / 2, PADDING, rect.height - TRAILER_H - PADDING);
      targetRef.current.x = centeredX;
      targetRef.current.y = centeredY;
      currentRef.current.x = centeredX;
      currentRef.current.y = centeredY;
      trailerEl.style.transform = `translate3d(${centeredX.toFixed(2)}px, ${centeredY.toFixed(2)}px, 0)`;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const rawX = e.clientX - rect.left - TRAILER_W / 2;
      const rawY = e.clientY - rect.top - TRAILER_H / 2;
      targetRef.current.x = clamp(rawX, PADDING, rect.width - TRAILER_W - PADDING);
      targetRef.current.y = clamp(rawY, PADDING, rect.height - TRAILER_H - PADDING);
    };

    const onViewportChange = () => setCentered();

    const tick = () => {
      // Keep target clamped in case of resize or layout shifts
      const rect = heroEl.getBoundingClientRect();
      targetRef.current.x = clamp(targetRef.current.x, PADDING, rect.width - TRAILER_W - PADDING);
      targetRef.current.y = clamp(targetRef.current.y, PADDING, rect.height - TRAILER_H - PADDING);

      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;
      currentRef.current.x += dx * 0.12;
      currentRef.current.y += dy * 0.12;
      trailerEl.style.transform = `translate3d(${currentRef.current.x.toFixed(2)}px, ${currentRef.current.y.toFixed(2)}px, 0)`;
      rafIdRef.current = window.requestAnimationFrame(tick);
    };

    setCentered();
    heroEl.addEventListener('pointermove', onPointerMove);
    const unsubViewport = subscribeViewport(onViewportChange);
    rafIdRef.current = window.requestAnimationFrame(tick);

    return () => {
      heroEl.removeEventListener('pointermove', onPointerMove);
      unsubViewport();
      if (rafIdRef.current != null) window.cancelAnimationFrame(rafIdRef.current);
    };
  }, [heroRef, isFallback]);

  if (isFallback) {
    return (
      <div className={styles.cursorTrailerFallback} aria-hidden>
        <SeamlessLoopVideo src={src} stackClassName={styles.cursorTrailerVideoStack} videoClassName={styles.cursorTrailerVideo} />
      </div>
    );
  }

  return (
    <div
      ref={trailerRef}
      className={styles.cursorTrailer}
      aria-hidden
    >
      <SeamlessLoopVideo src={src} stackClassName={styles.cursorTrailerVideoStack} videoClassName={styles.cursorTrailerVideo} />
    </div>
  );
};

const HERO_PILLS: PillDef[] = [
  {
    key: 'implement', label: 'Implement', Icon: Mouse, delay: 0.0,
    pillClass: styles.pillImplement, darkIcon: false,
    description: 'End-to-end system deployment — infrastructure, CI/CD pipelines and architecture that ships on time.',
    stat: '10+ systems delivered',
    openDir: 'down', cardAlign: 'left',
  },
  {
    key: 'design', label: 'Design', Icon: PenLine, delay: 0.25,
    pillClass: styles.pillDesign, darkIcon: true,
    description: 'UI/UX that converts — wireframes to polished, production-ready interfaces users love.',
    stat: 'Figma → Production',
    openDir: 'down', cardAlign: 'right',
  },
  {
    key: 'code', label: 'Code', Icon: Code2, delay: 0.1,
    pillClass: styles.pillCode, darkIcon: false,
    description: 'Clean, scalable code across React, Next.js, Django and Python backends.',
    stat: 'React · Next.js · Django',
    openDir: 'down', cardAlign: 'right',
  },
  {
    key: 'manage', label: 'Manage', Icon: Database, delay: 0.35,
    pillClass: styles.pillManage, darkIcon: false,
    description: 'Full tech stack management — monitoring, optimization and ongoing performance improvements.',
    stat: '99.9% uptime target',
    openDir: 'down', cardAlign: 'left',
  },
  {
    key: 'seo', label: 'SEO', Icon: TrendingUp, delay: 0.45,
    pillClass: styles.pillSeo, darkIcon: true,
    description: 'Search visibility strategy — technical SEO, Core Web Vitals and structured data.',
    stat: 'Core Web Vitals A+',
    openDir: 'up', cardAlign: 'left',
  },
  {
    key: 'security', label: 'Security', Icon: ShieldCheck, delay: 0.55,
    pillClass: styles.pillSecurity, darkIcon: false,
    description: 'Secure by design — authentication, encryption, and vulnerability hardening built in from day one.',
    stat: 'OWASP compliant',
    openDir: 'up', cardAlign: 'right',
  },
];

/** Build Framer Motion variants for the genie open/close. */
export const Hero: React.FC = () => {
  const [activePill, setActivePill] = useState<string | null>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const [heroVideoSrc, setHeroVideoSrc] = useState<string | null>(null);
  /** Bumps when crossing desktop ↔ compact nav width so pill motion trees re-mount with fresh layout. */
  const [pillLayoutKey, setPillLayoutKey] = useState(0);
  const compactNavRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const vidOk = await fetch('/hero-video2.webm', { method: 'HEAD' }).then(r => r.ok).catch(() => false);
      if (!cancelled) setHeroVideoSrc(vidOk ? '/hero-video2.webm' : null);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    compactNavRef.current = window.innerWidth < COMPACT_NAV_PX;
    const onViewport = () => {
      const next = window.innerWidth < COMPACT_NAV_PX;
      if (next !== compactNavRef.current) {
        compactNavRef.current = next;
        setPillLayoutKey(k => k + 1);
      }
    };
    return subscribeViewport(onViewport);
  }, []);

  /* Close card on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pillsRef.current && !pillsRef.current.contains(e.target as Node)) {
        setActivePill(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = (key: string) =>
    setActivePill(prev => (prev === key ? null : key));

  return (
    <section
      className={styles.heroSection}
      ref={heroRef}
    >
      {heroVideoSrc ? <CursorTrailerVideo heroRef={heroRef} src={heroVideoSrc} /> : null}
      {/* ── Floating Pills ───────────────────────────────────── */}
      <div className={styles.heroPills} ref={pillsRef} key={pillLayoutKey}>
        {HERO_PILLS.map(({ key, label, Icon, delay, pillClass, darkIcon, description, stat, openDir, cardAlign }) => {
          const isActive = activePill === key;
          const genieVariants = buildGenieVariants(openDir);
          const cardDirClass = openDir === 'up' ? styles.pillCardAbove : styles.pillCardBelow;
          const cardAlignClass = cardAlign === 'left' ? styles.pillCardLeft : styles.pillCardRight;

          return (
            <motion.div
              key={key}
              className={`${styles.heroPill} ${pillClass} ${isActive ? styles.heroPillActive : ''}`}
              /* Entry animation */
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              /* While idle: float; while active: hold still + slight scale-up */
              animate={
                isActive
                  ? { opacity: 1, y: 0, scale: 1.06 }
                  : { opacity: 1, y: [0, -7, 0], scale: 1 }
              }
              transition={
                isActive
                  ? { scale: { duration: 0.22, ease: 'easeOut' }, opacity: { duration: 0.3, delay } }
                  : {
                    opacity: { duration: 0.55, delay },
                    scale: { duration: 0.55, delay },
                    y: { duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.4 },
                  }
              }
              onClick={() => toggle(key)}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              onKeyDown={e => e.key === 'Enter' && toggle(key)}
            >
              <span>{label}</span>
              <span className={`${styles.pillIcon}${darkIcon ? ` ${styles.pillIconDark}` : ''}`}>
                <Icon size={15} strokeWidth={2.2} aria-hidden />
              </span>

              {/* ── Genie Card ──────────────────────────────────── */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className={`${styles.pillCard} ${cardDirClass} ${cardAlignClass}`}
                    style={{ transformOrigin: openDir === 'up' ? 'bottom center' : 'top center' }}
                    variants={genieVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={e => e.stopPropagation()}
                  >
                    <p className={styles.pillCardLabel}>{label}</p>
                    <p className={styles.pillCardDesc}>{description}</p>
                    <span className={styles.pillCardStat}>{stat}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* ── Hero Content ─────────────────────────────────────── */}
      <motion.div
        className={styles.heroContent}
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
      >
        {/* Brand mark */}
        <div className={styles.heroBrand}>
          <GenieMark width={90} />
          <span className={styles.heroBrandText}>| dev</span>
        </div>

        {/* Subtitle */}
        <p className={styles.heroSubtitle}>
          From idea to scale&nbsp;&mdash; we build it right.
        </p>

        {/* Subtext */}
        <p className={styles.heroSubtext}>
          Design, development, security, and system management&mdash;handled
          end-to-end to help your business grow with confidence.
        </p>

        {/* CTA buttons */}
        <div className={styles.heroCtas}>
          <Link href="/portfolio" className={styles.btnOutline}>
            Explore Portfolio
          </Link>
          <Link href="/contact" className={styles.btnSolid}>
            Get a Quote
          </Link>
        </div>
      </motion.div>

      {/* ── Scroll Chevron ───────────────────────────────────── */}
      <motion.div
        className={styles.scrollChevron}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};
