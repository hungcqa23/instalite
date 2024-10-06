import { XIcon } from '@/components/icons';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { Description } from '@radix-ui/react-dialog';
import React from 'react';

interface Props {
  title: string;
  isOpen?: boolean;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  classNameContent?: string;
  description?: string;
  isDisabledClose?: boolean;
  handleClose?: () => void;
  handleOpenChange?: (open: boolean) => void;
}

const CustomDialog = ({
  title,
  isOpen,
  trigger,
  children,
  description = '',
  isDisabledClose = true,
  classNameContent = '',
  handleClose,
  handleOpenChange
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        className={cn('select-none dark:bg-zinc-950 sm:max-w-[34rem]', classNameContent)}
      >
        <DialogHeader>
          <DialogTitle className='flex justify-center text-sm font-bold'>{title}</DialogTitle>
          <Description>{description}</Description>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export { CustomDialog };
