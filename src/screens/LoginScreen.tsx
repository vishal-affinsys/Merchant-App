import {
  ParamListBase,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import {SerializedError} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';
import React from 'react';
import {View, StyleSheet, Image, StatusBar} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import {useGetCodeMutation, useGetTokenMutation} from '../store/LoginApi';
import ErrorText from '../components/ErrorText';

export interface CodeResponse {
  code: string;
}

export interface TokenResponse {
  token: string;
  user_id: string;
}

function LoginScreen(): JSX.Element {
  const [getCode] = useGetCodeMutation();
  const [getToken] = useGetTokenMutation();
  const {reset} = useNavigation<NavigationProp<ParamListBase>>();

  const [state, setState] = React.useState({
    username: {
      value: 'Prerna_Agarwal',
      isError: false,
    },
    password: {
      value: 'Kingkong$1',
      isError: false,
      isSecure: true,
    },
  });

  function setUsername(text: string): void {
    setState({
      ...state,
      username: {value: text, isError: text.length < 3},
    });
  }

  function setPassword(text: string): void {
    setState({
      ...state,
      password: {value: text, isError: text.length < 6, isSecure: true},
    });
  }

  function setSecure(visibility: boolean): void {
    setState({
      ...state,
      password: {...state.password, isSecure: visibility},
    });
  }

  function getTokenAndSetCookies(
    data: {data: CodeResponse} | {error: FetchBaseQueryError | SerializedError},
  ): void {
    if ('data' in data) {
      getToken(data.data).then(() => {
        reset({
          routes: [{name: 'Dashboard'}],
        });
      });
    }
  }

  function handleSubmit(): void {
    const payload = {
      username: state.username.value,
      password: state.password.value,
    };
    if (!state.password.isError && !state.username.isError) {
      getCode(payload).then(getTokenAndSetCookies);
    }
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
        onChangeText={setUsername}
        value={state.username.value}
        left={<TextInput.Icon icon={'account'} size={25} />}
      />
      <ErrorText
        message="Length of username must be greater than 2"
        visibile={state.username.isError}
      />

      {/* -------------------password field------------------ */}
      <TextInput
        label={'password'}
        secureTextEntry={state.password.isSecure}
        activeUnderlineColor={'grey'}
        style={style.inputStyle}
        onChangeText={(text: string): void => {
          setPassword(text);
        }}
        value={state.password.value}
        underlineColor={'transparent'}
        left={<TextInput.Icon icon={'key'} size={25} />}
        right={
          <TextInput.Icon
            icon={'eye'}
            size={25}
            onPress={(): void => {
              setSecure(!state.password.isSecure);
            }}
          />
        }
      />
      <ErrorText
        message="Length of password must be greater than or equal to 6"
        visibile={state.password.isError}
      />

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
