import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // public/ is already the default; explicit for clarity
  publicDir: 'public',
});
