import React, { useState, useEffect } from 'react'
import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
} from './styles'
import { StatusBar, FlatList } from 'react-native'
import { useTheme } from 'styled-components'
import { BackButton } from '../../components/BackButton'
import { useNavigation } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO'
import api from '../../services/api'
import { CarCard } from '../../components/CarCard'
import { Load } from '../../components/Load'

type NavigationProps = {
  navigate: (screen: string) => void;
}

interface CarProps {
  car: CarDTO;
  user_id: string;
  id: string;
}

export function MyCars() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get(`/schedules_byuser?user_id=1`);
        setCars(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCars();
  }, [])
  return (
    <Container>
      <StatusBar 
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <Header>
        <BackButton 
          color={theme.colors.shape}
          onPress={() => navigation.navigate('Home')}
        />

        <Title>
          Seus agendamentos {'\n'}
          estão aqui.
        </Title>

        <Subtitle>
          Conforto, segurança e praticidade.
        </Subtitle>
      </Header>

      <Content>
        
        {
          loading ?
          <Load />
          :
          <>
            <Appointments>
              <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
              <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
            </Appointments>
            <FlatList 
              data={cars}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => 
                <CarCard data={item.car} />
              }
            />
          </>
        }
      </Content>
    </Container>
  )
}