import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  // Inject cjs and esm shims:https://tsup.egoist.dev/#inject-cjs-and-esm-shims
  shims: true,
  // splitting: true,
  // sourcemap: true,
  // clean: true,
})
