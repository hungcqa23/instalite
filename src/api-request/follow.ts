import { http } from '@/lib/http';
import { User } from '@/types/schema-validations/account.schema';

const followApiRequest = {
  getAllFollowers: (username: string) =>
    http.get<{
      data: {
        followedUserId: User;
        _id: string;
      }[];
    }>(`/users/${username}/followers`),
  getAllFollowings: (username: string) =>
    http.get<{
      data: {
        followedUserId: User;
        _id: string;
      }[];
    }>(`/users/${username}/followings`),
  follow: (followedUserId: string) =>
    http.post<{
      message: string;
    }>(`/users/follow`, {
      followedUserId
    }),
  unfollow: (followedUserId: string) =>
    http.post(`/users/unfollow`, {
      followedUserId
    }),
  isFollowing: (username: string) =>
    http.get<{
      message: string;
      data: boolean;
    }>(`/users/${username}/follow`)
};

export { followApiRequest };
