export type PortfolioCategoryId = 'web' | 'uiux' | 'mobile' | 'software' | 'security' | 'consultancy';

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
  /** Multiple previews — selectable on the homepage, rotating in portfolio cards */
  thumbSrcs?: string[];
};

/** Interval for cycling `thumbSrcs` in UI */
export const PORTFOLIO_IMAGE_ROTATE_MS = 5000;

export function getPortfolioThumbSources(item: PortfolioItem): string[] {
  if (item.thumbSrcs?.length) return item.thumbSrcs;
  if (item.thumbSrc) return [item.thumbSrc];
  return [];
}

/** Shared previews for JOEY The Brand (web + UI/UX listings) */
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
  'software',
  'security',
  'consultancy',
];

export function isPortfolioCategoryId(slug: string): slug is PortfolioCategoryId {
  return PORTFOLIO_CATEGORY_IDS.includes(slug as PortfolioCategoryId);
}

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    id: 'web',
    title: 'Web development',
    description:
      'Websites, web applications, internal tools, and online shops designed around how an organization works.',
  },
  {
    id: 'uiux',
    title: 'UI/UX design',
    description:
      'Interfaces and prototypes for the people who will use the product.',
  },
  {
    id: 'mobile',
    title: 'Mobile apps',
    description:
      'Mobile apps for tasks that need to happen on a phone.',
  },
  {
    id: 'software',
    title: 'Software development',
    description: 'Custom software and business systems built around the way your team works.',
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    description:
      'Reviews of access, data, and how systems connect.',
  },
  {
    id: 'consultancy',
    title: 'IT consultancy',
    description:
      'Help choosing an approach, a scope, and a price before a build starts.',
  },
];

/** Keep each category newest first: the homepage features the first entry and archives the rest. */
export const PORTFOLIO_PROJECTS: Record<PortfolioCategoryId, PortfolioItem[]> = {
  web: [
    {
      id: 'web-joey-brand',
      title: 'JOEY The Brand',
      summary:
        'Client work for JOEY The Brand: a custom storefront and admin for products, checkout, inventory, orders, and fulfillment.',
      href: 'https://joeythebrand.com',
      thumbSrcs: [...JOEY_THE_BRAND_THUMB_SRCS],
    },
  ],
  uiux: [
    {
      id: 'ux-joey-brand',
      title: 'JOEY The Brand',
      summary:
        'Interface design for JOEY The Brand, covering the shop screens and the back-office screens used to run it.',
      href: 'https://joeythebrand.com',
      thumbSrcs: [...JOEY_THE_BRAND_THUMB_SRCS],
    },
  ],
  mobile: [],
  software: [],
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
