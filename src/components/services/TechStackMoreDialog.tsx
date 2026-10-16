'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { GenieMark } from '@/components/common/GenieMark';
import { buildGenieVariants } from '@/lib/genieCardMotion';
import styles from '@/app/services/services.module.css';

export function TechStackMoreDialog({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);

    window.requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  const overlay =
    mounted ? (
      <AnimatePresence mode="sync">
        {open ? (
          <>
            <motion.div
              key="tech-modal-backdrop"
              role="presentation"
              className={styles.techModalBackdrop}
              style={{ position: 'absolute' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setOpen(false)}
            />
            <div key="tech-modal-shell" className={styles.techModalShell} style={{ position: 'absolute' }}>
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
                  Beyond our core stack, we integrate payment gateways (Paystack, Stripe), cloud hosting (Vercel, AWS), automated CI/CD, and real-time monitoring. At{' '}
                  <span className={styles.techModalBrand}>
                    <GenieMark width={22} className={styles.techModalMark} />
                    <span>| dev studios</span>
                  </span>, we pick the right architecture for your product’s traffic, team, and budget.
                </p>
                <p className={styles.techModalBodySecondary}>
                  Tell us what you’re building and we’ll recommend a clear technical plan.
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
        style={{ 
          opacity: open ? 0 : 1, 
          pointerEvents: open ? 'none' : 'auto',
          transition: 'opacity 0.2s ease'
        }}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <span className={styles.techMoreBtnIcon} aria-hidden>
          <Plus size={18} strokeWidth={2.5} />
        </span>
        <span>More Tools</span>
      </button>
      {mounted ? overlay : null}
    </div>
  );
}
