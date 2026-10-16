'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import { GenieMark } from '@/components/common/GenieMark';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { label: 'Services', href: '/services', accent: '#fb923c' },
  { label: 'Portfolio', href: '/portfolio', accent: '#818cf8' },
  { label: 'About', href: '/about', accent: '#22d3ee' },
  { label: 'Contact Us', href: '/contact', accent: '#f472b6' },
];

/* Overlay slides in from right */
const overlayVariants: Variants = {
  hidden:  { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.42, ease: [0.19, 1, 0.22, 1] as const },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.32, ease: [0.4, 0, 0.6, 1] as const },
  },
};

/* Each nav item staggers in from the right */
const itemVariants: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.18 + i * 0.07,
      duration: 0.5,
      ease: [0.19, 1, 0.22, 1] as const,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: 30,
    transition: {
      delay: i * 0.04,
      duration: 0.22,
      ease: [0.4, 0, 0.6, 1] as const,
    },
  }),
};

const footerVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.5, duration: 0.5, ease: [0.19, 1, 0.22, 1] as const },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ id, isOpen, onClose }) => {
  const pathname = usePathname();

  /* Lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={id}
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Background layers */}
          <div className={styles.overlayBg} aria-hidden />

          {/* Header row */}
          <div className={styles.overlayHeader}>
            <button
              className={`${styles.closeBtn} ${styles.glassCapsule}`}
              onClick={onClose}
              aria-label="Close navigation menu"
            >
              <ChevronLeft size={24} strokeWidth={2.2} />
            </button>

            <Link
              href="/"
              className={`${styles.overlayLogo} ${styles.glassCapsule}`}
              onClick={onClose}
              aria-label="Home"
            >
              <GenieMark width={32} />
              <span>| dev</span>
            </Link>

            <div className={styles.headerSpacer} aria-hidden />
          </div>

          {/* Label */}
          <p className={styles.menuLabel} aria-hidden>Navigation</p>

          {/* Nav links */}
          <nav className={styles.overlayNav} aria-label="Mobile Navigation">
            {NAV_LINKS.map(({ label, href, accent }, i) => {
              const isActive = pathname === href;
              return (
              <motion.div
                key={label}
                className={styles.navItemWrap}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Link
                  href={href}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                  style={{ '--nav-accent': accent } as React.CSSProperties}
                  onClick={onClose}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={styles.navItemText}>{label}</span>
                  <ArrowRight
                    size={18}
                    strokeWidth={1.8}
                    className={styles.navItemArrow}
                    aria-hidden
                  />
                </Link>
              </motion.div>
            );
            })}
          </nav>

          {/* Footer CTA */}
          <motion.div
            className={styles.overlayFooter}
            variants={footerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Link href="/contact" className={styles.ctaBtn} onClick={onClose}>
              Book a Strategy Call <ArrowRight size={16} strokeWidth={2.2} />
            </Link>
            <p className={styles.tagline}>Custom web, mobile, and systems engineering.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
