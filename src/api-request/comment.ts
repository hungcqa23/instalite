import { http } from '@/lib/http';
import { Post } from '@/types/schema-validations/post.schema';

const commentApiRequest = {
  getCommentsByPostId: (postId: string) =>
    http.get<{
      data: Post[];
    }>(`/posts/${postId}/comments`),
  getAll: (postId: string) => http.get<{}>(`/posts/${postId}/comments`),
  updateComment: (id: string, body: { content: string }) => http.patch(`/posts/${id}`, body),
  createComment: ({ content, parentPostId }: { content: string; parentPostId: string }) =>
    http.post('/posts', { content, parentPostId, typePost: 2 })
};

export default commentApiRequest;
