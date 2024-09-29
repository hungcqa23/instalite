'use client';

import { Bookmark } from '@/components/ui/icons';
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
  const isBookmarked = bookmarkData?.result || false;
  const bookmarkMutation = useBookmarkMutation();
  const unBookmarkMutation = useUnBookmarkMutation();
  const handleBookmark = (bookmarked: boolean) => {
    if (!bookmarked) bookmarkMutation.mutate(liteId);
    unBookmarkMutation.mutate(liteId);
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
        className={`${cn('h-5 w-5 cursor-pointer transition-colors duration-300', {
          'fill-black stroke-black dark:fill-white dark:stroke-white': bookmarked,
          'fill-white stroke-black dark:fill-black dark:stroke-white': !bookmarked
        })}`}
      />
    </button>
  );
};

export default ButtonBookMark;
