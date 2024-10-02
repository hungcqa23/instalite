import { accountApiRequest } from '@/api-request/account';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: accountApiRequest.update
  });
};

export const useUploadAvatarMutation = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: accountApiRequest.uploadAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });
};

export const useGetUserByUsernameQuery = (username: string) =>
  useQuery({
    queryKey: ['profile', username],
    queryFn: () => accountApiRequest.getUserByUsername(username)
  });

// export const useGetUserByUsernameMutation = (username: string) => {};
