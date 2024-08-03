'use client';

import { useAppContext } from '@/app/context/app-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button/button';
import DeleteCommentDialog from '@/components/ui/delete-comment-dialog';
import DeleteLiteDialog from '@/components/ui/delete-lite-dialog';
import EditCommentDialog from '@/components/ui/edit-comment-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/form/dropdown-menu';
import { calculateTimeAgo } from '@/lib/helper';
import { Post } from '@/schema-validations/post.schema';
import { MediaPlayer, MediaProvider, Poster, Track } from '@vidstack/react';
import {
  DefaultVideoLayout,
  defaultLayoutIcons
} from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import '@vidstack/react/player/styles/default/theme.css';
import { Pencil, Trash } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

export default function CommentItem({ comment }: { comment: Post }) {
  const { user } = useAppContext();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  return (
    <>
      <div className='my-3 w-full border-b-[1px] border-gray-200 p-0'>
        <div className='mb-2 flex flex-row'>
          <Avatar className='z-[-1] mt-0.5 h-8 w-8'>
            <AvatarImage src={comment?.user_id?.avatar} alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='ms-2.5 flex w-full flex-col justify-start'>
            <div className='flex flex-row items-center justify-between'>
              <div className='flex flex-row gap-1'>
                <span className='text-xs font-semibold'>
                  {comment?.user_id?.username}
                </span>
                <span className='text-xs font-normal text-gray-500'>
                  {calculateTimeAgo(comment?.created_at)}
                </span>
              </div>

              {user?._id === comment?.user_id?._id && (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant={'link'} className='me-1 h-5 w-5 px-0'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-ellipsis'
                      >
                        <circle cx='12' cy='12' r='1' />
                        <circle cx='19' cy='12' r='1' />
                        <circle cx='5' cy='12' r='1' />
                      </svg>
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
                      <span className=''>Delete</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className='cursor-pointer gap-2 rounded-md font-medium'
                      onClick={() => setOpenEditDialog(true)}
                    >
                      <Pencil className='mb-0 h-4 w-4' />
                      <span className=''>Edit</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <p className='mt-1 text-[0.8125rem]'>{comment?.content}</p>
            {comment?.media?.type == 0 && (
              <div className='my-3'>
                <Image
                  src={comment.media.url}
                  alt='image'
                  width={200}
                  height={200}
                  className='rounded-md border-2'
                />
              </div>
            )}

            {comment?.media?.type == 1 && (
              <MediaPlayer
                src={`http://localhost:8000/files/video-hls/${comment._id}/master.m3u8`}
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
                <DefaultVideoLayout
                  // thumbnails='https://files.vidstack.io/sprite-fight/thumbnails.vtt'
                  icons={defaultLayoutIcons}
                />
              </MediaPlayer>
            )}
          </div>
        </div>
      </div>
      {openDeleteDialog && (
        <DeleteCommentDialog
          setOpenDeleteDialog={setOpenDeleteDialog}
          commentId={comment?._id}
        />
      )}
      {openEditDialog && (
        <EditCommentDialog
          openEditDialog={openEditDialog}
          setOpenEditDialog={setOpenEditDialog}
          commentId={comment?._id}
        />
      )}
    </>
  );
}
