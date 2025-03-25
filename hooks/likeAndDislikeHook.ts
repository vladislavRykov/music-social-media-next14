import {
  getAllUserLikeAndDislikeAction,
  removeLikeOrDislike,
  setLikeOrDislikeA,
} from '@/actions/likesAndDislikes';
import { LikeOrDislike } from '@/types/likeAndDislikes';
import { Dispatch } from '@reduxjs/toolkit';
import { SetStateAction, useEffect, useState } from 'react';
import { Id, toast, ToastOptions } from 'react-toastify';

type Params = {
  songId: string;
  initValue?: boolean | null;
  toastSettings: ToastOptions;
};

export const useLikeOrDislike = ({
  songId,
  initValue = null,
  toastSettings,
}: Params): [boolean | null,React.Dispatch<React.SetStateAction<boolean|null>>, () => Promise<Id>, () => Promise<Id>] => {
  const [isLiked, setIsLiked] = useState<boolean | null>(initValue);


  const onLikeBtnClick = async () => {
    const isLikedLocal = isLiked;
    setIsLiked((prev) => (prev !== true ? true : null));
    if (isLikedLocal !== true) {
      const res = await setLikeOrDislikeA({ songId, type: LikeOrDislike.Like });

      if (!res.ok) return toast.error(res.message);
      return toast.info(res.message, toastSettings);
    } else {
      const res = await removeLikeOrDislike({ songId });
      if (!res.ok) return toast.error(res.message);
      return toast.info(res.message, toastSettings);
    }
  };
  const onDislikeBtnClick = async () => {
    const isLikedLocal = isLiked;
    setIsLiked((prev) => (prev !== false ? false : null));
    if (isLikedLocal !== false) {
      const res = await setLikeOrDislikeA({ songId, type: LikeOrDislike.Dislike });

      if (!res.ok) return toast.error(res.message);
      return toast.info(res.message, toastSettings);
    } else {
      const res = await removeLikeOrDislike({ songId });
      if (!res.ok) return toast.error(res.message);
      return toast.info(res.message, toastSettings);
    }
  };

  return [isLiked,setIsLiked, onLikeBtnClick, onDislikeBtnClick];
};
