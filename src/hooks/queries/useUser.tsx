import { accountApiRequest } from '@/api-request/account';
import { useMutation } from '@tanstack/react-query';

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: accountApiRequest.update
  });
};
