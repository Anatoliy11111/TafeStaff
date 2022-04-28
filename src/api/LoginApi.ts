import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '349cf95a-49da-4942-acfa-dfd68a7ef423',
  },
});

export const isLoginApi = {
  isLogin(data: authType) {
    return instance.post<authType>('auth/login', data);
  },
  me() {
    return instance.get<isLoginGetType>('auth/me');
  },
};

export type authType = {
  password: string;
  email: string;
  rememberMe: boolean;
};

type isLoginGetType = {
  resultCode: number;
  messages: [];
  data: {
    email: string;
    id: number;
    login: string;
  };
};
