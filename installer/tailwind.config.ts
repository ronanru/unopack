import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'index.html'],
  theme: {
    container: {
      center: true
    },
    fontFamily: {
      sans: ['Inter', ...fontFamily.sans]
    },
    extend: {}
  }
} satisfies Config;
