import BtnCta from '@/app/(main)/username/[username]/btn-cta';
import Profile from '@/app/(main)/username/[username]/profile';
import Tab from '@/app/(main)/username/[username]/tab';
import { http } from '@/lib/http';
import { User } from '@/types/schema-validations/account.schema';
import { cookies } from 'next/headers';

export async function generateMetadata({
  params
}: {
  params: { username: string };
}) {
  return { title: `@${params.username}` };
}

export default async function MeProfile({
  params
}: {
  params: { username: string };
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token');
  const refreshToken = cookieStore.get('refresh_token');

  const data = await http.get<{
    data: {
      user: User;
      isFollowing: boolean;
    };
  }>(`/users/${params.username}`, {
    headers: {
      Cookie: accessToken
        ? `access_token=${accessToken?.value}; refresh_token=${refreshToken?.value}`
        : ''
    }
  });

  const { user, isFollowing } = data.data;
  return (
    <>
      <div className='mt-4 w-full max-w-[34.9375rem] items-start justify-center'>
        <Profile
          user={user}
          isFollowing={isFollowing}
          username={params.username}
        />
        <BtnCta user={user} isFollowing={isFollowing} />

        {/* <Tab user={user} /> */}
      </div>
    </>
  );
}
