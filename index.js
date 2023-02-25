/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import WebApp from './src/screens/TestScreens/WebApp';
import messaging from '@react-native-firebase/messaging';
import {
  configureNotifications,
  createChannelorNotification,
} from './src/helpers/NotificationHelper';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

configureNotifications();
createChannelorNotification();
AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => WebApp);
