import { postApiRequest } from '@/api-request/post';
import { http } from '@/lib/http';
import { Post } from '@/types/schema-validations/post.schema';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

const accessToken = getCookie('access_key');
export const usePostByUsername = (username: string) => {
  return useQuery({
    queryKey: ['posts', username],
    queryFn: async () =>
      http.get<{
        message: string;
        data: Post[];
      }>(`/posts/${username}/username`)
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
    mutationFn: async ({ postId, formData }: { postId: string; formData: FormData }) =>
      http.put(`/posts/${postId}/upload-hls`, formData)
    // const res = await fetch(`http://localhost:8000/posts/${postId}/upload-hls`, {
    //   method: 'PUT',
    //   body: formData
    // });
    // return await res.json();
  });

export const useUpdatePostMutation = () =>
  useMutation({
    mutationFn: async ({ postId, formData }: { postId: string; formData: FormData }) =>
      http.put(`/posts/${postId}`, formData)
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

export const useCreatePostMutation = () =>
  useMutation({
    mutationFn: (content: string) =>
      postApiRequest.create({
        content
      })
  });
