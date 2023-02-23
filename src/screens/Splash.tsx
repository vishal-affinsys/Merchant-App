import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import CookieManager, {Cookies} from '@react-native-cookies/cookies';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

const SplashScreen = (): JSX.Element => {
  const {reset} = useNavigation<NavigationProp<ParamListBase>>();

  function checkLoginStatus() {
    console.log('---Check login Status---');
    CookieManager.get('https://dev.studio.bankbuddy.me/').then(
      (data: Cookies): void => {
        if (JSON.stringify(data).length === 2) {
          reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        } else {
          reset({
            index: 0,
            routes: [{name: 'Dashboard'}],
          });
        }
      },
    );
  }
  React.useEffect(() => {
    checkLoginStatus();
  });
  return (
    <View style={style.body}>
      <Image
        style={style.imageStyle}
        source={require('../assets/affinsys-logo.png')}
      />
      <ActivityIndicator />
    </View>
  );
};

const style = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: 200,
    alignSelf: 'center',
    width: 200,
    marginBottom: 30,
  },
});

export default SplashScreen;
