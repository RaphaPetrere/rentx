import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import Animated, { 
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {
  Container
} from './styles'

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

export function Splash() {
  const splashAnimation = useSharedValue(0);

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

  useEffect(() => {
    splashAnimation.value = withTiming(
      50, 
      { 
        duration: 2000 
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