import React, { useEffect, useState } from 'react';
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
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { useNavigation } from '@react-navigation/native';
import { Load } from '../../components/Load';

type NavigationProps = {
  navigate: (screen:string) => void;
}

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NavigationProps>();

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
          renderItem={({ item }) => <CarCard data={item} onPress={() => navigation.navigate('CarDetails')}/>}
          showsVerticalScrollIndicator={false}
        />
      }
    </Container>
  )
}