'use client';

import PostsSkeleton from '@/components/sections/home/posts-skeleton';
import { List, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import LiteItem from '@/components/ui/lite';
import { usePostByUsername } from '@/hooks/queries/usePost';
import { useSaved } from '@/hooks/queries/useSaved';
import { createQueryString, deleteQueryString } from '@/lib/handle-query-string';
import { useUserStore } from '@/stores/user.stores';
import { User } from '@/types/schema-validations/account.schema';
import { Post } from '@/types/schema-validations/post.schema';
import { Bookmark, Grid2X2 } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';

export default function Tab({ user }: { user: User }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const value = searchParams.get('tab') || 'post';

  const createQueryStringCallback = useCallback(
    (name: string, value: string) => createQueryString(name, value, searchParams),
    [searchParams]
  );

  const deleteQueryStringCallback = useCallback(
    (name: string) => deleteQueryString(name, searchParams),
    [searchParams]
  );

  const { data: savedPostsData, isLoading: isLoadingSaved } = useSaved();
  const savedPosts = savedPostsData?.data || [];

  const { data: userPostsData, isLoading: isLoadingUserPosts } = usePostByUsername(user.username);
  const userPosts = userPostsData?.data || [];

  const { user: currentUser } = useUserStore();

  const isCurrentUser = user.username === currentUser?.username;

  return (
    <div className='mt-8'>
      <Tabs
        className='w-full'
        value={value}
        onValueChange={value => {
          if (value === 'saved')
            router.push(`${pathname}?${createQueryStringCallback('tab', 'saved')}`);
          else router.push(`${pathname}?${deleteQueryStringCallback('tab')}`);
        }}
      >
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
          {isLoadingUserPosts && <PostsSkeleton className='mt-6' />}

          {userPosts.length > 0 &&
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
              className: 'mt-6'
            })}
        </TabsContent>

        <TabsContent value='saved' className='w-full text-sm'>
          {isCurrentUser && isLoadingSaved && <PostsSkeleton />}

          {isCurrentUser &&
            !isLoadingSaved &&
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
              className: 'mt-6'
            })}

          {!isCurrentUser && !isLoadingSaved && (
            <div className='mt-14 flex w-full justify-center font-semibold'>
              This area is restricted for you, it belongs to this user only.
            </div>
          )}

          {isLoadingUserPosts && <PostsSkeleton />}
        </TabsContent>
      </Tabs>
    </div>
  );
}
