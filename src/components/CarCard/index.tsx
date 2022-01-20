import React from 'react'

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  Image,
} from './styles';

import { GestureHandlerRootView, RectButtonProps } from "react-native-gesture-handler";
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Car as CarModel} from '../../database/model/Car';

interface Props extends RectButtonProps {
  data: CarModel;
}

export function CarCard({data, ...rest}: Props) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);
  return (
    <GestureHandlerRootView>
      <Container {...rest}>
        <Details>
          <Brand>{data.brand}</Brand>
          <Name>{data.name}</Name>

          <About>
            <Rent>
              <Period>{data.period}</Period>
              <Price>R$ {data.price}</Price>
            </Rent>
      
            <Type>
              <MotorIcon />
            </Type>
          </About>
        </Details>
        <Image 
          source={{uri: data.thumbnail}} 
          resizeMode='contain'
        />
      </Container>
    </GestureHandlerRootView>
  )
}