import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Grid2X2, ImageIcon, Bookmark, Repeat2, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export const metadata = {
  title: 'AnHyng DepTry (@andrehelokity)'
};

export default function MeProfile() {
  // const cookieStore = cookies();
  // const accessToken = cookieStore.get('access_token');
  // const refreshToken = cookieStore.get('refresh_token');
  // console.log('Hello World!');
  // console.log(accessToken, refreshToken);

  return (
    <>
      <div className='mt-4 max-w-[34.9375rem] items-start justify-center'>
        <div className='flex flex-col'>
          <div className='flex h-20 justify-between '>
            <div className='mt-4 flex flex-col items-start justify-start space-y-2'>
              <p className='text-lg font-medium'>AnHyng DepTry</p>
              <p className='text-sm font-light'>andrehelokity</p>
            </div>

            <Avatar className='static h-20 w-20'>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className='mt-4 flex justify-between text-sm'>
            <Button
              variant={'link'}
              className='cursor-default p-0 hover:no-underline'
            >
              <p className='font-light'>
                <span className='font-normal'>2</span> posts
              </p>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={'link'} className='p-0 hover:no-underline'>
                  <p className='font-light'>
                    <span className='font-normal'>50</span> followers
                  </p>
                </Button>
              </DialogTrigger>
              <DialogContent className='dark:bg-zinc-950 sm:max-w-[31.25rem]'>
                <DialogHeader>
                  <DialogTitle className='flex justify-center text-sm font-bold'>
                    Followers
                  </DialogTitle>
                </DialogHeader>
                <div className='flex flex-row items-center justify-center border-b-2 border-t-2 border-gray-300 py-2'>
                  <Search className=' text-gray-400' />
                  <Input
                    placeholder='Search for user'
                    className='border-none focus-visible:ring-0'
                  />
                </div>
                <div className='h-[300px]'></div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant={'link'} className='p-0 hover:no-underline'>
                  <p className='font-light'>
                    <span className='font-normal'>74</span> following
                  </p>
                </Button>
              </DialogTrigger>
              <DialogContent className='w-[456px] dark:bg-zinc-950 sm:max-w-[500px]'>
                <DialogHeader>
                  <DialogTitle className='flex justify-center text-sm font-bold'>
                    Following
                  </DialogTitle>
                </DialogHeader>

                <div className='flex flex-row items-center justify-center border-b-2 border-t-2 border-gray-300 py-2'>
                  <Search className=' text-gray-400' />
                  <Input
                    placeholder='Search for user'
                    className='border-none focus-visible:ring-0'
                  />
                </div>
                <div className='h-[300px]'></div>
              </DialogContent>
            </Dialog>
          </div>
          <div className='mt-3.5 max-w-full text-sm'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </div>
        </div>
        {/* Visit other account profile */}
        <div className='flex flex-row gap-2'>
          <Button
            className='mt-3.5 w-full text-sm dark:bg-zinc-50 dark:hover:bg-zinc-50'
            variant={'default'}
          >
            Follow
          </Button>
          <Button
            className='mt-3.5 w-full text-sm dark:bg-zinc-950 dark:hover:bg-transparent'
            variant={'outline'}
          >
            Mention
          </Button>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className='mt-3.5 w-full text-sm dark:bg-zinc-950 dark:hover:bg-transparent'
              variant={'outline'}
            >
              Edit profile
            </Button>
          </DialogTrigger>
          <DialogContent className='dark:bg-zinc-950 sm:max-w-[500px]'>
            <DialogHeader>
              <DialogTitle className='flex justify-center text-sm font-bold'>
                Profile
              </DialogTitle>
            </DialogHeader>
            <div className='flex flex-col gap-1'>
              <div className='flex flex-row justify-between '>
                <div className='flex flex-col'>
                  <Label className='text-sm font-semibold'>Username</Label>
                  <Input
                    className='mt-1 w-[378px] '
                    placeholder='Enter your username'
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className='mt-2.5 h-[50px] w-[50px] cursor-pointer  '>
                      <AvatarImage
                        src='https://github.com/shadcn.png'
                        alt='@shadcn'
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align='end'
                    className='w-30 rounded-xl dark:bg-zinc-950 '
                  >
                    <DropdownMenuItem className=' rounded-md font-medium dark:hover:bg-zinc-950'>
                      Upload
                    </DropdownMenuItem>

                    <DropdownMenuItem className=' rounded-md font-medium text-red-600 dark:hover:bg-zinc-950'>
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className='mt-2 flex flex-col'>
                <Label className='text-sm font-semibold'>Name</Label>
                <Input className='mt-1 w-full ' placeholder='Enter your name' />
              </div>
              <div className='mt-2 flex flex-col'>
                <Label className='text-sm font-semibold'>Bio</Label>
                <Input className='mt-1 w-full ' placeholder='Enter your bio' />
              </div>
            </div>
            <DialogFooter>
              <Button className='mt-1 w-full' type='submit'>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className='mt-[31px]'>
          <Tabs defaultValue='post' className='w-full'>
            <TabsList className='flex w-full justify-between rounded-none border-b bg-transparent p-0 dark:bg-transparent'>
              <Link href='/me'>
                <TabsTrigger
                  className='shadow-none data-[state=active]:shadow-none  relative flex h-9 w-32 gap-1.5 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-base font-semibold uppercase text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground'
                  value='post'
                >
                  <Grid2X2 className='h-8 w-8 md:h-6 md:w-6' />{' '}
                  <span className='hidden md:inline'>Lite</span>
                </TabsTrigger>
              </Link>
              <TabsTrigger
                className='shadow-none data-[state=active]:shadow-none  relative flex h-9 w-32 gap-1.5 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-base font-semibold uppercase text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground'
                value='image'
              >
                <ImageIcon className='h-8 w-8 md:h-6 md:w-6' />{' '}
                <span className='hidden md:inline'>Image</span>
              </TabsTrigger>
              <Link href='/me/saved'>
                <TabsTrigger
                  className='shadow-none data-[state=active]:shadow-none relative flex h-9 w-32 gap-1.5 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-base font-semibold uppercase text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground'
                  value='saved'
                >
                  <Bookmark className='h-8 w-8 md:h-6 md:w-6' />
                  <span className='hidden md:inline'> Saved</span>
                </TabsTrigger>
              </Link>
              <Link href='/me/relite'>
                <TabsTrigger
                  className='shadow-none data-[state=active]:shadow-none relative flex h-9 w-32 gap-1.5 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-base font-semibold uppercase text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground'
                  value='repost'
                >
                  <Repeat2 className='h-8 w-8 md:h-6 md:w-6' />{' '}
                  <span className='hidden md:inline'>Relite</span>
                </TabsTrigger>
              </Link>
            </TabsList>

            <TabsContent value='post' className='text-sm'>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. Lorem Ipsum
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industrys standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industrys standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industrys standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industrys standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industrys standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industrys standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industrys standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industrys standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industrys standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book.
              </p>
            </TabsContent>
            <TabsContent value='image' className='text-sm'>
              Image
            </TabsContent>
            <TabsContent value='saved' className='text-sm'>
              Saved
            </TabsContent>
            <TabsContent value='repost' className='text-sm'>
              Repost
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}