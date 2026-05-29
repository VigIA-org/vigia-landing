// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://vigia.dev',
  vite: {
    plugins: [
      // @ts-expect-error - Type mismatch between Astro's internal Vite and @tailwindcss/vite
      tailwindcss(),
    ],
  },
});
