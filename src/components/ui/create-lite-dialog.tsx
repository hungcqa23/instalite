'use client';

import React, { ReactNode, useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Image } from 'lucide-react';

interface CreateLiteDialogProps {
  children: ReactNode;
}

const CreateLiteDialog: React.FC<CreateLiteDialogProps> = ({
  children
}: {
  children: ReactNode;
}) => {
  const [text, setText] = useState('');
  const [privacy, setPrivacy] = useState('Anyone can answer');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to measure the scroll height accurately
      textareaRef.current.style.height = 'auto';
      // Set height based on scroll height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleSelectPrivacy = (option: string) => {
    setPrivacy(option);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className=' dark:bg-zinc-950 sm:max-w-[34rem]'>
        <DialogHeader>
          <DialogTitle className='flex justify-center text-sm font-bold'>
            New Lite
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-col '>
          <div className='flex flex-row'>
            <Avatar className='h-8 w-8 cursor-pointer  '>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='ms-2.5 flex flex-col'>
              <div className='text-sm font-semibold'>AnHung DepTry</div>
              <textarea
                ref={textareaRef}
                placeholder='Write something...'
                className=' max-h-[60vh] w-[28rem] resize-none overflow-y-auto bg-transparent py-1 text-sm font-normal outline-none'
                rows={1}
                value={text}
                onChange={handleChange}
              />
              <Image className='mt-2 cursor-pointer' />
            </div>
          </div>
          <div className='mt-2 flex flex-row items-center justify-between '>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='cursor-pointer text-sm font-medium'>
                  {privacy}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='start'
                className='-ms-3 w-56 rounded-xl dark:bg-zinc-950'
              >
                <DropdownMenuItem
                  className='ms-1 cursor-pointer rounded-md font-medium'
                  onClick={() => handleSelectPrivacy('Anyone can answer')}
                >
                  Anyone can answer
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className='ms-1  cursor-pointer rounded-md font-medium'
                  onClick={() => handleSelectPrivacy('Following users')}
                >
                  Following users
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className='ms-1  cursor-pointer rounded-md font-medium'
                  onClick={() => handleSelectPrivacy('Only users mentioned')}
                >
                  Only users mentioned
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className='rounded-3xl'>Post</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLiteDialog;
