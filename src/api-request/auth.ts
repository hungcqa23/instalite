import { http } from '@/lib/http';
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType
} from '@/types/schema-validations/auth.schema';

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>('auth/login', body),
  serverLogin: (body: LoginBodyType) => {
    return http.post<LoginResType>('/auth/login', body, {
      credentials: 'include'
    });
  },
  register: (body: RegisterBodyType) =>
    http.post<RegisterResType>('/auth/register', body),
  logoutFromNextClientToServer: (
    force?: boolean | undefined,
    signal?: AbortSignal | undefined
  ) =>
    http.post(
      '/api/auth/logout',
      {
        force,
        postId: 'helloworld'
      },
      {
        baseUrl: '',
        signal
      }
    )
};

export { authApiRequest };
