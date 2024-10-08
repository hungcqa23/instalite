'use client';

import { CustomDialog } from '@/components/customs';
import BtnClose from '@/components/sections/home/CreatedLiteDialog/btn-close';
import BtnCreatePost from '@/components/sections/home/CreatedLiteDialog/btn-create-lite';
import {
  AvatarUser,
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ImagePreview,
  Input,
  toast
} from '@/components/ui';
import CancelDialog from '@/components/ui/lite/CancelDialog';
import {
  useCreatePostMutation,
  useUpdatePostMutation,
  useUpdateVideoMutation
} from '@/hooks/queries/usePost';
import { useUserStore } from '@/stores/user.stores';
import { useQueryClient } from '@tanstack/react-query';
import { set } from 'date-fns';
import { Clapperboard, ImageIcon, X } from 'lucide-react';
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

const CreateLiteDialog = ({ children, className }: { children: ReactNode; className?: string }) => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  const [isOpenDialog, setIsOpenDialog] = useState({
    create: false,
    cancel: false
  });
  const [text, setText] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

  const createPostMutation = useCreatePostMutation();
  const updatePostMutation = useUpdatePostMutation();
  const updateVideoMutation = useUpdateVideoMutation();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const resetDialog = useCallback(() => {
    setIsOpenDialog({
      create: false,
      cancel: false
    });
    setText('');
    setImages([]);
    setImageFile(null);
    setVideoFile(null);
    setVideoUrl(null);
  }, []);

  const confirmClose = () => {
    setIsOpenDialog({
      create: false,
      cancel: false
    });
    resetDialog();
  };

  const cancelClose = () => {
    setIsOpenDialog({
      create: true,
      cancel: false
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

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

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
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

  const handleDialogChange = (open: boolean) => {
    if (open) {
      setIsOpenDialog({
        create: true,
        cancel: false
      });
      return;
    }

    const hasContent = Boolean(text.length > 0 || images.length > 0 || videoUrl);
    if (hasContent)
      setIsOpenDialog({
        create: true,
        cancel: true
      });
    else {
      setIsOpenDialog({
        create: false,
        cancel: false
      });
      resetDialog();
    }
  };

  useEffect(() => {
    if (updatePostMutation.status === 'pending' || updateVideoMutation.status === 'pending')
      setIsSubmitting(true);
    else setIsSubmitting(false);
  }, [updatePostMutation.status, updateVideoMutation.status]);

  const handleCreatePost = async (content: string) => {
    try {
      if (content === null || content === '') content = ' ';
      const res = await createPostMutation.mutateAsync(content);

      const postId = res.data._id;
      const formData = new FormData();

      if (videoFile) {
        formData.append('media', videoFile);
        await updateVideoMutation.mutateAsync({
          postId,
          formData
        });
      } else if (imageFile) {
        formData.append('media', imageFile);

        await updatePostMutation.mutateAsync({
          postId,
          formData
        });
      }

      resetDialog();
      queryClient.invalidateQueries({
        queryKey: ['posts']
      });

      toast({
        title: 'Successfully',
        description: 'Post created successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong'
      });
    }
  };

  const isDisabledButton =
    isSubmitting || (text.length == 0 && imageFile == null && videoFile == null);
  const isDisplayButtonsMedia = images.length == 0 && videoUrl == null;

  return (
    <>
      <CustomDialog
        title='New Post'
        isOpen={isOpenDialog.create}
        trigger={children}
        isDisabledClose={true}
        handleClose={resetDialog}
        handleOpenChange={handleDialogChange}
      >
        <div className='flex flex-col overflow-hidden'>
          <div className='flex flex-row'>
            <AvatarUser src={user?.avatar} />
            <div className='ms-2.5 flex max-w-full flex-col'>
              <div className='text-sm font-semibold'>{user?.username}</div>

              <textarea
                ref={textareaRef}
                placeholder='Write something...'
                className='max-h-[60vh] w-[28rem] resize-none overflow-y-auto bg-transparent py-1 text-sm font-normal outline-none'
                rows={1}
                value={text}
                autoFocus
                onChange={handleChange}
                disabled={isSubmitting}
              />

              {isDisplayButtonsMedia && (
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

              {images.length > 0 && (
                <Carousel
                  opts={{
                    align: 'start'
                  }}
                  className='my-3 w-full max-w-full'
                >
                  <CarouselContent className='-ml-1 flex w-full max-w-full'>
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
                  <BtnClose
                    className='absolute right-2 top-2 size-8 rounded-full bg-opacity-75 p-0 hover:bg-white'
                    onClick={handleDeleteVideo}
                    disabled={isSubmitting}
                  />
                </div>
              )}

              <>
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
              </>
            </div>
          </div>

          <div className='mt-2 flex flex-row items-end justify-end'>
            <BtnCreatePost onClick={() => handleCreatePost(text)} disabled={isDisabledButton} />
          </div>
        </div>
      </CustomDialog>

      {isOpenDialog.create && (
        <CancelDialog
          cancelClose={cancelClose}
          openCancelDialog={isOpenDialog.cancel}
          confirmClose={confirmClose}
          setOpenCancelDialog={() => setIsOpenDialog({ create: false, cancel: true })}
        />
      )}
    </>
  );
};

export { CreateLiteDialog };
