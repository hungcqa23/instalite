import { likeApiRequest } from '@/api-request/like';
import { http } from '@/lib/http';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetLikeByPostIdQuery = (postId: string) =>
  useQuery({
    queryKey: ['likes', postId],
    queryFn: () =>
      http.get<{
        message: string;
        result: boolean;
      }>(`/likes/${postId}`)
  });

export const useLikeMutation = () =>
  useMutation({
    mutationFn: (postId: string) => likeApiRequest.like(postId)
  });

export const useUnlikeMutation = () =>
  useMutation({
    mutationFn: (postId: string) => likeApiRequest.unLike(postId)
  });
