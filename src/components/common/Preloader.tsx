'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GenieMark } from '@/components/common/GenieMark';
import styles from './Preloader.module.css';

export const Preloader: React.FC = () => {
  const [show, setShow] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // If the inline script already hid it, we don't need to do anything
    if (document.documentElement.classList.contains('hide-preloader')) {
      setShow(false);
      return;
    }

    const startTime = Date.now();
    const MIN_DURATION = 2500; // Let the animation play out for at least 2.5s
    const MAX_DURATION = 8000; // Absolute fallback so we never block forever

    let isFinished = false;
    let maxTimer: NodeJS.Timeout;

    const finishLoading = () => {
      if (isFinished) return;
      isFinished = true;
      clearTimeout(maxTimer);

      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_DURATION - elapsed);

      setTimeout(() => {
        setShow(false);
        // sessionStorage.setItem('genie_preloader_played', 'true');
      }, remaining);
    };

    // Fallback timer
    maxTimer = setTimeout(finishLoading, MAX_DURATION);

    const checkMedia = () => {
      const videos = Array.from(document.querySelectorAll('video'));
      // Only wait for priority/eager images or large hero images to avoid waiting for every tiny icon
      const images = Array.from(document.querySelectorAll('img[loading="eager"], img[priority]')) as HTMLImageElement[];
      
      let pending = videos.length + images.length;
      
      if (pending === 0) {
        finishLoading();
        return;
      }

      const decrement = () => {
        pending--;
        if (pending <= 0) finishLoading();
      };

      videos.forEach(v => {
        if (v.readyState >= 3) {
          decrement();
        } else {
          v.addEventListener('canplay', decrement, { once: true });
          v.addEventListener('error', decrement, { once: true });
        }
      });

      images.forEach(img => {
        if (img.complete) {
          decrement();
        } else {
          img.addEventListener('load', decrement, { once: true });
          img.addEventListener('error', decrement, { once: true });
        }
      });
    };

    // Wait a brief moment for React components to fully mount into the DOM before querying them
    setTimeout(checkMedia, 100);

    return () => {
      clearTimeout(maxTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.preloaderOverlay}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: -30, 
            transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } 
          }}
        >
          <motion.div
            className={styles.pillContainer}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } 
            }}
          >
            <div className={styles.brandGroup}>
              {/* Genie Mark entering from the left */}
              <motion.div
                initial={{ x: -60, opacity: 0, rotate: -20 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <GenieMark width={50} />
              </motion.div>

              {/* | dev entering from the right */}
              <motion.span
                className={styles.brandText}
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
              >
                | dev
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
