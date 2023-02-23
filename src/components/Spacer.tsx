import React from 'react';
import {View} from 'react-native';

const Spacer = (props: {margin: number}): JSX.Element => {
  return <View style={{marginVertical: props.margin}} />;
};
export default Spacer;
