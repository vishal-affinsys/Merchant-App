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
import {customStyles} from '../constants/Styles';

const DashBoard = (): JSX.Element => {
  const webViewRef = React.useRef<WebView>(null);

  const onAndroidBackPress = (): boolean => {
    if (webViewRef.current) {
      webViewRef?.current?.goBack();
      return true; // prevent default behavior (exit DashBoard)
    }
    return false;
  };

  React.useEffect(() => {
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
        source={{uri: 'https://dev.studio.bankbuddy.me/console/dashboard'}}
        startInLoadingState={true}
        onMessage={handleOnMessage}
        allowsFullscreenVideo={true}
        bounces={true}
        renderLoading={(): JSX.Element => <ActivityIndicator />}
        contentMode={'mobile'}
        allowFileAccess={true}
        scalesPageToFit={true}
        sharedCookiesEnabled={true}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
    </View>
  );
};
export default DashBoard;
