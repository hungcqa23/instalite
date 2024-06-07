import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Comment } from '@/types/comment.type';
import React from 'react';

export default function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className='my-1 w-full border-b-[1px] border-gray-200 p-0'>
      <div className='mb-2 flex flex-row'>
        <Avatar className='z-[-1] mt-0.5 h-8 w-8'>
          <AvatarImage src={comment.avatar} alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='ms-2.5 flex w-full flex-col justify-start '>
          <div className='flex flex-row justify-between '>
            <span className='text-xs font-semibold'>{comment.username}</span>
            <span className='text-xs font-normal text-gray-500'>
              {comment.createdAt}
            </span>
          </div>
          <p className='mt-1 text-[0.8125rem]'>{comment.content}</p>
        </div>
      </div>
    </div>
  );
}