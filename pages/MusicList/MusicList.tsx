import React from 'react';
import s from './MusicList.module.scss';
import ProfileCap from '@/components/shared/ProfileCap/ProfileCap';
import MusicListMain from '@/components/MusilList/MusicListMain/MusicListMain';

const MusicList = () => {
  return (
    <div className={s.wrapper}>
      <MusicListMain />
    </div>
  );
};

export default MusicList;
