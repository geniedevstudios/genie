'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Code2, Globe2, History, Layers3, MessageCircle, ShieldCheck, Smartphone } from 'lucide-react';
import { getPortfolioThumbSources, PORTFOLIO_PROJECTS, type PortfolioCategoryId, type PortfolioItem } from '@/lib/portfolioData';
import styles from './FeaturedProjects.module.css';

const SERVICES = [
  { id: 'web', label: 'Web apps', icon: Globe2 },
  { id: 'mobile', label: 'Mobile apps', icon: Smartphone },
  { id: 'software', label: 'Software', icon: Code2 },
  { id: 'uiux', label: 'UI/UX design', icon: Layers3 },
  { id: 'security', label: 'Cybersecurity', icon: ShieldCheck },
  { id: 'consultancy', label: 'IT consultancy', icon: MessageCircle },
] as const satisfies ReadonlyArray<{ id: PortfolioCategoryId; label: string; icon: typeof Globe2 }>;

type Period = 'recent' | 'history';

export function ProjectShowcase({ project, category }: { project: PortfolioItem; category: string }) {
  const sources = getPortfolioThumbSources(project);
  const [preview, setPreview] = useState(0);

  return (
    <article className={styles.project} aria-label={project.title}>
      <a className={styles.cover} href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} (opens in a new tab)`}>
        <div className={styles.screen}>
          {sources.length > 0 ? sources.map((src, index) => (
            <Image key={src} src={src} alt={index === preview ? `${project.title}, preview ${index + 1}` : ''}
              fill sizes="(max-width: 640px) 85vw, 430px" className={styles.previewImage}
              data-active={index === preview} aria-hidden={index !== preview} />
          )) : <span className={styles.noPreview}>Project preview</span>}
        </div>
        <div className={styles.coverFoot}>
          <span><span className={styles.coverLabel}>Curated by Genie Dev Studios</span><strong>{project.title}</strong></span>
          <span className={styles.openIcon}><ArrowUpRight size={23} aria-hidden /></span>
        </div>
      </a>
      <div className={styles.projectInfo}>
        <span className={styles.eyebrow}>{category} / Client project</span>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        {sources.length > 1 && (
          <div className={styles.previewPicker} role="group" aria-label={`Previews of ${project.title}`}>
            {sources.map((src, index) => (
              <button key={src} type="button" className={styles.previewButton} aria-pressed={preview === index}
                aria-label={`Show preview ${index + 1} of ${project.title}`} onClick={() => setPreview(index)}>
                <Image src={src} alt="" fill sizes="80px" />
              </button>
            ))}
          </div>
        )}
        <a className={styles.projectLink} href={project.href} target="_blank" rel="noopener noreferrer">
          Explore project <ArrowUpRight size={17} aria-hidden /><span className={styles.srOnly}> (opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}

export function FeaturedProjects({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? 'h1' : 'h2';
  const [category, setCategory] = useState<PortfolioCategoryId>('web');
  const [period, setPeriod] = useState<Period>('recent');
  const service = SERVICES.find(item => item.id === category)!;
  // Portfolio entries are maintained newest first; History contains all earlier work.
  const projects = PORTFOLIO_PROJECTS[category];
  const visible = period === 'recent' ? projects.slice(0, 1) : projects.slice(1);

  return (
    <section id="featured-projects" aria-labelledby="featured-projects-heading" className={`${styles.section} section-spacing`}>
      <div className="container">
        <header className={styles.header}>
          <div><span className={styles.eyebrow}>THE PROJECT LIBRARY</span><Heading id="featured-projects-heading">Ideas, out in the world.</Heading></div>
          <p>A closer look at the things we design and build.</p>
        </header>
        <div className={styles.services} role="group" aria-label="Filter projects by service">
          {SERVICES.map(({ id, label, icon: Icon }) => (
            <button type="button" key={id} aria-pressed={category === id} aria-controls="featured-project-results"
              className={styles.service} onClick={() => setCategory(id)}>
              <Icon size={20} strokeWidth={1.6} aria-hidden /><span>{label}</span>
            </button>
          ))}
        </div>
        <div className={styles.libraryBar}>
          <div className={styles.periods} role="group" aria-label="Project period">
            <button type="button" aria-pressed={period === 'recent'} aria-controls="featured-project-results" onClick={() => setPeriod('recent')}>Most recent</button>
            <button type="button" aria-pressed={period === 'history'} aria-controls="featured-project-results" onClick={() => setPeriod('history')}>History</button>
          </div>
          <div className={styles.libraryMeta}><Link href={`/portfolio/${category}`} className={styles.categoryLink}>Browse {service.label.toLowerCase()} <ArrowUpRight size={14} aria-hidden /></Link><span className={styles.count} role="status">{visible.length} {visible.length === 1 ? 'project' : 'projects'} / {service.label}</span></div>
        </div>
        <div id="featured-project-results" className={styles.results}>
          {visible.length ? visible.map(project => <ProjectShowcase key={project.id} project={project} category={service.label} />) : (
            <div className={styles.empty}>
              {period === 'history' ? <History size={32} strokeWidth={1.3} aria-hidden /> : <service.icon size={32} strokeWidth={1.3} aria-hidden />}
              <h3>{period === 'history' ? 'No older projects here yet.' : 'A little room for what’s next.'}</h3>
              <p>{period === 'history' ? `Older ${service.label.toLowerCase()} projects will appear here as the library grows.` : `No published projects in ${service.label.toLowerCase()} yet. Have something in mind? Let’s talk.`}</p>
              {period === 'history' && projects.length > 0 ? (
                <button type="button" className={styles.projectLink} onClick={() => setPeriod('recent')}>See the latest project <ArrowUpRight size={17} aria-hidden /></button>
              ) : <Link href="/quote" className={styles.projectLink}>Start a conversation <ArrowUpRight size={17} aria-hidden /></Link>}
            </div>
          )}
        </div>
        <div className={styles.closing}><span>Your idea could be next.</span><Link href="/quote">Let’s build it <ArrowUpRight size={17} aria-hidden /></Link></div>
      </div>
    </section>
  );
}
