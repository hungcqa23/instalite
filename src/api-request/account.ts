import { http } from '@/lib/http';
import { UpdateUserResType, UpdateUserType, User } from '@/types/schema-validations/account.schema';
import { get } from 'http';

type SearchUserType = {
  message: string;
  data: User[];
};

type UploadUserType = {
  message: string;
  data: User;
};

const accountApiRequest = {
  me: () => http.get('/users/me'),
  search: (username: string) => http.get<SearchUserType>(`/users?username=${username}`),
  recommend: () => http.get(`/users/recommend`),
  update: (body: UpdateUserType) => http.put<UpdateUserResType>('users/me', body),
  uploadAvatar: (formData: FormData) => http.patch<UploadUserType>('users/avatar', formData),
  getUserByUsername: (username: string) =>
    http.get<{
      data: User;
    }>(`/users/${username}`)
};

export { accountApiRequest };
