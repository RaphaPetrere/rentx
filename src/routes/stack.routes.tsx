import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Complete } from '../screens/Complete';
import { Home } from '../screens/Home';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator 
      screenOptions={{
        headerShown: false
      }} 
      initialRouteName='HomeStack'
    >
      <Screen 
        name='HomeStack'
        component={Home}
      />
      <Screen 
        name='CarDetails'
        component={CarDetails}
      />
      <Screen 
        name='Scheduling'
        component={Scheduling}
      />
      <Screen 
        name='SchedulingDetails'
        component={SchedulingDetails}
      />
      <Screen 
        name='Complete'
        component={Complete}
      />
    </Navigator>
  )
}