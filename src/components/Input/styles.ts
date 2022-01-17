import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconWrapper = styled.View`
  background-color: ${({ theme }) =>  theme.colors.background_secondary};
  margin-right: 2px;
  width: 55px;
  height: 55px;
  align-items: center;
  justify-content: center;
`;

export const InputText = styled(TextInput)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  padding: 0 23px;
`;