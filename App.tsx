import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import DashBoard from './src/screens/DashBoard';
import SplashScreen from './src/screens/Splash';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {StatusBar, View} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {showLocalNotification} from './src/helpers/NotificationHelper';
import {customStyles} from './src/constants/Styles';

const Stack = createNativeStackNavigator();

const RootNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={DashBoard} />
    </Stack.Navigator>
  );
};

function App(): JSX.Element {
  React.useEffect((): (() => void) => {
    const getFCMToken = async (): Promise<void> => {
      try {
        const token = await messaging().getToken();
        console.log(token);
      } catch (e) {
        console.log(e);
      }
    };
    getFCMToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(JSON.stringify(remoteMessage, null, 2));
      const notification = remoteMessage.notification;
      showLocalNotification({
        title: notification?.title,
        message: notification?.body === undefined ? '' : notification.body,
        image: notification?.android?.imageUrl,
      });
    });

    return unsubscribe;
  }, []);

  return (
    <View style={customStyles.body}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <Provider store={store}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </Provider>
    </View>
  );
}

export default App;
