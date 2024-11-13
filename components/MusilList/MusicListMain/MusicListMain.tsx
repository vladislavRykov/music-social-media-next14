import React from 'react';
import s from './MusicListMain.module.scss';
import ProfNav from '@/components/shared/ProfNav/ProfNav';
import MusicItems from '../MusicItems/MusicItems';

const MusicListMain = () => {
  return (
    <div className={s.musiclistmain}>
      <MusicItems />
    </div>
  );
};

export default MusicListMain;
