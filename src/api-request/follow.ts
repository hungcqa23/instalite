import { http } from '@/lib/http';
import { User } from '@/types/schema-validations/account.schema';

const followApiRequest = {
  getAllFollowers: (username: string) =>
    http.get<{
      message: string;
      data: User[];
    }>(`/users/${username}/followers`),
  getAllFollowings: (username: string) =>
    http.get<{
      message: string;
      data: User[];
    }>(`/users/${username}/followings`)
};

export { followApiRequest };
