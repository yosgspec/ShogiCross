import { defineConfig } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  transform: {
    '\.js$': 'vite:default-transform',
  },
  // Vitest configuration options
});