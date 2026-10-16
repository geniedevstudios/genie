import type { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { PortfolioExplorer } from '@/components/sections/PortfolioExplorer';
import styles from '../services/services.module.css';
import hero from './portfolio.module.css';

export const metadata: Metadata = {
  title: 'Portfolio | Genie Dev Studios',
  description:
    'Selected web platforms, e-commerce systems, product interfaces, and custom software built by Genie Dev Studios.',
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className={`${styles.page} home-main-surface`} data-theme="light">
        <div className={styles.main}>
          <header className={hero.hero}>
            <h1 className={hero.title}>Portfolio</h1>
            <p className={hero.lead}>
              Selected platforms, storefronts, and product interfaces engineered by Genie Dev Studios.
              Browse by discipline below to inspect live builds, design systems, and admin workflows in production.
            </p>
          </header>
          <PortfolioExplorer />
        </div>
      </main>
      <Footer />
    </>
  );
}
