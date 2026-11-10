import React from 'react';
import { GenieMark } from '@/components/common/GenieMark';
import styles from './LogoLockup.module.css';

type LogoLockupProps = {
  className?: string;
};

/** Shared mark + "| dev" lockup. Size comes from the parent's font-size. */
export const LogoLockup: React.FC<LogoLockupProps> = ({ className }) => (
  <span className={className ? `${styles.lockup} ${className}` : styles.lockup}>
    <GenieMark width={40} className={styles.mark} />
    <span>
      <span className={styles.divider}>|</span>
      <span className={styles.dev}>dev</span>
    </span>
  </span>
);
