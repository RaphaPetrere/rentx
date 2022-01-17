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
import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles'
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup';

type NavigationProps = {
  navigate: (
    screen:string,
    user?: {
      nome: string;
      email: string;
      cnh: string;
    }
  ) => void;
}

export function FirstStep() {
  const navigation = useNavigation<NavigationProps>();
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [cnh, setCnh] = useState('');
  const theme = useTheme();

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        nome: Yup.string()
          .required('Nome é obrigatório'),
        email: Yup.string()
          .email('Digite um E-mail válido')
          .required('E-mail é obrigatório'),
        cnh: Yup.string()
          .required('CNH é obrigatória'),
      })
      const data = {
        nome,
        email,
        cnh
      }

      await schema.validate(data);
      navigation.navigate('SecondStep', data);
    } catch (error) {
      if(error instanceof Yup.ValidationError)
        return Alert.alert('Opa', error.message);
      else
        return Alert.alert('Opa', 'Digite credenciais válidas');
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
            <BackButton onPress={() => navigation.navigate('SignIn')} />
            <Steps>
              <Bullet active/>
              <Bullet/>
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
              1. Dados
            </FormTitle>
            <Input 
              iconName="user"
              placeholder='Nome'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setNome}
              value={nome}
              hasInputValue={!!nome}
            />
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
              iconName="credit-card"
              placeholder='CNH'
              keyboardType='numeric'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setCnh}
              value={cnh}
              hasInputValue={!!cnh}
            />
          </Form>
          <Button 
            title='Próximo'
            onPress={handleNextStep}
            enabled={!!nome && !!email && !!cnh}
            loading={false}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}