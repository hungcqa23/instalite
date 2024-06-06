'use client';

import React, {
  ReactNode,
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
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
import { ImageIcon, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import ImagePreview from '@/components/ui/preview-image';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import CancelLiteDialog from '@/components/ui/cancel-lite-dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import { Separator } from '@/components/ui/separator';

interface CreateLiteDialogProps {
  children: ReactNode;
}

const CreateLiteDialog: React.FC<CreateLiteDialogProps> = ({
  children
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [privacy, setPrivacy] = useState('Anyone can answer');
  const [images, setImages] = useState<string[]>([]);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetDialog = useCallback(() => {
    setText('');
    setPrivacy('Anyone can answer');
    setImages([]);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleCancelLite = (open: boolean) => {
    if (!open && (text || images.length > 0)) {
      setOpenCancelDialog(true);
    } else {
      setIsOpen(open);
      if (!open) resetDialog();
    }
  };

  const confirmClose = () => {
    setOpenCancelDialog(false);
    setIsOpen(false);
    resetDialog();
  };

  const cancelClose = () => {
    setOpenCancelDialog(false);
    setIsOpen(true);
  };

  const handleSelectPrivacy = (option: string) => {
    setPrivacy(option);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      const fileUrls = fileArray.map(file => URL.createObjectURL(file));
      setImages(prevImages => [...prevImages, ...fileUrls]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleDialogChange = (open: boolean) => {
    if (!open && (text || images.length > 0)) {
      setOpenCancelDialog(true);
    } else {
      setIsOpen(open);
      if (!open) resetDialog();
    }
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleDialogChange}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className=' select-none dark:bg-zinc-950 sm:max-w-[34rem]'>
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
              <Avatar className='h-8 w-8 cursor-pointer  '>
                <AvatarImage
                  src='https://github.com/shadcn.png'
                  alt='@shadcn'
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className='ms-2.5 flex max-w-full flex-col '>
                <div className='text-sm font-semibold'>AnHung DepTry</div>
                <textarea
                  ref={textareaRef}
                  placeholder='Write something...'
                  className=' max-h-[60vh] w-[28rem] resize-none overflow-y-auto bg-transparent py-1 text-sm font-normal outline-none'
                  rows={1}
                  value={text}
                  onChange={handleChange}
                />

                <Button
                  className='mt-2 flex w-[8rem] cursor-pointer gap-2 rounded-xl'
                  variant='outline'
                  onClick={handleImageClick}
                >
                  <ImageIcon /> Add Image
                </Button>
                <Input
                  type='file'
                  ref={fileInputRef}
                  multiple={true}
                  accept='image/*'
                  className='hidden'
                  onChange={handleFileChange}
                />
                {images.length > 0 && (
                  <Carousel
                    opts={{
                      align: 'start'
                    }}
                    className='my-3 w-full max-w-full '
                  >
                    <CarouselContent className='-ml-1 flex w-full max-w-full'>
                      {images.map((image, index) => (
                        <CarouselItem
                          key={index}
                          className=' basis-1/2 pl-1 pr-1'
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
                className=' w-full cursor-pointer rounded-br-3xl py-4 text-center font-semibold text-red-600'
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
