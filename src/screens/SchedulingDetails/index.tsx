import React from 'react'
import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Acessories,
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
import { Acessory } from '../../components/Acessory'

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import gearboxSvg from '../../assets/gearbox.svg';
import peopleSvg from '../../assets/people.svg';
import { Button } from '../../components/Button'

import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'

import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO'

type NavigationProps = {
  navigate: (screen:string, carObject?: {car: CarDTO}) => void;
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
  console.log(dates);
  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.navigate('Scheduling', { car })}/>
      </Header>
      <CarImages>
        <ImageSlider 
          imagesUrl={['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>
              Audi
            </Brand>
            <Name>
              RS Coupé
            </Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 120</Price>
          </Rent>
        </Details>

        <Acessories>
          <Acessory 
            name='380Km/h'
            icon={speedSvg}
          />
          <Acessory 
            name='3.2s'
            icon={accelerationSvg}
          />
          <Acessory 
            name='800 HP'
            icon={forceSvg}
          />
          <Acessory 
            name='Gasolina'
            icon={gasolineSvg}
          />
          <Acessory 
            name='Auto'
            icon={gearboxSvg}
          />
          <Acessory 
            name='2 pessoas'
            icon={peopleSvg}
          />
        </Acessories>

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
            <DateValue>12/01/2022</DateValue>
          </DateInfo>
          <Feather 
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.text}
          />
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>12/01/2022</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 120 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 360</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button 
          title='Alugar agora'
          color={theme.colors.success}
          onPress={() => navigation.navigate('SchedulingComplete')}
        />
      </Footer>
    </Container>
  )
}