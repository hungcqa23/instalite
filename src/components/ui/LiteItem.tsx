'use client';

import { postApiRequest } from '@/app/api-request/post';
import { useAppContext } from '@/app/context/app-context';
import { usePostSaved } from '@/app/queries/use-saved';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import DeleteLiteDialog from '@/components/ui/delete-lite-dialog';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import EditLiteDialog from '@/components/ui/edit-lite-dialog';
import { Input } from '@/components/ui/input';
import ListComment from '@/components/ui/list-comment';
import ImagePreview from '@/components/ui/preview-image';
import SummarizeDialog from '@/components/ui/summarzie-dialog';
import { useToast } from '@/components/ui/use-toast';
import { calculateTimeAgo } from '@/lib/helper';
import { http } from '@/lib/http';
import { Post } from '@/schema-validations/post.schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
  DefaultVideoLayout,
  defaultLayoutIcons
} from '@vidstack/react/player/layouts/default';
import axios from 'axios';
import clsx from 'clsx';
import { getCookie } from 'cookies-next';
import { setFips } from 'crypto';
import {
  Bookmark,
  Clapperboard,
  Heart,
  ImageIcon,
  MessageCircle,
  Pencil,
  Send,
  Sparkle,
  Trash,
  X
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openSummarizeDialog, setOpenSummarizeDialog] = useState(false);
  const [summarizedText, setSummarizedText] = useState('');
  const [isOpenCommentDialog, setIsOpenCommentDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const accessToken = getCookie('access_key');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);
  //file media
  const [images, setImages] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const handleCopyUrl = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        toast({
          title: 'Share lite',
          description: 'Lite URL copied to clipboard! Send it to your friend!',
          duration: 2000
        });
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleVideoClick = () => {
    if (videoFileInputRef.current) {
      videoFileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      const fileUrls = fileArray.map(file => URL.createObjectURL(file));
      setImages(prevImages => [...prevImages, ...fileUrls]);
      setImageFile(e.target.files[0]);
    }
  };

  const handleDeleteVideo = () => {
    setVideoFile(null);
    setVideoUrl(null);
    if (videoFileInputRef.current) {
      videoFileInputRef.current.value = '';
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  const likeMutation = useMutation({
    mutationFn: (postId: string) => postApiRequest.like(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: query => {
          console.log(query.queryKey);
          return query.queryKey[0] === 'posts';
        }
        // queryKey: ['posts'],
        // exact: true
      });
    }
  });
  const unLikeMutation = useMutation({
    mutationFn: (postId: string) => postApiRequest.unLike(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: query => {
          return query.queryKey.includes('posts');
        }
      });
    }
  });
  const bookmarkMutation = useMutation({
    mutationFn: (postId: string) => postApiRequest.bookmark(postId)
  });
  const unBookmarkMutation = useMutation({
    mutationFn: (postId: string) => postApiRequest.unBookmark(postId)
  });

  const updateVideoMutation = useMutation({
    mutationFn: async ({
      commentPostId,
      formData
    }: {
      commentPostId: string;
      formData: FormData;
    }) => {
      const res = await fetch(
        `http://localhost:8000/posts/${commentPostId}/upload-hls`,
        {
          method: 'PUT',
          body: formData,
          headers: {
            Cookie: `access_token=${accessToken}`
          },
          credentials: 'include'
        }
      );
      return await res.json();
    },
    onSuccess: () => {
      setIsOpenCommentDialog(false);
      queryClient.invalidateQueries({
        queryKey: ['comments']
      });
      // window.location.reload();
    }
  });

  const updatePostMutation = useMutation({
    mutationFn: async ({
      commentPostId,
      formData
    }: {
      commentPostId: string;
      formData: FormData;
    }) => {
      const res = await fetch(`http://localhost:8000/posts/${commentPostId}`, {
        method: 'PUT',
        body: formData,
        headers: {
          Cookie: `access_token=${accessToken}`
        },
        credentials: 'include'
      });
      return await res.json();
    },

    onSuccess: () => {
      setIsOpenCommentDialog(false);
      queryClient.invalidateQueries({
        queryKey: ['comments']
      });
      // window.location.reload();
    }
  });

  const createCommentMutation = useMutation({
    mutationFn: async (text: string) => {
      return await http.post('/posts', {
        content: text,
        typePost: 2,
        parentPostId: lite?._id
      });
    },
    onSuccess: () => {
      setImageFile(null);
      setVideoFile(null);
      setImages([]);
    }
  });

  const handleCommentPost = async (content: string) => {
    const res = await createCommentMutation.mutateAsync(content);
    const commentPostId = res.post._id;
    if (!commentPostId) return;
    const formData = new FormData();

    if (videoFile) {
      formData.append('media', videoFile);
      await updateVideoMutation.mutateAsync({
        commentPostId,
        formData
      });
      setText('');
      return;
    }

    if (imageFile) {
      formData.append('media', imageFile);

      const updateImage = await updatePostMutation.mutateAsync({
        commentPostId,
        formData
      });
      setText('');
      return;
    }
    setIsOpenCommentDialog(false);
    resetDialog();
    queryClient.invalidateQueries({
      queryKey: ['comments', lite?._id, accessToken]
    });
  };

  const handleDialogChange = (open: boolean) => {
    if (!open && (text || images.length > 0 || videoUrl)) {
      setOpenCancelDialog(true);
    } else {
      setIsOpenCommentDialog(open);
      if (!open) resetDialog();
    }
  };

  const confirmClose = () => {
    setOpenCancelDialog(false);
    setIsOpenCommentDialog(false);
    resetDialog();
  };

  const cancelClose = () => {
    setOpenCancelDialog(false);
    setIsOpenCommentDialog(true);
  };

  const handleBookmark = () => {
    if (!bookmarked) {
      bookmarkMutation.mutate(lite._id);
      setBookmarked(true);
    } else {
      unBookmarkMutation.mutate(lite._id);
      setBookmarked(false);
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

  const resetDialog = useCallback(() => {
    setText('');
    setImages([]);
    setImageFile(null);
    setVideoFile(null);
    setVideoUrl(null);
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

  const { data } = useQuery({
    queryKey: ['like', lite?._id, accessToken],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8000/likes/${lite?._id}`, {
        method: 'GET',
        headers: {
          Cookie: `access_token=${accessToken}`
        },
        credentials: 'include'
      });

      const data = await res.json();
      return data;
    }
  });

  useEffect(() => {
    if (data) setLiked(data.result);
  }, [data]);

  const summarizeMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return await fetch('http://localhost:8000/files/summary', {
        method: 'POST',
        body: formData,
        headers: {
          Cookie: `access_token=${accessToken}`
        },
        credentials: 'include'
      });
    }
  });

  const handleSummarization = async () => {
    setLoading(true);

    const formData = new FormData();
    if (lite?.media?.type === 0) {
      const response = await axios.get(lite?.media?.url, {
        responseType: 'blob'
      });

      formData.append('media', response.data);
    }
    formData.append('content', lite?.content);
    const res = await summarizeMutation.mutateAsync(formData);

    const result = await res.json();
    const content = result.content;

    console.log(content);
    setSummarizedText(content);
    setLoading(false);
    setOpenSummarizeDialog(true);
  };

  const { data: dataSaved } = usePostSaved(lite?._id);
  useEffect(() => {
    if (dataSaved?.result) setBookmarked(true);
  }, [dataSaved?.result]);

  if (isLink)
    return (
      <>
        <div className='mb-2 w-full border-b-[1px] border-gray-200 p-0 sm:pb-5'>
          <div className='mb-2 flex flex-row items-center justify-between'>
            <div className='flex flex-row items-end'>
              <Link href={`/username/${lite?.user_id.username}`}>
                <Avatar className='z-[-1] h-9 w-9'>
                  <AvatarImage src={lite?.user_id?.avatar} alt='@shadcn' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <div className='ms-2.5 flex flex-col justify-end'>
                <Link href={`/username/${lite?.user_id.username}`}>
                  <span className='text-[13px] font-semibold'>
                    {lite?.user_id?.username}
                  </span>
                </Link>
                <span className='text-xs font-normal text-gray-500'>
                  {calculateTimeAgo(lite?.created_at)}
                </span>
              </div>
            </div>

            {user?._id === lite?.user_id._id ? (
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
                    <span>Delete lite</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <Link href={`/posts/${lite._id}`}>
                    <DropdownMenuItem className='cursor-pointer gap-2 rounded-md font-medium'>
                      <Pencil className='mb-0 h-4 w-4' />
                      <span>Edit lite</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  {lite?.media?.type !== 1 && (
                    <DropdownMenuItem
                      className='cursor-pointer gap-2 rounded-md font-medium'
                      onClick={() => {
                        handleSummarization();
                      }}
                    >
                      <Sparkle className='mb-0 h-4 w-4' />
                      <span>Summarize with Relite AI</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
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
                  {lite?.media?.type !== 1 && (
                    <DropdownMenuItem
                      className='cursor-pointer gap-2 rounded-md font-medium'
                      onClick={() => {
                        handleSummarization();
                      }}
                    >
                      <Sparkle className='mb-0 h-4 w-4' />
                      <span>Summarize with Relite AI</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <Link href={`/posts/${lite?._id}`} className='w-full'>
            <p className='text-[0.8125rem]'>{lite?.content}</p>
          </Link>

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
            <Link href={`/posts/${lite._id}`} className='w-full'>
              <div className='my-2'>
                <Image
                  src={lite.media.url}
                  alt='image'
                  width={430}
                  height={430}
                  className='rounded-md border-2'
                />
              </div>
            </Link>
          )}
          {lite?.media?.type == 1 && (
            <Link href={`/posts/${lite._id}`} className='w-full'>
              <MediaPlayer
                src={`http://localhost:8000/files/video-hls/${lite._id}/master.m3u8`}
                viewType='video'
                streamType='on-demand'
                logLevel='warn'
                crossOrigin
                className='z-0 my-2'
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
            </Link>
          )}

          <div className='mt-3 flex flex-row justify-between'>
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

              <Link href={`/posts/${lite?._id}`}>
                <MessageCircle className='h-5 w-5 cursor-pointer' />
              </Link>
              <button
                onClick={() => {
                  const url = window.location.href + `/posts/${lite?._id}`;
                  handleCopyUrl(url);
                }}
              >
                <Send className='h-5 w-5 cursor-pointer' />
              </button>
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

        {loading && (
          <Dialog open={loading}>
            <DialogContent className='select-none pb-0 pt-4 dark:bg-zinc-950 sm:max-w-[30rem]'>
              <DialogHeader>
                <DialogTitle className='flex justify-center text-sm font-bold'>
                  Lite is being summarized, please wait...
                </DialogTitle>
              </DialogHeader>

              <div className='flex flex-row border-t-2 dark:border-gray-600'></div>
            </DialogContent>
          </Dialog>
        )}

        {openSummarizeDialog && (
          <Dialog
            open={openSummarizeDialog}
            onOpenChange={setOpenSummarizeDialog}
          >
            <DialogContent className='select-none pb-0 pt-4 dark:bg-zinc-950 sm:max-w-[40rem]'>
              <DialogHeader>
                <DialogTitle className='flex justify-center text-sm font-bold'>
                  Summarized Content
                </DialogTitle>
              </DialogHeader>
              <p className='mb-0 flex justify-center pr-3 text-sm font-normal'>
                {summarizedText}
              </p>
              <div className='flex flex-row border-t-2 dark:border-gray-600'></div>
            </DialogContent>
          </Dialog>
        )}
      </>
    );

  return (
    <>
      <div className='mb-0 w-full border-b-[1px] border-gray-200 p-0 sm:pb-5'>
        <div className='mb-2 flex flex-row items-center justify-between'>
          <div className='flex flex-row items-end'>
            <Link href={`/username/${lite?.user_id.username}`}>
              <Avatar className='z-[-1] h-9 w-9'>
                <AvatarImage src={lite?.user_id?.avatar} alt='@shadcn' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
            <div className='ms-2.5 flex flex-col justify-end'>
              <Link href={`/username/${lite?.user_id.username}`}>
                <span className='text-[13px] font-semibold'>
                  {lite?.user_id?.username}
                </span>
              </Link>
              <span className='text-xs font-normal text-gray-500'>
                {calculateTimeAgo(lite?.created_at)}
              </span>
            </div>
          </div>

          {user?._id === lite?.user_id._id ? (
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
                  <span>Delete lite</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className='cursor-pointer gap-2 rounded-md font-medium'
                  onClick={() => setOpenEditDialog(true)}
                >
                  <Pencil className='mb-0 h-4 w-4' />
                  <span>Edit lite</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {lite?.media?.type !== 1 && (
                  <DropdownMenuItem
                    className='cursor-pointer gap-2 rounded-md font-medium'
                    onClick={() => {
                      handleSummarization();
                    }}
                  >
                    <Sparkle className='mb-0 h-4 w-4' />
                    <span>Summarize with Relite AI</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
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
                {lite?.media?.type !== 1 && (
                  <DropdownMenuItem
                    className='cursor-pointer gap-2 rounded-md font-medium'
                    onClick={() => {
                      handleSummarization();
                    }}
                  >
                    <Sparkle className='mb-0 h-4 w-4' />
                    <span>Summarize with Relite AI</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <p className='text-[0.8125rem]'>{lite?.content}</p>
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
          <div className='my-2'>
            <Image
              src={lite.media.url}
              alt='image'
              width={430}
              height={430}
              className='rounded-md border-2'
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
            className='z-0 my-2'
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

        <div className='mt-3 flex flex-row justify-between'>
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
              <DialogContent className='select-none dark:bg-zinc-950 sm:max-w-[34rem]'>
                <DialogHeader>
                  <DialogTitle className='flex justify-center text-sm font-bold'>
                    Reply to {lite?.user_id?.username}
                  </DialogTitle>
                  <DialogClose asChild>
                    <Button
                      className='absolute right-0 top-0 z-10 hover:bg-transparent dark:hover:bg-transparent'
                      variant='ghost'
                      onClick={() => handleDialogChange(false)}
                    >
                      <X size={16} />
                    </Button>
                  </DialogClose>
                </DialogHeader>
                <div className='flex flex-col overflow-hidden'>
                  <div className='flex flex-row'>
                    <Avatar className='h-8 w-8 cursor-pointer'>
                      <AvatarImage
                        src={
                          user?.avatar ||
                          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        }
                        alt='@shadcn'
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='ms-2.5 flex max-w-full flex-col'>
                      <div className='text-sm font-semibold'>
                        {user?.username}
                      </div>
                      <textarea
                        ref={textareaRef}
                        placeholder='Write something...'
                        className='max-h-[60vh] w-[28rem] resize-none overflow-y-auto bg-transparent py-1 text-sm outline-none'
                        rows={1}
                        autoFocus
                        value={text}
                        onChange={handleChange}
                      />
                      {images.length == 0 && videoUrl == null && (
                        <div className='flex flex-row gap-2'>
                          <Button
                            className='mt-2 flex w-[8rem] cursor-pointer gap-2 rounded-xl'
                            variant='outline'
                            onClick={handleImageClick}
                          >
                            <ImageIcon /> Add Image
                          </Button>
                          <Button
                            className='mt-2 flex w-[8rem] cursor-pointer gap-2 rounded-xl'
                            variant='outline'
                            onClick={handleVideoClick}
                          >
                            <Clapperboard /> Add Video
                          </Button>
                        </div>
                      )}
                      <Input
                        type='file'
                        ref={fileInputRef}
                        multiple={true}
                        accept='image/*'
                        className='hidden'
                        onChange={handleFileChange}
                      />
                      <Input
                        type='file'
                        ref={videoFileInputRef}
                        accept='video/*'
                        className='hidden'
                        onChange={handleVideoChange}
                      />
                      {images.length > 0 && (
                        <Carousel
                          opts={{
                            align: 'start'
                          }}
                          className='my-3 w-full max-w-full overflow-hidden'
                        >
                          <CarouselContent className='-ml-1 flex'>
                            {images.map((image, index) => (
                              <CarouselItem
                                key={index}
                                className='basis-1/2 pl-1 pr-1'
                              >
                                <ImagePreview
                                  src={image}
                                  onDelete={() => handleDeleteImage(index)}
                                />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                        </Carousel>
                      )}
                      {videoUrl && (
                        <div className='relative my-3 max-h-[20rem] w-fit'>
                          <video
                            controls
                            className='h-auto max-h-[20rem] w-auto rounded'
                            autoPlay
                          >
                            <source src={videoUrl} type='video/mp4' />
                            Your browser does not support the video tag.
                          </video>
                          <Button
                            className='absolute right-2 top-2 rounded-full bg-opacity-75'
                            variant='ghost'
                            onClick={handleDeleteVideo}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      )}
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
            <button
              onClick={() => {
                const url = window.location.href;
                handleCopyUrl(url);
              }}
            >
              <Send className='h-5 w-5 cursor-pointer' />
            </button>
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
      </div>

      <ListComment postId={lite?._id} />

      {openDeleteDialog && (
        <DeleteLiteDialog
          setOpenDeleteDialog={setOpenDeleteDialog}
          liteId={lite?._id}
        />
      )}

      {openEditDialog && (
        <EditLiteDialog
          openEditDialog={openEditDialog}
          setOpenEditDialog={setOpenEditDialog}
          liteId={lite?._id}
        />
      )}

      {loading && (
        <Dialog open={loading}>
          <DialogContent className='select-none pb-0 pt-4 dark:bg-zinc-950 sm:max-w-[30rem]'>
            <DialogHeader>
              <DialogTitle className='flex justify-center text-sm font-bold'>
                Lite is being summarized, please wait...
              </DialogTitle>
            </DialogHeader>

            <div className='flex flex-row border-t-2 dark:border-gray-600'></div>
          </DialogContent>
        </Dialog>
      )}

      {openSummarizeDialog && (
        <Dialog
          open={openSummarizeDialog}
          onOpenChange={setOpenSummarizeDialog}
        >
          <DialogContent className='select-none pb-0 pt-4 dark:bg-zinc-950 sm:max-w-[40rem]'>
            <DialogHeader>
              <DialogTitle className='flex justify-center text-sm font-bold'>
                Summarized Content
              </DialogTitle>
            </DialogHeader>
            <p className='mb-0 flex justify-center pr-3 text-sm font-normal'>
              {summarizedText}
            </p>
            <div className='flex flex-row border-t-2 dark:border-gray-600'></div>
          </DialogContent>
        </Dialog>
      )}

      {openCancelDialog && (
        <Dialog open={openCancelDialog} onOpenChange={setOpenCancelDialog}>
          <DialogContent className='select-none px-0 pb-0 pt-4 dark:bg-zinc-950 sm:max-w-[20rem]'>
            <DialogHeader>
              <DialogTitle className='mb-0 flex justify-center text-sm font-bold'>
                Close comment?
              </DialogTitle>
              <DialogClose asChild>
                <div className='absolute right-0 top-0 z-10 h-8 w-16 bg-white dark:bg-zinc-950'></div>
              </DialogClose>
            </DialogHeader>

            <div className='flex flex-row border-t-2 dark:border-gray-600'>
              <div
                className='w-full cursor-pointer rounded-bl-3xl border-r-2 py-4 text-center dark:border-gray-600'
                onClick={cancelClose}
              >
                Cancel
              </div>

              <div
                className='w-full cursor-pointer rounded-br-3xl py-4 text-center font-semibold text-red-600'
                onClick={confirmClose}
              >
                Close
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
