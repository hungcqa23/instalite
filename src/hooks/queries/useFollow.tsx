import { followApiRequest } from '@/api-request/follow';
import { useMutation, useQuery } from '@tanstack/react-query';

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

export const useFollowMutation = () =>
  useMutation({
    mutationFn: (followedUserId: string) => followApiRequest.follow(followedUserId)
  });

export const useUnFollowMutation = () =>
  useMutation({
    mutationFn: (followedUserId: string) => followApiRequest.unfollow(followedUserId)
  });
