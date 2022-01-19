import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Footer,
} from './styles';

type NavigationProps = {
  navigate: (screen: string) => void;
}

export function Profile() {
  const [option, setOption] = useState<'data' | 'password'>('data');
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  function handleSignOut() {

  }
  return (
    <Container>
      <StatusBar 
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <Header>
        <HeaderTop>
          <BackButton 
            color={theme.colors.shape}
            onPress={() => {}}
          />
          <HeaderTitle>
            Editar Perfil
          </HeaderTitle>
          <GestureHandlerRootView>
            <LogoutButton onPress={handleSignOut}>
              <Feather
                name='power'
                size={24}
                color={theme.colors.shape}
              />
            </LogoutButton>
          </GestureHandlerRootView>
        </HeaderTop>
        <PhotoContainer>
          <Photo source={{uri: 'https://avatars.githubusercontent.com/u/56046074?v=4'}}/>
          <PhotoButton onPress={() => {}}>
            <Feather 
              name='camera'
              size={24}
              color={theme.colors.shape}
            />
          </PhotoButton>
        </PhotoContainer>
      </Header>

      <Content>
        <Options>
          <Option
            active={option === 'data'}
            onPress={() => setOption('data')}
          >
            <OptionTitle active={option === 'data'}>Dados</OptionTitle>
          </Option>
          <Option
            active={option === 'password'}
            onPress={() => setOption('password')}
          >
            <OptionTitle active={option === 'password'}>Trocar senha</OptionTitle>
          </Option>
        </Options>
      </Content>

      <Footer>
        <Button 
          title='Salvar alterações'
          enabled={false}
        />
      </Footer>
    </Container>
  )
}