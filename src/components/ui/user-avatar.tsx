'use client';

import { useAppContext } from '@/app/context/app-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Account } from '@/schema-validations/account.schema';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import React, { useState } from 'react';

export default function UserAvatar() {
  const accessToken = getCookie('access_key');
  const [user, setUser] = useState<Account>();
  const { data } = useQuery({
    queryKey: ['users', accessToken],
    queryFn: async () => {
      const res = await fetch('http://localhost:8000/users/me', {
        method: 'GET',
        headers: {
          Cookie: `access_token=${accessToken}`
        },
        credentials: 'include'
      });

      const data = await res.json();
      const { user }: { user: Account } = data;
      setUser(user);

      return data;
    }
  });

  return (
    <Avatar className='mt-0.5 h-8 w-8'>
      <AvatarImage src={user?.avatar} alt='@shadcn' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
