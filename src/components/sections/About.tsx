'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Target, ShieldCheck, Star } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, XIcon } from '@/components/common/BrandIcons';
import { GenieMark } from '@/components/common/GenieMark';
import styles from './About.module.css';

type SocialIconType = 'linkedin' | 'x' | 'instagram' | 'github';

type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  portraitSrc: string;
  thumbSrc: string;
  links: { label: string; href: string; icon: SocialIconType }[];
};

const EMIL_AVATAR = '/emil.jpeg';
const EMIL_THUMB = '/emil.jpeg';

const TEAM: TeamMember[] = [
  {
    id: 'emil',
    name: 'Emil',
    role: 'Founder . Full Stack Developer',
    bio: 'Emil develops complete web applications and platforms, from user interfaces to backend systems and integrations. His approach prioritizes clean architecture, reliable performance, and systems that remain maintainable as they scale.',
    portraitSrc: EMIL_AVATAR,
    thumbSrc: EMIL_THUMB,
    links: [
      { label: 'GitHub', href: 'https://github.com', icon: 'github' },
      { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
      { label: 'X', href: 'https://x.com', icon: 'x' },
    ],
  },
];

function SocialIcon({ type }: { type: SocialIconType }) {
  const s = 18;
  switch (type) {
    case 'github':
      return <GithubIcon size={s} />;
    case 'linkedin':
      return <LinkedinIcon size={s} />;
    case 'instagram':
      return <InstagramIcon size={s} />;
    case 'x':
      return <XIcon size={s} />;
    default:
      return null;
  }
}

export const About: React.FC = () => {
  const [memberIdx, setMemberIdx] = useState(0);
  const member = TEAM[memberIdx] ?? TEAM[0];

  const storyVideoRef = useRef<HTMLVideoElement>(null);
  const [storyVideoSrc, setStoryVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/about-vid.mp4', { method: 'HEAD' })
      .then((r) => {
        if (!cancelled && r.ok) setStoryVideoSrc('/about-vid.mp4');
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const v = storyVideoRef.current;
    if (!v || !storyVideoSrc) return;
    void v.play().catch(() => {});
  }, [storyVideoSrc]);

  return (
    <div className={styles.root}>
      <div className={styles.aboutForeground}>
      <section className={styles.hero} aria-labelledby="about-hero-title">
        <div className={styles.heroGrid}>
          <div className={styles.heroTitleBlock}>
            <h1 id="about-hero-title" className={styles.heroTitleGroup} aria-label="About Genie dev">
              <span className={styles.heroDisplay}>About</span>
              <span className={styles.heroBrandLine}>
                <span className={styles.heroBrandMarkWrap} aria-hidden="true">
                  <GenieMark width={64} className={styles.heroBrandMark} />
                </span>
                <span className={styles.heroBrandSuffix}>| dev</span>
              </span>
            </h1>
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.heroSub}>
              See how we work—and what shapes every build.
            </p>
            <p className={styles.heroLead}>
              We&apos;re a Ghana-based development practice building web platforms, mobile applications, and
              integrations that perform reliably in real-world conditions. We combine clear strategy,
              solid execution, and realistic timelines so your product can scale without breaking
              expectations.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.story} aria-label="Our story">
        <div className={styles.storyInner}>
          <div className={styles.storyGrid}>
            <div className={styles.storyText}>
              <p>
                We work as a team focused on results, not presentations. That means uncovering real
                constraints early, designing systems that remain flexible as you grow, and delivering
                features you can test in staging before they reach production.
              </p>
              <p>
                As technology evolves, we stay current—and apply the same level of care across
                everything we build, from payment systems and APIs to user interfaces. We prioritize
                long-term partnerships, making each release smoother and more efficient than the last.
              </p>
            </div>
            <div className={styles.storyMedia}>
              <div className={styles.storyInfinityStage}>
                {storyVideoSrc ? (
                  <video
                    ref={storyVideoRef}
                    className={styles.storyInfinityVideo}
                    src={storyVideoSrc}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="auto"
                    aria-label="Ambient reel"
                  />
                ) : (
                  <div className={styles.storyVideoPlaceholder} aria-hidden />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.metrics} aria-labelledby="about-metrics-heading">
        <div className={styles.metricsInner}>
          <div className={styles.metricsTop}>
            <div>
              <h2
                id="about-metrics-heading"
                className={styles.metricsHeadline}
              >
                Building Smarter Digital Experiences
              </h2>
              <p className={styles.metricsLead}>
                We design and develop scalable platforms and applications that help businesses operate
                efficiently, grow faster, and stay ahead in a digital-first world.
              </p>
            </div>
            <div
              className={styles.trustCard}
              role="group"
              aria-label="What it is like to work with us"
            >
              <p className={styles.trustCardHeading}>What it&apos;s like to work with us</p>
              <div className={styles.starsBlock}>
                <div className={styles.stars} aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={styles.star} size={18} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className={styles.starsFootnote}>(based on 1000+ reviews)</p>
              </div>
              <p className={styles.trustTitle}>Disciplined execution from start to finish</p>
              <p className={styles.trustCaption}>
                Every project follows a structured process with defined milestones, transparent updates,
                and clean handoffs—so your product stays stable, scalable, and easy to evolve.
              </p>
            </div>
          </div>
          <div className={styles.statsRow}>
            <div>
              <div className={styles.statValue}>20+</div>
              <p className={styles.statLabel}>Completed builds and feature releases</p>
            </div>
            <div>
              <div className={styles.statValue}>100%</div>
              <p className={styles.statLabel}>Defined requirements before development</p>
            </div>
            <div>
              <div className={styles.statValue}>30+</div>
              <p className={styles.statLabel}>Businesses worked with</p>
            </div>
            <div>
              <div className={styles.statValue}>24h</div>
              <p className={styles.statLabel}>Response window</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.team} aria-labelledby="about-team-heading">
        <div className={styles.teamInner}>
          <div className={styles.teamIntro}>
            <h2
              id="about-team-heading"
              className={styles.teamHeading}
              aria-label="Meet the Genie dev team"
            >
              <span className={styles.teamHeadingRow} aria-hidden="true">
                <span>Meet the </span>
                <span className={styles.teamHeadingBrand}>
                  <GenieMark width={40} className={styles.teamHeadingMark} />
                  <span className={styles.teamHeadingSuffix}>| dev</span>
                </span>
                <span> team</span>
              </span>
            </h2>
            <p className={styles.teamLede}>
              We bring together focused builders who care about craft, clarity, and execution—creating
              an environment where great work is the standard, not the exception.
            </p>
          </div>

          <div className={styles.teamPanel}>
            <div className={styles.teamLayout}>
              <div className={styles.teamCopy}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className={styles.teamName}>{member.name}</h3>
                    <p className={styles.teamRole}>{member.role}</p>
                    <p className={styles.teamBio}>{member.bio}</p>
                  </motion.div>
                </AnimatePresence>

                <div className={styles.socialRow}>
                  {member.links.map((l) => (
                    <a
                      key={l.href + l.label}
                      href={l.href}
                      className={styles.socialBtn}
                      aria-label={l.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SocialIcon type={l.icon} />
                    </a>
                  ))}
                </div>

                <div
                  className={styles.avatarRow}
                  role={TEAM.length > 1 ? 'tablist' : undefined}
                  aria-label={TEAM.length > 1 ? 'Team members' : undefined}
                >
                  {TEAM.map((m, i) => (
                    <button
                      key={m.id}
                      type="button"
                      role={TEAM.length > 1 ? 'tab' : undefined}
                      aria-selected={TEAM.length > 1 ? i === memberIdx : undefined}
                      className={`${styles.avatarBtn} ${i === memberIdx ? styles.avatarBtnActive : ''}`}
                      onClick={() => TEAM.length > 1 && setMemberIdx(i)}
                      aria-label={TEAM.length > 1 ? `Show ${m.name}` : `${m.name} profile`}
                    >
                      <img className={styles.avatarImg} src={m.thumbSrc} alt="" width={96} height={96} />
                    </button>
                  ))}
                </div>

                <p className={styles.teamCta}>
                  <Link href="/contact" className={styles.teamCtaLink}>
                    Start a project →
                  </Link>
                </p>
              </div>

              <div className={styles.teamVisual}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={member.id + '-img'}
                    className={styles.teamVisualMotion}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      className={styles.teamPortraitImg}
                      src={member.portraitSrc}
                      alt=""
                      decoding="async"
                      fetchPriority={memberIdx === 0 ? 'high' : 'auto'}
                    />
                  </motion.div>
                </AnimatePresence>
                <div className={styles.teamVisualFade} aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.philosophy} aria-labelledby="about-philosophy-heading">
        <div className={styles.philosophyInner}>
          <h2
            id="about-philosophy-heading"
            className={styles.philosophySectionTitle}
          >
            Principles
          </h2>
          <div className={styles.philosophyCard}>
            <div className={styles.philosophyGrid}>
              <div className={styles.philItem}>
                <div className={styles.philIcon}>
                  <Target size={24} strokeWidth={2.25} aria-hidden />
                </div>
                <div>
                  <h3>Bottleneck-first</h3>
                  <p>
                    We target the specific friction that kills conversion or slows operations—not trendy
                    features that don&apos;t move your KPIs.
                  </p>
                </div>
              </div>
              <div className={styles.philItem}>
                <div className={styles.philIcon}>
                  <ShieldCheck size={24} strokeWidth={2.25} aria-hidden />
                </div>
                <div>
                  <h3>Secure by default</h3>
                  <p>
                    Compliance, encryption, and least-privilege access are baked in from day one. Growth
                    never introduces vulnerabilities we haven&apos;t already tested.
                  </p>
                </div>
              </div>
              <div className={styles.philItem}>
                <div className={styles.philIcon}>
                  <Activity size={24} strokeWidth={2.25} aria-hidden />
                </div>
                <div>
                  <h3>Reliability as a habit</h3>
                  <p>
                    Every sprint includes load testing, automated rollbacks, and real-time monitoring. Your
                    business won&apos;t be our learning experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </div>
    </div>
  );
};
