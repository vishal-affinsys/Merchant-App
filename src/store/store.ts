import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {LoginApi} from './LoginApi';

export const store = configureStore({
  reducer: {
    [LoginApi.reducerPath]: LoginApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([LoginApi.middleware]),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
