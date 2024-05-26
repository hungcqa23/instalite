export interface User {
  _id: string;
  fullName: string;
  avatar?: string;
  bio?: string;
  username: string;
  followersCount: number;
}
