import axios from 'axios';
import { NotificationType } from '../components/GlobalNotifications/GlobalNotifications';
import AuthService from '../services/AuthService';
import { eventBus, EventTypes } from '../services/EventBus';
import {
  HTTP_BAD_REQUEST,
  HTTP_SUCCESS,
  HTTP_UNAUTHORIZED,
} from './httpConstants';

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

$api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

let isRetrying: Promise<void> | undefined;

const exceptions = ['/auth/refresh', 'auth/signin'];

$api.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const message = error?.response?.data?.message;
    const statusCode = error?.response?.data?.statusCode;
    if (message && statusCode === HTTP_BAD_REQUEST) {
      const type = NotificationType.DANGER;
      console.log(type);
      eventBus.emit(EventTypes.notification, {
        type,
        message,
      });
    }

    const originalRequest = error.config;
    if (!originalRequest || error?.response?.status !== HTTP_UNAUTHORIZED) {
      throw error;
    }

    if (exceptions.includes(originalRequest.url)) {
      throw error;
    }

    if (isRetrying) {
      await isRetrying;
      return $api.request(originalRequest);
    }
    isRetrying = new Promise((resolve, reject) => {
      try {
        AuthService.refresh()
          .then(({ data, status }) => {
            if (status === HTTP_SUCCESS) {
              window.localStorage.setItem('token', data.accessToken);
              resolve();
            } else {
              reject();
            }
          })
          .catch(reject);
      } catch (error) {
        reject(error);
      }
    });
    try {
      await isRetrying;
      isRetrying = undefined;
      return await $api.request(originalRequest);
    } catch (e) {
      isRetrying = undefined;
      await AuthService.signout();
      eventBus.emit(EventTypes.routerPush, '/signin');
      throw e;
    }
  },
);

export default $api;
