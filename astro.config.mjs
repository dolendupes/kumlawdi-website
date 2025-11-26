import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// Build configuration:
// - Custom domain (kumlawdifoundation.com) uses base: '/' 
// - GitHub Pages subdomain (dolendupes.github.io/kumlawdi-website) also works with base: '/'
//   because GitHub Pages will serve the custom domain at root, and the subdomain will
//   need path adjustments handled at runtime if needed
// - Local dev uses base: '/' (default)

export default defineConfig({
  site: 'https://kumlawdifoundation.com',
  base: '/', // Always use root base for custom domain
  integrations: [
    mdx(),
    sitemap(),
    tailwind()
  ],
  output: 'static',
  build: {
    format: 'directory'
  }
});

