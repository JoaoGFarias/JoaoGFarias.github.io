/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f7f7f8',
          100: '#eeeef1',
          200: '#d4d5dc',
          300: '#a9abba',
          400: '#7e8195',
          500: '#5a5d72',
          600: '#454858',
          700: '#363846',
          800: '#252834',
          900: '#1a1c25',
          950: '#101118',
        },
        accent: {
          DEFAULT: '#ff5d5d',
          dark: '#e54545',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.ink.700'),
            '--tw-prose-headings': theme('colors.ink.900'),
            '--tw-prose-links': theme('colors.accent.DEFAULT'),
            '--tw-prose-bold': theme('colors.ink.900'),
            '--tw-prose-code': theme('colors.ink.900'),
            '--tw-prose-pre-bg': theme('colors.ink.950'),
            '--tw-prose-quotes': theme('colors.ink.700'),
            '--tw-prose-quote-borders': theme('colors.accent.DEFAULT'),
            maxWidth: '70ch',
            a: { textDecoration: 'underline', textUnderlineOffset: '3px' },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.ink.200'),
            '--tw-prose-headings': theme('colors.ink.50'),
            '--tw-prose-links': theme('colors.accent.DEFAULT'),
            '--tw-prose-bold': theme('colors.ink.50'),
            '--tw-prose-code': theme('colors.ink.100'),
            '--tw-prose-quotes': theme('colors.ink.200'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
