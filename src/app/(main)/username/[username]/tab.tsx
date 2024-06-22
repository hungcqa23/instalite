'use client';

import { useAppContext } from '@/app/context/app-context';
import { usePostByUsername } from '@/app/queries/use-post';
import { useSaved } from '@/app/queries/use-saved';
import List from '@/components/ui/list';
import LiteItem from '@/components/ui/LiteItem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User } from '@/schema-validations/account.schema';
import { Post } from '@/schema-validations/post.schema';
import { Bookmark, Grid2X2, ImageIcon, Repeat2 } from 'lucide-react';
import React from 'react';

export default function Tab({
  user
}: {
  user: {
    user: User;
  } & {
    is_following: boolean;
  };
}) {
  const { data } = useSaved();
  const posts = data?.map((post: any) => post?.post_id);
  const { data: userPostsData } = usePostByUsername(user.user.username || '');
  const currentPosts = userPostsData?.result;
  const { user: currentUser, setUser } = useAppContext();

  return (
    <div className='w- mt-[31px]'>
      <Tabs defaultValue='post' className='w-full'>
        <TabsList className='flex w-full rounded-none border-b bg-transparent p-0 dark:bg-transparent'>
          <TabsTrigger
            className='shadow-none data-[state=active]:shadow-none  relative flex h-9 w-full gap-1.5 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-base font-semibold uppercase text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground'
            value='post'
          >
            <Grid2X2 className='h-8 w-8 md:h-6 md:w-6' />{' '}
            <span className='hidden md:inline'>Lite</span>
          </TabsTrigger>

          {/* {user?.username === currentUser?.username && (
            <TabsTrigger
              className='shadow-none data-[state=active]:shadow-none relative flex h-9 w-32 gap-1.5 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-base font-semibold uppercase text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground'
              value='saved'
            >
              <Bookmark className='h-8 w-8 md:h-6 md:w-6' />
              <span className='hidden md:inline'>Saved</span>
            </TabsTrigger>
          )} */}
          <TabsTrigger
            className='shadow-none data-[state=active]:shadow-none relative flex h-9 w-full gap-1.5 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-base font-semibold uppercase text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground'
            value='saved'
          >
            <Bookmark className='h-8 w-8 md:h-6 md:w-6' />
            <span className='hidden md:inline'>Saved</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value='post' className='w-full text-sm'>
          {currentPosts &&
            currentPosts?.length !== 0 &&
            List<Post>({
              listItems: currentPosts || [],
              mapFn: (post: Post, index: number) => (
                <div
                  className='mt-2 flex w-full max-w-[30rem] flex-col xl:ml-[calc((100%-30rem)/2)] xl:mr-20'
                  key={index}
                >
                  <div className='flex flex-col items-center'>
                    <LiteItem lite={post} isLink />
                  </div>
                </div>
              ),
              className: 'mt-8'
              // className: 'w-full xl:block flex flex-col items-center'
            })}
        </TabsContent>

        {/* {user?.username === currentUser?.username && (
          <TabsContent value='saved' className='text-sm'>
            Saved
          </TabsContent>
        )} */}
        {user?.user.username === currentUser?.username ? (
          <TabsContent value='saved' className=' w-full text-sm'>
            {posts &&
              posts.length !== 0 &&
              List<Post>({
                listItems: posts || [],
                mapFn: (post: Post, index: number) => (
                  <div
                    className='mt-2 flex w-full max-w-[30rem] flex-col xl:ml-[calc((100%-30rem)/2)] xl:mr-20'
                    key={index}
                  >
                    <div className='flex flex-col items-center'>
                      <LiteItem lite={post} isLink />
                    </div>
                  </div>
                ),
                className: 'mt-8'
                // className: 'w-full xl:block flex flex-col items-center'
              })}
          </TabsContent>
        ) : (
          <div className='mt-14 flex w-full justify-center font-bold'>
            This area is restricted for you, it belongs to this user only.
          </div>
        )}
      </Tabs>
    </div>
  );
}
