'use client';
import React, { useEffect, useRef, useState } from 'react';
import s from './PlaylistItemBtns.module.scss';
import { BiDislike } from 'react-icons/bi';
import { BiLike } from 'react-icons/bi';
import { BiSolidDislike } from 'react-icons/bi';
import { BiSolidLike } from 'react-icons/bi';
import IconBtn from '@/components/UI/Buttons/IconBtn';
import { BsThreeDotsVertical } from 'react-icons/bs';
import FirstCustomCheckbox from '@/components/UI/CheckBox/FirstCustomCheckbox/FirstCustomCheckbox';
import { Slide, ToastOptions } from 'react-toastify';
import { ItemReactionStatus, LikeOrDislike, TargetTypes } from '@/types/likeAndDislikes';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { changeSelectedMusicReaction } from '@/redux/slices/PlayerSlice';
import { setReactionToTargetA } from '@/actions/reaction';

type PlaylistItemBtnsProps = {
  onCheckInput: () => void;
  isSelected: boolean;
  songId: string;
  selectionMode: boolean;
  reactionStatus: ItemReactionStatus;
  currentSongReactionStatus: ItemReactionStatus | null;
  currentSongId: string | null;
  setBlockPosition: React.Dispatch<
    React.SetStateAction<{
      x: string;
      y: string;
    }>
  >;
  setIsPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

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

const PlaylistItemBtns: React.FC<PlaylistItemBtnsProps> = ({
  onCheckInput,
  isSelected,
  songId,
  selectionMode,
  setIsPopUpOpen,
  setBlockPosition,
  reactionStatus,
  currentSongId,
  currentSongReactionStatus,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [thisItemReactionStatus, setThisItemReactionStatus] =
    useState<ItemReactionStatus>(reactionStatus);

  const dispatch = useAppDispatch();
  const setLike = async () => {
    currentSongId === songId && dispatch(changeSelectedMusicReaction(ItemReactionStatus.Liked));
    setThisItemReactionStatus?.(ItemReactionStatus.Liked);
    await setReactionToTargetA({
      targetId: songId,
      targetType: TargetTypes.Music,
      reactionType: LikeOrDislike.Like,
    });
  };
  const setDislike = async () => {
    currentSongId === songId && dispatch(changeSelectedMusicReaction(ItemReactionStatus.Disliked));
    setThisItemReactionStatus?.(ItemReactionStatus.Disliked);
    await setReactionToTargetA({
      targetId: songId,
      targetType: TargetTypes.Music,
      reactionType: LikeOrDislike.Dislike,
    });
  };
  const setRemoveReaction = async () => {
    currentSongId === songId && dispatch(changeSelectedMusicReaction(ItemReactionStatus.None));
    setThisItemReactionStatus?.(ItemReactionStatus.None);
    await setReactionToTargetA({
      targetId: songId,
      targetType: TargetTypes.Music,
      reactionType: null,
    });
  };

  useEffect(() => {
    if (currentSongId === songId && currentSongReactionStatus) {
      setThisItemReactionStatus(currentSongReactionStatus);
    }
  }, [currentSongReactionStatus]);

  const handleContainerClick = (event) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    setBlockPosition({
      y: `${containerRect.y + containerRect.height}px`,
      x: `${containerRect.x}px`,
    });
    setIsPopUpOpen(true);
  };

  return (
    <div className={s.playlistItemBtns}>
      {!selectionMode && (
        <>
          <IconBtn
            overlayStyles={{ backgroundColor: '#a7a7a7' }}
            onClick={
              thisItemReactionStatus !== ItemReactionStatus.Liked ? setLike : setRemoveReaction
            }>
            {thisItemReactionStatus === ItemReactionStatus.Liked ? (
              <BiSolidLike color="#c6c6c6" className={s.playlistItemBtns_like} />
            ) : (
              <BiLike color="#c6c6c6" className={s.playlistItemBtns_like} />
            )}
          </IconBtn>
          <IconBtn
            overlayStyles={{ backgroundColor: '#a7a7a7' }}
            onClick={
              thisItemReactionStatus !== ItemReactionStatus.Disliked
                ? setDislike
                : setRemoveReaction
            }>
            {thisItemReactionStatus === ItemReactionStatus.Disliked ? (
              <BiSolidDislike color="#c6c6c6" className={s.playlistItemBtns_dislike} />
            ) : (
              <BiDislike color="#c6c6c6" className={s.playlistItemBtns_dislike} />
            )}
          </IconBtn>
          <div ref={containerRef}>
            <IconBtn
              onClick={handleContainerClick}
              overlayStyles={{ backgroundColor: '#a7a7a7' }}
              className={s.playlistItemBtns_popup}>
              <BsThreeDotsVertical color="#c6c6c6" size={18} />
            </IconBtn>
          </div>
        </>
      )}
      <FirstCustomCheckbox
        action={!selectionMode ? onCheckInput : () => {}}
        isSelected={isSelected}
        colors={{ backgroundColor: '#c6c6c6', iconColor: 'black' }}
      />
    </div>
  );
};

export default PlaylistItemBtns;
