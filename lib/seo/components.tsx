'use client';

import React from 'react';
import Head from 'next/head';

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  canonical?: string;
  hreflang?: Record<string, string>;
  jsonLd?: any;
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  canonical,
  hreflang,
  jsonLd
}) => {
  const siteTitle = title ? `${title} | AI Tools Directory` : 'AI Tools Directory - Discover the Best AI Tools';
  const siteDescription = description || 'Find and compare the best AI tools for your needs. Browse our comprehensive directory of artificial intelligence applications and services.';
  const siteImage = image || '/og-image.jpg';
  const siteUrl = url || 'https://aitoolsdirectory.com';
  
  const jsonLdData = jsonLd ? JSON.stringify(jsonLd) : null;

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content={type} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
      
      {/* Canonical and hreflang */}
      {canonical && <link rel="canonical" href={canonical} />}
      {hreflang && Object.entries(hreflang).map(([lang, href]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={href} />
      ))}
      
      {/* JSON-LD */}
      {jsonLdData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdData }}
        />
      )}
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Theme color */}
      <meta name="theme-color" content="#4f46e5" />
    </Head>
  );
};

export default Seo;