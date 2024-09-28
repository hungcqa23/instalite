import { authApiRequest } from '@/api-request/auth';
import { LoginBodyType } from '@/types/schema-validations/auth.schema';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const cookieStorage = cookies();
  const body = (await request.json()) as LoginBodyType;
  try {
    const res = await authApiRequest.serverLogin(body);
    console.log(cookieStorage.getAll());

    return Response.json(
      {
        message: 'Hello World!'
      },
      {
        status: 200
      }
    );
  } catch (err) {
    return Response.json({
      message: 'Error login'
    });
  }
}
