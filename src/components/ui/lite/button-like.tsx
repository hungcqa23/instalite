'use client';

import { Heart } from '@/components/ui/icons';
import {
  useGetLikeByPostIdQuery,
  useLikeMutation,
  useUnlikeMutation
} from '@/hooks/queries/useLike';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';

const ButtonLike = ({ liteId }: { liteId: string }) => {
  const [liked, setLiked] = useState(false);
  // Like
  const { data: likeData, isLoading: isLikeLoading } = useGetLikeByPostIdQuery(liteId);
  const isLiked = likeData?.result || false;
  const likeMutation = useLikeMutation();
  const unLikeMutation = useUnlikeMutation();
  const handleLike = useCallback(
    (liked: boolean) => {
      if (liked) unLikeMutation.mutate(liteId);
      else likeMutation.mutate(liteId);
    },
    [liteId, unLikeMutation, likeMutation]
  );

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  return (
    <button
      onClick={() => {
        setLiked(!liked);
        handleLike(liked);
      }}
    >
      <Heart
        className={`${cn('h-5 w-5 cursor-pointer transition-colors duration-300', {
          'fill-red-500 stroke-red-500': liked,
          'fill-white stroke-black dark:fill-black dark:stroke-white': !liked
        })}`}
      />
    </button>
  );
};

export default ButtonLike;
