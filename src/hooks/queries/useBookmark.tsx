import { bookmarkApiRequest } from '@/api-request/bookmark';
import { http } from '@/lib/http';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetBookmarkByPostIdQuery = (postId: string) =>
  useQuery({
    queryKey: ['bookmarks', postId],
    queryFn: () =>
      http.get<{
        message: string;
        data: boolean;
      }>(`/bookmarks/${postId}/check`)
  });

export const useBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => bookmarkApiRequest.bookmark(postId),
    onSuccess: () => {
      // TODO: refresh bookmarks
      queryClient.invalidateQueries({
        queryKey: ['saved']
      });
    }
  });
};

export const useUnBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => bookmarkApiRequest.unBookmark(postId),
    onSuccess: () => {
      // TODO: refresh bookmarks
      queryClient.invalidateQueries({
        queryKey: ['saved']
      });
    }
  });
};
