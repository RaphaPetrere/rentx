import styled from "styled-components/native";
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from "react-native";
import Animated from 'react-native-reanimated';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const AnimatedHeaderAndSlider = styled(Animated.View)`
  background-color: ${({ theme }) => theme.colors.background_secondary};
  position: absolute;
  overflow: hidden;
  z-index: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  padding-top: ${getStatusBarHeight() + 18}px;
  margin-left: 24px;
`;

export const CarImages = styled.View`
  padding-top: ${getStatusBarHeight() + 32}px;
`;

export const AnimatedCarImages = styled(Animated.View)``;

export const Content = styled(Animated.ScrollView).attrs({
  contentContainerStyle: {
    paddingHorizontal: 24,
    paddingTop: getStatusBarHeight() + 160
  },
  showsVerticalScrollIndicator: false,
})`
`;

export const Footer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  padding: 24px 24px ${Platform.OS === 'ios' ? getBottomSpace() : 0 + 24}px;
`;