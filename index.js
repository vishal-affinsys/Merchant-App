/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import WebApp from './src/screens/TestScreens/WebApp';
import {
  configureNotifications,
  createChannelorNotification,
} from './src/helpers/NotificationHelper';

configureNotifications();
createChannelorNotification();
AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => WebApp);
