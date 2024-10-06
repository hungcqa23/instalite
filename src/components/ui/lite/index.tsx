'use client';

import { CustomDialog } from '@/components/customs';
import { MessageCircleIcon } from '@/components/icons';
import { toast } from '@/components/ui';
import ListComment from '@/components/ui/lite/comment/list-comment';
import InformationUser from '@/components/ui/lite/information-user';
import { useCreateCommentMutation } from '@/hooks/queries/useComment';
import {
  useSummarizeLiteMutation,
  useUpdatePostMutation,
  useUpdateVideoMutation
} from '@/hooks/queries/usePost';
import { useUserStore } from '@/stores/user.stores';
import { Post } from '@/types/schema-validations/post.schema';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import '@vidstack/react/player/styles/default/theme.css';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import React from 'react';

import CancelDialog from './CancelDialog';
import ContentSection from './ContentSection';
import ActionMenu from './HeaderSection/action-menu';
import ButtonSend from './LiteLink/button-send';
import FooterLinkSection from './LiteLink/footer-link-section';
import ButtonBookMark from './button-bookmark';
import ButtonLike from './button-like';
import CommentForm from './comment/comment-form';
import DeleteLiteDialog from './delete-lite-dialog';
import EditLiteDialog from './edit-lite-dialog';
import SummarizationDialog from './summarization-dialog';

interface LiteProps {
  lite: Post;
  isLink?: boolean;
  innerRef?: React.Ref<HTMLParagraphElement>;
}

