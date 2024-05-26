'use client';

import authApiRequest from '@/api-request/auth';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';

export default function ButtonLogout() {
  const router = useRouter();
  const cookieStore = cookies();
  const handleLogout = async () => {
    try {
      const res = await authApiRequest.logout();
      console.log(await res.json());
      cookieStore.delete('access_token');
      cookieStore.delete('refresh_token');
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DropdownMenuItem className='rounded-md'>
      <button
        className='flex h-6 w-56 items-center gap-2 rounded-md pl-2 text-base font-medium'
        onClick={handleLogout}
      >
        <LogOut size={22} /> Log out
      </button>
    </DropdownMenuItem>
  );
}
