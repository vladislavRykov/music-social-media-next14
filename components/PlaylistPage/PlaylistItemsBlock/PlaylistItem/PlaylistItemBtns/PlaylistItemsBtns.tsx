'use client';
import React, { useRef, useState } from 'react';
import s from './PlaylistItemBtns.module.scss';
import { BiDislike } from 'react-icons/bi';
import { BiLike } from 'react-icons/bi';
import { BiSolidDislike } from 'react-icons/bi';
import { BiSolidLike } from 'react-icons/bi';
import IconBtn from '@/components/UI/Buttons/IconBtn';
import { BsThreeDotsVertical } from 'react-icons/bs';
import FirstCustomCheckbox from '@/components/UI/CheckBox/FirstCustomCheckbox/FirstCustomCheckbox';
import SettingsBtnPopUp from '@/components/shared/SettingsBtnPopUp/SettingsBtnPopUp';
import AddToPlayList from '@/components/shared/SettingsBtnPopUp/AddToPlayList/AddToPlayList';
import AddToLiked from '@/components/shared/SettingsBtnPopUp/AddToLiked/AddToLiked';
import { useLikeOrDislike } from '@/hooks/likeAndDislikeHook';
import { Slide, ToastOptions } from 'react-toastify';

type PlaylistItemBtnsProps = {
  onCheckInput: () => void;
  isSelected: boolean;
  songId: string;
  selectionMode: boolean;
  setBlockPosition: React.Dispatch<
    React.SetStateAction<{
      x: string;
      y: string;
    }>
  >;
  setIsPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
  likesAndDislikes: {
    likes: string[];
    dislikes: string[];
} | null;
};

const toastSettings:ToastOptions = {
  position: "bottom-left",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "dark",
  transition: Slide,
  }

const PlaylistItemBtns: React.FC<PlaylistItemBtnsProps> = ({
  onCheckInput,
  isSelected,
  songId,
  selectionMode,
  setIsPopUpOpen,
  likesAndDislikes,
  setBlockPosition,
}) => {
  // const [isLiked, setIsLiked] = useState<boolean | null>(null);
  console.log()
  const initLiked = likesAndDislikes?.likes.includes(songId) ? true : likesAndDislikes?.dislikes.includes(songId) ? false : null
  const  [isLiked,_, onLikeBtnClick, onDislikeBtnClick] = useLikeOrDislike({songId,initValue: initLiked,toastSettings})
  const containerRef = useRef<HTMLDivElement | null>(null);

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
            onClick={onLikeBtnClick}>
            {isLiked === true ? (
              <BiSolidLike color="#c6c6c6" className={s.playlistItemBtns_like} />
            ) : (
              <BiLike color="#c6c6c6" className={s.playlistItemBtns_like} />
            )}
          </IconBtn>
          <IconBtn
            overlayStyles={{ backgroundColor: '#a7a7a7' }}
            onClick={onDislikeBtnClick}>
            {isLiked === false ? (
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
