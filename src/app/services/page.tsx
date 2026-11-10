import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { FloatingTools } from '@/components/quote/FloatingTools';
import styles from './services.module.css';

export const metadata: Metadata = {
  title: 'Our Services | Genie Dev Studios',
  description: 'Six disciplines. One team. Web and mobile apps, custom software, UI/UX design, cybersecurity, and IT consultancy.',
  alternates: { canonical: '/services' },
};

const sections = [
  {
    id: 'web-apps',
    title: 'Web development',
    lead:
      'Your next great first impression. Websites, web apps, and online shops built around the people who use them.',
    bullets: [
      'Public sites and web applications people can actually use',
      'Admin dashboards, customer portals, and tools for day-to-day operations',
      'Connections to payments, email, or other services when the project needs them',
    ],
    visualTag: 'Systems',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX design',
    lead:
      'Feels right. Works beautifully. We turn complicated journeys into clear, thoughtful screens.',
    bullets: [
      'Flows and screen structure agreed before build',
      'Prototypes you can click through before development starts',
      'A consistent visual system the product can grow with',
    ],
    visualTag: 'Flows',
  },
  {
    id: 'mobile-apps',
    title: 'Mobile apps',
    lead:
      'Big possibilities. Pocket-sized. Useful iPhone and Android apps for life beyond the desk.',
    bullets: [
      'Apps for customers, staff, or both',
      'Notifications, sign-in, and offline use when the work requires them',
      'Store submission and release support when you are ready to publish',
    ],
    visualTag: 'Devices',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    lead:
      'Confidence, built in. Practical reviews and improvements for your accounts, data, and connected systems.',
    bullets: [
      'Review of access, accounts, and sensitive data',
      'Checks on APIs and incoming webhooks when those are in scope',
      'A practical plan to address the risks we find',
    ],
    visualTag: 'Shield',
  },
  {
    id: 'software-development',
    title: 'Software development',
    lead:
      'Made for the way you work. Custom tools, business systems, and integrations that help your team move forward.',
    bullets: [
      'Business systems and workflows tailored to your team',
      'APIs and integrations that connect the tools you already use',
      'Testing, deployment, and a clear handover for ongoing development',
    ],
    visualTag: 'Software',
  },
  {
    id: 'it-consultancy',
    title: 'IT consultancy',
    lead:
      'A clearer path forward. Bring us the problem, and we’ll help you choose what to build, improve, or connect.',
    bullets: [
      'A conversation about the work, the users, and a sensible first scope',
      'A written approach, milestones, and a price agreed before development',
      'Advice on existing systems when you need to improve what you already have',
    ],
    visualTag: 'Roadmap',
  },
] as const;

const ART: Record<string, { position: string; color: string }> = {
  'web-apps': { position: '0% 0%', color: '#80e8b4' },
  'ui-ux': { position: '0% 100%', color: '#cdb4f6' },
  'mobile-apps': { position: '50% 0%', color: '#ffa49e' },
  'cybersecurity': { position: '50% 100%', color: '#f1cd75' },
  'software-development': { position: '100% 0%', color: '#a1b8ff' },
  'it-consultancy': { position: '100% 100%', color: '#c3a1fa' },
};

export default function ServicesPage() {
  return <>
    <Navbar />
    <main className={styles.page}>
      <header className={styles.intro}>
        <span className="studio-eyebrow">Six disciplines. One team.</span>
        <h1 className="studio-title">A specialist for every chapter.</h1>
        <p>From the first spark to the next release. Find the right kind of magic for your idea.</p>
      </header>
      <nav className={styles.serviceNav} aria-label="Explore services">
        {sections.map(service => <a href={`#${service.id}`} key={service.id}>{service.title}</a>)}
      </nav>
      <div className={styles.stack}>
        {sections.map((service, index) => <section key={service.id} id={service.id} className={styles.card}
          aria-labelledby={`${service.id}-heading`} style={{ '--service-color': ART[service.id].color, '--sprite-position': ART[service.id].position } as CSSProperties}>
          <div className={styles.visual} aria-hidden="true"><div className={styles.character} /><span className={styles.number}>0{index + 1}</span></div>
          <div className={styles.copy}>
            <h2 id={`${service.id}-heading`}>{service.title}</h2>
            <p>{service.lead}</p>
            <ul>{service.bullets.map(bullet => <li key={bullet}><Check size={16} aria-hidden /><span>{bullet}</span></li>)}</ul>
            <Link href="/quote">Let’s build it <ArrowUpRight size={17} aria-hidden /></Link>
          </div>
        </section>)}
      </div>
      <div className={styles.tools}><FloatingTools /></div>
      <div className={styles.closing}><h2>Not sure where to start?</h2><p>Tell us what you have in mind. We’ll find the next step together.</p><Link href="/contact">Start a conversation ↗</Link></div>
    </main>
    <Footer />
  </>;
}
