import CookieManager from '@react-native-cookies/cookies';

const options = {
  headers: {
    accept: 'application/json, text/plain, */*',
    'accept-language': 'en-GB,en;q=0.6',
    'content-type': 'application/json',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'sec-gpc': '1',
  },
};

export const LoginUser = (reset: Function) => {
  fetch(
    'https://dev.studio.bankbuddy.me/auth-provider-internal-users/authlib/authorize/',
    {
      headers: options.headers,
      referrer: 'https://dev.studio.bankbuddy.me/console/login',
      //   referrerPolicy: 'strict-origin-when-cross-origin',
      body: '{"username":"Prerna_Agarwal","password":"Kingkong$1"}',
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
    },
  ).then(data =>
    data.json().then(res => {
      fetch(
        'https://dev.studio.bankbuddy.me/auth/broker/authentication/token/auth_provider_internal',
        {
          headers: options.headers,
          referrer: 'https://dev.studio.bankbuddy.me/console/login',
          //   referrerPolicy: 'strict-origin-when-cross-origin',
          body: JSON.stringify(res),
          method: 'POST',
          mode: 'cors',
          credentials: 'omit',
        },
      ).then(toke =>
        toke.json().then(cookies => {
          const values = {
            domain: 'dev.studio.bankbuddy.me',
            name: 'auth_token',
            value: cookies.token,
            httpOnly: false,
            path: '/',
            expires: new Date(
              new Date().getTime() + 60 * 60 * 24 * 1000,
            ).toDateString(),
            secure: true,
          };
          CookieManager.set('https://dev.studio.bankbuddy.me/', values).then(
            (): void => {
              reset({
                index: 0,
                routes: [{name: 'Dashboard'}],
              });
            },
          );
        }),
      );
    }),
  );
};
