import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, BackHandler } from 'react-native';
import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton,
  AnimatedButtonView,
} from './styles';

import Logo from '../../assets/logo.svg';

import { CarCard } from '../../components/CarCard';
import { Load } from '../../components/Load';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { RFValue } from 'react-native-responsive-fontsize';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import { useTheme } from 'styled-components';
import {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';

type NavigationProps = {
  navigate: (screen:string, carObject?: {car: CarDTO}) => void;
}

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NavigationProps>();

  const theme = useTheme();

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any){
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd(){
      // positionX.value = withSpring(0);
      // positionY.value = withSpring(0);
    }
  });

  function handleCarDetail(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        setLoading(true);
        const { data } = await api.get('/cars');
        setCars(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  useFocusEffect(useCallback(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    );
    return () => backHandler.remove();
  },[],));
  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de {cars.length > 0 ? cars.length : 0} carros 
          </TotalCars>
        </HeaderContent>
      </Header>

      {
        loading ? 
        <Load />
        :
        <CarList
          data={cars}
          keyExtractor={ item  => item.id}
          renderItem={({ item }) => 
            <CarCard 
              data={item} 
              onPress={() => handleCarDetail(item)}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      }

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <AnimatedButtonView style={myCarsButtonStyle}>
          <GestureHandlerRootView>
            <MyCarsButton onPress={() => navigation.navigate('MyCars')}>
              <Ionicons 
                name='ios-car-sport' 
                size={32}
                color={theme.colors.shape}
              />
            </MyCarsButton>
          </GestureHandlerRootView>
        </AnimatedButtonView>
      </PanGestureHandler>
    </Container>
  )
}