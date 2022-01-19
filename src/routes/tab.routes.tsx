import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StackRoutes } from './stack.routes';
import { MyCars } from '../screens/MyCars';
import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';
import { useTheme } from 'styled-components';
import { Platform } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

export function TabRoutes() {
  const theme = useTheme();
  return (
    <Navigator 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary
        }
      }} 
      initialRouteName='Home'
    >
      <Screen 
        name='Home'
        component={StackRoutes}
        options={{
          tabBarIcon: (({ color }) => 
            <HomeSvg 
              width={24}
              height={24}
              fill={color}
            />
          )
        }}
      />
      <Screen 
        name='MyCars'
        component={MyCars}
        options={{
          tabBarIcon: (({ color }) => 
            <CarSvg 
              width={24}
              height={24}
              fill={color}
            />
          )
        }}
      />
      <Screen 
        name='Profile'
        component={StackRoutes}
        options={{
          tabBarIcon: (({ color }) => 
            <PeopleSvg 
              width={24}
              height={24}
              fill={color}
            />
          )
        }}
      />
    </Navigator>
  )
}