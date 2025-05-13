'use client';
import React, { useState, useEffect } from 'react';
import s from './PlayerLikeDislike.module.scss';
import { BiDislike } from 'react-icons/bi';
import { BiLike } from 'react-icons/bi';
import { BiSolidDislike } from 'react-icons/bi';
import { BiSolidLike } from 'react-icons/bi';
import IconBtn from '@/components/UI/Buttons/IconBtn';
import { Slide, ToastOptions } from 'react-toastify';
import { ItemReactionStatus, LikeOrDislike, TargetTypes } from '@/types/likeAndDislikes';
import { setReactionToTargetA } from '@/actions/reaction';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { changeSelectedMusicReaction } from '@/redux/slices/PlayerSlice';

type Props = {
  songId: string;
  reactionType: ItemReactionStatus;
};

const PlayerLikeDislike: React.FC<Props> = ({ songId, reactionType }) => {
  console.log(reactionType);
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

  const dispatch = useAppDispatch();
  const setLike = async () => {
    dispatch(changeSelectedMusicReaction(ItemReactionStatus.Liked));
    await setReactionToTargetA({
      targetId: songId,
      targetType: TargetTypes.Music,
      reactionType: LikeOrDislike.Like,
    });
  };
  const setDislike = async () => {
    dispatch(changeSelectedMusicReaction(ItemReactionStatus.Disliked));
    await setReactionToTargetA({
      targetId: songId,
      targetType: TargetTypes.Music,
      reactionType: LikeOrDislike.Dislike,
    });
  };
  const setRemoveReaction = async () => {
    dispatch(changeSelectedMusicReaction(ItemReactionStatus.None));
    await setReactionToTargetA({
      targetId: songId,
      targetType: TargetTypes.Music,
      reactionType: null,
    });
  };

  return (
    <div className={s.playerLikeDislike}>
      <IconBtn
        overlayStyles={{ backgroundColor: '#535f82' }}
        onClick={reactionType !== ItemReactionStatus.Liked ? setLike : setRemoveReaction}>
        {/* <IconBtn overlayStyles={{ backgroundColor: '#535f82' }} onClick={onLikeBtnClick}> */}
        {reactionType === ItemReactionStatus.Liked ? (
          <BiSolidLike className={s.playerLikeDislike_like} />
        ) : (
          <BiLike className={s.playerLikeDislike_like} />
        )}
      </IconBtn>
      <IconBtn
        overlayStyles={{ backgroundColor: '#535f82' }}
        onClick={reactionType !== ItemReactionStatus.Disliked ? setDislike : setRemoveReaction}>
        {/* <IconBtn overlayStyles={{ backgroundColor: '#535f82' }} onClick={onDislikeBtnClick}> */}
        {reactionType === ItemReactionStatus.Disliked ? (
          <BiSolidDislike className={s.playerLikeDislike_dislike} />
        ) : (
          <BiDislike className={s.playerLikeDislike_dislike} />
        )}
      </IconBtn>
    </div>
  );
};

export default PlayerLikeDislike;
