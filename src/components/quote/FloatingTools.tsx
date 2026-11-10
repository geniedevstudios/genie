import Image from 'next/image';
import styles from './quote.module.css';

const TOOLS = [
  { label: 'Node.js', src: '/node.png' },
  { label: 'React', src: '/react.svg' },
  { label: 'Supabase', src: '/supa.png' },
  { label: 'MongoDB', src: '/mongo.png' },
  { label: 'VS Code', src: '/vs.png' },
  { label: 'Xcode', src: '/xcode.png' },
  { label: 'Android Studio', src: '/android.png' },
  { label: 'Django', src: '/dj.png' },
];

export function FloatingTools() {
  return (
    <section className={styles.toolsSection} aria-labelledby="studio-tools-heading">
      <div><span className="studio-eyebrow">Inside the toolbox</span><h2 id="studio-tools-heading" className={styles.sectionTitle}>Great ideas.<br />The right tools.</h2>
        <p className={styles.toolsLead}>A few of our favourites. We choose the tools that fit your product and the people who will use it.</p></div>
      <div className={styles.toolsGrid}>
        {TOOLS.map(tool => <div key={tool.label} className={styles.toolCard}><Image src={tool.src} alt="" width={48} height={48} /><span>{tool.label}</span></div>)}
      </div>
    </section>
  );
}
