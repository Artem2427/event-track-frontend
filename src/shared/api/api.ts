import AppEnvironmentService from '@shared/services/env.service';
import { storageService } from '@shared/services/storage.service';
import { ACCESS_TOKEN_KEY } from '@shared/utils/constants';
import axios, { type AxiosError } from 'axios';

export const api = axios.create({
  baseURL: AppEnvironmentService.apiUrl,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  console.log(storageService.get(ACCESS_TOKEN_KEY), 'access-token');
  console.log(localStorage.getItem(ACCESS_TOKEN_KEY));

  config.headers.Authorization = `Bearer ${storageService.get(ACCESS_TOKEN_KEY)}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401 && error.config) {
      try {
        // const res = await axios.post(
        //   `${AppEnvironmentService.apiUrl}/auth/admin/refresh-token`,
        //   {
        //     refreshToken: Cookies.get('refresh-token'),
        //   },
        // );
        // if (res.data) {
        // Cookies.set('access-token', res.data.accessToken, {
        //   secure: true,
        //   domain: AppEnvironmentService.domain,
        // });
        // Cookies.set('refresh-token', res.data.refreshToken);
        // }
        // return api.request(error.config);
      } catch (refreshError) {
        // Cookies.remove('access-token');
        storageService.remove(ACCESS_TOKEN_KEY);
        localStorage.clear();
        window.location.href = `${AppEnvironmentService.apiUrl}/login?redirectUrl=${window.location.href}`;
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
