import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import { NotificationType } from '../components/GlobalNotifications/GlobalNotifications';
import { eventBus, EventTypes } from '../services/EventBus';
import { HTTP_UNAUTHORIZED } from './httpConstants';

type FetchArguments = Omit<FetchArgs, 'method'> & {
  method: 'PUT' | 'DELETE' | 'GET' | 'POST' | 'PATCH';
};

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BACKEND_URL,
  credentials: 'include',
});

export const baseQueryWithReauth: BaseQueryFn<
  FetchArguments,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === HTTP_UNAUTHORIZED) {
    const refreshResult = await baseQuery(
      { url: '/auth/refresh', method: 'POST' },
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery(
        { url: '/auth/signout', method: 'POST' },
        api,
        extraOptions,
      );
      eventBus.emit(EventTypes.notification, {
        message: 'Ваша сессия истекла :( Войдите в аккаунт повторно',
        type: NotificationType.INFO,
      });
      return result;
    }
  }

  return result;
};
