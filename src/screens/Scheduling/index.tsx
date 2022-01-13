import React, { useState } from 'react'
import { 
  Container, 
  Header, 
  Title, 
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles'

import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';

import { CarDTO } from '../../dtos/CarDTO';

import { useTheme } from 'styled-components'
import { Alert, StatusBar } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { format, addDays } from 'date-fns';

type NavigationProps = {
  navigate: (
    screen: string, 
    params: {
      car: CarDTO
      dates?: string[],
    },
  ) => void;
}

interface Params {
  car: CarDTO;
}

interface IRentalPeriod {
  start: number;
  startFormatted: string;
  end?: number;
  endFormatted?: string;
}

export function Scheduling() {
  const navigation = useNavigation<NavigationProps>();

  const route = useRoute();
  const { car } = route.params as Params; 

  const theme = useTheme();

  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>({} as IRentalPeriod);

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp)
    {
      let aux = start;
      start = end;
      end = aux;
    }

    setLastSelectedDate(date);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    if(lastSelectedDate.timestamp)
    {
      setRentalPeriod({
        start: start.timestamp,
        startFormatted: format(addDays(new Date(start.timestamp), 1), 'dd/MM/yyyy'),
        end: end.timestamp,
        endFormatted: format(addDays(new Date(end.timestamp), 1), 'dd/MM/yyyy'),
      })
    }
    else
    {
      setRentalPeriod({
        start: start.timestamp,
        startFormatted: format(addDays(new Date(start.timestamp), 1), 'dd/MM/yyyy'),
      })
    }
  }

  function handleConfirmRental() {
    if(!rentalPeriod.start || !rentalPeriod.end)
      Alert.alert('Selecione o intervalo para alugar.');
    else
      navigation.navigate('SchedulingDetails', { 
        car,
        dates: Object.keys(markedDates)
      });
  }

  return (
    <Container>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <BackButton 
          color={theme.colors.shape}
          onPress={() => navigation.navigate('CarDetails', { car })}
        />
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted ? rentalPeriod.startFormatted : ''}
            </DateValue>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted ? rentalPeriod.endFormatted : ''}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content showsVerticalScrollIndicator={false}>
        <Calendar 
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button 
          title='Confirmar'
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  )
}