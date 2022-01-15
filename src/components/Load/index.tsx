import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native';
import LoadCar from '../../assets/load_car.json';

export function Load() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <LottieView 
        source={LoadCar}
        style={{height: 200}}
        resizeMode='contain'
        autoPlay
        loop
      />
    </View>
  )
}