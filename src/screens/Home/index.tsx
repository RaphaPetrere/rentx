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

import { CarCard } from '../../components/CarCard';
import { Load } from '../../components/Load';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';


type NavigationProps = {
  navigate: (screen:string, carObject?: {car: CarDTO}) => void;
}

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NavigationProps>();

  function handleCarDetail(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  useEffect(() => {
    let isMounted = true;
    async function fetchCars() {
      try {
        if(isMounted)
          setLoading(true);
        const { data } = await api.get('/cars');
        if(isMounted)
          setCars(data);
      } catch (error) {
        console.log(error);
      } finally {
        if(isMounted)
          setLoading(false);
      }
    }

    fetchCars();
    return () => {
      isMounted = false;
    };
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
          renderItem={({ item }) => 
            <CarCard 
              data={item} 
              onPress={() => handleCarDetail(item)}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      }
    </Container>
  )
}