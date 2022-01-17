import React from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'styled-components'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import {
  Container,
  Header,
  Title,
  Subtitle,
  Form,
  Footer,
  ButtonWithMargin,
} from './styles'

export function SignIn() {
  const theme = useTheme();
  return (
    <Container>
      <StatusBar 
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <Header>
        <Title>
          Estamos{'\n'}
          quase lá.
        </Title>
        <Subtitle>
          Faça seu login para começar{'\n'}
          uma experiência incrível.
        </Subtitle>
      </Header>
      
      <Form>
        <Input 
          iconName="mail"
          placeholder='E-mail'
          keyboardType='email-address'
          autoCorrect={false}
          autoCapitalize='none'
        />
        
        <Input 
          iconName="lock"
          placeholder='Senha'
          password
        />
      </Form>

      <Footer>
        <Button 
          title='Login'
          onPress={() => {}}
          enabled={false}
          loading={false}
        />
        <ButtonWithMargin>
          <Button 
            title='Criar conta gratuita'
            onPress={() => {}}
            color={theme.colors.background_secondary}
            enabled={true}
            loading={false}
            light
          />
        </ButtonWithMargin>
      </Footer>
    </Container>
  )
}