import { MetadataRoute } from 'next';
import { tools } from '../data/tools';
import { categories } from '../data/categories';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aitoolsdirectory.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes
  const staticRoutes = ['', '/about', '/contact', '/privacy', '/terms'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Category routes
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/ai-tools/${encodeURIComponent(category.name)}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Subcategory routes
  const subcategoryRoutes: MetadataRoute.Sitemap = [];
  categories.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      subcategoryRoutes.push({
        url: `${baseUrl}/ai-tools/${encodeURIComponent(category.name)}/${encodeURIComponent(subcategory.name)}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      });
    });
  });

  // Tool routes
  const toolRoutes = tools.map((tool) => ({
    url: `${baseUrl}/ai-tools/${encodeURIComponent(tool.category)}/${encodeURIComponent(tool.subcategory)}/${encodeURIComponent(tool.name.toLowerCase().replace(/\s+/g, '-'))}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog routes (if you have a blog data source)
  const blogRoutes: MetadataRoute.Sitemap = [
    // Add blog routes here when you have them
  ];

  return [...staticRoutes, ...categoryRoutes, ...subcategoryRoutes, ...toolRoutes, ...blogRoutes];
}
