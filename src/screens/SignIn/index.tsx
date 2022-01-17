import React, { useState } from 'react'
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native'

import * as Yup from 'yup';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('A senha é obrigatória')
      });
      await schema.validate({ email, password });
      Alert.alert('Tudo certo!');
    } catch (error) {
      if(error instanceof Yup.ValidationError)
      {
        return Alert.alert('Opa!', error.message);
      }
      
      return Alert.alert(
        'Erro na autenticação', 
        'Ocorreu um erro ao fazer login, verifique as credenciais'
      );
    }
  }

  return (
    <KeyboardAvoidingView
      behavior='position'
      enabled
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >
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
              onChangeText={setEmail}
              value={email}
              hasInputValue={!!email}
            />
            
            <Input 
              iconName="lock"
              placeholder='Senha'
              password
              onChangeText={setPassword}
              value={password}
              hasInputValue={!!password}
            />
          </Form>

          <Footer>
            <Button 
              title='Login'
              onPress={handleSignIn}
              enabled={true}
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}