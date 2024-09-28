'use client';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui';
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
import { Dispatch, SetStateAction } from 'react';

interface SummarizeDialogProps {
  openSummarizeDialog: boolean;
  setOpenSummarizeDialog: Dispatch<SetStateAction<boolean>>;
  content: string;
}

const SummarizeDialog: React.FC<SummarizeDialogProps> = ({
  openSummarizeDialog,
  setOpenSummarizeDialog,
  content
}: SummarizeDialogProps) => {
  const handleDialogChange = (open: boolean) => {
    if (!open) setOpenSummarizeDialog(true);
    else setOpenSummarizeDialog(false);
  };

  const DialogHeaderContent = () => {
    return (
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
    );
  };
  return (
    <>
      <Dialog open={openSummarizeDialog} onOpenChange={handleDialogChange}>
        <DialogContent className='select-none dark:bg-zinc-950 sm:max-w-[34rem]'>
          <DialogHeaderContent />

          <p>{content}</p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SummarizeDialog;
