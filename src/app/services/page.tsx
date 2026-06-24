import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { GenieMark } from '@/components/common/GenieMark';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { TechStackMoreDialog } from '@/components/services/TechStackMoreDialog';
import styles from './services.module.css';

export const metadata: Metadata = {
  title: 'Services | Genie │ dev',
  description:
    'Website and web apps, UI/UX, mobile apps, cybersecurity, and IT consultancy — built for clarity, scale, and outcomes.',
};

const sections = [
  {
    id: 'web-apps',
    title: 'Website and Web Apps Development',
    lead:
      'Fast, accessible sites and web applications engineered for performance, SEO, and maintainability — from marketing pages to data-driven dashboards.',
    bullets: [
      'Next.js / React frontends and robust API integrations',
      'CMS-ready content structures and component systems',
      'Performance, Core Web Vitals, and deployment pipelines',
    ],
    visualTag: 'Systems',
  },
  {
    id: 'ui-ux',
    title: 'User Interface & User Experience Design (UI/UX)',
    lead:
      'Interfaces that feel intentional: clear hierarchy, consistent patterns, and motion that supports comprehension — not noise.',
    bullets: [
      'User research and persona development',
      'Wireframing and user flow mapping',
      'Design systems and accessible contrast & typography',
    ],
    visualTag: 'Flows',
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps Development',
    lead:
      'Native-feeling experiences on iOS and Android — offline-aware, notification-ready, and tuned for real devices in the field.',
    bullets: [
      'Cross-platform and native-aligned architecture',
      'Secure auth, storage, and API communication',
      'Store submission and release hygiene',
    ],
    visualTag: 'Devices',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    lead:
      'Practical hardening for apps and infrastructure: reduce attack surface, protect user data, and build confidence with stakeholders.',
    bullets: [
      'Threat modeling aligned to your stack and risk profile',
      'Secure configuration, secrets handling, and dependency hygiene',
      'Guidance on compliance-minded practices (without the jargon dump)',
    ],
    visualTag: 'Shield',
  },
  {
    id: 'it-consultancy',
    title: 'IT Consultancy',
    lead:
      'Straightforward advice on architecture, vendor choices, and delivery — so you invest in the right systems at the right time.',
    bullets: [
      'Technical discovery and roadmap workshops',
      'Integration strategy (payments, identity, data)',
      'Ongoing advisory for growing teams',
    ],
    visualTag: 'Roadmap',
  },
] as const;

const ROMAN = ['I', 'II', 'III', 'IV', 'V'] as const;

const TECH_STACK = [
  {
    id: 'node',
    label: 'Node.js',
    title: 'Node.js',
    description:
      'JavaScript on the server for APIs, integrations, and tooling — fast iteration with a rich package ecosystem and production-grade observability.',
  },
  {
    id: 'react',
    label: 'React',
    title: 'React',
    description:
      'Component-driven UIs with predictable patterns — ideal for marketing sites, dashboards, and design systems that stay accessible and maintainable.',
  },
  {
    id: 'supabase',
    label: 'Supabase',
    title: 'Supabase',
    description:
      'Postgres, auth, storage, and realtime in one managed layer — great for shipping features quickly without reinventing backend fundamentals.',
  },
  {
    id: 'mongodb',
    label: 'MongoDB',
    title: 'MongoDB',
    description:
      'Flexible document storage when your domain model evolves quickly — paired with thoughtful indexing and schema discipline where it matters.',
  },
  {
    id: 'vscode',
    label: 'Visual Studio Code',
    title: 'Visual Studio Code',
    description:
      'Our daily driver editor — extensions, debugging, and Git integration keep the whole team moving in the same productive workflow.',
  },
  {
    id: 'xcode',
    label: 'Xcode',
    title: 'Xcode',
    description:
      'Apple platform builds, signing, and profiling — the toolchain we use when shipping native-quality iOS experiences.',
  },
  {
    id: 'android-studio',
    label: 'Android Studio',
    title: 'Android Studio',
    description:
      'Gradle, emulators, and Android-specific diagnostics — essential for robust mobile delivery on the Play ecosystem.',
  },
  {
    id: 'django',
    label: 'Django',
    title: 'Django',
    description:
      'Batteries-included Python web framework for secure admin, ORM, and rapid backend iteration when the problem fits a structured server stack.',
  },
] as const;

type TechStackId = (typeof TECH_STACK)[number]['id'];

