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

export function SecondStep() {
  const navigation = useNavigation<NavigationProps>();
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
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
            <BackButton onPress={() => navigation.navigate('SignIn')} />
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
            onPress={() => navigation.navigate('SecondStep')}
            enabled={!!password && !!repeatPassword}
            loading={false}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}