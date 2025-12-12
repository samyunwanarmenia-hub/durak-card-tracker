import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.durak.cardtracker',
  appName: 'Трекер карт - Дурак',
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

