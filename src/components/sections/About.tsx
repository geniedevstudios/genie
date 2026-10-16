'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Target, ShieldCheck, Star } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, XIcon } from '@/components/common/BrandIcons';
import { GenieMark } from '@/components/common/GenieMark';
import { SOCIAL_LINKS } from '@/lib/socialLinks';
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
    role: 'Founder · Lead Full-Stack Engineer',
    bio: 'Emil leads architecture and full-stack engineering at Genie Dev Studios. He specializes in building high-throughput web applications, custom e-commerce systems, payment integrations, and clean admin tooling that teams can rely on.',
    portraitSrc: EMIL_AVATAR,
    thumbSrc: EMIL_THUMB,
    links: [
      { label: 'Instagram', href: SOCIAL_LINKS.instagram, icon: 'instagram' },
      { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, icon: 'linkedin' },
      { label: 'X', href: SOCIAL_LINKS.x, icon: 'x' },
      { label: 'GitHub', href: SOCIAL_LINKS.github, icon: 'github' },
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
  const [storyVideoOk, setStoryVideoOk] = useState(true);
  const [storyVideoReady, setStoryVideoReady] = useState(false);
  const storyRevealedRef = useRef(false);

  const handleStoryReady = useCallback(() => {
    if (storyRevealedRef.current) return;
    storyRevealedRef.current = true;
    setStoryVideoReady(true);
  }, []);

  useEffect(() => {
    const v = storyVideoRef.current;
    if (!v || !storyVideoOk) return;
    void v.play().catch(() => {});
  }, [storyVideoOk]);

  return (
    <div className={styles.root}>
      <div className={styles.aboutForeground}>
      <section className={styles.hero} aria-labelledby="about-hero-title">
        <div className={styles.heroGrid}>
          <div className={styles.heroTitleBlock}>
            <h1 id="about-hero-title" className={styles.heroTitleGroup} aria-label="About Genie dev studios">
              <span className={styles.heroDisplay}>About</span>
              <span className={styles.heroBrandLine}>
                <span className={styles.heroBrandMarkWrap} aria-hidden="true">
                  <GenieMark width={64} className={styles.heroBrandMark} />
                </span>
                <span className={styles.heroBrandSuffix}>| dev studios</span>
              </span>
            </h1>
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.heroSub}>
              Built in Accra. Engineered for production.
            </p>
            <p className={styles.heroLead}>
              Genie Dev Studios is a software design and engineering practice building custom web platforms,
              mobile apps, and payment-ready systems. We skip the agency bloat—pairing you directly with
              builders who scope honestly, write clean code, and ship on schedule.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.story} aria-label="Our story">
        <div className={styles.storyInner}>
          <div className={styles.storyGrid}>
            <div className={styles.storyText}>
              <p>
                Most software projects fail in the gap between a flashy slide deck and actual engineering.
                We started Genie Dev Studios to close that gap: every project begins with a concrete technical
                scope, interactive prototypes, and architecture designed around your real business workflows.
              </p>
              <p>
                Whether we are launching a custom storefront with Paystack checkout, building a cross-platform
                mobile app, or hardening an existing backend, you get staging links you can test every week
                and a codebase your business truly owns.
              </p>
            </div>
            <div className={styles.storyMedia}>
              <div className={styles.storyInfinityStage}>
                {storyVideoOk ? (
                  <>
                  <video
                    ref={storyVideoRef}
                    className={`${styles.storyInfinityVideo} ${storyVideoReady ? styles.storyInfinityVideoReady : ''}`}
                    src="/about-vid.mp4"
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="auto"
                    aria-label="Ambient reel"
                    onCanPlay={handleStoryReady}
                    onPlaying={handleStoryReady}
                    onTimeUpdate={(e) => {
                      if (e.currentTarget.currentTime > 0.05) handleStoryReady();
                    }}
                    onError={() => setStoryVideoOk(false)}
                  />
                  {!storyVideoReady && (
                    <div className={styles.storyVideoShimmer} aria-hidden />
                  )}
                  </>
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
                Software Built for Real Operations
              </h2>
              <p className={styles.metricsLead}>
                From customer-facing checkout flows to back-office inventory and reporting tools, we engineer systems
                that eliminate manual bottlenecks and hold up under daily traffic.
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
                <p className={styles.starsFootnote}>(5.0 client satisfaction across 30+ partnerships)</p>
              </div>
              <p className={styles.trustTitle}>Direct-to-engineer execution</p>
              <p className={styles.trustCaption}>
                Fixed Cedi milestones, weekly staging builds, and clean documentation—so you always know what is
                shipping and when.
              </p>
            </div>
          </div>
          <div className={styles.statsRow}>
            <div>
              <div className={styles.statValue}>20+</div>
              <p className={styles.statLabel}>Production systems &amp; releases shipped</p>
            </div>
            <div>
              <div className={styles.statValue}>100%</div>
              <p className={styles.statLabel}>Scoped with milestones before code</p>
            </div>
            <div>
              <div className={styles.statValue}>30+</div>
              <p className={styles.statLabel}>Brands &amp; businesses partnered with</p>
            </div>
            <div>
              <div className={styles.statValue}>&lt; 24h</div>
              <p className={styles.statLabel}>Direct response window</p>
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
              aria-label="Meet the Genie dev studios team"
            >
              <span className={styles.teamHeadingRow} aria-hidden="true">
                <span>Meet the </span>
                <span className={styles.teamHeadingBrand}>
                  <GenieMark width={40} className={styles.teamHeadingMark} />
                  <span className={styles.teamHeadingSuffix}>| dev studios</span>
                </span>
                <span> team</span>
              </span>
            </h2>
            <p className={styles.teamLede}>
              Senior product builders focused on clean architecture, sharp interfaces, and reliable delivery.
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
