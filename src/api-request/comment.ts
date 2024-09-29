import { http } from '@/lib/http';

const commentApiRequest = {
  getCommentsByPostId: async (postId: string, accessToken: string) => {
    const res = await fetch(`http://localhost:8000/posts/${postId}/comments`, {
      method: 'GET',
      headers: {
        Cookie: `access_token=${accessToken}`
      },
      credentials: 'include'
    });
    return await res.json();
  },
  getAll: () => http.get('/comments'),
  updateComment: (id: string, body: { content: string }) => http.patch(`/posts/${id}`, body),
  createComment: ({ content, parentPostId }: { content: string; parentPostId: string }) =>
    http.post('/posts', { content, parentPostId, typePost: 2 })
};

export default commentApiRequest;
