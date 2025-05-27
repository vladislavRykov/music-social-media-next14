'use client';
import ProfileBlock from '@/components/layout/ProfileLayout/ProfileBlock/ProfileBlock';
import React from 'react';
import s from './LeftBlock.module.scss';

const LeftBlock = ({aboutMe}:{aboutMe: string|null}) => {
  return (
    <div className={s.leftBlock}>
   
        <ProfileBlock title={'Обо мне'}>
          <p className={s.leftBlock_aboutMe}>{aboutMe || 'Пусто'}</p>
        </ProfileBlock>
      
    </div>
  );
};

export default LeftBlock;
