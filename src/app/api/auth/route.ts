import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const res = await request.json();
  console.log(res);
  // const resultLogin = await fetch('http://localhost:8000/auth/login', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     email: 'anbeel191@gmail.com',
  //     password: '123456789'
  //   }),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // }).then(res);
  // const access_token = resultLogin.headers.getSetCookie()[0].split('=')[1];
  // const refresh_token = resultLogin.headers.getSetCookie()[1].split('=')[1];
  // cookies().set('access_token', access_token);
  // cookies().set('refresh_token', refresh_token);

  // const result = await fetch('http://localhost:8000/auth/log-out', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     email: 'anbeel191@gmail.com',
  //     password: '123456789'
  //   }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Cookie: `access_token=${access_token}; refresh_token=${refresh_token}`
  //   },
  //   credentials: 'include'
  // }).then(res => res.json());
  // console.log(result);
  return Response.json({
    res
  });
}
