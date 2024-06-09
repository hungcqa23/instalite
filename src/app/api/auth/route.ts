import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const res = await request.json();
  const cookieStore = cookies();

  return Response.json(
    {
      res
    },
    {
      status: 200,
      headers: {
        'Set-Cookie': `access_key=${cookieStore.get('access_token')?.value}; path=/;`
      }
    }
  );
}
