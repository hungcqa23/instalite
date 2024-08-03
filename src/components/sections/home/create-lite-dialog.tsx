'use client';

import { useAppContext } from '@/app/context/app-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/form/input';
import ImagePreview from '@/components/ui/preview-image';
import { http } from '@/lib/http';
import { DialogClose } from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { Clapperboard, ImageIcon, X } from 'lucide-react';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

interface CreateLiteDialogProps {
  children: ReactNode;
}

const CreateLiteDialog: React.FC<CreateLiteDialogProps> = ({
  children
}: {
  children: ReactNode;
}) => {
  const queryClient = useQueryClient();
  const { user } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [privacy, setPrivacy] = useState('Anyone can answer');
  const [images, setImages] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

  const createPostMutation = useMutation({
    mutationFn: async (text: string) => {
      return await http.post('/posts', {
        content: text,
        typePost: 0
      });
    }
  });
  const accessToken = getCookie('access_key');

  const updatePostMutation = useMutation({
    mutationFn: async ({
      postId,
      formData
    }: {
      postId: string;
      formData: FormData;
    }) => {
      const res = await fetch(`http://localhost:8000/posts/${postId}`, {
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
      setIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: ['posts']
      });
      window.location.reload();
    }
  });

  const updateVideoMutation = useMutation({
    mutationFn: async ({
      postId,
      formData
    }: {
      postId: string;
      formData: FormData;
    }) => {
      const res = await fetch(
        `http://localhost:8000/posts/${postId}/upload-hls`,
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
      setIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: ['posts']
      });
      // window.location.reload();
    }
  });

  const resetDialog = useCallback(() => {
    setText('');
    setPrivacy('Anyone can answer');
    setImages([]);
    setImageFile(null);
    setVideoFile(null);
    setVideoUrl(null);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const confirmClose = () => {
    setOpenCancelDialog(false);
    setIsOpen(false);
    resetDialog();
  };

  const cancelClose = () => {
    setOpenCancelDialog(false);
    setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
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

  const handleDialogChange = (open: boolean) => {
    if (!open && (text || images.length > 0 || videoUrl)) {
      setOpenCancelDialog(true);
    } else {
      setIsOpen(open);
      if (!open) resetDialog();
    }
  };

  const handleCreatePost = async (content: string) => {
    if (content === null || content === '') content = ' ';
    const res = await createPostMutation.mutateAsync(content);
    const postId = res.post._id;
    if (!postId) return;
    const formData = new FormData();

    if (videoFile) {
      formData.append('media', videoFile);
      await updateVideoMutation.mutateAsync({
        postId,
        formData
      });
      setText('');
      return;
    } else if (imageFile) {
      formData.append('media', imageFile);

      const updateImage = await updatePostMutation.mutateAsync({
        postId,
        formData
      });
      setText('');
      return;
    } else window.location.reload();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleDialogChange}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className='select-none dark:bg-zinc-950 sm:max-w-[34rem]'>
          <DialogHeader>
            <DialogTitle className='flex justify-center text-sm font-bold'>
              New Lite
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
                <div className='text-sm font-semibold'>{user?.username}</div>
                <textarea
                  ref={textareaRef}
                  placeholder='Write something...'
                  className='max-h-[60vh] w-[28rem] resize-none overflow-y-auto bg-transparent py-1 text-sm font-normal outline-none'
                  rows={1}
                  value={text}
                  autoFocus
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
                    className='my-3 w-full max-w-full'
                  >
                    <CarouselContent className='-ml-1 flex w-full max-w-full'>
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
                disabled={
                  text.length != 0 || imageFile || videoFile ? false : true
                }
                onClick={() => handleCreatePost(text)}
              >
                Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {openCancelDialog && (
        <Dialog open={openCancelDialog} onOpenChange={setOpenCancelDialog}>
          <DialogContent className='select-none px-0 pb-0 pt-4 dark:bg-zinc-950 sm:max-w-[20rem]'>
            <DialogHeader>
              <DialogTitle className='mb-0 flex justify-center text-sm font-bold'>
                Close Lite?
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
};

export default CreateLiteDialog;
