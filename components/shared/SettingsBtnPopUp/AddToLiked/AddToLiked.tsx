'use client'
import React, { useEffect, useState } from 'react';
import DeafultItem from '../DeafultItem/DeafultItem';
import { BiDislike, BiLike } from 'react-icons/bi';
import { useLikeOrDislike } from '@/hooks/likeAndDislikeHook';
import { Slide, ToastOptions } from 'react-toastify';
import { getAllUserLikeAndDislikeAction } from '@/actions/likesAndDislikes';
import { RiDislikeLine } from "react-icons/ri";

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

const AddToLiked = ({songId,closePopup}:{songId:string,closePopup:()=>void}) => {
   const  [isLiked,setIsLiked, onLikeBtnClick, _] = useLikeOrDislike({songId,toastSettings})
   const [isLoading,setIsLoading ]=useState(true)
   const actionFunction = async()=>{
    await onLikeBtnClick()
    closePopup()
   }
    useEffect(() => {
      const getIsLiked = async () => {
        setIsLoading(true)
        const res = await getAllUserLikeAndDislikeAction();
        console.log(res)
        const initLiked = res?.data?.likes.includes(songId)
        ? true
        : res.data?.dislikes.includes(songId)
        ? false
        : null;
        setIsLoading(false)
        res.ok && setIsLiked(initLiked);
      };
      getIsLiked();
    }, []);
    if(!isLiked) return <DeafultItem title={!isLoading ?"Добавить в понравившиеся":'...'} Icon={BiLike} action={actionFunction} />;
    return <DeafultItem title={!isLoading ?"Удалить из понравившихся":'...'} Icon={RiDislikeLine} action={actionFunction} />;
};

export default AddToLiked;
