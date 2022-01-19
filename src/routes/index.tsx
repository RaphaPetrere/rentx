import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { TabRoutes } from './tab.routes';
import { AuthRoutes } from './auth.routes';
import { useAuth } from '../hooks/auth';

export function Routes() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user.id ? <TabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}