'use client';

import PostsSkeleton from '@/components/sections/home/posts-skeleton';
import { List } from '@/components/ui';
import LiteItem from '@/components/ui/lite';
import { useGetAllPostsQuery } from '@/hooks/queries/usePost';
import { Post } from '@/types/schema-validations/post.schema';
import { useInView } from 'react-intersection-observer';

const ListPost = () => {
  const { ref, inView } = useInView({
    threshold: 0.75
  });

  // const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
  //   useInfiniteQuery({
  //     queryKey: ['posts'],
  //     queryFn: ({ pageParam }) => postApi.getAllPosts({ pageParam }),
  //     initialPageParam: 1,
  //     getNextPageParam: (
  //       lastPage: GetAllPosts,
  //       allPages: GetAllPosts[],
  //       lastPageParam: number
  //     ) => {
  //       // Total length of allPages
  //       const totalPages = allPages.reduce(
  //         (acc, page) => acc + page.posts.length,
  //         0
  //       );
  //       const nextPage =
  //         totalPages < lastPage.totalPosts ? lastPageParam + 1 : undefined;
  //       return nextPage;
  //     }
  //   });

  // useEffect(() => {
  //   if (inView && hasNextPage) {
  //     fetchNextPage();
  //   }
  // }, [inView, hasNextPage, fetchNextPage]);
  const { data, isLoading } = useGetAllPostsQuery();
  const posts = data?.data.data || [];

  return (
    <div className='-ms-10 h-full w-full'>
      <div className='flex w-full flex-col items-center xl:block'>
        {isLoading && <PostsSkeleton />}

        {posts.length > 0 &&
          List<Post>({
            listItems: posts,
            mapFn: (post: Post) => (
              <div
                className='mt-2 flex w-full max-w-[30rem] flex-col xl:ml-[calc((100%-30rem)/2)] xl:mr-20'
                key={post._id}
              >
                <div className='flex flex-col items-center'>
                  <LiteItem key={post._id} lite={post} isLink />
                </div>
              </div>
            )
          })}
      </div>
    </div>
  );
};

export default ListPost;
