import React, { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
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
  Section,
  Footer,
} from './styles';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/auth';

type NavigationProps = {
  navigate: (screen: string) => void;
}

export function Profile() {
  const { user } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const [option, setOption] = useState<'data' | 'password'>('data');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);
  function handleSignOut() {

  }

  async function handleAvatarSelect() {
    console.log("entrei");
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,4],
      quality: 1,
    })

    console.log('result', result);

    if(result.cancelled)
      return;

    if(result.uri) {
      setAvatar(result.uri);
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
              { !!avatar && <Photo source={{uri: avatar}}/> }
              <GestureHandlerRootView
                style={{
                  position: 'absolute',
                  // bottom: 0,
                  right: 0,
                  backgroundColor: 'blue'
                }}
              >
                <PhotoButton onPress={handleAvatarSelect}>
                  <Feather 
                    name='camera'
                    size={24}
                    color={theme.colors.shape}
                  />
                </PhotoButton>
              </GestureHandlerRootView>
            </PhotoContainer>
          </Header>

          <Content
            style={{
              marginBottom: useBottomTabBarHeight()
            }}
          >
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

            {
              option === 'data'
              ?
              <Section>
                <Input 
                  iconName='user'
                  placeholder='Nome'
                  autoCorrect={false}
                  hasInputValue={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input 
                  iconName='mail'
                  editable={false}
                  hasInputValue={false}
                  defaultValue={user.email}
                />
                <Input 
                  iconName='credit-card'
                  placeholder='CNH'
                  keyboardType='numeric'
                  hasInputValue={false}
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section>
              :
              <Section>
                <Input 
                  iconName='lock'
                  placeholder='Senha atual'
                  autoCorrect={false}
                  hasInputValue={false}
                  password
                />
                <Input 
                  iconName='lock'
                  placeholder='Nova senha'
                  autoCorrect={false}
                  hasInputValue={false}
                  password
                />
                <Input 
                  iconName='lock'
                  placeholder='Confirmar senha'
                  autoCorrect={false}
                  hasInputValue={false}
                  password
                />
              </Section>
            }
          </Content>

          <Footer>
            <Button 
              title='Salvar alterações'
              enabled={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}