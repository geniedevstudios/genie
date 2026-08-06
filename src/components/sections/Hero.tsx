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
  /** Bumps when crossing desktop ↔ compact nav width so pill motion trees re-mount with fresh layout. */
  const [pillLayoutKey, setPillLayoutKey] = useState(0);
  const compactNavRef = useRef(false);

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
          <Link href="/quote" className={styles.btnOutline}>
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
