import { defineConfig } from 'vitest/config'

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  test: {
    setupFiles: './vitest.setup.js',
    environment: 'jsdom',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
  },
})
