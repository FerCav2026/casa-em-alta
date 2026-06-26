/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#fff7ed',
          100: '#ffedd5',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
        dark: '#0f172a',
      },
      fontFamily: {
        sans: ['Inter', 'Inter Fallback', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
