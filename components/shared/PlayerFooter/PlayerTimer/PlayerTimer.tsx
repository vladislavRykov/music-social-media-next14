'use client';
import React from 'react';
import s from './PlayerTimer.module.scss';
import { secondsToStringTimer } from '@/utils/secondToStringTimer';
import { useAppSelector } from '@/hooks/reduxHooks';

interface PlayerTimerProps {
  duration: number;
  currentTime: number;
}

const PlayerTimer: React.FC<PlayerTimerProps> = ({ duration, currentTime }) => {
  return (
    <div className={s.playerTimer}>
      {secondsToStringTimer(currentTime) + ' / ' + secondsToStringTimer(duration)}
    </div>
  );
};

export default PlayerTimer;
