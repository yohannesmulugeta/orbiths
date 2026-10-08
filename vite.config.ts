import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'app',
  publicDir: '../public',
  build: { outDir: '../dist', emptyOutDir: true },
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? '/orbiths/' : '/',
});
