import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Image, StatusBar} from 'react-native';
import {Text, TextInput, Button, HelperText} from 'react-native-paper';
import Spacer from '../components/Spacer';
import {LoginUser} from '../helpers/UserLogin';

function LoginScreen(): JSX.Element {
  const [isSecure, setSecure] = React.useState<boolean>(true);

  const {reset} = useNavigation();

  const username = React.useRef<string>('Prerna_Agarwal');
  const password = React.useRef<string>('Kingkong$1');

  const [isError, setError] = React.useState<{
    username: boolean;
    password: boolean;
  }>({username: false, password: false});

  function handleSubmit(): void {
    setError({
      password: username.current.length < 6,
      username: password.current.length < 3,
    });
    LoginUser(reset);
  }

  return (
    <View style={style.body}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />

      {/* ------------ Affinsys logo & login text -----------------*/}
      <Image
        source={require('../assets/affinsys-logo.png')}
        style={style.imageStyle}
      />
      <Text variant="headlineMedium" style={style.textStyle}>
        Login to the Portal
      </Text>

      {/* ---------------username field--------------------- */}
      <TextInput
        label={'username'}
        underlineColor={'transparent'}
        activeUnderlineColor={'grey'}
        style={style.inputStyle}
        onChangeText={(text: string): void => {
          username.current = text;
        }}
        value={username.current}
        left={<TextInput.Icon icon={'account'} size={25} />}
      />
      <HelperText type="error" visible={isError.username}>
        Length of username must be greater than 2
      </HelperText>
      <Spacer margin={1} />

      {/* -------------------password field------------------ */}
      <TextInput
        label={'password'}
        secureTextEntry={isSecure}
        activeUnderlineColor={'grey'}
        style={style.inputStyle}
        onChangeText={(text: string): void => {
          password.current = text;
        }}
        value={password.current}
        underlineColor={'transparent'}
        left={<TextInput.Icon icon={'key'} size={25} />}
        right={
          <TextInput.Icon
            icon={'eye'}
            size={25}
            onPress={(): void => {
              setSecure(!isSecure);
            }}
          />
        }
      />
      <HelperText type="error" visible={isError.password}>
        Length of password must be greater than or equal to 6
      </HelperText>
      <Spacer margin={6} />

      {/* --------------Submit button----------------- */}
      <Button
        mode="contained"
        onPress={(): void => {
          handleSubmit();
        }}>
        Submit
      </Button>
    </View>
  );
}

export default LoginScreen;

const style = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageStyle: {
    height: 200,
    alignSelf: 'center',
    width: 200,
    marginBottom: 30,
  },
  textStyle: {
    marginBottom: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  inputStyle: {
    backgroundColor: 'rgba(240,240,240,1)',
    borderWidth: 0.5,
    overflow: 'hidden',
    borderRadius: 0,
  },
});
