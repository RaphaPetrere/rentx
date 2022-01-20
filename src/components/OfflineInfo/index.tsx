import React from 'react';
import { Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

interface Props {
  text: string;
}

export function OfflineInfo({ text }: Props) {
  const theme = useTheme();
  return (
    <Text
      style={{
        fontFamily: theme.fonts.primary_400,
        color: theme.colors.main,
        fontSize: RFValue(10),
        textAlign: 'center'
      }}
    >
      {text}
    </Text>
  )
}