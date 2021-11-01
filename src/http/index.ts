import axios from 'axios';
import AuthService from '../services/AuthService';

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

$api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

let isRetrying: Promise<void> | undefined = undefined;

$api.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error?.response?.status === 401 &&
      !isRetrying &&
      originalRequest // TODO: глянуть доку axios
    ) {
      isRetrying = new Promise(async (resolve, reject) => {
        try {
          const { data, status } = await AuthService.refresh();
          if (status === 200) {
            window.localStorage.setItem('token', data.accessToken);
            resolve();
          } else {
            reject();
          }
        } catch (error) {
          reject(error);
        }
      });
      try {
        await isRetrying;
        isRetrying = undefined;
        return $api.request(originalRequest);
      } catch (e) {
        return error?.response;
      }
    }
    return error?.response;
  }
);

export default $api;
