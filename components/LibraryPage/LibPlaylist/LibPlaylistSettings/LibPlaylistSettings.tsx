'use client';
import SettingsBtnPopUp from '@/components/shared/SettingsBtnPopUp/SettingsBtnPopUp';
import React, { useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import s from './LibPlaylistSettings.module.scss';
import IconBtn from '@/components/UI/Buttons/IconBtn';
import ShufflePlaylist from '@/components/shared/SettingsBtnPopUp/ShufflePlaylist/ShufflePlaylist';
import DeletePlaylist from '@/components/shared/SettingsBtnPopUp/DeletePlaylist/DeletePlaylist';
import OpenPlaylistPlayer from '@/components/shared/SettingsBtnPopUp/OpenPlaylistPlayer/OpenPlaylistPlayer';

type Props = {

  
    setBlockPosition: React.Dispatch<React.SetStateAction<{
        x: string;
        y: string;
    }>>;
    setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LibPlaylistSettings = ({setBlockPosition,setIsPopupOpen}:Props) => {
  const containerRef = useRef<HTMLDivElement|null>(null)
  const onSettingsBtnClick:React.MouseEventHandler<HTMLDivElement> = (e)=>{
    e.preventDefault()
    console.log(123)
    if (!containerRef.current) return;
    console.log(12323123)
        const containerRect = containerRef.current.getBoundingClientRect();
    
        setBlockPosition({
          y: `${containerRect.y + containerRect.height}px`,
          x: `${containerRect.x}px`,
        });
        setIsPopupOpen(true);
      };


  return (
        <div ref={containerRef} className={s.libPlaylistSettings} onClick={onSettingsBtnClick}>
          <BsThreeDotsVertical color='white' size={18}/>
        </div>
    

   
  );
};

export default LibPlaylistSettings;
