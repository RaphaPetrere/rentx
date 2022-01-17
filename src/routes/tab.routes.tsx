import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StackRoutes } from './stack.routes';
import { CarDetails } from '../screens/CarDetails';
import { MyCars } from '../screens/MyCars';

const { Navigator, Screen } = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Navigator 
      screenOptions={{
        headerShown: false
      }} 
      initialRouteName='Home'
    >
      <Screen 
        name='Home'
        component={StackRoutes}
      />
      <Screen 
        name='MyCars'
        component={MyCars}
      />
      <Screen 
        name='Profile'
        component={CarDetails}
      />
    </Navigator>
  )
}