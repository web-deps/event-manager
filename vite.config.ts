import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/main.js'),
      name: 'event-manager',
      fileName: (format) => `event-manager.${format}.js`
    }
  }
});
