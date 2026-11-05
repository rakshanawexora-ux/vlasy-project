import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactButtons } from '@/components/global/ContactButtons';
import { SmoothScrollProvider } from '@/components/global/SmoothScrollProvider';
import { EnquiryPopup } from '@/components/global/EnquiryPopup';
import { PageTransition } from '@/components/global/PageTransition';
import { Schema } from '@/components/ui/Primitives';
import { SITE_CONFIG } from '@/lib/constants';
import '@/styles/base.css';
import '@/styles/brand.css';
import '@/styles/themes/dark.css';
import '@/styles/themes/light.css';
import '@/styles/readability.css';
import '@/styles/salon.css';
import '@/styles/service-discovery.css';
import '@/styles/enquiry.css';
import '@/styles/media.css';
const serif = localFont({
  src: [
    { path: '../public/fonts/serif.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/serif-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
});
const sans = localFont({
  src: [
    { path: '../public/fonts/sans.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/sans-medium.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
});
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: { default: SITE_CONFIG.name, template: '%s | VLASY' },
  description: 'Personalised hair, beauty and grooming in Chennai.',
  applicationName: SITE_CONFIG.name,
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${serif.variable} ${sans.variable}`}
    >
      <head>
        <meta name="theme-color" content="#f5f1e9" suppressHydrationWarning />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('vlasy-theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light';}catch{document.documentElement.dataset.theme='light';}`,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SmoothScrollProvider />
        <Header />
        <main id="main-content">
          <PageTransition>{children}</PageTransition>
        </main>
        <Schema
          data={{
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': `${SITE_CONFIG.url}/#organization`,
                name: SITE_CONFIG.name,
                url: SITE_CONFIG.url,
                logo: new URL('/logo/vlasy-transparent.png', SITE_CONFIG.url).toString(),
                areaServed: 'Chennai',
                sameAs: [SITE_CONFIG.instagram, SITE_CONFIG.facebook].filter(Boolean),
              },
              {
                '@type': 'WebSite',
                '@id': `${SITE_CONFIG.url}/#website`,
                name: SITE_CONFIG.name,
                url: SITE_CONFIG.url,
                inLanguage: 'en-IN',
                publisher: { '@id': `${SITE_CONFIG.url}/#organization` },
              },
            ],
          }}
        />
        <Footer />
        <ContactButtons />
        <EnquiryPopup />
      </body>
    </html>
  );
}
