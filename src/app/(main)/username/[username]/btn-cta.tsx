'use client';

import { accountApiRequest } from '@/api-request/account';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Label,
  toast
} from '@/components/ui';
import { useUpdateUserMutation } from '@/hooks/queries/useUser';
import { useUserStore } from '@/stores/user.stores';
import { User } from '@/types/schema-validations/account.schema';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

export default function BtnCta({
  user,
  isFollowing
}: {
  user: User;
  isFollowing: boolean;
}) {
  const router = useRouter();
  const { user: currentUser, setUser } = useUserStore();

  const [username, setUsername] = useState<string | undefined>('');
  const [name, setName] = useState<string | undefined>('');
  const [bio, setBio] = useState<string | undefined>('');
  const [avatar, setAvatar] = useState<string | undefined>('');
  const [file, setFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAvatarPreview(URL.createObjectURL(selectedFile));
    }
  };

  const uploadAvatarMutation = useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) => {
      const res = await fetch(`http://localhost:8000/users/avatar`, {
        method: 'PATCH',
        body: formData
        // headers: {
        //   Cookie: `access_token=${accessToken}`
        // },
        // credentials: 'include'
      });
      return await res.json();
    }
  });

  const handleUploadAvatar = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      await uploadAvatarMutation.mutateAsync({ formData });
      setAvatarPreview(null);
      setFile(null);
    }
  };

  const updateUserMutation = useUpdateUserMutation();
  const handleSaveButton = async () => {
    try {
      const { data } = await updateUserMutation.mutateAsync({
        fullName: name,
        username: username,
        bio: bio
      });
      setUser(data);
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated'
      });
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong'
      });
    }
  };

  const { data: followData } = useQuery({
    queryKey: ['follow', user?.username],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8000/users/${user?.username}/follow`,
        {
          method: 'GET',

          credentials: 'include'
        }
      );

      const data = await res.json();
      const { result }: { result: boolean } = data;
      setIsFollowed(result);
      return data;
    }
  });

  const followMutation = useMutation({
    mutationFn: (followedUserId: string) =>
      accountApiRequest.follow(followedUserId)
  });

  const unFollowMutation = useMutation({
    mutationFn: (followedUserId: string) =>
      accountApiRequest.unFollow(followedUserId)
  });

  const handleClick = () => {
    if (!isFollowed) {
      followMutation.mutate(user?._id);
      setIsFollowed(true);
    } else {
      unFollowMutation.mutate(user?._id);
      setIsFollowed(false);
    }
  };

  useEffect(() => {
    setName(currentUser?.fullName);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [currentUser]);
  if (!followData) return null;

  const isCurrentUser = user?.username === currentUser?.username;

  return (
    <>
      {user?.username !== currentUser?.username && (
        <div className='flex flex-row gap-2'>
          <Button
            className='mt-3.5 w-full text-sm dark:bg-zinc-50 dark:hover:bg-zinc-50'
            variant={'default'}
            onClick={handleClick}
          >
            {isFollowed ? 'Unfollow' : 'Follow'}
          </Button>
        </div>
      )}

      {isCurrentUser && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className='mt-3.5 w-full text-sm dark:bg-zinc-950 dark:hover:bg-transparent'
              variant={'outline'}
            >
              Edit profile
            </Button>
          </DialogTrigger>
          <DialogContent className='dark:bg-zinc-950 sm:max-w-[500px]'>
            <DialogHeader>
              <DialogTitle className='flex justify-center text-sm font-bold'>
                Profile
              </DialogTitle>
            </DialogHeader>
            <div className='flex flex-col gap-1'>
              <div className='flex flex-row justify-between'>
                <div className='flex flex-col'>
                  <Label className='text-sm font-semibold'>Username</Label>
                  <Input
                    className='mt-1 w-[378px]'
                    placeholder='Enter your username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className='mt-2.5 h-[50px] w-[50px] cursor-pointer'>
                      <AvatarImage
                        src={avatarPreview || user?.avatar}
                        className='object-cover'
                        alt='@shadcn'
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align='end'
                    className='w-30 rounded-xl dark:bg-zinc-950'
                  >
                    <DropdownMenuItem
                      className='rounded-md font-medium dark:hover:bg-zinc-950'
                      onClick={() => {
                        if (fileInputRef.current) {
                          fileInputRef.current?.click();
                        }
                      }}
                    >
                      Upload
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <input
                  type='file'
                  ref={fileInputRef}
                  className='hidden'
                  accept='image/*'
                  onChange={handleFileChange}
                />
              </div>
              <div className='mt-2 flex flex-col'>
                <Label className='text-sm font-semibold'>Name</Label>
                <Input
                  className='mt-1 w-full'
                  placeholder='Enter your name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className='mt-2 flex flex-col'>
                <Label className='text-sm font-semibold'>Bio</Label>
                <Input
                  className='mt-1 w-full'
                  placeholder='Enter your bio'
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                className='mt-1 w-full'
                type='submit'
                onClick={handleSaveButton}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
