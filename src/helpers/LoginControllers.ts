import React from 'react';
import {useGetCodeMutation, useGetTokenMutation} from '../store/LoginApi';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {SerializedError} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';

export interface CodeResponse {
  code: string;
}

export interface TokenResponse {
  token: string;
  user_id: string;
}

export const useLoginFormController = () => {
  const [getCode, code] = useGetCodeMutation();
  const [getToken, token] = useGetTokenMutation();
  const {reset} = useNavigation<NavigationProp<ParamListBase>>();
  const [error, setError] = React.useState(code.isError);
  const [message, setMessage] = React.useState('');

  const [state, setState] = React.useState({
    username: {
      value: 'vishal',
      isError: false,
    },
    password: {
      value: 'Change@0987!',
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

  function resetNavigation(name: string): void {
    reset({
      routes: [{name: name}],
    });
  }

  function getTokenAndSetCookies(
    data: {data: CodeResponse} | {error: FetchBaseQueryError | SerializedError},
  ): void {
    if ('code' in data) {
      getToken(data).then((): void => resetNavigation('Dashboard'));
    }
  }

  async function handleSubmit(): Promise<void> {
    const payload = {
      username: state.username.value,
      password: state.password.value,
    };
    if (!state.password.isError && !state.username.isError) {
      getCode(payload)
        .unwrap()
        .then(getTokenAndSetCookies)
        .catch(e => {
          setMessage(e.data.errors[0].detail);
          setError(true);
        });
    }
  }

  const loading = code.isLoading || token.isLoading;

  return {
    state,
    error,
    message,
    loading,
    handleSubmit,
    setPassword,
    setUsername,
    setSecure,
    setError,
  };
};
