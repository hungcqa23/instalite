'use client';

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaProvider, Poster, Track } from '@vidstack/react';
import {
  DefaultVideoLayout,
  defaultLayoutIcons
} from '@vidstack/react/player/layouts/default';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Heart,
  MessageCircle,
  Repeat2,
  Send,
  Bookmark,
  Trash,
  Pencil,
  Sparkle,
  MessageSquareQuote
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { formatSocialNumber } from '@/lib/helper';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import DeleteLiteDialog from '@/components/ui/delete-lite-dialog';
import { Post } from '@/schema-validations/post.schema';
import { calculateTimeAgo } from '@/lib/helper';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postApiRequest } from '@/app/api-request/post';
import { accountApiRequest } from '@/app/api-request/account';
import { User } from '@/schema-validations/account.schema';
import Link from 'next/link';
import { http } from '@/lib/http';
import { getCookie } from 'cookies-next';
import ListComment from '@/components/ui/list-comment';
import { useAppContext } from '@/app/context/app-context';

export default function LiteItem({
  lite,
  isLink
}: {
  lite: Post;
  isLink?: boolean;
}) {
  const { user } = useAppContext();
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [text, setText] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isOpenCommentDialog, setIsOpenCommentDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const accessToken = getCookie('access_key');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const likeMutation = useMutation({
    mutationFn: (postId: string) => postApiRequest.like(postId)
  });
  const unLikeMutation = useMutation({
    mutationFn: (postId: string) => postApiRequest.unLike(postId)
  });
  const bookmarkMutation = useMutation({
    mutationFn: (postId: string) => postApiRequest.bookmark(postId)
  });
  const unBookmarkMutation = useMutation({
    mutationFn: (postId: string) => postApiRequest.unBookmark(postId)
  });

  const createCommentMutation = useMutation({
    mutationFn: async (text: string) => {
      return await http.post('/posts', {
        content: text,
        typePost: 2,
        parentPostId: lite?._id
      });
    }
  });

  const handleCommentPost = async (content: string) => {
    const res = await createCommentMutation.mutateAsync(content);
    const commentPostId = res.post._id;
    setIsOpenCommentDialog(false);
    resetDialog();
    queryClient.invalidateQueries({
      queryKey: ['comments', lite?._id, accessToken]
    });
  };

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      setIsOpenCommentDialog(false);
      resetDialog();
    } else {
      setIsOpenCommentDialog(true);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to measure the scroll height accurately
      textareaRef.current.style.height = 'auto';
      // Set height based on scroll height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleBookmark = () => {
    if (!bookmarked) {
      bookmarkMutation.mutate(lite._id);
      setBookmarked(true);
    } else {
      unBookmarkMutation.mutate(lite._id);
      setBookmarked(false);
    }
  };

  const resetDialog = useCallback(() => {
    setText('');
  }, []);

  const handleLike = () => {
    if (!liked) {
      likeMutation.mutate(lite._id);
      setLiked(true);
    } else {
      unLikeMutation.mutate(lite._id);
      setLiked(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  if (isLink)
    return (
      <Link href={`/posts/${lite._id}`}>
        <div className='mb-2 w-full border-b-[1px] border-gray-200 p-0 sm:pb-5'>
          <div className='mb-2 flex flex-row items-center justify-between'>
            <div className='flex flex-row items-end'>
              <Avatar className='z-[-1] h-9 w-9'>
                <AvatarImage src={lite?.user_id?.avatar} alt='@shadcn' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className='ms-2.5 flex flex-col justify-end '>
                <span className='text-[13px] font-semibold'>
                  {lite?.user_id?.username}
                </span>
                <span className='text-xs font-normal text-gray-500'>
                  {calculateTimeAgo(lite?.created_at)}
                </span>
              </div>
            </div>

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
                className='-ms-3 w-56 rounded-lg py-2 shadow-default dark:bg-zinc-950'
              >
                <DropdownMenuItem
                  className='cursor-pointer gap-2 rounded-md font-medium'
                  onClick={() => setOpenDeleteDialog(true)}
                >
                  <Trash className='mb-0 h-4 w-4' />
                  <span className=''>Delete lite</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer gap-2 rounded-md font-medium'>
                  <Pencil className='mb-0 h-4 w-4' />
                  <span className=''>Edit lite</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer gap-2 rounded-md font-medium'>
                  <Sparkle className='mb-0 h-4 w-4' />
                  <span className=''>Summarize with Relite AI</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className='mb-3 text-[0.8125rem]'>{lite?.content}</p>
          {/* {lite.url && (
          <div className='my-3'>
            <Image
              src={lite.url}
              alt='image'
              width={430}
              height={430}
              className=' rounded-md'
            />
          </div>
        )} */}
          {lite?.media?.type == 0 && (
            <div className='my-3'>
              <Image
                src={lite.media.url}
                alt='image'
                width={430}
                height={430}
                className=' rounded-md'
              />
            </div>
          )}

          {lite?.media?.type == 1 && (
            <MediaPlayer
              src={`http://localhost:8000/files/video-hls/${lite._id}/master.m3u8`}
              viewType='video'
              streamType='on-demand'
              logLevel='warn'
              crossOrigin
              playsInline
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

          <div className='mt-1 flex flex-row justify-between'>
            <div className='ms-0.5 flex flex-row gap-3'>
              <button onClick={handleLike}>
                <Heart
                  className={`${clsx(
                    'h-5 w-5 cursor-pointer transition-colors duration-300',
                    {
                      'fill-red-500 stroke-red-500': liked,
                      'fill-white stroke-black dark:fill-black dark:stroke-white':
                        !liked
                    }
                  )}`}
                />
              </button>
              <Dialog>
                <DialogTrigger>
                  <MessageCircle className='h-5 w-5 cursor-pointer' />
                </DialogTrigger>
                <DialogContent className=' dark:bg-zinc-950 sm:max-w-[34rem]'>
                  <DialogHeader>
                    <DialogTitle className='flex justify-center text-sm font-bold'>
                      Reply to {lite?.user_id?.username}
                    </DialogTitle>
                  </DialogHeader>
                  <div className='flex flex-col'>
                    <div className='flex flex-row'>
                      <Avatar className='h-8 w-8 cursor-pointer  '>
                        <AvatarImage
                          src='https://github.com/shadcn.png'
                          alt='@shadcn'
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className='ms-2.5 flex flex-col'>
                        <div className='text-sm font-semibold'>
                          AnHung DepTry
                        </div>
                        <textarea
                          ref={textareaRef}
                          placeholder='Write something...'
                          className=' max-h-[60vh] w-[28rem] resize-none overflow-y-auto bg-transparent py-1 text-sm outline-none'
                          rows={1}
                          value={text}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='mt-2 flex flex-row items-end justify-end'>
                      <Button className='rounded-3xl'>Post</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Send className='h-5 w-5 cursor-pointer' />
            </div>

            <button onClick={handleBookmark}>
              <Bookmark
                className={`${clsx(
                  'h-5 w-5 cursor-pointer transition-colors duration-300',
                  {
                    'fill-black stroke-black dark:fill-white dark:stroke-white':
                      bookmarked,
                    'fill-white stroke-black dark:fill-black dark:stroke-white':
                      !bookmarked
                  }
                )}`}
              />
            </button>
          </div>

          {/* {liked ? (
          <span className='mt-2 block text-xs font-medium text-black dark:text-white'>
            {formatSocialNumber(lite?.likes + 1)} likes
          </span>
        ) : (
          <span className='mt-2 block text-xs font-medium text-black dark:text-white'>
            {formatSocialNumber(lite?.likes)} likes
          </span>
        )}

        <button>
          <span className='text-xs text-slate-500'>See all 0 comments</span>
        </button> */}
        </div>
        {openDeleteDialog && (
          <DeleteLiteDialog
            setOpenDeleteDialog={setOpenDeleteDialog}
            liteId={lite?._id}
          />
        )}
      </Link>
    );

  return (
    <>
      <div className='mb-2 w-full border-b-[1px] border-gray-200 p-0 sm:pb-5'>
        <div className='mb-2 flex flex-row items-center justify-between'>
          <div className='flex flex-row items-end'>
            <Avatar className='z-[-1] h-9 w-9'>
              <AvatarImage src={lite?.user_id?.avatar} alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='ms-2.5 flex flex-col justify-end '>
              <span className='text-[13px] font-semibold'>
                {lite?.user_id?.username}
              </span>
              <span className='text-xs font-normal text-gray-500'>
                {calculateTimeAgo(lite?.created_at)}
              </span>
            </div>
          </div>

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
              className='-ms-3 w-56 rounded-lg py-2 shadow-default dark:bg-zinc-950'
            >
              <DropdownMenuItem
                className='cursor-pointer gap-2 rounded-md font-medium'
                onClick={() => setOpenDeleteDialog(true)}
              >
                <Trash className='mb-0 h-4 w-4' />
                <span className=''>Delete lite</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer gap-2 rounded-md font-medium'>
                <Pencil className='mb-0 h-4 w-4' />
                <span className=''>Edit lite</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer gap-2 rounded-md font-medium'>
                <Sparkle className='mb-0 h-4 w-4' />
                <span className=''>Summarize with Relite AI</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className='mb-3 text-[0.8125rem]'>{lite?.content}</p>
        {/* {lite.url && (
          <div className='my-3'>
            <Image
              src={lite.url}
              alt='image'
              width={430}
              height={430}
              className=' rounded-md'
            />
          </div>
        )} */}
        {lite?.media?.type == 0 && (
          <div className='my-3'>
            <Image
              src={lite.media.url}
              alt='image'
              width={430}
              height={430}
              className=' rounded-md'
            />
          </div>
        )}

        {lite?.media?.type == 1 && (
          <MediaPlayer
            src={`http://localhost:8000/files/video-hls/${lite._id}/master.m3u8`}
            viewType='video'
            streamType='on-demand'
            logLevel='warn'
            crossOrigin
            playsInline
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

        <div className='mt-1 flex flex-row justify-between'>
          <div className='ms-0.5 flex flex-row gap-3'>
            <button onClick={handleLike}>
              <Heart
                className={`${clsx(
                  'h-5 w-5 cursor-pointer transition-colors duration-300',
                  {
                    'fill-red-500 stroke-red-500': liked,
                    'fill-white stroke-black dark:fill-black dark:stroke-white':
                      !liked
                  }
                )}`}
              />
            </button>
            <Dialog
              open={isOpenCommentDialog}
              onOpenChange={handleDialogChange}
            >
              <DialogTrigger>
                <MessageCircle className='h-5 w-5 cursor-pointer' />
              </DialogTrigger>
              <DialogContent className=' dark:bg-zinc-950 sm:max-w-[34rem]'>
                <DialogHeader>
                  <DialogTitle className='flex justify-center text-sm font-bold'>
                    Reply to {lite?.user_id?.username}
                  </DialogTitle>
                </DialogHeader>
                <div className='flex flex-col'>
                  <div className='flex flex-row'>
                    <Avatar className='h-8 w-8 cursor-pointer  '>
                      <AvatarImage src={user?.avatar} alt='@shadcn' />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='ms-2.5 flex flex-col'>
                      <div className='text-sm font-semibold'>
                        {user?.username}
                      </div>
                      <textarea
                        ref={textareaRef}
                        placeholder='Write something...'
                        className=' max-h-[60vh] w-[28rem] resize-none overflow-y-auto bg-transparent py-1 text-sm outline-none'
                        rows={1}
                        value={text}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='mt-2 flex flex-row items-end justify-end'>
                    <Button
                      className='rounded-3xl'
                      onClick={() => handleCommentPost(text)}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Send className='h-5 w-5 cursor-pointer' />
          </div>

          <button onClick={handleBookmark}>
            <Bookmark
              className={`${clsx(
                'h-5 w-5 cursor-pointer transition-colors duration-300',
                {
                  'fill-black stroke-black dark:fill-white dark:stroke-white':
                    bookmarked,
                  'fill-white stroke-black dark:fill-black dark:stroke-white':
                    !bookmarked
                }
              )}`}
            />
          </button>
        </div>

        {liked ? (
          <span className='mt-2 block text-xs font-medium text-black dark:text-white'>
            {formatSocialNumber(lite?.likes + 1)} likes
          </span>
        ) : (
          <span className='mt-2 block text-xs font-medium text-black dark:text-white'>
            {formatSocialNumber(lite?.likes)} likes
          </span>
        )}

        {/* <button>
          <span className='text-xs text-slate-500'>See all 0 comments</span>
        </button> */}
      </div>
      <ListComment postId={lite?._id} />
      {openDeleteDialog && (
        <DeleteLiteDialog
          setOpenDeleteDialog={setOpenDeleteDialog}
          liteId={lite?._id}
        />
      )}
    </>
  );
}
