import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton,
} from './styles';

import Logo from '../../assets/logo.svg';

import { RFValue } from 'react-native-responsive-fontsize';
import { CarCard } from '../../components/CarCard';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { useNavigation } from '@react-navigation/native';
import { Load } from '../../components/Load';

import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTheme } from 'styled-components';

type NavigationProps = {
  navigate: (screen:string, carObject?: {car: CarDTO}) => void;
}

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NavigationProps>();

  const theme = useTheme();

  function handleCarDetail(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        setLoading(true);
        const { data } = await api.get('/cars');
        setCars(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);
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
            Total de {cars.length > 0 ? cars.length : 0} carros 
          </TotalCars>
        </HeaderContent>
      </Header>

      {
        loading ? 
        <Load />
        :
        <CarList
          data={cars}
          keyExtractor={ item  => item.id}
          renderItem={({ item }) => <CarCard data={item} onPress={() => handleCarDetail(item)}/>}
          showsVerticalScrollIndicator={false}
        />
      }

      <GestureHandlerRootView>
        <MyCarsButton
          onPress={() => navigation.navigate('MyCars')}
        >
          <Ionicons 
            name='ios-car-sport' 
            size={32}
            color={theme.colors.shape}
          />
        </MyCarsButton>
      </GestureHandlerRootView>
    </Container>
  )
}