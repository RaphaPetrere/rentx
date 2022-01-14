import React from 'react'
import { StatusBar, Button, StyleSheet, Dimensions } from 'react-native'
import Animated, { 
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';
import {
  Container
} from './styles'

const WIDTH = Dimensions.get('screen').width;

export function Splash() {
  const animation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(animation.value, {
            duration: 100,
            easing: Easing.bezier(.73, .17, 0, 1.01)
          })
        }
      ]
    }
  })

  function handleAnimationPosition() {
    animation.value = Math.random() * (WIDTH - 100);
  }
  return (
    <Container>
      <StatusBar 
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button 
        title="Mover" 
        onPress={handleAnimationPosition} 
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  }
});