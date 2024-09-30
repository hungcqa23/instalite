'use client';

import { List } from '@/components/ui';
import CommentItem from '@/components/ui/lite/comment';
import { useGetAllCommentByPostIdQuery } from '@/hooks/queries/useComment';
import { Post } from '@/types/schema-validations/post.schema';
import React from 'react';

const ListComment = ({ postId }: { postId: string }) => {
  const { data: commentsData } = useGetAllCommentByPostIdQuery(postId);

  const comments = commentsData?.data || [];

  return (
    <div className='w-full border-gray-200 p-0 sm:pb-5'>
      {comments.length > 0 &&
        List<Post>({
          listItems: comments,
          mapFn: comment => <CommentItem comment={comment} key={comment._id} />,
          className: 'w-full'
        })}
    </div>
  );
};

export default ListComment;
