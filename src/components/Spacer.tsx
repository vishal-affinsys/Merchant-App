import React from 'react';
import {View} from 'react-native';

const Spacer = (props: {space: number}): JSX.Element => {
  return <View style={{marginVertical: props.space}} />;
};
export default Spacer;
