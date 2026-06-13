import { MetadataRoute } from 'next';
import { getAllProfessionals } from '@/lib/professionals';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fithire.pk';

  // Core pages
  const routes = ['', '/browse', '/hire'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic professional profiles
  const professionals = getAllProfessionals();
  const professionalRoutes = professionals.map((p) => ({
    url: `${baseUrl}/professionals/${p.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...professionalRoutes];
}
