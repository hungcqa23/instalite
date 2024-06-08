'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Heart,
  MessageCircle,
  Repeat2,
  Send,
  Bookmark,
  Trash,
  Pencil,
  Sparkle,
  MessageSquareQuote
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { formatSocialNumber } from '@/lib/helper';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import DeleteLiteDialog from '@/components/ui/delete-lite-dialog';
import { Post } from '@/schema-validations/post.schema';
import { calculateTimeAgo } from '@/lib/helper';

export default function LiteItem({ lite }: { lite: Post }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [text, setText] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to measure the scroll height accurately
      textareaRef.current.style.height = 'auto';
      // Set height based on scroll height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <>
      <div className='mb-2 w-full border-b-[1px] border-gray-200 p-0 sm:pb-5'>
        <div className='mb-2 flex flex-row items-center justify-between'>
          <div className='flex flex-row items-end'>
            <Avatar className='z-[-1] h-9 w-9'>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='ms-2.5 flex flex-col justify-end '>
              <span className='text-[13px] font-semibold'>
                {lite?.user_id.username}
              </span>
              <span className='text-xs font-normal text-gray-500'>
                {calculateTimeAgo(lite?.created_at)}
              </span>
            </div>
          </div>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant={'link'} className='me-1 h-5 w-5 px-0'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-ellipsis'
                >
                  <circle cx='12' cy='12' r='1' />
                  <circle cx='19' cy='12' r='1' />
                  <circle cx='5' cy='12' r='1' />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='-ms-3 w-56 rounded-lg py-2 shadow-default dark:bg-zinc-950'
            >
              <DropdownMenuItem
                className='cursor-pointer gap-2 rounded-md font-medium'
                onClick={() => setOpenDeleteDialog(true)}
              >
                <Trash className='mb-0 h-4 w-4' />
                <span className=''>Delete lite</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer gap-2 rounded-md font-medium'>
                <Pencil className='mb-0 h-4 w-4' />
                <span className=''>Edit lite</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer gap-2 rounded-md font-medium'>
                <Sparkle className='mb-0 h-4 w-4' />
                <span className=''>Summarize with Relite AI</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className='mb-3 text-[0.8125rem]'>{lite?.content}</p>
        {/* {lite.url && (
          <div className='my-3'>
            <Image
              src={lite.url}
              alt='image'
              width={430}
              height={430}
              className=' rounded-md'
            />
          </div>
        )} */}
        <div className='my-3'>
          <Image
            src='https://images.unsplash.com/photo-1717201410616-205a82d7e3f9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='image'
            width={430}
            height={430}
            className=' rounded-md'
          />
        </div>
        <div className='mt-1 flex flex-row justify-between'>
          <div className='ms-0.5 flex flex-row gap-3'>
            <button
              onClick={() => {
                setLiked(prev => !liked);
              }}
            >
              <Heart
                className={`${clsx(
                  'h-5 w-5 cursor-pointer transition-colors duration-300',
                  {
                    'fill-red-500 stroke-red-500': liked,
                    'fill-white stroke-black dark:fill-black dark:stroke-white':
                      !liked
                  }
                )}`}
              />
            </button>
            <Dialog>
              <DialogTrigger>
                <MessageCircle className='h-5 w-5 cursor-pointer' />
              </DialogTrigger>
              <DialogContent className=' dark:bg-zinc-950 sm:max-w-[34rem]'>
                <DialogHeader>
                  <DialogTitle className='flex justify-center text-sm font-bold'>
                    Reply to {lite?.user_id.username}
                  </DialogTitle>
                </DialogHeader>
                <div className='flex flex-col'>
                  <div className='flex flex-row'>
                    <Avatar className='h-8 w-8 cursor-pointer  '>
                      <AvatarImage
                        src='https://github.com/shadcn.png'
                        alt='@shadcn'
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='ms-2.5 flex flex-col'>
                      <div className='text-sm font-semibold'>AnHung DepTry</div>
                      <textarea
                        ref={textareaRef}
                        placeholder='Write something...'
                        className=' max-h-[60vh] w-[28rem] resize-none overflow-y-auto bg-transparent py-1 text-sm outline-none'
                        rows={1}
                        value={text}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='mt-2 flex flex-row items-end justify-end'>
                    <Button className='rounded-3xl'>Post</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Repeat2 className='h-5 w-5 cursor-pointer' />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align='start'
                className='w-30 rounded-lg shadow-default dark:bg-zinc-950'
              >
                <DropdownMenuItem className=' gap-2 rounded-md font-medium dark:hover:bg-zinc-950'>
                  <Repeat2 className='mb-0 h-4 w-4' />
                  <div className='mt-0.5'>Relite</div>
                </DropdownMenuItem>

                <DropdownMenuItem className=' gap-2 rounded-md font-medium dark:hover:bg-zinc-950'>
                  <MessageSquareQuote className='mb-0 h-4 w-4' />
                  <div className='mt-0.5'>Quote</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Send className='h-5 w-5 cursor-pointer' />
          </div>

          <button onClick={() => setBookmarked(prev => !bookmarked)}>
            <Bookmark
              className={`${clsx(
                'h-5 w-5 cursor-pointer transition-colors duration-300',
                {
                  'fill-black stroke-black dark:fill-white dark:stroke-white':
                    bookmarked,
                  'fill-white stroke-black dark:fill-black dark:stroke-white':
                    !bookmarked
                }
              )}`}
            />
          </button>
        </div>

        <span className='mt-2 block text-xs font-medium text-black dark:text-white'>
          {formatSocialNumber(0)} likes
        </span>
        <button>
          <span className='text-xs text-slate-500'>See all 0 comments</span>
        </button>
      </div>
      {openDeleteDialog && (
        <DeleteLiteDialog
          setOpenDeleteDialog={setOpenDeleteDialog}
          liteId={lite?._id}
        />
      )}
    </>
  );
}
