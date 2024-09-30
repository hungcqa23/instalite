import { accountApiRequest } from '@/api-request/account';
import { QueryClient, useMutation } from '@tanstack/react-query';

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: accountApiRequest.update
  });
};

export const useUploadAvatarMutation = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: accountApiRequest.uploadAvatar,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] })
  });
};