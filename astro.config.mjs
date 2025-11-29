import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// Build configuration for Vercel:
// - Server output mode: enables API routes + static pages
// - Custom domain (kumlawdifoundation.com) uses base: '/'
// - API routes will be handled by Vercel serverless functions

export default defineConfig({
  site: 'https://kumlawdifoundation.com',
  base: '/', // Always use root base for custom domain
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
  ],
  output: 'server', // Server mode: enables API routes (pages are still pre-rendered when possible)
  adapter: vercel(),
  build: {
    format: 'directory'
  }
});

