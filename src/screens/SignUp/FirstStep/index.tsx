import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
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

type NavigationProps = {
  navigate: (screen:string) => void;
}

export function FirstStep() {
  const navigation = useNavigation<NavigationProps>();
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [cnh, setCnh] = useState('');
  const theme = useTheme();
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
            onPress={() => navigation.navigate('SecondStep')}
            enabled={!!nome && !!email && !!cnh}
            loading={false}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}