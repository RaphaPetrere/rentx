import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import Animated, { 
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import {
  Container
} from './styles'

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';
import { useNavigation } from '@react-navigation/native';

type NavigationProps = {
  navigate: ( screen: string ) => void;
}

export function Splash() {
  const splashAnimation = useSharedValue(0);
  const navigation = useNavigation<NavigationProps>();

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value, 
        [0, 49, 50],
        [1, 1, 0],
      ),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value, 
            [0,50],
            [0, 75],
            Extrapolate.CLAMP,
          )
        },
        {
          scale: interpolate(
            splashAnimation.value, 
            [0,50],
            [1, .4],
            Extrapolate.CLAMP,
          )
        }
      ],
    }
  });
  
  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value, 
        [0, 49, 50], 
        [0, 0, 1],
      ),
      /* transform: [
        {
          translateX: interpolate(
            splashAnimation.value, 
            [0,50],
            [-100, 0],
            Extrapolate.CLAMP,
          )
        }
      ] */
    }
  });

  function startApp() {
    navigation.navigate('Home');
  }

  useEffect(() => {
    splashAnimation.value = withTiming(
      50, 
      { 
        duration: 2000 
      },
      () => {
        //Making it run on the JS thread again from the UI thread so we can navigate.
        'worklet'
        runOnJS(startApp)();
      }
    );
  }, [])
  return (
    <Container>
      <StatusBar 
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <Animated.View style={[brandStyle, {position: 'absolute'}]}>
        <BrandSvg 
          width={80}
          height={50}
        />
      </Animated.View>

      <Animated.View style={[logoStyle, {position: 'absolute'}]}>
        <LogoSvg 
          width={180}
          height={20}
        />
      </Animated.View>
    </Container>
  )
}