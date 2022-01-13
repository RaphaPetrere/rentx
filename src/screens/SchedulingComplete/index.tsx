import React from 'react'
import {
  Container,
  Content,
  Title,
  Message,
  Footer,
  ButtonContainer,
} from './styles'
import { StatusBar, useWindowDimensions } from 'react-native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components';

import { useNavigation } from '@react-navigation/native';

type NavigationProps = {
  navigate: (screen:string) => void;
}

export function SchedulingComplete() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  return (
    <Container>
      <StatusBar 
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <LogoSvg width={useWindowDimensions().width} />

      <Content>
        <DoneSvg width={80} height={80}/>
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ButtonContainer>
          <Button 
            title='OK'
            onPress={() => navigation.navigate('Home')}
            color={theme.colors.shape_dark}
          />
        </ButtonContainer>
      </Footer>
    </Container>
  )
}