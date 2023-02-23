export const BASE_URL = 'https://dev.studio.bankbuddy.me/';

// export const ENDPOINT = {
//   getCode: BASE_URL + 'auth-provider-internal-users/authlib/authorize/',
//   getToken:
//     BASE_URL + 'auth/broker/authentication/token/auth_provider_internal',
// };
export const endpoints = {
  getCode: 'auth-provider-internal-users/authlib/authorize/',
  getToken: 'auth/broker/authentication/token/auth_provider_internal',
};

// https://dev.studio.bankbuddy.me/auth-provider-internal-users/authlib/authorize/
// 'https://dev.studio.bankbuddy.me/auth/broker/authentication/token/auth_provider_internal',

// export const LoginUser = (reset: Function): void => {
//   fetch(ENDPOINT.getCode, {
//     referrer: 'https://dev.studio.bankbuddy.me/console/login',
//     body: '{"username":"Prerna_Agarwal","password":"Kingkong$1"}',
//     method: 'POST',
//     mode: 'cors',
//     credentials: 'omit',
//   }).then(
//     (data: Response): Promise<void> =>
//       data.json().then(res => {
//         fetch(ENDPOINT.getToken, {
//           referrer: 'https://dev.studio.bankbuddy.me/console/login',
//           body: JSON.stringify(res),
//           method: 'POST',
//           mode: 'cors',
//           credentials: 'omit',
//         }).then(
//           (toke: Response): Promise<void> =>
//             toke.json().then(cookies => {
//               const values = {
//                 domain: 'dev.studio.bankbuddy.me',
//                 name: 'auth_token',
//                 value: cookies.token,
//                 httpOnly: false,
//                 path: '/',
//                 expires: new Date(
//                   new Date().getTime() + 60 * 60 * 24 * 1000,
//                 ).toDateString(),
//                 secure: true,
//               };
//               CookieManager.set(
//                 'https://dev.studio.bankbuddy.me/',
//                 values,
//               ).then((): void => {
//                 reset({
//                   index: 0,
//                   routes: [{name: 'Dashboard'}],
//                 });
//               });
//             }),
//         );
//       }),
//   );
// };
