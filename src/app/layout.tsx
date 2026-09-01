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
  title: 'Genie │ dev - HOME',
  // Using a special unicode vertical line '│' instead of standard '|' so iOS doesn't split and truncate the name
  applicationName: 'Genie │ dev',
  appleWebApp: {
    title: 'Genie │ dev',
    statusBarStyle: 'default',
    capable: true,
  },
  description: 'Expert Full-Stack Engineer and Geophysics student based in Ghana building revenue-generating systems, payment integrations, and real-time applications.',
  keywords: ['Full-Stack Developer', 'Ghana Engineering', 'Paystack Integration', 'React Developer', 'Django', 'Geophysics', 'Systems Design'],
  openGraph: {
    title: 'Genie │ dev - HOME',
    siteName: 'Genie │ dev',
    description: 'Building high-performance systems that scale and handle payments.',
    type: 'website',
  },
  icons: {
    icon: [{ url: GENIE_IMAGE_SRC, type: 'image/png' }],
    apple: [{ url: GENIE_IMAGE_SRC, type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${bodoniModa.variable} ${jost.variable} ${playfair.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (sessionStorage.getItem('genie_preloader_played')) {
                  document.documentElement.classList.add('hide-preloader');
                }
              } catch (e) {}
            `,
          }}
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
