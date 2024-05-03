export enum NotificationType {
  Like = 'like',
  Follow = 'follow',
  Relite = 'relite'
}

export interface Notification {
  message: string;
  liteId?: string;
  liteContent?: string;
  type: NotificationType;
}
