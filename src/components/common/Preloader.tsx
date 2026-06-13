'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GenieMark } from '@/components/common/GenieMark';
import styles from './Preloader.module.css';

export const Preloader: React.FC = () => {
  const [show, setShow] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if we've already played the animation in this session
    // (Disabled during development so you can see it on refresh)
    /*
    const hasLoaded = sessionStorage.getItem('genie_preloader_played');
    if (hasLoaded) {
      setShow(false);
      return;
    }
    */

    // Timer covers the animation duration. We give it enough time to play out
    // and let the underlying heavy assets start loading.
    const timer = setTimeout(() => {
      setShow(false);
      // sessionStorage.setItem('genie_preloader_played', 'true');
    }, 2800); 

    return () => clearTimeout(timer);
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
