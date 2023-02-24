import React from 'react';
import {HelperText} from 'react-native-paper';
import Spacer from './Spacer';

const ErrorText = (props: {
  message: string;
  visibile: boolean;
}): JSX.Element => {
  return (
    <HelperText type="error" visible={props.visibile}>
      {props.message}
      <Spacer space={6} />
    </HelperText>
  );
};

export default ErrorText;
