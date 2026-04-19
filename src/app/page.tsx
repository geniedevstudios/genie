import React from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { HomeContactSection } from '@/components/sections/HomeContactSection';
import { Footer } from '@/components/common/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Projects />
      <WhyChooseUs />
      <FeaturedProjects />
      <HomeContactSection />
      <Footer />
    </main>
  );
}
