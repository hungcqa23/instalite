'use client';

import { accountApiRequest } from '@/app/api-request/account';
import { User, useAppContext } from '@/app/context/app-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { http } from '@/lib/http';
import { Account } from '@/schema-validations/account.schema';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useMemo, useRef, useState } from 'react';

export default function BtnCta({ user: userData }: any) {
  const { user } = userData;
  const router = useRouter();
  const { user: currentUser, setUser } = useAppContext();
  const [username, setUsername] = useState('');
  const [name, setName] = useState<string | undefined>('');
  const [bio, setBio] = useState<string | undefined>('');
  const [avatar, setAvatar] = useState<string | undefined>('');
  const [file, setFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // const previewImage = useMemo(() => {
  //   return file ? URL.createObjectURL(file) : '';
  // }, [file]);

  // const handleChangeFile = (file?: File) => {
  //   setFile(file);
  // };
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
        body: formData,
        headers: {
          Cookie: `access_token=${accessToken}`
        },
        credentials: 'include'
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

  const updateUser = useMutation({
    mutationFn: async () => {
      const data = await http.put(`users/me`, {
        username,
        fullName: name,
        bio
      });
      return data;
    }
  });

  const handleSaveButton = async () => {
    handleUploadAvatar();
    const { result } = await updateUser.mutateAsync();
    setUser(result);
    router.push('/');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  const accessToken = getCookie('access_key');

  const { data } = useQuery({
    queryKey: ['users', accessToken],
    queryFn: async () => {
      const res = await fetch('http://localhost:8000/users/me', {
        method: 'GET',
        headers: {
          Cookie: `access_token=${accessToken}`
        },
        credentials: 'include'
      });

      const data = await res.json();
      const { user }: { user: Account } = data;
      console.log(user.username);
      setUsername(user.username);
      setBio(user.bio);
      setName(user.full_name);
      setAvatar(user.avatar);
      return data;
    }
  });

  const { data: followData } = useQuery({
    queryKey: ['follow', accessToken, user?.username],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8000/users/${user?.username}/follow`,
        {
          method: 'GET',
          headers: {
            Cookie: `access_token=${accessToken}`
          },
          credentials: 'include'
        }
      );

      const data = await res.json();
      const { result }: { result: boolean } = data;
      console.log(result);
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
  if (!followData) return null;

  if (!data) return null;

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
          {/* <Button
            className='mt-3.5 w-full text-sm dark:bg-zinc-950 dark:hover:bg-transparent'
            variant={'outline'}
          >
            Mention
          </Button> */}
        </div>
      )}

      {user?.username === currentUser?.username && (
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
