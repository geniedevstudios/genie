import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Code2, MapPin, MessageCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, XIcon } from '@/components/common/BrandIcons';
import { SOCIAL_LINKS } from '@/lib/socialLinks';
import styles from './About.module.css';

const VALUES = [
  { title: 'Always curious.', label: '01 / THE MINDSET', copy: 'We ask questions, explore possibilities, and find the idea worth building.', image: '/about/curiosity.png', color: '#91e8b5', end: '#55bc9c' },
  { title: 'Made together.', label: '02 / THE METHOD', copy: 'Your knowledge. Our craft. One team turning a little spark into something real.', image: '/about/together.png', color: '#b7a0ec', end: '#7c69be' },
  { title: 'Built with care.', label: '03 / THE PROMISE', copy: 'Thoughtful screens, dependable foundations, and a product you can call your own.', image: '/about/care.png', color: '#f5dc8c', end: '#dcb454' },
];

const STEPS = [
  { title: 'Find the spark', copy: 'We listen to your idea and the problem behind it. Together, we decide what matters most.' },
  { title: 'Shape the plan', copy: 'Clear screens, a useful first scope, and an agreed price. You know where we’re headed.' },
  { title: 'Bring it to life', copy: 'Design, build, test, and share. You see progress and help shape the details along the way.' },
  { title: 'Make it yours', copy: 'We launch with you, hand over the code and setup, and plan any support you’d like next.' },
];

export function About() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <span className="studio-eyebrow">The studio behind the magic</span>
        <h1>Small team.<br /><span>Big imagination.</span></h1>
        <p>We’re Genie Dev Studios. Curious minds, hands-on makers, and the people who turn “what if” into “here it is.”</p>
        <a href="#studio-story" className={styles.storyLink}>Get to know us <ArrowDown size={16} aria-hidden /></a>
      </header>

      <section className={styles.values} aria-label="What makes us Genie">
        {VALUES.map((value, index) => <article key={value.title} className={`${styles.valueCard} ${index === 1 ? styles.centerCard : ''}`}
          style={{ '--card-color': value.color, '--card-end': value.end } as CSSProperties}>
          <div className={styles.character} aria-hidden="true"><Image src={value.image} alt="" fill sizes="(max-width: 640px) 280px, 320px" /></div>
          <div className={styles.valueCopy}><span>{value.label}</span><h2>{value.title}</h2><p>{value.copy}</p></div>
        </article>)}
      </section>

      <section id="studio-story" className={styles.story} aria-labelledby="studio-story-heading">
        <div className={styles.storyHeading}><span className="studio-eyebrow">Our little corner of the world</span><h2 id="studio-story-heading">From Accra.<br />With imagination.</h2>
          <div className={styles.location}><MapPin size={16} aria-hidden /> Accra, Ghana <span aria-hidden>↗</span></div>
        </div>
        <div className={styles.storyBody}>
          <p className={styles.storyLead}>Good software starts with people.<br />That’s where we start, too.</p>
          <p>We’re the software studio of Genie Platforms. We bring design and engineering together to build websites, apps, and business systems around the way you work.</p>
          <p>A first launch, a better customer experience, a tool that gives your team time back. Whatever brings you here, you work directly with the people making it happen.</p>
          <Link href="/services" className={styles.textLink}>Find your specialist <ArrowUpRight size={17} aria-hidden /></Link>
        </div>
      </section>

      <section className={styles.founder} aria-labelledby="founder-heading">
        <div className={styles.portraitStage}>
          <div className={styles.portraitBack} aria-hidden="true" />
          <figure className={styles.portraitCard}>
            <div className={styles.portrait}><Image src="/emil.jpeg" alt="Emil, founder of Genie Dev Studios" fill sizes="(max-width: 640px) 85vw, 420px" /></div>
            <figcaption><span><strong>Emil</strong><small>Founder / Lead engineer</small></span><Code2 size={28} aria-hidden /></figcaption>
          </figure>
          <span className={styles.portraitTag}>A builder at heart.</span>
        </div>
        <div className={styles.founderCopy}>
          <span className="studio-eyebrow">Meet your build team</span>
          <h2 id="founder-heading">A real person.<br />In your corner.</h2>
          <p className={styles.founderIntro}>Meet Emil, founder and lead full-stack engineer at Genie Dev Studios.</p>
          <p>Emil leads the architecture and engineering behind our projects, from websites and apps to business systems, payments, and the tools that keep a team moving.</p>
          <p>Bring the rough sketch. Ask the extra question. You’ll be speaking with someone who cares about the details as much as the idea.</p>
          <div className={styles.socials} aria-label="Connect with Emil">
            <a href={SOCIAL_LINKS.linkedin} aria-label="Emil on LinkedIn" target="_blank" rel="noopener noreferrer"><LinkedinIcon size={18} /></a>
            <a href={SOCIAL_LINKS.github} aria-label="Emil on GitHub" target="_blank" rel="noopener noreferrer"><GithubIcon size={18} /></a>
            <a href={SOCIAL_LINKS.instagram} aria-label="Emil on Instagram" target="_blank" rel="noopener noreferrer"><InstagramIcon size={18} /></a>
            <a href={SOCIAL_LINKS.x} aria-label="Emil on X" target="_blank" rel="noopener noreferrer"><XIcon size={16} /></a>
          </div>
          <Link href="/contact" className={styles.textLink}>Say hello <ArrowUpRight size={17} aria-hidden /></Link>
        </div>
      </section>

      <section className={styles.process} aria-labelledby="process-heading">
        <header><div><span className="studio-eyebrow">A little structure behind the magic</span><h2 id="process-heading">Here’s how we get there.</h2></div><p>Clear steps. Open conversations.<br />Something to look forward to at every stage.</p></header>
        <div className={styles.steps}>{STEPS.map((step, index) => <article key={step.title} className={styles.step}>
          <span className={styles.stepNumber}>0{index + 1}<ArrowUpRight size={17} aria-hidden /></span>
          <h3>{step.title}</h3><p>{step.copy}</p>
        </article>)}</div>
      </section>

      <section className={styles.invite} aria-labelledby="about-invite-heading">
        <MessageCircle size={32} strokeWidth={1.4} aria-hidden />
        <span className="studio-eyebrow">Enough about us</span>
        <h2 id="about-invite-heading">What are you dreaming up?</h2>
        <p>We’d love to hear it. Let’s make your next great build happen.</p>
        <Link href="/quote">Let’s build something <ArrowUpRight size={18} aria-hidden /></Link>
      </section>
    </div>
  );
}
