'use client';
import React, { useEffect, useState } from 'react';
import s from './PlayerPlaylistBlock.module.scss';
import PlayerPlaylistMainImg from './PlayerPlaylistMainImg/PlayerPlaylistMainImg';
import PlayerPlaylistContent from './PlayerPlaylistContent/PlayerPlaylistContent';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectCurrentAudio, selectMusicitemData } from '@/redux/selectors/playerSelectors';
import cn from 'classnames';
import { delay } from '@/utils/delay';
import ImgLoader from '@/components/UI/Loaders/GeneralImgLoader';

const PlayerPlaylistBlock = ({ isOpen }: { isOpen: boolean }) => {
  const [animate, setAnimate] = useState(false);
  const [displayFlex, setDisplayFlex] = useState(isOpen);

  useEffect(() => {
    const animation = async () => {
      if (isOpen) {
        setDisplayFlex(true);
        setAnimate(true);
      } else {
        setAnimate(false);
        await delay(250);
        setDisplayFlex(false);
      }
    };
    animation();
  }, [isOpen]);
  return (
    <div
      className={cn(s.wrapper, { [s.wrapper_open]: isOpen ? isOpen : displayFlex })}
      style={animate ? { bottom: '80px' } : {}}>
      <PlayerPlaylistMainImg />

      <PlayerPlaylistContent />
    </div>
  );
};

export default PlayerPlaylistBlock;
