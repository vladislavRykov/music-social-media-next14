import React from 'react';
import s from './Browse.module.scss';
import MusicFilters from '@/components/BrowsePage/MusicFilters/MusicFilters';
import BrowseMusics from '@/components/BrowsePage/BrowseMusics/BrowseMusics';

const Browse = () => {
  return (
    <div className={s.browse}>
      <div className={s.browse_container}>
        <MusicFilters />
        <BrowseMusics />
      </div>
    </div>
  );
};

export default Browse;
