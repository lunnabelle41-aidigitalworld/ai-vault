import { Inter } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from '@/app/components/Analytics/GoogleAnalytics';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { MockAuthProvider } from '@/contexts/MockAuthContext';
// Prevent Font Awesome from adding its CSS since we did it manually above
config.autoAddCss = false;

export const metadata = {
  title: {
    default: 'AI Tools Directory - Discover the Best AI Tools',
    template: '%s | AI Tools Directory'
  },
  description: 'Find and compare the best AI tools for your needs. Browse our comprehensive directory of artificial intelligence applications and services.',
  keywords: ['AI tools', 'artificial intelligence', 'machine learning', 'AI software', 'AI applications', 'AI directory'],
  authors: [{ name: 'AI Tools Directory Team' }],
  creator: 'AI Tools Directory',
  publisher: 'AI Tools Directory',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://aitoolsdirectory.com'
  },
  openGraph: {
    title: 'AI Tools Directory - Discover the Best AI Tools',
    description: 'Find and compare the best AI tools for your needs.',
    url: 'https://aitoolsdirectory.com',
    siteName: 'AI Tools Directory',
    images: [
      {
        url: 'https://aitoolsdirectory.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Tools Directory',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Directory - Discover the Best AI Tools',
    description: 'Find and compare the best AI tools for your needs.',
    images: ['https://aitoolsdirectory.com/twitter-image.jpg'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleAnalytics />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "AI Tools Directory",
            "url": "https://aitoolsdirectory.com",
            "logo": "https://aitoolsdirectory.com/logo.png",
            "sameAs": [
              "https://twitter.com/aitoolsdirectory",
              "https://www.linkedin.com/company/aitoolsdirectory",
              "https://www.facebook.com/aitoolsdirectory"
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "AI Tools Directory",
            "url": "https://aitoolsdirectory.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://aitoolsdirectory.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </head>
      <body className={inter.className}>
        <MockAuthProvider>
          {children}
        </MockAuthProvider>
      </body>
    </html>
  );
}
