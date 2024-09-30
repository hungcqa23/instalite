import envConfig from '@/config';

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string | undefined;
};

export class HttpError extends Error {
  status: number;
  // payload: {
  //   message: string;
  //   [key: string]: any;
  // };
  constructor({ status, message }: { status: number; message: string }) {
    super('HTTP Error');
    this.status = status;
    // this.payload = payload;
  }
}

let clientLogoutRequest: null | Promise<any> = null;
export const isClient = typeof window !== 'undefined';

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined;

  if (options?.body instanceof FormData) body = options.body;
  else if (options?.body) body = JSON.stringify(options.body);

  const baseHeaders: {
    [key: string]: string;
  } =
    body instanceof FormData
      ? {}
      : {
          'Content-Type': 'application/json'
        };

  // if (isClient) {
  //   const accessToken = localStorage.getItem('access_key');
  //   if (accessToken) {
  //     baseHeaders.Cookie = `access_token=${accessToken}`;
  //   }
  // }

  const baseUrl = options?.baseUrl ? options.baseUrl : envConfig.NEXT_PUBLIC_API_ENDPOINT;
  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

  const response = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers
    } as any,
    credentials: 'include',
    body,
    method
  });

  if (method === 'POST' && response.status === 204) return response as Response;

  const result: Response & {
    message: string;
  } = await response.json();

  if (!response.ok) {
    if (response.status === 401 && isClient) {
      const res = await fetch(`${baseUrl}/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include'
      });

      if (res.status === 201) window.location.reload();
      else window.location.href = '/login';
    }

    // throw Error(JSON.stringify(result?.message));
  }

  return result;
};

export const http = {
  get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('GET', url, options);
  },
  post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('POST', url, { ...options, body });
  },
  put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('PUT', url, { ...options, body });
  },
  delete<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('DELETE', url, { ...options, body });
  },
  patch<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('PATCH', url, { ...options, body });
  }
};