const LiteItem: React.FC<LiteProps> = ({ lite, isLink, innerRef }) => {
  const { user } = useUserStore();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenCommentDialog, setIsOpenCommentDialog] = useState(false);
  const [contentSummarization, setContentSummarization] = useState({
    content: '',
    isOpenSummarizeDialog: false
  });
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  //file media
  const [images, setImages] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  const handleVideoClick = () => {
    if (videoFileInputRef.current) videoFileInputRef.current.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      const fileUrls = fileArray.map(file => URL.createObjectURL(file));
      setImages(prevImages => [...prevImages, ...fileUrls]);
      setImageFile(e.target.files[0]);
    }
  };
  const handleDeleteVideo = () => {
    setVideoFile(null);
    setVideoUrl(null);
    if (videoFileInputRef.current) videoFileInputRef.current.value = '';
  };
  const handleDeleteImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  // Media
  const updateVideoMutation = useUpdateVideoMutation();
  const updatePostMutation = useUpdatePostMutation();

  // Comment
  const createCommentMutation = useCreateCommentMutation(lite._id);
  const handleDialogChange = (open: boolean) => {
    if (!open && (images.length > 0 || videoUrl)) setOpenCancelDialog(true);
    else {
      setIsOpenCommentDialog(open);
      if (!open) resetDialog();
    }
  };
  const confirmClose = () => {
    setOpenCancelDialog(false);
    setIsOpenCommentDialog(false);
    resetDialog();
  };
  const cancelClose = () => {
    setOpenCancelDialog(false);
    setIsOpenCommentDialog(true);
  };
  const resetDialog = useCallback(() => {
    setIsOpenCommentDialog(false);
    setImages([]);
    setImageFile(null);
    setVideoFile(null);
    setVideoUrl(null);
  }, []);

  // Summarization
  const summarizeLiteMutation = useSummarizeLiteMutation();
  useEffect(() => {
    if (summarizeLiteMutation.status === 'pending')
      setContentSummarization({
        content: 'Loading...',
        isOpenSummarizeDialog: true
      });
  }, [summarizeLiteMutation.status]);

  const handleSummarization = async () => {
    try {
      const formData = new FormData();
      if (lite?.media?.type === 0) {
        const response = await axios.get(lite?.media?.url, {
          responseType: 'blob'
        });
        formData.append('media', response.data);
      }

      formData.append('content', lite?.content);
      const res = await summarizeLiteMutation.mutateAsync(formData);

      if (res.content)
        setContentSummarization({
          content: res.content,
          isOpenSummarizeDialog: true
        });
    } catch (error) {
      console.log(error);
    }
  };

  const HeaderSection = ({ lite, isCurrentUser }: { lite: Post; isCurrentUser: boolean }) => (
    <div className='mb-2 flex flex-row items-center justify-between'>
      <InformationUser lite={lite} />
      <ActionMenu
        lite={lite}
        isCurrentUser={isCurrentUser}
        handleSummarization={handleSummarization}
        setOpenDeleteDialog={setOpenDeleteDialog}
      />
    </div>
  );

  const isCurrentUser = user?._id === lite?.userId._id;

  const handleChangeOpenSummarizeDialog = () => {
    setContentSummarization(previousState => ({
      ...previousState,
      isOpenSummarizeDialog: !previousState.isOpenSummarizeDialog
    }));
  };

  if (isLink)
    return (
      <>
        <div className='mb-2 w-full border-b-[1px] border-gray-200 p-0 sm:pb-3' ref={innerRef}>
          <HeaderSection lite={lite} isCurrentUser={isCurrentUser} />
          <ContentSection lite={lite} />
          <FooterLinkSection liteId={lite?._id || ''} />
        </div>

        {openDeleteDialog && (
          <DeleteLiteDialog setOpenDeleteDialog={setOpenDeleteDialog} liteId={lite?._id} />
        )}

        <SummarizationDialog
          contentSummarization={contentSummarization}
          setContentSummarization={handleChangeOpenSummarizeDialog}
        />
      </>
    );

  const handleCommentPost = async (content: string) => {
    const res = await createCommentMutation.mutateAsync({
      content,
      parentPostId: lite?._id
    });

    // const commentPostId = res.post._id;
    // if (!commentPostId) return;
    // const formData = new FormData();

    // if (videoFile) {
    //   formData.append('media', videoFile);
    //   await updateVideoMutation.mutateAsync({
    //     commentPostId,
    //     formData
    //   });
    //   return;
    // }

    // if (imageFile) {
    //   formData.append('media', imageFile);

    //   const updateImage = await updatePostMutation.mutateAsync({
    //     commentPostId,
    //     formData
    //   });
    //   return;
    // }

    toast({
      title: 'Replied',
      description: 'Your reply has been posted'
    });

    resetDialog();
  };

  const CommentDialog = ({ lite }: { lite: Post }) => (
    <CustomDialog
      isOpen={isOpenCommentDialog}
      handleClose={() => handleDialogChange(false)}
      handleOpenChange={handleDialogChange}
      title={`Reply to ${lite?.userId?.username}`}
      trigger={<MessageCircleIcon className='size-5 cursor-pointer' />}
    >
      <CommentForm
        user={user}
        images={images}
        videoUrl={videoUrl}
        fileInputRef={fileInputRef}
        videoFileInputRef={videoFileInputRef}
        handleDeleteVideo={handleDeleteVideo}
        handleDeleteImage={handleDeleteImage}
        handleImageClick={handleImageClick}
        handleVideoClick={handleVideoClick}
        handleCommentPost={handleCommentPost}
        handleFileChange={handleFileChange}
        handleVideoChange={handleVideoChange}
      />
    </CustomDialog>
  );

  const FooterSection = ({ lite }: { lite: Post }) => (
    <div className='mt-3 flex flex-row justify-between'>
      <div className='ms-0.5 flex flex-row gap-3'>
        <ButtonLike liteId={lite._id} />
        <CommentDialog lite={lite} />
        <ButtonSend />
      </div>
      <ButtonBookMark liteId={lite._id} />
    </div>
  );

  const DialogComponents = ({ liteId }: { liteId: string }) => (
    <>
      {openDeleteDialog && (
        <DeleteLiteDialog setOpenDeleteDialog={setOpenDeleteDialog} liteId={liteId} />
      )}

      {/* {isEditing && (
        <EditLiteDialog
          openEditDialog={isEditing}
          setOpenEditDialog={setIsEditing}
          liteId={liteId}
        />
      )} */}

      {openCancelDialog && (
        <CancelDialog
          cancelClose={cancelClose}
          confirmClose={confirmClose}
          openCancelDialog={openCancelDialog}
          setOpenCancelDialog={open => setOpenCancelDialog(open)}
        />
      )}
    </>
  );

  return (
    <>
      <div className='mb-0 w-full border-b-[1px] border-gray-200 p-0 sm:pb-5' ref={innerRef}>
        <HeaderSection lite={lite} isCurrentUser={isCurrentUser} />
        <ContentSection lite={lite} />
        <FooterSection lite={lite} />
      </div>

      <ListComment postId={lite?._id} />
      <DialogComponents liteId={lite?._id} />

      <SummarizationDialog
        contentSummarization={contentSummarization}
        setContentSummarization={handleChangeOpenSummarizeDialog}
      />
    </>
  );
};

export default LiteItem;
