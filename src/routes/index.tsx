import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { TabRoutes } from './tab.routes';
import { AuthRoutes } from './auth.routes';
import { useAuth } from '../hooks/auth';
import { Load } from '../components/Load';

export function Routes() {
  const { user, loading } = useAuth();
  return (
    loading ? <Load /> :
    <NavigationContainer>
      {user.id ? <TabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}