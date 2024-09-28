import { followApiRequest } from '@/api-request/follow';
import { useQuery } from '@tanstack/react-query';

export const useGetAllFollowersQuery = (username: string) =>
  useQuery({
    queryKey: ['followers', username],
    queryFn: () => followApiRequest.getAllFollowers(username)
  });

export const useGetAllFollowingsQuery = (username: string) =>
  useQuery({
    queryKey: ['followings', username],
    queryFn: () => followApiRequest.getAllFollowings(username)
  });
