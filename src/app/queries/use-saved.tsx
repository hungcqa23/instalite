import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

const accessToken = getCookie('access_key');
export const useSaved = () => {
  return useQuery({
    queryKey: ['saved'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8000/bookmarks/me', {
        method: 'GET',
        headers: {
          Cookie: `access_token=${accessToken}`
        },
        credentials: 'include'
      });

      const data = await res.json();
      return data;
    }
  });
};

export const usePostSaved = (postId: string) => {
  return useQuery({
    queryKey: ['bookmarks', postId],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8000/bookmarks/${postId}/check`,
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
