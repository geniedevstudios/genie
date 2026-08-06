'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TechStackMoreDialog } from './TechStackMoreDialog';
import styles from './AnimatedTechGrid.module.css';

export type TechItem = {
  id: string;
  label: string;
  iconSrc: string | null;
};

interface AnimatedTechGridProps {
  items: TechItem[];
}

type Phase = 'scroll' | 'pause' | 'button';

export function AnimatedTechGrid({ items }: AnimatedTechGridProps) {
  const [phase, setPhase] = useState<Phase>('scroll');
  const [cycle, setCycle] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === 'scroll') {
      timeout = setTimeout(() => {
        setPhase('pause');
      }, 8000); // Marquee scrolling takes 8s
    } else if (phase === 'pause') {
      timeout = setTimeout(() => {
        setPhase('button');
      }, 1500); // Pauses to showcase all four for 1.5s, then fades out to button
    } else if (phase === 'button') {
      if (!modalOpen) {
        timeout = setTimeout(() => {
          setPhase('scroll');
          setCycle((c) => c + 1); // Increment cycle to re-trigger the marquee
        }, 5000); // Show button for 5s, then restart marquee if modal is not open
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, modalOpen]);

  const col1 = items.slice(0, 4);
  const col2 = items.slice(4, 8);

  const showMarquee = phase === 'scroll' || phase === 'pause';

  // For col1 (LEFT): moving UP. 
  // Start off-screen bottom, scroll up until last item is fully visible.
  const col1Variants = {
    initial: { y: 500 },
    scroll: { y: -250, transition: { duration: 8, ease: 'linear' } },
    pause: { y: -250 },
  };

  // For col2 (RIGHT): moving DOWN.
  // Start off-screen top, scroll down until first item is fully visible.
  const col2Variants = {
    initial: { y: -750 },
    scroll: { y: 0, transition: { duration: 8, ease: 'linear' } },
    pause: { y: 0 },
  };

  return (
    <div className={styles.gridContainer}>
      <AnimatePresence mode="wait">
        {showMarquee && (
          <motion.div
            key={`marquee-${cycle}`}
            className={styles.marqueeWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            {/* Col 1: Moves Up */}
            <div className={styles.column}>
              <motion.div 
                className={styles.cardWrapper} 
                variants={col1Variants}
                initial="initial"
                animate={phase === 'scroll' ? 'scroll' : 'pause'}
              >
                {col1.map((item) => (
                  <div key={item.id} className={styles.card}>
                    <div className={styles.iconBox}>
                      {item.iconSrc ? (
                        <img src={item.iconSrc} alt="" className={styles.iconImg} />
                      ) : (
                        <div className={styles.iconImgFallback} />
                      )}
                    </div>
                    <span className={styles.label}>{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Col 2: Moves Down */}
            <div className={styles.column}>
              <motion.div 
                className={styles.cardWrapper} 
                variants={col2Variants}
                initial="initial"
                animate={phase === 'scroll' ? 'scroll' : 'pause'}
              >
                {col2.map((item) => (
                  <div key={item.id} className={styles.card}>
                    <div className={styles.iconBox}>
                      {item.iconSrc ? (
                        <img src={item.iconSrc} alt="" className={styles.iconImg} />
                      ) : (
                        <div className={styles.iconImgFallback} />
                      )}
                    </div>
                    <span className={styles.label}>{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'button' && (
          <motion.div
            key="button"
            className={styles.buttonWrapper}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TechStackMoreDialog onOpenChange={setModalOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
