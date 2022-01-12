import React from 'react'
import { 
  Container, 
  Header, 
  Title, 
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles'

import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button';

import ArrowSvg from '../../assets/arrow.svg';

import { useTheme } from 'styled-components'
import { StatusBar } from 'react-native';

export function Scheduling() {
  const theme = useTheme();
  return (
    <Container>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <BackButton 
          color={theme.colors.shape}
          onPress={() => {}}
        />
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}>12 de janeiro de 2022</DateValue>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}>12 de janeiro de 2022</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content showsVerticalScrollIndicator={false}>

      </Content>

      <Footer>
        <Button 
          title='Confirmar'
          onPress={() => {}}
        />
      </Footer>
    </Container>
  )
}