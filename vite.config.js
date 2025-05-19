import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// all this just to avoid eslint from redlining dirname
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // set @ as the default path
 resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base:process.env.VITE_BASE_PATH || "/Quote-Library"

})
