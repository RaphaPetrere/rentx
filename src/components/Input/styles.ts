import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface Props {
  showBorder: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconWrapper = styled.View<Props>`
  background-color: ${({ theme }) =>  theme.colors.background_secondary};
  margin-right: 2px;
  width: 55px;
  height: 55px;
  align-items: center;
  justify-content: center;
  border-bottom-width: 2px;
  border-bottom-color: transparent;

  ${({ showBorder, theme }) => showBorder && css`
    border-bottom-color: ${theme.colors.main};
  `};
`;

export const InputText = styled(TextInput)<Props>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  padding: 0 23px;
  border-bottom-width: 2px;
  border-bottom-color: transparent;

  ${({ showBorder, theme }) => showBorder && css`
    border-bottom-color: ${theme.colors.main};
  `};
`;