import { MediaType } from '@/constants/enum';

export const isClient = typeof window !== 'undefined';

export const isImage = (mediaType?: number) => mediaType === MediaType.IMAGE;
export const isVideo = (mediaType?: number) => mediaType === MediaType.VIDEO;
export const isCurrentUser = (username?: string, currentUsername?: string) =>
  username === currentUsername;
