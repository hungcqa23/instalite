'use client';

import {
  AvatarUser,
  Button,
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
  toast
} from '@/components/ui';
import {
  EllipsisIcon,
  MessageCircle,
  MessageCircleIcon,
  SparkleIcon,
  TrashIcon,
  XIcon
} from '@/components/ui/icons';
import CancelDialog from '@/components/ui/lite/CancelDialog';
import FooterLinkSection from '@/components/ui/lite/LiteLink/footer-link-section';
import CommentForm from '@/components/ui/lite/comment/comment-form';
import ListComment from '@/components/ui/lite/comment/list-comment';
import MediaSection from '@/components/ui/lite/media-section';
import SummarizationDialog from '@/components/ui/lite/summarization-dialog';
import { useCreateCommentMutation } from '@/hooks/queries/useComment';
import {
  useSummarizeLiteMutation,
  useUpdatePostMutation,
  useUpdateVideoMutation
} from '@/hooks/queries/usePost';
import { isVideo } from '@/lib/check';
import { calculateTimeAgo } from '@/lib/helper';
import { useUserStore } from '@/stores/user.stores';
import { Post } from '@/types/schema-validations/post.schema';
import { Description } from '@radix-ui/react-dialog';
import { useQueryClient } from '@tanstack/react-query';
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

