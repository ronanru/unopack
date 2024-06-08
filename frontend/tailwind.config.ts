import TailwindScrollbar from 'tailwind-scrollbar';
import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'index.html'],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
      },
    },
    fontFamily: {
      sans: ['Inter Variable', ...fontFamily.sans],
    },
    extend: {},
  },
  plugins: [TailwindScrollbar],
} satisfies Config;
