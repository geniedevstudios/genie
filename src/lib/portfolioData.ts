export type PortfolioCategoryId = 'web' | 'uiux' | 'mobile' | 'security' | 'consultancy';

export type PortfolioCategory = {
  id: PortfolioCategoryId;
  title: string;
  description: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  summary: string;
  href: string;
  /** Served from `public/` — URL path is `/filename.ext` (not `/public/...`) */
  thumbSrc?: string;
};

export const PORTFOLIO_CATEGORY_IDS: PortfolioCategoryId[] = [
  'web',
  'uiux',
  'mobile',
  'security',
  'consultancy',
];

export function isPortfolioCategoryId(slug: string): slug is PortfolioCategoryId {
  return PORTFOLIO_CATEGORY_IDS.includes(slug as PortfolioCategoryId);
}

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    id: 'web',
    title: 'Website and Web Apps Development',
    description:
      'Full-stack builds, dashboards, and customer-facing experiences that stay fast as you grow.',
  },
  {
    id: 'uiux',
    title: 'UI/UX Designs',
    description:
      'Research-backed interfaces and design systems that clarify flows and lift conversion.',
  },
  {
    id: 'mobile',
    title: 'Mobile Apps Development',
    description:
      'Native-quality experiences for iOS and Android—offline-aware where the job demands it.',
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    description:
      'Hardening, reviews, and architecture so your systems stay resilient under real pressure.',
  },
  {
    id: 'consultancy',
    title: 'IT Consultancy',
    description:
      'Practical roadmaps, vendor-neutral guidance, and execution support across your stack.',
  },
];

export const PORTFOLIO_PROJECTS: Record<PortfolioCategoryId, PortfolioItem[]> = {
  web: [
    {
      id: 'web-joey-portfolio',
      title: 'Joey Portfolio',
      summary: 'Marketing portfolio site—fast load, responsive layout, and a polished presentation layer.',
      href: '/contact',
      thumbSrc: '/joey-portfolio.png',
    },
    {
      id: 'web-joey-app',
      title: 'Joey App',
      summary: 'Product web experience with dashboards and flows tuned for clarity and daily use.',
      href: '/contact',
      thumbSrc: '/joey-app.png',
    },
  ],
  uiux: [
    {
      id: 'ux-appsnap',
      title: 'AppSnap',
      summary: 'UI exploration and snapshot-ready layouts for reviews and stakeholder alignment.',
      href: '/contact',
      thumbSrc: '/appsnap.png',
    },
  ],
  mobile: [],
  security: [
    {
      id: 'sec-admin',
      title: 'Admin console',
      summary: 'Operational dashboard patterns with visibility into users, jobs, and security posture.',
      href: '/contact',
      thumbSrc: '/admin.png',
    },
  ],
  consultancy: [],
};

export function getPortfolioCategory(id: PortfolioCategoryId): PortfolioCategory | undefined {
  return PORTFOLIO_CATEGORIES.find(c => c.id === id);
}

/** Aligns with globals: violet / slate / ink */
export const PORTFOLIO_THUMB_GRADIENTS = [
  'linear-gradient(135deg, rgba(95, 1, 251, 0.55) 0%, rgba(81, 74, 133, 0.45) 100%)',
  'linear-gradient(135deg, rgba(81, 74, 133, 0.5) 0%, rgba(11, 13, 27, 0.55) 100%)',
  'linear-gradient(135deg, rgba(95, 1, 251, 0.4) 0%, rgba(11, 13, 27, 0.5) 100%)',
  'linear-gradient(135deg, rgba(120, 90, 220, 0.4) 0%, rgba(95, 1, 251, 0.45) 100%)',
];
