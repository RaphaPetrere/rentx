import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";
import Animated from 'react-native-reanimated';
import { Car as CarModel } from "../../database/model/Car";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;

  background-color: ${({ theme }) => theme.colors.header};

  justify-content: flex-end;
  padding: 32px 24px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const TotalCars = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CarList = styled(FlatList as new (props: FlatListProps<CarModel>) => FlatList<CarModel>)`
  padding: 24px;
  margin-bottom: 24px;
`;

export const MyCarsButton = styled(Animated.createAnimatedComponent(RectButton))`
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.main};
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;

export const AnimatedButtonView = styled(Animated.View)`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;