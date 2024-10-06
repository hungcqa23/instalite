import { LogOut } from '@/components/icons';
import { DropdownMenuItem } from '@/components/ui';
import { useLogoutMutation } from '@/hooks/queries/useAuth';
import { useRouter } from 'next/navigation';
import React from 'react';

const ButtonLogout = () => {
  const router = useRouter();
  const logoutMutation = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      localStorage.clear();
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DropdownMenuItem
      className='flex h-6 w-56 gap-2 rounded-md py-4 pl-3 text-base font-medium'
      onClick={handleLogout}
    >
      <LogOut size={20} /> Log out
    </DropdownMenuItem>
  );
};

export { ButtonLogout };
