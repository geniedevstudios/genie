import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Bodoni_Moda, Jost, Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { PageBackground } from '@/components/common/PageBackground';
import { Preloader } from '@/components/common/Preloader';
import { PageTransition } from '@/components/common/PageTransition';
import { ClientProvider } from '@/context/ClientProvider';
import { GENIE_IMAGE_SRC } from '@/lib/genieAsset';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const bodoniModa = Bodoni_Moda({
  variable: '--font-logo',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const jost = Jost({
  variable: '--font-label',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const playfair = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://geniedevstudios.com'),
  title: 'Home | Genie Dev Studios',
  applicationName: 'Genie Dev Studios',
  appleWebApp: {
    title: 'Genie Dev Studios',
    statusBarStyle: 'default',
    capable: true,
  },
  description: 'Software design and engineering studio in Accra, Ghana. We build custom web platforms, mobile apps, payment systems, and secure cloud backends.',
  keywords: ['Genie Dev Studios', 'Software Studio Ghana', 'Web App Development', 'Mobile App Development', 'Paystack Integration', 'Next.js Studio', 'UI/UX Design Accra'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Home | Genie Dev Studios',
    siteName: 'Genie Dev Studios',
    description: 'Custom web platforms, mobile apps, and revenue-ready systems built in Accra, Ghana.',
    url: 'https://geniedevstudios.com',
    locale: 'en_GH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home | Genie Dev Studios',
    description: 'Custom web platforms, mobile apps, and revenue-ready systems built in Accra, Ghana.',
  },
  icons: {
    icon: [{ url: GENIE_IMAGE_SRC, type: 'image/png' }],
    apple: [{ url: GENIE_IMAGE_SRC, type: 'image/png' }],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://geniedevstudios.com/#website',
      url: 'https://geniedevstudios.com',
      name: 'Genie Dev Studios',
      alternateName: ['Genie | dev studios', 'Genie Dev'],
      description:
        'Software design and engineering studio in Accra, Ghana. We build custom web platforms, mobile apps, payment systems, and secure cloud backends.',
    },
    {
      '@type': 'Organization',
      '@id': 'https://geniedevstudios.com/#organization',
      name: 'Genie Dev Studios',
      url: 'https://geniedevstudios.com',
      logo: 'https://geniedevstudios.com/genie-logo.png',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Accra',
        addressCountry: 'GH',
      },
      sameAs: [
        'https://www.instagram.com/thesarkodieemil/',
        'https://www.linkedin.com/in/emil-sarkodie-7b3262319/',
        'https://x.com/yourfavgenie',
        'https://github.com/heavyhitter69',
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} ${bodoniModa.variable} ${jost.variable} ${playfair.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ClientProvider>
          <Preloader />
          <PageTransition />
          <div className="app-shell">
            <PageBackground />
            <div className="app-shell-main">{children}</div>
          </div>
        </ClientProvider>
      </body>
    </html>
  );
}
