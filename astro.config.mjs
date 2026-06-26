import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date('2026-06-16'),
    }),
  ],
  site: 'https://www.casaemalta.com.br',
  redirects: {
    '/posts/[slug]': '/[slug]',
  },
});
