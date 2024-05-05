'use client';
import React, { ReactNode, useState } from 'react';
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

const CreateLiteDialog: React.FC<CreateLiteDialogProps> = ({ children }) => {
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    const textarea = event.target;
    const lineHeight = parseFloat(window.getComputedStyle(textarea).lineHeight);
    const previousRows = textarea.rows;
    textarea.rows = 1; // Reset rows to calculate height accurately
    const currentRows = Math.ceil(textarea.scrollHeight / lineHeight);
    textarea.rows = currentRows;
    // Check if the number of rows has changed, if so, force a reflow to adjust the height
    if (currentRows !== previousRows) {
      const container = textarea.parentElement;
      if (container) {
        const tempDisplay = container.style.display;
        container.style.display = 'none'; // Hide container temporarily to force reflow
        container.offsetHeight; // Trigger reflow
        container.style.display = tempDisplay; // Restore display property
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className='overflow-y-auto dark:bg-stone-950 sm:max-w-[34rem]'>
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
                placeholder='Write something...'
                className=' w-[28rem] resize-none bg-transparent py-1 text-sm outline-none'
                style={{
                  overflowY: text.split('\n').length > 1 ? 'auto' : 'hidden'
                }}
                rows={1}
                value={text}
                onChange={handleChange}
              />
              <Image className='mt-1 cursor-pointer' />
            </div>
          </div>
          <div className='mt-2 flex flex-row items-center justify-between '>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='cursor-pointer text-sm font-medium'>
                  Anyone can answer
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='start'
                className='-ms-3 w-56 rounded-xl dark:bg-zinc-950 '
              >
                <DropdownMenuItem className='ms-1 cursor-pointer rounded-md font-medium hover:bg-transparent'>
                  Anyone can answer
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='ms-1  cursor-pointer rounded-md font-medium hover:bg-transparent'>
                  Following users
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='ms-1  cursor-pointer rounded-md font-medium hover:bg-transparent'>
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
