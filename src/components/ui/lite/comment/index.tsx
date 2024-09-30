'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui';
import { EllipsisIcon } from '@/components/ui/icons';
import { calculateTimeAgo } from '@/lib/helper';
import { useUserStore } from '@/stores/user.stores';
import { Post } from '@/types/schema-validations/post.schema';
import { MediaPlayer, MediaProvider, Poster, Track } from '@vidstack/react';
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import '@vidstack/react/player/styles/default/theme.css';
import { Pencil, Trash } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import DeleteCommentDialog from './delete-comment-dialog';
import EditCommentDialog from './edit-comment-dialog';

const CommentMedia = ({
  media,
  commentId
}: {
  media?: {
    type: number;
    url: string;
  };
  commentId?: string;
}) => {
  if (media?.type === 0) {
    return (
      <div className='my-3'>
        <Image
          src={media.url}
          alt='image'
          width={200}
          height={200}
          className='rounded-md border-2'
        />
      </div>
    );
  }

  if (media?.type === 1) {
    return (
      <MediaPlayer
        src={`http://localhost:8000/files/video-hls/${commentId}/master.m3u8`}
        viewType='video'
        streamType='on-demand'
        logLevel='warn'
        crossOrigin
        playsInline
        className='my-3'
        title='Sprite Fight'
        poster='https://files.vidstack.io/sprite-fight/poster.webp'
      >
        <MediaProvider />
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    );
  }

  return null;
};

export default function CommentItem({ comment }: { comment: Post }) {
  const { user } = useUserStore();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const isCurrentUser = user?._id === comment?.userId?._id;
  return (
    <>
      <div className='my-3 w-full border-b-[1px] border-gray-200 p-0'>
        <div className='mb-2 flex flex-row'>
          <Avatar className='z-[-1] mt-0.5 h-8 w-8'>
            <AvatarImage src={comment?.userId?.avatar} alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className='ms-2.5 flex w-full flex-col justify-start'>
            <div className='flex flex-row items-center justify-between'>
              <div className='flex flex-row gap-1'>
                <span className='text-xs font-semibold'>{comment?.userId?.username}</span>
                <span className='text-xs font-normal text-gray-500'>
                  {calculateTimeAgo(comment?.createdAt)}
                </span>
              </div>

              {isCurrentUser && (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant={'link'} className='me-1 h-5 w-5 px-0'>
                      <EllipsisIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align='end'
                    className='-ms-3 w-52 rounded-lg py-2 shadow-default dark:bg-zinc-950'
                  >
                    <DropdownMenuItem
                      className='cursor-pointer gap-2 rounded-md font-medium'
                      onClick={() => setOpenDeleteDialog(true)}
                    >
                      <Trash className='mb-0 h-4 w-4' />
                      <span>Delete</span>
                    </DropdownMenuItem>
                    {/* <DropdownMenuSeparator /> */}
                    <DropdownMenuItem
                      className='cursor-pointer gap-2 rounded-md font-medium'
                      onClick={() => setIsEditing(true)}
                    >
                      <Pencil className='mb-0 h-4 w-4' />
                      <span className=''>Edit</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <p className='mt-1 text-[0.8125rem]'>{comment?.content}</p>
            <CommentMedia media={comment?.media} commentId={comment._id} />
          </div>
        </div>
      </div>

      {openDeleteDialog && (
        <DeleteCommentDialog setOpenDeleteDialog={setOpenDeleteDialog} commentId={comment?._id} />
      )}

      {isEditing && (
        <EditCommentDialog
          lite={comment}
          openEditDialog={isEditing}
          setOpenEditDialog={setIsEditing}
          commentId={comment?._id}
        />
      )}
    </>
  );
}