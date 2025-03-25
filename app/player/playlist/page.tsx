'use client';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectPlayerPlaylist } from '@/redux/selectors/playerSelectors';
import { setMusicData, setPlaylistData } from '@/redux/slices/PlayerSlice';
import { shuffleArray } from '@/utils/ArrayFunctions';
import { PayloadAction } from '@reduxjs/toolkit';

const page = () => {
  const searchParams = useSearchParams();
  const { playlist, musicData } = useAppSelector(selectPlayerPlaylist);
  const dispatch = useAppDispatch();
  const musicId = searchParams?.get('m');
  const list = searchParams?.get('list');
  const shuffled = searchParams?.get('shuffled');
  useEffect(() => {
    const asyncFunction = async()=>{
      if (musicData?._id !== musicId) {
        musicId && dispatch(setMusicData(musicId));
      }
      if (playlist._id !== list) {
        if(!list) return
        if(!musicId && shuffled==='true') {
          const res= await dispatch(setPlaylistData({playlistId: list,shuffle: true}));
          
          const resT = res as PayloadAction<{items: string[]}>
         dispatch(setMusicData(resT.payload.items[0]));
        }else {
          const res= await dispatch(setPlaylistData({playlistId: list}));

        }
      }

    }
    asyncFunction()
  }, [list, musicId,shuffled]);

  return <div>page</div>;
};

export default page;
