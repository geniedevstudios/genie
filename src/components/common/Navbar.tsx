'use client';

import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { LogoLockup } from '@/components/common/LogoLockup';
import { MobileMenu } from '@/components/common/MobileMenu';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

function getActiveNavIndex(pathname: string | null): number {
  if (!pathname) return -1;
  const p = pathname === '/' ? '' : pathname;
  if (p === '/services') return 0;
  if (p === '/portfolio' || p.startsWith('/portfolio/')) return 1;
  if (p === '/about') return 2;
  if (p === '/contact') return 3;
  return -1;
}

export const Navbar: React.FC<{ blend?: boolean }> = ({ blend = false }) => {
  const pathname = usePathname();
  const activeIndex = useMemo(() => getActiveNavIndex(pathname), [pathname]);
  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 641px)');
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  return (
    <header
      className={`${styles.heroHeader} ${blend ? styles.heroHeaderBlend : ''} ${menuOpen ? styles.heroHeaderOpen : ''}`}
    >
      <nav className={styles.heroNav} aria-label="Main navigation">
        <div className={styles.heroNavSide}>
          {NAV_LINKS.slice(0, 2).map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={activeIndex === i ? styles.heroNavLinkActive : undefined}
              aria-current={activeIndex === i ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link href="/" className={styles.heroLogo} aria-label="Genie Dev home">
          <LogoLockup />
        </Link>
        <div className={`${styles.heroNavSide} ${styles.heroNavRight}`}>
          {NAV_LINKS.slice(2).map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={activeIndex === i + 2 ? styles.heroNavLinkActive : undefined}
              aria-current={activeIndex === i + 2 ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          className={styles.menuButton}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.menuGlyph} aria-hidden>
            <span
              className={styles.menuBars}
              style={{
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? 'translateX(8px)' : 'translateX(0)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 32 32">
                <path fill="currentColor" d="M4 7h24v2H4zm0 8h24v2H4zm0 8h24v2H4z" />
              </svg>
            </span>
            <span
              className={styles.menuChevron}
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(-8px)',
              }}
            >
              <ChevronRight size={22} strokeWidth={2.2} />
            </span>
          </span>
        </button>
      </nav>
      <MobileMenu
        id={menuId}
        isOpen={menuOpen}
        onClose={closeMenu}
      />
    </header>
  );
};
