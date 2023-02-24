import React from 'react';
import {
  View,
  ActivityIndicator,
  Platform,
  BackHandler,
  StatusBar,
} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import CookieManager, {Cookies} from '@react-native-cookies/cookies';
import {customStyles} from '../../constants/Styles';
import {WebViewErrorEvent} from 'react-native-webview/lib/WebViewTypes';
import PushNotification from 'react-native-push-notification';

const WebApp = (): JSX.Element => {
  const webViewRef = React.useRef<WebView>(null);

  const onAndroidBackPress = (): boolean => {
    if (webViewRef.current) {
      webViewRef?.current?.goBack();
      return true;
    }
    return false;
  };

  React.useEffect((): (() => void) | undefined => {
    if (Platform.OS === 'android') {
      CookieManager.get('https://dev.studio.bankbuddy.me/').then(
        (data: Cookies): void => {
          console.log(data);
        },
      );
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      return (): void => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onAndroidBackPress,
        );
      };
    }
  }, []);

  function handleOnMessage(event: WebViewMessageEvent): void {
    console.log('Message from webview:', event.nativeEvent);
    const {data} = event.nativeEvent;
    const dataObject = JSON.parse(data);
    if (dataObject.type === 'Notification') {
      PushNotification.localNotification({
        channelId: '123', //same as passed while setting up the at time of creating channel
        autoCancel: true,
        title: 'Message from webview',
        message: `Username: ${dataObject.message.username}\nPassword: ${dataObject.message.password}`,
        vibrate: false,
        vibration: 300,
        playSound: true,
        soundName: 'default',
      });
    }
  }

  return (
    <View style={customStyles.body}>
      <StatusBar
        translucent={false}
        backgroundColor={'white'}
        barStyle={'dark-content'}
      />
      <WebView
        ref={webViewRef}
        allowsBackForwardNavigationGestures={true}
        source={{uri: 'http://192.168.0.151:3000'}}
        startInLoadingState={true}
        onMessage={handleOnMessage}
        allowsFullscreenVideo={true}
        bounces={true}
        renderLoading={(): JSX.Element => <ActivityIndicator />}
        contentMode={'mobile'}
        allowFileAccess={true}
        scalesPageToFit={true}
        sharedCookiesEnabled={true}
        onError={(syntheticEvent: WebViewErrorEvent): void => {
          const {nativeEvent} = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
    </View>
  );
};
export default WebApp;
