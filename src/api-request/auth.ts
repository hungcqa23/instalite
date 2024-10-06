import { http } from '@/lib/http';
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType
} from '@/types/schema-validations/auth.schema';

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>('auth/login', body),
  serverLogin: (body: LoginBodyType) =>
    http.post<LoginResType>('/auth/login', body, {
      credentials: 'include'
    }),

  register: (body: RegisterBodyType) => http.post<RegisterResType>('/auth/sign-up', body),
  logoutService: () => http.post('/auth/logout', null, { baseUrl: '' }),
  logoutFromNextClientToNextServer: () => http.post('/api/auth/logout', null, { baseUrl: '' })
};

export { authApiRequest };
