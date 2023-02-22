import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function HomeScreen(): JSX.Element {
  return (
    <View style={style.body}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default HomeScreen;

const style = StyleSheet.create({
  body: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
