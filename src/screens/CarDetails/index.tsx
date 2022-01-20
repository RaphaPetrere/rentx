import React, { useState, useEffect } from 'react'
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
import { Car as CarModel } from '../../database/model/Car'
import api from '../../services/api'

import { StatusBar } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useNetInfo } from '@react-native-community/netinfo'
import { OfflineInfo } from '../../components/OfflineInfo'

type NavigationProps = {
  navigate: (screen:string, carObject?: {car: CarModel}) => void;
}

interface Params {
  car: CarModel;
}

export function CarDetails() {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const navigation = useNavigation<NavigationProps>();
  const netinfo = useNetInfo();
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

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`cars/${car.id}`);
      setCarUpdated(response.data);
    }

    netinfo.isConnected && fetchCarUpdated();
  }, [netinfo.isConnected]);

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
            <ImageSlider imagesUrl={
                !!carUpdated.photos ? carUpdated.photos : [{ id : car.id, photo: car.thumbnail }]
              } 
            />
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
          enabled={!!netinfo.isConnected}
        />

        {
          !netinfo.isConnected &&
          <OfflineInfo
            text='Conecte-se a Internet para ver mais detalhes e agendar seu carro.'
          />
        }
      </Footer>
    </Container>
  )
}