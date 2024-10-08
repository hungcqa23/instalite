'use client';

import { Bookmark } from '@/components/icons';
import {
  useBookmarkMutation,
  useGetBookmarkByPostIdQuery,
  useUnBookmarkMutation
} from '@/hooks/queries/useBookmark';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const ButtonBookMark = ({ liteId }: { liteId: string }) => {
  const [bookmarked, setBookmarked] = useState(false);
  // Bookmark
  const { data: bookmarkData, isLoading: isBookmarkLoading } = useGetBookmarkByPostIdQuery(liteId);
  const isBookmarked = bookmarkData?.data || false;
  const bookmarkMutation = useBookmarkMutation();
  const unBookmarkMutation = useUnBookmarkMutation();
  const handleBookmark = (bookmarked: boolean) => {
    if (!bookmarked) bookmarkMutation.mutate(liteId);
    else unBookmarkMutation.mutate(liteId);
  };

  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  return (
    <button
      onClick={() => {
        setBookmarked(!bookmarked);
        handleBookmark(bookmarked);
      }}
    >
      <Bookmark
        className={`${cn('h-5 w-5 cursor-pointer stroke-black transition-colors duration-300', {
          'fill-black dark:fill-white dark:stroke-white': bookmarked,
          'fill-white dark:fill-black dark:stroke-white': !bookmarked
        })}`}
      />
    </button>
  );
};

export default ButtonBookMark;
