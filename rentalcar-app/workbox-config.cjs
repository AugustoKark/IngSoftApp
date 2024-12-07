// workbox-config.cjs
const { precacheAndRoute } = require('workbox-precaching');
const { registerRoute } = require('workbox-routing');
const { NetworkOnly } = require('workbox-strategies');
const { BackgroundSyncPlugin } = require('workbox-background-sync');

module.exports = {
  globDirectory: 'dist/', // Ajusta esto según el directorio de tu build
  globPatterns: [
    '**/*.{html,js,css,vue,png,jpg,svg,json}'
  ],
  swDest: 'dist/sw2.js',
  runtimeCaching: [
    {
      // Manejar solicitudes POST a /api/rentals
      urlPattern: /^https?:\/\/localhost\/api\/rentals/, // Reemplaza con tu dominio si es necesario
      handler: 'NetworkOnly',
      method: 'POST',
      options: {
        backgroundSync: {
          name: 'post-rental-queue',
          options: {
            maxRetentionTime: 24 * 60 // Retener por 24 horas
          }
        }
      }
    }
  ],
  ignoreURLParametersMatching: [
    /^utm_/,
    /^fbclid$/
  ],
};