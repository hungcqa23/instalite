import authApiRequest from '@/api-request/auth';
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
// import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import { deleteCookie, getCookie } from 'cookies-next';

export default function ButtonLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // await authApiRequest.logoutFromNextClientToServer();
      console.log(getCookie('access_token'));
      deleteCookie('access_token');
      deleteCookie('refresh_token');
      console.log('Hello World!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DropdownMenuItem
      className='flex h-6 w-56 gap-2 rounded-md py-4 pl-3 text-base font-medium'
      onClick={handleLogout}
    >
      <LogOut size={22} /> Log out
    </DropdownMenuItem>
  );
}
