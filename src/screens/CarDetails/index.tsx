import React from 'react'
import {
  Container,
  AnimatedHeaderAndSlider,
  Header,
  AnimatedCarImages,
  CarImages,
  Content,
  Footer,
} from './styles'

import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Button } from '../../components/Button'
import { CarInfo } from '../../components/CarInfo'
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
          <BackButton onPress={() => navigation.navigate('HomeStack')} />
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
        <CarInfo 
          car={car}
          showAbout={true}
        />
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