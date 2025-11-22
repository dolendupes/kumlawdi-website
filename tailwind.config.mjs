/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        // Customize these colors for your brand
        'brand-primary': '#1C1C1C',
        'brand-secondary': '#BC002D',
        'brand-light': '#F6F8FA',
        'brand-gray': '#6C6C6C'
      },
      fontFamily: {
        'inter': ['Inter Tight', 'Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}

