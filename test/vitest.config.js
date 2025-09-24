import { defineConfig } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  test: {
    alias: {
      '@': path.resolve(__dirname, '..', 'src', 'ShogiCross')
    },
    globals: true,
    // setup.js lives in the test/ folder; keep path relative so running
    // `cd test && npx vitest` works correctly.
    setupFiles: ['./setup.js'],
    environment: 'happy-dom',
    // include patterns are relative to the test folder when run there
    include: ['core/**/*.test.js', 'data/**/*.test.js']
  }
});
