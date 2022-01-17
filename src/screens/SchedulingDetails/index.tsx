import React, { useState } from 'react'
import {
  Container,
  Header,
  CarImages,
  Content,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles'

import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { CarInfo } from '../../components/CarInfo'
import { Button } from '../../components/Button'

import { CarDTO } from '../../dtos/CarDTO'
import api from '../../services/api'

import { Alert, StatusBar } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native';
import { format, addDays } from 'date-fns';

type NavigationProps = {
  navigate: (
    screen:string, 
    object: {
      car?: CarDTO,
      title?: string;
      message?: string;
      nextRoute?: string;
    }
  ) => void;
}

interface Params {
  car: CarDTO;
  dates: string[],
}

export function SchedulingDetails() {
  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation<NavigationProps>();
  const { car, dates } = route.params as Params;
  const [lockButton, setLockButton] = useState(false);

  async function handleConfirmRental() {
    setLockButton(true);
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ]

    await api.post(`/schedules_byuser`, {
      user_id: 1,
      car,
      startDate: format(addDays(new Date(dates[0]), 1), 'dd/MM/yyyy'),
      endDate: format(addDays(new Date(dates[dates.length - 1]), 1), 'dd/MM/yyyy')
    });

    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    })
    .then(() => navigation.navigate('Complete', {
      title: 'Carro alugado!',
      message: `Agora você só precisa ir
      até a concessionária da RENTX
      pegar o seu automóvel.`,
      nextRoute: 'HomeStack'
    }))
    .catch(() => {
      setLockButton(false);
      Alert.alert('Não foi possível confirmar o agendamento.')
    });
  }
  return (
    <Container>
      <StatusBar 
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <Header>
        <BackButton onPress={() => navigation.navigate('Scheduling', { car })}/>
      </Header>
      <CarImages>
        <ImageSlider 
          imagesUrl={car.photos}
        />
      </CarImages>

      <Content>
        <CarInfo car={car} />

        <RentalPeriod>
          <CalendarIcon>
            <Feather 
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{format(addDays(new Date(dates[0]), 1), 'dd/MM/yyyy')}</DateValue>
          </DateInfo>
          <Feather 
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.text}
          />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{format(addDays(new Date(dates[dates.length - 1]), 1), 'dd/MM/yyyy')}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.price} x{dates.length} diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ {car.price * dates.length}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button 
          title='Alugar agora'
          color={theme.colors.success}
          onPress={handleConfirmRental}
          loading={lockButton}
          enabled={!lockButton}
        />
      </Footer>
    </Container>
  )
}