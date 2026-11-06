import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import { pageEntry, sitePages } from './src/data/pages.ts'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [vue()],
  // The SSR build (`vite build --ssr src/entry-server.ts`) only feeds scripts/prerender.ts; the
  // browser build has one HTML entry per page.
  build: isSsrBuild ? {} : {
    rolldownOptions: {
      input: Object.fromEntries(sitePages.map(pageEntry)
        .map(path => [path, fileURLToPath(new URL(path, import.meta.url))])),
    },
  },
}))
