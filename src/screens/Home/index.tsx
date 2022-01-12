import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
} from './styles';

import Logo from '../../assets/logo.svg';

import { RFValue } from 'react-native-responsive-fontsize';

export function Home() {
  const [totalCars, setTotalCars] = useState(0);
  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de {totalCars} carros 
          </TotalCars>
        </HeaderContent>
      </Header>
    </Container>
  )
}