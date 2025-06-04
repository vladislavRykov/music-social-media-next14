'use client';
import React, { CSSProperties } from 'react';
import s from './NoChatId.module.scss';
import { useAppSelector } from '@/hooks/reduxHooks';

const NoChatId = () => {
  const isPlayerShown = useAppSelector((state) => state.playerReducer.showPlayer);

  const backgroundImageStyle: CSSProperties = {
    paddingBottom: isPlayerShown ? '80px' : '0px',
  };
  return (
    <div className={s.noChatId} style={backgroundImageStyle}>
      <div className={s.noChatId_chatNotSelected}>Тут появиться выбранный чат</div>
    </div>
  );
};

export default NoChatId;
