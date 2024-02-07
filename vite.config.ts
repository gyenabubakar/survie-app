import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
  plugins: [enhancedImages(), sveltekit()],
  optimizeDeps: {
    exclude: ['phosphor-svelte'],
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
