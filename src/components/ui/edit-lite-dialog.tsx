'use client';

import { useAppContext } from '@/app/context/app-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { http } from '@/lib/http';
import { Post } from '@/schema-validations/post.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MediaPlayer, MediaProvider, Poster, Track } from '@vidstack/react';
import {
  DefaultVideoLayout,
  defaultLayoutIcons
} from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import '@vidstack/react/player/styles/default/theme.css';
import { X } from 'lucide-react';
import { duration } from 'moment';
import Image from 'next/image';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

interface EditLiteDialogProps {
  openEditDialog: boolean;
  setOpenEditDialog: Dispatch<SetStateAction<boolean>>;
  liteId: string;
}

const EditLiteDialog: React.FC<EditLiteDialogProps> = ({
  openEditDialog,
  setOpenEditDialog,
  liteId
}: EditLiteDialogProps) => {
  const { user } = useAppContext();

  const [text, setText] = useState('');
  const { toast } = useToast();
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  useEffect(() => {
    if (openEditDialog) {
      fetchContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditDialog]);

  const getPostContentMutation = useMutation({
    mutationFn: async () => {
      return await http.get(`/posts/${liteId}`);
    }
  });

  const fetchContent = async () => {
    try {
      const res = await getPostContentMutation.mutateAsync();
      const { post }: { post: Post } = res;
      console.log(post.content);
      setText(post.content);
      setPost(post);
    } catch (error) {
      console.error('Failed to fetch content:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const confirmClose = () => {
    setOpenCancelDialog(false);
    setOpenEditDialog(false);
  };

  const cancelClose = () => {
    setOpenCancelDialog(false);
    setOpenEditDialog(true);
  };

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      setOpenCancelDialog(true);
    } else {
      setOpenEditDialog(open);
    }
  };

  const updatePostMutation = useMutation({
    mutationFn: async (content: string) => {
      return await http.patch(`/posts/${liteId}`, {
        content: content
      });
    }
  });

  const handleUpdatePost = async (content: string) => {
    const res = await updatePostMutation.mutateAsync(content);

    setOpenEditDialog(false);
    window.location.reload();
  };

  return (
    <>
      <Dialog open={openEditDialog} onOpenChange={handleDialogChange}>
        <DialogContent className='select-none dark:bg-zinc-950 sm:max-w-[34rem]'>
          <DialogHeader>
            <DialogTitle className='flex justify-center text-sm font-bold'>
              Edit Lite
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
                  autoFocus={true}
                  onChange={handleChange}
                />
                {post?.media?.type == 0 && (
                  <div className='my-2'>
                    <Image
                      src={post.media.url}
                      alt='image'
                      width={430}
                      height={430}
                      className='rounded-md border-2'
                    />
                  </div>
                )}

                {post?.media?.type == 1 && (
                  <MediaPlayer
                    src={`http://localhost:8000/files/video-hls/${post._id}/master.m3u8`}
                    viewType='video'
                    streamType='on-demand'
                    logLevel='warn'
                    className='my-2'
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
              </div>
            </div>
            <div className='mt-2 flex flex-row items-end justify-end'>
              <Button
                className='rounded-3xl'
                onClick={() => handleUpdatePost(text)}
              >
                Update
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
                Close edit?
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

export default EditLiteDialog;
