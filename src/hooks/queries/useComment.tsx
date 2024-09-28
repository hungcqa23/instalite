import commentApiRequest from '@/api-request/comment';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCommentQuery = () => {
  return useQuery({
    queryKey: ['comments'],
    queryFn: commentApiRequest.getAll
  });
};

// export const useUpdateCommentMutation = () => {
//   return useMutation({
//     mutationFn: ({ id, ...body }: { id: string }) =>
//       commentApiRequest.updateComment(id, body)
//   });
// };
