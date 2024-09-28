import { postApiRequest } from '@/api-request/post';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

const accessToken = getCookie('access_key');
export const usePostByUsername = (username: string) => {
  return useQuery({
    queryKey: ['posts', username],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8000/posts/${username}/username`,
        {
          method: 'GET',
          headers: {
            Cookie: `access_token=${accessToken}`
          },
          credentials: 'include'
        }
      );
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
