import React from 'react'
import {
  Container,
  Content,
  Title,
  Message,
  Footer,
  ButtonContainer,
} from './styles'
import { useWindowDimensions } from 'react-native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components';

export function SchedulingComplete() {
  const theme = useTheme();
  return (
    <Container>
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
            title='Ok'
            onPress={() => {}}
            color={theme.colors.shape_dark}
          />
        </ButtonContainer>
      </Footer>
    </Container>
  )
}