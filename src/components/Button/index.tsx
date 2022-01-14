import React from 'react'
import { Container, Title } from './styles'

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

interface Props {
  title: string;
  color?: string;
  enabled?: boolean;
  loading?: boolean;
  onPress: () => void;
}

export function Button({
  title, 
  color, 
  enabled = true, 
  loading = false, 
  ...rest
}: Props) {
  const theme = useTheme();
  return (
    <GestureHandlerRootView>
      <Container 
        {...rest} 
        color={color} 
        enabled={enabled}
        style={{opacity: ( enabled === false || loading ) ? .5 : 1}}
      >
        {
          loading
          ?
          <ActivityIndicator color={theme.colors.shape} />
          :
          <Title>{title}</Title>
        }
      </Container>
    </GestureHandlerRootView>
  )
}