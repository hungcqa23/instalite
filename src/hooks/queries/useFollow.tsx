import { followApiRequest } from '@/api-request/follow';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetAllFollowersQuery = (username: string) =>
  useQuery({
    queryKey: ['follow', 'followers', username],
    queryFn: () => followApiRequest.getAllFollowers(username)
  });

export const useGetAllFollowingsQuery = (username: string) =>
  useQuery({
    queryKey: ['follow', 'followings', username],
    queryFn: () => followApiRequest.getAllFollowings(username)
  });

export const useFollowMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (followedUserId: string) => followApiRequest.follow(followedUserId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['follow'] })
  });
};

export const useUnFollowMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (followedUserId: string) => followApiRequest.unfollow(followedUserId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['follow'] })
  });
};

export const useGetIsFollowingQuery = (username: string) =>
  useQuery({
    queryKey: ['follow', username],
    queryFn: () => followApiRequest.isFollowing(username)
  });
