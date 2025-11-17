import { Metadata, Viewport } from 'next';
import BlogClientLayout from './client-layout';
import { BASE_URL } from '@/lib/seo/utils';

// Generate dynamic metadata for better SEO
export const metadata: Metadata = {
  title: 'AI Tools Blog - Latest AI News, Trends & Insights',
  description: 'Expert analysis, tutorials, and the latest news about AI tools and technologies. Stay ahead with our comprehensive AI resources and guides.',
  keywords: [
    'AI blog', 'artificial intelligence news', 'machine learning blog', 
    'AI tools guide', 'AI technology updates', 'AI trends', 'AI tutorials',
    'AI for business', 'AI applications', 'AI research', 'AI developments'
  ],
  authors: [{ name: 'AI Tools Directory Team' }],
  creator: 'AI Tools Directory',
  publisher: 'AI Tools Directory',
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: '/blog',
    languages: {
      'en-US': '/en-US',
    },
  },
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
  openGraph: {
    title: 'AI Tools Blog - Latest AI News, Trends & Insights',
    description: 'Expert analysis, tutorials, and the latest news about AI tools and technologies. Stay ahead with our comprehensive AI resources and guides.',
    url: `${BASE_URL}/blog`,
    siteName: 'AI Tools Directory',
    images: [
      {
        url: `${BASE_URL}/images/og-blog.jpg`,
        width: 1200,
        height: 630,
        alt: 'AI Tools Blog - Latest AI News & Insights',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Blog - Latest AI News & Insights',
    description: 'Stay updated with the latest AI tools, news, and expert analysis. Your go-to resource for artificial intelligence trends and developments.',
    images: [`${BASE_URL}/images/twitter-blog.jpg`],
    site: '@aitoolsdirectory',
    creator: '@aitoolsdirectory',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  applicationName: 'AI Tools Blog',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'AI Tools Blog',
  },
  formatDetection: {
    telephone: false,
  },
};

// Configure viewport settings
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// Generate structured data for better search engine understanding
const generateStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'headline': 'AI Tools Blog - Latest AI News, Trends & Insights',
    'description': 'Expert analysis, tutorials, and the latest news about AI tools and technologies.',
    'url': `${BASE_URL}/blog`,
    'image': `${BASE_URL}/images/og-blog.jpg`,
    'publisher': {
      '@type': 'Organization',
      'name': 'AI Tools Directory',
      'logo': {
        '@type': 'ImageObject',
        'url': `${BASE_URL}/logo.png`,
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog`,
    },
  };
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = generateStructuredData();
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BlogClientLayout>{children}</BlogClientLayout>
    </>
  );
}