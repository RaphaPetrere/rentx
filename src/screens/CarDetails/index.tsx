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

import { useNavigation } from '@react-navigation/native';

type NavigationProps = {
  navigate: (screen:string) => void;
}

export function CarDetails() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.navigate('Home')}/>
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

        <About>
          Este é um automóvel desportivo. Surgiu do lendário touro que é seu pai
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