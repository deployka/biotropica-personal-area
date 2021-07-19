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

let isRetry = false;

$api.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest && !isRetry) {
      isRetry = true;
      try {
        const { data } = await AuthService.refresh();
        window.localStorage.setItem('token', data.accessToken);
      } catch (error) {}

      return $api.request(originalRequest);
    }
    return error;
  }
);

export default $api;
