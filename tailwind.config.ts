/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  important: true,
  theme: {
    screens: {
      xs: '600px',
      sm: '760px',
      md: '960px',
      lg: '1280px',
      xl: '1440px',
    },
    extend: {
      colors: {
        gray: {
          0: 'var(--gray-0)',
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)',
        },
      },
    },
  },
  plugins: [require('tailwindcss-primeui')],
}

export default config
