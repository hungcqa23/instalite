import { useQuery } from '@tanstack/react-query';
import { accountApiRequest } from '@/app/api-request/account';

export const useSearch = (username: string) => {
  return useQuery({
    queryKey: ['search', username],
    queryFn: () => accountApiRequest.search(username)
  });
};
