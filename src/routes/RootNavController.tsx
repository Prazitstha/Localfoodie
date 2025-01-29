import {StatusBar} from 'react-native';
import {DefaultTheme, PaperProvider} from 'react-native-paper';
import {ThemeProp} from 'react-native-paper/lib/typescript/types';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {SheetProvider} from 'react-native-actions-sheet';

// import AuthHandler from '@hooks/AuthHandler';
import {darkTheme, lightTheme} from '@themes';

import {useState} from 'react';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import {useAppSelector} from '@hooks/rtkHooks';

export default function RootNavController() {
  const {isLoggedIn} = useAppSelector(state => state.settings);
  console.log('isLoggedIn', isLoggedIn);
  const isDarkMode = false;
  const theme: ThemeProp = {
    ...DefaultTheme,
    dark: isDarkMode,
    roundness: 1,
    colors: isDarkMode ? darkTheme.colors : lightTheme.colors,
  };

  const switchRoute = () => {
    if (!!isLoggedIn) {
      return <MainStack />;
    }

    return <AuthStack />;
  };

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        backgroundColor={theme.colors?.background}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer
        theme={isDarkMode ? NavigationDarkTheme : NavigationDefaultTheme}>
        {switchRoute()}
      </NavigationContainer>
    </PaperProvider>
  );
}
