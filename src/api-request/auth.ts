import { LoginBodyType } from '@/app/schema-validations/auth.schema';
import { http } from '@/lib/http';

const authApiRequest = {
  login: (body: LoginBodyType) => http.post('/auth/login', body),
  // register: (body: RegisterBodyType) => http.post('/auth/register', body),
  logout: () => http.post('/auth/logout', ''),
  auth: (body: Response) =>
    http.post('/api/auth/login', body, {
      baseUrl: ''
    })
};

export default authApiRequest;
