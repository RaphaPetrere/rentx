import React from 'react'
import {
  Container,
  AnimatedHeaderAndSlider,
  Header,
  AnimatedCarImages,
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
import { Button } from '../../components/Button'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { CarDTO } from '../../dtos/CarDTO'

import { StatusBar } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

type NavigationProps = {
  navigate: (screen:string, carObject?: {car: CarDTO}) => void;
}

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const { car } = route.params as Params;
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  })

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP,
      )
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP,
      )
    }
  })

  return (
    <Container>
      <StatusBar 
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <AnimatedHeaderAndSlider style={headerStyleAnimation}>
        <Header>
          <BackButton onPress={() => navigation.navigate('Home')} />
        </Header>
        <CarImages>
          <AnimatedCarImages style={sliderCarsStyleAnimation}>
            <ImageSlider imagesUrl={car.photos} />
          </AnimatedCarImages>
        </CarImages>
      </AnimatedHeaderAndSlider>

      <Content
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
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
                icon={getAccessoryIcon(accessory.type)}
              />
            )
          }
        </Acessories>

        <About>{car.about}</About>

      </Content>
      <Footer>
        <Button 
          title='Escolher período do aluguel'
          onPress={() => navigation.navigate('Scheduling', { car })}
        />
      </Footer>
    </Container>
  )
}