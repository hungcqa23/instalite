'use client';

import { useAppContext } from '@/app/context/app-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User } from '@/schema-validations/account.schema';
import { Bookmark, Grid2X2, ImageIcon, Repeat2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Tab({
  user
}: {
  user: User & {
    is_following: boolean;
  };
}) {
  const { user: currentUser } = useAppContext();

  return (
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
              <span className='hidden md:inline'>Saved</span>
            </TabsTrigger>
          </Link>
        </TabsList>

        <TabsContent value='post' className='text-sm'>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industrys standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a
            type specimen book. Lorem Ipsum is simply dummy text of the printing
            and typesetting industry. Lorem Ipsum has been the industrys
            standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book.
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industrys standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a
            type specimen book. Lorem Ipsum is simply dummy text of the printing
            and typesetting industry. Lorem Ipsum has been the industrys
            standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book.
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industrys standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a
            type specimen book. Lorem Ipsum is simply dummy text of the printing
            and typesetting industry. Lorem Ipsum has been the industrys
            standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book.
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </TabsContent>

        <TabsContent value='image' className='w-full max-w-full text-sm'>
          <div className='w-full'></div>
        </TabsContent>

        {user.username === currentUser?.username && (
          <TabsContent value='saved' className='text-sm'>
            Saved
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
