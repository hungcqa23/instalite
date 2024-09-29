import commentApiRequest from '@/api-request/comment';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCommentQuery = () =>
  useQuery({
    queryKey: ['comments'],
    queryFn: commentApiRequest.getAll
  });

// export const useUpdateCommentMutation = () =>
//   useMutation({
//     mutationFn: ({ id, ...body }: { id: string }) => commentApiRequest.updateComment(id, body)
//   });

export const useCreateCommentMutation = () =>
  useMutation({
    mutationFn: ({ content, parentPostId }: { content: string; parentPostId: string }) =>
      commentApiRequest.createComment({
        content,
        parentPostId
      })
  });
