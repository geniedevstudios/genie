'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { GenieMark } from '@/components/common/GenieMark';
import { buildGenieVariants } from '@/lib/genieCardMotion';
import styles from '@/app/services/services.module.css';

export function TechStackMoreDialog() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);

    window.requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const overlay =
    mounted ? (
      <AnimatePresence mode="sync">
        {open ? (
          <>
            <motion.div
              key="tech-modal-backdrop"
              role="presentation"
              className={styles.techModalBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setOpen(false)}
            />
            <div key="tech-modal-shell" className={styles.techModalShell}>
              <motion.div
                key="tech-modal-panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className={styles.techModalPanel}
                style={{ transformOrigin: 'center top' }}
                variants={buildGenieVariants('down')}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={e => e.stopPropagation()}
              >
                <button
                  ref={closeRef}
                  type="button"
                  className={styles.techModalClose}
                  aria-label="Close dialog"
                  onClick={() => setOpen(false)}
                >
                  <X size={18} strokeWidth={2.25} aria-hidden />
                </button>

                <p className={styles.techModalKicker}>Tools & platforms</p>
                <h3 id={titleId} className={styles.techModalTitle}>
                  These and many more
                </h3>
                <p className={styles.techModalBody}>
                  The stacks above are a snapshot — we also work with adjacent tooling, CI/CD, observability, and
                  whatever fits your roadmap. At{' '}
                  <span className={styles.techModalBrand}>
                    <GenieMark width={22} className={styles.techModalMark} />
                    <span>| dev</span>
                  </span>, we choose technologies that ship fast, scale cleanly, and stay maintainable as your product grows.
                </p>
                <p className={styles.techModalBodySecondary}>
                  Reach out and we&apos;ll help you plan your next big project — from first sketch to production.
                </p>
                <Link
                  href="/contact"
                  className={styles.techModalCta}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                >
                  Reach out
                </Link>
              </motion.div>
            </div>
          </>
        ) : null}
      </AnimatePresence>
    ) : null;

  return (
    <div className={styles.techMoreWrap}>
      <button
        type="button"
        className={styles.techMoreBtn}
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <span className={styles.techMoreBtnIcon} aria-hidden>
          <Plus size={18} strokeWidth={2.5} />
        </span>
        <span>And more tools</span>
      </button>
      {mounted && typeof document !== 'undefined' ? createPortal(overlay, document.body) : null}
    </div>
  );
}
