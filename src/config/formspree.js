// Formspree form endpoint configuration
// Environment variables can override these defaults:
// PUBLIC_FORMSPREE_CONTACT_DEV=<your-dev-form-id>
// PUBLIC_FORMSPREE_CONTACT_PROD=<your-prod-form-id>

// Detect environment: development mode (localhost) or production (github.io or real domain)
// In Astro, MODE is 'development' when running `astro dev`, and 'production' when building
const isDev = import.meta.env.MODE === 'development' || import.meta.env.DEV;

export const formspreeUrls = {
  contact: isDev
    ? `https://formspree.io/f/${import.meta.env.PUBLIC_FORMSPREE_CONTACT_DEV || 'mblebdga'}`
    : `https://formspree.io/f/${import.meta.env.PUBLIC_FORMSPREE_CONTACT_PROD || 'xnnyrjed'}`,
};

