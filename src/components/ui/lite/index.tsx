'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ImagePreview,
  Input
} from '@/components/ui';
import ListComment from '@/components/ui/comment/list-comment';
import {
  Clapperboard,
  EllipsisIcon,
  ImageIcon,
  MessageCircle,
  MessageCircleIcon,
  PencilIcon,
  SparkleIcon,
  TrashIcon,
  X,
  XIcon
} from '@/components/ui/icons';
import CancelDialog from '@/components/ui/lite/cancel-dialog';
import MediaSection from '@/components/ui/lite/media-section';
import { useCreateCommentMutation } from '@/hooks/queries/useComment';
import { useSummarizeLiteMutation } from '@/hooks/queries/usePost';
import { isVideo } from '@/lib/check';
import { calculateTimeAgo } from '@/lib/helper';
import { useUserStore } from '@/stores/user.stores';
import { Post } from '@/types/schema-validations/post.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import '@vidstack/react/player/styles/default/theme.css';
import axios from 'axios';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import React from 'react';

import ButtonBookMark from './button-bookmark';
import ButtonLike from './button-like';
import ButtonSend from './button-send';
import DeleteLiteDialog from './delete-lite-dialog';
import EditLiteDialog from './edit-lite-dialog';

const LiteItem = ({ lite, isLink }: { lite: Post; isLink?: boolean }) => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const [text, setText] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [isOpenCommentDialog, setIsOpenCommentDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  //file media
  const [images, setImages] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleVideoClick = () => {
    if (videoFileInputRef.current) videoFileInputRef.current.click();
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
    if (videoFileInputRef.current) videoFileInputRef.current.value = '';
  };

  const handleDeleteImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  // Media
  const updateVideoMutation = useMutation({
    mutationFn: async ({
      commentPostId,
      formData
    }: {
      commentPostId: string;
      formData: FormData;
    }) => {
      const res = await fetch(`http://localhost:8000/posts/${commentPostId}/upload-hls`, {
        method: 'PUT',
        body: formData
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
        body: formData
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

  // Comment
  const createCommentMutation = useCreateCommentMutation();

  const handleCommentPost = async (content: string) => {
    const res = await createCommentMutation.mutateAsync({
      content,
      parentPostId: lite?._id
    });

    console.log(res);

    // const commentPostId = res.post._id;
    // if (!commentPostId) return;
    // const formData = new FormData();

    // if (videoFile) {
    //   formData.append('media', videoFile);
    //   await updateVideoMutation.mutateAsync({
    //     commentPostId,
    //     formData
    //   });
    //   setText('');
    //   return;
    // }

    // if (imageFile) {
    //   formData.append('media', imageFile);

    //   const updateImage = await updatePostMutation.mutateAsync({
    //     commentPostId,
    //     formData
    //   });
    //   setText('');
    //   return;
    // }
    setIsOpenCommentDialog(false);
    resetDialog();
    queryClient.invalidateQueries({
      queryKey: ['comments', lite?._id]
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

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
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

  const summarizeLiteMutation = useSummarizeLiteMutation();
  const handleSummarization = async () => {
    const formData = new FormData();
    if (lite?.media?.type === 0) {
      const response = await axios.get(lite?.media?.url, {
        responseType: 'blob'
      });

      formData.append('media', response.data);
    }
    formData.append('content', lite?.content);
    const res = await summarizeLiteMutation.mutateAsync(formData);
  };

  const ActionMenu = ({ lite, isCurrentUser }: { lite: Post; isCurrentUser: boolean }) => (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='link' className='me-1 h-5 w-5 px-0'>
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='-ms-3 w-56 rounded-lg py-2 shadow-default dark:bg-zinc-950'
      >
        {isCurrentUser && (
          <>
            <DropdownMenuItem
              className='cursor-pointer gap-2 rounded-md font-medium'
              onClick={() => setOpenDeleteDialog(true)}
            >
              <TrashIcon className='size-4' /> <span>Delete lite</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='cursor-pointer gap-2 rounded-md font-medium'
              onClick={() => setOpenEditDialog(true)}
            >
              <PencilIcon className='size-4' /> <span>Edit lite</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        {!isVideo(lite?.media?.type) && (
          <DropdownMenuItem
            className='cursor-pointer gap-2 rounded-md font-medium'
            onClick={() => handleSummarization()}
          >
            <SparkleIcon className='size-4' />
            <span>Summarize with Relite AI</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
  const HeaderSection = ({ lite, isCurrentUser }: { lite: Post; isCurrentUser: boolean }) => (
    <div className='mb-2 flex flex-row items-center justify-between'>
      <div className='flex flex-row items-end'>
        <Avatar className='z-[-1] h-9 w-9'>
          <AvatarImage src={lite?.userId?.avatar} alt={lite?.userId?.username} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='ms-2.5 flex flex-col justify-end'>
          <span className='text-[13px] font-semibold'>{lite?.userId?.username}</span>
          <span className='text-xs font-normal text-gray-500'>
            {calculateTimeAgo(lite?.createdAt)}
          </span>
        </div>
      </div>
      <ActionMenu lite={lite} isCurrentUser={isCurrentUser} />
    </div>
  );

  const isCurrentUser = user?._id === lite?.userId._id;

  const FooterLinkSection = () => {
    return (
      <div className='mt-3 flex flex-row justify-between'>
        <div className='ms-0.5 flex flex-row gap-3'>
          <ButtonLike liteId={lite._id} />
          <Link href={`/posts/${lite._id}`}>
            <MessageCircle className='size-5 cursor-pointer' />
          </Link>
          <ButtonSend />
        </div>

        <ButtonBookMark liteId={lite._id} />
      </div>
    );
  };

  if (isLink)
    return (
      <>
        <div className='mb-2 w-full border-b-[1px] border-gray-200 p-0 sm:pb-5'>
          <HeaderSection lite={lite} isCurrentUser={isCurrentUser} />
          <Link href={`/posts/${lite._id}`} className='w-full'>
            <p className='text-[0.8125rem]'>{lite?.content}</p>
          </Link>
          <MediaSection lite={lite} />
          <FooterLinkSection />
        </div>

        {openDeleteDialog && (
          <DeleteLiteDialog setOpenDeleteDialog={setOpenDeleteDialog} liteId={lite?._id} />
        )}
      </>
    );

  const CommentForm = () => (
    <div className='flex flex-col overflow-hidden'>
      <div className='flex flex-row'>
        <Avatar className='h-8 w-8 cursor-pointer'>
          <AvatarImage src={user?.avatar} alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='ms-2.5 flex max-w-full flex-col'>
          <div className='text-sm font-semibold'>{user?.username}</div>
          <textarea
            ref={textareaRef}
            placeholder='Write something...'
            className='max-h-[60vh] w-[28rem] resize-none overflow-y-auto bg-transparent py-1 text-sm outline-none'
            rows={1}
            autoFocus
            value={text}
            onChange={e => setText(e.target.value)}
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
                  <CarouselItem key={index} className='basis-1/2 pl-1 pr-1'>
                    <ImagePreview src={image} onDelete={() => handleDeleteImage(index)} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}

          {videoUrl && (
            <div className='relative my-3 max-h-[20rem] w-fit'>
              <video controls className='h-auto max-h-[20rem] w-auto rounded' autoPlay>
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
        <Button className='rounded-3xl' onClick={() => handleCommentPost(text)}>
          Post
        </Button>
      </div>
    </div>
  );

  const CommentDialog = ({ lite }: { lite: Post }) => (
    <Dialog open={isOpenCommentDialog} onOpenChange={handleDialogChange}>
      <DialogTrigger>
        <MessageCircleIcon className='h-5 w-5 cursor-pointer' />
      </DialogTrigger>

      <DialogContent className='select-none dark:bg-zinc-950 sm:max-w-[34rem]'>
        <DialogHeader>
          <DialogTitle className='flex justify-center text-sm font-bold'>
            Reply to {lite?.userId?.username}
          </DialogTitle>
          <DialogClose asChild>
            <Button
              className='absolute right-0 top-0 z-10 hover:bg-transparent dark:hover:bg-transparent'
              variant='ghost'
              onClick={() => handleDialogChange(false)}
            >
              <XIcon size={16} />
            </Button>
          </DialogClose>
        </DialogHeader>

        <CommentForm />
      </DialogContent>
    </Dialog>
  );

  const FooterSection = ({ lite }: { lite: Post }) => (
    <div className='mt-3 flex flex-row justify-between'>
      <div className='ms-0.5 flex flex-row gap-3'>
        <ButtonLike liteId={lite._id} />
        <CommentDialog lite={lite} />
        <ButtonSend />
      </div>
      <ButtonBookMark liteId={lite._id} />
    </div>
  );

  const DialogComponents = ({ liteId }: { liteId: string }) => (
    <>
      {openDeleteDialog && (
        <DeleteLiteDialog setOpenDeleteDialog={setOpenDeleteDialog} liteId={liteId} />
      )}

      {openEditDialog && (
        <EditLiteDialog
          openEditDialog={openEditDialog}
          setOpenEditDialog={setOpenEditDialog}
          liteId={liteId}
        />
      )}

      {openCancelDialog && (
        <CancelDialog
          cancelClose={cancelClose}
          confirmClose={confirmClose}
          openCancelDialog={openCancelDialog}
          setOpenCancelDialog={setOpenCancelDialog}
        />
      )}
    </>
  );

  return (
    <>
      <div className='mb-0 w-full border-b-[1px] border-gray-200 p-0 sm:pb-5'>
        <HeaderSection lite={lite} isCurrentUser={isCurrentUser} />
        <p className='text-[0.8125rem]'>{lite?.content}</p>
        <MediaSection lite={lite} />
        <FooterSection lite={lite} />
      </div>

      {/* Display Comments */}
      <ListComment postId={lite?._id} />
      <DialogComponents liteId={lite?._id} />
    </>
  );
};

export default LiteItem;
