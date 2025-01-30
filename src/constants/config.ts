import Config from 'react-native-config';

export const AppConfigType = {
  isDev: Config.APP_CONFIG === 'development',
  isProd: Config.APP_CONFIG === 'production',
};

export const BASE_URL1 = Config.BASE_URL1 ?? '';
export const BASE_URL2 = Config.BASE_URL2 ?? '';
