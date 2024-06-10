import { envConfig } from '@/config';

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string | undefined;
};

export class HttpError extends Error {
  status: number;

  constructor({ status, message }: { status: number; message: string }) {
    super('HTTP Error');
    this.status = status;
  }
}

export const isClient = () => typeof window !== 'undefined';

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined;
  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options?.body);
  }

  const baseHeaders: any =
    body instanceof FormData
      ? {
          'Content-Type': 'multipart/form-data'
        }
      : {
          'Content-Type': 'application/json'
        };

  console.log('Debug');
  console.log(baseHeaders);
  console.log(options?.body);
  console.log('Hello');

  if (isClient()) {
    const accessToken = localStorage.getItem('access_key');
    if (accessToken) {
      baseHeaders.Cookie = `access_token=${accessToken}`;
    }
  }

  const baseUrl = options?.baseUrl ?? envConfig.NEXT_PUBLIC_API_ENDPOINT;

  const fullUrl = url.startsWith('/')
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const response = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers
    },
    credentials: 'include',
    method,
    body
  });
  const result = await response.json();

  if (!response.ok) console.log('Error', response);

  return result;
};

export const http = {
  get<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('GET', url, { ...options, body });
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('POST', url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('PUT', url, { ...options, body });
  },
  delete<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('DELETE', url, { ...options, body });
  },
  patch<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('PATCH', url, { ...options, body });
  }
};
