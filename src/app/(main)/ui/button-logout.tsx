import authApiRequest from '@/api-request/auth';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function ButtonLogout() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      localStorage.clear();
      await authApiRequest.logoutFromNextClientToServer();
      deleteCookie('access_token');
      deleteCookie('refresh_token');
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
      <LogOut size={22} /> Log out
    </DropdownMenuItem>
  );
}
