import { http } from '@/lib/http';
import { User } from '@/types/schema-validations/account.schema';

const accountApiRequest = {
  me: () => http.get('/users/me'),
  search: (username: string) =>
    http.get<{
      message: string;
      data?: User[];
    }>(`/users?username=${username}`),
  recommend: () => http.get(`/users/recommend`),
  follow: (followedUserId: string) =>
    http.post('/users/follow', {
      followedUserId
    }),
  unFollow: (followedUserId: string) =>
    http.delete(`/users/follow`, {
      followedUserId
    })
};

export { accountApiRequest };
