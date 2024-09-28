import { MediaType } from '@/constants/enum';

export const isImage = (mediaType?: number) => mediaType === MediaType.IMAGE;
export const isVideo = (mediaType?: number) => mediaType === MediaType.VIDEO;
