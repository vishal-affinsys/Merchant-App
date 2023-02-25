import CookieManager, {Cookie, Cookies} from '@react-native-cookies/cookies';
import {BASE_URL} from './UserLogin';

export function setCookies(data: any): void {
  const values: Cookie = {
    domain: 'dev.studio.bankbuddy.me',
    name: 'auth_token',
    httpOnly: false,
    value: data.token,
    path: '/',
    expires: new Date(
      new Date().getTime() + 60 * 60 * 24 * 1000,
    ).toDateString(),
    secure: true,
  };
  CookieManager.set(BASE_URL, values);
}

export function getCookies(): void {
  CookieManager.get(BASE_URL).then((data: Cookies): void => {
    console.log(data);
  });
}
