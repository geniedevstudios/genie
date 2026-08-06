'use client';

import { motion } from 'framer-motion';
import styles from './quote.module.css';

// Using the real tech stack icons
const TOOLS = [
  { id: 'node', label: 'Node.js', iconSrc: '/node.png', size: 90, x: -280, y: -120 },
  { id: 'react', label: 'React', iconSrc: '/react.svg', size: 100, x: 20, y: -140 },
  { id: 'supabase', label: 'Supabase', iconSrc: '/supa.png', size: 95, x: 190, y: -90 },
  { id: 'mongodb', label: 'MongoDB', iconSrc: '/mongo.png', size: 85, x: -220, y: 30 },
  { id: 'vscode', label: 'VS Code', iconSrc: '/vs.png', size: 75, x: 260, y: 40 },
  { id: 'xcode', label: 'Xcode', iconSrc: '/xcode.png', size: 85, x: -160, y: 150 },
  { id: 'android-studio', label: 'Android Studio', iconSrc: '/android.png', size: 80, x: 0, y: 160 },
  { id: 'django', label: 'Django', iconSrc: '/dj.png', size: 95, x: 140, y: 180 },
];

export function FloatingTools() {
  return (
    <div className={styles.toolsSection}>
      <h2 className={styles.toolsTitle}>
        Works <span>with modern and reliable tools...</span>
      </h2>
      
      {TOOLS.map((tool) => (
        <motion.div
          key={tool.id}
          className={styles.toolBubble}
          style={{ 
            width: tool.size, 
            height: tool.size,
            x: tool.x,
            y: tool.y
          }}
          animate={{
            y: [tool.y - 10, tool.y + 10, tool.y - 10],
            x: [tool.x - 5, tool.x + 5, tool.x - 5],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        >
          {tool.iconSrc ? (
            <img src={tool.iconSrc} alt={tool.label} />
          ) : (
            <span style={{ fontWeight: 800, fontSize: tool.size * 0.25 }}>{tool.label}</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
