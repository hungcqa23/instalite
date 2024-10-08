'use client';

import { toast } from '@/components/ui/toast';
import { useDeletePostMutation } from '@/hooks/queries/usePost';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

interface DeleteCommentDialogProps {
  setOpenDeleteDialog: Dispatch<SetStateAction<boolean>>;
  commentId: string;
}

const DeleteCommentDialog: React.FC<DeleteCommentDialogProps> = ({
  setOpenDeleteDialog,
  commentId
}: DeleteCommentDialogProps) => {
  const queryClient = useQueryClient();

  const deleteCommentMutation = useDeletePostMutation();

  const handleDeleteComment = async () => {
    try {
      await deleteCommentMutation.mutateAsync(commentId);
    } catch (err) {
      // console.log(err);
    } finally {
      toast({
        title: 'Deleted',
        description: 'Your comment has been deleted'
      });
      queryClient.invalidateQueries({
        queryKey: ['comments']
      });
    }
  };

  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80'>
      <div className='flex h-fit w-72 flex-col rounded-lg bg-white dark:bg-zinc-900'>
        <span className='text-md mt-5 flex self-center font-bold'>Delete comment?</span>
        <p className='text-md mt-3 px-6 text-center text-slate-500'>
          If you delete this comment, you will not be able to restore it.
        </p>

        <div className='mt-4 flex flex-row border-t-2 dark:border-gray-600'>
          <div
            className='w-full cursor-pointer rounded-bl-3xl border-r-2 py-4 text-center dark:border-gray-600'
            onClick={() => setOpenDeleteDialog(false)}
          >
            Cancel
          </div>

          <div
            className='w-full cursor-pointer rounded-br-3xl py-4 text-center font-semibold text-red-600'
            onClick={() => {
              handleDeleteComment();
              setOpenDeleteDialog(false);
            }}
          >
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCommentDialog;
