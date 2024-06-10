import z from 'zod';

export const NotificationBody = z.object({
  _id: z.string(),
  content: z.string(),
  type: z.number(),
  user_id: z.object({
    _id: z.string(),
    username: z.string(),
    avatar: z.string()
  }),
  user_receiver_id: z.object({
    _id: z.string(),
    username: z.string(),
    avatar: z.string()
  }),
  created_at: z.string(),
  __v: z.number()
});

export type Notification = z.infer<typeof NotificationBody>;

export const NotificationRes = z.object({
  message: z.string(),
  result: z.array(NotificationBody)
});

export type NotificationResType = z.infer<typeof NotificationRes>;
