import type { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { PortfolioExplorer } from '@/components/sections/PortfolioExplorer';
import styles from '../services/services.module.css';
import hero from './portfolio.module.css';

export const metadata: Metadata = {
  title: 'Portfolio | GENIE | DEV',
  description:
    'Featured digital work—from polished websites to complex systems—showing how we turn concepts into reliable solutions and lasting partnerships.',
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.main}>
          <header className={hero.hero}>
            <h1 className={hero.title}>Portfolio</h1>
            <p className={hero.lead}>
              Discover our featured portfolio, highlighting key digital transformations that drove business growth and
              fostered strong partnerships. From polished websites to complex systems, this collection demonstrates our
              versatility and dedication to quality. Explore our work to see how we turn concepts into digital
              solutions.
            </p>
          </header>
          <PortfolioExplorer />
        </div>
      </main>
      <Footer />
    </>
  );
}
