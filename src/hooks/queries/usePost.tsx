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
      return await http.post('/files/summary', formData);
    }
  });
