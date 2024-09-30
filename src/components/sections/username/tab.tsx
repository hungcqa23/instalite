'use client';

import { List, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import LiteItem from '@/components/ui/lite';
import { usePostByUsername } from '@/hooks/queries/usePost';
import { useSaved } from '@/hooks/queries/useSaved';
import { useUserStore } from '@/stores/user.stores';
import { User } from '@/types/schema-validations/account.schema';
import { Post } from '@/types/schema-validations/post.schema';
import { Bookmark, Grid2X2 } from 'lucide-react';
import React from 'react';

export default function Tab({ user }: { user: User }) {
  const { data: savedPostsData } = useSaved();
  const savedPosts = savedPostsData?.data || [];
  const { data: userPostsData } = usePostByUsername(user.username);
  const userPosts = userPostsData?.data || [];
  const { user: currentUser, setUser } = useUserStore();

  const isCurrentUser = user.username === currentUser?.username;

  return (
    <div className='w- mt-[31px]'>
      <Tabs defaultValue='post' className='w-full'>
        <TabsList className='flex w-full rounded-none border-b bg-transparent p-0 dark:bg-transparent'>
          <TabsTrigger
            className='shadow-none data-[state=active]:shadow-none relative flex h-9 w-full gap-1.5 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-base font-semibold uppercase text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground'
            value='post'
          >
            <Grid2X2 className='h-8 w-8 md:h-6 md:w-6' />
            <span className='hidden md:inline'>Lite</span>
          </TabsTrigger>

          <TabsTrigger
            className='shadow-none data-[state=active]:shadow-none relative flex h-9 w-full gap-1.5 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-base font-semibold uppercase text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground'
            value='saved'
          >
            <Bookmark className='h-8 w-8 md:h-6 md:w-6' />
            <span className='hidden md:inline'>Saved</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value='post' className='w-full text-sm'>
          {userPosts &&
            userPosts.length > 0 &&
            List<Post>({
              listItems: userPosts,
              mapFn: (post: Post) => (
                <div
                  className='mt-2 flex w-full max-w-[30rem] flex-col xl:ml-[calc((100%-30rem)/2)] xl:mr-20'
                  key={post._id}
                >
                  <div className='flex flex-col items-center'>
                    <LiteItem lite={post} isLink />
                  </div>
                </div>
              ),
              className: 'mt-8'
            })}
        </TabsContent>

        <TabsContent value='saved' className='w-full text-sm'>
          {isCurrentUser &&
            savedPosts.length >= 0 &&
            List({
              listItems: savedPosts,
              mapFn: savedPost => (
                <div
                  className='mt-2 flex w-full max-w-[30rem] flex-col xl:ml-[calc((100%-30rem)/2)] xl:mr-20'
                  key={savedPost._id}
                >
                  <div className='flex flex-col items-center'>
                    <LiteItem lite={savedPost.postId} isLink />
                  </div>
                </div>
              ),
              className: 'mt-8'
            })}

          {!isCurrentUser && (
            <div className='mt-14 flex w-full justify-center font-semibold'>
              This area is restricted for you, it belongs to this user only.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
