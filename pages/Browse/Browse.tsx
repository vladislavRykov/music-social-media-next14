'use client';
import React from 'react';
import s from './Browse.module.scss';
import MusicFilters from '@/components/BrowsePage/MusicFilters/MusicFilters';
import BrowseMusics from '@/components/BrowsePage/BrowseMusics/BrowseMusics';
import { useAppSelector } from '@/hooks/reduxHooks';

const Browse = () => {
  const isPlayerShown = useAppSelector((state) => state.playerReducer.showPlayer);
  return (
    <div className={s.browse} style={isPlayerShown ? { paddingBottom: '80px' } : {}}>
      <div className={s.browse_container}>
        <MusicFilters />
        <BrowseMusics />
      </div>
    </div>
  );
};

export default Browse;
