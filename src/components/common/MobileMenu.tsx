'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

function placeUnderBar(dialog: HTMLDialogElement) {
  const header = dialog.closest('header');
  const nav = header?.querySelector('nav');
  const bottom = Math.max((nav ?? header)?.getBoundingClientRect().bottom ?? 0, 0);
  dialog.style.top = `${bottom}px`;
  dialog.style.height = `calc(100dvh - ${bottom}px)`;
}

export function MobileMenu({ id, isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const place = () => placeUnderBar(dialog);
    place();
    window.addEventListener('resize', place);
    if (!isOpen) {
      if (dialog.open) dialog.close();
      return () => window.removeEventListener('resize', place);
    }
    if (!dialog.open) dialog.show();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('resize', place);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <dialog ref={dialogRef} id={id} className={styles.overlay} aria-label="Navigation menu"
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>('a[href], button');
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}>
      <nav className={styles.overlayNav} aria-label="Mobile navigation">
        <span className={styles.eyebrow}>Explore the studio</span>
        {NAV_LINKS.map(({ label, href }) => {
          const active = pathname === href || (href === '/portfolio' && pathname.startsWith('/portfolio/'));
          return <Link key={href} href={href} className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
            onClick={onClose} aria-current={active ? 'page' : undefined}>
            {label}<ArrowUpRight size={24} strokeWidth={1.5} aria-hidden />
          </Link>;
        })}
      </nav>
      <div className={styles.overlayFooter}>
        <Link href="/quote" className={styles.ctaBtn} onClick={onClose}>
          Let’s build something <ArrowUpRight size={18} aria-hidden />
        </Link>
        <p className={styles.tagline}>A little imagination. A lot of engineering.</p>
      </div>
    </dialog>
  );
}
