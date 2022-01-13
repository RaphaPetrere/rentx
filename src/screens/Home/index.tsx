import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles';

import Logo from '../../assets/logo.svg';

import { RFValue } from 'react-native-responsive-fontsize';
import { CarCard } from '../../components/CarCard';

import { useNavigation } from '@react-navigation/native';

type NavigationProps = {
  navigate: (screen:string) => void;
}

export function Home() {
  const [totalCars, setTotalCars] = useState(0);

  const navigation = useNavigation<NavigationProps>();

  const carData = {
    brand: 'Audi',
    name: 'RS 5 coupé',
    rent: {
      period: 'Ao dia',
      price: 120
    },
    thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
  }
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

      <CarList
        data={[1,2,3,4,5,6,7,8]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => <CarCard data={carData} onPress={() => navigation.navigate('CarDetails')}/>}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  )
}