const TECH_ICON_SRC: Record<TechStackId, string | null> = {
  node: '/node.png',
  react: null,
  supabase: '/supa.png',
  mongodb: '/mongo.png',
  vscode: '/vs.png',
  xcode: '/xcode.png',
  'android-studio': '/android.png',
  django: '/dj.png',
};

function TechBrandIcon({ id }: { id: TechStackId }) {
  const src = TECH_ICON_SRC[id];
  if (src) {
    return (
      <Image
        src={src}
        alt=""
        width={48}
        height={48}
        className={styles.techBrandImg}
        sizes="48px"
      />
    );
  }

  return (
    <svg className={styles.techSvg} viewBox="-11.5 -10.25 23 20.5" aria-hidden>
      <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(-60)" />
      </g>
    </svg>
  );
}

function ServiceIllustration({ tag }: { tag: string }) {
  return (
    <div className={styles.visual}>
      <div className={styles.visualGlow} aria-hidden />
      <div className={styles.visualFrame}>
        <div className={styles.visualTopBar}>
          <span className={styles.visualDot} />
          <span className={styles.visualDot} />
          <span className={styles.visualDot} />
        </div>
        <div className={styles.visualCanvas}>
          <div className={styles.visualCard}>
            <div className={styles.visualCardLine} />
            <div className={styles.visualCardLineShort} />
            <div className={styles.visualCardBlocks}>
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className={styles.visualConnect} aria-hidden />
          <div className={styles.visualCardAlt}>
            <div className={styles.visualCardLine} />
            <div className={styles.visualTag}>
              <span className={styles.visualTagGlow} />
              {tag}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.main}>
          <header className={styles.intro}>
            <h1 className={styles.title}>Services</h1>
            <p className={styles.lead}>
              Navigate our comprehensive suite of services, where technical innovation meets strategic business
              thinking. We specialize in building scalable digital tools and providing end-to-end support that turns
              operational hurdles into competitive advantages. Learn more about our capabilities and how we deliver the
              precision and scale your company needs to succeed.
            </p>
          </header>

          <div className={styles.stack}>
            {sections.map((s, index) => {
              const roman = ROMAN[index] ?? String(index + 1);
              const reverse = index % 2 === 1;

              return (
                <section
                  key={s.id}
                  id={s.id}
                  className={`${styles.row} ${reverse ? styles.rowReverse : ''}`}
                  aria-labelledby={`${s.id}-heading`}
                >
                  <div className={styles.rowInner}>
                    <div className={styles.copy}>
                      <span className={styles.watermark} aria-hidden="true">
                        {roman}
                      </span>
                      <h2 id={`${s.id}-heading`} className={styles.sectionTitle}>
                        {s.title}
                      </h2>
                      <p className={styles.sectionLead}>{s.lead}</p>
                      <ul className={styles.featureList}>
                        {s.bullets.map((b) => (
                          <li key={b} className={styles.featureItem}>
                            <span className={styles.featureIcon} aria-hidden="true">
                              <Check strokeWidth={2.75} size={12} />
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href="/contact" className={styles.cta}>
                        Discuss this service
                      </Link>
                    </div>
                    <div className={styles.visualCol}>
                      <ServiceIllustration tag={s.visualTag} />
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          <section id="tech-stack" className={styles.techStack} aria-labelledby="tech-stack-heading">
            <span className={styles.techWatermark} aria-hidden="true">
              TECH
              <br />
              STACK
            </span>
            <div className={styles.techInner}>
              <header className={styles.techHead}>
                <h2
                  id="tech-stack-heading"
                  className={styles.techHeading}
                  aria-label="Technologies used at GENIE dev"
                >
                  <span className={styles.techHeadingInner}>
                    Technologies used at{' '}
                    <GenieMark width={34} className={styles.techHeadingMark} />{' '}
                    <span className={styles.techHeadingSuffix}>| dev</span>
                  </span>
                </h2>
                <p className={styles.techLead}>
                  Modern tooling across the stack — from polished interfaces and APIs to dependable cloud foundations.
                  We choose technologies that ship fast, scale cleanly, and stay maintainable as your product grows.
                </p>
              </header>
              <div className={styles.techColumns}>
                {TECH_STACK.map((t) => (
                  <article key={t.id} className={styles.techCard}>
                    <div className={styles.techBrand}>
                      <TechBrandIcon id={t.id} />
                      <span className={styles.techBrandLabel}>{t.label}</span>
                    </div>
                    <h3 className={styles.techCardTitle}>{t.title}</h3>
                    <p className={styles.techCardDesc}>{t.description}</p>
                  </article>
                ))}
              </div>
              <TechStackMoreDialog />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
