import React from 'react';
import {
  View,
  ActivityIndicator,
  Platform,
  BackHandler,
  StatusBar,
} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {customStyles} from '../constants/Styles';
import {WebViewErrorEvent} from 'react-native-webview/lib/WebViewTypes';
import {getCookies} from '../helpers/CookieManager';

const DashBoard = (): JSX.Element => {
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
      getCookies();
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

  const WebAPICode = `
  const { fetch: originalFetch } = window;

  window.fetch = async (...args) => {
      let [resource, config ] = args;
      // request interceptor here
      const response = await originalFetch(resource, config);
      await window.ReactNativeWebView.postMessage(JSON.stringify(config));
      // response interceptor here
      return response;
  };
  `;

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
        injectedJavaScript={WebAPICode}
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
export default DashBoard;
