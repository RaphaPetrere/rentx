import React from 'react'
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
import { Calendar } from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';

import { useTheme } from 'styled-components'
import { StatusBar } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';

type NavigationProps = {
  navigate: (screen:string, carObject: {car: CarDTO}) => void;
}

interface Params {
  car: CarDTO;
}

export function Scheduling() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const { car } = route.params as Params; 
  const theme = useTheme();
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
            <DateValue selected={false}>12 de janeiro de 2022</DateValue>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}>12 de janeiro de 2022</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content showsVerticalScrollIndicator={false}>
        <Calendar />
      </Content>

      <Footer>
        <Button 
          title='Confirmar'
          onPress={() => navigation.navigate('SchedulingDetails', { car })}
        />
      </Footer>
    </Container>
  )
}