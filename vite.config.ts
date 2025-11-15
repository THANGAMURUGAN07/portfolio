import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// If deploying to GitHub Pages on a project site (not username.github.io),
// set the base path to '/<repo-name>/' so asset links resolve correctly.
// Adjust 'portfolio' below to match the repository name.
const base = process.env.GITHUB_ACTIONS ? '/portfolio/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
