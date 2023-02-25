import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import ErrorText from '../components/ErrorText';
import {useLoginFormController} from '../helpers/LoginControllers';
import SnackbarX from '../components/Snackbar';

function LoginScreen(): JSX.Element {
  const {
    state,
    error,
    message,
    handleSubmit,
    setPassword,
    setUsername,
    setSecure,
    setError,
  } = useLoginFormController();

  return (
    <SnackbarX
      message={message}
      duration={1000}
      setError={setError}
      visible={error}>
      <View style={style.body}>
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
    </SnackbarX>
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
