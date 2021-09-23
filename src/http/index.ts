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

$api.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const originalRequest = error.config;
    originalRequest.isRetry = false;
    if (
      error?.response?.status === 401 &&
      originalRequest &&
      !originalRequest.isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        const { data, status } = await AuthService.refresh();
        if (status === 200) {
          window.localStorage.setItem('token', data.accessToken);
          return $api.request(originalRequest);
        }
      } catch (error) {
        originalRequest.isRetry = true;
      }
    }
    return error?.response;
  }
);

export default $api;
