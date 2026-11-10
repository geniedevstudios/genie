import type { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';

export const metadata: Metadata = {
  title: 'Portfolio | Genie Dev Studios',
  description:
    'Selected client work by Genie Dev Studios, including the JOEY The Brand storefront and admin.',
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Portfolio | Genie Dev Studios',
    description:
      'Selected client work by Genie Dev Studios, including the JOEY The Brand storefront and admin.',
  },
};

export default function PortfolioPage() {
  return <><Navbar /><main><FeaturedProjects standalone /></main><Footer /></>;
}
