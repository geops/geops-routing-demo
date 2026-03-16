import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      port: 3000,
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
      server: {
        deps: {
          inline: [
            'mobility-toolbox-js',
            'maplibre-gl',
            '@geoblocks/ol-maplibre-layer',
          ],
        },
      },
      transformMode: {
        web: [
          /node_modules\/(@geops\/react-ui|jsts|ol|ol-mapbox-style|ole|filter-obj|react-spatial|mobility-toolbox-js|quick-lru|split-on-first|query-string|decode-uri-component)\//,
        ],
      },
    },
  };
});
