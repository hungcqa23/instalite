'use client';

import { http } from '@/lib/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

interface DeletePostDialogProps {
  setOpenDeleteDialog: Dispatch<SetStateAction<boolean>>;
  liteId: string;
}

const DeleteLiteDialog: React.FC<DeletePostDialogProps> = ({
  setOpenDeleteDialog,
  liteId
}: DeletePostDialogProps) => {
  const accessToken = getCookie('access_key');
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteLiteMutation = useMutation({
    mutationFn: async (liteId: string) => {
      const res = await fetch(`http://localhost:8000/posts/${liteId}`, {
        method: 'DELETE',
        headers: {
          Cookie: `access_token=${accessToken}`
        },
        credentials: 'include'
      });
    }
  });

  const handleDeleteLite = async () => {
    await deleteLiteMutation.mutateAsync(liteId);

    queryClient.invalidateQueries({
      queryKey: ['posts', accessToken]
    });

    router.push('/');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80'>
      <div className='flex h-fit w-72 flex-col rounded-lg bg-white dark:bg-zinc-900'>
        <span className='text-md mt-5 flex self-center font-bold'>
          Delete lite?
        </span>
        <p className='text-md mt-3 px-6 text-center text-slate-500'>
          If you delete this lite, you will not be able to restore it.
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
              handleDeleteLite();
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

export default DeleteLiteDialog;
