import React from 'react';
import { LogBox } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';

import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';

import theme from './src/styles/theme';

import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components/native';
import { Routes } from './src/routes';
import { AppProvider } from './src/hooks';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });


  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state'
  ]);

  if(!fontsLoaded){
    return <AppLoading />
  }
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
}
