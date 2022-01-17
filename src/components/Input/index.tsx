import React, { useState } from 'react'
import { TextInputProps } from 'react-native';
import {
  Container,
  IconWrapper,
  InputText,
} from './styles'
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { GestureHandlerRootView, BorderlessButton } from "react-native-gesture-handler";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  password?: boolean;
}

export function Input({
  iconName, 
  password = false, 
  ...rest 
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  function handleShowPassword() {
    setShowPassword(prevState => !prevState);
  }

  return (
    <Container>
      <IconWrapper>
        <Feather 
          name={iconName}
          size={24}
          color={theme.colors.text_detail}
        />
      </IconWrapper>
      <InputText
        secureTextEntry={password && !showPassword}
        {...rest} 
      />

      {
        password && 
        <GestureHandlerRootView>
          <BorderlessButton
            onPress={handleShowPassword}
          >
            <IconWrapper
              style={{marginRight: 0}}
            >
              <Feather 
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color={theme.colors.text_detail}
              />
            </IconWrapper>
          </BorderlessButton>
        </GestureHandlerRootView>
      }
    </Container>
  )
}