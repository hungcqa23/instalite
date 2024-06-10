export const commentApiRequest = {
  getCommentsByPostId: async (postId: string, accessToken: string) => {
    const res = await fetch(`http://localhost:8000/posts/${postId}/comments`, {
      method: 'GET',
      headers: {
        Cookie: `access_token=${accessToken}`
      },
      credentials: 'include'
    });
    return await res.json();
  }
};
