import { bookmarkApiRequest } from '@/api-request/bookmark';
import { http } from '@/lib/http';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetBookmarkByPostIdQuery = (postId: string) =>
  useQuery({
    queryKey: ['bookmarks', postId],
    queryFn: () =>
      http.get<{
        message: string;
        data: boolean;
      }>(`/bookmarks/${postId}/check`)
  });

export const useBookmarkMutation = () =>
  useMutation({
    mutationFn: (postId: string) => bookmarkApiRequest.bookmark(postId)
  });

export const useUnBookmarkMutation = () =>
  useMutation({
    mutationFn: (postId: string) => bookmarkApiRequest.unBookmark(postId)
  });
