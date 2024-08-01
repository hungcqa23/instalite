import { http } from '@/lib/http';
import { LoginBodyType } from '@/schema-validations/auth.schema';

const authApiRequest = {
  login: (body: LoginBodyType) => http.post('/auth/login', body),
  // register: (body: RegisterBodyType) => http.post('/auth/register', body),
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
    ),
  auth: (body: Response) =>
    http.post('/api/auth/login', body, {
      baseUrl: ''
    })
};

export default authApiRequest;
