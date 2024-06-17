'use client';

import { useAppContext } from '@/app/context/app-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
export default function UserAvatar() {
  const { user } = useAppContext();
  return (
    <Avatar className='mt-0.5 h-8 w-8'>
      <AvatarImage src={user?.avatar} alt='@shadcn' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
