import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      '#lib': 'src/lib',
      '#assets': 'src/assets',
      '#components': 'src/components',
      '#features': 'src/features',
      shadcn: 'src/_shadcn',
    },
  },
};

export default config;
