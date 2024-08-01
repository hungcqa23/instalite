import { accountApiRequest } from '@/app/api-request/account';
import { useQuery } from '@tanstack/react-query';

export const useSearch = (username: string) => {
  return useQuery({
    queryKey: ['search', username],
    queryFn: () => accountApiRequest.search(username)
  });
};
