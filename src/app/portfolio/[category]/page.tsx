import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import {
  type PortfolioCategoryId,
  getPortfolioCategory,
  isPortfolioCategoryId,
  PORTFOLIO_CATEGORY_IDS,
  PORTFOLIO_PROJECTS,
} from '@/lib/portfolioData';
import { PortfolioProjectCard } from '@/components/portfolio/PortfolioProjectCard';
import explorerStyles from '@/components/sections/PortfolioExplorer.module.css';
import styles from './category.module.css';

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return PORTFOLIO_CATEGORY_IDS.map(category => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  if (!isPortfolioCategoryId(slug)) {
    return { title: 'Portfolio | GENIE | DEV' };
  }
  const cat = getPortfolioCategory(slug);
  return {
    title: `${cat?.title ?? 'Portfolio'} | GENIE | DEV`,
    description: cat?.description ?? 'Explore work by specialty.',
  };
}

export default async function PortfolioCategoryPage({ params }: Props) {
  const { category: slug } = await params;

  if (!isPortfolioCategoryId(slug)) {
    notFound();
  }

  const category = getPortfolioCategory(slug);
  if (!category) {
    notFound();
  }

  const items = PORTFOLIO_PROJECTS[slug as PortfolioCategoryId];

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.main}>
          <div className={styles.backRow}>
            <Link
              href="/portfolio#portfolio-showcase"
              className={styles.backLink}
              prefetch
              aria-label="Back to portfolio"
            >
              <span className={styles.backChevronBtn} aria-hidden>
                <ChevronLeft size={18} strokeWidth={2} />
              </span>
              <span className={styles.backText}>Back</span>
            </Link>
          </div>

          <header className={styles.intro}>
            <p className={styles.introLabel}>Portfolio</p>
            <h1 className={styles.title}>{category.title}</h1>
            <p className={styles.lead}>{category.description}</p>
          </header>

          <section className={styles.gridSection} aria-label="Projects in this category">
            {items.length === 0 ? (
              <div className={explorerStyles.emptyStateWrap}>
                <p className={explorerStyles.emptyState}>Projects for this category are on the way.</p>
              </div>
            ) : (
              <div className={styles.projectGrid}>
                {items.map((project, index) => (
                  <PortfolioProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    TitleTag="h2"
                    variant="page"
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
