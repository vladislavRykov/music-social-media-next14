'use client';
import React, { useState } from 'react';
import s from './PlayerControls.module.scss';
import { MdSkipNext } from 'react-icons/md';
import { MdSkipPrevious } from 'react-icons/md';
import { MdPlayArrow } from 'react-icons/md';
import { MdPause } from 'react-icons/md';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setIsPlaying, setMusicData } from '@/redux/slices/PlayerSlice';
import { getNextSongId, getPrevSongId } from '@/helpers/playerHelpers';

const PlayerControls = ({
  isPlaying,
  currentSongId,
  playlist,
}: {
  isPlaying: boolean;
  currentSongId: string;
  playlist: string[];
}) => {
  const dispatch = useAppDispatch();

  const onNext = async () => {
    const nextSongId = getNextSongId(playlist, currentSongId);
    if(nextSongId===currentSongId)return
    await dispatch(setMusicData(nextSongId));
  };
  const onPrev = async () => {
    const prevSongId = getPrevSongId(playlist, currentSongId);
    if(prevSongId===currentSongId)return
    await dispatch(setMusicData(prevSongId));
  };
  return (
    <div className={s.playerControls}>
      <MdSkipPrevious onClick={onPrev} className={s.playerControls_control} />
      {!isPlaying ? (
        <MdPlayArrow
          className={s.playerControls_control + ' ' + s.playerControls_centerControl}
          onClick={() => dispatch(setIsPlaying(true))}
        />
      ) : (
        <MdPause
          className={s.playerControls_control + ' ' + s.playerControls_centerControl}
          onClick={() => dispatch(setIsPlaying(false))}
        />
      )}
      <MdSkipNext onClick={onNext} className={s.playerControls_control} />
    </div>
  );
};

export default PlayerControls;
