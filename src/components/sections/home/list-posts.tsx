'use client';

import PostsSkeleton from '@/components/sections/home/posts-skeleton';
import { List } from '@/components/ui';
import LiteItem from '@/components/ui/lite';
import { LoadingSpinner } from '@/components/ui/spinner';
import { useGetAllPostInfiniteQuery } from '@/hooks/queries/usePost';
import { Post, PostResType } from '@/types/schema-validations/post.schema';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const ListPost = () => {
  const { ref, inView } = useInView({
    threshold: 0.75
  });

  const {
    data: allPostsData,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useGetAllPostInfiniteQuery();

  const allPosts = allPostsData?.pages || [];

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className='-ms-10 h-full w-full'>
      <div className='flex w-full flex-col items-center justify-center'>
        {isLoading && <PostsSkeleton />}

        {allPosts.length > 0 &&
          allPosts.map((allPost: PostResType, index) => (
            <Fragment key={index}>
              {List({
                listItems: allPost.data.data,
                mapFn: (post: Post, index: number) => (
                  <div
                    className='mt-2 flex w-full max-w-[30rem] flex-col xl:ml-[calc((100%-30rem)/2)] xl:mr-20'
                    key={post._id}
                  >
                    <div className='flex flex-col items-center'>
                      <LiteItem
                        key={post._id}
                        lite={post}
                        isLink
                        innerRef={allPost.data.data.length - 1 === index ? ref : undefined}
                      />
                    </div>
                  </div>
                ),
                as: 'ul',
                className: 'w-full'
              })}
            </Fragment>
          ))}

        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default ListPost;
