import React from 'react'
import { Container } from './styles'

import { useTheme } from 'styled-components';

import {MaterialIcons} from '@expo/vector-icons';

import { GestureHandlerRootView, BorderlessButtonProps } from 'react-native-gesture-handler';

interface Props extends BorderlessButtonProps {
  color?: string;
}

export function BackButton({ color, ...rest }: Props) {
  const theme = useTheme();
  return (
    <GestureHandlerRootView>
      <Container {...rest}>
        <MaterialIcons 
          name="chevron-left"
          size={24}
          color={color ? color : theme.colors.text}
        />
      </Container>
    </GestureHandlerRootView>
  )
}