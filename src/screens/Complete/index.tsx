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

import { useNavigation, useRoute } from '@react-navigation/native';

type NavigationProps = {
  navigate: (screen:string) => void;
}

interface Params {
  title: string;
  message: string;
  nextRoute: string;
}

export function Complete() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const { title, message, nextRoute } = route.params as Params;
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
        <Title>{title}</Title>

        <Message>
          {message}
        </Message>
      </Content>

      <Footer>
        <ButtonContainer>
          <Button 
            title='OK'
            onPress={() => navigation.navigate(nextRoute)}
            color={theme.colors.shape_dark}
          />
        </ButtonContainer>
      </Footer>
    </Container>
  )
}