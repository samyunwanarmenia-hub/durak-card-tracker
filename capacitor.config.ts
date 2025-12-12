import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.durak.cardtracker',
  appName: 'Durak Card Tracker',
  webDir: 'dist',
  server: {
    android: {
      allowMixedContent: true,
    },
    ios: {
      contentInset: 'automatic',
    },
  },
};

export default config;


