import { LoginData, RegistrationData, SessionPayload, UserDataMongoose } from '@/types/types';
import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
});

// instance.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
//   return config;
// });

const API = {
  auth: {
    registration: (body: RegistrationData) =>
      instance.post<UserDataMongoose & { accessToken: string; refreshToken: string }>(
        '/auth/registration',
        body,
      ),
    login: (body: LoginData) =>
      instance.post<UserDataMongoose & { accessToken: string; refreshToken: string }>(
        '/auth/login',
        body,
      ),
    refresh: () =>
      instance.post<UserDataMongoose & { accessToken: string; refreshToken: string }>(
        '/auth/refresh',
      ),
    logout: () => instance.post('/auth/logout'),
  },
  user: {
    me: () => instance.get('/user/me'),
    getSessionDB: (token: string) => instance.post('/session', token),
  },
};
export default API;
