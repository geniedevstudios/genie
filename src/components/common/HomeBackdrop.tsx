import Image from 'next/image';
import styles from './HomeBackdrop.module.css';

const TOOLS = [
  { src: '/xcode.png', name: 'Xcode', className: styles.xcode },
  { src: '/vs.png', name: 'Visual Studio Code', className: styles.vscode },
  { src: '/android.png', name: 'Android Studio', className: styles.android },
  { src: '/react.svg', name: 'React', className: styles.react },
];

/** One continuous grid for the entire page; tool openings stay at the top. */
export function HomeBackdrop({ showTools = true }: { showTools?: boolean }) {
  return (
    <div className={styles.gridScene} aria-hidden="true">
      {[styles.gridLeft, styles.gridRight].map((side, sideIndex) => (
        <div key={side} className={side}>
          {showTools && TOOLS.slice(sideIndex * 2, sideIndex * 2 + 2).map(tool => (
            <div key={tool.name} className={`${styles.toolWindow} ${tool.className}`}>
              <Image src={tool.src} alt="" width={88} height={88} className={styles.toolLogo} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
