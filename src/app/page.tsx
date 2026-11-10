import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { HomeContactSection } from '@/components/sections/HomeContactSection';
import { Footer } from '@/components/common/Footer';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.homeMain} data-theme="dark">
      <Hero />
      <Projects />
      <FeaturedProjects />
      <WhyChooseUs />
      <HomeContactSection />
      <Footer />
    </main>
  );
}
