import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { GenieMark } from '@/components/common/GenieMark';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { TechStackMoreDialog } from '@/components/services/TechStackMoreDialog';
import { AnimatedTechGrid } from '@/components/services/AnimatedTechGrid';
import styles from './services.module.css';

export const metadata: Metadata = {
  title: 'Our Services | Genie Dev Studios',
  description:
    'Custom web platforms, product UI/UX, iOS & Android mobile apps, security audits, and technical architecture by Genie Dev Studios.',
};

const sections = [
  {
    id: 'web-apps',
    title: 'Website and Web Apps Development',
    lead:
      'From high-converting marketing sites to full-scale SaaS platforms, e-commerce storefronts, and internal operations dashboards.',
    bullets: [
      'Next.js and React applications with server-side rendering and fast page loads',
      'Payment gateway integrations (Paystack, Stripe, mobile money) and custom admin portals',
      'Automated CI/CD pipelines, SEO structure, and Core Web Vitals optimization',
    ],
    visualTag: 'Systems',
  },
  {
    id: 'ui-ux',
    title: 'User Interface & User Experience Design (UI/UX)',
    lead:
      'Product interfaces designed around how real customers browse, decide, and buy. Clean hierarchy, zero clutter, and ready for engineering.',
    bullets: [
      'User flows, information architecture, and low-friction checkout journeys',
      'Interactive Figma prototypes you can test before a single line of code is written',
      'Reusable design systems with consistent typography, contrast, and motion',
    ],
    visualTag: 'Flows',
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps Development',
    lead:
      'iOS and Android applications built for real-world network conditions, smooth gesture navigation, and reliable background sync.',
    bullets: [
      'Cross-platform and native-grade builds for iOS and Android',
      'Biometric auth, push notifications, offline caching, and secure API sync',
      'End-to-end App Store and Google Play submission and release management',
    ],
    visualTag: 'Devices',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    lead:
      'Practical security engineering for web and mobile platforms that handle customer data, accounts, and financial transactions.',
    bullets: [
      'API vulnerability audits, rate limiting, and webhook signature verification',
      'Role-based access control, secrets management, and encrypted data storage',
      'OWASP-aligned remediation and infrastructure hardening before and after launch',
    ],
    visualTag: 'Shield',
  },
  {
    id: 'it-consultancy',
    title: 'IT Consultancy',
    lead:
      'Direct technical guidance when you need to scope a new product, untangle a slow codebase, or choose the right cloud and payment stack.',
    bullets: [
      'Product scoping workshops, technical specifications, and milestone roadmaps',
      'Architecture reviews for payments, third-party APIs, and database scaling',
      'Hands-on engineering advisory for founders and growing product teams',
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
  react: '/react.svg',
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
      <main className={`${styles.page} home-main-surface`} data-theme="light">
        <div className={styles.main}>
          <header className={styles.intro}>
            <h1 className={styles.title}>Services</h1>
            <p className={styles.lead}>
              We take digital products from initial scope and UI design to production code and infrastructure hardening.
              Every engagement is structured around clear milestones, clean architecture, and measurable business outcomes.
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
                  aria-label="Technologies used at GENIE dev studios"
                >
                  <span className={styles.techHeadingInner}>
                    Technologies used at{' '}
                    <GenieMark width={34} className={styles.techHeadingMark} />{' '}
                    <span className={styles.techHeadingSuffix}>| dev studios</span>
                  </span>
                </h2>
                <p className={styles.techLead}>
                  Battle-tested frameworks, databases, and mobile toolchains we use every day to ship fast, secure, and maintainable software.
                </p>
              </header>
              <div className={styles.techRightPanel}>
                <AnimatedTechGrid 
                  items={TECH_STACK.map(t => ({
                    id: t.id,
                    label: t.label,
                    iconSrc: TECH_ICON_SRC[t.id]
                  }))} 
                />
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
