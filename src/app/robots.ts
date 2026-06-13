import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fithire.pk';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/thank-you', // Do not index the hiring thank-you page
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
