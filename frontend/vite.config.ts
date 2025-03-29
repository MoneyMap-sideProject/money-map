import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
  server: {
    port: 8080,
  },
  resolve: {
    alias: [
      { find: '@/assets', replacement: '/assets' },
      { find: '@', replacement: '/src' },
    ],
  },
});
