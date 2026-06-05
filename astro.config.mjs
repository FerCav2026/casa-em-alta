import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [
    tailwind(),
    sitemap(),
  ],
  site: 'https://www.casaemalta.com.br',
  redirects: {
    '/posts/[slug]': '/[slug]',
  },
});
