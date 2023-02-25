import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';

export const createChannelorNotification = (): void => {
  PushNotification.createChannel(
    {
      channelId: '123',
      channelName: 'My channel',
      channelDescription: 'A channel to categorise your notifications',
      vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`),
  );
};

export const configureNotifications = () => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);
    },
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
  });
};

export const showLocalNotification = (props: {
  title: string | undefined;
  message: string;
  image: string | undefined;
}): void => {
  PushNotification.localNotification({
    channelId: '123',
    autoCancel: true,
    title: props.title,
    message: props.message,
    bigPictureUrl: props.image,
    vibrate: false,
    vibration: 300,
    playSound: true,
    usesChronometer: true,
    soundName: 'default',
  });
};
