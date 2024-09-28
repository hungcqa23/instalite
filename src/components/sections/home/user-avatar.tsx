'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  SkeletonContainer
} from '@/components/ui';
import { useUserStore } from '@/stores/user.stores';
import React from 'react';

const UserAvatar = () => {
  const { user } = useUserStore();
  if (!user) {
    return (
      <SkeletonContainer>
        <div className='size-8 rounded-full bg-slate-200' />
      </SkeletonContainer>
    );
  }

  return (
    <Avatar className='mt-0.5 h-8 w-8'>
      <AvatarImage src={user?.avatar} alt='@shadcn' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export { UserAvatar };
