import { postApiRequest } from '@/api-request/post';
import { http } from '@/lib/http';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

const accessToken = getCookie('access_key');
export const usePostByUsername = (username: string) => {
  return useQuery({
    queryKey: ['posts', username],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8000/posts/${username}/username`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      return data;
    }
  });
};

export const useGetAllPostsQuery = () =>
  useQuery({
    queryKey: ['posts'],
    queryFn: postApiRequest.getAll
  });

export const useSummarizeLiteMutation = () =>
  useMutation({
    mutationFn: async (formData: FormData) => {
      return await http.post<{
        content?: string;
      }>('/files/summary', formData);
    }
  });

export const useUpdateVideoMutation = () =>
  useMutation({
    mutationFn: async ({
      commentPostId,
      formData
    }: {
      commentPostId: string;
      formData: FormData;
    }) => {
      const res = await fetch(`http://localhost:8000/posts/${commentPostId}/upload-hls`, {
        method: 'PUT',
        body: formData
      });
      return await res.json();
    }
  });

export const useUpdatePostMutation = () =>
  useMutation({
    mutationFn: async ({
      commentPostId,
      formData
    }: {
      commentPostId: string;
      formData: FormData;
    }) => {
      const res = await fetch(`http://localhost:8000/posts/${commentPostId}`, {
        method: 'PUT',
        body: formData
      });
      return await res.json();
    }
  });

export const useUpdateCommentMutation = () =>
  useMutation({
    mutationFn: ({ postId, content }: { postId: string; content: string }) =>
      postApiRequest.update({
        postId,
        content
      })
  });

export const useDeletePostMutation = () =>
  useMutation({
    mutationFn: (postId: string) =>
      http.delete(`/posts/${postId}`, {
        headers: {
          Cookie: `access_token=${accessToken}`
        }
      })
  });
