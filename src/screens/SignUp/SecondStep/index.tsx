import React, { useState } from 'react'
import {
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native'
import { useTheme } from 'styled-components'
import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import api from '../../../services/api'
import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'

type NavigationProps = {
  navigate: (
    screen:string,
    confirmObject?: {
      title: string;
      message: string;
      nextRoute: string;
    }
  ) => void;
}

interface Params {
  nome: string;
  email: string;
  cnh: string;
}

export function SecondStep() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const { cnh, email, nome } = route.params as Params;
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const theme = useTheme();
  async function handleRegister() {
    try {
      if(password != repeatPassword)
        return Alert.alert('Opa', 'As credenciais não condizem');

      const user = {
        nome,
        email,
        cnh,
        password
      }
      // await AsyncStorage.setItem('@rentx:user', user);
      await api.post('/users', {
        name: nome,
        email,
        driver_license: cnh,
        password
      })
      .then(() => {
        navigation.navigate('Complete', {
          title: 'Conta criada!',
          message: `Agora é só fazer login\ne aproveitar.`,
          nextRoute: 'SignIn'
        })
      })
      .catch(() => {
        return Alert.alert('Opa', 'Não foi possível cadastrar');
      })
    } catch (error) {
      
    }
  }

  return (
    <KeyboardAvoidingView
      behavior='position'
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar 
            barStyle={'dark-content'}
            backgroundColor={theme.colors.background_primary}
            translucent
          />
          <Header>
            <BackButton onPress={() => navigation.navigate('FirstStep')} />
            <Steps>
              <Bullet/>
              <Bullet active/>
            </Steps>
          </Header>
          <Title>
            Crie sua {'\n'}
            conta
          </Title>
          <Subtitle>
            Faça seu cadastro de {'\n'}
            forma rápida e fácil.
          </Subtitle>
          <Form>
            <FormTitle>
              2. Senha
            </FormTitle>
            <Input 
              iconName="lock"
              placeholder='Senha'
              autoCorrect={false}
              autoCapitalize='none'
              password
              onChangeText={setPassword}
              value={password}
              hasInputValue={!!password}
            />
            <Input 
              iconName="lock"
              placeholder='Repetir senha'
              autoCorrect={false}
              autoCapitalize='none'
              password
              onChangeText={setRepeatPassword}
              value={repeatPassword}
              hasInputValue={!!repeatPassword}
            />
          </Form>
          <Button 
            title='Cadastrar'
            color={theme.colors.success}
            onPress={handleRegister}
            enabled={!!password && !!repeatPassword}
            loading={false}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}