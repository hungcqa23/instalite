import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import Image from 'next/image';
import React from 'react';

export default function CommentItem({ comment }: { comment: Post }) {
  return (
    <div className='my-1 w-full border-b-[1px] border-gray-200 p-0'>
      <div className='mb-2 flex flex-row'>
        <Avatar className='z-[-1] mt-0.5 h-8 w-8'>
          <AvatarImage src={comment?.user_id?.avatar} alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='ms-2.5 flex w-full flex-col justify-start '>
          <div className='flex flex-row justify-between '>
            <span className='text-xs font-semibold'>
              {comment?.user_id?.username}
            </span>
            <span className='text-xs font-normal text-gray-500'>
              {calculateTimeAgo(comment?.created_at)}
            </span>
          </div>
          <p className='mt-1 text-[0.8125rem]'>{comment?.content}</p>
          {comment?.media?.type == 0 && (
            <div className='my-3'>
              <Image
                src={comment.media.url}
                alt='image'
                width={200}
                height={200}
                className=' rounded-md border-2'
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
  );
}
