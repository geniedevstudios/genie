'use client';

import { useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Code2, Database, PenLine, Rocket, Search, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import styles from './Hero.module.css';

const SERVICES = [
  { key: 'implement', label: 'Implement', subtitle: 'Ready for takeoff.', Icon: Rocket, color: '#8750eb', position: '0% 0%', description: 'Hosting, deployments, and a release process your team can repeat. We take your software from build to launch.' },
  { key: 'design', label: 'Design', subtitle: 'Make every pixel count.', Icon: PenLine, color: '#fa667e', position: '50% 0%', description: 'Thoughtful interfaces shaped around your users, from the first idea to the very last detail.' },
  { key: 'code', label: 'Code', subtitle: 'Big ideas. Beautiful builds.', Icon: Code2, color: '#27c7dd', position: '100% 0%', description: 'Websites, mobile apps, and business systems, built with the right tools for your next big idea.' },
  { key: 'manage', label: 'Manage', subtitle: 'In good hands. Always.', Icon: Database, color: '#45d2ac', position: '0% 100%', description: 'Databases, backups, monitoring, and ongoing releases. Optional support that keeps things running.' },
  { key: 'seo', label: 'SEO', subtitle: 'Good work. Get found.', Icon: Search, color: '#f0bc47', position: '50% 100%', description: 'Fast, accessible pages structured for the people searching for you and the search engines helping them.' },
  { key: 'security', label: 'Security', subtitle: 'Built with care.', Icon: ShieldCheck, color: '#6978ef', position: '100% 100%', description: 'Access, stored data, and connections to other services considered throughout the build.' },
];

export function Hero() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <div className={styles.heroFrame}>
      <section className={styles.heroSection} aria-labelledby="hero-title">
        <Navbar blend />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>A little imagination. A lot of engineering.</p>
          <h1 id="hero-title" className={styles.heroTitle}>Big ideas.<br />Meet your <span>dream team.</span></h1>
          <p className={styles.heroDescription}>We design, build, and bring your digital world to life.<br className={styles.desktopBreak} /> Custom websites, apps, and systems. A little genie magic.</p>
          <div className={styles.heroCtas}>
            <Link href="/quote" className={styles.primaryCta}>Let’s build something <ArrowUpRight size={17} aria-hidden="true" /></Link>
            <Link href="/portfolio" className={styles.secondaryCta}>Explore our work <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>

        <div className={styles.deck} aria-label="Meet our services">
          {SERVICES.map(({ key, label, subtitle, Icon, color, position, description }, index) => {
            const active = activeCard === key;
            return (
              <div
                key={key}
                className={`${styles.serviceCard} ${active ? styles.cardActive : ''}`}
                style={{ '--card-color': color, '--sprite-position': position, '--card-index': index } as CSSProperties}
                onKeyDown={event => { if (event.key === 'Escape') setActiveCard(null); }}
              >
                <div className={styles.cardSurface}>
                  <button className={styles.cardButton} aria-expanded={active} aria-controls={`hero-service-${key}`} onClick={() => setActiveCard(active ? null : key)}>
                    <span className={styles.cardHeading}><span>{label}</span><span className={styles.cardIcon}><Icon size={16} aria-hidden="true" /></span></span>
                    <span className={styles.cardSubtitle}>{subtitle}</span>
                    <span className={styles.character} aria-hidden="true" />
                    <span className={styles.cardHint}>{active ? 'Close details' : 'Meet your specialist'} <ArrowUpRight size={13} aria-hidden="true" /></span>
                  </button>
                  <div id={`hero-service-${key}`} className={styles.cardDetails} hidden={!active}>
                    <p>{description}</p>
                    <Link href="/services">Explore services <ArrowUpRight size={14} aria-hidden="true" /></Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className={styles.mobileHint}>Swipe to meet the whole team <ArrowRight size={12} aria-hidden="true" /></p>
      </section>
    </div>
  );
}
