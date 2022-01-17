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
  hasInputValue: boolean;
}

export function Input({
  iconName, 
  password = false, 
  hasInputValue,
  ...rest 
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  function handleShowPassword() {
    setShowPassword(prevState => !prevState);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
  }

  return (
    <Container>
      <IconWrapper showBorder={hasInputValue || isFocused}>
        <Feather 
          name={iconName}
          size={24}
          color={hasInputValue || isFocused ? theme.colors.main : theme.colors.text_detail}
        />
      </IconWrapper>
      <InputText
        secureTextEntry={password && !showPassword}
        {...rest} 
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        showBorder={hasInputValue || isFocused}
      />

      {
        password && 
        <GestureHandlerRootView>
          <BorderlessButton
            onPress={handleShowPassword}
          >
            <IconWrapper
              style={{marginRight: 0}}
              showBorder={hasInputValue || isFocused}
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