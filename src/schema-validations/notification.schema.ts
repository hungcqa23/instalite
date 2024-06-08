import z from 'zod';
// {
//   "message": "Get notifications successfully",
//   "result": [
//       {
//           "_id": "6663b14bf9caeb8196b2bd60",
//           "content": "Follow successfully",
//           "type": 3,
//           "user_id": "665b64d5404aba4c1ca083c9",
//           "user_receiver_id": {
//               "_id": "665b3bd624ef4f5c13f2b1b3",
//               "username": "anhung1"
//           },
//           "created_at": "2024-06-08T01:18:03.396Z",
//           "__v": 0
//       }
//   ]
// }
export const NotificationBody = z.object({
  _id: z.string(),
  content: z.string(),
  type: z.number(),
  user_id: z.string(),
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
