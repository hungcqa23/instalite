'use client';

import { List } from '@/components/ui';
import CommentItem from '@/components/ui/comment';
import { Post } from '@/types/schema-validations/post.schema';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const ListComment = ({ postId }: { postId: string }) => {
  const { data } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8000/posts/${postId}/comments`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await res.json();
      return data;
    }
  });

  if (!data) return null;
  const comments = data;

  return (
    <div className='w-full border-gray-200 p-0 sm:pb-5'>
      {comments.result &&
        List<Post>({
          listItems: comments.result,
          mapFn: (comment: Post) => <CommentItem comment={comment} key={comment._id} />,
          className: 'w-full'
        })}
    </div>
  );
};

export default ListComment;
