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
  /** Multiple previews — rotate on a timer in cards and the home featured strip */
  thumbSrcs?: string[];
};

/** Interval for cycling `thumbSrcs` in UI */
export const PORTFOLIO_IMAGE_ROTATE_MS = 5000;

export function getPortfolioThumbSources(item: PortfolioItem): string[] {
  if (item.thumbSrcs?.length) return item.thumbSrcs;
  if (item.thumbSrc) return [item.thumbSrc];
  return [];
}

/** Shared previews for JOEY The brand (web + UI/UX listings) */
const JOEY_THE_BRAND_THUMB_SRCS = [
  '/joey-portfolio.png',
  '/joey-app.png',
  '/appsnap.png',
  '/admin.png',
] as const;

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
      'Custom e-commerce storefronts, SaaS web apps, and internal operations dashboards built for speed and scale.',
  },
  {
    id: 'uiux',
    title: 'UI/UX Designs',
    description:
      'Conversion-focused product interfaces, interactive Figma prototypes, and multi-surface design systems.',
  },
  {
    id: 'mobile',
    title: 'Mobile Apps Development',
    description:
      'iOS and Android applications with native navigation, real-time sync, and offline-ready architecture.',
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    description:
      'API hardening, authentication audits, and encrypted transaction flows for production systems.',
  },
  {
    id: 'consultancy',
    title: 'IT Consultancy',
    description:
      'Technical discovery, system architecture design, and payment/cloud integration strategy.',
  },
];

export const PORTFOLIO_PROJECTS: Record<PortfolioCategoryId, PortfolioItem[]> = {
  web: [
    {
      id: 'web-joey-brand',
      title: 'JOEY The brand',
      summary:
        'Full-stack e-commerce platform and custom admin suite for JOEY The Brand. Engineered with a fast storefront, streamlined checkout, real-time inventory management, and order fulfillment tooling.',
      href: 'https://joeythebrand.com',
      thumbSrcs: [...JOEY_THE_BRAND_THUMB_SRCS],
    },
  ],
  uiux: [
    {
      id: 'ux-joey-brand',
      title: 'JOEY The brand',
      summary:
        'End-to-end product design system for JOEY The Brand, spanning mobile-first shopping flows, editorial lookbooks, checkout UX, and back-office operations screens.',
      href: 'https://joeythebrand.com',
      thumbSrcs: [...JOEY_THE_BRAND_THUMB_SRCS],
    },
  ],
  mobile: [],
  security: [],
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
