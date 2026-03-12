import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    server: {
      port: 3000,
    },
    deps: {
      inline: ['mobility-toolbox-js', 'maplibre-gl'],
    },
    resolve: {
      alias: {
        'maplibre-gl': 'maplibre-gl/dist/maplibre-gl.js',
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/setupTests.js',
      transformMode: {
        web: [
          /node_modules\/(@geops\/react-ui|jsts|ol|ol-mapbox-style|ole|filter-obj|react-spatial|mobility-toolbox-js|quick-lru|split-on-first|query-string|decode-uri-component)\//,
        ],
      },
    },
  };
});
