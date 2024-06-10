'use client';
import CommentItem from '@/components/ui/comment-item';
import List from '@/components/ui/list';
import { Post } from '@/schema-validations/post.schema';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import React from 'react';

export default function ListComment({ postId }: { postId: string }) {
  const accessToken = getCookie('access_key');
  const { data } = useQuery({
    queryKey: ['comments', postId, accessToken],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8000/posts/${postId}/comments`,
        {
          method: 'GET',
          headers: {
            Cookie: `access_token=${accessToken}`
          },
          credentials: 'include'
        }
      );

      const data = await res.json();
      return data;
    }
  });

  if (!data) return null;
  const comments = data;
  console.log(comments.result);

  return (
    <div className=' w-full border-b-[1px] border-gray-200 p-0 sm:pb-5 '>
      {comments.result &&
        List<Post>({
          listItems: comments.result,
          mapFn: (comment: Post) => (
            <CommentItem comment={comment} key={comment._id} />
          ),
          className: 'w-full'
        })}
    </div>
  );
}
