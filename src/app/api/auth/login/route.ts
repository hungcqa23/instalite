import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const cookieStorage = cookies();
  const res = await fetch('http://localhost:8000/auth/logout', {
    method: 'POST',
    headers: {
      Cookie: `access_token=${cookieStorage.get('access_token')?.value}; refresh_token=${cookieStorage.get('refresh_token')?.value}`
    }
  });

  cookieStorage.delete('access_token');
  cookieStorage.delete('refresh_token');
  return Response.json(
    {
      message: 'Hello World!'
    },
    {
      status: 200
    }
  );
}