interface LiteProps {
  lite: Post;
  isLink?: boolean;
  innerRef?: React.Ref<HTMLParagraphElement>;
}
const LiteItem = ({ lite, isLink, innerRef }: LiteProps) => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenCommentDialog, setIsOpenCommentDialog] = useState(false);
  const [contentSummarization, setContentSummarization] = useState({
    content: '',
    isOpenSummarizeDialog: false
  });
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
  const updateVideoMutation = useUpdateVideoMutation();
  const updatePostMutation = useUpdatePostMutation();

  // Comment
  const createCommentMutation = useCreateCommentMutation();

  const handleDialogChange = (open: boolean) => {
    if (!open && (images.length > 0 || videoUrl)) setOpenCancelDialog(true);
    else {
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

  const resetDialog = useCallback(() => {
    setImages([]);
    setImageFile(null);
    setVideoFile(null);
    setVideoUrl(null);
  }, []);

  // Summarization
  const summarizeLiteMutation = useSummarizeLiteMutation();
  useEffect(() => {
    if (summarizeLiteMutation.status === 'pending')
      setContentSummarization({
        content: 'Loading...',
        isOpenSummarizeDialog: true
      });
  }, [summarizeLiteMutation.status]);

  const handleSummarization = async () => {
    try {
      const formData = new FormData();
      if (lite?.media?.type === 0) {
        const response = await axios.get(lite?.media?.url, {
          responseType: 'blob'
        });
        formData.append('media', response.data);
      }

      formData.append('content', lite?.content);
      const res = await summarizeLiteMutation.mutateAsync(formData);

      if (res.content)
        setContentSummarization({
          content: res.content,
          isOpenSummarizeDialog: true
        });
    } catch (error) {
      console.log(error);
    }
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

            {/* <DropdownMenuItem
              className='cursor-pointer gap-2 rounded-md font-medium'
              onClick={() => setIsEditing(true)}
            >
              <PencilIcon className='size-4' /> <span>Edit lite</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
          </>
        )}

        {!isVideo(lite?.media?.type) && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='cursor-pointer gap-2 rounded-md font-medium'
              onClick={handleSummarization}
            >
              <SparkleIcon className='size-4' />
              <span>Explain with Relite AI</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const HeaderSection = ({ lite, isCurrentUser }: { lite: Post; isCurrentUser: boolean }) => (
    <div className='mb-2 flex flex-row items-center justify-between'>
      <div className='flex flex-row items-end'>
        <AvatarUser
          className='z-[-1] size-9'
          src={lite?.userId?.avatar}
          alt={lite?.userId?.username}
        />
        <div className='ms-2.5 flex flex-col justify-end'>
          <Link href={`/username/${lite?.userId?.username}`}>
            <span className='text-[13px] font-semibold'>{lite?.userId?.username}</span>
          </Link>
          <span className='text-xs font-normal text-gray-500'>
            {calculateTimeAgo(lite?.createdAt)}
          </span>
        </div>
      </div>

      <ActionMenu lite={lite} isCurrentUser={isCurrentUser} />
    </div>
  );

  const isCurrentUser = user?._id === lite?.userId._id;

  const handleChangeOpenSummarizeDialog = () => {
    setContentSummarization(previousState => ({
      ...previousState,
      isOpenSummarizeDialog: !previousState.isOpenSummarizeDialog
    }));
  };

  if (isLink)
    return (
      <>
        <div className='mb-2 w-full border-b-[1px] border-gray-200 p-0 sm:pb-5' ref={innerRef}>
          <HeaderSection lite={lite} isCurrentUser={isCurrentUser} />
          <Link href={`/posts/${lite._id}`} className='w-full'>
            <p className='text-[0.8125rem]'>{lite?.content}</p>
          </Link>
          <MediaSection lite={lite} />
          <FooterLinkSection liteId={lite?._id || ''} />
        </div>

        {openDeleteDialog && (
          <DeleteLiteDialog setOpenDeleteDialog={setOpenDeleteDialog} liteId={lite?._id} />
        )}

        <SummarizationDialog
          contentSummarization={contentSummarization}
          setContentSummarization={handleChangeOpenSummarizeDialog}
        />
      </>
    );

  const handleCommentPost = async (content: string) => {
    const res = await createCommentMutation.mutateAsync({
      content,
      parentPostId: lite?._id
    });

    // const commentPostId = res.post._id;
    // if (!commentPostId) return;
    // const formData = new FormData();

    // if (videoFile) {
    //   formData.append('media', videoFile);
    //   await updateVideoMutation.mutateAsync({
    //     commentPostId,
    //     formData
    //   });
    //   return;
    // }

    // if (imageFile) {
    //   formData.append('media', imageFile);

    //   const updateImage = await updatePostMutation.mutateAsync({
    //     commentPostId,
    //     formData
    //   });
    //   return;
    // }

    toast({
      title: 'Replied',
      description: 'Your reply has been posted'
    });
    setIsOpenCommentDialog(false);
    queryClient.invalidateQueries({
      queryKey: ['comments', lite?._id]
    });
    resetDialog();
  };

  const CommentDialog = ({ lite }: { lite: Post }) => (
    <Dialog open={isOpenCommentDialog} onOpenChange={handleDialogChange}>
      <DialogTrigger>
        <MessageCircleIcon className='h-5 w-5 cursor-pointer' />
      </DialogTrigger>

      <DialogContent className='select-none dark:bg-zinc-950 sm:max-w-[34rem]'>
        <DialogHeader>
          <Description />
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

        <CommentForm
          user={user}
          images={images}
          videoUrl={videoUrl}
          fileInputRef={fileInputRef}
          textareaRef={textareaRef}
          videoFileInputRef={videoFileInputRef}
          handleDeleteVideo={handleDeleteVideo}
          handleDeleteImage={handleDeleteImage}
          handleImageClick={handleImageClick}
          handleVideoClick={handleVideoClick}
          handleCommentPost={handleCommentPost}
          handleFileChange={handleFileChange}
          handleVideoChange={handleVideoChange}
        />
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

      {/* {isEditing && (
        <EditLiteDialog
          openEditDialog={isEditing}
          setOpenEditDialog={setIsEditing}
          liteId={liteId}
        />
      )} */}

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
      <div className='mb-0 w-full border-b-[1px] border-gray-200 p-0 sm:pb-5' ref={innerRef}>
        <HeaderSection lite={lite} isCurrentUser={isCurrentUser} />
        <p className='text-[0.8125rem]'>{lite?.content}</p>
        <MediaSection lite={lite} />
        <FooterSection lite={lite} />
      </div>

      {/* Display Comments */}
      <ListComment postId={lite?._id} />
      <DialogComponents liteId={lite?._id} />

      <SummarizationDialog
        contentSummarization={contentSummarization}
        setContentSummarization={handleChangeOpenSummarizeDialog}
      />
    </>
  );
};

export default LiteItem;
