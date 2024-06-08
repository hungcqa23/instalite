import { http } from '@/lib/http';

export const accountApiRequest = {
  me: () => http.get('/users/me'),
  search: (username: string) => http.get(`/users?username=${username}`)
};
