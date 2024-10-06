'use client';

import {
  AvatarUser,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui';
import CancelDialog from '@/components/ui/lite/CancelDialog';
import { http } from '@/lib/http';
import { useUserStore } from '@/stores/user.stores';
import { Post } from '@/types/schema-validations/post.schema';
import { useMutation } from '@tanstack/react-query';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import '@vidstack/react/player/styles/default/theme.css';
import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

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
  const { user } = useUserStore();

  const [text, setText] = useState('');
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
    if (openEditDialog) fetchContent();

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
      // const { post }: { post: Post } = res;
      // console.log(post.content);
      // setText(post.content);
      // setPost(post);
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
    if (!open) setOpenCancelDialog(true);
    else setOpenEditDialog(open);
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
            <DialogTitle className='flex justify-center text-sm font-bold'>Edit Lite</DialogTitle>
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
              <AvatarUser src={user?.avatar} />
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
              <Button className='rounded-3xl' onClick={() => handleUpdatePost(text)}>
                Update
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {openCancelDialog && (
        <CancelDialog
          openCancelDialog={openCancelDialog}
          setOpenCancelDialog={setOpenCancelDialog}
          cancelClose={cancelClose}
          confirmClose={confirmClose}
        />
      )}
    </>
  );
};

export default EditLiteDialog;
