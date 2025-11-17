import { Metadata } from 'next';
import { tools } from '../../data/tools';
import { categories } from '../../data/categories';

// Base URL for the site
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aitoolsdirectory.com';

// Default metadata for the site
export const DEFAULT_METADATA: Metadata = {
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
    canonical: BASE_URL
  }
};

// Generate metadata for tool pages
export function generateToolMetadata(toolName: string, toolData: any): Metadata {
  const title = `${toolName} - AI Tool Review & Comparison`;
  const description = toolData.description.substring(0, 160);
  
  return {
    title,
    description,
    keywords: [toolName, toolData.category, toolData.subcategory, ...toolData.tags],
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/ai-tools/${encodeURIComponent(toolData.category)}/${encodeURIComponent(toolData.subcategory)}/${encodeURIComponent(toolName)}`,
      siteName: 'AI Tools Directory',
      images: [
        {
          url: toolData.favicon || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${toolName} - AI Tool`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [toolData.favicon || '/twitter-image.jpg'],
    },
  };
}

// Generate metadata for category pages
export function generateCategoryMetadata(categoryName: string): Metadata {
  const title = `${categoryName} - AI Tools Directory`;
  const description = `Discover the best ${categoryName} AI tools. Browse our comprehensive directory of ${categoryName} applications and services.`;
  
  return {
    title,
    description,
    keywords: [categoryName, 'AI tools', 'artificial intelligence'],
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/ai-tools/${encodeURIComponent(categoryName)}`,
      siteName: 'AI Tools Directory',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: categoryName,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/twitter-image.jpg'],
    },
  };
}

// Generate metadata for subcategory pages
export function generateSubcategoryMetadata(categoryName: string, subcategoryName: string): Metadata {
  const title = `${subcategoryName} - ${categoryName} | AI Tools Directory`;
  const description = `Discover the best ${subcategoryName} tools in ${categoryName}. Browse our comprehensive directory of ${subcategoryName} AI applications.`;
  
  return {
    title,
    description,
    keywords: [subcategoryName, categoryName, 'AI tools', 'artificial intelligence'],
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/ai-tools/${encodeURIComponent(categoryName)}/${encodeURIComponent(subcategoryName)}`,
      siteName: 'AI Tools Directory',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${subcategoryName} - ${categoryName}`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/twitter-image.jpg'],
    },
  };
}

// Generate metadata for blog posts
export function generateBlogMetadata(title: string, excerpt: string, slug: string, imageUrl?: string): Metadata {
  const fullTitle = `${title} | AI Tools Directory Blog`;
  const description = excerpt.substring(0, 160);
  
  return {
    title: fullTitle,
    description,
    keywords: [title, 'AI', 'artificial intelligence', 'machine learning', 'blog'],
    openGraph: {
      title: fullTitle,
      description,
      url: `${BASE_URL}/blog/${slug}`,
      siteName: 'AI Tools Directory Blog',
      images: [
        {
          url: imageUrl || '/blog/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl || '/blog/twitter-image.jpg'],
    },
  };
}

// Generate JSON-LD structured data for tools
export function generateToolJsonLd(toolData: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': toolData.name,
    'description': toolData.description,
    'url': toolData.url,
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'Web',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
      'category': toolData.pricing
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': toolData.rating,
      'ratingCount': Math.floor(Math.random() * 100) + 10
    }
  };
}

// Generate JSON-LD structured data for organization
export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'AI Tools Directory',
    'url': BASE_URL,
    'logo': `${BASE_URL}/logo.png`,
    'sameAs': [
      'https://twitter.com/aitoolsdirectory',
      'https://www.linkedin.com/company/aitoolsdirectory',
      'https://www.facebook.com/aitoolsdirectory'
    ]
  };
}

// Generate JSON-LD structured data for website
export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'AI Tools Directory',
    'url': BASE_URL,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${BASE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

// Generate canonical URL
export function generateCanonicalUrl(path: string): string {
  return `${BASE_URL}${path}`;
}

// Generate hreflang tags
export function generateHreflangUrls(path: string): Record<string, string> {
  const url = `${BASE_URL}${path}`;
  return {
    'en-US': url,
    'x-default': url
  };
}