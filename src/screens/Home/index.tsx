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

import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';
import { Car as CarModel } from '../../database/model/Car';

type NavigationProps = {
  navigate: (screen:string, carObject?: {car: CarModel}) => void;
}

export function Home() {
  const [cars, setCars] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();
  const navigation = useNavigation<NavigationProps>();

  function handleCarDetail(car: CarModel) {
    navigation.navigate('CarDetails', { car })
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api
          .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

        const { changes, latestVersion } = data;
        return {
          changes,
          timestamp: latestVersion
        }
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('/users/sync', user).catch(error => console.log(error));
      }
    })
  }

  useEffect(() => {
    let isMounted = true;
    async function fetchCars() {
      try {
        const carCollection = database.get<CarModel>('cars');
        const cars = await carCollection.query().fetch();
        if(isMounted)
          setCars(cars);
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

  useEffect(() => {
    netInfo.isConnected && offlineSynchronize();
  }, [netInfo.isConnected])
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