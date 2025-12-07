import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'EasyChat',
      formats: ['es', 'cjs'],
      fileName: (format) => `easy-chat.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react-icons', /^react-icons\/.*/],
      output: {
        // Provide global variables for UMD build
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
          'react-icons': 'ReactIcons',
        },
        // Preserve modules for better tree-shaking
        preserveModules: false,
        // Assets handling
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'easy-chat.css';
          return assetInfo.name || 'assets/[name][extname]';
        },
      },
    },
    // Optimize for smaller bundle size
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: true,
    // Target modern browsers for smaller output
    target: 'es2022',
    // CSS code splitting
    cssCodeSplit: false,
  },
});
