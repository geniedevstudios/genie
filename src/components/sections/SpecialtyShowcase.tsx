'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Code2, Compass, Globe2, Palette, ShieldCheck, Smartphone } from 'lucide-react';
import styles from './SpecialtyShowcase.module.css';

const SPECIALTIES = [
  { title: 'Web Development', subtitle: 'Your next great first impression.', description: 'Websites, web apps, and online stores built for the people who use them.', tag: 'Websites & web apps', href: '/services#web-apps', Icon: Globe2, sprite: '0% 0%', color: '#a3f45e', end: '#36d9a7', ink: '#143a2c' },
  { title: 'Mobile Apps', subtitle: 'Big possibilities. Pocket-sized.', description: 'Useful, thoughtful mobile experiences for your customers and your team.', tag: 'iOS & Android', href: '/services#mobile-apps', Icon: Smartphone, sprite: '50% 0%', color: '#ff8b79', end: '#ef526b', ink: '#4d192c' },
  { title: 'Software Development', subtitle: 'Made for the way you work.', description: 'Business systems, custom tools, and integrations built around your team.', tag: 'Systems & integrations', href: '/services#software-development', Icon: Code2, sprite: '100% 0%', color: '#29354b', end: '#191c2c', ink: '#ffffff' },
  { title: 'UI/UX Design', subtitle: 'Feels right. Works beautifully.', description: 'Clear journeys, thoughtful interfaces, and prototypes that bring your product into focus.', tag: 'Research & interfaces', href: '/services#ui-ux', Icon: Palette, sprite: '0% 100%', color: '#71e9f4', end: '#56b4f0', ink: '#123544' },
  { title: 'Cybersecurity', subtitle: 'Confidence, built in.', description: 'Practical security reviews and improvements for your accounts, data, and connected systems.', tag: 'Access & data protection', href: '/services#cybersecurity', Icon: ShieldCheck, sprite: '50% 100%', color: '#ffe769', end: '#edb632', ink: '#493510' },
  { title: 'IT Consultancy', subtitle: 'A clearer path forward.', description: 'Technical guidance, system reviews, and a practical roadmap before you commit to a build.', tag: 'Strategy & roadmaps', href: '/services#it-consultancy', Icon: Compass, sprite: '100% 100%', color: '#a59af5', end: '#7966d7', ink: '#251b4c' },
] as const;

export function SpecialtyShowcase() {
  const [activeIndex, setActiveIndex] = useState(2);
  const activeRef = useRef(2);
  const trackRef = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const centerCard = useCallback((index: number, animate = true) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    activeRef.current = index;
    setActiveIndex(index);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
      behavior: animate && !reduced ? 'smooth' : 'instant',
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(() => centerCard(activeRef.current, false));
    observer.observe(track);
    return () => {
      observer.disconnect();
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, [centerCard]);

  const handleScroll = () => {
    if (settleTimer.current) clearTimeout(settleTimer.current);
    // Update once scrolling settles, rather than re-rendering on every frame.
    settleTimer.current = setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let distance = Infinity;
      Array.from(track.children).forEach((child, index) => {
        const card = child as HTMLElement;
        const delta = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
        if (delta < distance) { distance = delta; nearest = index; }
      });
      activeRef.current = nearest;
      setActiveIndex(nearest);
    }, 140);
  };

  return (
    <div className={styles.specialties}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>A SPECIALIST FOR EVERY CHAPTER</p>
          <h2 id="portfolio-heading" className={styles.title}>Our specialty<span>.</span></h2>
        </div>
        <div className={styles.headerRight}>
          <p>Six disciplines. One team.<br />Find the right kind of magic for your next idea.</p>
          <div className={styles.arrows}>
            <button type="button" aria-label="Previous specialty" aria-controls="specialty-track" disabled={activeIndex === 0} onClick={() => centerCard(activeIndex - 1)}><ArrowLeft size={18} aria-hidden="true" /></button>
            <button type="button" aria-label="Next specialty" aria-controls="specialty-track" disabled={activeIndex === SPECIALTIES.length - 1} onClick={() => centerCard(activeIndex + 1)}><ArrowRight size={18} aria-hidden="true" /></button>
          </div>
        </div>
      </header>

      <div className={styles.carousel} role="region" aria-roledescription="carousel" aria-label="Our specialties">
        <div
          id="specialty-track"
          className={styles.track}
          ref={trackRef}
          onScroll={handleScroll}
          onKeyDown={event => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
              event.preventDefault();
              centerCard(Math.max(0, Math.min(SPECIALTIES.length - 1, activeIndex + (event.key === 'ArrowRight' ? 1 : -1))));
            }
          }}
        >
          {SPECIALTIES.map((specialty, index) => {
            const selected = index === activeIndex;
            return (
              <article
                key={specialty.title}
                className={`${styles.slot} ${selected ? styles.selected : ''}`}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${SPECIALTIES.length}: ${specialty.title}`}
                style={{ '--card-color': specialty.color, '--card-end': specialty.end, '--card-ink': specialty.ink, '--sprite-position': specialty.sprite, '--lean': `${index < activeIndex ? -4 : index > activeIndex ? 4 : 0}deg` } as CSSProperties}
              >
                <div className={styles.card}>
                  <div className={styles.cardBackground} aria-hidden="true" />
                  <span className={styles.artwork} aria-hidden="true" />
                  <button type="button" className={styles.selectCard} aria-label={`Feature ${specialty.title}`} aria-pressed={selected} onClick={() => centerCard(index)} />
                  <div className={styles.copy}>
                    <span className={styles.kicker}>{specialty.subtitle}</span>
                    <h3>{specialty.title}</h3>
                    <p>{specialty.description}</p>
                  </div>
                  <div className={styles.cardFooter}>
                    <span><specialty.Icon size={16} aria-hidden="true" />{specialty.tag}</span>
                    <Link href={specialty.href} aria-label={`Explore ${specialty.title}`}><ArrowUpRight size={20} aria-hidden="true" /></Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className={styles.carouselFooter}>
          <span className={styles.count} aria-live="polite" aria-atomic="true"><strong>{String(activeIndex + 1).padStart(2, '0')}</strong> / 06</span>
          <div className={styles.dots} aria-label="Choose a specialty">
            {SPECIALTIES.map((specialty, index) => (
              <button key={specialty.title} type="button" aria-label={`Show ${specialty.title}`} aria-current={activeIndex === index ? 'true' : undefined} onClick={() => centerCard(index)}><span /></button>
            ))}
          </div>
          <Link href="/services" className={styles.allServices}>All services <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
      </div>
    </div>
  );
}
