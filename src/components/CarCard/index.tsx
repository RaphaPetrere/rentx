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

import GasolineSvg from '../../assets/gasoline.svg';

import { GestureHandlerRootView, RectButtonProps } from "react-native-gesture-handler";

interface CarData {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  },
  thumbnail: string;
}

interface Props extends RectButtonProps {
  data: CarData;
}

export function CarCard({data, ...rest}: Props) {
  return (
    <GestureHandlerRootView>
      <Container {...rest}>
        <Details>
          <Brand>{data.brand}</Brand>
          <Name>{data.name}</Name>

          <About>
            <Rent>
              <Period>{data.rent.period}</Period>
              <Price>R$ {data.rent.price}</Price>
            </Rent>
      
            <Type>
              <GasolineSvg />
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