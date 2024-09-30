import commentApiRequest from '@/api-request/comment';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetAllCommentByPostIdQuery = (postId: string) =>
  useQuery({
    queryKey: ['comments', postId],
    queryFn: () => commentApiRequest.getCommentsByPostId(postId)
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
