'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, LayoutGroup } from 'framer-motion';
import { GenieMark } from '@/components/common/GenieMark';
import { MobileMenu } from './MobileMenu';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
] as const;

function getActiveNavIndex(pathname: string | null): number {
  if (!pathname) return -1;
  const p = pathname === '/' ? '' : pathname;
  if (p === '/services') return 0;
  if (p === '/portfolio' || p.startsWith('/portfolio/')) return 1;
  if (p === '/about') return 2;
  if (p === '/contact') return 3;
  return -1;
}

export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const activeIndex = useMemo(() => getActiveNavIndex(pathname), [pathname]);


  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logoAnchor} aria-label="Home" prefetch>
            <span className={`${styles.logoLink} ${styles.glassCapsule}`}>
              <GenieMark width={28} />
              <span className={styles.logoText}>| dev</span>
            </span>
          </Link>

          <LayoutGroup id="nav">
            <nav
              className={`${styles.glassNav} ${styles.glassCapsule}`}
              aria-label="Main Navigation"
            >
              <div className={styles.navTrack}>
                {NAV_LINKS.map((link, i) => {
                  const isActive = i === activeIndex;
                  
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                      draggable={false}
                    >
                      <span className={styles.navLinkLabel}>{link.label}</span>
                      
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill-bg"
                          className={styles.navPill}
                          initial={false}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 35,
                            mass: 1,
                          }}
                          style={{
                            zIndex: 1,
                            pointerEvents: 'none',
                          }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </LayoutGroup>

          <button
            className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ''}`}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className={styles.barWrap} aria-hidden>
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
            </span>
          </button>
        </div>
      </header>

      <MobileMenu
        id="mobile-menu"
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
