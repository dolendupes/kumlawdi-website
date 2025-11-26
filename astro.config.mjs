import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// Build configuration for Vercel:
// - Hybrid output mode: static pages + serverless API routes
// - Custom domain (kumlawdifoundation.com) uses base: '/'
// - API routes will be handled by Vercel serverless functions

export default defineConfig({
  site: 'https://kumlawdifoundation.com',
  base: '/', // Always use root base for custom domain
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    vercel()
  ],
  output: 'hybrid', // Hybrid mode: static pages + serverless functions
  adapter: vercel(),
  build: {
    format: 'directory'
  }
});

