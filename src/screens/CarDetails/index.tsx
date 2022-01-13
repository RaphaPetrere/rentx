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
  About,
  Acessories,
  Footer,
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

import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO'

type NavigationProps = {
  navigate: (screen:string) => void;
}

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const { car } = route.params as Params;

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.navigate('Home')}/>
      </Header>
      <CarImages>
        <ImageSlider 
          imagesUrl={car.photos}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>
              {car.brand}
            </Brand>
            <Name>
              {car.name}
            </Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Acessories>
          {
            car.accessories.map(accessory => 
              <Acessory 
                key={accessory.type}
                name={accessory.name}
                icon={speedSvg}
              />
            )
          }
        </Acessories>

        <About>
          {car.about}
        </About>

      </Content>
      <Footer>
        <Button 
          title='Escolher período do aluguel'
          onPress={() => navigation.navigate('Scheduling')}
        />
      </Footer>
    </Container>
  )
}