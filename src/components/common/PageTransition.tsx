'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { GenieMark } from '@/components/common/GenieMark';
import styles from './PageTransition.module.css';

const COVER_EASE: [number, number, number, number] = [0.77, 0, 0.175, 1];
const COVER_DURATION = 0.72;
const MIN_HOLD_MS = 520;
const NAV_FALLBACK_MS = 6000;

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function normalizePath(pathname: string): string {
  return pathname.replace(/\/$/, '') || '/';
}

function pathFromHref(href: string): string {
  try {
    const url = new URL(href, window.location.origin);
    return normalizePath(url.pathname);
  } catch {
    return href;
  }
}

function shouldIntercept(event: MouseEvent, anchor: HTMLAnchorElement): boolean {
  if (event.defaultPrevented) return false;
  if (event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (anchor.target && anchor.target !== '_self') return false;
  if (anchor.hasAttribute('download')) return false;
  if (anchor.getAttribute('rel')?.includes('external')) return false;

  const rawHref = anchor.getAttribute('href');
  if (!rawHref || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) return false;
  if (rawHref.startsWith('#')) return false;

  let url: URL;
  try {
    url = new URL(anchor.href);
  } catch {
    return false;
  }

  if (url.origin !== window.location.origin) return false;
  if (url.pathname.startsWith('/api/')) return false;

  const currentPath = normalizePath(window.location.pathname);
  const nextPath = normalizePath(url.pathname);
  const currentSearch = window.location.search;
  const nextSearch = url.search;

  // Same route — let hash/in-page behavior through.
  if (currentPath === nextPath && currentSearch === nextSearch) return false;

  return true;
}

export const PageTransition: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [waitingForRoute, setWaitingForRoute] = useState(false);

  const activeRef = useRef(false);
  const coveredRef = useRef(false);
  const pendingHref = useRef<string | null>(null);
  const holdStartedAt = useRef(0);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  activeRef.current = active;

  const clearFallback = () => {
    if (fallbackTimer.current) {
      clearTimeout(fallbackTimer.current);
      fallbackTimer.current = null;
    }
  };

  const reveal = useCallback(() => {
    clearFallback();
    pendingHref.current = null;
    coveredRef.current = false;
    setWaitingForRoute(false);
    setActive(false);
  }, []);

  const startTransition = useCallback((href: string) => {
    if (activeRef.current) return;
    if (prefersReducedMotion()) {
      router.push(href);
      return;
    }

    pendingHref.current = href;
    coveredRef.current = false;
    holdStartedAt.current = 0;
    setWaitingForRoute(false);
    setActive(true);
  }, [router]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (!shouldIntercept(event, anchor)) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const url = new URL(anchor.href);
      startTransition(url.pathname + url.search + url.hash);
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [startTransition]);

  useEffect(() => {
    if (!active) return;

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    html.setAttribute('aria-busy', 'true');

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      html.removeAttribute('aria-busy');
    };
  }, [active]);

  useEffect(() => {
    if (!active || coveredRef.current) return;

    const timer = setTimeout(() => {
      if (!activeRef.current || coveredRef.current) return;
      const href = pendingHref.current;
      if (!href) return;

      coveredRef.current = true;
      holdStartedAt.current = Date.now();
      setWaitingForRoute(true);
      router.push(href);

      clearFallback();
      fallbackTimer.current = setTimeout(reveal, NAV_FALLBACK_MS);
    }, COVER_DURATION * 1000);

    return () => clearTimeout(timer);
  }, [active, router, reveal]);

  useEffect(() => {
    if (!waitingForRoute || !pendingHref.current) return;

    const targetPath = pathFromHref(pendingHref.current);
    if (normalizePath(pathname) !== targetPath) return;

    const remaining = Math.max(0, MIN_HOLD_MS - (Date.now() - holdStartedAt.current));
    const timer = setTimeout(reveal, remaining);
    return () => clearTimeout(timer);
  }, [pathname, waitingForRoute, reveal]);

  useEffect(() => () => clearFallback(), []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className={styles.overlay}
          role="presentation"
          aria-hidden="true"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: COVER_DURATION, ease: COVER_EASE }}
        >
          <div className={styles.brandStage}>
            <motion.div
              className={styles.pillContainer}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.45, delay: 0.28, ease: [0.19, 1, 0.22, 1] },
              }}
            >
              <div className={styles.brandGroup}>
                <GenieMark width={50} />
                <span className={styles.brandText}>| dev studios</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
