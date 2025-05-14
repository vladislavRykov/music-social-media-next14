'use client';
import React, { useEffect, useState } from 'react';
import DeafultItem from '../DeafultItem/DeafultItem';
import { BiDislike, BiLike } from 'react-icons/bi';
import { Slide, ToastOptions } from 'react-toastify';
import { RiDislikeLine } from 'react-icons/ri';
import { ItemReactionStatus, LikeOrDislike, TargetTypes } from '@/types/likeAndDislikes';
import { setReactionToTargetA } from '@/actions/reaction';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { changeSelectedMusicReaction } from '@/redux/slices/PlayerSlice';

const toastSettings: ToastOptions = {
  position: 'bottom-left',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: 'dark',
  transition: Slide,
};

const AddToLiked = ({
  songId,
  closePopup,
  currentSongId,
  reactionType,
  setReactionType,
  currentSongReaction,
}: {
  songId: string;
  closePopup: () => void;
  currentSongId?: string;
  setReactionType?: (reaction: ItemReactionStatus) => void;
  reactionType?: ItemReactionStatus;
  currentSongReaction?: ItemReactionStatus;
}) => {
  
  const dispatch = useAppDispatch();
  const setLike = async () => {
    currentSongId === songId && dispatch(changeSelectedMusicReaction(ItemReactionStatus.Liked));
    setReactionType?.(ItemReactionStatus.Liked);
    await setReactionToTargetA({
      targetId: songId,
      targetType: TargetTypes.Music,
      reactionType: LikeOrDislike.Like,
    });
    closePopup();
  };
  const setDislike = async () => {
    currentSongId === songId && dispatch(changeSelectedMusicReaction(ItemReactionStatus.Disliked));
    setReactionType?.(ItemReactionStatus.Disliked);
    await setReactionToTargetA({
      targetId: songId,
      targetType: TargetTypes.Music,
      reactionType: LikeOrDislike.Dislike,
    });
    closePopup();
  };
  const setRemoveReaction = async () => {
    currentSongId === songId && dispatch(changeSelectedMusicReaction(ItemReactionStatus.None));
    setReactionType?.(ItemReactionStatus.None);
    await setReactionToTargetA({
      targetId: songId,
      targetType: TargetTypes.Music,
      reactionType: null,
    });
    closePopup();
  };

  useEffect(() => {
    if (currentSongId === songId && currentSongReaction) {
      setReactionType?.(currentSongReaction);
    }
  }, [currentSongReaction]);

  if (reactionType !== ItemReactionStatus.Liked)
    return <DeafultItem title={'Добавить в понравившиеся'} Icon={BiLike} action={setLike} />;
  return (
    <DeafultItem
      title={'Удалить из понравившихся'}
      Icon={RiDislikeLine}
      action={setRemoveReaction}
    />
  );
};

export default AddToLiked;
