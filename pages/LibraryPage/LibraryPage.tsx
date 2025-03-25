import React from 'react';
import s from './LibraryPage.module.scss';
import ProfileCap from '@/components/layout/ProfileLayout/ProfileCap/ProfileCap';
import LibraryMain from '@/components/LibraryPage/LibraryMain/LibraryMain';

const LibraryPage = () => {
  return (
    <div className={s.wrapper}>
      <LibraryMain />
    </div>
  );
};

export default LibraryPage;
