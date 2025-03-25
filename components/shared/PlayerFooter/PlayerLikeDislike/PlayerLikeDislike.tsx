'use client';
import React, { useState ,useEffect} from 'react';
import s from './PlayerLikeDislike.module.scss';
import { BiDislike } from 'react-icons/bi';
import { BiLike } from 'react-icons/bi';
import { BiSolidDislike } from 'react-icons/bi';
import { BiSolidLike } from 'react-icons/bi';
import IconBtn from '@/components/UI/Buttons/IconBtn';
import { addToFavPlaylist } from '@/actions/playlist';
import { Slide, toast, ToastOptions } from 'react-toastify';
import { getAllUserLikeAndDislikeAction, removeLikeOrDislike, setLikeOrDislikeA } from '@/actions/likesAndDislikes';
import { LikeOrDislike } from '@/types/likeAndDislikes';
import { useLikeOrDislike } from '@/hooks/likeAndDislikeHook';

type Props = {
  songId: string;
};


const PlayerLikeDislike: React.FC<Props> = ({ songId }) => {
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
  // const [isLiked, setIsLiked] = useState<boolean | null>(null);


  // const onLikeBtnClick = async () => {
  //   const isLikedLocal = isLiked;
  //   setIsLiked((prev) => (prev !== true ? true : null));
  //   if (isLikedLocal !== true) {
  //     const res = await setLikeOrDislikeA({ songId, type: LikeOrDislike.Like });

  //     if (!res.ok) return toast.error(res.message);
  //     return toast.info(res.message,toastSettings);
  //   } else {
  //     const res = await removeLikeOrDislike({ songId });
  //     if (!res.ok) return toast.error(res.message);
  //     return toast.info(res.message,toastSettings);
  //   }
  // };
  // const onDislikeBtnClick = async () => {
  //   const isLikedLocal = isLiked;
  //   setIsLiked((prev) => (prev !== false ? false : null));
  //   if (isLikedLocal !== false) {
  //     const res = await setLikeOrDislikeA({ songId, type: LikeOrDislike.Dislike });

  //     if (!res.ok) return toast.error(res.message);
  //     return toast.info(res.message,toastSettings);
  //   } else {
  //     const res = await removeLikeOrDislike({ songId });
  //     if (!res.ok) return toast.error(res.message);
  //     return toast.info(res.message,toastSettings);
  //   }
  // };
  const  [isLiked,setIsLiked, onLikeBtnClick, onDislikeBtnClick] = useLikeOrDislike({songId,toastSettings})
  useEffect(() => {
    const getIsLiked = async () => {
      const res = await getAllUserLikeAndDislikeAction();
      console.log(res)
      const initLiked = res?.data?.likes.includes(songId)
        ? true
        : res.data?.dislikes.includes(songId)
        ? false
        : null;
      res.ok && setIsLiked(initLiked);
    };
    getIsLiked();
  }, []);
  return (
    <div className={s.playerLikeDislike}>
      <IconBtn overlayStyles={{ backgroundColor: '#535f82' }} onClick={onLikeBtnClick}>
        {isLiked === true ? (
          <BiSolidLike className={s.playerLikeDislike_like} />
        ) : (
          <BiLike className={s.playerLikeDislike_like} />
        )}
      </IconBtn>
      <IconBtn overlayStyles={{ backgroundColor: '#535f82' }} onClick={onDislikeBtnClick}>
        {isLiked === false ? (
          <BiSolidDislike className={s.playerLikeDislike_dislike} />
        ) : (
          <BiDislike className={s.playerLikeDislike_dislike} />
        )}
      </IconBtn>
    </div>
  );
};

export default PlayerLikeDislike;
