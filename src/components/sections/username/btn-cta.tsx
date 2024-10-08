'use client';

import { CustomDialog } from '@/components/customs';
import {
  AvatarUser,
  Button,
  DialogFooter,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Label,
  toast
} from '@/components/ui';
import {
  useFollowMutation,
  useGetIsFollowingQuery,
  useUnFollowMutation
} from '@/hooks/queries/useFollow';
import { useUpdateUserMutation, useUploadAvatarMutation } from '@/hooks/queries/useUser';
import { http } from '@/lib/http';
import { useUserStore } from '@/stores/user.stores';
import { User } from '@/types/schema-validations/account.schema';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function BtnCta({ user }: { user: User }) {
  const router = useRouter();
  const { user: currentUser, setUser } = useUserStore();

  const [username, setUsername] = useState<string | undefined>('');
  const [name, setName] = useState<string | undefined>('');
  const [bio, setBio] = useState<string | undefined>('');
  const [avatar, setAvatar] = useState<string | undefined>('');
  const [file, setFile] = useState<File | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const { data: isFollowingData, isLoading: isFollowingLoading } = useGetIsFollowingQuery(
    user?.username
  );

  const isFollowing = isFollowingData?.data || false;
  const isCurrentUser = user?.username === currentUser?.username;

  useEffect(() => {
    if (currentUser) {
      setName(currentUser?.fullName);
      setUsername(currentUser?.username);
      setBio(currentUser?.bio);
      setAvatar(currentUser?.avatar);
    }
  }, [currentUser]);

  //  Avatar upload mutation
  const previewAvatar = useMemo(() => {
    if (file) return URL.createObjectURL(file);
    return avatar;
  }, [avatar, file]);

  const uploadAvatarMutation = useUploadAvatarMutation();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAvatar(avatar);
    }
  };
  const handleUploadAvatarClick = () => {
    if (avatarInputRef.current) avatarInputRef.current.click();
  };
  const handleUploadAvatar = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const { data } = await uploadAvatarMutation.mutateAsync(formData);

      setAvatar(undefined);
      setFile(null);
      setUser(data);
    } catch (error: any) {}
  };
  const handleUploadInformation = async (data: {
    fullName?: string;
    username?: string;
    bio?: string;
  }) => {
    try {
      const { data: user } = await updateUserMutation.mutateAsync(data);

      setUser(user);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong'
      });
    }
  };

  //  Update user mutation
  const updateUserMutation = useUpdateUserMutation();
  const handleSaveProfile = async () => {
    try {
      await handleUploadInformation({ fullName: name, username: username, bio: bio });

      if (file) await handleUploadAvatar(file);

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
        description: 'Upload user failed'
      });
    }
  };

  //  Follow / unfollow mutations
  const followMutation = useFollowMutation();
  const unFollowMutation = useUnFollowMutation();

  const handleFollowClick = () => {
    if (isFollowing) unFollowMutation.mutate(user?._id);
    else followMutation.mutate(user?._id);
  };

  const handleOpenChange = (open: boolean) => {
    if (open === false && currentUser) {
      setName(currentUser?.fullName);
      setUsername(currentUser?.username);
      setBio(currentUser?.bio);
      setAvatar(currentUser?.avatar);
      setFile(null); // Reset file state
    }
  };

  return (
    <>
      {!isCurrentUser && user && (
        <div className='flex flex-row gap-2'>
          <Button
            className='mt-3.5 w-full text-sm dark:bg-zinc-50 dark:hover:bg-zinc-50'
            variant={'default'}
            onClick={handleFollowClick}
          >
            {!isFollowingLoading && (isFollowing ? 'Unfollow' : 'Follow')}
            {isFollowingLoading && 'Loading...'}
          </Button>
        </div>
      )}

      {isCurrentUser && (
        <CustomDialog
          title='Edit profile'
          trigger={
            <Button
              className='mt-3.5 w-full text-sm dark:bg-zinc-950 dark:hover:bg-transparent'
              variant={'outline'}
            >
              Edit profile
            </Button>
          }
          handleOpenChange={handleOpenChange}
        >
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
                <DropdownMenuTrigger>
                  <AvatarUser className='mt-2.5 size-[50px] cursor-pointer' src={previewAvatar} />
                  <input
                    type='file'
                    accept='image/*'
                    className='hidden'
                    ref={avatarInputRef}
                    onChange={handleFileChange}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-30 rounded-xl dark:bg-zinc-950'>
                  <DropdownMenuItem
                    className='rounded-sm font-medium dark:hover:bg-zinc-950'
                    onClick={handleUploadAvatarClick}
                  >
                    Upload
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
            <Button className='mt-1 w-full' type='submit' onClick={handleSaveProfile}>
              Save
            </Button>
          </DialogFooter>
        </CustomDialog>
      )}
    </>
  );
}
