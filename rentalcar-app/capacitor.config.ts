import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'rentalcar-app',
  webDir: 'dist',
  plugins: {
    "PWA": {
      "registerType": "auto",
      "serviceWorker": {
        "filePath": "src/service-worker.js"
      }
    }
  },

};

export default config;
