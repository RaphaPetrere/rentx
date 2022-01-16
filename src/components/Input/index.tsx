import React from 'react'
import { TextInputProps } from 'react-native';
import {
  Container,
  Icon,
  InputBody,
} from './styles'
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
}

export function Input({ iconName }: InputProps) {
  const theme = useTheme();
  return (
    <Container>
      <Icon>
        <Feather 
          name={iconName}
          size={24}
          color={theme.colors.text_detail}
        />
      </Icon>
      <InputBody>
      </InputBody>
    </Container>
  )
}